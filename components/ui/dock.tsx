"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { createContext, useContext, useRef } from "react";
import { cn } from "@/lib/utils";

const BASE_SIZE = 36;
// Slot width at the cursor; the icon inside scales by the same ratio (52/36 ≈ 1.44, so a
// 20px glyph peaks at ~29px and still fits the fixed 36px button)
const MAX_SIZE = 52;
// How far (px) from an item's center the cursor still magnifies it
const MAGNIFY_RANGE = 120;

const DockMouseX = createContext<MotionValue<number> | null>(null);

// macOS-style dock: as the cursor approaches, an item's slot widens and its icon grows,
// while the button (and its hover highlight) keeps a fixed size so nothing leaves the bar
export function Dock({
  className,
  children,
  ...props
}: React.ComponentProps<"nav">) {
  const mouseX = useMotionValue(Infinity);
  return (
    <nav
      {...props}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("flex items-center", className)}
    >
      <DockMouseX.Provider value={mouseX}>{children}</DockMouseX.Provider>
    </nav>
  );
}

export function DockItem({
  label,
  children,
}: {
  // Optional hover label, for items that don't already show a hover card
  label?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Outside a Dock there's no cursor tracking; stay at base size
  const fallbackMouseX = useMotionValue(Infinity);
  const mouseX = useContext(DockMouseX) ?? fallbackMouseX;
  const reduceMotion = useReducedMotion();

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? x - bounds.left - bounds.width / 2 : Infinity;
  });
  const targetSize = useTransform(
    distance,
    [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE],
    [BASE_SIZE, MAX_SIZE, BASE_SIZE],
  );
  const size = useSpring(targetSize, { mass: 0.1, stiffness: 170, damping: 14 });
  const iconScale = useTransform(size, (s) => s / BASE_SIZE);

  return (
    <motion.div
      ref={ref}
      // Only the slot width animates; the height stays fixed inside the bar
      style={{
        width: reduceMotion ? BASE_SIZE : size,
        height: BASE_SIZE,
        // Read by the icon (svg) inside the button, so the glyph grows but the button doesn't
        ["--dock-icon-scale" as string]: reduceMotion ? 1 : iconScale,
      }}
      className="group relative flex items-center justify-center [&_svg]:[transform:scale(var(--dock-icon-scale,1))] [&_svg]:origin-center"
    >
      {children}
      {label && (
        <span
          role="tooltip"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md glass-strong px-2 py-1 text-xs text-foreground opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
