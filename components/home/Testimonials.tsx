"use client";

import GlowCard from "@/components/motion/GlowCard";
import WrongWayAccent from "@/components/motion/WrongWayAccent";
import { siteConfig } from "@/content/site";
import { motion } from "framer-motion";
import React from "react";

export const Testimonials: React.FC = () => {
  // Duplicate testimonials array for smooth infinite floating marquee stream
  const duplicatedTestimonials = [
    ...siteConfig.testimonials,
    ...siteConfig.testimonials,
    ...siteConfig.testimonials,
    ...siteConfig.testimonials,
  ];

  return (
    <section className="py-20 md:py-32 bg-ink hairline-b bg-dot-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <WrongWayAccent text="RECEPTION & VERIFIED IMPACT" />
            <span className="font-mono text-xs text-muted">
              <span className="index-num">(04)</span> VERIFIED REVIEWS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-paper">
            CLIENT TESTIMONIALS
          </h2>
        </div>
      </div>

      {/* Floating Testimonial Cards Marquee Container (Sliding Right to Left with GlowCard Spotlight Animations) */}
      <div className="relative w-full overflow-hidden py-4 flex">
        {/* Gradient Fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        {/* Continuous Floating Track moving from Right to Left */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          }}
          className="flex items-center gap-6 whitespace-normal flex-nowrap min-w-max py-2"
        >
          {duplicatedTestimonials.map((item, idx) => (
            <GlowCard key={`${item.id}-${idx}`} className="min-w-[320px] max-w-[360px] h-[220px]">
              <div className="p-6 h-full flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-3">
                  {/* Metric Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[11px] font-extrabold text-red-bright uppercase tracking-wider bg-red-bright/10 border border-red-bright/30 px-2.5 py-0.5 rounded-sm">
                      {item.metric}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-tagline text-xs sm:text-sm text-paper/90 leading-relaxed font-normal line-clamp-3">
                    “{item.quote}”
                  </blockquote>
                </div>

                {/* Author Footer */}
                <div className="pt-3 border-t border-paper/15 flex flex-col gap-0.5">
                  <span className="font-display text-xs font-bold uppercase text-paper group-hover:text-red-bright transition-colors">
                    {item.author}
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    {item.role} · <span className="text-paper">{item.company}</span>
                  </span>
                </div>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
