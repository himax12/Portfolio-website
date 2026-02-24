"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
            EXPERIENCE & VENTURES
          </motion.h2>

          <div className="space-y-8">
            {/* Experience */}
            {siteConfig.experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-background/80"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground/80 transition-colors group-hover:bg-foreground/10">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.role}</h3>
                        <p className="text-base text-foreground/60">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-foreground/50">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="mb-3 text-sm leading-relaxed text-foreground/80">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Ventures */}
            {siteConfig.ventures.map((venture, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-sm transition-all hover:border-foreground/20 hover:bg-background/80"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-foreground/80 transition-colors group-hover:bg-foreground/10">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">
                            {venture.name}
                          </h3>
                          <a
                            href={venture.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground/50 transition-colors hover:text-foreground"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="text-base text-foreground/60">
                          {venture.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {venture.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
