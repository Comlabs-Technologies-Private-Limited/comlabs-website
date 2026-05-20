"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { TextFade } from "@/components/motion/text-fade";
import { bodyText, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const steps = [
  {
    n: "01",
    title: "Diagnose",
    duration: "3–5 days",
    body: "We review your current website, positioning, product, competitors, and conversion gaps.",
  },
  {
    n: "02",
    title: "Structure",
    duration: "3–7 days",
    body: "We define the pages, user flow, messaging, and sections needed to make the site clear and conversion-focused.",
  },
  {
    n: "03",
    title: "Design",
    duration: "1–2 weeks",
    body: "We create a clean, premium interface that makes your startup feel credible and differentiated.",
  },
  {
    n: "04",
    title: "Build and launch",
    duration: "2–5 weeks",
    body: "We develop, test, optimize, and launch with performance, SEO, CMS, analytics, and integrations in place.",
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="scroll">
          <p className={eyebrow}>Process</p>
          <h2 className={cn(sectionTitle, "mt-4")}>How we work.</h2>
          <p className={cn(bodyText, "mt-3 max-w-2xl")}>
            Clear steps from first audit to launch, without a bloated agency process.
          </p>
        </TextFade>
        <div ref={ref} className="mt-12 grid gap-8 md:grid-cols-4 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45, ease }}
              className="relative md:border-l md:border-dashed md:border-[var(--border)] md:pl-6"
            >
              <div className="flex items-center gap-2 md:block">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--border)] text-[11px] font-medium text-[var(--fg-tertiary)]">
                  {step.n}
                </span>
                <h3 className="text-[15px] font-medium text-[var(--fg-primary)] md:mt-4">
                  {step.title}
                </h3>
              </div>
              <p className="mt-1.5 text-[11px] font-normal uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {step.duration}
              </p>
              <p className={cn(bodyText, "mt-1.5 text-[13px]")}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
