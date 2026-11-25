"use client";

import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isBookPage = pathname === "/book" || pathname?.startsWith("/book/");

  if (isBookPage) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isHomePage && !scrolledPastHero && !mobileMenuOpen
            ? "bg-gradient-to-b from-ink/90 via-ink/50 to-transparent border-none py-4 md:py-5"
            : "bg-ink/95 backdrop-blur-xl border-b border-paper/10 py-3.5 md:py-4 shadow-2xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Top Bar Symbol Logo */}
          <Logo variant="symbol" size="sm" href="/" altText="Worstisbetterr home" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-display text-xs font-extrabold uppercase tracking-widest transition-colors focus:outline-none focus-visible:outline-none select-none ${
                    isActive ? "text-red-bright" : "text-paper hover:text-red-bright"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {link.isBadge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-paper/5 text-muted border border-paper/10 font-mono font-bold">
                        {link.isBadge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2.5px] bg-red-grad"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              showChevron={true}
              className="px-4.5 py-2.5 text-[11px] font-extrabold tracking-wider"
            >
              Start a project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden min-h-[44px] px-3 py-2 text-paper focus:outline-none flex items-center gap-2 rounded-sm hover:bg-paper/5 active:scale-95 transition-all"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="font-display text-xs font-bold uppercase tracking-widest text-paper">
              MENU
            </span>
            <span className="font-display text-base font-extrabold text-red-bright">
              ☰
            </span>
          </button>
        </div>
      </header>

      {/* 📱 Rebuilt Mobile Overlay — 100% Opaque Dynamic Ink, Zero Bleed-Through */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-ink text-paper md:hidden flex flex-col justify-between px-6 pt-4 pb-8 overflow-y-auto"
          >
            {/* Top Navigation Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-paper/10 pb-4 shrink-0">
              <Logo variant="symbol" size="sm" href="/" altText="Worstisbetterr home" onClick={() => setMobileMenuOpen(false)} />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] px-3 py-2 text-paper focus:outline-none flex items-center gap-1.5 rounded-sm hover:bg-paper/5 transition-colors"
                aria-label="Close menu"
              >
                <span className="font-display text-xs font-bold uppercase tracking-widest text-paper">
                  CLOSE
                </span>
                <span className="font-display text-base font-extrabold text-red-bright">
                  ✕
                </span>
              </button>
            </div>

            {/* Vertical Clean Navigation List (Large 44px+ Tap Targets, Hairline Dividers) */}
            <nav className="flex flex-col my-auto py-6" aria-label="Mobile Full-Screen Navigation">
              {siteConfig.navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between min-h-[56px] py-4 border-b border-paper/10 font-display text-2xl font-bold uppercase tracking-wider transition-colors focus:outline-none focus-visible:outline-none select-none ${
                        isActive ? "text-red-bright" : "text-paper hover:text-red-bright"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-muted font-normal w-6">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{link.label}</span>
                        {link.isBadge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-paper/5 text-muted border border-paper/10 font-mono font-bold">
                            {link.isBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-red-bright text-lg font-bold">‹</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Exactly ONE CTA Button at Bottom */}
            <div className="pt-4 border-t border-paper/10 flex flex-col gap-4 shrink-0">
              <Button
                href="/contact"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full justify-center min-h-[50px] text-xs font-bold uppercase tracking-wider"
              >
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
