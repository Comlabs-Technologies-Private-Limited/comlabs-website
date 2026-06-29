"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 32,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 top-16 z-50 h-px origin-left bg-gradient-to-r from-rose-200/60 via-rose-warm/70 to-amber-300/50 opacity-80"
      style={{ scaleX }}
    />
  );
}
