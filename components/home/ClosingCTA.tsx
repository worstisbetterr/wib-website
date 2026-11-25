"use client";

import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { motion } from "framer-motion";
import React from "react";

export const ClosingCTA: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-ink bg-dot-grid relative overflow-hidden hairline-t">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-bright/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Technical Corner Annotations (Image 3 Style) */}
      <div className="absolute top-8 left-8 text-muted/40 font-mono text-xs hidden md:block">
        EST. 2026 // WIB®
      </div>
      <div className="absolute top-8 right-8 text-muted/40 font-mono text-xs hidden md:block">
        QUALIFIED INQUIRIES ONLY
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
        {/* Header Tag with Red Superscript */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <WrongWayAccent text="INITIATE PRODUCTION" />
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="index-num">(05)</span>
            <span>Direct Client Pipeline</span>
          </div>
        </div>

        {/* Dynamic Kinetic Background Text with Overlapping Floating Red Card (Direct Adaptation of Image 3) */}
        <div className="relative py-12 flex items-center justify-center">
          {/* Kinetic Display Background Headline (Image 3 Background Text Style) */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-paper/15 text-center leading-[0.95] select-none max-w-5xl">
            CRAFTING IMPOSSIBLE COMMERCIALS THAT DOMINATE YOUR CATEGORY
          </h2>

          {/* Central Floating Red Accent Card (Direct Adaptation of Image 3 Central Red Box) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute bg-red-gradient p-8 sm:p-10 rounded-sm shadow-2xl max-w-md w-full text-paper border border-red-bright/30 flex flex-col gap-6 z-20"
          >
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest opacity-90 border-b border-paper/20 pb-3">
              <span className="font-bold">// wib.dev</span>
              <span className="px-2 py-0.5 bg-paper/20 rounded-xs">QUALIFIED</span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide leading-tight">
                Ready to make your worst ad yet?
              </h3>
              <p className="text-xs font-body opacity-95 leading-relaxed">
                We have all the generative video capabilities you need to scale your luxury brand or D2C presence with zero velocity loss.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button href="/contact" variant="ghost" className="bg-paper/10 border-paper/40 hover:bg-paper hover:text-ink text-xs">
                Build with us ⚡
              </Button>

              <a
                href="/work"
                className="font-display text-xs font-bold uppercase tracking-wider underline hover:opacity-80 flex items-center gap-1"
              >
                <span>Details</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Expectations Reset */}
        <div className="pt-16 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            <span className="index-num">(5a)</span>
            <span>{siteConfig.qualifyingNote}</span>
          </div>
          <div className="text-paper/80">
            <span>Direct Inquiry: {siteConfig.contactEmail}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
