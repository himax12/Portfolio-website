"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TextReveal } from "@/components/ui/text-reveal";

export default function About() {
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

  const socialLinks = [
    { icon: Github, label: "GitHub", href: siteConfig.aboutLinks.github },
    { icon: Twitter, label: "Twitter", href: siteConfig.aboutLinks.twitter },
    { icon: Mail, label: "Email", href: siteConfig.aboutLinks.email },
  ];

  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
            ABOUT
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg sm:text-xl leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center border-b-2 border-foreground pb-1 text-base font-medium transition-colors hover:border-foreground/60"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
