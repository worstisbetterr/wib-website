"use client";

import PageHero from "@/components/ui/PageHero";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionSystem";
import Link from "next/link";
import React from "react";

const departments = [
  {
    id: "brands",
    number: "01",
    name: "Brands & Advertising",
    tagline: "Films for brands that refuse to look like everyone else's AI ads.",
    whatWeMake:
      "Hero brand films · Campaigns built from one world · Long-form brand stories · Brand worlds that keep growing",
  },
  {
    id: "film-development",
    number: "02",
    name: "Film: Development",
    tagline: "Getting a film made before the money arrives.",
    whatWeMake: "Proof-of-concept films · Story worlds for pitches · Scene tests",
  },
  {
    id: "film-preproduction",
    number: "03",
    name: "Film: Pre-Production",
    tagline: "Mistakes are cheapest before the shoot.",
    whatWeMake:
      "Previs & techvis · Shot planning · Design visualisation for art departments · Animated boards",
  },
  {
    id: "film-post",
    number: "04",
    name: "Film: Post & Finishing",
    tagline: "The shot that failed, fixed. The shot never filmed, built.",
    whatWeMake:
      "Reshoot avoidance & VFX · New shots built to match your footage",
  },
  {
    id: "gaming",
    number: "05",
    name: "Gaming",
    tagline: "Built to the game's look, on the showcase date.",
    whatWeMake:
      "Trailers · Cinematics · Character & world design · Performance creative",
  },
  {
    id: "music",
    number: "06",
    name: "Music",
    tagline: "Built backwards from the release date.",
    whatWeMake:
      "Music videos · Visualisers · Artist worlds · Album campaigns · Tour & concert visuals",
  },
  {
    id: "social",
    number: "07",
    name: "Performance & Social",
    tagline: "Volume, on a date.",
    whatWeMake:
      "Ad packs in proven formats · Creator-style ads with AI presenters built for your brand · Monthly social engines",
  },
];

const howItWorksSteps = [
  {
    number: "01",
    step: "Talk",
    description: "We find out what you actually need.",
  },
  {
    number: "02",
    step: "Lock",
    description: "You approve the look before anything gets made.",
  },
  {
    number: "03",
    step: "Make",
    description: "We direct every frame.",
  },
  {
    number: "04",
    step: "Deliver",
    description: "Final files, on the date we agreed.",
  },
];

