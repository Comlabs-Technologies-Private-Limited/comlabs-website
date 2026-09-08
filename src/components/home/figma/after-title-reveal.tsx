"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.25, 0.1, 0, 1] as const;

/** Description starts immediately after the title finishes. */
export const AFTER_TITLE_COPY_DELAY = 0;
/** Cards / body start once the description has begun to appear. */
export const AFTER_TITLE_BODY_DELAY = 0.35;
export const AFTER_TITLE_STAGGER = 0.1;

export function useAfterTitleReveal(): {
  revealed: boolean;
  onTitleComplete: () => void;
} {
  const reduceMotion = useReducedMotion();
  const [titleDone, setTitleDone] = useState(false);
  const onTitleComplete = useCallback(() => {
    setTitleDone(true);
  }, []);

  return { revealed: Boolean(reduceMotion) || titleDone, onTitleComplete };
}

type RevealCopyProps = {
  revealed: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p";
};

export function RevealCopy({
  revealed,
  children,
  className,
  delay = AFTER_TITLE_COPY_DELAY,
  as = "p",
}: RevealCopyProps) {
  const Tag = as === "p" ? motion.p : motion.div;

  return (
    <Tag
      className={className}
      initial={false}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: revealed ? delay : 0, ease: EASE }}
      style={{ pointerEvents: revealed ? "auto" : "none" }}
    >
      {children}
    </Tag>
  );
}

type RevealStaggerProps = {
  revealed: boolean;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function RevealStagger({
  revealed,
  children,
  className,
  delay = AFTER_TITLE_BODY_DELAY,
  stagger = AFTER_TITLE_STAGGER,
}: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      style={{ pointerEvents: revealed ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealStaggerItem({ children, className }: RevealStaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const afterTitleItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
} as const;
