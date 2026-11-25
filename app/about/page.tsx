"use client";

import PageHero from "@/components/ui/PageHero";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionSystem";
import { aboutData } from "@/content/about";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-ink text-paper selection:bg-red-bright selection:text-paper overflow-hidden">

      {/* 🌟 1. HERO HEADER */}
      <PageHero
        eyebrow="ABOUT"
        title="ABOUT US."
      />

      {/* 📜 2. BEAT 1: THE CROSSED-OUT MANIFESTO (THE QUIRK) */}
      <section className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink/90 relative overflow-hidden z-10">
        {/* Subtle Ambient Section Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-bright/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12 sm:gap-16">
          {/* Eyebrow */}
          <StaggerContainer>
            <StaggerItem yOffset={16}>
              <div className="flex items-center gap-2">
                <span className="text-red-bright font-extrabold text-sm">‹</span>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                  ABOUT
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Struck-Through Corporate Manifesto Block & Punchline Stack */}
          <div className="flex flex-col gap-12 lg:gap-16 max-w-5xl">
            {/* CORPORATE MANIFESTO TEXT BLOCK (WITH ANIMATED RED STRIKE-THROUGH) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-10 bg-ink-raised/70 hairline-box rounded-sm backdrop-blur-md overflow-hidden"
            >
              {/* Serious Corporate Buzzword Paragraphs */}
              <div className="space-y-4 font-body text-base sm:text-lg text-muted/80 leading-relaxed transition-opacity duration-500">
                {aboutData.corporateManifesto.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* 🖊️ Animated Red Hand-Drawn Strike-Through Line */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                {/* Primary Diagonal Slash Line 1 */}
                <motion.path
                  d="M 2 18 L 98 82"
                  stroke="#E72D31"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.95 }}
                  whileInView={{ pathLength: 1, opacity: 0.95 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
                {/* Secondary Offset Slash Line 2 for thick marker weight */}
                <motion.path
                  d="M 5 82 L 95 18"
                  stroke="#E72D31"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.8 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                />
                {/* Center Horizontal Slash Line 3 */}
                <motion.path
                  d="M 0 50 L 100 50"
                  stroke="#E72D31"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: shouldReduceMotion ? 1 : 0, opacity: 0.9 }}
                  whileInView={{ pathLength: 1, opacity: 0.9 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </svg>

              {/* Red Stamp Overlay Watermark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7, ease: "backOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 border-4 border-red-bright text-red-bright font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest z-30 select-none bg-ink/90 rounded-sm shadow-2xl"
              >
                [ VOIDED MANIFESTO ]
              </motion.div>
            </motion.div>

            {/* 💥 THE PUNCHLINE */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="flex flex-col gap-4 pt-2"
            >
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-paper tracking-tight leading-[1.08]">
                YOU DON'T CARE ABOUT THIS. <br />
                <span className="text-red-bright">HONESTLY, NEITHER DO WE.</span>
              </h2>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-red-bright font-extrabold text-sm animate-bounce">↓</span>
                <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-muted">
                  {aboutData.punchline.subline}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 👥 3. BEAT 2: THE FOUNDERS (THE ONE REAL THING) */}
      <section className="py-16 sm:py-24 lg:py-28 border-b border-paper/10 bg-ink/90 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
          {/* Eyebrow & Title */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-red-bright font-extrabold text-sm">‹</span>
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                {aboutData.foundersEyebrow}
              </span>
            </div>
            <div className="red-heartbeat-line" />
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-paper mt-2">
              THE <span className="text-red-bright">FOUNDERS</span>.
            </h2>
          </div>

          {/* Two Founder Tiles */}
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {aboutData.founders.map((founder, idx) => (
              <StaggerItem key={idx} yOffset={24}>
                <div className="group border border-paper/10 bg-ink-raised p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row gap-6 sm:gap-8 items-center hover:border-red-bright/40 transition-all duration-300 shadow-xl h-full backdrop-blur-sm">
                  {/* Founder Image Frame */}
                  <div className="relative w-48 h-80 sm:w-56 sm:h-96 rounded-sm overflow-hidden bg-black border border-paper/15 shrink-0 group-hover:border-red-bright/60 transition-colors shadow-2xl p-2">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-contain filter contrast-[1.05] brightness-105 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Founder Details */}
                  <div className="flex flex-col justify-center items-center sm:items-start gap-3 flex-1 text-center sm:text-left">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-xs text-red-bright font-bold tracking-widest uppercase">
                        {founder.role}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wide text-paper group-hover:text-red-bright transition-colors">
                        {founder.name}
                      </h3>
                    </div>

                    {founder.instagram && (
                      <a
                        href={founder.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-4 py-2 bg-ink border border-paper/15 rounded-sm font-mono text-xs text-paper/80 hover:text-red-bright hover:border-red-bright/50 transition-all shadow-md group/ig"
                        aria-label={`${founder.name} Instagram`}
                      >
                        <svg
                          className="w-4 h-4 text-red-bright transition-transform duration-300 group-hover/ig:scale-110"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span className="font-bold tracking-widest text-[11px] uppercase">INSTAGRAM</span>
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 🏁 4. BEAT 3: CLOSING */}
      <section className="py-16 sm:py-24 lg:py-28 bg-ink/90 border-t border-paper/10 relative z-10">
        <StaggerContainer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <StaggerItem yOffset={16}>
              <div className="flex items-center gap-2">
                <span className="text-red-bright font-extrabold text-sm">‹</span>
                <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                  THAT IS ALL
                </span>
              </div>
            </StaggerItem>

            <StaggerItem yOffset={20}>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-paper leading-[1.05]">
                {aboutData.closing.statement}
              </h3>
            </StaggerItem>
          </div>

          {/* Action CTA Buttons */}
          <StaggerItem yOffset={16} className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-gradient-to-r from-red-bright to-red-dark text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl w-full sm:w-auto text-center"
            >
              <span>START A PROJECT</span>
              <span className="font-display text-sm font-extrabold transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:py-5 border border-paper/20 bg-ink-raised text-paper font-display text-xs font-bold uppercase tracking-widest rounded-sm hover:border-red-bright/50 hover:scale-[1.02] active:scale-[0.99] transition-all shadow-md w-full sm:w-auto text-center"
            >
              <span>EXPLORE OUR WORK</span>
              <span className="font-display text-sm font-extrabold text-red-bright transition-transform duration-300 group-hover:-translate-x-1">
                ‹
              </span>
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  );
}
