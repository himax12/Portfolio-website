"use client";

import Image from "next/image";
import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";
import type { RepoPreview } from "@/lib/github";
import { LinkHoverCard } from "@/components/ui/link-hover-card";

// GitHub's language dot colors, for the few languages these projects use
const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

const visitClass =
  "mt-3 inline-flex items-center gap-1 font-medium text-foreground border-b border-overlay/30 hover:border-foreground transition-colors";

const relativeTime = (iso: string) => {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.round(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};

// The repository behind a project card: hovering the GitHub icon previews the repo
export function RepoLink({
  href,
  repo,
  title,
  summary,
  className,
}: {
  href: string;
  repo: RepoPreview | undefined;
  title: string;
  // Stands in for the repo description when GitHub has none
  summary: string;
  className?: string;
}) {
  const ariaLabel = `${title} source code on GitHub`;
  const trigger = <Github className="h-4 w-4" />;

  // Without repo data there is nothing to preview; keep it a plain icon link
  if (!repo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className}
      >
        {trigger}
      </a>
    );
  }

  return (
    <LinkHoverCard
      href={href}
      trigger={trigger}
      className={className}
      ariaLabel={ariaLabel}
      align="end"
    >
      <div className="flex items-start gap-3">
        <Image
          src={repo.ownerAvatarUrl}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-md object-cover border border-overlay/15"
        />
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-tight truncate">{repo.name}</p>
          <p className="text-muted truncate">{repo.owner}</p>
        </div>
        <Github className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
      </div>

      <p className="mt-3 text-muted leading-relaxed">{repo.description ?? summary}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "currentColor" }}
            />
            {repo.language}
          </span>
        )}
        {/* Zero counts say nothing, so they're left out rather than shown as "0" */}
        {repo.stars > 0 && (
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5" />
            {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {repo.forks}
          </span>
        )}
        <span>Updated {relativeTime(repo.pushedAt)}</span>
      </div>
    </LinkHoverCard>
  );
}

// A project's deployed site: hovering the link previews a screenshot of it
export function LiveSiteLink({
  href,
  preview,
  title,
  summary,
  className,
}: {
  href: string;
  // Screenshot in public/previews; without one the link stays plain
  preview: string | undefined;
  title: string;
  summary: string;
  className?: string;
}) {
  const hostname = new URL(href).hostname.replace(/^www\./, "");
  const trigger = (
    <>
      {hostname}
      <ArrowUpRight className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
    </>
  );

  if (!preview) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {trigger}
      </a>
    );
  }

  return (
    <LinkHoverCard
      href={href}
      trigger={trigger}
      className={className}
      align="end"
      contentClassName="w-[320px] p-3"
    >
      <Image
        src={preview}
        alt={`Screenshot of ${title}`}
        width={640}
        height={400}
        className="w-full rounded-md border border-overlay/15 object-cover"
      />
      <div className="mt-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
        <p className="truncate font-semibold leading-tight">{hostname}</p>
      </div>
      <p className="mt-1.5 text-muted leading-relaxed">{summary}</p>
      <span className={visitClass}>
        Visit site
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </LinkHoverCard>
  );
}
