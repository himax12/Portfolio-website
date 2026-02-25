"use client";

import { motion } from "framer-motion";

export default function Blog() {
  return (
    <section
      id="blog"
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
          Blog
        </motion.h2>

        {/* Placeholder */}
        {/* Blog content will go here in the future */}
      </div>
    </section>
  );
}
