import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Inline pill for a company named in running text: logo plus name inside a
// gradient ring in the company's brand colors, linking to its site
export default function CompanyBadge({
  company: name,
  className,
}: {
  company: string;
  className?: string;
}) {
  const company = siteConfig.experience.find((role) => role.company === name);
  // Companies without a logo stay plain text
  if (!company?.logo || !company.website || !company.brandColors) return <>{name}</>;
  const [from, to] = company.brandColors;

  return (
    <a
      href={company.website}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (opens in new tab)`}
      // Padding-box fill plus border-box gradient draws a gradient border that
      // still follows the rounded corners
      style={{
        background: `linear-gradient(rgb(var(--surface)), rgb(var(--surface))) padding-box, linear-gradient(90deg, ${from}, ${to}) border-box`,
        ["--badge-glow" as string]: `${from}66`,
      }}
      className={cn(
        // Tight padding and leading-none keep the pill inside the paragraph's line height
        "inline-flex items-center gap-1.5 ml-1 mr-px px-2.5 py-[3px] align-[-0.2em] text-[0.9em] leading-none rounded-full border border-transparent font-semibold text-foreground whitespace-nowrap transition-shadow duration-200 hover:shadow-[0_0_14px_var(--badge-glow)] focus-visible:shadow-[0_0_14px_var(--badge-glow)]",
        className,
      )}
    >
      <Image
        src={company.logo}
        alt=""
        width={12}
        height={16}
        className="h-[0.95em] w-auto self-center"
      />
      {name}
    </a>
  );
}
