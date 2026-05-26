"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

import { HeroVantaBackground } from "@/components/hero/hero-vanta-background";
import { navPrimaryCtaClass, navPrimaryCtaIconClass } from "@/lib/nav-cta";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;
const charSpring = { type: "spring" as const, stiffness: 420, damping: 30 };

const ghostCta =
  "inline-flex items-center justify-center rounded-full border border-neutral-100 px-5 py-2 text-[13px] font-normal tracking-tight text-neutral-700 shadow-sm shadow-black/20 backdrop-blur-sm transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.97]";

const HERO_SUBTITLE =
  "We have helped 12+ founders achieve clean, fast, conversion-focused digital experiences with end-to-end product design, development, and automation.";

type TitleSegment = {
  text: string;
  className?: string;
  breakBefore?: boolean;
};

type TitleChar = {
  char: string;
  className?: string;
  breakBefore?: boolean;
};

const HERO_TITLE_SEGMENTS: TitleSegment[] = [
  { text: "We build Websites that " },
  { text: "look ", breakBefore: true },
  { text: "Credible", className: "text-blue-950" },
  { text: " and " },
  { text: "Convert", className: "text-blue-950", breakBefore: true },
];

function flattenHeroTitle(): TitleChar[] {
  const chars: TitleChar[] = [];

  for (const segment of HERO_TITLE_SEGMENTS) {
    for (let index = 0; index < segment.text.length; index += 1) {
      chars.push({
        char: segment.text[index]!,
        className: segment.className,
        breakBefore: index === 0 && segment.breakBefore,
      });
    }
  }

  return chars;
}

const HERO_TITLE_CHARS = flattenHeroTitle();

const EYEBROW_DELAY_MS = 120;
const TITLE_START_DELAY_MS = 380;
const TITLE_CHAR_MS = 34;
const TITLE_SUBTITLE_GAP_MS = 320;
const SUBTITLE_BUTTONS_GAP_MS = 360;

function HeroAnimatedTitle({
  visibleCount,
  reduceMotion,
}: {
  visibleCount: number;
  reduceMotion: boolean;
}) {
  return (
    <h1 className="mt-6 max-w-[22ch] text-4xl font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg-primary)] text-wrap md:text-6xl md:tracking-[0.0em]">
      {HERO_TITLE_CHARS.map((item, index) => {
        const visible = index < visibleCount;

        return (
          <Fragment key={`${item.char}-${index}`}>
            {item.breakBefore ? <br /> : null}
            <motion.span
              className={cn(
                "inline-block",
                item.char !== "" && "-mr-[0.05em] md:-mr-[0.06em]",
                item.className,
              )}
              initial={reduceMotion ? false : { y: -10, opacity: 0 }}
              animate={visible ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : charSpring}
            >
              {item.char === " " ? "\u00A0" : item.char}
            </motion.span>
          </Fragment>
        );
      })}
    </h1>
  );
}

function useHeroIntroSequence(reduceMotion: boolean) {
  const [showEyebrow, setShowEyebrow] = useState(reduceMotion);
  const [titleVisibleCount, setTitleVisibleCount] = useState(
    reduceMotion ? HERO_TITLE_CHARS.length : 0,
  );
  const [showSubtitle, setShowSubtitle] = useState(reduceMotion);
  const [showButtons, setShowButtons] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const intervals = new Set<ReturnType<typeof setInterval>>();

    const later = (fn: () => void, ms: number) => {
      timers.add(
        setTimeout(() => {
          if (!cancelled) fn();
        }, ms),
      );
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        later(resolve, ms);
      });

    const revealTitle = () =>
      new Promise<void>((resolve) => {
        let count = 0;
        const id = setInterval(() => {
          if (cancelled) return;
          count += 1;
          setTitleVisibleCount(count);
          if (count >= HERO_TITLE_CHARS.length) {
            clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, TITLE_CHAR_MS);
        intervals.add(id);
      });

    const run = async () => {
      await wait(EYEBROW_DELAY_MS);
      setShowEyebrow(true);

      await wait(TITLE_START_DELAY_MS);
      await revealTitle();

      await wait(TITLE_SUBTITLE_GAP_MS);
      setShowSubtitle(true);

      await wait(SUBTITLE_BUTTONS_GAP_MS);
      setShowButtons(true);
    };

    later(() => {
      void run();
    }, 0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [reduceMotion]);

  return {
    showEyebrow,
    titleVisibleCount,
    showSubtitle,
    showButtons,
  };
}

export function HeroSection() {
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [100, 300], [1, 0.5]);

  const { showEyebrow, titleVisibleCount, showSubtitle, showButtons } = useHeroIntroSequence(
    reduceMotion,
  );

  return (
    <section className="relative mx-auto flex min-h-[100svh] w-full flex-col items-start justify-end overflow-hidden bg-white px-4 md:px-8">
      <HeroVantaBackground />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start justify-center py-24"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-transparent px-3 py-1"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={showEyebrow ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
        >
          <p className="text-[8px] md:text-[10px] font-normal uppercase leading-none tracking-widest text-black">
            Websites · Product UI · Automation
          </p>
        </motion.span>

        <HeroAnimatedTitle visibleCount={titleVisibleCount} reduceMotion={reduceMotion} />

        <motion.p
          className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-[var(--fg-secondary)] md:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={reduceMotion ? { duration: 0 } : charSpring}
        >
          {HERO_SUBTITLE}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={reduceMotion ? { duration: 0 } : { ...charSpring, delay: 0.04 }}
        >
          <Link href="/#contact" className={navPrimaryCtaClass}>
            <span>Get a website audit for free</span>
            <span className={navPrimaryCtaIconClass} aria-hidden>
              <ArrowRight className="size-4 -rotate-45 text-black" strokeWidth={2} />
            </span>
          </Link>
          <Link href="/#work" className={ghostCta}>
            See what we ship
          </Link>
        </motion.div>
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
