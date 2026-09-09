"use client";

import { motion } from "framer-motion";

import {
  illustrationColors,
  illustrationEase,
} from "@/components/services/illustrations/illustration-tokens";
const ink = illustrationColors.ink;
const inkMuted = illustrationColors.inkMuted;
const inkFaint = illustrationColors.inkFaint;
const border = illustrationColors.border;
const borderStrong = illustrationColors.borderStrong;
const surface = illustrationColors.surface;
const accent = illustrationColors.accent;
const accentSoft = illustrationColors.accentSoft;
const health = illustrationColors.health;

const EASE = illustrationEase;
const viewport = { once: true, amount: 0.4 } as const;

const draw = {
  hidden: { opacity: 0, scaleX: 0 },
  shown: (delay: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.5, delay, ease: EASE },
  }),
};

const rise = {
  hidden: { opacity: 0, y: 8 },
  shown: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay, ease: EASE },
  }),
};

/** Web & Digital Experience proof: a page verified against a real Lighthouse pass. */
export function WebDigitalProof() {
  const workflow = [
    { label: "Position", done: true },
    { label: "Interface", done: true },
    { label: "Performance", done: true },
    { label: "Production", done: true },
  ] as const;

  return (
    <div
      className="flex h-full min-h-[22rem] flex-col md:min-h-[34rem] md:flex-row"
      style={{ background: "#F7F7F4" }}
    >
      <div className="flex flex-1 flex-col border-b p-5 md:border-r md:border-b-0 md:p-8" style={{ borderColor: border }}>
        <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: inkFaint }}>
          Page preview
        </p>
        <div className="mt-4 flex-1 border p-4" style={{ borderColor: border, background: surface }}>
          <div className="flex items-center gap-2">
            <span className="size-2 border" style={{ borderColor: borderStrong }} aria-hidden />
            <motion.span
              className="h-1.5 w-24 origin-left"
              style={{ background: border }}
              variants={draw}
              initial="hidden"
              whileInView="shown"
              viewport={viewport}
              custom={0.05}
              aria-hidden
            />
          </div>

          <motion.div
            className="mt-5 h-8 w-2/3 origin-left"
            style={{ background: "#F0EFEA" }}
            variants={draw}
            initial="hidden"
            whileInView="shown"
            viewport={viewport}
            custom={0.15}
            aria-hidden
          />

          <div className="mt-3 space-y-2">
            <motion.span
              className="block h-1.5 w-full origin-left"
              style={{ background: border }}
              variants={draw}
              initial="hidden"
              whileInView="shown"
              viewport={viewport}
              custom={0.24}
              aria-hidden
            />
            <motion.span
              className="block h-1.5 w-5/6 origin-left"
              style={{ background: border }}
              variants={draw}
              initial="hidden"
              whileInView="shown"
              viewport={viewport}
              custom={0.3}
              aria-hidden
            />
          </div>

          <motion.div
            className="mt-6 h-16 origin-left border"
            style={{ background: accentSoft, borderColor: "rgba(201,100,66,0.16)" }}
            variants={draw}
            initial="hidden"
            whileInView="shown"
            viewport={viewport}
            custom={0.4}
            aria-hidden
          />
        </div>
      </div>

      <div className="flex w-full flex-col justify-between gap-6 p-5 md:w-[17rem] md:p-8">
        <div>
          <p className="text-[10px] tracking-[0.16em] uppercase" style={{ color: inkFaint }}>
            Workflow
          </p>
          <ol className="mt-4 space-y-3">
            {workflow.map((step, index) => (
              <motion.li
                key={step.label}
                className="flex items-center justify-between text-[13px]"
                variants={rise}
                initial="hidden"
                whileInView="shown"
                viewport={viewport}
                custom={0.15 + index * 0.08}
              >
                <span style={{ color: "rgba(28,25,23,0.85)" }}>{step.label}</span>
                <span className="size-1.5 shrink-0 border" style={{ borderColor: health, background: health }} aria-hidden />
              </motion.li>
            ))}
          </ol>
        </div>
        <motion.div
          className="border px-4 py-3"
          style={{ borderColor: border, background: surface }}
          variants={rise}
          initial="hidden"
          whileInView="shown"
          viewport={viewport}
          custom={0.55}
        >
          <p className="text-[10px] tracking-[0.14em] uppercase" style={{ color: inkFaint }}>
            Lighthouse
          </p>
          <p className="mt-1 text-3xl font-medium tracking-tight" style={{ color: ink }}>
            96
          </p>
          <p className="mt-1 text-[12px]" style={{ color: inkMuted }}>
            LCP 1.8s · CLS 0.01
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/** Mobile Engineering proof: a production deploy verified end to end. */
export function MobileOpsProof() {
  const checks = [
    { label: "Authentication", state: "Verified" },
    { label: "API", state: "billing-service" },
    { label: "Status sync", state: "Live" },
    { label: "Completion", state: "Deployed" },
  ] as const;

  return (
    <div
      className="flex h-full min-h-[22rem] flex-col items-stretch gap-6 p-6 md:min-h-[34rem] md:flex-row md:items-center md:justify-center md:gap-10 md:p-10"
      style={{ background: "#F7F7F4" }}
    >
      <motion.div
        className="mx-auto h-[20rem] w-[11rem] overflow-hidden rounded-[2rem] border p-[4px] md:mx-0 md:h-[24rem] md:w-[12.5rem]"
        style={{ borderColor: "rgba(28,25,23,0.16)", background: "#1C1917" }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex h-full flex-col rounded-[1.7rem] px-3 pt-4 pb-3" style={{ background: surface }}>
          <span className="mx-auto h-1.5 w-10" style={{ background: border }} aria-hidden />
          <p className="mt-4 text-[10px] tracking-wide uppercase" style={{ color: inkFaint }}>
            Deploy
          </p>
          <p className="mt-1 text-[15px] font-medium tracking-tight" style={{ color: ink }}>
            Production live
          </p>
          <div className="mt-4 flex-1 p-3" style={{ background: "#F7F7F4" }}>
            <p className="text-[11px]" style={{ color: inkFaint }}>
              billing-service
            </p>
            <p className="mt-2 text-[12px]" style={{ color: ink }}>
              3/3 targets healthy
            </p>
            <motion.span
              className="mt-4 block h-1.5 origin-left"
              style={{ background: accent }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              aria-hidden
            />
          </div>
          <p className="mt-3 text-[11px]" style={{ color: inkFaint }}>
            Signed in · session ok
          </p>
        </div>
      </motion.div>

      <ul className="w-full max-w-xs space-y-3">
        {checks.map((row, index) => (
          <motion.li
            key={row.label}
            className="flex items-center justify-between border px-4 py-3 text-[13px]"
            style={{ borderColor: border, background: surface }}
            variants={rise}
            initial="hidden"
            whileInView="shown"
            viewport={viewport}
            custom={0.2 + index * 0.08}
          >
            <span style={{ color: "rgba(28,25,23,0.85)" }}>{row.label}</span>
            <span className="text-[11px]" style={{ color: accent }}>
              {row.state}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
