"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createElement, type CSSProperties, type JSX } from "react";

import { cn } from "@/lib/utils";

/** Spell UI default for NORMAL speed. */
export const BLUR_REVEAL_NORMAL_SPEED = 1.5;

export type BlurRevealSegment = {
  text: string;
  className?: string;
  style?: CSSProperties;
  breakAfter?: boolean;
};

export type BlurRevealProps = {
  children?: string;
  segments?: BlurRevealSegment[];
  className?: string;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  as?: keyof JSX.IntrinsicElements;
  style?: CSSProperties;
  inView?: boolean;
  once?: boolean;
  letterSpacing?: string | number;
  id?: string;
};

type WordToken = {
  word: string;
  className?: string;
  style?: CSSProperties;
  breakAfter: boolean;
  glueBefore: boolean;
};

function segmentsFromChildren(children: string): BlurRevealSegment[] {
  const lines = children.split("\n");
  return lines.map((text, index) => ({
    text,
    breakAfter: index < lines.length - 1,
  }));
}

function isPunctuationToken(word: string): boolean {
  return /^[.,!?;:]+$/.test(word);
}

function tokenize(segments: BlurRevealSegment[]): WordToken[] {
  const tokens: WordToken[] = [];
  for (const segment of segments) {
    const words = segment.text.trim().split(/\s+/).filter(Boolean);
    words.forEach((word, index) => {
      tokens.push({
        word,
        className: segment.className,
        style: segment.style,
        breakAfter: Boolean(segment.breakAfter) && index === words.length - 1,
        glueBefore: isPunctuationToken(word),
      });
    });
  }
  return tokens;
}

function plainTextFromSegments(segments: BlurRevealSegment[]): string {
  return segments.reduce((acc, segment) => {
    const text = segment.text.trim();
    if (!text) return acc;
    if (!acc) return text;
    if (isPunctuationToken(text)) return `${acc}${text}`;
    return `${acc} ${text}`;
  }, "");
}

/**
 * Spell UI Blur Reveal — character-by-character blur/fade.
 * https://spell.sh/docs/blur-reveal
 */
export function BlurReveal({
  children,
  segments,
  className,
  delay = 0,
  speedReveal = BLUR_REVEAL_NORMAL_SPEED,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = "p",
  style,
  inView = false,
  once = true,
  letterSpacing,
  id,
}: BlurRevealProps) {
  const reduceMotion = useReducedMotion();
  const resolvedSegments = segments ?? segmentsFromChildren(children ?? "");
  const tokens = tokenize(resolvedSegments);
  const accessibleText = plainTextFromSegments(resolvedSegments);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const stagger = 0.03 / speedReveal;
  const baseDuration = 0.3 / speedSegment;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: stagger,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: baseDuration,
      },
    },
    exit: { opacity: 0, filter: "blur(12px)", y: 10 },
  };

  if (reduceMotion) {
    return createElement(
      as,
      { id, className, style },
      resolvedSegments.map((segment, index) => (
        <span key={`static-${index}`}>
          <span className={segment.className} style={segment.style}>
            {segment.text}
          </span>
          {segment.breakAfter ? (
            <br />
          ) : index < resolvedSegments.length - 1 &&
            !isPunctuationToken(resolvedSegments[index + 1]?.text.trim() ?? "") ? (
            " "
          ) : null}
        </span>
      )),
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      {trigger ? (
        <MotionTag
          id={id}
          initial="hidden"
          whileInView={inView ? "visible" : undefined}
          animate={inView ? undefined : "visible"}
          exit="exit"
          variants={containerVariants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          <span className="sr-only">{accessibleText}</span>
          {tokens.map((token, wordIndex) => (
            <span key={`word-${wordIndex}`}>
              <span
                className={cn("inline-block whitespace-nowrap", token.className)}
                style={token.style}
                aria-hidden="true"
              >
                {token.word.split("").map((char, charIndex) => (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    variants={itemVariants}
                    className="inline-block"
                    style={letterSpacing ? { marginRight: letterSpacing } : undefined}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < tokens.length - 1 &&
                !token.breakAfter &&
                !tokens[wordIndex + 1]?.glueBefore ? (
                  <motion.span
                    key={`space-${wordIndex}`}
                    variants={itemVariants}
                    className="inline-block"
                  >
                    &nbsp;
                  </motion.span>
                ) : null}
              </span>
              {token.breakAfter ? <br aria-hidden="true" /> : null}
            </span>
          ))}
        </MotionTag>
      ) : null}
    </AnimatePresence>
  );
}
