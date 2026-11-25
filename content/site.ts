export type NavItem = {
  label: string;
  href: string;
  isExternal?: boolean;
  isBadge?: string;
};

export type SocialItem = {
  platform: string;
  handle: string;
  url: string;
};

export type TestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: string;
  metric: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  ironicTagline: string;
  description: string;
  url: string;
  ogImage: string;
  contactEmail: string;
  qualifyingNote: string;
  navLinks: NavItem[];
  socials: SocialItem[];
  clientLogos: { name: string; category: string }[];
  testimonials: TestimonialItem[];
};

export const siteConfig: SiteConfig = {
  name: "Worstisbetterr",
  tagline: "AI-Native Creative Company",
  ironicTagline: "we make the worst ads",
  description:
    "AI-native film studio making AI commercials and performance ads for brands that would rather be unforgettable than safe. Anyone can generate. We direct.",
  url: "https://www.worstisbetterr.com",
  ogImage: "/brand/og-image.jpg",
  contactEmail: "projects@worstisbetterr.com",
  qualifyingNote: "We are selective. We don't take every brief.",
  navLinks: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { platform: "Instagram", handle: "@worstisbetterr", url: "https://instagram.com/worstisbetterr" },
    { platform: "Youtube", handle: "@worstisbetterr", url: "https://youtube.com/@worstisbetterr" },
    { platform: "Mail", handle: "projects@worstisbetterr.com", url: "mailto:projects@worstisbetterr.com" },
  ],
  clientLogos: [
    { name: "AURA ATELIER", category: "Luxury" },
    { name: "NEO CYBERNETICS", category: "Startups" },
    { name: "SOLARIS D2C", category: "D2C" },
    { name: "VANGUARD LABS", category: "Creators" },
    { name: "KINETIC APPAREL", category: "D2C" },
    { name: "ECLIPSE TIMEPIECES", category: "Luxury" },
    { name: "VALKYRIE MOTOR", category: "Luxury" },
    { name: "NEURAL HEALTH", category: "Startups" },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "WIB produced a launch film that legacy agencies quoted us $1.2M and 5 months for. They delivered in 3 weeks with visuals that blew our board away.",
      author: "Elena Rostova",
      role: "Global Brand Director",
      company: "Aura Atelier",
      category: "Luxury Haute Horlogerie",
      metric: "+340% Pre-Order Conversion",
    },
    {
      id: "t2",
      quote:
        "They say 'we make the worst ads' with a straight face, but their latent asset performance scaled our D2C revenue past $25M ARR in one quarter.",
      author: "Marcus Thorne",
      role: "Co-Founder & CMO",
      company: "Nexus Hydration",
      category: "High-Growth D2C",
      metric: "4.8x ROAS Benchmark",
    },
    {
      id: "t3",
      quote:
        "Standard tech demos are dry screen recordings. WIB built a dystopian cinematic universe for Synthia OS that got us 120k waitlist signups overnight.",
      author: "Dr. Aris Thorne",
      role: "Head of Research",
      company: "Synthia OS",
      category: "Frontier AI Lab",
      metric: "120K Waitlist Signups",
    },
  ],
};
