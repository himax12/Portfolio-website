import { cn } from "@/lib/utils";

export default function SectionHeading({
  title,
  action,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("reveal mb-5 flex items-baseline justify-between gap-4", className)}>
      <h2 className="text-xl sm:text-[22px] font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}
