"use client";

import { motion } from "motion/react";

import {
  DIGITAL_MARKETING_ENGAGEMENTS,
  DIGITAL_MARKETING_ORANGE,
} from "@/lib/digital-marketing";

const EASE = [0.25, 0.1, 0, 1] as const;

export function DigitalMarketingEngagement() {
  return (
    <section id="engagement" className="border-b border-border">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-[72px] md:px-7 md:py-[120px] lg:px-12 lg:py-40 xl:px-[72px]">
        <h2
          className="max-w-[18ch] text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.08] font-medium tracking-tight"
          style={{ letterSpacing: "-0.035em" }}
        >
          Built around the problem—not a fixed menu of deliverables.
        </h2>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {DIGITAL_MARKETING_ENGAGEMENTS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: EASE }}
              className="rounded-[16px] border border-border bg-card p-6 md:p-8"
            >
              <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                {item.index}
              </p>
              <h3
                className="mt-4 text-xl font-medium tracking-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                {item.title}
              </h3>
              <span
                className="mt-5 block h-px w-8"
                style={{ background: DIGITAL_MARKETING_ORANGE }}
                aria-hidden
              />
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
