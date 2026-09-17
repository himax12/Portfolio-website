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
const MAX_SIZE = 52;
// How far (px) from an item's center the cursor still magnifies it
const MAGNIFY_RANGE = 120;

const DockMouseX = createContext<MotionValue<number> | null>(null);

// macOS-style dock: items grow as the cursor approaches, anchored to the bar's bottom edge
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
      className={cn("flex items-end", className)}
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
      style={reduceMotion ? { width: BASE_SIZE, height: BASE_SIZE } : { width: size, height: size }}
      className="group relative flex items-center justify-center"
    >
      {/* Scale the icon with the item so magnification reads as the icon growing */}
      <motion.div
        style={reduceMotion ? undefined : { scale: iconScale }}
        className="flex h-9 w-9 items-center justify-center"
      >
        {children}
      </motion.div>
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
