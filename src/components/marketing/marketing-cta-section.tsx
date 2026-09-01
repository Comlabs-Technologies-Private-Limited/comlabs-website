"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { canonicalPath } from "@/lib/site";

const EASE = [0.25, 0.1, 0, 1] as const;

type MarketingCtaSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
};

export function MarketingCtaSection({
  eyebrow = "Let's build something",
  title,
  description,
  ctaLabel,
  ctaHref = "/contact",
}: MarketingCtaSectionProps) {
  return (
    <section
      className="mx-6 mb-16 overflow-hidden rounded-3xl"
      style={{ background: "var(--foreground)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mx-auto max-w-2xl px-8 py-20 text-center md:px-10 md:py-24"
      >
        {eyebrow ? (
          <p
            className="mb-5 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(247,247,244,0.45)" }}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className="mb-5 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        <p
          className="mb-10 text-base leading-[1.7] md:text-lg"
          style={{ color: "rgba(247,247,244,0.55)" }}
        >
          {description}
        </p>

        <Link
          href={canonicalPath(ctaHref)}
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--foreground)]"
          style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
          {ctaLabel} <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  );
}
