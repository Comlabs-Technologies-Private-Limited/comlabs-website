"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { TextFade } from "@/components/motion/text-fade";

const ease = [0.25, 0.1, 0, 1] as const;

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-5 py-2 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97] dark:from-neutral-700 dark:to-neutral-900";

const ghostCta =
  "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/60 px-5 py-2 text-[13px] font-normal tracking-tight text-neutral-700 shadow-sm shadow-black/20 backdrop-blur-sm transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.97] dark:border-neutral-800 dark:bg-white/5 dark:text-neutral-300 dark:shadow-black/20 dark:hover:border-neutral-700 dark:hover:bg-white/10";

export function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-4 md:px-8">
      <div className="hero-rain pointer-events-none" aria-hidden />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center py-24 text-center"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <TextFade mode="inview" staggerChildren={0.11} viewport={{ amount: 0.5 }}>
          <p className="border-l border-[var(--border-strong)] pl-3 text-[12px] font-normal uppercase leading-none tracking-widest text-[var(--fg-tertiary)]">
            Websites · Product UI · Automation
          </p>
          <h1 className="mx-auto mt-6 max-w-[22ch] text-[clamp(2.25rem,6vw,3.75rem)] font-medium leading-[1.05] tracking-tighter text-[var(--fg-primary)] text-wrap">
            We build Startup Websites that look Credible and Convert.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-md font-normal leading-relaxed text-[var(--fg-secondary)]">
            Comlabs has helped 12+ founders achieve clean, fast, conversion-focused digital experiences with end-to-end product design, development, and automation.
       
          </p>
        </TextFade>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/#contact" className={primaryCta}>
            Book a strategy call
          </Link>
          <Link href="/case-studies" className={ghostCta}>
            See what we ship
          </Link>
        </div>
      </motion.div>

      <motion.div
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        whileHover={{ scale: 1.02 }}
        className="absolute bottom-24 right-4 z-20 cursor-grab rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-[11px] font-normal text-[var(--fg-secondary)] shadow-sm shadow-black/[0.04] md:bottom-32 md:right-8"
      >
        <span className="inline-flex items-center gap-2">
          <motion.span
            className="h-1 w-1 rounded-full bg-green-500"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Available for selected projects
        </span>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--fg-tertiary)]"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease }}
        aria-hidden
      >
        ↓
      </motion.div>
    </section>
  );
}
