/** @type {import('next').NextConfig} */

// The resume PDF lives in public/files; /resume is its public, indexable URL
const RESUME_FILE = "/files/himanshu-gupta-resume.pdf";
const RESUME_URL = "https://www.himex.tech/resume";

const resumeHeaders = [
  { key: "Content-Type", value: "application/pdf" },
  // Show in the browser's PDF viewer; saving uses a clean filename
  {
    key: "Content-Disposition",
    value: 'inline; filename="Himanshu-Gupta-Resume.pdf"',
  },
  // PDFs can't carry <link rel="canonical">, so declare it as a header
  { key: "Link", value: `<${RESUME_URL}>; rel="canonical"` },
  // Revalidate on each visit so an updated resume shows right after deploy
  { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
];

// Markdown and text twins point search engines back to the HTML page they mirror,
// so they stay readable for AI assistants without competing as duplicate content
const canonical = (path) => [
  { key: "Link", value: `<https://www.himex.tech${path}>; rel="canonical"` },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      { source: "/resume", destination: RESUME_FILE },
      // llmstxt.org convention: a page's Markdown lives at its URL + ".md"
      { source: "/index.html.md", destination: "/index.md" },
    ];
  },
  async headers() {
    return [
      { source: "/resume", headers: resumeHeaders },
      // The underlying file path points search engines back to /resume
      { source: RESUME_FILE, headers: resumeHeaders },
      { source: "/index.md", headers: canonical("/") },
      { source: "/index.html.md", headers: canonical("/") },
      { source: "/llms-full.txt", headers: canonical("/") },
      { source: "/blogs.md", headers: canonical("/blogs") },
    ];
  },
};

module.exports = nextConfig;
