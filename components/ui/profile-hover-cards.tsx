"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ContributionData, GitHubProfile } from "@/lib/github";

// GitHub's dark-mode contribution colors, from empty to busiest
const CONTRIBUTION_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const HEATMAP_WEEKS = 16;

const linkClass =
  "font-medium text-foreground border-b border-overlay/30 hover:border-foreground transition-colors";

// Shared props for every profile link: text by default, or any trigger (e.g. an icon)
type TriggerProps = {
  // Trigger content; defaults to the profile's text label
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  // Card alignment relative to the trigger ("center" suits icon buttons)
  align?: "start" | "center" | "end";
};

// Hover (or keyboard focus) reveals a profile preview; the link itself still navigates,
// so touch devices, which have no hover, simply open the profile
function ProfileHoverCard({
  href,
  trigger,
  className = linkClass,
  ariaLabel,
  align = "start",
  children,
}: {
  href: string;
  trigger: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  align?: "start" | "center" | "end";
  children: React.ReactNode;
}) {
  return (
    <HoverCard.Root openDelay={200} closeDelay={150}>
      <HoverCard.Trigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={className}
        >
          {trigger}
        </a>
      </HoverCard.Trigger>
      {/* Portal escapes the page frame so the card is never clipped */}
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align={align}
          sideOffset={10}
          collisionPadding={16}
          className="hover-card glass-strong z-[60] w-72 rounded-md p-4 text-sm text-foreground"
        >
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}

export function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CardHeader({
  avatar,
  name,
  subtitle,
  icon,
  href,
  platform,
  wrapSubtitle = false,
}: {
  avatar: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  // The corner platform icon links to the profile
  href: string;
  platform: string;
  // Handles stay on one line; longer text like a LinkedIn headline wraps instead of truncating
  wrapSubtitle?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Image
        src={avatar}
        alt=""
        width={48}
        height={48}
        className="h-12 w-12 shrink-0 rounded-full object-cover border border-overlay/15"
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-tight truncate">{name}</p>
        <p className={wrapSubtitle ? "text-muted leading-snug" : "text-muted truncate"}>
          {subtitle}
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${platform} profile`}
        className="-m-1.5 rounded-md p-1.5 text-muted hover:text-foreground hover:bg-overlay/10 transition-colors"
      >
        {icon}
      </a>
    </div>
  );
}

// Last few weeks of contributions as a compact GitHub-style grid (columns are weeks)
function MiniHeatmap({ data }: { data: ContributionData }) {
  const days = data.contributions.slice(-HEATMAP_WEEKS * 7);
  // Pad the front so the first column starts on Sunday, like GitHub
  const [year, month, day] = (days[0]?.date ?? "2000-01-01").split("-").map(Number);
  const leading = new Date(year, month - 1, day).getDay();
  const cells = [...Array(leading).fill(null), ...days];
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  );
  const recent = days.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="mt-4">
      <div className="flex gap-[3px]" aria-hidden="true">
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {week.map((d, i) => (
              <span
                key={i}
                className="h-[11px] w-[11px] rounded-[2px]"
                style={{ backgroundColor: d ? CONTRIBUTION_COLORS[d.level] : "transparent" }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        {recent} contributions in {HEATMAP_WEEKS} weeks · {data.total} this year
      </p>
    </div>
  );
}

export function BookCallLink({ children, className, ariaLabel, align }: TriggerProps) {
  const calendly = siteConfig.profiles.calendly;
  return (
    <ProfileHoverCard
      href={siteConfig.links.calendar}
      trigger={children ?? "Book a Call"}
      className={className}
      ariaLabel={ariaLabel}
      align={align}
    >
      <CardHeader
        avatar={calendly.avatar}
        name={calendly.name}
        subtitle={calendly.event}
        icon={<Calendar className="h-4 w-4" />}
        href={siteConfig.links.calendar}
        platform="Calendly"
      />
      <p className="mt-3 flex items-center gap-2 text-muted">
        <Clock className="h-4 w-4" />
        {calendly.durationMinutes} min
      </p>
      <p className="mt-2 text-muted leading-relaxed">{siteConfig.availability}.</p>
      <a
        href={siteConfig.links.calendar}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 font-medium text-foreground border-b border-overlay/30 hover:border-foreground transition-colors"
      >
        Pick a time
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </ProfileHoverCard>
  );
}

export function XProfileLink({ children, className, ariaLabel, align }: TriggerProps) {
  const x = siteConfig.profiles.x;
  return (
    <ProfileHoverCard
      href={siteConfig.links.twitter}
      trigger={children ?? `@${x.handle}`}
      className={className}
      ariaLabel={ariaLabel}
      align={align}
    >
      <CardHeader
        avatar={x.avatar}
        name={x.name}
        subtitle={`@${x.handle}`}
        icon={<XLogo className="h-4 w-4" />}
        href={siteConfig.links.twitter}
        platform="X"
      />
      <p className="mt-3 whitespace-pre-line text-muted leading-relaxed">{x.bio}</p>
    </ProfileHoverCard>
  );
}

export function LinkedInProfileLink({ children, className, ariaLabel, align }: TriggerProps) {
  const linkedin = siteConfig.profiles.linkedin;
  return (
    <ProfileHoverCard
      href={siteConfig.links.linkedin}
      trigger={children ?? "LinkedIn"}
      className={className}
      ariaLabel={ariaLabel}
      align={align}
    >
      <CardHeader
        avatar={linkedin.avatar}
        name={linkedin.name}
        subtitle={linkedin.headline}
        icon={<Linkedin className="h-4 w-4" />}
        href={siteConfig.links.linkedin}
        platform="LinkedIn"
        wrapSubtitle
      />
    </ProfileHoverCard>
  );
}

export function GitHubProfileLink({
  profile,
  contributions,
  children,
  className,
  ariaLabel,
  align,
}: TriggerProps & {
  profile: GitHubProfile | null;
  contributions: ContributionData | null;
}) {
  // Without profile data there is nothing useful to preview; keep it a plain link
  if (!profile) {
    return (
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={className ?? linkClass}
      >
        {children ?? "GitHub"}
      </a>
    );
  }
  return (
    <ProfileHoverCard
      href={siteConfig.links.github}
      trigger={children ?? "GitHub"}
      className={className}
      ariaLabel={ariaLabel}
      align={align}
    >
      <CardHeader
        avatar={profile.avatarUrl}
        name={profile.name ?? profile.login}
        subtitle={`@${profile.login}`}
        icon={<Github className="h-4 w-4" />}
        href={siteConfig.links.github}
        platform="GitHub"
      />
      {profile.bio && <p className="mt-3 text-muted">{profile.bio}</p>}
      <p className="mt-2 text-xs text-muted">
        {profile.publicRepos} repositories · {profile.followers} followers
      </p>
      {contributions && <MiniHeatmap data={contributions} />}
    </ProfileHoverCard>
  );
}
