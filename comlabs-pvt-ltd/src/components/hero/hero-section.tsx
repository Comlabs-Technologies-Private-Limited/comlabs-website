"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { TextFade } from "@/components/motion/text-fade";
import { HeroVantaBackground } from "@/components/hero/hero-vanta-background";

const ease = [0.25, 0.1, 0, 1] as const;

const primaryCta =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 px-5 py-2 text-[13px] font-normal tracking-tight text-white shadow-[0px_3.5px_1px_0px_var(--color-neutral-700)_inset,0px_1px_4px_0px_var(--color-neutral-900)] transition-all duration-150 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)] hover:from-neutral-700 hover:to-neutral-900 hover:shadow-[0px_3.5px_3px_0px_var(--color-neutral-600)_inset,0px_1px_6px_0px_var(--color-neutral-900)] active:scale-[0.97]";

const ghostCta =
  "inline-flex items-center justify-center rounded-full border border-neutral-100 px-5 py-2 text-[13px] font-normal tracking-tight text-neutral-700 shadow-sm shadow-black/20 backdrop-blur-sm transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.97]";

export function HeroSection() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [100, 300], [1, 0.5]);

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col mx-auto items-start justify-end overflow-hidden bg-white px-4 md:px-8">
      <HeroVantaBackground />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start justify-center py-24"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <TextFade mode="inview" staggerChildren={0.11} viewport={{ amount: 0.5 }}>
          <span className="inline-flex border border-neutral-200 py-2 items-center gap-2 bg-transparent rounded-full px-3 py-1">
          <p className="text-[8px] font-normal uppercase leading-none tracking-widest text-black">
            Websites · Product UI · Automation
          </p>
          </span>
          
          <h1 className=" mt-6 max-w-[22ch] text-4xl md:text-7xl font-medium leading-[1.05] tracking-tighter text-[var(--fg-primary)] text-wrap">
            We build Websites that look {" "} Credible and Convert.
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-md font-normal leading-relaxed text-[var(--fg-secondary)]">
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
{/* 
      <motion.div
        drag
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
        whileDrag={{ scale: 1.05, cursor: "grabbing" }}
        whileHover={{ scale: 1.02 }}
        className="absolute bottom-24 right-4 z-20 cursor-grab rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-[11px] font-normal text-[var(--fg-secondary)] shadow-sm shadow-black/[0.04] md:bottom-32 md:right-8"
      >
        <span className=" items-center gap-2">
          <motion.span
            className="h-1 w-1 rounded-full bg-green-500"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Available for selected projects
        </span>
      </motion.div> */}

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
