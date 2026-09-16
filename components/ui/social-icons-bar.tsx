import { Github, Twitter, Mail, FileText, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

const icons = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.links.github,
  },
  {
    icon: Twitter,
    label: "X",
    href: siteConfig.links.twitter,
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${siteConfig.links.email}`,
  },
  {
    icon: FileText,
    label: "Resume",
    href: siteConfig.links.resume,
  },
];

export default function SocialIconsBar() {
  return (
    <nav
      aria-label="Social links"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-4 glass-strong rounded-md px-4 py-2 w-fit"
    >
      {icons.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-muted hover:text-primary hover:bg-overlay/10 transition-colors duration-200 rounded-md p-1.5 focus-visible:text-primary focus-visible:bg-overlay/10"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </nav>
  );
}
