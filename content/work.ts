export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: "luxury" | "d2c" | "creators" | "startups";
  summary: string;
  brief: string;
  insight: string;
  idea: string;
  result: string;
  poster: string;
  video?: string;
  stills: string[];
  characterSheets?: { title: string; image: string }[];
  productSheets?: { title: string; image: string }[];
  landscapeStills?: { title: string; image: string }[];
  credits: { role: string; name: string }[];
  ironicCaption: string;
  featured?: boolean;
  year: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "aura-haute-horlogerie",
    client: "AURA ATELIER",
    title: "The Physics of Eternal Time",
    category: "luxury",
    summary:
      "A cinematic 60-second surrealist luxury watch commercial rendered entirely with hyper-controlled generative diffusion pipelines. We engineered liquid obsidian mechanics and weightless titanium choreography without physical studio constraints.",
    brief:
      "Aura Atelier needed a launch film for their high-complication titanium chronograph that broke away from traditional Swiss watchmaking video tropes.",
    insight:
      "True luxury doesn't show time passing — it creates an atmosphere where time stands still. Physical camera rigs couldn't achieve macro gravity-defying liquid metal motions without massive budgets.",
    idea:
      "Micro-cinematography of liquid obsidian, weightless mechanics, and zero-G light refraction, directed via custom latent space camera choreography.",
    result:
      "14.2M organic impressions across fashion networks, +340% pre-order conversion rate, featured in Vogue Business and Highsnobiety.",
    poster: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    characterSheets: [
      {
        title: "Model Consistency Pass 01 — Latent Identity",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Expression & Lighting Rig Sheet — Obsidian Focus",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
    ],
    productSheets: [
      {
        title: "Titanium Case Macro Refraction Specs",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Obsidian Liquid Flow Mechanics",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      },
    ],
    landscapeStills: [
      {
        title: "Key Frame 01 — Zero-G Titanium Refraction",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Key Frame 02 — Subterranean Obsidian Ocean",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    stills: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Executive Producer", name: "Prameet Patani" },
      { role: "AI Creative Direction", name: "Saairaj Parab" },
      { role: "Latent Motion Director", name: "WIB Studio" },
      { role: "Sound Design", name: "Resonance Audio" },
    ],
    ironicCaption: "Our worst work for Aura Atelier",
    featured: true,
    year: "2026",
  },
  {
    slug: "nexus-hydration-system",
    client: "NEXUS HYDRATION",
    title: "Hyper-Performance Electrolytes",
    category: "d2c",
    summary:
      "High-octane D2C performance campaign combining photorealistic fluid simulations with digital human athletes. We engineered explosive cellular hydration visuals at 1/10th traditional production costs.",
    brief:
      "Scale Nexus Hydration from $5M to $25M ARR with high-converting social video ads that feel like a $2M Super Bowl commercial.",
    insight:
      "Standard fitness creators blending powders in shakers failed to capture the extreme physical sensation of cellular hydration.",
    idea:
      "Translate muscle tension and cellular energy into explosive visual metaphors: macro lightning inside muscular tissue and sonic waves of liquid frost.",
    result:
      "4.8x ROAS across Meta & TikTok, 42% reduction in CAC, $18M incremental revenue generated in 90 days.",
    poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    characterSheets: [
      {
        title: "Digital Athlete Model Sheet — High Endurance",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Cellular Energy & Muscle Tension Map",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      },
    ],
    productSheets: [
      {
        title: "Canister Matte Black Material Pass",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Liquid Electrolyte Frost Macro Simulation",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      },
    ],
    landscapeStills: [
      {
        title: "Hero Still 01 — Sub-Zero Hydration Wave",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Hero Still 02 — Kinetic Cellular Burst",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    stills: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Creative Strategy", name: "Saairaj Parab" },
      { role: "Generative Production", name: "Prameet Patani" },
      { role: "Color & Grading", name: "WIB Core" },
    ],
    ironicCaption: "Our worst work for Nexus Hydration",
    featured: true,
    year: "2026",
  },
  {
    slug: "synthia-os-launch",
    client: "SYNTHIA OS",
    title: "The Architecture of Thought",
    category: "startups",
    summary:
      "A dark, cerebral product teaser film for a frontier AI research lab launching their autonomous intelligence interface. We translated abstract code execution into towering architectural monoliths rising from obsidian oceans.",
    brief:
      "Create a brand trailer that makes developer tools feel like an artifact from a near-future cyberpunk civilization.",
    insight:
      "Tech product demos are boring screen recordings. Complex AI architecture requires visceral physical metaphor.",
    idea:
      "Depict code execution as architectural glass structures rising out of dark obsidian oceans under neon storm lights.",
    result:
      "120,000 waitlist signups in 48 hours, $15M Seed round closed within 2 weeks of video launch.",
    poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    characterSheets: [
      {
        title: "Neural Persona Sheet — Cybernetic Architect",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Synthetic Agent Interface Model",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
      },
    ],
    productSheets: [
      {
        title: "Glass Monolith Architectural Spec Sheet",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Quantum Chip Lighting Grid Blueprint",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
    ],
    landscapeStills: [
      {
        title: "Widescreen Render 01 — Subterranean Server Array",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Widescreen Render 02 — Neon Pulse Grid",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    stills: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Creative Lead", name: "Prameet Patani" },
      { role: "Latent Worldbuilding", name: "Saairaj Parab" },
    ],
    ironicCaption: "Our worst work for Synthia OS",
    featured: true,
    year: "2025",
  },
  {
    slug: "chrono-x-apparel",
    client: "CHRONO X",
    title: "Neo-Streetwear Runway",
    category: "creators",
    summary:
      "An impossible virtual runway show staged in a simulated subterranean Tokyo tunnel for top creator streetwear brand. Generative fabric physics and digital avatars walked a flooded brutalist runway.",
    brief:
      "Produce a 15-look fashion show without sample manufacturing delays or physical location permits.",
    insight:
      "Streetwear culture values exclusivity and radical concept art over traditional catalogue photo shoots.",
    idea:
      "Generative fabric physics and digital avatars walking a flooded brutalist runway under strobing infrared lights.",
    result:
      "Entire collection sold out in 3 minutes ($1.2M gross sales), zero physical samples wasted.",
    poster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    characterSheets: [
      {
        title: "Digital Avatar Runway Model Sheet 01",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Digital Avatar Runway Model Sheet 02",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    productSheets: [
      {
        title: "Synthetic Fabric Weave & Tension Blueprint",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Infrared Lighting Rig Specification",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      },
    ],
    landscapeStills: [
      {
        title: "Landscape Still 01 — Subterranean Tokyo Runway",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Landscape Still 02 — Brutalist Tunnel Strobe",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    stills: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Digital Fashion Director", name: "Saairaj Parab" },
      { role: "Executive Producer", name: "Prameet Patani" },
    ],
    ironicCaption: "Our worst work for Chrono X",
    featured: false,
    year: "2025",
  },
  {
    slug: "neo-cybernetics-system",
    client: "NEO CYBERNETICS",
    title: "Neural Engine Autonomous OS",
    category: "startups",
    summary:
      "A futuristic cinematic reveal of next-gen neural silicon hardware and autonomous spatial robotics. Glowing crimson neural highways expanded across brutalist monolith architectures.",
    brief:
      "Unveil Neo Cybernetics' quantum neural chip with cinematic video worldbuilding before their global keynote.",
    insight:
      "Silicon chips look identical under micro cameras. The magic lies in the invisible neural signals operating at terabit speeds.",
    idea:
      "Depict silicon circuitry as glowing crimson neural highways expanding across brutalist monolith architectures.",
    result:
      "+520% institutional investor inquiries, featured across TechCrunch and Wired.",
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    characterSheets: [
      {
        title: "Spatial Robotics Unit — Chassis Model",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Autonomous Sensor Array Blueprint",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
    ],
    productSheets: [
      {
        title: "Neural Silicon Die Interconnect Pass",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Quantum Thermal Dispersion Spec",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      },
    ],
    landscapeStills: [
      {
        title: "Key Frame 01 — Neural Silicon Highway",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
      },
      {
        title: "Key Frame 02 — Monolith Core Array",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
      },
    ],
    stills: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "AI Worldbuilding", name: "Saairaj Parab" },
      { role: "Executive Director", name: "Prameet Patani" },
    ],
    ironicCaption: "Our worst work for Neo Cybernetics",
    featured: true,
    year: "2026",
  },
];

export type WorkProject = {
  id: string;
  clientName: string;
  title: string;
  video?: string;
  department?: string;
  selfInitiated?: boolean;
};

export const workProjects: WorkProject[] = [
  {
    id: "superergo",
    clientName: "SuperErgo",
    title: "SuperErgo",
    video: "https://youtu.be/7uhxYWKV6zc",
    department: "Brands & Advertising",
    selfInitiated: true,
  },
  {
    id: "neutrogena",
    clientName: "Neutrogena",
    title: "Neutrogena",
    video: "https://youtu.be/_awXTbdXqV0",
    department: "Brands & Advertising",
    selfInitiated: true,
  },
  {
    id: "vida",
    clientName: "Vida",
    title: "Vida",
    video: "https://youtu.be/AB4W-khsEEw",
    department: "Brands & Advertising",
    selfInitiated: true,
  },
];
