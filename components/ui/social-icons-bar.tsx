import { Github, Mail, FileText, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ContributionData, GitHubProfile } from "@/lib/github";
import {
  GitHubProfileLink,
  LinkedInProfileLink,
  XLogo,
  XProfileLink,
} from "@/components/ui/profile-hover-cards";
import { Dock, DockItem } from "@/components/ui/dock";

const iconClass =
  "flex h-9 w-9 items-center justify-center rounded-md text-foreground/75 hover:text-primary hover:bg-overlay/15 transition-colors duration-200 focus-visible:text-primary focus-visible:bg-overlay/10";

// Magnifying dock; profile icons open the same hover cards as the About section,
// while email and resume (no card) show a small label instead
export default function SocialIconsBar({
  githubProfile,
  contributions,
}: {
  githubProfile: GitHubProfile | null;
  contributions: ContributionData | null;
}) {
  return (
    <Dock
      aria-label="Social links"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 h-[52px] gap-3 glass-dock rounded-md px-3 w-fit"
    >
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
    </Dock>
  );
}
