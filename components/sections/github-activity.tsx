"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function GitHubActivity() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60"
          >
            GITHUB
          </motion.h2>

          {/* Contribution Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="mb-2 text-2xl font-bold">Contribution Activity</h3>
            <a
              href={`https://github.com/${siteConfig.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-base font-medium transition-colors hover:border-foreground/60"
            >
              View Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* GitHub Calendar */}
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-2xl border border-border bg-card p-6"
          >
            {mounted && (
              <GitHubCalendar
                username={siteConfig.githubUsername}
                colorScheme={theme === "dark" ? "dark" : "light"}
                fontSize={14}
                blockSize={12}
                blockMargin={4}
                hideColorLegend={false}
                showWeekdayLabels
                style={{
                  width: "100%",
                }}
              />
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div variants={itemVariants} className="mt-8">
            <p className="text-base text-foreground/60">
              Building in public · 2026 Contributions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
