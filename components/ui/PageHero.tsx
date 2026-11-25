"use client";

import AIMeshGrid from "@/components/motion/AIMeshGrid";
import ScrollReveal from "@/components/motion/ScrollReveal";
import React from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  compact?: boolean;
};

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  className = "",
  children,
  actions,
  compact = false,
}) => {
  const paddingClasses = compact
    ? "pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-12"
    : "pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-28";

  return (
    <section
      className={`relative ${paddingClasses} border-b hairline-b overflow-hidden bg-ink text-paper ${className}`}
    >
      {/* 🕸️ Interactive AI Mesh Grid Canvas Effect */}
      <AIMeshGrid />
      {/* Faint Red Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink blur-2xl pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-red-bright/5 rounded-full blur-[200px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="flex flex-col gap-6 max-w-4xl">
          {children}

          {/* Eyebrow with red chevron */}
          <div className="flex items-center gap-2">
            <span className="text-red-bright font-extrabold text-sm">‹</span>
            <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
              {eyebrow}
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-paper leading-[1.02]">
            {title}
          </h1>

          {/* Subhead */}
          {description && (
            <p className="text-base sm:text-lg lg:text-xl text-[#9A9090] font-body leading-relaxed max-w-[640px]">
              {description}
            </p>
          )}

          {/* CTA Actions */}
          {actions && <div className="pt-2">{actions}</div>}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PageHero;
