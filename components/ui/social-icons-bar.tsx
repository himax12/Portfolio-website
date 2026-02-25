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
    download: true,
  },
];

export default function SocialIconsBar() {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center gap-4 rounded-xl border border-[#23272f] bg-[#181c23] px-4 py-2 shadow-lg w-fit">
      {icons.map(({ icon: Icon, label, href, download }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...(download ? { download: true } : {})}
          className="text-foreground hover:text-primary transition-colors duration-200 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:bg-accent/30 hover:bg-accent/30"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
