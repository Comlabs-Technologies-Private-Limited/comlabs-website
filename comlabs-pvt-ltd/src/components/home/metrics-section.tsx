"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { useCounter } from "@/hooks/use-counter";

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="border-y border-[var(--border)] bg-[var(--bg-primary)] px-4 py-16 md:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-12 md:flex-row md:gap-16">
        {metrics.map((m, i) =>
          m.kind === "text" ? (
            <MetricTextBlock key={m.label} metric={m} index={i} active={inView} />
          ) : (
            <MetricCountBlock key={m.label} metric={m} index={i} active={inView} />
          ),
        )}
      </div>
    </section>
  );
}

function MetricTextBlock({
  metric,
  index,
  active,
}: {
  metric: MetricText;
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.25, 0.1, 0, 1] }}
      className="max-w-[220px] text-center"
    >
      <p className="text-[clamp(1.35rem,3.5vw,2.35rem)] font-medium leading-none tracking-tight text-[var(--fg-primary)]">
        {metric.display}
      </p>
      <p className="mt-2 text-[13px] font-medium text-[var(--fg-primary)]">{metric.label}</p>
      <p className="mt-1 text-[12px] font-normal leading-snug text-[var(--fg-tertiary)]">
        {metric.sublabel}
      </p>
    </motion.div>
  );
}

function MetricCountBlock({
  metric,
  index,
  active,
}: {
  metric: MetricCount;
  index: number;
  active: boolean;
}) {
  const count = useCounter(metric.value, active, 1400 + index * 200);
  const after = "suffixAfter" in metric ? metric.suffixAfter : metric.suffix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45, ease: [0.25, 0.1, 0, 1] }}
      className="max-w-[220px] text-center"
    >
      <p className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-tight text-[var(--fg-primary)]">
        {count}
        {after}
      </p>
      <p className="mt-2 text-[13px] font-medium text-[var(--fg-primary)]">{metric.label}</p>
      <p className="mt-1 text-[12px] font-normal leading-snug text-[var(--fg-tertiary)]">
        {metric.sublabel}
      </p>
    </motion.div>
  );
}
