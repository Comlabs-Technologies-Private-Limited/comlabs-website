"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { TextFade } from "@/components/motion/text-fade";

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
    body: "We define the pages, user flow, and sections needed to make the site clear and conversion-focused.",
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
    <section className="bg-[#161718] px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="scroll">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
            Process
          </p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.375rem)] font-medium leading-[1.12] tracking-tighter text-zinc-50">
            How we work.
          </h2>
          <p className="mt-4 max-w-[42rem] text-[0.9375rem] font-normal leading-relaxed text-zinc-400">
            Clear steps from first audit to launch, without a bloated agency process.
          </p>
        </TextFade>

        <div ref={ref} className="mt-10 grid gap-8 md:grid-cols-4 md:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.45, ease }}
              className="relative md:border-l md:border-dashed md:border-zinc-700/80 md:pl-6"
            >
              <div className="flex items-center gap-2 md:block">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-600 text-[11px] font-medium text-zinc-500">
                  {step.n}
                </span>
                <h3 className="text-[15px] font-medium leading-snug tracking-tight text-blue-400 md:mt-4 md:text-base">
                  {step.title}
                </h3>
              </div>
              {/* <p className="mt-1.5 text-[11px] font-normal uppercase tracking-wider ">
                {step.duration}
              </p> */}
              <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-400 md:text-[14px]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
