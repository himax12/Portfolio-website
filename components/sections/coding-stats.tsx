"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Code2, Trophy } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function CodingStats() {
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

  const stats = [
    {
      icon: Code2,
      label: "Problems Solved",
      value: "600+",
      description: "Across LeetCode, Codeforces & GFG",
    },
    {
      icon: Trophy,
      label: "Codolio Profile",
      value: "Active",
      description: "Competitive Programming Tracker",
    },
    {
      icon: Award,
      label: "Adobe GenSolve",
      value: "Top 6",
      description: "National Finalist from 1.3L+ registrations",
    },
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
            className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60"
          >
            CODING STATS
          </motion.h2>

          {/* Coding Profile Stats */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="mb-2 text-2xl font-bold">Competitive Programming</h3>
            <a
              href="https://codolio.com/profile/himax12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-base font-medium transition-colors hover:border-foreground/60"
            >
              View Codolio Profile
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-card/80"
              >
                <div className="mb-4 inline-flex rounded-lg bg-foreground/5 p-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="mb-2 text-3xl font-bold">{stat.value}</div>
                <div className="mb-1 text-sm font-semibold">{stat.label}</div>
                <div className="text-sm text-foreground/60">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Codolio Embed */}
          <motion.div
            variants={itemVariants}
            className="mt-8 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative aspect-[16/9] w-full">
              <iframe
                src="https://codolio.com/profile/himax12"
                className="h-full w-full"
                title="Codolio Profile"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Platform Links */}
          <motion.div variants={itemVariants} className="mt-8">
            <p className="mb-4 text-base font-semibold">Find me on:</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://codolio.com/profile/himax12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/80"
              >
                Codolio
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://leetcode.com/himax12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/80"
              >
                LeetCode
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://codeforces.com/profile/himax12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/80"
              >
                Codeforces
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://auth.geeksforgeeks.org/user/himax12"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-card/80"
              >
                GeeksforGeeks
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
