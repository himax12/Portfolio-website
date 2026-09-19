import Image from "next/image";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

// Same card shape as Experience, so the two read as siblings
export default function Education() {
  const { school, shortName, degree, duration, location, website, logo } = siteConfig.education;

  return (
    <section id="education" className="section">
      <SectionHeading title="Education" />

      <article className="reveal glass flex gap-4 rounded-md px-5 py-[18px]">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-overlay/15 text-[13px] font-semibold text-muted",
            logo ? "bg-white" : "bg-background glass-subtle",
          )}
        >
          {logo ? (
            <Image
              src={logo}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            shortName
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
            <h3 className="text-[16.5px] font-semibold">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {school}
              </a>
            </h3>
            <p className="whitespace-nowrap text-[13px] text-muted">{duration}</p>
          </div>
          <p className="mt-0.5 text-[14.5px] text-foreground/80">{degree}</p>
          <p className="mt-0.5 text-[13px] text-muted">{location}</p>
        </div>
      </article>
    </section>
  );
}
