"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BlinkingLogoProps {
  className?: string;
  size?: number; // width & height in px
  intervalMs?: number;
}

export default function BlinkingLogo({
  className = "w-8 h-8 sm:w-9 sm:h-9",
  size = 36,
  intervalMs = 900,
}: BlinkingLogoProps) {
  const [showSolid, setShowSolid] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  // 1. Visibility State for Tab Hidden Favicon Animation (Preserves each page's own title)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    setIsTabHidden(document.hidden);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 2. Favicon Blinking ONLY when user leaves tab (isTabHidden === true)
  useEffect(() => {
    if (!isTabHidden) {
      // Static favicon when active on site
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = "/logos/worstisbetterr_logo_Only_Middle_Arrow_Logo_dark_transparent.png";
      setShowSolid(false);
      return;
    }

    // Start favicon blinking ONLY when tab is left
    const timer = setInterval(() => {
      setShowSolid((prev) => !prev);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isTabHidden, intervalMs]);

  // Update favicon link dynamically when showSolid toggles during hidden state
  useEffect(() => {
    if (!isTabHidden) return;

    const faviconSrc = showSolid
      ? "/logos/worstisbetterr_logo_Only_Middle_Arrow_Logo_light.png"
      : "/logos/worstisbetterr_logo_Only_Middle_Arrow_Logo_dark_transparent.png";

    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    link.href = faviconSrc;
  }, [showSolid, isTabHidden]);

  const transparentLogo = "/logos/worstisbetterr_logo_Only_Middle_Arrow_Logo_dark_transparent.png";
  const solidLogo = "/logos/worstisbetterr_logo_Only_Middle_Arrow_Logo_light.png";

  return (
    <div className={`relative inline-block overflow-hidden rounded-sm transition-all duration-300 ${className}`}>
      {/* Transparent Background Logo */}
      <Image
        src={transparentLogo}
        alt="WIB Emblem Transparent"
        width={size}
        height={size}
        priority
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
          showSolid && isTabHidden ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Solid Background Logo (Blinking frame) */}
      <Image
        src={solidLogo}
        alt="WIB Emblem Solid"
        width={size}
        height={size}
        priority
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
          showSolid && isTabHidden ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
