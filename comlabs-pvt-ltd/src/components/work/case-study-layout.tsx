"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";

export type CaseStudyMetric = { value: string; label: string };

export type CaseStudyContent = {
  slug: string;
  client: string;
  category: string;
  year: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  coverImage: string;
  metrics: CaseStudyMetric[];
  problem: string[];
  whatWeBuilt: string[];
  results: string[];
  clients?: { label: string; note?: string };
};

const OTHER_CASE_STUDIES = [
  {
    slug: "formula-lab",
    client: "Formula Lab",
    category: "Product UX",
    href: "/work/formula-lab",
  },
  {
    slug: "global-services",
    client: "Global Services",
    category: "Website & Conversion",
    href: "/work/global-services",
  },
  {
    slug: "with-hub",
    client: "With Hub",
    category: "Brand & Marketing",
    href: "/work/with-hub",
  },
] as const;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function CaseStudyLayout({ content }: { content: CaseStudyContent }) {
  const {
    slug,
    client,
    category,
    year,
    eyebrow,
    title,
    subtitle,
    coverImage,
    metrics,
    problem,
    whatWeBuilt,
    results,
    clients,
  } = content;

  const related = OTHER_CASE_STUDIES.filter((item) => item.slug !== slug);

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        {/* HERO */}
        <section
          className="px-6 pt-16 pb-12 md:pt-20 md:pb-16"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(247,247,244,0.92) 0%, rgba(247,247,244,0.98) 100%)",
          }}
        >
          <div className="mx-auto max-w-6xl">
            <Link
              href="/#work"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} /> All work
            </Link>

            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium"
                style={{ color: "var(--warm-orange)", background: "var(--warm-orange-light)" }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--warm-orange)" }}
                />
                {eyebrow}
              </span>
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {year}
              </span>
            </div>

            <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div className="text-left">
                <p
                  className="mb-3 text-sm font-medium text-muted-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {client} · {category}
                </p>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl text-4xl leading-[1.06] font-bold tracking-tight md:text-[3.25rem]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  {subtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card lg:aspect-[5/4]"
                style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
              >
                <img
                  src={coverImage}
                  alt={`${client} project preview`}
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.18)] via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-y border-border bg-card px-6 py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {metrics.map((m) => (
              <div key={m.label} className="text-left sm:text-center">
                <div
                  className="text-2xl font-bold tracking-tight md:text-3xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {m.value}
                </div>
                <div className="mt-1.5 text-sm leading-snug text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEM + BUILD */}
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionLabel>The problem</SectionLabel>
              <p
                className="text-2xl leading-snug font-semibold tracking-tight text-foreground md:text-[1.75rem]"
                style={{ letterSpacing: "-0.02em" }}
              >
                {problem[0]}
              </p>
              {problem.slice(1).map((p) => (
                <p key={p} className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
              <SectionLabel>What we built</SectionLabel>
              <ul className="space-y-4">
                {whatWeBuilt.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground md:text-[15px]">
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
                      style={{ background: "var(--warm-orange-light)", color: "var(--warm-orange)" }}
                    >
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="border-y border-border bg-[#f2f2ef] px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>The impact</SectionLabel>
            <h2
              className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              What changed after launch.
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
              {results.map((r, i) => (
                <motion.article
                  key={r}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex min-h-[160px] flex-col border border-[#ecece8] bg-[#f7f7f4] p-6"
                >
                  <div
                    className="mb-4 text-xs font-medium tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--warm-orange)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-sm leading-[1.55] text-[#2c2c2c] md:text-[15px]">{r}</p>
                </motion.article>
              ))}
            </div>

            {clients ? (
              <div
                className="mt-8 overflow-hidden rounded-2xl border border-border px-7 py-8 md:px-10 md:py-10"
                style={{ background: "var(--foreground)" }}
              >
                <p
                  className="text-xs font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "rgba(247,247,244,0.45)" }}
                >
                  Now working with
                </p>
                <p
                  className="mt-3 text-2xl font-bold tracking-tight md:text-3xl"
                  style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
                >
                  {clients.label}
                </p>
                {clients.note ? (
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
                    {clients.note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {/* MORE WORK */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>More work</SectionLabel>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl" style={{ letterSpacing: "-0.03em" }}>
                  Other case studies.
                </h2>
              </div>
              <Link
                href="/#work"
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-5 transition-colors hover:border-foreground/20"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.client}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-6 mb-16 overflow-hidden rounded-3xl" style={{ background: "var(--foreground)" }}>
          <div className="mx-auto max-w-2xl px-8 py-20 text-center md:px-10 md:py-24">
            <p
              className="mb-6 text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: "rgba(247,247,244,0.45)" }}
            >
              Let&apos;s build something
            </p>
            <h2
              className="mb-6 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Start a project.
            </h2>
            <p className="mb-10 text-base leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
              Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no
              commitment required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "var(--background)", color: "var(--foreground)" }}
              >
                Get in touch <ArrowRight size={14} />
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ borderColor: "rgba(247,247,244,0.25)", color: "var(--background)" }}
              >
                See more work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
