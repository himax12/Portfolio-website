"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const BASE_SIZE = 36;
// Slot width at the cursor; the icon inside scales by the same ratio (52/36 ≈ 1.44, so a
// 20px glyph peaks at ~29px and still fits the fixed 36px button)
const MAX_SIZE = 52;
// How far (px) from an item's center the cursor still magnifies it
const MAGNIFY_RANGE = 120;

type Register = (element: HTMLElement) => () => void;

const DockRegister = createContext<Register | null>(null);

// Sizes are written straight to the DOM rather than through React state: the cursor
// moves every frame, and re-rendering the whole bar that often is wasteful.
const sizeFor = (distance: number) => {
  const ratio = Math.max(0, 1 - Math.abs(distance) / MAGNIFY_RANGE);
  return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * ratio;
};

// macOS-style dock: as the cursor approaches, an item's slot widens and its icon grows,
// while the button (and its hover highlight) keeps a fixed size so nothing leaves the bar
export function Dock({
  className,
  children,
  ...props
}: React.ComponentProps<"nav">) {
  const items = useRef(new Set<HTMLElement>());
  const frame = useRef(0);
  const reduceMotion = usePrefersReducedMotion();

  const register = useCallback<Register>((element) => {
    items.current.add(element);
    return () => {
      items.current.delete(element);
    };
  }, []);

  const apply = (mouseX: number) => {
    for (const element of items.current) {
      const bounds = element.getBoundingClientRect();
      const size = Number.isFinite(mouseX)
        ? sizeFor(mouseX - bounds.left - bounds.width / 2)
        : BASE_SIZE;
      element.style.width = `${size}px`;
      element.style.setProperty("--dock-icon-scale", `${size / BASE_SIZE}`);
    }
  };

  const track = (mouseX: number) => {
    if (reduceMotion) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(mouseX));
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <nav
      {...props}
      // React bubbles events from portals (the hover cards) up to the dock, so only
      // track the cursor while it's over the bar itself; otherwise the icons keep
      // magnifying and shift the open card sideways under the cursor
      onMouseMove={(e) =>
        track(e.currentTarget.contains(e.target as Node) ? e.clientX : Infinity)
      }
      onMouseLeave={() => track(Infinity)}
      className={cn("flex items-center", className)}
    >
      <DockRegister.Provider value={register}>{children}</DockRegister.Provider>
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
  const register = useContext(DockRegister);

  useEffect(() => {
    // Outside a Dock there is no cursor tracking; the slot just stays at base size
    if (!register || !ref.current) return;
    return register(ref.current);
  }, [register]);

  return (
    <div
      ref={ref}
      // Only the slot width animates; the height stays fixed inside the bar
      style={{ width: BASE_SIZE, height: BASE_SIZE }}
      className="group relative flex items-center justify-center transition-[width] duration-150 ease-out [&_svg]:[transform:scale(var(--dock-icon-scale,1))] [&_svg]:origin-center [&_svg]:transition-transform [&_svg]:duration-150 [&_svg]:ease-out motion-reduce:transition-none"
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
    </div>
  );
}
