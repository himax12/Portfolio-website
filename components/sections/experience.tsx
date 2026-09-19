import Image from "next/image";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeading title="Experience" />

      <div className="grid gap-3">
        {siteConfig.experience.map((exp) => (
          <article key={exp.company} className="reveal glass rounded-md px-5 py-[18px]">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <h3 className="flex items-center gap-2 text-[16.5px] font-semibold">
                {exp.logo && (
                  <Image src={exp.logo} alt="" width={12} height={16} className="h-4 w-auto" />
                )}
                {exp.company}
              </h3>
              <p className="whitespace-nowrap text-[13px] text-muted">{exp.duration}</p>
            </div>
            <p className="mt-0.5 text-[14.5px] text-foreground/80">{exp.role}</p>
            {exp.highlights && (
              <ul className="mt-2.5 ml-[18px] list-disc space-y-0.5 text-sm leading-relaxed text-muted marker:text-overlay/30">
                {exp.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
