"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { experienceLabel } from "@/lib/experience";

export default function About() {
  const experience = experienceLabel(
    siteConfig.experience.map((role) => role.startDate),
  );
  return (
    <section
      id="about"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-overlay/5"
    >
      <div className="text-left">
        <SectionHeading title="About" />
        {/* Description - Multi-line format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 max-w-3xl"
        >
          <p className="text-base leading-relaxed">
            {/* Computed at render, so the server-built HTML can lag a month behind the browser */}
            <span className="font-semibold text-primary" suppressHydrationWarning>
              {experience} of experience.
            </span>{" "}
            AI & Data Science student, hands-on builder. Shipped real-world AI
            systems like ClipSync (video pipeline), Medical Scheduling Agent
            (multi-API), and Math Mentor (multi-agent RAG). Python Developer
            Intern at EspoMedia: OCR, data workflows, model accuracy. I design
            APIs, integrate models, and ship scalable systems, especially
            interested in agent workflows and production AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
