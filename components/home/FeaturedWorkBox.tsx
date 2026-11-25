"use client";

import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/content/work";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

// Curated 5 Client Brand Logos with direct case study project links
const featuredBrandLogos = [
  {
    name: "AURA ATELIER",
    category: "Luxury Haute Horlogerie",
    href: "/work/aura-haute-horlogerie",
  },
  {
    name: "NEXUS HYDRATION",
    category: "High-Growth D2C",
    href: "/work/nexus-hydration-system",
  },
  {
    name: "SYNTHIA OS",
    category: "Frontier AI Lab",
    href: "/work/synthia-os-launch",
  },
  {
    name: "CHRONO X",
    category: "Neo-Streetwear Runway",
    href: "/work/chrono-x-apparel",
  },
  {
    name: "NEO CYBERNETICS",
    category: "Autonomous Systems",
    href: "/work",
  },
];

export const FeaturedWorkBox: React.FC = () => {
  const featured = caseStudies[0]; // Featured Case Study Video/Background

  return (
    <section className="py-20 sm:py-32 md:py-40 bg-transparent relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-red-bright/5 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 50/50 Split-Screen Container — Ultra-Smooth GPU-Accelerated 60FPS Layout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative rounded-sm overflow-hidden bg-ink-raised shadow-2xl w-full border border-paper/15 grid grid-cols-1 lg:grid-cols-2 min-h-[480px] sm:min-h-[540px] md:min-h-[580px] transform-gpu transition-all duration-300 hover:border-red-bright/30"
        >
          {/* LEFT SIDE PANEL: Dark Box Container with Vault Text & Button */}
          <div className="relative z-20 bg-[#09090b] p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center items-start text-left gap-6 border-b lg:border-b-0 lg:border-r border-paper/15">
            {/* Header Accent Badge */}
            <WrongWayAccent text="CREATIVE VAULT" />

            {/* 2-Line Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              EXPLORE OUR FULL VAULT<br />
              <span className="text-white">OF WORST WORK</span>
            </h2>

            <p className="text-sm sm:text-base font-tagline text-paper/70 max-w-md leading-relaxed">
              Discover our complete archive of AI commercials, brand films, and experimental brand worlds.
            </p>

            {/* Explore Button */}
            <div className="pt-2">
              <Button
                href="/work"
                variant="primary"
                showChevron={true}
                className="px-8 py-4 text-xs sm:text-sm font-extrabold shadow-2xl hover:scale-105 transition-transform"
              >
                EXPLORE FULL WORK
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE PANEL: Smooth Background with 5 Clickable Brand Logos */}
          <div className="relative z-10 overflow-hidden flex items-center justify-center p-6 sm:p-10 lg:p-12 min-h-[380px] lg:min-h-full">
            {/* Background Autoplay Video / Poster */}
            <div className="absolute inset-0 z-0 transform-gpu overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={featured.poster}
                className="w-full h-full object-cover filter contrast-110 saturate-90 transform-gpu group-hover:scale-105 transition-transform duration-700 ease-out"
              >
                {featured.video && <source src={featured.video} type="video/mp4" />}
              </video>

              {/* Gradient & Scanline Overlays for Luxury Contrast */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/65 to-black/85 pointer-events-none" />
              <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />
            </div>

            {/* 5 Clickable Brand Logos Grid in Right Panel */}
            <div className="relative z-10 w-full max-w-md grid grid-cols-2 gap-3.5 sm:gap-4">
              {featuredBrandLogos.map((client, idx) => (
                <Link
                  key={idx}
                  href={client.href}
                  className={`bg-black/85 backdrop-blur-xl border border-paper/15 p-4 sm:p-5 rounded-sm flex flex-col items-center justify-center text-center gap-1 group/card transform-gpu hover:scale-105 hover:border-red-bright/60 hover:bg-black/95 transition-all duration-200 shadow-xl cursor-pointer ${
                    idx === 4 ? "col-span-2 sm:col-span-2 max-w-[240px] mx-auto w-full" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-xs sm:text-sm font-extrabold tracking-wider text-paper uppercase group-hover/card:text-red-bright transition-colors">
                      {client.name}
                    </span>
                    <span className="text-red-bright opacity-0 group-hover/card:opacity-100 transition-opacity text-xs font-mono">
                      ↗
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-muted uppercase tracking-widest">
                    {client.category}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorkBox;
