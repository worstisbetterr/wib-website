"use client";

import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isBookPage = pathname === "/book" || pathname?.startsWith("/book/");

  if (isBookPage) {
    return null;
  }

  return (
    <footer className="bg-ink hairline-t text-paper pt-20 sm:pt-28 pb-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 text-center items-center">
        
        {/* LINE 1: 3-Column Equal Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 w-full">
          {/* LEFT: Company Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <Logo variant="full" size="lg" href="/" altText="Worstisbetterr" />
          </div>

          {/* MIDDLE: Start a Project CTA Button — 100% DEAD-CENTER ALIGNED */}
          <div className="flex items-center justify-center">
            <Button href="/contact" variant="primary" className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider">
              Start a project
            </Button>
          </div>

          {/* RIGHT: Social Icons ONLY (Instagram, Youtube, Mail) */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            {/* Instagram Icon Only */}
            <a
              href="https://instagram.com/worstisbetterr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-ink-raised hairline-box rounded-sm flex items-center justify-center text-paper hover:text-red-bright hover:border-red-bright/40 transition-all shadow-md group"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* Youtube Icon Only */}
            <a
              href="https://youtube.com/@worstisbetterr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 bg-ink-raised hairline-box rounded-sm flex items-center justify-center text-paper hover:text-red-bright hover:border-red-bright/40 transition-all shadow-md group"
              aria-label="Youtube"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
              </svg>
            </a>

            {/* Mail Icon Only */}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="w-11 h-11 bg-ink-raised hairline-box rounded-sm flex items-center justify-center text-paper hover:text-red-bright hover:border-red-bright/40 transition-all shadow-md group"
              aria-label="Mail"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        {/* LINE 2: All Main Navigation Pages Buttons */}
        <div className="w-full hairline-t hairline-b py-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-widest text-paper/90 hover:text-red-bright transition-colors inline-flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.isBadge && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-paper/5 text-muted border border-paper/10 font-mono font-bold">
                  {link.isBadge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* LINE 3: Approved Footer Links & Copyright Text Mark */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-center w-full sm:w-auto">
            <Link
              href="/privacy"
              className="hover:text-paper transition-colors font-bold uppercase tracking-wider text-paper/80 hover:underline"
            >
              What we do with your data
            </Link>
            <span className="text-paper/20 hidden sm:inline">•</span>
            <Link
              href="/terms"
              className="hover:text-paper transition-colors font-bold uppercase tracking-wider text-paper/80 hover:underline"
            >
              The fine print (we mean it)
            </Link>
          </div>

          <div className="text-center sm:text-right">
            <span>© {new Date().getFullYear()} Worstisbetterr. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
