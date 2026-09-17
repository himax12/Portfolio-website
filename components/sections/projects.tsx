"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";
import { cn } from "@/lib/utils";

// First project gets the full width; the rest sit two to a row
export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading title="Projects" />

      <div className="grid gap-3 sm:grid-cols-2">
        {siteConfig.projects.map((project, index) => {
          // A live link that's just the repo would duplicate the GitHub icon
          const liveUrl = project.liveUrl !== project.githubUrl ? project.liveUrl : "";
          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn("glass flex flex-col rounded-md p-[18px]", index === 0 && "sm:col-span-2")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold">{project.title}</h3>
                  {project.context && <p className="mt-0.5 text-xs text-muted">{project.context}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2.5 pt-0.5 text-[13px]">
                  {project.isLive && liveUrl && (
                    <span className="flex items-center gap-1.5 text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Live
                    </span>
                  )}
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-0.5 text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {new URL(liveUrl).hostname.replace(/^www\./, "")}
                      <ArrowUpRight className="h-3 w-3 opacity-50 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code on GitHub`}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
