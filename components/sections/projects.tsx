"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium uppercase tracking-wider text-muted"
        >
          Selected Work
        </motion.h2>

        {/* Projects List */}
        <div className="space-y-12">
          {siteConfig.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              {/* Title and Status */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                <div className="flex items-center gap-3 text-sm">
                  {project.isLive && (
                    <span className="flex items-center gap-1.5 text-xs text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Live
                    </span>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-0.5 border-b border-foreground hover:border-muted transition-colors"
                    >
                      View
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-1 text-muted hover:text-foreground transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-3xl">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-xs text-muted">
                {project.tags?.map((tag, i) => (
                  <span key={tag}>
                    {tag}
                    {i < project.tags.length - 1 && " · "}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
