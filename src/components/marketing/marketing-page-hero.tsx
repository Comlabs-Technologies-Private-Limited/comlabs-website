"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const EASE = [0.25, 0.1, 0, 1] as const;

type MarketingPageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
};

export function MarketingPageHero({
  eyebrow,
  title,
  description,
  children,
}: MarketingPageHeroProps) {
  return (
    <section
      className="relative overflow-hidden px-6 pt-12 pb-16 md:pt-16 md:pb-20"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(247,247,244,0.86) 0%, rgba(247,247,244,0.78) 45%, rgba(247,247,244,0.92) 100%), url('/hero/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-[-12%] h-[20rem] w-[20rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,100,66,0.16) 0%, rgba(201,100,66,0.06) 40%, rgba(201,100,66,0) 72%)",
        }}
        initial={{ opacity: 0.15, scale: 0.96 }}
        animate={{ opacity: [0.15, 0.28, 0.15], scale: [0.96, 1.02, 0.96] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl">
        {children}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
          style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--warm-orange)" }}
          />
          {eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          className="mt-5 max-w-2xl text-base leading-[1.7] text-muted-foreground md:mt-6 md:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
