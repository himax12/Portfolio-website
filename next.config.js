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
    return [{ source: "/resume", destination: RESUME_FILE }];
  },
  async headers() {
    return [
      { source: "/resume", headers: resumeHeaders },
      // The underlying file path points search engines back to /resume
      { source: RESUME_FILE, headers: resumeHeaders },
    ];
  },
};

module.exports = nextConfig;
