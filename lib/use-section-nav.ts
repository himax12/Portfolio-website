"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// No top bar anymore, so sections only need a little breathing room above them
const SCROLL_OFFSET = 16;

export type NavItem = {
  label: string;
  href: string;
  // Homepage sections that highlight this item while in view
  sections?: string[];
};

export const isNavItemActive = (item: NavItem, active: string | null) =>
  active !== null &&
  (item.href === active ||
    (item.sections ?? []).some((id) => `/#${id}` === active));

// Section navigation for the dock: tracks the section in view, lands on the URL
// hash after late-loading content settles, and smooth-scrolls on click
export function useSectionNav() {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Land on the section named in the URL hash (direct link, refresh, or arriving from /blogs)
  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    const align = () => {
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
        behavior: "instant",
      });
    };
    align();

    // Sections above the target load data after mount (GitHub calendar) and push
    // it down, so re-align on layout changes until the user takes over scrolling
    // or things have settled
    const main = document.querySelector("main");
    const observer = new ResizeObserver(align);
    if (main) observer.observe(main);
    const userEvents = ["wheel", "touchstart", "keydown", "pointerdown"];
    const stop = () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      userEvents.forEach((event) => window.removeEventListener(event, stop));
    };
    const settleTimer = setTimeout(stop, 5000);
    userEvents.forEach((event) =>
      window.addEventListener(event, stop, { passive: true }),
    );
    return stop;
  }, [pathname]);

  // Highlight the page route, or on the homepage the section currently in view
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref(pathname);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`/#${entry.target.id}`);
        }
      },
      // A thin band across the upper-middle of the viewport decides the active section
      { rootMargin: "-35% 0px -60% 0px" },
    );
    // Every homepage section counts, including ones without a dock item (e.g. contact),
    // so passing through them clears the highlight instead of leaving a stale one
    const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
    sections.forEach((section) => observer.observe(section));
    // The last section is short and may never reach the band; mark it active at the bottom
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      const last = sections.at(-1);
      if (atBottom && last) setActiveHref(`/#${last.id}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Page routes (e.g. /blogs) navigate normally via Link
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const hash = href.slice(1);
    const target = pathname === "/" ? document.querySelector(hash) : null;
    if (!target) {
      // Section lives on the homepage; go there first
      router.push(href);
      return;
    }
    // Keep the address bar in sync so refreshing or sharing lands on the same section
    window.history.replaceState(null, "", hash === "#home" ? "/" : href);
    const top =
      hash === "#home"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return { activeHref, handleClick };
}
