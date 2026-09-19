"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { LinkHoverCard } from "@/components/ui/link-hover-card";
import { linkChip } from "@/components/ui/link-chip";

// LinkedIn's own embed for a post, from the activity id in its URL
const embedUrl = (postUrl: string) => {
  const activityId = postUrl.match(/urn:li:activity:(\d+)/)?.[1];
  return activityId
    ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
    : null;
};

// Hovering the post chip previews the LinkedIn post itself
export function PostLink({ href }: { href: string }) {
  const embed = embedUrl(href);
  const trigger = (
    <>
      <Linkedin className="h-3.5 w-3.5" />
      Post
    </>
  );

  // Anything that isn't a recognisable post URL stays a plain link
  if (!embed) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkChip}>
        {trigger}
      </a>
    );
  }

  return (
    <LinkHoverCard
      href={href}
      trigger={trigger}
      className={linkChip}
      ariaLabel="LinkedIn post"
      align="start"
      contentClassName="w-[360px] p-3"
    >
      <iframe
        src={embed}
        title="LinkedIn post"
        allowFullScreen
        className="block h-[420px] w-full rounded-md border border-overlay/15 bg-white"
      />
    </LinkHoverCard>
  );
}

// Thumbnails from the event; hovering shows the full photo, clicking opens it
export function EventImage({ src, alt }: { src: string; alt: string }) {
  return (
    <LinkHoverCard
      href={src}
      trigger={
        <Image
          src={src}
          alt={alt}
          width={160}
          height={96}
          className="h-16 w-24 rounded-md border border-overlay/15 object-cover transition-transform duration-200 hover:scale-105"
        />
      }
      className="block"
      ariaLabel={alt}
      align="start"
      contentClassName="w-[420px] p-3"
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        sizes="420px"
        className="max-h-[420px] w-full rounded-md border border-overlay/15 object-contain"
      />
      <p className="mt-2.5 text-xs leading-relaxed text-muted">{alt}</p>
    </LinkHoverCard>
  );
}
