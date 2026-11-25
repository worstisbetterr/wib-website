"use client";

import Logo from "@/components/brand/Logo";
import CyberTextReveal from "@/components/motion/CyberTextReveal";
import TiltCard from "@/components/motion/TiltCard";
import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import React from "react";

export const HeroHeadline: React.FC = () => {
  return (
    <section className="min-h-[85vh] lg:min-h-screen flex flex-col justify-center items-center bg-ink hairline-b relative overflow-hidden text-center py-20 sm:py-28 transition-colors duration-300">
      

      {/* 🌟 2. FULL SECTION-WIDE SOFT AMBIENT GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/65 to-ink/90 blur-3xl opacity-85 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-red-bright/5 rounded-full blur-[220px] pointer-events-none z-0" />

      {/* 🌟 3. CENTER-ALIGNED FULL PAGE CONTENT BLOCK */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center p-6 sm:p-10 lg:p-12 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto w-full">
        
        {/* Compact Hero Brand Group */}
        <div className="flex flex-col items-center justify-center text-center w-full gap-0">
          {/* Header Accent — Strictly One Line */}
          <div className="flex justify-center w-full relative z-20">
            <WrongWayAccent text="AI-NATIVE CREATIVE COMPANY" className="whitespace-nowrap" />
          </div>

          {/* MAIN BRAND LOGO — HEAVY NEGATIVE MARGINS TO CANCEL PNG CANVAS PADDING */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center w-full -my-10 sm:-my-14 md:-my-20 lg:-my-24 relative z-10"
          >
            <Logo variant="whole" size="2xl" />
          </motion.div>

          {/* Clean One-Line Pointers — Strictly One Line */}
          <div className="w-full flex justify-center overflow-x-auto no-scrollbar relative z-20">
            <p className="whitespace-nowrap font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest text-paper/90 leading-none">
              <CyberTextReveal
                text="AI COMMERCIALS • BRAND FILMS • CAMPAIGNS"
                className="text-paper/90 whitespace-nowrap"
                delay={0.3}
              />
            </p>
          </div>
        </div>

        {/* Primary Action Button: Check Our Worst Work */}
        <div className="pt-8 relative z-20">
          <TiltCard>
            <Button href="/work" variant="primary" showChevron={true} className="px-9 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider">
              Check Our Worst Work
            </Button>
          </TiltCard>
        </div>
      </div>

    </section>
  );
};

export default HeroHeadline;
