"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";

const ease = [0.25, 0.1, 0, 1] as const;

const pillars = [
  {
    number: "01",
    title: "Direct founder access",
    body: "You work directly with the builder, not an account manager or rotating delivery team.",
  },
  {
    number: "02",
    title: "Design and development together",
    body: "Every decision is made with implementation, performance, responsiveness, and conversion in mind.",
  },
  {
    number: "03",
    title: "Fast, focused delivery",
    body: "Clear scope, tight feedback loops, and visible progress from strategy to launch.",
  },
  {
    number: "04",
    title: "Built to evolve",
    body: "Your website can grow into product pages, dashboards, automations, and internal tools over time.",
  },
] as const;

export function WhyComlabsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section ref={ref} className="bg-white px-3 py-14 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]">
            Why Comlabs
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]">
            Senior execution without agency overhead.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)] md:mt-4 md:text-[0.9375rem]">
            You work directly with the person designing, building, and shipping the work. No
            handoffs. No bloated team. No slow communication.
          </p>
        </SectionHeader>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 md:gap-4">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.number}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                delay: reduceMotion ? 0 : 0.05 + index * 0.06,
                duration: 0.5,
                ease,
              }}
              className="flex flex-col rounded-sm border border-zinc-200 bg-white p-5 transition-colors duration-150 hover:border-zinc-300 hover:bg-zinc-50/80 md:p-6"
            >
              <p className="text-[10px] font-medium tabular-nums tracking-[0.14em] text-zinc-400">
                {pillar.number}
              </p>
              <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-tight text-[var(--fg-primary)] md:text-base">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)]">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
