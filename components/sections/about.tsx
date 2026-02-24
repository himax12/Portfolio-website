"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function About() {
  return (
    <section className="px-6 sm:px-8 lg:px-12 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-sm font-medium uppercase tracking-wider text-muted"
        >
          About
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg sm:text-xl leading-relaxed max-w-3xl"
        >
          {siteConfig.description}
        </motion.p>
      </div>
    </section>
  );
}
        </motion.div>
      </div>
    </section>
  );
}
