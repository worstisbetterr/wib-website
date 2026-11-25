"use client";

import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showChevron?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  showChevron = true,
}) => {
  const baseStyles =
    "group inline-flex items-center justify-center gap-3 font-display font-bold uppercase text-xs md:text-sm tracking-widest px-6 py-3.5 rounded-sm transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none select-none";

  const variants = {
    primary:
      "bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20 hover:brightness-110 active:scale-[0.99]",
    ghost:
      "bg-transparent text-paper hairline-box hover:bg-paper/5 hover:border-paper/30 active:scale-[0.99]",
  };

  const chevronIcon = showChevron && (
    <span
      className={`font-display text-sm md:text-base font-extrabold transition-transform duration-300 ${
        variant === "primary"
          ? "group-hover:-translate-x-1"
          : "group-hover:translate-x-1 text-muted group-hover:text-paper"
      }`}
    >
      ‹
    </span>
  );

  const buttonContent = (
    <>
      <span>{children}</span>
      {chevronIcon}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
