"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-overlay/5"
    >
      <div>
        <SectionHeading title="Experience" />

        <div className="space-y-4">
          {/* Experience */}
          {siteConfig.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-md p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{exp.company}</h3>
                <p className="text-sm text-muted">{exp.duration}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-base font-medium mb-1">{exp.role}</p>
                <p className="text-sm text-muted mb-3">{exp.summary}</p>
                <ul className="mb-4 space-y-1.5 text-sm md:text-base text-muted leading-relaxed list-disc pl-5 marker:text-overlay/30">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
