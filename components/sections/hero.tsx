"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Mail,
  FileText,
  ArrowUpRight,
  Calendar,
  Linkedin,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import VisitorCounter from "@/components/visitor-counter";

export default function Hero() {
  const socialButtons = [
    { icon: Mail, label: "Email", href: `mailto:${siteConfig.links.email}` },
    { icon: Github, label: "GitHub", href: siteConfig.links.github },
    { icon: Twitter, label: "X", href: siteConfig.links.twitter },
    { icon: Linkedin, label: "LinkedIn", href: siteConfig.links.linkedin },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 py-24 pt-32"
    >
      {/* Visitor Counter - Top Right */}
      <div className="absolute top-20 right-4 sm:top-24 sm:right-6">
        <VisitorCounter />
      </div>

      <div className="max-w-5xl w-full mx-auto">
        {/* Profile Image - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Image
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            width={120}
            height={120}
            className="rounded-full border-2 border-border"
            priority
          />
        </motion.div>

        {/* Name & Title - Typography focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none">
            {siteConfig.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl">
            {siteConfig.title}
          </p>
        </motion.div>

        {/* Tech Stack - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-sm sm:text-base text-muted max-w-2xl"
        >
          TypeScript / React / Node.js / Python / AI/ML
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12 text-sm sm:text-base max-w-2xl"
        >
          <span className="text-foreground font-medium">
            Open to freelance AI & full-stack projects, as well as full-time
            roles
          </span>
        </motion.div>

        {/* Social Links - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 text-sm"
        >
          {socialButtons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : undefined}
              rel={
                button.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group flex items-center gap-2 border-b border-foreground pb-1 hover:border-muted transition-colors"
            >
              <button.icon className="h-4 w-4" />
              {button.label}
              {button.href.startsWith("http") && (
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </a>
          ))}
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 -ml-4 -my-2 border border-foreground hover:bg-accent transition-colors"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <a
            href={siteConfig.links.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 -my-2 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
