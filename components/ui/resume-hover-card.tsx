"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LinkHoverCard } from "@/components/ui/link-hover-card";

// Rendered from the PDF's first page; regenerate it whenever the resume changes
const PREVIEW = "/previews/resume.jpg";
const PREVIEW_SIZE = { width: 1240, height: 1754 };
// The whole page would make a very tall card, so the bottom of it fades out
const FADE = "linear-gradient(to bottom, black 72%, transparent)";

// Hovering a resume link previews the top of the PDF's first page
export default function ResumeLink({
  children,
  className,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <LinkHoverCard
      href={siteConfig.links.resume}
      trigger={children}
      className={className}
      ariaLabel="Resume"
      align={align}
      contentClassName="w-[268px] p-3 sm:w-[520px] sm:p-4"
    >
      {/* Desktop gets a large, readable page; narrow screens keep a thumbnail */}
      <div className="h-[210px] overflow-hidden rounded-md border border-overlay/15 bg-white sm:h-[400px]">
        <Image
          src={PREVIEW}
          alt={`First page of ${siteConfig.name}'s resume`}
          {...PREVIEW_SIZE}
          sizes="(min-width: 640px) 520px, 268px"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
          className="w-full"
        />
      </div>
      <p className="mt-3 font-semibold leading-tight">Resume</p>
      <p className="mt-0.5 text-muted">{siteConfig.title} · PDF</p>
      <span className="mt-3 inline-flex items-center gap-1 font-medium text-foreground border-b border-overlay/30 hover:border-foreground transition-colors">
        Open resume
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </LinkHoverCard>
  );
}
