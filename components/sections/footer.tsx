import Link from "next/link";
import { ArrowUpRight, Calendar, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import { BookCallLink } from "@/components/ui/profile-hover-cards";

// Closing contact prompt. Profile links live in the dock, so the bottom row only
// carries what the dock doesn't: the blog and the Codolio coding profile.
export default function Footer() {
  return (
    // Bottom padding keeps the fixed dock from covering the copyright row
    <footer id="contact" className="section relative z-10 pb-28">
      <SectionHeading title="Get in touch" />

      <div className="glass flex flex-col gap-4 rounded-md p-5 sm:flex-row sm:items-center sm:justify-between sm:p-[22px]">
        <p className="text-[15px] text-foreground/85">Building something with AI? Let&apos;s talk.</p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <BookCallLink className="flex items-center justify-center gap-2 rounded-md bg-foreground px-[18px] py-2.5 text-[14.5px] font-semibold text-background transition-colors hover:bg-foreground/85">
            <Calendar className="h-4 w-4" />
            Book a Call
          </BookCallLink>
          <a
            href={`mailto:${siteConfig.links.email}`}
            title={siteConfig.links.email}
            className="flex items-center justify-center gap-2 rounded-md glass-subtle px-[18px] py-2.5 text-[14.5px] font-semibold transition-colors hover:bg-overlay/10"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-[13px] text-muted">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="More" className="flex items-center gap-1.5">
          <Link href="/blogs" className="hover:text-foreground transition-colors">
            Blogs
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href={siteConfig.codingProfiles.codolio}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0.5 hover:text-foreground transition-colors"
          >
            Codolio
            <ArrowUpRight className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
