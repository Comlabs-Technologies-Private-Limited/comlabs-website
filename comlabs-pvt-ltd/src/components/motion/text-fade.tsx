"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import * as React from "react";

const spring = { type: "spring" as const, stiffness: 380, damping: 32 };

type TextFadeProps = {
  direction?: "up" | "down";
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  /** `inview`: reveal when section enters viewport. `scroll`: opacity/y scrub with scroll progress. */
  mode?: "inview" | "scroll";
  viewport?: {
    once?: boolean;
    amount?: number | "some" | "all";
  };
};

export function TextFade({
  direction = "up",
  children,
  className = "",
  staggerChildren = 0.1,
  mode = "scroll",
  viewport,
}: TextFadeProps) {
  const reduce = useReducedMotion();
  const fadeVariants = {
    show: { opacity: 1, y: 0, transition: spring },
    hidden: { opacity: 0, y: direction === "down" ? -18 : 18 },
  };

  const childList = React.Children.toArray(children).filter((c) => c != null);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  if (mode === "scroll") {
    return <ScrollStagger className={className}>{childList}</ScrollStagger>;
  }

  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: viewport?.once ?? true,
    amount: viewport?.amount ?? 0.35,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {childList.map((child, i) =>
        React.isValidElement(child) ? (
          <motion.div key={i} variants={fadeVariants}>
            {child}
          </motion.div>
        ) : (
          <motion.div key={i} variants={fadeVariants}>
            <span className="contents">{child}</span>
          </motion.div>
        ),
      )}
    </motion.div>
  );
}

function ScrollStagger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.88", "start 0.36"],
  });

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <ScrollLine key={i} index={i} progress={scrollYProgress}>
          {child}
        </ScrollLine>
      ))}
    </div>
  );
}

function ScrollLine({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const start = index * 0.075;
  const span = 0.42;
  const end = Math.min(start + span, 1);
  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [22, 0], { clamp: true });

  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}
