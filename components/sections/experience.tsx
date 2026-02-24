"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Experience() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium uppercase tracking-wider text-muted"
        >
          Experience & Ventures
        </motion.h2>

        <div className="space-y-12">
          {/* Experience */}
          {siteConfig.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-3 gap-6 pb-12 border-b border-border"
            >
              <div>
                <h3 className="text-xl font-bold mb-1">{exp.company}</h3>
                <p className="text-sm text-muted">{exp.duration}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-lg mb-3">{exp.role}</p>
                <p className="text-muted leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="border border-border px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Ventures */}
          {siteConfig.ventures.map((venture, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (siteConfig.experience.length + index) * 0.1,
              }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">{venture.name}</h3>
                  <a
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted">{venture.role}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted leading-relaxed">
                  {venture.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
