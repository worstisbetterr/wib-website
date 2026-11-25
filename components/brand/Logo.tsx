"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  variant?: "symbol" | "full" | "typography" | "mark" | "chevrons" | "wordmark" | "blinking" | "whole";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  href?: string;
  altText?: string;
  themeMode?: "auto" | "light" | "dark";
  onClick?: () => void;
};

export const Logo: React.FC<LogoProps> = ({
  variant = "symbol",
  size = "md",
  className = "",
  href = "/",
  altText,
  themeMode = "auto",
  onClick,
}) => {
  const heightMap = {
    sm: "h-8 sm:h-9",
    md: "h-11 sm:h-14 md:h-16",
    lg: "h-18 sm:h-22 md:h-28",
    xl: "h-28 sm:h-36 md:h-44",
    "2xl": "h-48 sm:h-64 md:h-80 lg:h-[360px] xl:h-[420px]",
  };

  const isSymbol = variant === "symbol" || variant === "mark" || variant === "chevrons" || variant === "blinking";

  const darkModeSrc = isSymbol
    ? "/logos/worstisbetterr_logo_Symbol_Logo_dark_transparent.png"
    : "/logos/worstisbetterr_logo_Typography_Logo_dark_transparent.png";

  const lightModeSrc = isSymbol
    ? "/logos/worstisbetterr_logo_Symbol_Logo_light_transparent.png"
    : "/logos/worstisbetterr_logo_Typography_Logo_light_transparent.png";

  const resolvedAltText = altText || (isSymbol ? "Worstisbetterr home" : "Worstisbetterr");

  const content = (
    <div className={`inline-flex items-center justify-center relative ${className}`}>
      {themeMode === "dark" ? (
        <Image
          src={darkModeSrc}
          alt={resolvedAltText}
          width={isSymbol ? 800 : 2000}
          height={isSymbol ? 240 : 600}
          priority
          className={`${heightMap[size]} w-auto object-contain transition-all duration-300 hover:scale-[1.02]`}
        />
      ) : themeMode === "light" ? (
        <Image
          src={lightModeSrc}
          alt={resolvedAltText}
          width={isSymbol ? 800 : 2000}
          height={isSymbol ? 240 : 600}
          priority
          className={`${heightMap[size]} w-auto object-contain transition-all duration-300 hover:scale-[1.02]`}
        />
      ) : (
        <>
          <Image
            src={darkModeSrc}
            alt={resolvedAltText}
            width={isSymbol ? 800 : 2000}
            height={isSymbol ? 240 : 600}
            priority
            className={`${heightMap[size]} w-auto object-contain transition-all duration-300 hover:scale-[1.02] logo-dark-mode`}
          />
          <Image
            src={lightModeSrc}
            alt=""
            width={isSymbol ? 800 : 2000}
            height={isSymbol ? 240 : 600}
            priority
            className={`${heightMap[size]} w-auto object-contain transition-all duration-300 hover:scale-[1.02] logo-light-mode`}
          />
        </>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
