"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/ui/section-heading";

export default function CodingStats() {
  const platforms = [
    { name: "Codolio", url: siteConfig.codingProfiles.codolio },
  ];

  return (
    <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border">
      <div>
        <SectionHeading title="Coding Profile" />

        {/* Coding Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 max-w-xs"
        >
          {platforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-md border border-border p-6 hover:bg-accent transition-colors block"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{platform.name}</span>
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Codolio Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-md overflow-hidden border border-border bg-accent"
        >
          <div className="relative aspect-[16/9] w-full">
            <iframe
              src="https://codolio.com/profile/himax12"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              title="Codolio Profile"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
