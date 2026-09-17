import "./globals.css";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import MatrixRain from "@/components/matrix-rain";
import MotionProvider from "@/components/motion-provider";
import SocialIconsBar from "@/components/ui/social-icons-bar";
import { getContributions, getGitHubProfile } from "@/lib/github";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const siteTitle = `${siteConfig.name} - ${siteConfig.title}`;

// Static file (not a generated route) so scrapers get a fixed Content-Length;
// WhatsApp and some others skip chunked, on-the-fly images
const shareImage = {
  // JPEG keeps it around 100KB (WhatsApp skips large previews); rename the file whenever
  // the image changes, since social platforms cache by URL
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: siteTitle,
  type: "image/jpeg",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteTitle, template: `%s | ${siteConfig.name}` },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    siteConfig.name,
    siteConfig.title,
    "AI Engineer",
    "Python Developer",
    "Full Stack Developer",
    "LangGraph",
    "RAG",
    "OCR",
    "Next.js",
    "Delhi",
  ],
  // Canonical points every deployment URL (e.g. preview/duplicate Vercel domains) at the main site
  alternates: {
    canonical: "/",
    // Advertises the Markdown version of the page to AI agents and crawlers
    types: { "text/markdown": "/index.md" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteTitle,
    description: siteConfig.shortDescription,
    locale: "en_US",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.shortDescription,
    creator: "@ayy_him_anshu23",
    images: [shareImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Same cached (hourly) requests the homepage makes, so the social bar's GitHub card works on every page
  const [githubProfile, contributions] = await Promise.all([
    getGitHubProfile(siteConfig.githubUsername),
    getContributions(siteConfig.githubUsername),
  ]);
  return (
    // Always dark; the light theme tokens remain in globals.css but nothing switches to them
    <html lang="en" className="dark">
      <head>
        {/* Scroll-in animations start hidden; without JS they would never reveal, so show everything */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={inter.className}>
        {/* Matrix rain as full-screen background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <MatrixRain />
          {/* Soft light pools give the glass surfaces something to refract */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,255,65,0.07),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(0,255,65,0.05),transparent_40%)]"
          />
        </div>
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="relative z-10 w-full max-w-[720px] mx-auto glass-frame">
            {/* Glass effect lives on its own layer: backdrop-filter on an ancestor
                would turn it into the containing block for fixed-position children
                (hover cards, dock), pinning them to this box instead of the viewport */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 backdrop-blur-xl"
            />
            <div className="relative z-30">
              <MotionProvider>{children}</MotionProvider>
            </div>
          </div>
        </div>
        <SocialIconsBar githubProfile={githubProfile} contributions={contributions} />
      </body>
    </html>
  );
}
