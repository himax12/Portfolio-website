"use client";

import { useState } from "react";
import { GitMerge } from "lucide-react";
import type { MergedPullRequest } from "@/lib/github";
import { ProfileHoverCard } from "@/components/ui/profile-hover-cards";
import PixelGlow from "@/components/ui/pixel-glow";

const formatMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// One repository contributed to: its owner's avatar lights up with a pixel glow on hover
// (or keyboard focus), and the hover card lists the merged pull requests
export default function OpenSourceOrg({
  repo,
  pullRequests,
}: {
  repo: string;
  pullRequests: MergedPullRequest[];
}) {
  const [active, setActive] = useState(false);
  const [owner, name] = repo.split("/");
  const count = pullRequests.length;

  return (
    <li
      className="relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <ProfileHoverCard
        href={`https://github.com/${repo}/pulls?q=${encodeURIComponent("is:pr is:merged")}`}
        ariaLabel={`${repo}: ${count} merged pull request${count === 1 ? "" : "s"}`}
        align="center"
        className="group relative flex flex-col items-center gap-1.5 overflow-hidden rounded-md px-1 pt-1 pb-3 outline-none"
        trigger={
          <>
            {/* The glow is confined to the avatar band so the name and count below stay readable */}
            <span className="relative flex h-[68px] w-full items-center justify-center">
              <PixelGlow active={active} />
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny avatars from GitHub's CDN */}
              <img
                src={`https://github.com/${owner}.png?size=104`}
                alt=""
                width={52}
                height={52}
                loading="lazy"
                className="relative h-[52px] w-[52px] rounded-full border border-overlay/15 bg-[#111] grayscale-[65%] transition duration-300 group-hover:scale-110 group-hover:grayscale-0 group-focus-visible:scale-110 group-focus-visible:grayscale-0"
              />
            </span>
            <span className="relative line-clamp-1 max-w-full break-all text-center text-[13px] font-semibold text-foreground">
              {name}
            </span>
            <span className="relative inline-flex items-center gap-1 text-[11.5px] text-muted">
              <GitMerge className="h-3 w-3 text-[#a371f7]" />
              {count} PR{count === 1 ? "" : "s"}
            </span>
          </>
        }
      >
        <p className="mb-2 text-xs text-muted">{repo}</p>
        <ul className="space-y-2">
          {pullRequests.map((pr) => (
            <li key={pr.url}>
              <a
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 rounded-md text-[13px] leading-snug hover:text-primary transition-colors"
              >
                <GitMerge className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#a371f7]" />
                <span>
                  {pr.title}
                  <span className="ml-1.5 text-muted">{formatMonth(pr.mergedAt)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </ProfileHoverCard>
    </li>
  );
}
