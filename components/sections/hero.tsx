import Image from "next/image";
import { Mail, FileText, Calendar } from "lucide-react";
import { siteConfig } from "@/config/site";

// Rendered without entrance animations so the above-the-fold content
// (name, title, CTAs) is visible in the server HTML before JS loads
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-24 pt-32"
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <Image
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            width={220}
            height={220}
            className="rounded-md border border-overlay/15 object-cover shadow-2xl"
            priority
          />
        </div>

        {/* Name & Title */}
        <div className="mb-6 space-y-2 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
            {siteConfig.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted">
            {siteConfig.title}
          </p>
        </div>

        {/* Tech Stack - Minimal */}
        <div className="mb-4 text-sm sm:text-base text-muted">
          TypeScript / React / Node.js / Python / AI/ML
        </div>

        {/* Availability */}
        <div className="mb-8 text-sm sm:text-base">
          <span className="text-foreground font-medium">
            Open to freelance AI & full-stack projects, as well as full-time
            roles
          </span>
        </div>

        {/* Resume and Book a Call - Prominent Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-4">
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center gap-2 px-6 py-3 glass-subtle text-foreground hover:bg-overlay/10 transition-colors justify-center font-semibold rounded-md"
          >
            <Mail className="h-5 w-5" />
            Let's Connect
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass-subtle text-foreground hover:bg-overlay/10 transition-colors justify-center font-semibold rounded-md"
          >
            <FileText className="h-5 w-5" />
            View Resume
          </a>
          <a
            href={siteConfig.links.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass-subtle text-foreground hover:bg-overlay/10 transition-colors justify-center font-semibold rounded-md"
          >
            <Calendar className="h-5 w-5" />
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
