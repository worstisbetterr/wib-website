"use client";

import Logo from "@/components/brand/Logo";
import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/content/site";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-ink border-b hairline-b">
      {/* Full-Screen Showreel Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover filter contrast-125 saturate-90 scale-105"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark Editorial Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="absolute inset-0 bg-dot-grid opacity-30" />
      </div>

      {/* Hero Top Overlay Header (Visible on initial full-screen showreel arrival) */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <Logo variant="full" size="md" />

        <div className="flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className="px-3.5 py-1.5 rounded-sm bg-ink/80 backdrop-blur-md hairline-box text-xs font-mono text-paper/80 hover:text-paper hover:border-red-bright/40 transition-colors flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-red-bright animate-ping" />
            <span>{isMuted ? "SOUND OFF 🔇" : "SOUND ON 🔊"}</span>
          </button>
          <span className="font-mono text-xs text-muted hidden sm:inline-block">
            <span className="index-num">(01)</span> REEL #2026
          </span>
        </div>
      </div>

      {/* Hero Center Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col gap-6 text-center sm:text-left pt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <WrongWayAccent text="FULL-SCREEN SHOWREEL" />
          <div className="font-mono text-xs text-muted/80">
            EST. 2026 // TOKYO · LONDON · NYC
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tight uppercase leading-[0.92] text-paper"
        >
          WE MAKE THE <br />
          <span
            style={{
              background: "linear-gradient(135deg, #E72D31 0%, #9E1021 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WORST
          </span>{" "}
          ADS.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-tagline text-lg sm:text-2xl md:text-3xl text-paper/90 font-normal leading-relaxed max-w-3xl"
        >
          “Said with a straight face, while the work on screen is obviously exceptional.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-4"
        >
          <Button href="/contact" variant="primary">
            Start a project
          </Button>
          <Button href="/work" variant="ghost">
            Explore case studies
          </Button>
        </motion.div>
      </div>

      {/* Hero Bottom Overlay Footer & Animated Scroll Prompt */}
      <div className="relative z-10 w-full flex items-end justify-between text-xs font-mono text-muted pt-6 border-t border-paper/10">
        <div className="hidden sm:flex items-center gap-6">
          <span>{siteConfig.description.slice(0, 75)}...</span>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center gap-2 text-paper font-display text-xs uppercase font-bold tracking-widest mx-auto sm:mx-0"
        >
          <span className="text-red-bright font-extrabold text-sm">↓</span>
          <span>SCROLL TO EXPLORE SHOWCASE</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
