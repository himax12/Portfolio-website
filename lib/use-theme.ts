"use client";

import { useEffect, useState } from "react";
import type { Theme } from "@/lib/theme";

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// Mirrors the `dark` class on <html> so components (e.g. the GitHub calendar)
// can pick matching colors
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return { theme };
}
