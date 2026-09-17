import { Github, Twitter, Mail, FileText, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { ContributionData, GitHubProfile } from "@/lib/github";
import {
  GitHubProfileLink,
  LinkedInProfileLink,
  XProfileLink,
} from "@/components/ui/profile-hover-cards";

const iconClass =
  "text-foreground/75 hover:text-primary hover:bg-overlay/15 transition-colors duration-200 rounded-md p-1.5 focus-visible:text-primary focus-visible:bg-overlay/10";

// Profile icons open the same hover cards as the About section; email and resume stay plain
export default function SocialIconsBar({
  githubProfile,
  contributions,
}: {
  githubProfile: GitHubProfile | null;
  contributions: ContributionData | null;
}) {
  return (
    <nav
      aria-label="Social links"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-4 glass-dock rounded-md px-4 py-2 w-fit"
    >
      <LinkedInProfileLink className={iconClass} ariaLabel="LinkedIn" align="center">
        <Linkedin className="h-5 w-5" />
      </LinkedInProfileLink>
      <GitHubProfileLink
        profile={githubProfile}
        contributions={contributions}
        className={iconClass}
        ariaLabel="GitHub"
        align="center"
      >
        <Github className="h-5 w-5" />
      </GitHubProfileLink>
      <XProfileLink className={iconClass} ariaLabel="X" align="center">
        <Twitter className="h-5 w-5" />
      </XProfileLink>
      <a href={`mailto:${siteConfig.links.email}`} className={iconClass} aria-label="Email">
        <Mail className="h-5 w-5" />
      </a>
      <a
        href={siteConfig.links.resume}
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        aria-label="Resume"
      >
        <FileText className="h-5 w-5" />
      </a>
    </nav>
  );
}
