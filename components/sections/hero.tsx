"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Twitter, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { TextReveal } from "@/components/ui/text-reveal";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const socialButtons = [
    { icon: FileText, label: "Resume", href: siteConfig.links.resume },
    { icon: Mail, label: "Email", href: `mailto:${siteConfig.links.email}` },
    { icon: Twitter, label: "Twitter", href: siteConfig.links.twitter },
    { icon: Github, label: "GitHub", href: siteConfig.links.github },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-40 w-40 sm:h-52 sm:w-52"
          >
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-cyan-500 to-purple-500 opacity-75 blur-xl" />
            <Image
              src={siteConfig.profileImage}
              alt={siteConfig.name}
              width={208}
              height={208}
              className="relative z-10 h-full w-full rounded-[2.5rem] object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-xl sm:text-2xl text-foreground/60"
        >
          {siteConfig.title}
        </motion.p>

        {/* Tech Stack Tags */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-foreground/60"
        >
          <span>TypeScript</span>
          <span>·</span>
          <span>React</span>
          <span>·</span>
          <span>Node.js</span>
          <span>·</span>
          <span>Solana</span>
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {socialButtons.map((button) => (
            <motion.a
              key={button.label}
              href={button.href}
              target={button.href.startsWith("http") ? "_blank" : undefined}
              rel={
                button.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-card/80"
            >
              <button.icon className="h-4 w-4" />
              {button.label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
