import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        "ink-raised": "var(--color-ink-raised)",
        paper: "var(--color-paper)",
        muted: "var(--color-muted)",
        hairline: "var(--color-hairline)",
        red: {
          DEFAULT: "#C91C2B",
          bright: "#E72D31",
          deep: "#9E1021",
        },
      },
      backgroundImage: {
        "red-grad": "linear-gradient(135deg, #E72D31 0%, #9E1021 100%)",
        "red-grad-hover": "linear-gradient(135deg, #FF3B3F 0%, #B81427 100%)",
      },
      fontFamily: {
        display: ["var(--font-chakra)", "Saira", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "1px",
        md: "2px",
        lg: "2px",
        none: "0px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        wide: "0.02em",
        wider: "0.04em",
        widest: "0.06em",
      },
    },
  },
  plugins: [],
};

export default config;
