"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";
import Tag from "@/components/ui/tag";

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
      <div>
        <SectionHeading title="Stack" />

        {/* Stack Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
