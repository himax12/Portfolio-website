"use client";

import { useEffect, useRef } from "react";

// Matrix characters - mix of code symbols and numbers
const CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]()<>=+-*/;:.,!?@#$%^&*".split(
    "",
  );
const FONT_SIZE = 14;
// ~12fps: the glyphs step down a row at a time, so more frames buy very little
const FRAME_MS = 80;
// Frames pre-rendered to build a still texture when the rain does not animate
const STATIC_FRAMES = 40;

// Trails fade into the black page background
const TRAIL = "rgba(0, 0, 0, 0.08)";
const RAIN = "rgb(0, 255, 65)";

// The reading column (see layout.tsx) sits on frosted glass. Anything repainted
// underneath it forces the browser to re-blur every glass surface above, which is
// far more expensive than the drawing itself, so the animation stays in the gutters.
const COLUMN_WIDTH = 720;
// Below this a gutter is too narrow to be worth animating; the rain is drawn once instead
const MIN_GUTTER = 48;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let drops: number[] = [];
    // Columns that sit in a gutter, so each frame only walks the ones it will draw
    let animated: number[] = [];
    let gutter = 0;

    const drawColumn = (i: number) => {
      const text = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

      // Reset drop to top randomly
      if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }

      drops[i]++;
    };

    // One frame of the gutters: fade what is there, then step every drop down a row.
    // The fade is what produces the trail, so no per-glyph gradient is needed.
    const draw = () => {
      ctx.fillStyle = TRAIL;
      ctx.fillRect(0, 0, gutter, canvas.height);
      ctx.fillRect(canvas.width - gutter, 0, gutter, canvas.height);

      ctx.fillStyle = RAIN;
      ctx.font = `${FONT_SIZE}px monospace`;
      for (const i of animated) drawColumn(i);
    };

    // Full-width still frame, used on narrow screens and for reduced motion
    const drawStatic = () => {
      const rows = canvas.height / FONT_SIZE;
      drops = drops.map(() => Math.random() * rows);
      for (let f = 0; f < STATIC_FRAMES; f++) {
        ctx.fillStyle = TRAIL;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = RAIN;
        ctx.font = `${FONT_SIZE}px monospace`;
        for (let i = 0; i < drops.length; i++) drawColumn(i);
      }
    };

    const resizeCanvas = () => {
      // Resizing clears the canvas; keep existing drops and add columns as the window widens
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.ceil(canvas.width / FONT_SIZE);
      drops = Array.from(
        { length: columns },
        (_, i) => drops[i] ?? Math.random() * -100,
      );
      gutter = Math.max(0, (canvas.width - COLUMN_WIDTH) / 2);
      animated = [];
      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE;
        if (x < gutter || x > canvas.width - gutter) animated.push(i);
      }
      if (reduceMotion || gutter < MIN_GUTTER) drawStatic();
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // requestAnimationFrame is paused by the browser in background tabs
    let rafId = 0;
    let lastFrame = 0;
    const tick = (time: number) => {
      rafId = requestAnimationFrame(tick);
      if (time - lastFrame < FRAME_MS) return;
      lastFrame = time;
      draw();
    };
    const start = () => {
      cancelAnimationFrame(rafId);
      if (!reduceMotion && gutter >= MIN_GUTTER) rafId = requestAnimationFrame(tick);
    };
    start();
    window.addEventListener("resize", start);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", start);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
