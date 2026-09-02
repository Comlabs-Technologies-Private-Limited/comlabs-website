"use client";

import { motion } from "motion/react";

import { PROCESS_STEPS } from "@/components/home/figma/home-data";

export function FigmaProcessSection() {
  return (
    <section id="process" className="bg-[#141414] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-100/55 uppercase">
            How we work
          </p>
          <h2
            className="text-2xl font-bold tracking-tight text-neutral-100 md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            From problem to{" "}
            <span style={{ color: "var(--warm-orange)" }}>dependable</span> operation.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="relative"
            >
              <div
                className="mb-4 text-xs font-medium tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--warm-orange)" }}
              >
                {step.step}
              </div>
              <h3 className="mb-2 text-sm font-medium tracking-tight text-neutral-100">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-100/70">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
