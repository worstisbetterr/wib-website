"use client";

import React from "react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ShowreelPlayer from "@/components/ui/ShowreelPlayer";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionSystem";
import { workProjects } from "@/content/work";

export default function WorkPage() {
  return (
    <div className="relative min-h-screen bg-ink text-paper selection:bg-red-bright selection:text-paper overflow-hidden">
      {/* 🌟 1. HERO HEADER */}
      <PageHero
        eyebrow="OUR WORK"
        title="OUR WORK."
        description="AI-led films and visual brand universes engineered for teams who refuse generic output."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col gap-16 sm:gap-24">
        {/* 🎬 2. TOP SECTION: WIB CONCEPT FILM */}
        <ScrollReveal>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                WIB CONCEPT FILM
              </span>
            </div>
            <ShowreelPlayer
              videoUrl="/videos/hero_desktop.mp4"
              title="WIB Concept Film"
              badgeLabel="WIB CONCEPT FILM"
              clickText="CLICK TO PLAY WIB CONCEPT FILM"
            />
          </div>
        </ScrollReveal>

        {/* 🎯 3. SELECTED WORK SECTION */}
        <div className="flex flex-col gap-8">
          <ScrollReveal>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-red-bright font-extrabold text-sm">‹</span>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                  PORTFOLIO
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-paper tracking-tight">
                SELECTED WORK
              </h2>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {workProjects.map((project) => (
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
        </div>
      </div>

      {/* 🏁 4. CLOSING CTA BAND */}
      <section className="relative py-16 sm:py-24 lg:py-28 bg-ink border-t border-paper/10">
        <StaggerContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <StaggerItem>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    NEXT STEPS
                  </span>
                </div>
                <div className="red-heartbeat-line" />
              </div>
            </StaggerItem>
            <StaggerItem yOffset={20}>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-wide text-paper">
                HAVE AN IMPOSSIBLE BRIEF?
              </h3>
            </StaggerItem>
            <StaggerItem yOffset={16}>
              <p className="text-sm sm:text-base text-muted leading-relaxed font-body">
                Good. Those are the only fun ones.
              </p>
            </StaggerItem>
          </div>
          <StaggerItem yOffset={16} className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-lg w-full sm:w-auto text-center"
            >
              <span>START A PROJECT</span>
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
