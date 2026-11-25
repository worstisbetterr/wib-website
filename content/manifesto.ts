export type Founder = {
  name: string;
  role: string;
  bio: string;
  pov: string;
  image: string;
};

export type CoreBelief = {
  number: string;
  title: string;
  statement: string;
};

export const manifestoData = {
  headline: "WORST IS BETTER",
  subheadline:
    "The 1989 computer science essay argued that simple, adaptable systems outperform complex, over-engineered ones. In creative advertising, legacy agency bloat is the complex system. We are the counter-thesis.",
  thesis: [
    {
      title: "The Intellectual Lineage",
      body: "In 1989, computer scientist Richard P. Gabriel coined 'Worse is Better' to describe why flexible, streamlined software wins over monolithic perfectionism. We apply that exact law to commercial film. Legacy advertising agencies take 6 months, 40 crew members, and $500,000 to shoot a commercial that looks identical to every other campaign. That is bloated perfectionism.",
    },
    {
      title: "The AI-Native Advantage",
      body: "Being AI-native doesn't mean pushing a magic button — it means eliminating physical friction so creative swings can be 100x bigger. When physics, lighting, talent, and locations are generated inside neural space, we spend 100% of our energy on concept, craft, and emotional impact. While legacy agencies argue over location permits, we render new worlds.",
    },
    {
      title: "The Tension & The Craft",
      body: "We say 'we make the worst ads' with a deadpan face because the industry is obsessed with self-congratulatory fluff. We let our work on screen do the real talking. Cold, precise, expensive craft paired with understated irony.",
    },
  ],

  founders: [
    {
      name: "Prameet Patani",
      role: "Co-Founder & Executive Director",
      bio: "Pioneering the intersection of generative neural pipelines and luxury storytelling. Obsessed with high-contrast aesthetics and deadpan precision.",
      pov: "“Traditional agency overhead is a tax on client creativity. We built WIB to execute impossible visual briefs at zero velocity loss.”",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Saairaj Parab",
      role: "Co-Founder & Head of Latent Production",
      bio: "Mastering latent space camera choreography, custom diffusion workflows, and synthetic cinematography for tier-one brands.",
      pov: "“The camera is no longer a physical box with a lens. The camera is now an infinite multi-dimensional mathematical space.”",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    },
  ] as Founder[],

  beliefs: [
    {
      number: "01",
      title: "Craft Over Chrome",
      statement: "Tools change every month. Taste, rhythm, and editorial restraint endure forever.",
    },
    {
      number: "02",
      title: "Deadpan Over Wacky",
      statement: "The joke is in the words; the visual design remains cold, expensive, and flawless.",
    },
    {
      number: "03",
      title: "Results Over Rhetoric",
      statement: "Clients do not buy AI tech stacks; they buy category dominance and ROAS.",
    },
    {
      number: "04",
      title: "Reversed Chevron Thinking",
      statement: "When everyone moves right, we deliberately go left.",
    },
  ] as CoreBelief[],

  vision: {
    title: "The Long Game",
    description:
      "WORSTISBETTERR operates today as an elite AI-native creative studio. Underneath, we are developing proprietary latent orchestration toolchains and R&D pipelines. Studio now. Generative creative infrastructure company next.",
  },
};
