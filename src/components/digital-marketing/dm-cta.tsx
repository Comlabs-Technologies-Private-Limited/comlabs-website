"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import {
  DIGITAL_MARKETING_CONTACT_EMAIL,
  DIGITAL_MARKETING_ORANGE,
} from "@/lib/digital-marketing";
import { canonicalPath } from "@/lib/site";

const EASE = [0.25, 0.1, 0, 1] as const;

export function DigitalMarketingCta() {
  return (
    <section className="px-5 pb-16 md:px-7 lg:px-12 xl:px-[72px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="mx-auto max-w-[1380px] overflow-hidden rounded-[20px] px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-28"
        style={{ background: "var(--foreground)" }}
      >
        <p
          className="mb-6 text-xs tracking-[0.18em] uppercase"
          style={{ color: "rgba(247,247,244,0.45)" }}
        >
          Have a growth problem worth solving?
        </p>
        <h2
          className="max-w-[12ch] text-[clamp(2.25rem,6vw,5.25rem)] leading-[1.02] font-medium tracking-tight"
          style={{ color: "var(--background)", letterSpacing: "-0.045em" }}
        >
          Let’s find the signal.
        </h2>
        <p
          className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed md:text-base"
          style={{ color: "rgba(247,247,244,0.55)" }}
        >
          Tell us where growth is stuck. We’ll help identify the clearest opportunity and the right
          place to begin.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href={canonicalPath("/contact")}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foreground)]"
            style={{ background: DIGITAL_MARKETING_ORANGE, color: "#fff" }}
          >
            Start a conversation
            <ArrowRight size={15} aria-hidden />
          </Link>
          <a
            href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
            className="text-sm underline-offset-4 transition-opacity hover:opacity-80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            style={{ color: "rgba(247,247,244,0.7)" }}
          >
            {DIGITAL_MARKETING_CONTACT_EMAIL}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
