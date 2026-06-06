"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

import { SplashCursor } from "@/components/hero/splash-cursor";
import { navPrimaryCtaClass, navPrimaryCtaIconClass } from "@/lib/nav-cta";
import { sectionContainer } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;
const slideEase = [0.16, 1, 0.3, 1] as const;
const SLIDE_OFFSET = 28;
const SLIDE_DURATION = 0.65;

const heroSlideItem = {
  hidden: { opacity: 0, y: SLIDE_OFFSET },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: SLIDE_DURATION, ease: slideEase },
  },
};

const heroIntro = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.44,
    },
  },
};

const ghostCta =
  "inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/60 px-5 py-2 text-[13px] font-normal tracking-tight text-neutral-700 shadow-sm shadow-black/10 backdrop-blur-sm transition-all duration-150 hover:border-neutral-300 hover:bg-white active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600/60";

const HERO_SUBTITLE =
  "We help founders turn rough ideas and underperforming websites into clean, fast, conversion-focused digital experiences.";

type TitleSegment = {
  text: string;
  className?: string;
  breakBefore?: boolean;
  backgroundImage?: string;
  backgroundPosition?: string;
};

const HERO_TITLE_TEXTURE = "/card-bg/starry-night.png";

const HERO_TITLE_SEGMENTS: TitleSegment[] = [
  { text: "We build websites that " },
  { text: "look ", breakBefore: true },
  {
    text: "credible",
    backgroundImage: HERO_TITLE_TEXTURE,
    backgroundPosition: "28% 42%",
  },
  { text: " and " },
  {
    text: "convert.",
    breakBefore: true,
    backgroundImage: HERO_TITLE_TEXTURE,
    backgroundPosition: "72% 58%",
  },
];

function HeroTitleSegment({ item }: { item: TitleSegment }) {
  return (
    <span className={cn(!item.backgroundImage && item.className)}>
      {item.breakBefore ? <br /> : null}
      {item.backgroundImage ? (
        <span
          className="bg-clip-text text-transparent saturate-200 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          style={{
            backgroundImage: `url(${item.backgroundImage})`,
            backgroundSize: "220% auto",
            backgroundPosition: item.backgroundPosition ?? "center",
          }}
        >
          {item.text}
        </span>
      ) : (
        item.text
      )}
    </span>
  );
}

function HeroTitle() {
  return (
    <h1 className="max-w-[22ch] text-4xl font-medium leading-[1.05] tracking-tighter text-[var(--fg-primary)] md:text-6xl">
      {HERO_TITLE_SEGMENTS.map((item, index) => (
        <HeroTitleSegment key={`${item.text}-${index}`} item={item} />
      ))}
    </h1>
  );
}

export function HeroSection() {
  const reduceMotion = !!useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [100, 300], [1, 0.5]);
  return (
    <section className="relative mx-auto flex min-h-[100svh] w-full flex-col items-start justify-end overflow-hidden bg-white px-4 md:px-8">
      {!reduceMotion ? <SplashCursor /> : null}
      <motion.div
        className={cn(
          sectionContainer,
          "relative z-10 flex flex-col items-start justify-end pb-20 md:pb-24",
        )}
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {reduceMotion ? (
          <>
            <HeroTitle />
            <p className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-[var(--fg-secondary)] md:text-lg">
              {HERO_SUBTITLE}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-start gap-3">
              <Link href="/#contact" className={navPrimaryCtaClass}>
                <span>Get a website audit for free</span>
                <span className={navPrimaryCtaIconClass} aria-hidden>
                  <ArrowRight className="size-4 -rotate-45 text-black" strokeWidth={2} />
                </span>
              </Link>
              <Link href="/#work" className={ghostCta}>
                See what we ship
              </Link>
            </div>
          </>
        ) : (
          <motion.div
            className="flex w-full flex-col items-start"
            initial="hidden"
            animate="show"
            variants={heroIntro}
          >
            <motion.div className="w-full" variants={heroSlideItem}>
              <HeroTitle />
            </motion.div>

            <motion.p
              className="mt-6 max-w-2xl text-sm font-normal leading-relaxed text-[var(--fg-secondary)] md:text-lg"
              variants={heroSlideItem}
            >
              {HERO_SUBTITLE}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-start gap-3"
              variants={heroSlideItem}
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
        )}
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-4 z-10 text-[var(--fg-tertiary)] md:left-8"
        initial={reduceMotion ? false : { opacity: 0, y: SLIDE_OFFSET }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { delay: 1.72, duration: SLIDE_DURATION, ease: slideEase }
        }
        aria-hidden
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { delay: 2.45, duration: 2, repeat: Infinity, ease }
          }
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
