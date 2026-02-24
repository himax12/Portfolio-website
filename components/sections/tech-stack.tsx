"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function TechStack() {
  const stackSections = [
    { title: "Frontend", items: siteConfig.stack.frontend },
    { title: "Backend", items: siteConfig.stack.backend },
    { title: "Database", items: siteConfig.stack.database },
    { title: "Languages", items: siteConfig.stack.languages },
    { title: "Tools", items: siteConfig.stack.tools },
    { title: "AI", items: siteConfig.stack.ai },
  ];

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
          Stack
        </motion.h2>

        {/* Stack Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {stackSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-medium">{section.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {section.items.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
