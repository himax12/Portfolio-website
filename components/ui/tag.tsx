import TechIcon from "@/components/ui/tech-icon";

// Technology chip, styled like the Skills cloud; shows the brand logo when there is one
export default function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-overlay/20 bg-overlay/[0.03] px-2 py-0.5 text-xs font-semibold text-foreground">
      <TechIcon name={children} className="h-3 w-3" />
      {children}
    </span>
  );
}
