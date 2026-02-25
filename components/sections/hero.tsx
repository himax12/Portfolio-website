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
import SocialIconsBar from "@/components/ui/social-icons-bar";

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
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 py-24 pt-32"
    >
      <div className="bg-[#181c23] border border-[#23272f] rounded-2xl shadow-lg p-8 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Profile Image - Card Style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div
            className="rounded-xl border-4 border-background bg-[#181c23] shadow-lg p-2"
            style={{ boxShadow: "0 4px 24px 0 #0008" }}
          >
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              width={220}
              height={220}
              className="rounded-xl object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name & Title - Typography focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 space-y-2 w-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none">
            {siteConfig.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted">
            {siteConfig.title}
          </p>
        </motion.div>

        {/* Tech Stack - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-sm sm:text-base text-muted"
        >
          TypeScript / React / Node.js / Python / AI/ML
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 text-sm sm:text-base"
        >
          <span className="text-foreground font-medium">
            Open to freelance AI & full-stack projects, as well as full-time
            roles
          </span>
        </motion.div>

        {/* Resume and Book a Call - Prominent Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-4"
        >
          <a
            href={`mailto:${siteConfig.links.email}`}
            className="flex items-center gap-2 px-6 py-3 border border-foreground bg-background text-foreground hover:bg-accent transition-colors justify-center font-semibold rounded-lg shadow"
          >
            <Mail className="h-5 w-5" />
            Let's Connect
          </a>
          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 px-6 py-3 border border-foreground bg-background text-foreground hover:bg-accent transition-colors justify-center font-semibold rounded-lg shadow"
          >
            <FileText className="h-5 w-5" />
            Download Resume
          </a>
          <a
            href={siteConfig.links.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-foreground bg-background text-foreground hover:bg-accent transition-colors justify-center font-semibold rounded-lg shadow"
          >
            <Calendar className="h-5 w-5" />
            Book a Call
          </a>
        </motion.div>
        {/* Social Icons Bar - Centered */}
        <div className="flex justify-center w-full">
          <SocialIconsBar />
        </div>
      </div>
    </section>
  );
}
