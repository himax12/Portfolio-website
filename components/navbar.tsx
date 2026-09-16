"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

// Docked bar is h-14 (56px) at the top of the viewport; leave a 16px gap below it
const NAV_OFFSET = 72;

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Stack", href: "/#stack" },
  { label: "Open Source", href: "/#opensource" },
  { label: "GitHub", href: "/#github" },
  { label: "Blogs", href: "/blogs" },
];

// The HG logo links home, so "home" is tracked (to clear the highlight at the top) but has no nav item
const SECTION_IDS = [
  "home",
  ...NAV_ITEMS.filter((item) => item.href.startsWith("/#")).map((item) =>
    item.href.slice(2),
  ),
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Land on the section named in the URL hash (direct link, refresh, or arriving from /blogs)
  useEffect(() => {
    if (pathname !== "/") return;
    const id = window.location.hash.slice(1);
    if (!id) return;

    const align = () => {
      const target = document.getElementById(id);
      if (!target) return;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
        behavior: "instant",
      });
    };
    align();

    // Sections above the target load data after mount (open source PRs, GitHub
    // calendar) and push it down, so re-align on layout changes until the user
    // takes over scrolling or things have settled
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
    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setMobileMenuOpen(false);
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
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <>
      {/* Docked to the top of the page frame at the frame's exact width: the frame's side
          edges continue straight down from the bar, and nothing shows above it */}
      <nav className="fixed top-0 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2">
        <div className="glass-strong nav-dock rounded-b-md h-14 px-3 sm:px-4 flex items-center justify-between">
          <Link
            href="/#home"
            onClick={(e) => handleClick(e, "/#home")}
            className="px-3 py-1.5 font-bold text-sm rounded-md hover:bg-overlay/10 transition-colors"
          >
            HG
          </Link>

          <div className="flex items-center gap-1">
            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-1 text-sm">
              {NAV_ITEMS.map((item) => {
                const active = item.href === activeHref;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    aria-current={active ? "page" : undefined}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      active
                        ? "bg-overlay/10 text-foreground"
                        : "text-muted hover:text-foreground hover:bg-overlay/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-overlay/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-2xl md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {NAV_ITEMS.map((item) => {
              const active = item.href === activeHref;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  aria-current={active ? "page" : undefined}
                  className={`px-6 py-3 rounded-md text-2xl transition-colors ${
                    active
                      ? "bg-overlay/10 text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
