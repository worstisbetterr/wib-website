"use client";

import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type UnifiedHeroProps = {
  desktopVideo?: string;
  mobileVideo?: string;
  desktopPoster?: string;
  mobilePoster?: string;
};

const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
};

export const UnifiedHero: React.FC<UnifiedHeroProps> = ({
  desktopVideo = "/videos/hero_desktop.mp4",
  mobileVideo = "/videos/hero_mobile.mp4",
  desktopPoster = "/videos/hero_poster.jpg",
  mobilePoster = "/videos/hero_poster.jpg",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  // Check network speed / data saver on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "connection" in navigator) {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
        setIsSlowConnection(true);
      }
    }
  }, []);

  // Check first-time vs returning visitor for default audio preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("wib_visited_before");
      if (!hasVisited) {
        // First-time visitor: audio ON by default
        setIsMuted(false);
        localStorage.setItem("wib_visited_before", "true");
      } else {
        // Returning visitor: audio OFF by default
        setIsMuted(true);
      }
    }
  }, []);

  // Detect screen size & reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    }

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", handleMobileChange);
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      }
      if (mobileQuery.removeEventListener) {
        mobileQuery.removeEventListener("change", handleMobileChange);
      }
    };
  }, []);

  const activeVideoUrl = isMobile && mobileVideo ? mobileVideo : desktopVideo;
  const youtubeId = getYouTubeId(activeVideoUrl);

  // Handle HTML5 Video Autoplay safely
  useEffect(() => {
    if (prefersReducedMotion || youtubeId) return;

    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [prefersReducedMotion, isMuted, youtubeId]);

  const toggleAudio = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }

    // Toggle sound for YouTube iframe via postMessage
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextMuted
        ? '{"event":"command","func":"mute","args":""}'
        : '{"event":"command","func":"unMute","args":""}';
      iframeRef.current.contentWindow.postMessage(command, "*");
      if (!nextMuted) {
        iframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"setVolume","args":[100]}',
          "*"
        );
      }
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const activePoster = isMobile && mobilePoster ? mobilePoster : desktopPoster;

  return (
    <section className="relative h-[100dvh] w-full min-w-full overflow-hidden bg-[#100808] flex flex-col justify-between select-none">
      {/* 🎬 1. FULL-BLEED CONCEPT VIDEO (100dvh x 100vw, YouTube & Native Support) */}
      <div className="absolute inset-0 z-0 bg-[#100808] w-full h-full">
        {/* Poster Still Frame */}
        {activePoster && (
          <picture className="absolute inset-0 w-full h-full">
            {mobilePoster && (
              <source media="(max-width: 768px)" srcSet={mobilePoster} />
            )}
            <img
              src={activePoster}
              alt="WORSTISBETTERR Concept Reel Still"
              className={`w-full h-full object-cover object-center filter contrast-110 saturate-90 transition-opacity duration-700 ${
                videoLoaded ? "opacity-0" : "opacity-100"
              }`}
            />
          </picture>
        )}

        {!prefersReducedMotion && !isSlowConnection && (
          <>
            {youtubeId ? (
              /* YouTube Full-Bleed Embedded Background Player (No controls, no popups) */
              <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none flex items-center justify-center">
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&enablejsapi=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&cc_lang_pref=none&vq=hd1080&modestbranding=1&disablekb=1&fs=0`}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none filter contrast-[1.05] saturate-95 ${
                    isMobile
                      ? "w-[56.25vh] min-w-full h-[177.77777778vw] min-h-full scale-[1.02]"
                      : "w-[177.77777778vh] min-w-full h-[56.25vw] min-h-full scale-[1.01]"
                  }`}
                  allow="autoplay; encrypted-media"
                  title="WORSTISBETTERR Concept Film"
                  onLoad={() => {
                    setVideoLoaded(true);
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      try {
                        const configurePlayer = () => {
                          if (!iframeRef.current || !iframeRef.current.contentWindow) return;
                          const cw = iframeRef.current.contentWindow;

                          // Force highest video quality
                          cw.postMessage(
                            JSON.stringify({ event: "command", func: "setPlaybackQuality", args: ["highres"] }),
                            "*"
                          );
                          cw.postMessage(
                            JSON.stringify({ event: "command", func: "setPlaybackQuality", args: ["hd1080"] }),
                            "*"
                          );

                          // Disable / unload captions
                          cw.postMessage(
                            JSON.stringify({ event: "command", func: "unloadModule", args: ["captions"] }),
                            "*"
                          );
                          cw.postMessage(
                            JSON.stringify({ event: "command", func: "setOption", args: ["captions", "track", {}] }),
                            "*"
                          );
                          cw.postMessage(
                            JSON.stringify({ event: "command", func: "setOption", args: ["cc", "track", {}] }),
                            "*"
                          );

                          // Sync audio state
                          if (!isMuted) {
                            cw.postMessage(
                              JSON.stringify({ event: "command", func: "unMute", args: "" }),
                              "*"
                            );
                            cw.postMessage(
                              JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
                              "*"
                            );
                          }
                        };

                        configurePlayer();
                        setTimeout(configurePlayer, 500);
                        setTimeout(configurePlayer, 1500);
                      } catch (err) {}
                    }
                  }}
                />
              </div>
            ) : (
              /* Native HTML5 Video Player */
              <video
                key={isMobile ? "mobile-video" : "desktop-video"}
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={activePoster}
                onLoadedData={() => setVideoLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover object-center filter contrast-110 saturate-90 transition-opacity duration-700 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
              >
                <source src={activeVideoUrl} type="video/mp4" />
              </video>
            )}
          </>
        )}

        {/* 🌑 Subtle Vignette Edge Mask */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, transparent 55%, rgba(16, 8, 8, 0.6) 98%)",
          }}
        />
      </div>

      {/* 🔊 Sound Toggle Button */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
        <button
          onClick={toggleAudio}
          className="h-10 w-10 rounded-sm bg-black/50 backdrop-blur-md text-paper border border-white/20 hover:border-white/50 flex items-center justify-center cursor-pointer transition-all duration-300 group shadow-lg"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label="Toggle Showreel Sound"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-[#9A9090] group-hover:text-paper transition-colors" />
          ) : (
            <Volume2 className="h-4 w-4 text-paper group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* ⬇️ Scroll Cue Button */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 cursor-pointer flex items-center justify-center p-2 text-[#9A9090]/80 hover:text-paper transition-colors group"
        aria-label="Scroll down to statement section"
      >
        <span className="font-display text-sm font-extrabold rotate-90 inline-block transform transition-transform group-hover:translate-y-1">
          ‹
        </span>
      </button>
    </section>
  );
};

export default UnifiedHero;
