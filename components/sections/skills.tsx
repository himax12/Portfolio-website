import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import TechIcon from "@/components/ui/tech-icon";

// One chip cloud with brand logos; stack groups overlap (e.g. Python), so names are deduplicated
export default function Skills() {
  const skills = Array.from(new Set(Object.values(siteConfig.stack).flat()));

  return (
    <section id="skills" className="section">
      <SectionHeading title="Skills" />
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-overlay/20 bg-overlay/[0.03] px-2.5 py-1 text-[13.5px] font-semibold text-foreground"
          >
            <TechIcon name={skill} />
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
