"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import SocialIconsBar from "@/components/ui/social-icons-bar";
import { Mail, Calendar } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-5xl mx-auto text-left">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium uppercase tracking-wider text-muted"
        >
          About
        </motion.h2>
        <div className="mb-12">
          <SocialIconsBar />
        </div>
        {/* Description - Multi-line format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 max-w-3xl"
        >
          <p className="text-base leading-relaxed">
            <span className="font-semibold text-primary">
              6 months of experience.
            </span>{" "}
            AI & Data Science student, hands-on builder. Shipped real-world AI
            systems like ClipSync (video pipeline), Medical Scheduling Agent
            (multi-API), and Math Mentor (multi-agent RAG). Python Developer
            Intern at EspoMedia: OCR, data workflows, model accuracy. I design
            APIs, integrate models, and ship scalable systems, especially
            interested in agent workflows and production AI.
            <span className="font-medium">
              Open to freelance, contract, and full-time roles.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
