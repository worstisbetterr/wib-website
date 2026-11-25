"use client";

import Logo from "@/components/brand/Logo";
import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import React from "react";

export default function StyleguidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 md:pt-44 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4 pb-12 hairline-b">
        <WrongWayAccent text="SYSTEM ARCHITECTURE" />
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
          WIB DESIGN SYSTEM & TOKENS
        </h1>
        <p className="text-muted text-base max-w-2xl font-body">
          The official component library, color palette, typography hierarchy, and motion primitives for WORSTISBETTERR. Built with near-black ink, soft paper white, and signature red gradient accenting.
        </p>
      </div>

      {/* SECTION 1: COLOR PALETTE & GRADIENT */}
      <section className="py-16 hairline-b flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-paper">
            01 / Color Tokens
          </h2>
          <span className="font-mono text-xs text-muted">0-2px Radius · Dark Default</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Ink */}
          <div className="bg-ink-raised hairline-box p-5 rounded-sm flex flex-col gap-4">
            <div className="h-24 w-full rounded-sm bg-ink hairline-box flex items-center justify-center font-mono text-xs text-paper">
              #100808
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">ink</h3>
              <p className="text-xs text-muted">Primary canvas background (warm near-black)</p>
            </div>
          </div>

          {/* Ink Raised */}
          <div className="bg-ink-raised hairline-box p-5 rounded-sm flex flex-col gap-4">
            <div className="h-24 w-full rounded-sm bg-ink-raised hairline-box flex items-center justify-center font-mono text-xs text-paper">
              #17100F
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">ink-raised</h3>
              <p className="text-xs text-muted">Elevated surfaces & work cards</p>
            </div>
          </div>

          {/* Paper */}
          <div className="bg-ink-raised hairline-box p-5 rounded-sm flex flex-col gap-4">
            <div className="h-24 w-full rounded-sm bg-paper flex items-center justify-center font-mono text-xs text-ink font-bold">
              #F8F8F8
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">paper</h3>
              <p className="text-xs text-muted">Primary text / foreground (soft white)</p>
            </div>
          </div>

          {/* Muted */}
          <div className="bg-ink-raised hairline-box p-5 rounded-sm flex flex-col gap-4">
            <div className="h-24 w-full rounded-sm bg-muted flex items-center justify-center font-mono text-xs text-ink font-bold">
              #9A9090
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">muted</h3>
              <p className="text-xs text-muted">Secondary body text / labels</p>
            </div>
          </div>
        </div>

        {/* Signature Red Gradient */}
        <div className="bg-ink-raised hairline-box p-6 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-extrabold uppercase text-paper">
                Signature Red Gradient
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-red-bright/20 text-red-bright border border-red-bright/40">
                ~0.2% PIXEL RULE
              </span>
            </div>
            <p className="text-xs text-muted max-w-xl">
              <code className="text-red-bright">#E72D31 → #9E1021 (135deg)</code>. Used sparingly for Hero CTAs, hover active states, and reversed chevron motif. Never flat red, never full red backgrounds.
            </p>
          </div>
          <div className="h-16 w-full md:w-64 rounded-sm bg-red-grad hairline-box flex items-center justify-center font-display font-bold text-xs text-paper uppercase tracking-widest shadow-lg">
            SIGNATURE ACCENT
          </div>
        </div>
      </section>

      {/* SECTION 2: LOGO LOCKUPS & EMBLEM */}
      <section className="py-16 hairline-b flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-paper">
            02 / Logo System & Reversed Chevron
          </h2>
          <span className="font-mono text-xs text-muted">Thesis: » » ‹ » »</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-ink-raised hairline-box p-8 rounded-sm flex flex-col gap-6">
            <span className="font-mono text-xs text-muted uppercase">01. Primary Lockup (Wordmark + 5 Chevrons)</span>
            <div className="py-6 flex items-center justify-center bg-ink rounded-sm hairline-box">
              <Logo variant="full" size="lg" href="" />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Four white forward chevrons + one backward red gradient chevron representing WIB going against legacy industry currents. Wordmark features red final <code className="text-red-bright">RR</code>.
            </p>
          </div>

          <div className="bg-ink-raised hairline-box p-8 rounded-sm flex flex-col gap-6">
            <span className="font-mono text-xs text-muted uppercase">02. Chevrons Emblem & Icon Mark</span>
            <div className="py-6 flex items-center justify-around bg-ink rounded-sm hairline-box">
              <Logo variant="chevrons" size="lg" href="" />
              <div className="h-8 w-[1px] bg-hairline" />
              <Logo variant="mark" size="lg" href="" />
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Stand-alone emblem for loading states, favicon, and mobile overlay toggles.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: TYPOGRAPHY HIERARCHY */}
      <section className="py-16 hairline-b flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-paper">
            03 / Typography Hierarchy
          </h2>
          <span className="font-mono text-xs text-muted">Chakra Petch + Inter</span>
        </div>

        <div className="bg-ink-raised hairline-box p-8 rounded-sm flex flex-col gap-8">
          {/* Display XL */}
          <div className="flex flex-col gap-2 hairline-b pb-6">
            <span className="font-mono text-xs text-muted">Display XL (Hero Headline) — Chakra Petch</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-paper">
              WE MAKE THE WORST ADS.
            </h1>
          </div>

          {/* Tagline Accent */}
          <div className="flex flex-col gap-2 hairline-b pb-6">
            <span className="font-mono text-xs text-muted">Tagline Voice — Humanist Inter Italic</span>
            <p className="font-tagline text-2xl md:text-3xl text-paper/90">
              “Said with a straight face, while the work on screen is obviously exceptional.”
            </p>
          </div>

          {/* Section Heading */}
          <div className="flex flex-col gap-2 hairline-b pb-6">
            <span className="font-mono text-xs text-muted">Display L (Section Title)</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-paper">
              ENGINEERED FOR LUXURY & D2C BRANDS
            </h2>
          </div>

          {/* Body Regular */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-muted">Body Regular — Inter</span>
            <p className="font-body text-base text-muted leading-relaxed max-w-3xl">
              WORSTISBETTERR is an AI-native creative studio. We replace multi-million dollar physical film crews with generative latent pipelines, yielding cinematic scale, unconstrained imagination, and speed legacy agencies cannot touch.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: BUTTON SYSTEM & INTERACTION */}
      <section className="py-16 hairline-b flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-paper">
            04 / CTA Button Components
          </h2>
          <span className="font-mono text-xs text-muted">Reversed Hover Chevron ‹</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primary CTA */}
          <div className="bg-ink-raised hairline-box p-6 rounded-sm flex flex-col gap-4 items-start">
            <span className="font-mono text-xs text-muted uppercase">Primary CTA (Max 1 per viewport)</span>
            <Button variant="primary">Start a project</Button>
            <p className="text-xs text-muted pt-2">
              Red gradient background, uppercase display text, chevron moves left on hover.
            </p>
          </div>

          {/* Secondary Ghost CTA */}
          <div className="bg-ink-raised hairline-box p-6 rounded-sm flex flex-col gap-4 items-start">
            <span className="font-mono text-xs text-muted uppercase">Secondary Ghost CTA</span>
            <Button variant="ghost">See our worst work</Button>
            <p className="text-xs text-muted pt-2">
              Hairline border, subtle paper lift on hover.
            </p>
          </div>

          {/* Disabled CTA */}
          <div className="bg-ink-raised hairline-box p-6 rounded-sm flex flex-col gap-4 items-start">
            <span className="font-mono text-xs text-muted uppercase">Disabled State</span>
            <Button variant="primary" disabled={true}>
              Pipeline Full
            </Button>
            <p className="text-xs text-muted pt-2">
              50% opacity, pointer events disabled.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: MOTION PRIMITIVES & ACCENTS */}
      <section className="py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-display font-bold uppercase tracking-wider text-paper">
            05 / Motion Primitives
          </h2>
          <span className="font-mono text-xs text-muted">Wrong-Way Entrance Direction</span>
        </div>

        <div className="bg-ink-raised hairline-box p-8 rounded-sm flex flex-col gap-6">
          <span className="font-mono text-xs text-muted uppercase">Wrong-Way Chevron Accent Primitive</span>
          <div className="py-8 bg-ink rounded-sm hairline-box flex items-center justify-center">
            <WrongWayAccent text="REVERSED LOGIC ENGINE" />
          </div>
          <p className="text-xs text-muted leading-relaxed">
            One accent per section enters from right-to-left pointing backward (‹), reinforcing WIB's counter-industry thesis.
          </p>
        </div>
      </section>
    </div>
  );
}
