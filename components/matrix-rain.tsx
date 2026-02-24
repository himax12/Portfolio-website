"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix words - coding, math, and tech terms
    const words = [
      "code", "data", "algo", "AI", "ML", "API", "GPU", "CPU",
      "hash", "node", "git", "bug", "def", "int", "str", "obj",
      "loop", "func", "auth", "key", "null", "true", "void", "async",
      "math", "calc", "sum", "log", "exp", "sin", "cos", "tan",
      "sqrt", "pow", "max", "min", "var", "let", "const", "new",
      "class", "this", "self", "try", "else", "for", "if", "do",
      "cipher", "crypt", "token", "json", "http", "ssh", "ssl",
      "byte", "bit", "hex", "bin", "stack", "queue", "tree", "map",
      "push", "pop", "set", "get", "post", "put", "patch", "delete",
      "react", "next", "node", "python", "rust", "go", "java",
      "0x", "1x", "2x", "0b", "0o", "{}", "[]", "()", "<>",
    ];

    const fontSize = 12;
    const columnWidth = 60; // Wider spacing for words
    const columns = canvas.width / columnWidth;
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Drawing function
    const draw = () => {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = words[Math.floor(Math.random() * words.length)];

        // Gradient effect - brighter at the bottom
        const gradient = ctx.createLinearGradient(
          0,
          drops[i] * fontSize - fontSize * 5,
          0,
          drops[i] * fontSize,
        );

        gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)");
        gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.5)");
        gradient.addColorStop(1, "rgba(0, 255, 0, 1)");

        ctx.fillStyle = gradient;
        ctx.fillText(text, i * columnWidth, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
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
