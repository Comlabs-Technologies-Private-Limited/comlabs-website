"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { useCounter } from "@/hooks/use-counter";

const ease = [0.25, 0.1, 0, 1] as const;

type MetricCount = {
  kind: "count";
  value: number;
  suffix: string;
  suffixAfter?: string;
  label: string;
  sublabel: string;
};

type MetricText = {
  kind: "text";
  display: string;
  label: string;
  sublabel: string;
};

type MetricItem = MetricCount | MetricText;

const metrics: MetricItem[] = [
  {
    kind: "text",
    display: "7–14 days",
    label: "Landing page sprint",
    sublabel: "Typical focused timeline",
  },
  {
    kind: "text",
    display: "3–6 weeks",
    label: "Startup website rebuild",
    sublabel: "Depends on scope and pages",
  },
  {
    kind: "count",
    value: 90,
    suffix: "+",
    label: "Performance target",
    sublabel: "Lighthouse-style bar for frontend quality",
  },
  {
    kind: "count",
    value: 1,
    suffix: "",
    label: "Senior builder from strategy to launch",
    sublabel: "Direct execution, no handoffs",
  },
];

export function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduceMotion = !!useReducedMotion();

  return (
    <section ref={ref} className="bg-white px-3 py-14 md:px-8 md:py-20">
      <SectionContainer>
        <SectionHeader>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400 md:text-[11px]">
            Delivery benchmarks
          </p>
          <h2 className="mt-2.5 text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.14] tracking-tighter text-[var(--fg-primary)] md:mt-3 md:leading-[1.12]">
            Numbers that keep scope honest.
          </h2>
        </SectionHeader>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{
                delay: reduceMotion ? 0 : 0.04 + index * 0.06,
                duration: 0.45,
                ease,
              }}
              className="rounded-sm border border-zinc-200 bg-zinc-50/50 px-5 py-6 text-center md:px-4"
            >
              {metric.kind === "text" ? (
                <MetricTextBlock metric={metric} />
              ) : (
                <MetricCountBlock metric={metric} active={inView} />
              )}
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}

function MetricTextBlock({ metric }: { metric: MetricText }) {
  return (
    <>
      <p className="text-[clamp(1.35rem,3.5vw,2rem)] font-medium leading-none tracking-tight text-[var(--fg-primary)]">
        {metric.display}
      </p>
      <p className="mt-3 text-[13px] font-medium text-[var(--fg-primary)]">{metric.label}</p>
      <p className="mt-1.5 text-[12px] font-normal leading-snug text-zinc-500">
        {metric.sublabel}
      </p>
    </>
  );
}

function MetricCountBlock({
  metric,
  active,
}: {
  metric: MetricCount;
  active: boolean;
}) {
  const count = useCounter(metric.value, active, 1400);
  const after = "suffixAfter" in metric ? metric.suffixAfter : metric.suffix;

  return (
    <>
      <p className="text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-none tracking-tight text-[var(--fg-primary)]">
        {count}
        {after}
      </p>
      <p className="mt-3 text-[13px] font-medium text-[var(--fg-primary)]">{metric.label}</p>
      <p className="mt-1.5 text-[12px] font-normal leading-snug text-zinc-500">
        {metric.sublabel}
      </p>
    </>
  );
}
