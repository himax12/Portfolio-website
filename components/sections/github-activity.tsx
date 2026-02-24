"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-between"
        >
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            GitHub Activity
          </h2>
          <a
            href={`https://github.com/${siteConfig.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm border-b border-foreground hover:border-muted transition-colors"
          >
            View Profile
            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        {/* GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-border p-6 bg-accent"
        >
          {mounted && (
            <GitHubCalendar
              username={siteConfig.githubUsername}
              colorScheme={theme === "dark" ? "dark" : "light"}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
              hideColorLegend
              style={{ width: "100%" }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
