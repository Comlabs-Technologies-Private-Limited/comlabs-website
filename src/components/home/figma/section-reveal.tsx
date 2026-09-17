"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import type { BlurRevealSegment } from "@/components/blur-reveal";

/**
 * Section entrance primitives for the homepage.
 *
 * These replace a chain: headings used to reveal word by word with a blur, and
 * the copy and cards beneath them were gated on that animation reporting
 * completion before they could start. Each section therefore took well over a
 * second to settle, and a reader scrolling at speed arrived before the content
 * did.
 *
 * Everything here animates on its own, as soon as it scrolls into view, with a
 * short fixed delay for sequencing. Only `opacity` and `transform` are
 * animated, so elements stay on the compositor, and every offset and duration
 * collapses to zero under `prefers-reduced-motion`.
 */

function isPunctuationOnly(text: string): boolean {
  return /^[.,!?;:]+$/.test(text.trim());
}

const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.4;
const LIFT = 12;

/** Start once the element is genuinely on screen, and never replay. */
const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

/** Copy follows its heading; cards follow the copy. */
export const SECTION_COPY_DELAY = 0.08;
export const SECTION_BODY_DELAY = 0.14;
export const SECTION_STAGGER = 0.06;

function useEntrance(delay: number) {
  const reduceMotion = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduceMotion ? 0 : -LIFT },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: {
      duration: reduceMotion ? 0 : DURATION,
      delay: reduceMotion ? 0 : delay,
      ease: EASE,
    },
  };
}

type RevealHeadingProps = {
  segments?: BlurRevealSegment[];
  children?: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
};

/**
 * Heading that fades and settles as one block.
 *
 * Takes the same `segments` shape the blur reveal used, so each heading keeps
 * its existing highlight colours, weights and line breaks — the only change is
 * that the words arrive together instead of one at a time.
 */
export function RevealHeading({
  segments,
  children,
  className,
  style,
  delay = 0,
  as = "h2",
  id,
}: RevealHeadingProps) {
  const entrance = useEntrance(delay);
  const Tag = motion[as];

  return (
    <Tag className={className} style={style} id={id} {...entrance}>
      {segments
        ? segments.map((segment, index) => {
            const next = segments[index + 1];
            // A punctuation-only segment sits tight against the word before it,
            // otherwise a heading renders as "production ." with a gap.
            const spaceAfter =
              !segment.breakAfter &&
              index < segments.length - 1 &&
              !(next && isPunctuationOnly(next.text));

            return (
              <span key={`${segment.text}-${index}`}>
                <span className={segment.className} style={segment.style}>
                  {segment.text}
                </span>
                {segment.breakAfter ? <br /> : spaceAfter ? " " : null}
              </span>
            );
          })
        : children}
    </Tag>
  );
}

type RevealCopyProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p";
};

export function RevealCopy({
  children,
  className,
  delay = SECTION_COPY_DELAY,
  as = "p",
}: RevealCopyProps) {
  const entrance = useEntrance(delay);
  const Tag = as === "p" ? motion.p : motion.div;

  return (
    <Tag className={className} {...entrance}>
      {children}
    </Tag>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function RevealStagger({
  children,
  className,
  delay = SECTION_BODY_DELAY,
  stagger = SECTION_STAGGER,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
            delayChildren: reduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Children of `RevealStagger`; inherits the parent's visible/hidden state. */
export const sectionItemVariants = {
  hidden: { opacity: 0, y: LIFT },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
} as const;

export function RevealStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={sectionItemVariants}>
      {children}
    </motion.div>
  );
}
