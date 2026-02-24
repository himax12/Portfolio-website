"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Projects() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-sm font-medium uppercase tracking-wider text-muted"
        >
          Selected Work
        </motion.h2>

        {/* Projects List */}
        <div className="space-y-24">
          {siteConfig.projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* Project Image */}
              <div className="relative aspect-video w-full overflow-hidden border border-border mb-6 bg-accent">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {project.isLive && (
                  <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-medium bg-background border border-border px-3 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Live
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  {/* Links */}
                  <div className="flex items-center gap-4 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-1 border-b border-foreground hover:border-muted transition-colors"
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
                        className="group/link flex items-center gap-1 border-b border-foreground hover:border-muted transition-colors"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-muted leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="border border-border px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
