"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const ShowreelHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Default to sound ON (unmuted) when someone comes to the website
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser autoplay policy blocks unmuted audio on initial page load,
          // play as soon as the user performs any gesture (click, touch, keydown)
          const enableAudioOnInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.play().catch(() => {});
              setIsMuted(false);
            }
          };

          window.addEventListener("click", enableAudioOnInteraction, { once: true });
          window.addEventListener("keydown", enableAudioOnInteraction, { once: true });
          window.addEventListener("touchstart", enableAudioOnInteraction, { once: true });
        });
      }
    }
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-14 bg-black border-b hairline-b">
      {/* 100% Pure Full-Screen Showreel Video (Sound ON by default) */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={false}
          playsInline
          poster="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover filter contrast-115 saturate-95"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle Cyber Overlay Gradients */}
        <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Bottom Control Bar: Light/Dark Toggle on Left, Scroll Down Box in Middle, Sound Icon on Right */}
      <div className="relative z-20 w-full grid grid-cols-3 items-center pb-6 sm:pb-10 md:pb-12">
        {/* LEFT: Empty slot preserving grid alignment */}
        <div className="flex items-center justify-start" />

        {/* MIDDLE: Scroll Down Box - Crystal Clear White Text */}
        <div className="flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex items-center gap-2.5 bg-black/90 backdrop-blur-md px-4 sm:px-5 py-2.5 rounded-sm font-display text-xs text-white uppercase font-extrabold tracking-widest shadow-2xl border border-white/25 whitespace-nowrap"
          >
            <span className="text-red-bright font-extrabold text-sm">↓</span>
            <span className="hidden sm:inline text-white">SCROLL DOWN TO EXPLORE</span>
            <span className="sm:hidden text-white">SCROLL DOWN</span>
          </motion.div>
        </div>

        {/* RIGHT: Sleek Sound Icon Toggle Button (ON by default, users can click to Mute) */}
        <div className="flex justify-end">
          <button
            onClick={toggleAudio}
            className="h-10 w-10 rounded-sm bg-red-gradient text-paper shadow-xl border border-red-bright/50 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 border-cyber-glow group"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Showreel Sound"
          >
            {isMuted ? (
              <VolumeX className="h-4.5 w-4.5 text-paper group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 className="h-4.5 w-4.5 text-paper group-hover:scale-110 transition-transform animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowreelHero;
