import Image from "next/image";
import { Calendar, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import CompanyBadge from "@/components/ui/company-badge";
import { BookCallLink } from "@/components/ui/profile-hover-cards";
import ResumeLink from "@/components/ui/resume-hover-card";
import TechIcon from "@/components/ui/tech-icon";

// Logos in the "Proficient with" chip
const HEADLINE_STACK = ["Next.js", "TypeScript", "FastAPI", "Python"];

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-grid h-6 min-w-6 place-items-center rounded-[5px] border border-overlay/20 bg-overlay/10 px-1.5 align-[0.05em] text-sm font-bold text-foreground">
      {children}
    </span>
  );
}

// Compact header: identity, a few scannable proof points, and the main actions.
// No entrance animations, so this is all visible in the server HTML before JS loads.
export default function Hero({ mergedPullRequests }: { mergedPullRequests: number | null }) {
  const currentRole = siteConfig.experience.find((role) => !role.endDate);

  return (
    <section id="home" className="px-6 sm:px-10 pt-12 sm:pt-14 pb-10">
      <div className="flex items-center gap-4 sm:gap-5">
        <Image
          src={siteConfig.profileImage}
          alt={siteConfig.name}
          width={84}
          height={84}
          priority
          className="h-[68px] w-[68px] sm:h-[84px] sm:w-[84px] shrink-0 rounded-md border border-overlay/15 bg-overlay/5 p-[3px] object-cover"
        />
        <div className="min-w-0">
          <h1 className="text-[26px] sm:text-[34px] font-bold tracking-tight leading-[1.05]">
            {siteConfig.name}
          </h1>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[13.5px] sm:text-[15px] text-muted">
            {siteConfig.title}
            <span aria-hidden="true" className="h-[3px] w-[3px] rounded-full bg-overlay/30" />
            {siteConfig.location}
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-2.5 text-[15px] sm:text-[16.5px] leading-[1.9] text-foreground/85">
        {currentRole && (
          <li className="relative pl-5 before:absolute before:left-0.5 before:text-overlay/40 before:content-['•']">
            {currentRole.role} at <CompanyBadge company={currentRole.company} /> sparking up the
            creator economy.
          </li>
        )}
        <li className="relative pl-5 before:absolute before:left-0.5 before:text-overlay/40 before:content-['•']">
          Shipped <Count>{siteConfig.projects.length}</Count>{" "}
          <b className="font-semibold text-foreground">production</b> systems: AI agents, RAG, video
          pipelines and backends.
        </li>
        {mergedPullRequests ? (
          <li className="relative pl-5 before:absolute before:left-0.5 before:text-overlay/40 before:content-['•']">
            {/* The API call fetches at most 10, so a full page means "at least" */}
            <Count>{mergedPullRequests >= 10 ? "10+" : mergedPullRequests}</Count> pull requests
            merged into <b className="font-semibold text-foreground">open source</b> projects.
          </li>
        ) : null}
        <li className="relative pl-5 before:absolute before:left-0.5 before:text-overlay/40 before:content-['•']">
          Proficient with{" "}
          <span
            className="inline-flex gap-1.5 rounded-md border border-overlay/15 bg-overlay/5 px-2 py-1 align-[-0.3em]"
            title={HEADLINE_STACK.join(", ")}
          >
            {HEADLINE_STACK.map((name) => (
              <TechIcon key={name} name={name} />
            ))}
            <span className="sr-only">{HEADLINE_STACK.join(", ")}</span>
          </span>{" "}
          stack.
        </li>
      </ul>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <BookCallLink className="inline-flex items-center gap-2 rounded-md bg-foreground px-[18px] py-2.5 text-[14.5px] font-semibold text-background transition-colors hover:bg-foreground/85">
          <Calendar className="h-4 w-4" />
          Book a Call
        </BookCallLink>
        <ResumeLink className="inline-flex items-center gap-2 rounded-md glass-subtle px-[18px] py-2.5 text-[14.5px] font-semibold text-foreground transition-colors hover:bg-overlay/10">
          <FileText className="h-4 w-4" />
          Resume
        </ResumeLink>
      </div>
    </section>
  );
}
