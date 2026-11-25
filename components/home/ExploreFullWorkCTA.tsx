"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import React from "react";

export const ExploreFullWorkCTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-ink bg-dot-grid hairline-b relative overflow-hidden text-center">
      {/* Ambient Red Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-bright/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center gap-8">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-paper leading-tight"
        >
          EXPLORE OUR FULL VAULT OF WORST WORK
        </motion.h2>

        {/* Primary CTA Button (NO description paragraph as requested) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="pt-2 flex items-center justify-center"
        >
          <Button href="/work" variant="primary" showChevron={true} className="px-8 py-4 text-sm font-extrabold">
            EXPLORE FULL WORK
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreFullWorkCTA;
