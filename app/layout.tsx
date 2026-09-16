import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import MatrixRain from "@/components/matrix-rain";
import MotionProvider from "@/components/motion-provider";
import SocialIconsBar from "@/components/ui/social-icons-bar";
import { THEME_STORAGE_KEY } from "@/lib/theme";
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
    // Dark is the default; the script swaps to a saved light preference before
    // first paint, so the class differs from the server HTML on purpose
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light")document.documentElement.classList.remove("dark")}catch(e){}`,
          }}
        />
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
          <div className="relative z-10 w-full max-w-4xl mx-auto glass-frame rounded-md">
            {/* Glass effect lives on its own layer: backdrop-filter on an ancestor
                would turn it into the containing block for fixed-position children
                (navbar, mobile menu), pinning them to this box instead of the viewport */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-md backdrop-blur-xl"
            />
            <div className="relative z-30">
              <MotionProvider>{children}</MotionProvider>
            </div>
          </div>
        </div>
        <SocialIconsBar />
      </body>
    </html>
  );
}
