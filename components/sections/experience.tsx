"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div>
        <SectionHeading title="Experience & Ventures" />

        <div className="space-y-12">
          {/* Experience */}
          {siteConfig.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 pb-12 border-b border-border"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{exp.company}</h3>
                <p className="text-sm text-muted">{exp.duration}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-base font-medium mb-3">{exp.role}</p>
                <p className="text-sm md:text-base text-muted leading-relaxed mb-4 whitespace-pre-line">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{venture.name}</h3>
                  <a
                    href={venture.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${venture.name}`}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm text-muted">{venture.role}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm md:text-base text-muted leading-relaxed">
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
