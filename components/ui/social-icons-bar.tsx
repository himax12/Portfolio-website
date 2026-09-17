"use client";

import Link from "next/link";
import {
  Briefcase,
  Code2,
  FileText,
  GitMerge,
  Github,
  Linkedin,
  Mail,
  PenLine,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ContributionData, GitHubProfile } from "@/lib/github";
import { isNavItemActive, useSectionNav, type NavItem } from "@/lib/use-section-nav";
import { cn } from "@/lib/utils";
import {
  GitHubProfileLink,
  LinkedInProfileLink,
  XLogo,
  XProfileLink,
} from "@/components/ui/profile-hover-cards";
import { Dock, DockItem } from "@/components/ui/dock";

const iconClass =
  "flex h-9 w-9 items-center justify-center rounded-md text-foreground/75 hover:text-primary hover:bg-overlay/15 transition duration-200 focus-visible:text-primary focus-visible:bg-overlay/10 active:scale-90 active:bg-overlay/20";

const HOME: NavItem = { label: "Home", href: "/#home", sections: ["home"] };

// Each item jumps to the first section of its group and stays highlighted through the group
const NAV_ITEMS: (NavItem & { icon: typeof Briefcase })[] = [
  { label: "Experience", href: "/#experience", sections: ["experience"], icon: Briefcase },
  { label: "Projects", href: "/#projects", sections: ["projects"], icon: Code2 },
  { label: "Open Source", href: "/#opensource", sections: ["opensource", "github"], icon: GitMerge },
  { label: "Blogs", href: "/blogs", icon: PenLine },
];

// The site's only navigation: sections on the left, profiles on the right. Profile icons
// open the same hover cards as elsewhere; the rest show a small label on hover.
export default function SocialIconsBar({
  githubProfile,
  contributions,
}: {
  githubProfile: GitHubProfile | null;
  contributions: ContributionData | null;
}) {
  const { activeHref, handleClick } = useSectionNav();
  const activeClass = (item: NavItem) =>
    isNavItemActive(item, activeHref) && "bg-overlay/15 text-foreground";

  return (
    <Dock
      aria-label="Site navigation and profiles"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 h-[52px] gap-0.5 sm:gap-1 glass-dock rounded-md px-1.5 sm:px-2.5 w-fit max-w-[calc(100vw-16px)]"
    >
      <DockItem label="Home">
        <Link
          href={HOME.href}
          onClick={(e) => handleClick(e, HOME.href)}
          aria-label="Home"
          aria-current={isNavItemActive(HOME, activeHref) ? "page" : undefined}
          className={cn(iconClass, "text-sm font-bold text-foreground", activeClass(HOME))}
        >
          HG
        </Link>
      </DockItem>
      {NAV_ITEMS.map((item) => (
        <DockItem key={item.label} label={item.label}>
          <Link
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            aria-label={item.label}
            aria-current={isNavItemActive(item, activeHref) ? "page" : undefined}
            className={cn(iconClass, activeClass(item))}
          >
            <item.icon className="h-5 w-5" />
          </Link>
        </DockItem>
      ))}

      <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-overlay/15" />

      <DockItem>
        <LinkedInProfileLink className={iconClass} ariaLabel="LinkedIn" align="center">
          <Linkedin className="h-5 w-5" />
        </LinkedInProfileLink>
      </DockItem>
      <DockItem>
        <GitHubProfileLink
          profile={githubProfile}
          contributions={contributions}
          className={iconClass}
          ariaLabel="GitHub"
          align="center"
        >
          <Github className="h-5 w-5" />
        </GitHubProfileLink>
      </DockItem>
      <DockItem>
        <XProfileLink className={iconClass} ariaLabel="X" align="center">
          {/* Same X mark as the hover card, not the old Twitter bird */}
          <XLogo className="h-[18px] w-[18px]" />
        </XProfileLink>
      </DockItem>
      {/* Email and resume are also in the header and contact card; phones drop them to fit */}
      <div className="hidden sm:contents">
        <DockItem label="Email">
          <a href={`mailto:${siteConfig.links.email}`} className={iconClass} aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
        </DockItem>
        <DockItem label="Resume">
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="Resume"
          >
            <FileText className="h-5 w-5" />
          </a>
        </DockItem>
      </div>
    </Dock>
  );
}
