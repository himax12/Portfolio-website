export const siteConfig = {
  name: "Himanshu Gupta",
  title: "Full Stack AI Engineer",
  url: "https://www.himex.tech",
  location: "Delhi, India",
  // Shown in its own section and as alumniOf in the structured data
  education: {
    school: "Maharaja Agrasen Institute of Technology",
    shortName: "MAIT",
    degree: "B.Tech in Artificial Intelligence & Data Science",
    duration: "2022 - 2026",
    location: "Delhi, India",
    website: "https://www.mait.ac.in/",
    // Crest from mait.ac.in; without a logo the tile falls back to a monogram
    logo: "/logos/mait.png",
  },
  // Short summary for search results and link previews (~155 characters)
  shortDescription:
    "Full Stack AI Engineer in Delhi building production AI systems: agent workflows, OCR pipelines and multi-agent RAG.",
  // Long-form bio used for llms-full.txt and index.md
  description:
    "B.Tech AI & Data Science student at MAIT, Delhi. Hands-on builder focused on turning AI ideas into real production systems. Built ClipSync (AI video pipeline with Gemini VLM and FFmpeg), AI Medical Scheduling Agent (multi-API conversational workflows), and MathPilot (multi-agent math reasoning with RAG memory). Currently a Full Stack AI Engineer at Sparkonomy. Previously a Python Developer Intern at EspoMedia (Jan–Apr 2026), building OCR pipelines with OpenCV, EasyOCR, and PyTorch, automating data workflows, and improving model accuracy in production. I enjoy owning problems end-to-end—designing APIs, integrating models, debugging edge cases, and shipping systems that people actually use. Especially interested in AI that meets real products through agent workflows, data pipelines, and scalable backend systems.",

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
      name: "Himanshu Gupta",
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
      // Logo from the LinkedIn company page; they have no public website
      logo: "/logos/espomedia.jpg",
      website: "https://www.linkedin.com/company/espomedianetwork/",
      brandColors: ["#115add", "#4f8bff"],
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

  // Organizations whose PRs are work, not open source contributions (Stepnex runs Sparkonomy)
  openSourceExcludedOwners: ["StepnexTechnologies"],

  // Short labels for open source tiles, keyed by "owner/repo"; other repos use their name
  openSourceLabels: {
    "NaveenSh7/SaaS-Monitoring-System": "SaaS Monitor",
  } as Record<string, string>,

  // Coding Profiles
  codingProfiles: {
    codolio: "https://codolio.com/profile/himax12",
  },

  // Hackathons, most recent first. logo is optional: without one the tile shows a monogram.
  hackathons: [
    {
      event: "CyborgDB Hackathon 2025",
      award: "",
      team: "",
      date: "December 27, 2025",
      location: "",
      description:
        "Built an end-to-end encrypted RAG application with a local embedding model and LLM, powered by Cyborg's encrypted embeddings.",
      logo: "/logos/cyborgdb.png",
      repoUrl: "",
      postUrl: "",
      // Photos or screenshots from the event, shown as thumbnails that enlarge on hover
      images: [] as { src: string; alt: string }[],
    },
    {
      event: "Tesco Retail Media InnovAltion Jam",
      award: "National Finalist",
      team: "Psyducks",
      date: "15 January 2026",
      location: "Dunnhumby, Gurugram, India",
      description:
        "Competing as team Psyducks, built an AI-powered creative builder with real-time compliance enforcement. Suppliers design retail media in a browser-based canvas editor while an intelligent backend validates every element against Tesco's legal and brand guidelines.",
      logo: "/logos/tesco.png",
      repoUrl: "https://github.com/ImAshishChoudhary/ReTexture",
      postUrl: "",
      images: [
        {
          src: "/hackathons/tesco-schedule.jpg",
          alt: "Presentation schedule for the onsite finale, listing team Psyducks",
        },
        {
          src: "/hackathons/tesco-shortlist.jpg",
          alt: "Email inviting the team to the onsite finale in Gurugram",
        },
      ] as { src: string; alt: string }[],
    },
    {
      event: "Adobe GenSolve",
      award: "National Finalist, Top 6",
      team: "MotionMinds",
      date: "13 Sept 2024",
      location: "Noida, India",
      description:
        "Competing as team MotionMinds, built an integrated machine learning and computer vision system to analyse tennis matches, with real-time player and ball tracking plus event analysis, using OpenCV, TensorFlow, YOLOv5, PyTorch and ResNet-50.",
      logo: "/logos/adobe.png",
      images: [
        {
          src: "/hackathons/adobe-finalists.jpg",
          alt: "GeeksforGeeks x Adobe finalists graphic, with team MotionMinds from MAIT Delhi",
        },
      ] as { src: string; alt: string }[],
      repoUrl: "https://github.com/AyanGairola/gameSense",
      postUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7239239308086276096/",
    },
  ],

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
      // Screenshot shown when hovering the live link (public/previews)
      preview: "/previews/clipmyreel-app.jpg",
      demoUrl: "",
      demoStart: 0,
      githubUrl: "https://github.com/himax12/ClipSync",
      isLive: true,
    },
    {
      title: "MathPilot",
      summary:
        "Multi-agent math reasoning with RAG memory, multimodal input and human-in-the-loop review.",
      // Freelance engagement
      context: "Freelance",
      description:
        "Autonomous reasoning system designed to solve high-school and undergraduate level mathematics problems with high reliability. Unlike typical chat interfaces, this application decouples semantic understanding from deterministic computation. The system accepts multimodal inputs (text, image, audio) and employs a Human-in-the-Loop (HITL) workflow to handle ambiguity before it propagates to the solver.",
      image: "/projects/math-mentor.jpg",
      tags: ["Python", "RAG", "Multi-Agent", "HITL", "Multimodal"],
      liveUrl: "https://github.com/himax12/MathPilot",
      demoUrl: "",
      demoStart: 0,
      preview: "",
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
      demoUrl: "",
      demoStart: 0,
      preview: "",
      githubUrl: "https://github.com/himax12/ai-scheduling-agent",
      isLive: false,
    },
    {
      title: "PlotLine",
      context: "Research",
      summary:
        "Neuro-symbolic story engine that plans plots symbolically before Gemini writes the prose, streaming agent reasoning live.",
      description:
        "Neuro-symbolic narrative engine that separates symbolic plot planning from neural prose generation, so stories stay logically consistent instead of drifting the way pure LLM output does. A LangGraph state machine runs the planning, validation and writing agents, Gemini 1.5 Pro generates the prose against Pydantic-enforced schemas, and Server-Sent Events stream every agent's reasoning trace to the browser in real time.",
      image: "/projects/plotline.jpg",
      tags: ["Python", "FastAPI", "LangGraph", "Gemini API", "Multi-Agent"],
      liveUrl: "",
      demoUrl: "",
      demoStart: 0,
      preview: "",
      githubUrl: "https://github.com/himax12/PlotLine",
      isLive: false,
    },
    {
      title: "Screen + Webcam Recorder",
      context: "Desktop app",
      summary:
        "Electron recorder that captures screen and webcam independently, mixes mic audio into both and exports a picture-in-picture MP4.",
      description:
        "Cross-platform Electron desktop app that records the screen and webcam as independent streams, each with its own controls, and saves every session to its own UUID folder with metadata. Microphone audio is mixed into both tracks through an AudioContext gain graph, and exporting runs FFmpeg to transcode to MP4 or merge the webcam over the screen recording as a picture-in-picture overlay.",
      image: "/projects/screen-webcam-recorder.jpg",
      tags: ["TypeScript", "Electron", "React", "FFmpeg"],
      liveUrl: "",
      preview: "/previews/screen-webcam-recorder.jpg",
      // Demo video; the hover preview plays it from this many seconds in
      demoUrl: "https://vimeo.com/1174422964",
      demoStart: 20,
      githubUrl: "https://github.com/himax12/Screen-webcam-recorder",
      isLive: false,
    },
    {
      title: "Multi-Model LLM Chat Service",
      context: "Backend",
      summary:
        "FastAPI service that routes prompts to Llama 3 or Mistral on Ollama and logs latency and token usage per call.",
      description:
        "Minimal FastAPI service that routes prompts to different open-source LLMs running locally on Ollama, switching models with a single query parameter. Every call is logged to CSV with round-trip latency and prompt and response token counts, so model quality and cost can be compared side by side; the API is covered by a pytest suite.",
      image: "/projects/llm-chat-service.jpg",
      tags: ["Python", "FastAPI", "Ollama", "Llama 3", "Mistral"],
      liveUrl: "",
      preview: "",
      demoUrl: "",
      demoStart: 0,
      githubUrl: "https://github.com/himax12/Multi-Model-LLM-Chat-Service",
      isLive: false,
    },
    {
      title: "Kryptoverse",
      context: "Distributed systems",
      summary:
        "Crypto stats tracker split into an API and a worker, coordinated over NATS with MongoDB time series storage.",
      description:
        "Distributed cryptocurrency statistics service split into two Node.js processes: an Express API that serves current prices and price deviation, and a worker that runs scheduled collection jobs. The two communicate over NATS messaging instead of direct calls, and CoinGecko data for Bitcoin, Ethereum and Polygon is stored as MongoDB time series documents.",
      image: "/projects/kryptoverse.jpg",
      tags: ["Node.js", "Express.js", "MongoDB", "NATS", "Docker"],
      liveUrl: "",
      preview: "",
      demoUrl: "",
      demoStart: 0,
      githubUrl: "https://github.com/himax12/Kryptoverse",
      isLive: false,
    },
    {
      title: "Tally",
      context: "Fintech",
      summary:
        "Ledger-based wallet service for virtual currencies, with double-entry bookkeeping, idempotent writes and an immutable audit trail.",
      description:
        "Wallet service for virtual currencies built on a double-entry ledger, so every balance is derived from immutable transaction records rather than mutated in place. Transfers run as ACID transactions with idempotency keys for safe retries, balance validation that refuses to go negative, and isolation plus retry logic for concurrent writes; the stack is Next.js and TypeScript over PostgreSQL with Prisma.",
      image: "/projects/tally.jpg",
      tags: ["TypeScript", "Next.js", "PostgreSQL", "Prisma", "Docker"],
      liveUrl: "",
      preview: "",
      demoUrl: "",
      demoStart: 0,
      githubUrl: "https://github.com/himax12/Tally-",
      isLive: false,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
