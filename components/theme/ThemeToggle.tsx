"use client";

import { useEffect } from "react";

export const ThemeToggle: React.FC<{ className?: string }> = () => {
  useEffect(() => {
    document.documentElement.classList.remove("light");
    localStorage.removeItem("wib-theme");
  }, []);

  return null;
};

export default ThemeToggle;
