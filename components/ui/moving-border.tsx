"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-[1px]",
        containerClassName,
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, #18CCFC, #6344F5, transparent)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className={cn("relative z-10 rounded-2xl bg-background", className)}>
        {children}
      </div>
    </div>
  );
};
