import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import { BookCallLink } from "@/components/ui/profile-hover-cards";

const PROFILE_LINKS = [
  { label: "GitHub", href: siteConfig.links.github },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "X", href: siteConfig.links.twitter },
  { label: "Codolio", href: siteConfig.codingProfiles.codolio },
];

// Closing contact prompt; also replaces the old Coding Profile section (Codolio link)
export default function Footer() {
  return (
    <footer
      id="contact"
      // Bottom padding keeps the fixed social bar from covering the copyright row
      className="relative z-10 px-6 sm:px-8 lg:px-12 pt-24 pb-28 border-t border-overlay/10"
    >
      <SectionHeading title="Get in touch" />

      <div className="glass rounded-md p-6 sm:p-8">
        <p className="text-base sm:text-lg mb-6">{siteConfig.availability}.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <BookCallLink className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background font-semibold hover:bg-foreground/85 transition-colors">
            <Calendar className="h-4 w-4" />
            Book a Call
          </BookCallLink>
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-md glass-subtle font-semibold hover:bg-overlay/10 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.links.email}
          </a>
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="Profiles" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {PROFILE_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