const whyItWorksPoints = [
  {
    number: "01",
    title: "Worlds a camera can't reach.",
    description: "No permits, no sets, no travel.",
  },
  {
    number: "02",
    title: "You approve the look before we build.",
    description: "No surprises at the end.",
  },
  {
    number: "03",
    title: "Every frame directed.",
    description: "Nothing ships looking like generic AI.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-ink text-paper selection:bg-red-bright selection:text-paper">
      {/* 🌟 1. HERO */}
      <PageHero
        eyebrow="AI-native film studio"
        title="Anyone can generate. We direct."
        description="We make films, ads, trailers and entire worlds for brands, studios, game makers and artists. Seven departments. One standard."
        actions={
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl"
            >
              <span>Start a project</span>
              <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </Link>
          </div>
        }
      />

      {/* ⚡ 2. THE PROBLEM */}
      <section className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="flex flex-col gap-6 max-w-4xl">
            <StaggerItem yOffset={16}>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    THE PROBLEM
                  </span>
                </div>
                <div className="red-heartbeat-line" />
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
                MOST AI WORK LOOKS THE SAME, <span className="text-red-bright">BECAUSE NOBODY DIRECTED IT.</span>
              </h2>
            </StaggerItem>

            <StaggerItem yOffset={24}>
              <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl">
                We decide every frame: the lens, the light, the timing, the moment. People make the calls, not a model.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 🎬 3. WHERE WE WORK (Seven Departments) */}
      <section id="departments" className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                WHERE WE WORK
              </span>
            </div>
            <div className="red-heartbeat-line" />
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
              SEVEN DEPARTMENTS. <span className="text-red-bright">ONE STANDARD.</span>
            </h2>
          </div>

          <StaggerContainer className="flex flex-col gap-6 sm:gap-8">
            {departments.map((dept) => (
              <StaggerItem key={dept.number} yOffset={20}>
                <div
                  id={dept.id}
                  className="scroll-mt-28 group border border-paper/10 bg-ink-raised p-6 sm:p-8 lg:p-10 rounded-sm hover:border-red-bright/40 transition-all duration-300 shadow-xl backdrop-blur-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8"
                >
                  {/* Left: Department Number & Name + Tagline */}
                  <div className="flex flex-col gap-3 lg:w-5/12">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-sm sm:text-base text-red-bright font-extrabold tracking-widest uppercase">
                        {dept.number}
                      </span>
                      <span className="text-paper/20 font-mono text-sm">·</span>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-paper group-hover:text-red-bright transition-colors">
                        {dept.name}
                      </h3>
                    </div>
                    <p className="font-body text-sm sm:text-base text-paper/90 leading-relaxed font-medium">
                      {dept.tagline}
                    </p>
                  </div>

                  {/* Middle: What We Make */}
                  <div className="flex flex-col gap-2 lg:w-5/12 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-paper/10 lg:pl-8">
                    <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">
                      WHAT WE MAKE
                    </span>
                    <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                      {dept.whatWeMake}
                    </p>
                  </div>

                  {/* Right: Button */}
                  <div className="pt-2 lg:pt-0 shrink-0 flex items-center">
                    <Link
                      href={`/contact?need=${dept.id}`}
                      className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-paper/20 bg-ink text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:border-red-bright/60 hover:text-red-bright hover:scale-[1.02] active:scale-[0.99] transition-all whitespace-nowrap w-full sm:w-auto text-center"
                    >
                      <span>Start a project</span>
                      <span className="font-display text-sm font-extrabold text-red-bright transition-transform duration-300 group-hover/btn:-translate-x-1">
                        ‹
                      </span>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 📽️ 4. FOR STUDIOS, LABELS & PUBLISHERS */}
      <section id="slate" className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="flex flex-col gap-8 max-w-4xl">
            <StaggerItem yOffset={16}>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    SLATE
                  </span>
                </div>
                <div className="red-heartbeat-line" />
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
                FOR STUDIOS, LABELS & <span className="text-red-bright">PUBLISHERS.</span>
              </h2>
            </StaggerItem>

            <StaggerItem yOffset={24}>
              <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl">
                Many projects? Take a standing slot with us. Every project gets the same team, the same standard, and a place in our calendar.
              </p>
            </StaggerItem>

            <StaggerItem yOffset={28} className="pt-2">
              <Link
                href="/contact?need=slate"
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl"
              >
                <span>Talk slate</span>
                <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                  ‹
                </span>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 🏢 5. FOR AGENCIES */}
      <section id="agencies" className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="flex flex-col gap-8 max-w-4xl">
            <StaggerItem yOffset={16}>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    FOR AGENCIES
                  </span>
                </div>
                <div className="red-heartbeat-line" />
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
                FOR AGENCIES: YOUR <span className="text-red-bright">AI FILM DEPARTMENT.</span>
              </h2>
            </StaggerItem>

            <StaggerItem yOffset={24}>
              <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl">
                We work as your credited AI partner: our name on the work, your client relationship untouched.
              </p>
            </StaggerItem>

            <StaggerItem yOffset={28} className="pt-2">
              <Link
                href="/contact?need=partnership"
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl"
              >
                <span>Talk partnership</span>
                <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                  ‹
                </span>
              </Link>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ⚙️ 6. HOW IT WORKS (four short steps in a row) */}
      <section className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                HOW IT WORKS
              </span>
            </div>
            <div className="red-heartbeat-line" />
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
              HOW IT <span className="text-red-bright">WORKS.</span>
            </h2>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {howItWorksSteps.map((item) => (
              <StaggerItem key={item.number} yOffset={24} className="h-full">
                <div className="group border border-paper/10 bg-ink-raised p-6 sm:p-8 rounded-sm hover:border-red-bright/40 transition-all duration-300 shadow-xl flex flex-col justify-between h-full backdrop-blur-sm">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-xs text-red-bright font-extrabold tracking-widest uppercase">
                      {item.number}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-paper group-hover:text-red-bright transition-colors">
                      {item.step}
                    </h3>
                    <p className="font-body text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 💡 7. WHY IT WORKS (three points) */}
      <section className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="text-red-bright font-extrabold text-sm">‹</span>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                  WHY IT WORKS
                </span>
              </div>
              <div className="red-heartbeat-line" />
            </div>

            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
              WHY IT <span className="text-red-bright">WORKS.</span>
            </h2>
          </div>

          <StaggerContainer className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
            {whyItWorksPoints.map((pt) => (
              <StaggerItem key={pt.number} yOffset={24}>
                <div className="group relative border-l-2 border-red-bright/40 hover:border-red-bright transition-colors duration-300 pl-6 sm:pl-8 py-5 sm:py-6 bg-ink-raised rounded-r-sm flex flex-col gap-2.5 border border-paper/5 shadow-md">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-red-bright font-bold tracking-widest">
                      {pt.number}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-paper group-hover:text-red-bright transition-colors">
                      {pt.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm sm:text-base text-muted leading-relaxed pl-7">
                    {pt.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 🏁 8. CLOSING CTA */}
      <section className="py-16 sm:py-24 lg:py-28 bg-ink border-t border-paper/10">
        <StaggerContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <StaggerItem yOffset={16}>
              <div className="flex items-center gap-2">
                <span className="text-red-bright font-extrabold text-sm">‹</span>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                  START A PROJECT
                </span>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-paper leading-[1.05]">
                WE'RE NOT THAT <span className="text-red-bright">HARD TO FIND</span>.
              </h3>
            </StaggerItem>
          </div>

          <StaggerItem yOffset={16} className="w-full md:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl w-full sm:w-auto text-center"
            >
              <span>Start a project</span>
              <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  );
}
