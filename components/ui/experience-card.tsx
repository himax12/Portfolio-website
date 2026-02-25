import React from "react";

interface ExperienceCardProps {
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  tags?: string[];
}

export default function ExperienceCard({
  title,
  subtitle,
  date,
  description,
  tags = [],
}: ExperienceCardProps) {
  return (
    <div className="bg-[#181c23] border border-[#23272f] rounded-xl shadow-lg p-6 mx-auto max-w-xl text-center mb-8">
      <div className="mb-2 text-2xl font-bold text-foreground">{title}</div>
      {subtitle && (
        <div className="mb-2 text-lg text-muted font-medium">{subtitle}</div>
      )}
      <div className="mb-4 text-sm text-muted">{date}</div>
      <div className="mb-4 text-base text-foreground leading-relaxed">
        {description}
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-accent text-sm rounded-lg text-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
