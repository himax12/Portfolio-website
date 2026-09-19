"use client";

import { useEffect, useRef } from "react";

const FRAMES = {
  idle: "/cursor/idle.webp",
  walkA: "/cursor/walk-1.webp",
  walkB: "/cursor/walk-2.webp",
  angry: "/cursor/angry.webp",
};

// Fraction of the remaining distance covered each frame: the lag is what makes him
// look like he is chasing the cursor rather than stuck to it
const EASE = 0.28;
// Milliseconds between the two running frames
const STEP_MS = 110;
// Close enough to the cursor to stand still, in px
const ARRIVED = 2;
// He keeps running for this long after the last pointer movement: now that he keeps
// up with the cursor, distance alone would have him standing still most of the time
const RUNNING_MS = 140;
// He stands below and to the right of the click point, the way an arrow's tip sits
// above its body: standing on the point would hide the link being clicked
const OFFSET_X = 4;
const OFFSET_Y = 10;

export default function CursorBuddy() {
  const ref = useRef<HTMLImageElement>(null);
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

    // Swapping to a frame the browser has not fetched yet would blink, but the other
    // frames must not compete with the page itself for bandwidth, so they wait for idle
    const preloadRest = () => {
      for (const src of Object.values(FRAMES)) {
        const preload = new Image();
        preload.src = src;
      }
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(preloadRest, { timeout: 3000 })
      : window.setTimeout(preloadRest, 1500);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let facing = 1;
    let step = 0;
    let steppedAt = 0;
    let frame = 0;
    let angry = false;
    let shown = false;
    let movedAt = 0;

    const setSrc = (src: string) => {
      if (!element.src.endsWith(src)) element.src = src;
    };

    const tick = (time: number) => {
      const dx = targetX - x;
      const dy = targetY - y;
      const distance = Math.hypot(dx, dy);
      x += dx * EASE;
      y += dy * EASE;
      // Only flip on deliberate horizontal movement, so he doesn't twitch when settling
      if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;

      element.style.transform = `translate3d(${x + OFFSET_X}px, ${y + OFFSET_Y}px, 0) scaleX(${facing})`;
      // The dot tracks the pointer exactly, while he lopes along behind it
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (angry) {
        setSrc(FRAMES.angry);
      } else if (time - movedAt < RUNNING_MS) {
        if (time - steppedAt > STEP_MS) {
          step ^= 1;
          steppedAt = time;
        }
        setSrc(step ? FRAMES.walkA : FRAMES.walkB);
      } else {
        setSrc(FRAMES.idle);
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

    const onOver = (event: PointerEvent) => {
      const next = isInteractive(event.target);
      if (next !== angry) {
        angry = next;
        wake();
      }
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
      {/* eslint-disable-next-line @next/next/no-img-element -- swapped every few frames; the optimizer only adds latency */}
      <img
        ref={ref}
        src={FRAMES.idle}
        alt=""
      aria-hidden="true"
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-16 w-auto origin-top-left select-none opacity-0 transition-opacity duration-300 [image-rendering:pixelated]"
      />
    </>
  );
}
