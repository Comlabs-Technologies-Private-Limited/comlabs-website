"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { VIEWPORT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 12 },
  down: { x: 0, y: -12 },
  left: { x: 12, y: 0 },
  right: { x: -12, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  viewport?: typeof VIEWPORT;
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.45,
  viewport = VIEWPORT,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.45,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  viewport?: typeof VIEWPORT;
}

export function RevealGroup({
  children,
  className,
  stagger = 0.05,
  delayChildren = 0.08,
  viewport = VIEWPORT,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const offset = OFFSETS[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
