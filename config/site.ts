export const siteConfig = {
  name: "Your Name",
  title: "Developer", // or "Founder", "Freelancer", etc.
  description:
    "I'm a software developer focused on building tools and platforms that make developers' lives easier. I work across the stack, specializing in TypeScript, React, and Solana development. Currently exploring new ways to streamline development workflows and experimenting with interactive tools.",

  // Profile Image - Add your image to public/profile.jpg
  profileImage: "/profile.jpg",

  // Social Links
  links: {
    email: "your.email@example.com",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    resume: "/resume.pdf",
  },

  // Tech Stack
  stack: {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "GSAP",
    ],
    backend: ["Node.js", "Express", "Prisma"],
    database: ["PostgreSQL", "MongoDB", "Redis", "SQL"],
    languages: ["JavaScript", "TypeScript", "C++"],
    tools: ["Git", "GitHub", "Docker", "Linux", "Postman", "Figma"],
    web3: ["Solana"],
  },

  // GitHub Username for contribution graph
  githubUsername: "yourusername",

  // Projects
  projects: [
    {
      title: "Snippet Vault",
      description:
        "Your personal code memory system. Save, tag, and instantly retrieve battle-tested snippets without digging through chats or old repos.",
      image: "/projects/snippet-vault.jpg",
      tags: ["TypeScript", "React", "Next.js"],
      liveUrl: "https://your-project.com",
      githubUrl: "https://github.com/yourusername/snippet-vault",
      isLive: true,
    },
    {
      title: "Solana Atlas",
      description:
        "An interactive Solana playground that makes blockchain mechanics visible, testable, and understandable.",
      image: "/projects/solana-atlas.jpg",
      tags: ["Solana", "TypeScript", "Web3"],
      liveUrl: "https://your-project.com",
      githubUrl: "https://github.com/yourusername/solana-atlas",
      isLive: true,
    },
    // Add more projects here
  ],

  // About section additional links
  aboutLinks: {
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "mailto:your.email@example.com",
  },

  // Button hover tooltips
  tooltips: {
    github:
      "Open-source work & interesting side projects.\nBrowse repositories",
    twitter: "Building in public & sharing experiments.\nLive updates",
    resume: "Resume",
    email: "Email",
  },
};

export type SiteConfig = typeof siteConfig;
