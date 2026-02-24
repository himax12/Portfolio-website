export const siteConfig = {
  name: "Himanshu Gupta",
  title: "Full Stack AI Engineer",
  description:
    "B.Tech AI & Data Science student at MAIT, Delhi. Hands-on builder focused on turning AI ideas into real production systems. Built ClipSync (AI video pipeline with Gemini VLM and FFmpeg), AI Medical Scheduling Agent (multi-API conversational workflows), and Math Mentor (multi-agent reasoning with RAG memory). Currently Python Developer Intern at EspoMedia, building OCR pipelines with OpenCV, EasyOCR, and PyTorch, automating data workflows, and improving model accuracy in production. I enjoy owning problems end-to-end—designing APIs, integrating models, debugging edge cases, and shipping systems that people actually use. Especially interested in AI that meets real products through agent workflows, data pipelines, and scalable backend systems.",

  // Profile Image - Add your image to public/profile.jpg
  profileImage: "/profile.jpg",

  // Social Links
  links: {
    email: "ghimax23@gmail.com",
    github: "https://github.com/himax12",
    twitter: "https://x.com/ayy_him_anshu23",
    resume: "/resume.pdf",
  },

  // Experience
  experience: [
    {
      company: "EspoMedia",
      role: "Python Developer Intern",
      duration: "Jan 2026 - Present",
      description:
        "Building OCR pipelines with OpenCV, EasyOCR, and PyTorch. Automating data workflows and improving model accuracy in production.",
      technologies: ["Python", "OpenCV", "EasyOCR", "PyTorch"],
    },
  ],

  // Ventures
  ventures: [
    {
      name: "MathPilot",
      role: "Founder",
      url: "https://math-mentor-933543570439.us-central1.run.app/",
      description:
        "Autonomous reasoning system for solving high-school and undergraduate mathematics with high reliability.",
    },
  ],

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

  // Coding Profiles
  codingProfiles: {
    codolio: "https://codolio.com/profile/himax12",
    leetcode: "https://leetcode.com/himax12",
    codeforces: "https://codeforces.com/profile/himax12",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/himax12",
  },

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
      title: "Math Mentor",
      description:
        "Autonomous reasoning system designed to solve high-school and undergraduate level mathematics problems with high reliability. Unlike typical chat interfaces, this application decouples semantic understanding from deterministic computation. The system accepts multimodal inputs (text, image, audio) and employs a Human-in-the-Loop (HITL) workflow to handle ambiguity before it propagates to the solver.",
      image: "/projects/math-mentor.jpg",
      tags: ["Python", "RAG", "Multi-Agent", "HITL", "Multimodal"],
      liveUrl: "https://math-mentor-933543570439.us-central1.run.app/",
      githubUrl: "https://github.com/himax12/math-mentor",
      isLive: true,
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
    twitter: "https://x.com/ayy_him_anshu23",
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
