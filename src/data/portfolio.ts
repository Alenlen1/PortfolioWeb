// Replace these sample entries with your own details.
export const profile = {
  name: "Alen",
  fullName: "Alen Amarante",
  location: "Sta. Rosa, Laguna · Philippines",
  handle: "@yourhandle",
  email: "alenandreiamarante0313@gmail.com",
  roles: ["Full Stack Web Developer", "AI Web Developer"],
  socials: [
    { label: "GitHub", href: "https://github.com/Alenlen1" },
    { label: "Facebook", href: "https://www.facebook.com/alenlenamarante" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/alenandreiamarante/",
    },
  ],
};

export const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`;

export const toolkitGroups = [
  {
    title: "Frontend",
    category: "Development",
    description: "Building interfaces for the web.",
    items: [
      { name: "CSS", icon: "css", detail: "Stylesheets" },
      { name: "HTML", icon: "html", detail: "Web markup" },
      { name: "Next.js", icon: "nextjs", detail: "React framework" },
      { name: "React", icon: "react", detail: "User interfaces" },
      {
        name: "Tailwind CSS",
        icon: "tailwindcss",
        detail: "Utility-first styling",
      },
      { name: "TypeScript", icon: "typescript", detail: "Typed JavaScript" },
      { name: "Vite", icon: "vite", detail: "Frontend build tool" },
    ],
  },
  {
    title: "Backend & data",
    category: "Development",
    description: "Connecting the interface to the logic and data.",
    items: [
      { name: "Express", icon: "express", detail: "Node.js web framework" },
      { name: "Flask", icon: "flask", detail: "Python web framework" },
      { name: "Node.js", icon: "nodejs", detail: "JavaScript runtime" },
      { name: "PostgreSQL", icon: "postgresql", detail: "Relational database" },
      { name: "Python", icon: "python", detail: "Programming language" },
      { name: "Supabase", icon: "supabase", detail: "Backend platform" },
    ],
  },
  {
    title: "AI & coding",
    category: "Tools",
    description: "A little help turning ideas into code.",
    items: [
      { name: "21st.dev", icon: "21stdev", detail: "UI components" },
      { name: "Antigravity", icon: "antigravity", detail: "Development tool" },
      { name: "Claude Code", icon: "claude", detail: "Coding assistant" },
      { name: "Codex", icon: "codex", detail: "Coding agent" },
      { name: "Gemini", icon: "gemini", detail: "AI assistant" },
    ],
  },
  {
    title: "Workspace",
    category: "Tools",
    description: "The tools behind my everyday workflow.",
    items: [
      {
        name: "GitHub",
        icon: "github",
        detail: "Version control & collaboration",
      },
      {
        name: "Google Workspace",
        icon: "googleworkspace",
        detail: "Productivity & collaboration",
      },
      { name: "VS Code", icon: "vscode", detail: "Code editor" },
    ],
  },
  {
    title: "Hosting",
    category: "Deployment",
    description: "Taking projects from local to live.",
    items: [
      { name: "Render", icon: "render", detail: "Application hosting" },
      { name: "Vercel", icon: "vercel", detail: "Web deployment" },
    ],
  },
] as const;

export const skills = toolkitGroups
  .slice(0, 2)
  .flatMap((group) => group.items.map((item) => item.name));
export const tools = toolkitGroups
  .slice(2, 4)
  .flatMap((group) => group.items.map((item) => item.name));
export const hosting = toolkitGroups[4].items.map((item) => item.name);

export const experiences = [
  {
    role: "Fullstack Web Developer",
    company: "Your company here",
    type: "Work",
    date: "2025 — Present",
    description:
      "A place for your latest chapter. Describe the products you build, the people you work with, and how your contribution makes a difference.",
    highlights: [
      "Frontend development",
      "Backend & API integration",
      "Database architecture",
      "From concept to launch",
    ],
    visual: "Building things that matter.",
    code: "01",
    label: "Your current role",
  },
  {
    role: "Frontend Developer",
    company: "Previous company here",
    type: "Work",
    date: "2024 — 2025",
    description:
      "Share a previous role here. Add a short overview of your responsibilities, a challenge you solved, and the impact of the work you delivered.",
    highlights: [
      "Responsive interfaces",
      "Reusable design systems",
      "Performance optimization",
      "Team collaboration",
    ],
    visual: "Details make the difference.",
    code: "02",
    label: "Your previous role",
  },
  {
    role: "Web Developer Intern",
    company: "Your first team here",
    type: "Internship",
    date: "2023 — 2024",
    description:
      "Every journey starts somewhere. Use this space for an internship, a training program, freelance work, or the experience that got you started.",
    highlights: [
      "Learning by building",
      "REST API development",
      "Version control",
      "Testing & iteration",
    ],
    visual: "Always learning. Always building.",
    code: "03",
    label: "Where it all started",
  },
];

export const projects = [
  {
    slug: "evacu-rosa",
    name: "EvacuRosa",
    category: "Web application",
    status: "Live",
    theme: "evacurosa",
    url: "https://evacu-rosa.vercel.app/",
    image: "/projects/evacu-rosa.png",
    description:
      "An evacuation navigation platform for Santa Rosa, Laguna, bringing evacuation centers, hazard information, and emergency resources into one place.",
    highlights: [
      "Map-based evacuation center discovery",
      "Flood, fire, and earthquake information",
      "English and Filipino language options",
    ],
    stack: [
      "Codex",
      "Express",
      "Leaflet",
      "Next.js",
      "Node.js",
      "React",
      "Render",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "Vercel",
    ],
  },
  {
    slug: "skillbridge",
    name: "SkillBridge",
    category: "Web application",
    status: "Live",
    theme: "skillbridge",
    url: "https://skillbridge-chi-smoky.vercel.app/",
    image: "/projects/skillbridge.png",
    description:
      "A portfolio and career preparation platform for students, graduates, and career starters to present their skills, projects, and achievements.",
    highlights: [
      "Professional portfolios and public profiles",
      "Resume building and AI resume review",
      "Skills, certificates, and project showcases",
    ],
    stack: [
      "Express",
      "Google Gemini",
      "Next.js",
      "React",
      "Render",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "Vercel",
    ],
  },
  {
    slug: "cashout-tracker",
    name: "Cashout Tracker",
    category: "Personal project",
    status: "Live",
    theme: "cashout",
    url: "https://cashout-tracker.vercel.app/",
    image: "/projects/cashout-tracker.png",
    description:
      "A personal cashout tracking app for keeping transaction records organized, saving receipt images, and reviewing daily totals and recent activity.",
    highlights: [
      "Daily cashout totals and transaction history",
      "Receipt images and reference records",
      "Supabase-backed transaction storage",
    ],
    stack: [
      "Gemini",
      "React",
      "Render",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
      "Vercel",
      "Vite",
    ],
  },
];
