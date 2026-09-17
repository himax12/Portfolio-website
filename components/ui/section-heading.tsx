"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={cn("mb-5 flex items-baseline justify-between gap-4", className)}
    >
      <h2 className="text-xl sm:text-[22px] font-bold tracking-tight">{title}</h2>
      {action}
    </motion.div>
  );
}
