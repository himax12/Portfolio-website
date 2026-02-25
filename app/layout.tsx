import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import MatrixRain from "@/components/matrix-rain";
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
        {/* Main content centered with pure glass effect and bg-transparent */}
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="relative z-10 w-full max-w-4xl mx-auto rounded-xl bg-transparent backdrop-blur-xl border border-white/10 shadow-lg">
            {/* Content goes here */}
            <div className="relative z-30">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
