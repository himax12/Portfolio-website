"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// The theme lives as the `dark` class on <html> (set before paint by the script in
// app/layout.tsx); this hook mirrors it so components can react to changes
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    setThemeState(readTheme());
    const observer = new MutationObserver(() => setThemeState(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const setTheme = (next: Theme) => {
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the switch still applies for this visit
    }
  };

  return { theme, setTheme };
}
