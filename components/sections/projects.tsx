"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HoverCard } from "@/components/ui/hover-card";

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Title */}
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-xs font-semibold uppercase tracking-wider text-foreground/60"
          >
            PROJECTS
          </motion.h2>

          {/* Projects Grid */}
          <div className="grid gap-8 sm:grid-cols-2">
            {siteConfig.projects.map((project) => (
              <motion.div key={project.title} variants={itemVariants}>
                <HoverCard containerClassName="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card">
                    {/* Project Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-foreground/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {project.isLive && (
                        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-green-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                          </span>
                          Live
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-bold">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-foreground/60">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-background px-3 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/60"
                          >
                            View Project
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/60"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </HoverCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
