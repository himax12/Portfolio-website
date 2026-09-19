"use client";

import { useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

// One image holds all sixteen poses: rows are directions, columns are states. Swapping
// frames is then a background-position change, with no request and nothing to flicker.
const SHEET = "/cursor/sheet.webp";
const ROWS: Direction[] = ["up", "down", "left", "right"];
const COLUMNS = ["idle", "walk-1", "walk-2", "angry"] as const;
// Four cells across and down, so each step is a third of the background box
const STEP = 100 / 3;
const position = (direction: Direction, state: (typeof COLUMNS)[number]) =>
  `${COLUMNS.indexOf(state) * STEP}% ${ROWS.indexOf(direction) * STEP}%`;
// Arms up, whichever way he happens to be facing
const ANGRY = position("up", "angry");
// Both profile rows in the sheet are drawn facing right, so travelling left reuses the
// right-hand poses mirrored rather than a row that would point the wrong way
const POSE_ROW: Record<Direction, Direction> = {
  up: "up",
  down: "down",
  left: "right",
  right: "right",
};

// Fraction of the remaining distance covered each frame
const EASE = 0.28;
// Milliseconds between the two running frames
const STEP_MS = 110;
// Close enough to the cursor to stand still, in px
const ARRIVED = 2;
// He keeps running for this long after the last pointer movement: now that he keeps
// up with the cursor, distance alone would have him standing still most of the time
const RUNNING_MS = 140;
// Movement below this doesn't change which way he faces, so jitter can't spin him
const TURN = 2;
// Pose changes are ignored for this long after a scroll: the pointer hasn't moved, the
// page has, and reacting to every element sliding past makes him flicker
const SCROLL_SETTLE_MS = 160;
// He stands below and to the right of the click point, the way an arrow's tip sits
// above its body: standing on the point would hide the link being clicked
const OFFSET_X = 4;
const OFFSET_Y = 10;

export default function CursorBuddy() {
  const ref = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const dot = dotRef.current;
    if (!element || !dot) return;
    // Nothing to follow on touch screens, and it is pure motion, so respect the setting
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    document.documentElement.classList.add("cursor-hidden");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let facing: Direction = "down";
    let step = 0;
    let steppedAt = 0;
    let frame = 0;
    let angry = false;
    let shown = false;
    let movedAt = 0;
    let scrollingUntil = 0;
    let settleTimer = 0;

    const setPose = (value: string) => {
      if (element.style.backgroundPosition !== value) {
        element.style.backgroundPosition = value;
      }
    };

    const tick = (time: number) => {
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      x += dx * EASE;
      y += dy * EASE;

      // Whichever axis he is travelling along further decides the pose
      if (distance > TURN) {
        const next: Direction =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0
              ? "right"
              : "left"
            : dy > 0
              ? "down"
              : "up";
        facing = next;
      }

      // Only the profile poses are mirrored; the arms-up pose faces front either way
      const flip = !angry && facing === "left" ? " scaleX(-1)" : "";
      element.style.transform = `translate3d(${x + OFFSET_X}px, ${y + OFFSET_Y}px, 0)${flip}`;
      // The dot tracks the pointer exactly, while he lopes along behind it
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (angry) {
        setPose(ANGRY);
      } else if (time - movedAt < RUNNING_MS) {
        if (time - steppedAt > STEP_MS) {
          step ^= 1;
          steppedAt = time;
        }
        setPose(position(POSE_ROW[facing], step ? "walk-1" : "walk-2"));
      } else {
        setPose(position(POSE_ROW[facing], "idle"));
      }

      // Stop the loop once he has caught up; the next pointer move wakes it again
      const busy = distance > ARRIVED || time - movedAt < RUNNING_MS;
      frame = busy ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      movedAt = performance.now();
      if (!shown) {
        shown = true;
        element.style.opacity = "1";
        dot.style.opacity = "1";
      }
      wake();
    };

    // He gets worked up over anything clickable, and over actual clicks
    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest("a, button, [role='button']"));

    const setAngry = (next: boolean) => {
      if (next === angry) return;
      angry = next;
      wake();
    };

    const onOver = (event: PointerEvent) => {
      // Mid-scroll these fire for whatever slid under a stationary pointer
      if (performance.now() < scrollingUntil) return;
      setAngry(isInteractive(event.target));
    };

    // Once the page stops moving, catch up with whatever is under the pointer now
    const settle = () => setAngry(isInteractive(document.elementFromPoint(targetX, targetY)));

    const onScroll = () => {
      scrollingUntil = performance.now() + SCROLL_SETTLE_MS;
      setAngry(false);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, SCROLL_SETTLE_MS);
    };
    const onDown = () => {
      angry = true;
      wake();
    };
    const onUp = (event: PointerEvent) => {
      angry = isInteractive(event.target);
      wake();
    };
    const onLeave = () => {
      shown = false;
      element.style.opacity = "0";
      dot.style.opacity = "0";
    };

    // The sheet waits for a quiet moment rather than competing with the page itself
    const warmUp = () => {
      const image = new Image();
      image.src = SHEET;
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(warmUp, { timeout: 3000 })
      : window.setTimeout(warmUp, 1500);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      cancelAnimationFrame(frame);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <span
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71] h-[7px] w-[7px] rounded-full bg-[#00ff41] opacity-0 shadow-[0_0_6px_rgba(0,255,65,0.9)] transition-opacity duration-300"
      />
      <div
        ref={ref}
        aria-hidden="true"
        style={{
          backgroundImage: `url(${SHEET})`,
          // Four cells wide and tall, so the box is four times the size of one pose
          backgroundSize: "400% 400%",
          backgroundPosition: position("down", "idle"),
        }}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-16 w-10 origin-center select-none bg-no-repeat opacity-0 transition-opacity duration-300 [image-rendering:pixelated]"
      />
    </>
  );
}
