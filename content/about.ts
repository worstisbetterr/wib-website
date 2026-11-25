export type Founder = {
  name: string;
  role: string;
  line: string;
  image: string;
  instagram: string;
};

export const aboutData = {
  eyebrow: "ABOUT",
  corporateManifesto: [
    "We could write four paragraphs about our philosophy. About disruption, synergy, and the future of storytelling. About how we're redefining the paradigm of AI-native creative excellence for the modern luxury landscape...",
    "We could lecture you on Richard Gabriel's 1989 computer science essay, or detail our multi-modal latent pipeline algorithms step by step.",
    "We could craft elaborate metaphors about synthetic cameras, spatial diffusion, and industry paradigm shifts."
  ],
  punchline: {
    headline: "YOU DON'T CARE ABOUT THIS. HONESTLY, NEITHER DO WE.",
    subline: "So here's the only thing that matters:"
  },
  foundersEyebrow: "THE ONLY PEOPLE WHO MATTER",
  founders: [
    {
      name: "Prameet Patani",
      role: "Co-Founder",
      line: "",
      image: "/images/founders/prameet-v4.png",
      instagram: "https://www.instagram.com/pataniprameet",
    },
    {
      name: "Saairaj Parab",
      role: "Co-Founder",
      line: "",
      image: "/images/founders/saairaj-v4.png",
      instagram: "https://www.instagram.com/saairajjsparab",
    },
  ] as Founder[],
  closing: {
    statement: "That's it. That's the about page.",
    primaryCta: { label: "SEE OUR WORK", href: "/work" },
    secondaryCta: { label: "START A PROJECT", href: "/contact" }
  }
};
