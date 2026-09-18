"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import { LinkHoverCard } from "@/components/ui/link-hover-card";
import { LiveSiteLink } from "@/components/ui/project-links";
import { cn } from "@/lib/utils";

type Hackathon = (typeof siteConfig.hackathons)[number];

// First letters of the event name, for entries without a logo
const monogram = (event: string) =>
  event
    .split(" ")
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

// LinkedIn's own embed for a post, from the activity id in its URL
const embedUrl = (postUrl: string) => {
  const activityId = postUrl.match(/urn:li:activity:(\d+)/)?.[1];
  return activityId
    ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`
    : null;
};

const linkChip =
  "inline-flex items-center gap-1.5 rounded-md glass-subtle px-2.5 py-1 text-xs font-semibold text-foreground/85 transition-colors hover:bg-overlay/10 hover:text-foreground";

// The team name is picked out of the description so it reads as one sentence
function describe({ description, team }: Pick<Hackathon, "description" | "team">) {
  if (!team || !description.includes(team)) return description;
  const [before, ...rest] = description.split(team);
  return (
    <>
      {before}
      <span className="inline-flex items-center rounded-[5px] border border-overlay/20 bg-overlay/10 px-1.5 py-0.5 align-[-0.05em] text-[0.95em] font-semibold leading-none text-foreground">
        {team}
      </span>
      {rest.join(team)}
    </>
  );
}

// Events without an award show just their name
const title = (hackathon: Hackathon) =>
  hackathon.award ? `${hackathon.event} (${hackathon.award})` : hackathon.event;

// Vertical timeline: a dashed rail with one logo tile per event
export default function Hackathons() {
  return (
    <section id="hackathons" className="section">
      <SectionHeading title="Hackathons" />

      <div className="mb-7 max-w-[62ch]">
        <h3 className="text-[22px] sm:text-[26px] font-bold tracking-tight">
          I love building things
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">
          Hackathons are where I learn fastest: a small team, two or three days, and something
          working at the end. Tight deadlines and constant iteration are the parts of building I
          enjoy most.
        </p>
      </div>

      <ol className="relative">
        {siteConfig.hackathons.map((hackathon: Hackathon, index) => (
          <motion.li
            key={`${hackathon.event}-${hackathon.date}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {/* The rail runs between tiles, so the last entry doesn't trail off */}
            {index < siteConfig.hackathons.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-5 top-11 bottom-1 w-px border-l border-dashed border-overlay/20"
              />
            )}
            <span
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-overlay/15 text-[13px] font-semibold text-muted",
                hackathon.logo ? "bg-white" : "bg-background glass-subtle",
              )}
            >
              {hackathon.logo ? (
                <Image
                  src={hackathon.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                monogram(hackathon.event)
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-muted">{hackathon.date}</p>
              <h3 className="mt-0.5 text-[16.5px] font-semibold leading-snug">
                {title(hackathon)}
              </h3>
              {hackathon.location && (
                <p className="mt-0.5 text-[13px] text-muted">{hackathon.location}</p>
              )}
              {hackathon.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted">{describe(hackathon)}</p>
              )}

              {hackathon.images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {hackathon.images.map((image) => (
                    <EventImage key={image.src} {...image} />
                  ))}
                </div>
              )}

              {(hackathon.liveUrl || hackathon.repoUrl || hackathon.postUrl) && (
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {hackathon.liveUrl && (
                    <LiveSiteLink
                      href={hackathon.liveUrl}
                      preview={hackathon.livePreview || undefined}
                      title={hackathon.event}
                      icon={<span className="h-1.5 w-1.5 rounded-full bg-green-500" />}
                      className={cn(linkChip, "group/link")}
                    />
                  )}
                  {hackathon.repoUrl && (
                    <a href={hackathon.repoUrl} target="_blank" rel="noopener noreferrer" className={linkChip}>
                      <Github className="h-3.5 w-3.5" />
                      Repo
                    </a>
                  )}
                  {hackathon.postUrl && <PostLink href={hackathon.postUrl} />}
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

// Hovering the post chip previews the LinkedIn post itself
function PostLink({ href }: { href: string }) {
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
function EventImage({ src, alt }: { src: string; alt: string }) {
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
