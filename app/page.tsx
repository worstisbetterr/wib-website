"use client";

import UnifiedHero from "@/components/home/UnifiedHero";
import AIMeshGrid from "@/components/motion/AIMeshGrid";
import ShowreelPlayer from "@/components/ui/ShowreelPlayer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionSystem";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { workProjects } from "@/content/work";
import Link from "next/link";
import React from "react";

// Boolean toggle to show/hide Section 4 ("WORSTY RATES YOUR AD")
const SHOW_WORSTY_SECTION = false;

// Three selected work projects: SuperErgo, Neutrogena, Vida
const homeWorkProjects = workProjects.filter((p) =>
  ["superergo", "neutrogena", "vida"].includes(p.id)
);

const departments = [
  {
    id: "brands",
    number: "01",
    name: "Brands & Advertising",
    tagline: "Films for brands that refuse to look like everyone else's AI ads.",
  },
  {
    id: "film-development",
    number: "02",
    name: "Film: Development",
    tagline: "Getting a film made before the money arrives.",
  },
  {
    id: "film-preproduction",
    number: "03",
    name: "Film: Pre-Production",
    tagline: "Mistakes are cheapest before the shoot.",
  },
  {
    id: "film-post",
    number: "04",
    name: "Film: Post & Finishing",
    tagline: "The shot that failed, fixed. The shot never filmed, built.",
  },
  {
    id: "gaming",
    number: "05",
    name: "Gaming",
    tagline: "Built to the game's look, on the showcase date.",
  },
  {
    id: "music",
    number: "06",
    name: "Music",
    tagline: "Built backwards from the release date.",
  },
  {
    id: "social",
    number: "07",
    name: "Performance & Social",
    tagline: "Volume, on a date.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink text-paper selection:bg-red-bright selection:text-paper">
      {/* 🎬 HERO SECTION — Untouched Full-Screen Video Hero */}
      <UnifiedHero />

      {/* 🏛️ SECTION 1: THE PROMISE */}
      <section className="py-16 sm:py-24 lg:py-28 relative bg-ink border-t border-paper/10 z-10 overflow-hidden">
        <AIMeshGrid />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <StaggerContainer className="max-w-4xl flex flex-col items-start text-left gap-6 sm:gap-8">
            <StaggerItem yOffset={16}>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    THE PROMISE
                  </span>
                </div>
                <div className="red-heartbeat-line" />
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-paper leading-[1.05] tracking-tight max-w-3xl">
                ANYONE CAN GENERATE. <br />
                <span className="text-red-bright">WE DIRECT.</span>
              </h2>
            </StaggerItem>

            <StaggerItem yOffset={24}>
              <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl">
                Most AI ads look like AI. Ours look like the brand. Every frame is a decision made by filmmakers, not a model.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 🎬 SECTION 2: WORK PREVIEW */}
      <section className="py-16 sm:py-24 lg:py-28 border-t border-paper/10 bg-ink relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          <ScrollReveal className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                OUR WORST WORK
              </span>
            </div>
            <div className="red-heartbeat-line" />
          </ScrollReveal>

          {/* 4 Playable Tiles */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {homeWorkProjects.map((project) => (
              <StaggerItem key={project.id} yOffset={20}>
                <div className="border border-paper/15 bg-ink-raised rounded-sm p-6 sm:p-8 shadow-2xl flex flex-col gap-5 backdrop-blur-md">
                  <div className="pb-3 border-b border-paper/10">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-paper tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <ShowreelPlayer
                    videoUrl={project.video}
                    title={project.title}
                    showBadge={false}
                    clickText={`CLICK TO PLAY ${project.title}`}
                  />

                  <div className="pt-1 flex items-center">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      {project.department || "Brands & Advertising"}
                      {project.selfInitiated && " · Self-initiated"}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* See all work button */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-paper/20 bg-ink-raised text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:border-red-bright/50 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-md"
            >
              <span>See all work</span>
              <span className="font-display text-sm font-extrabold text-red-bright transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 SECTION 3: SEVEN DEPARTMENTS */}
      <section className="py-16 sm:py-24 lg:py-28 border-t border-paper/10 bg-ink relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          <ScrollReveal className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                WHERE WE WORK
              </span>
            </div>
            <div className="red-heartbeat-line" />
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-paper tracking-tight">
              SEVEN DEPARTMENTS.
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {departments.map((dept, index) => (
              <StaggerItem
                key={dept.id}
                yOffset={24}
                className={index === 6 ? "md:col-span-2 lg:col-span-1 h-full" : "h-full"}
              >
                <Link
                  href={`/services#${dept.id}`}
                  className="group border border-paper/10 bg-ink-raised p-6 sm:p-8 rounded-sm hover:border-red-bright/40 transition-all duration-300 shadow-xl flex flex-col justify-between h-full backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-red-bright font-extrabold tracking-widest uppercase">
                        {dept.number}
                      </span>
                      <span className="font-display text-base text-paper/30 group-hover:text-red-bright transition-all duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-paper group-hover:text-red-bright transition-colors">
                      {dept.name}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                      {dept.tagline}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 😈 SECTION 4: WORSTY RATES YOUR AD (HIDDEN BEHIND SHOW_WORSTY_SECTION) */}
      {SHOW_WORSTY_SECTION && (
        <section className="py-16 sm:py-24 lg:py-28 border-t border-paper/10 bg-ink relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="flex flex-col gap-6 max-w-4xl">
              <StaggerItem yOffset={16}>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-red-bright font-extrabold text-sm">‹</span>
                    <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                      FREE, HONEST, MILDLY INSULTING
                    </span>
                  </div>
                  <div className="red-heartbeat-line" />
                </div>
              </StaggerItem>

              <StaggerItem yOffset={20}>
                <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-paper leading-[1.04]">
                  WORSTY RATES YOUR <span className="text-red-bright">AD.</span>
                </h2>
              </StaggerItem>

              <StaggerItem yOffset={24}>
                <p className="font-body text-base sm:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl">
                  Send us one of your ads. Our resident devil will tell you exactly what's wrong with it, in 60 seconds. Five slots a week.
                </p>
              </StaggerItem>

              <StaggerItem yOffset={28} className="pt-2">
                <Link
                  href="/rate-my-ad"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl"
                >
                  <span>Submit your ad</span>
                  <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                    ‹
                  </span>
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 🏁 SECTION 5: CLOSE */}
      <section className="py-16 sm:py-24 lg:py-28 bg-ink border-t border-paper/10 relative z-10">
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
                TELL US WHAT YOU'RE <span className="text-red-bright">LAUNCHING</span>.
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
    </main>
  );
}
