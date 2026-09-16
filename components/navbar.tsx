"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Matches the h-16 navbar height so section headings aren't hidden under it
const NAV_OFFSET = 64;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Open Source", href: "#opensource" },
    { label: "Blog", href: "#blog" },
    { label: "GitHub", href: "#github" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo/Name */}
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="font-bold text-sm"
          >
            HG
          </a>

          {/* Desktop Nav Items */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
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
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-2xl text-muted hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
