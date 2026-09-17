"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.25, 0.1, 0, 1] as const;

type MarketingFadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function MarketingFadeIn({
  children,
  className,
  delay = 0,
  y = 12,
}: MarketingFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
