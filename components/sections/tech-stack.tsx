"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const stackSections = [
    { title: "Frontend", items: siteConfig.stack.frontend },
    { title: "Backend", items: siteConfig.stack.backend },
    { title: "Database", items: siteConfig.stack.database },
    { title: "Languages", items: siteConfig.stack.languages },
    { title: "Tools", items: siteConfig.stack.tools },
    { title: "Web3", items: siteConfig.stack.web3 },
  ];

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
            STACK
          </motion.h2>

          {/* Stack Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stackSections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span key={item} className="text-base text-foreground/60">
                      {item}
                      {section.items.indexOf(item) < section.items.length - 1 &&
                        " · "}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
