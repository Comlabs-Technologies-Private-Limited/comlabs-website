"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-px origin-left bg-[var(--fg-primary)]"
      style={{ scaleX: scrollYProgress, opacity }}
    />
  );
}
