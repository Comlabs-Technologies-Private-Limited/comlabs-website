"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  DIGITAL_MARKETING_CONTACT_EMAIL,
} from "@/lib/digital-marketing";
import { DM, DM_EASE } from "@/lib/digital-marketing-media";

export function DigitalMarketingCta() {
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="scroll-mt-24 px-5 pb-20 md:px-6 lg:px-12 xl:px-16">
      <motion.div
        className="mx-auto max-w-[1440px] overflow-hidden px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28"
        style={{
          background: DM.black,
          borderRadius: 16,
          boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
        }}
        initial={false}
        whileHover={
          reduce
            ? undefined
            : {
                boxShadow: `inset 0 0 0 1px ${DM.accent}`,
                backgroundColor: "#1A120F",
              }
        }
        transition={{ duration: 0.45, ease: DM_EASE }}
      >
        <p className="mb-6 text-xs tracking-[0.18em] uppercase" style={{ color: DM.muted }}>
          Have a growth problem worth solving?
        </p>
        <h2
          className="max-w-[12ch] text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.02] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.045em" }}
        >
          Let’s find the signal.
        </h2>
        <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed md:text-base" style={{ color: DM.muted }}>
          Tell us where growth is stuck. We’ll help identify the clearest opportunity and the right
          place to begin.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2"
            style={{ background: DM.accent, color: DM.warm }}
          >
            Start a conversation
            <ArrowRight size={15} aria-hidden />
          </a>
          <a
            href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
            className="text-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2"
            style={{ color: DM.muted }}
          >
            {DIGITAL_MARKETING_CONTACT_EMAIL}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
