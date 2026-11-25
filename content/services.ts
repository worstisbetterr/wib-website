export type ServiceOffering = {
  id: string;
  number: string;
  title: string;
  promise: string;
  description: string;
  bestFor: string[];
  videoPoster?: string;
  videoUrl?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type TargetAudience = {
  title: string;
  description: string;
};

export type WhyAiNativePoint = {
  title: string;
  description: string;
};

export const servicesData = {
  hero: {
    eyebrow: "SERVICES",
    headline: "AI FILMS, CONTENT & CAMPAIGNS.",
    subhead:
      "We make AI-led films and stills for brands that would rather be unforgettable than safe. From a single 30-second commercial to a full multi-film campaign — scoped to what your brand actually needs.",
  },
  offerings: [
    {
      id: "01",
      number: "01",
      title: "AI COMMERCIALS",
      promise:
        "The 30-second stop. A single hero film engineered to arrest attention and move people to act.",
      description:
        "Concept, direction, and AI production in one place — cinema-grade, without the shoot.",
      bestFor: ["LAUNCHES", "HERO ADS", "PAID SOCIAL THAT HAS TO CONVERT"],
      videoPoster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: "02",
      number: "02",
      title: "BRAND FILMS",
      promise: "Longer-form. Deeper world.",
      description:
        "Cinematic storytelling that builds mood, world, and desire around your brand — the films people remember instead of skip.",
      bestFor: ["BRAND LAUNCHES", "FILMS THAT NEED TO MAKE PEOPLE FEEL SOMETHING"],
      videoPoster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: "03",
      number: "03",
      title: "CAMPAIGNS",
      promise: "A full launch, coordinated.",
      description:
        "A coordinated set of films and stills across a campaign — multiple videos, multiple cuts, matching key visuals. Scoped to the campaign: one film or a dozen.",
      bestFor: ["PRODUCT LAUNCHES", "SEASONAL PUSHES THAT NEED A COMPLETE ASSET SET"],
      videoPoster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
    {
      id: "04",
      number: "04",
      title: "STILLS",
      promise: "Campaign imagery. No shoot.",
      description:
        "AI-generated key visuals, product, and editorial stills — the same cinematic craft, held in a single frame. Standalone or paired with the films.",
      bestFor: ["KEY VISUALS", "PRODUCT IMAGERY", "EDITORIAL & SOCIAL"],
      videoPoster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    },
  ] as ServiceOffering[],

  process: [
    {
      step: "01",
      title: "SCOPE",
      description:
        "We scope to your campaign, not a package. One ad or a full rollout — we size the work to the outcome you need.",
    },
    {
      step: "02",
      title: "CONCEPT",
      description:
        "We find the strategic insight and build the visual concept and direction before a single frame is produced.",
    },
    {
      step: "03",
      title: "PRODUCE & DELIVER",
      description:
        "AI production, fast iteration, and final delivery — cinema-grade films and stills, in weeks, not months.",
    },
  ] as ProcessStep[],

  audiences: [
    {
      title: "LUXURY BRANDS",
      description: "Work that protects a premium name and still stops the scroll.",
    },
    {
      title: "HIGH-GROWTH D2C",
      description: "Performance creative that looks like a film, not an ad.",
    },
    {
      title: "STARTUPS",
      description: "Big-brand production without the big-brand budget or timeline.",
    },
    {
      title: "TOP CREATORS",
      description: "Films and content that match the ambition of your audience.",
    },
  ] as TargetAudience[],

  whyAiNative: {
    eyebrow: "WHY AI-NATIVE",
    headline: "What legacy production can't do.",
    points: [
      {
        title: "IMPOSSIBLE SHOTS",
        description:
          "Visuals you can't physically shoot: worlds, scale, and ideas with no location, no rig, no limit.",
      },
      {
        title: "WEEKS, NOT MONTHS",
        description:
          "AI-native production collapses timelines from quarters to weeks.",
      },
      {
        title: "A FRACTION OF THE COST",
        description:
          "Cinema-grade output without cinema-grade budgets.",
      },
      {
        title: "BIGGER SWINGS",
        description:
          "Because iteration is cheap, we take creative risks traditional production can't afford.",
      },
    ] as WhyAiNativePoint[],
  },

  cta: {
    line: "Tell us what you're launching.",
    primary: "START A PROJECT",
    secondary: "SEE OUR WORK",
  },
};
