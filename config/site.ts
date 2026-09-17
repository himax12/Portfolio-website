export const siteConfig = {
  name: "Himanshu Gupta",
  title: "Full Stack AI Engineer",
  url: "https://www.himex.tech",
  location: "Delhi, India",
  education:
    "B.Tech in AI & Data Science, Maharaja Agrasen Institute of Technology (MAIT), Delhi",
  // Short summary for search results and link previews (~155 characters)
  shortDescription:
    "Full Stack AI Engineer in Delhi building production AI systems: agent workflows, OCR pipelines and multi-agent RAG.",
  // Long-form bio used for llms-full.txt and index.md
  description:
    "B.Tech AI & Data Science student at MAIT, Delhi. Hands-on builder focused on turning AI ideas into real production systems. Built ClipSync (AI video pipeline with Gemini VLM and FFmpeg), AI Medical Scheduling Agent (multi-API conversational workflows), and Math Mentor (multi-agent reasoning with RAG memory). Currently a Full Stack AI Engineer at Sparkonomy. Previously a Python Developer Intern at EspoMedia (Jan–Apr 2026), building OCR pipelines with OpenCV, EasyOCR, and PyTorch, automating data workflows, and improving model accuracy in production. I enjoy owning problems end-to-end—designing APIs, integrating models, debugging edge cases, and shipping systems that people actually use. Especially interested in AI that meets real products through agent workflows, data pipelines, and scalable backend systems.",

  // Profile Image - Add your image to public/profile.jpg
  profileImage: "/profile.jpg",

  // Social Links
  links: {
    email: "ghimax23@gmail.com",
    github: "https://github.com/himax12",
    twitter: "https://x.com/ayy_him_anshu23",
    linkedin: "https://www.linkedin.com/in/himanshu-gupta23/",
    // Served from public/files via a rewrite in next.config.js (indexable PDF)
    resume: "/resume",
    calendar: "https://calendly.com/ghimansh23/30min",
  },

  // Hover-card details for profiles without a usable public API (GitHub's card
  // is fetched live). Avatars are local files so they can't break or be hotlink-blocked.
  profiles: {
    x: {
      name: "Himanshu gupta",
      handle: "ayy_him_anshu23",
      bio: "22, contributing to slop since 2022\n48213\nFull Stack AI Engineer",
      avatar: "/avatars/x.png",
    },
    linkedin: {
      name: "Himanshu Gupta",
      headline: "Full Stack AI Engineer @ Sparkonomy",
      avatar: "/avatars/linkedin.png",
    },
    // Mirrors the Calendly event at links.calendar
    calendly: {
      name: "Himanshu Gupta",
      event: "30 Minute Meeting",
      durationMinutes: 30,
      avatar: "/avatars/linkedin.png",
    },
  },

  // Experience (most recent first); summary and highlights are optional
  experience: [
    {
      company: "Sparkonomy",
      // Optional branding, shown as an inline badge (components/ui/company-badge.tsx)
      logo: "/logos/sparkonomy.png",
      website: "https://www.sparkonomy.com/",
      brandColors: ["#8b5cf6", "#d946ef"],
      role: "Full Stack AI Engineer",
      duration: "May 2026 - Present",
      startDate: "2026-05-01",
      technologies: [
        "Next.js",
        "TypeScript",
        "React",
        "FastAPI",
        "LangGraph",
        "Google Cloud",
      ],
    },
    {
      company: "EspoMedia",
      role: "Python Developer Intern",
      duration: "Jan 2026 - Apr 2026",
      // Used to compute "N months of experience"; omit endDate for a current role
      startDate: "2026-01-01",
      endDate: "2026-04-30",
      summary:
        "Tech Department, worked on OCR pipelines, ML/DL model training, and data automation.",
      highlights: [
        "Built OCR pipelines with EasyOCR, Tesseract and OpenCV preprocessing",
        "Trained and fine-tuned PyTorch / TensorFlow and YOLO models",
        "Automated data cleaning and FFmpeg media extraction; stored outputs in MongoDB",
      ],
      technologies: [
        "Python",
        "OpenCV",
        "EasyOCR",
        "Tesseract",
        "PyTorch",
        "TensorFlow",
        "YOLO",
        "FFmpeg",
        "MongoDB",
      ],
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
    tools: ["Git", "GitHub", "Google Cloud", "FFmpeg", "Streamlit", "Pandas", "NumPy"],
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
  },

  // Projects
  projects: [
    {
      title: "ClipSync",
      // Short card copy on the homepage; the full description feeds llms.txt and structured data
      summary:
        "AI video editing pipeline that merges A-Roll with contextually relevant B-Roll in a single API call, using Gemini VLM for visual analysis.",
      description:
        "AI-powered video editing automation system that intelligently merges A-Roll with contextually relevant B-Roll footage through a single API call. Uses Gemini VLM for visual analysis and implements intelligent placement algorithms for optimal narrative flow.",
      image: "/projects/clipsync.jpg",
      tags: ["Python", "Gemini API", "FFmpeg", "NLP"],
      liveUrl: "https://clipmyreel.app/",
      githubUrl: "https://github.com/himax12/ClipSync",
      isLive: true,
    },
    {
      title: "Math Mentor",
      summary:
        "Multi-agent math reasoning with RAG memory, multimodal input and human-in-the-loop review.",
      // Freelance engagement; previously also listed separately as the "MathPilot" venture
      context: "Freelance · MathPilot",
      description:
        "Autonomous reasoning system designed to solve high-school and undergraduate level mathematics problems with high reliability. Unlike typical chat interfaces, this application decouples semantic understanding from deterministic computation. The system accepts multimodal inputs (text, image, audio) and employs a Human-in-the-Loop (HITL) workflow to handle ambiguity before it propagates to the solver.",
      image: "/projects/math-mentor.jpg",
      tags: ["Python", "RAG", "Multi-Agent", "HITL", "Multimodal"],
      liveUrl: "https://github.com/himax12/MathPilot",
      githubUrl: "https://github.com/himax12/MathPilot",
      isLive: true,
    },
    {
      title: "AI Medical Scheduling Agent",
      context: "Healthcare",
      summary:
        "Conversational booking agent with LangGraph state, Groq (Llama 3 70B) and Calendly.",
      description:
        "Autonomous conversational AI agent that streamlines patient booking through natural language. Features LangGraph state management, multi-API orchestration with Groq API (Llama 3 70B), and Calendly integration for intelligent appointment scheduling.",
      image: "/projects/medical-agent.jpg",
      tags: ["Python", "LangGraph", "FastAPI", "Streamlit", "Groq API"],
      liveUrl: "",
      githubUrl: "https://github.com/himax12/ai-scheduling-agent",
      isLive: false,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
