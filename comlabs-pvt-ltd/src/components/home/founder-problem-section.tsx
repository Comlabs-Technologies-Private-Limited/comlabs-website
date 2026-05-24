"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const ease = [0.25, 0.1, 0, 1] as const;

const HEADER_VIEWPORT = { once: true, amount: 0.28 } as const;
const GRID_VIEWPORT = { once: true, amount: 0.2 } as const;

const cards = [
  {
    title: "Outdated design kills trust",
    body: "Even strong products lose credibility when the experience feels dated, unclear, or visually inconsistent.",
    background: "/card-bg/why-2-bg.png",
    image: "/card-bg/why-1.png",
    alt: "Apexian landing page with trust gap alert",
  },
  {
    title: "Generic pages do not convert",
    body: "Most websites explain features. Great ones create confidence, momentum, and action.",
    background: "/card-bg/why-3-bg.png",
    image: "/card-bg/why-2.png",
    alt: "Pricing page with three tiers and trusted-by logos",
  },
  {
    title: "Slow follow-up loses warm leads",
    body: "If lead capture and follow-up are manual, interest fades before the conversation even starts.",
    background: "/card-bg/why-2-bg.png",
    image: "/card-bg/why-3.png",
    alt: "Leads dashboard with overdue follow-ups and lead cooling alert",
  },
] as const;

function stepTransition(delay: number, reduceMotion: boolean) {
  return {
    duration: reduceMotion ? 0 : 0.44,
    delay: reduceMotion ? 0 : delay,
    ease,
  };
}

const cardReveal = (reduceMotion: boolean) => ({
  hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduceMotion ? 0 : 0.44, ease },
  },
});

function FounderProblemCard({
  title,
  body,
  background,
  image,
  alt,
  reduceMotion,
}: (typeof cards)[number] & { reduceMotion: boolean }) {
  return (
    <motion.article
      variants={cardReveal(reduceMotion)}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-none md:p-4"
    >
      <div className="relative aspect-[6/4] overflow-hidden rounded-lg p-2.5 md:p-3">
        <Image
          src={background}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center mask-t-from-95% mask-b-from-95%"
          aria-hidden
        />
        <div className="absolute top-8 right-0 aspect-[6/4] w-full rounded-lg px-4 py-2 md:px-5 mask-t-from-95% mask-b-from-60%">
          <Image
            src={image}
            alt={alt}
            width={500}
            height={500}
            className="rounded-lg object-contain object-center"
          />
        </div>
      </div>

      <h3 className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-zinc-900 md:mt-5 md:text-base">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-500 md:text-[14px]">
        {body}
      </p>
    </motion.article>
  );
}

export function FounderProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();
  const headerInView = useInView(sectionRef, HEADER_VIEWPORT);
  const gridInView = useInView(gridRef, GRID_VIEWPORT);
  const headerVisible = reduceMotion || headerInView;
  const gridVisible = reduceMotion || gridInView;

  const hidden = reduceMotion ? false : { opacity: 0, y: 14 };
  const shown = { opacity: 1, y: 0 };

  const gridStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  };

  return (
    <section ref={sectionRef} className="bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0, reduceMotion)}
        >
          Why it matters
        </motion.p>

        <motion.h2
          className="mt-3 max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.375rem)] font-medium leading-[1.12] tracking-tighter text-[var(--fg-primary)]"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0.1, reduceMotion)}
        >
          A Weak website Quietly loses Trust, Leads, and Momentum.
        </motion.h2>

        <motion.p
          className="mt-4 max-w-[42rem] text-[0.9375rem] font-normal leading-relaxed text-[var(--fg-secondary)]"
          initial={hidden}
          animate={headerVisible ? shown : hidden}
          transition={stepTransition(0.2, reduceMotion)}
        >
          Your product may be strong, but if the message is unclear, the page feels generic, or
          follow-up is slow, serious buyers hesitate. We fix the full path from first impression
          to action.
        </motion.p>

        <motion.div
          ref={gridRef}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          initial="hidden"
          animate={gridVisible ? "show" : "hidden"}
          variants={gridStagger}
        >
          {cards.map((card) => (
            <FounderProblemCard key={card.title} {...card} reduceMotion={reduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
