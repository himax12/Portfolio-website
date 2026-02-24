"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-sm font-medium uppercase tracking-wider text-muted"
        >
          About
        </motion.h2>

        {/* Description - Multi-line format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 max-w-3xl"
        >
          <p className="text-base leading-relaxed">
            B.Tech AI & Data Science student at MAIT, Delhi. Hands-on builder
            focused on turning AI ideas into real production systems.
          </p>

          <p className="text-base leading-relaxed">
            Built <span className="font-medium">ClipSync</span> (AI video
            pipeline with Gemini VLM and FFmpeg),{" "}
            <span className="font-medium">AI Medical Scheduling Agent</span>{" "}
            (multi-API conversational workflows), and{" "}
            <span className="font-medium">Math Mentor</span> (multi-agent
            reasoning with RAG memory).
          </p>

          <p className="text-base leading-relaxed">
            Currently Python Developer Intern at{" "}
            <span className="font-medium">EspoMedia</span>, building OCR
            pipelines with OpenCV, EasyOCR, and PyTorch, automating data
            workflows, and improving model accuracy in production.
          </p>

          <p className="text-base leading-relaxed">
            I enjoy owning problems end-to-end—designing APIs, integrating
            models, debugging edge cases, and shipping systems that people
            actually use. Especially interested in AI that meets real products
            through agent workflows, data pipelines, and scalable backend
            systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
