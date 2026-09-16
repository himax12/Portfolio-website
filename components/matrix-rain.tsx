"use client";

import { useEffect, useRef } from "react";

// Matrix characters - mix of code symbols and numbers
const CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]()<>=+-*/;:.,!?@#$%^&*".split(
    "",
  );
const FONT_SIZE = 14;
// ~20fps keeps the effect smooth enough while staying cheap
const FRAME_MS = 50;
// Frames pre-rendered to build a still texture when motion is reduced
const STATIC_FRAMES = 40;

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

    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Gradient effect - brighter at the bottom
        const gradient = ctx.createLinearGradient(
          0,
          drops[i] * FONT_SIZE - FONT_SIZE * 5,
          0,
          drops[i] * FONT_SIZE,
        );

        // Neutral tone to match the monochrome palette
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.6)");

        ctx.fillStyle = gradient;
        ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

        // Reset drop to top randomly
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const drawStatic = () => {
      const rows = canvas.height / FONT_SIZE;
      drops = drops.map(() => Math.random() * rows);
      for (let f = 0; f < STATIC_FRAMES; f++) draw();
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
      if (reduceMotion) drawStatic();
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
    if (!reduceMotion) rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      aria-hidden="true"
    />
  );
}
