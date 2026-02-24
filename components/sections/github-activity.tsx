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
  const [days, setDays] = useState(180);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dayOptions = [
    { label: "90 days", value: 90 },
    { label: "180 days", value: 180 },
    { label: "1 year", value: 365 },
  ];

  return (
    <section
      id="github"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center justify-between"
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

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 flex gap-2"
        >
          {dayOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setDays(option.value)}
              className={`text-xs px-3 py-1 border transition-colors ${
                days === option.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border border-border p-4 sm:p-6 bg-accent overflow-x-auto"
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
              transformData={(contributions) => {
                // Show only last X days
                const cutoffDate = new Date();
                cutoffDate.setDate(cutoffDate.getDate() - days);
                return contributions.filter(
                  (activity) => new Date(activity.date) >= cutoffDate,
                );
              }}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
