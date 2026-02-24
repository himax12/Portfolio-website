export const siteConfig = {
  name: "Himanshu Gupta",
  title: "Full Stack AI Engineer",
  description:
    "B.Tech student in AI & Data Science at MAIT, Delhi. AI engineer who thinks from first principles - passionate about building intelligent systems that solve real-world problems. National finalist at Adobe GenSolve Hackathon 2024 (Top 6 from 1.3 lakh registrations). Solved 600+ DSA problems across competitive coding platforms.",

  // Profile Image - Add your image to public/profile.jpg
  profileImage: "/profile.jpg",

  // Social Links
  links: {
    email: "ghimax23@gmail.com",
    github: "https://github.com/himax12",
    twitter: "https://twitter.com/himax12",
    resume: "/resume.pdf",
  },

  // Tech Stack
  stack: {
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
    backend: ["Node.js", "Express.js", "Python", "FastAPI"],
    database: ["MongoDB", "PostgreSQL", "SQLite", "Supabase"],
    languages: ["Python", "JavaScript", "TypeScript", "C++", "C", "SQL"],
    tools: ["Git", "GitHub", "FFmpeg", "Streamlit", "Pandas", "NumPy"],
    ai: [
      "TensorFlow",
      "PyTorch",
      "OpenCV",
      "LangGraph",
      "Groq API",
      "Gemini API",
      "NLP",
    ],
  },

  // GitHub Username for contribution graph
  githubUsername: "himax12",

  // Projects
  projects: [
    {
      title: "ClipSync",
      description:
        "AI-powered video editing automation system that intelligently merges A-Roll with contextually relevant B-Roll footage through a single API call. Uses Gemini VLM for visual analysis and implements intelligent placement algorithms for optimal narrative flow.",
      image: "/projects/clipsync.jpg",
      tags: ["Python", "Gemini API", "FFmpeg", "NLP"],
      liveUrl: "",
      githubUrl: "https://github.com/himax12/clipsync",
      isLive: false,
    },
    {
      title: "ReTexture",
      description:
        "AI-powered texture generation and manipulation system for 3D models. Implements deep learning for procedural texture synthesis, neural style transfer, and automated processing. Finalist project at Tesco Retail Media InnovAItion Jam Hackathon.",
      image: "/projects/retexture.jpg",
      tags: ["Python", "TensorFlow", "PyTorch", "OpenCV"],
      liveUrl: "",
      githubUrl: "https://github.com/himax12/retexture",
      isLive: false,
    },
    {
      title: "AI Medical Scheduling Agent",
      description:
        "Autonomous conversational AI agent that streamlines patient booking through natural language. Features LangGraph state management, multi-API orchestration with Groq API (Llama 3 70B), and Calendly integration for intelligent appointment scheduling.",
      image: "/projects/medical-agent.jpg",
      tags: ["Python", "LangGraph", "FastAPI", "Streamlit", "Groq API"],
      liveUrl: "",
      githubUrl: "https://github.com/himax12/medical-scheduling-agent",
      isLive: false,
    },
  ],

  // About section additional links
  aboutLinks: {
    github: "https://github.com/himax12",
    twitter: "https://twitter.com/himax12",
    email: "mailto:ghimax23@gmail.com",
  },

  // Button hover tooltips
  tooltips: {
    github: "Open-source projects & AI experiments.\nBrowse repositories",
    twitter: "Building in public & sharing AI insights.\nLive updates",
    resume: "Download Resume",
    email: "Get in touch",
  },
};

export type SiteConfig = typeof siteConfig;
