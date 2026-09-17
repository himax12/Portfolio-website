"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const CELL = 5;
const GAP = 1;
const REVEAL_MS = 320;
const FADE_MS = 220;
// Matrix green, matching the rain
const COLOR = "0, 255, 65";

type Pixel = { x: number; y: number; alpha: number; delay: number };

// Dithered pixel halo that dissolves in around the hovered item. Pixels are brightest at
// the center and thin out toward the edges; each appears after a random delay.
export default function PixelGlow({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const reduceMotion = useReducedMotion();

  // Lay out the pixel field once, at the canvas's rendered size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.getContext("2d")?.scale(dpr, dpr);

    const pixels: Pixel[] = [];
    const step = CELL + GAP;
    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        // Elliptical falloff from the center
        const dx = (x + CELL / 2 - width / 2) / (width / 2);
        const dy = (y + CELL / 2 - height / 2) / (height / 2);
        const falloff = 1 - Math.sqrt(dx * dx + dy * dy);
        if (falloff <= 0 || Math.random() > falloff * 1.3) continue;
        pixels.push({
          x,
          y,
          alpha: Math.min(0.9, falloff * (0.35 + Math.random() * 0.75)),
          delay: Math.random() * REVEAL_MS * (1 - falloff * 0.6),
        });
      }
    }
    pixelsRef.current = pixels;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas.getBoundingClientRect();

    const draw = (progress: (pixel: Pixel) => number) => {
      ctx.clearRect(0, 0, width, height);
      for (const pixel of pixelsRef.current) {
        const t = progress(pixel);
        if (t <= 0) continue;
        ctx.fillStyle = `rgba(${COLOR}, ${pixel.alpha * t})`;
        ctx.fillRect(pixel.x, pixel.y, CELL, CELL);
      }
    };

    if (reduceMotion) {
      draw(() => (active ? 1 : 0));
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (active) {
        // Each pixel snaps on after its own delay, flickering in over a short ramp
        draw((pixel) => Math.max(0, Math.min(1, (elapsed - pixel.delay) / 60)));
        if (elapsed < REVEAL_MS + 60) frame = requestAnimationFrame(tick);
      } else {
        // Pixels drop out in a random order rather than fading uniformly
        draw((pixel) => (elapsed / FADE_MS > (pixel.delay / REVEAL_MS) * 0.9 + 0.1 ? 0 : 1));
        if (elapsed < FADE_MS) frame = requestAnimationFrame(tick);
        else ctx.clearRect(0, 0, width, height);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
