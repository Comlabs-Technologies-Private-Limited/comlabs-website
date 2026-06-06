"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { homeFaqs } from "@/lib/faq-data";

const ease = [0.25, 0.1, 0, 1] as const;

export function FaqSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section id="faq" ref={ref} className="bg-white px-3 py-14 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]">
            FAQ
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]">
            Straight answers.
          </h2>
          <p className="mt-3 text-[0.875rem] font-normal leading-relaxed text-[var(--fg-secondary)] md:mt-4 md:text-[0.9375rem]">
            Common questions before we work together.
          </p>
        </SectionHeader>

        <div className="mt-10 space-y-3 md:mt-12">
          {homeFaqs.map((item, index) => (
            <motion.details
              key={item.question}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                delay: reduceMotion ? 0 : 0.04 + index * 0.04,
                duration: 0.45,
                ease,
              }}
              className="group rounded-sm border border-zinc-200 bg-white px-5 py-4 open:border-zinc-300 open:bg-zinc-50/60 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-[15px] font-medium text-[var(--fg-primary)]">
                <span>{item.question}</span>
                <span
                  className="mt-0.5 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden
                >
                  ↓
                </span>
              </summary>
              <p className="mt-3 pr-4 text-[13px] font-normal leading-relaxed text-[var(--fg-secondary)]">
                {item.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
