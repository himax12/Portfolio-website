import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import MatrixRain from "@/components/matrix-rain";
import SocialIconsBar from "@/components/ui/social-icons-bar";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.title}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Matrix rain as full-screen background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <MatrixRain />
        </div>
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="relative z-10 w-full max-w-4xl mx-auto rounded-md border border-white/10 shadow-lg">
            {/* Glass effect lives on its own layer: backdrop-filter on an ancestor
                would turn it into the containing block for fixed-position children
                (navbar, mobile menu), pinning them to this box instead of the viewport */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-md backdrop-blur-xl"
            />
            <div className="relative z-30">{children}</div>
          </div>
        </div>
        <SocialIconsBar />
      </body>
    </html>
  );
}
