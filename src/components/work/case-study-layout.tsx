"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { canonicalPath } from "@/lib/site";

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
  liveSiteUrl?: string;
  metrics: CaseStudyMetric[];
  problem: string[];
  whatWeBuilt: string[];
  results: string[];
  clients?: { label: string; note?: string };
};

const OTHER_CASE_STUDIES = [
  {
    slug: "formial-labs",
    client: "Formial Labs",
    category: "Product UX",
    href: "/work/formial-labs",
  },
  {
    slug: "global-services",
    client: "Global Services",
    category: "Website & Conversion",
    href: "/work/global-services",
  },
  {
    slug: "vithub",
    client: "Vithub",
    category: "Brand & Marketing",
    href: "/work/vithub",
  },
] as const;

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

const RELATED_SERVICE_BY_SLUG: Record<string, { label: string; href: string }> = {
  "global-services": {
    label: "Website redesign services",
    href: "/services/website-redesign",
  },
  "formial-labs": {
    label: "Product UI & frontend development",
    href: "/services/product-ui-development",
  },
  vithub: {
    label: "Website design & development",
    href: "/services/website-design-development",
  },
};

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
    liveSiteUrl,
    metrics,
    problem,
    whatWeBuilt,
    results,
    clients,
  } = content;

  const related = OTHER_CASE_STUDIES.filter((item) => item.slug !== slug);
  const relatedService = RELATED_SERVICE_BY_SLUG[slug];

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        {/* HERO */}
        <section
          className="px-6 pt-14 pb-16 md:pt-20 md:pb-20"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(247,247,244,0.92) 0%, rgba(247,247,244,0.98) 100%)",
          }}
        >
          <div className="mx-auto max-w-6xl">
            <Link
              href={canonicalPath("/work")}
              className="mb-10 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} /> All work
            </Link>

            <div className="mb-8 flex flex-wrap items-center gap-2 md:mb-10">
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

            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
              <div className="max-w-2xl">
                <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {client}
                </p>
                <p className="mb-7 text-sm text-muted-foreground md:mb-8">{category}</p>

                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 }}
                  className="mt-5 max-w-lg text-base leading-[1.65] text-muted-foreground md:mt-6 md:text-lg md:leading-[1.7]"
                >
                  {subtitle}
                </motion.p>

                {liveSiteUrl ? (
                  <motion.a
                    href={liveSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.14 }}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
                  >
                    Visit {new URL(liveSiteUrl).hostname} <ArrowRight size={14} />
                  </motion.a>
                ) : null}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card lg:aspect-[5/4] lg:sticky lg:top-24"
                style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
              >
                <Image
                  src={coverImage}
                  alt={`${client} project preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-cover object-center"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(28,25,23,0.14)] via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-y border-border bg-card px-6 py-12 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="py-7 first:sm:pl-0 last:sm:pr-0 sm:px-10 sm:py-0"
                >
                  <div
                    className="text-3xl font-bold tracking-tight md:text-4xl"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {m.value}
                  </div>
                  <div className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM + BUILD */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="max-w-xl lg:max-w-none">
              <SectionLabel>The problem</SectionLabel>
              <p
                className="text-2xl leading-[1.2] font-bold tracking-tight text-foreground md:text-3xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                {problem[0]}
              </p>
              {problem.slice(1).map((p) => (
                <p
                  key={p}
                  className="mt-6 text-base leading-[1.7] text-muted-foreground md:text-[17px]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 md:p-10 lg:self-start">
              <SectionLabel>What we built</SectionLabel>
              <ul className="space-y-5">
                {whatWeBuilt.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-base leading-[1.65] text-foreground"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold"
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
        <section className="border-y border-border bg-secondary/50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>The impact</SectionLabel>
            <h2
              className="max-w-2xl text-2xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              What changed after{" "}
              <span style={{ color: "var(--warm-orange)" }}>launch</span>.
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
              {results.map((r, i) => (
                <motion.article
                  key={r}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex min-h-[168px] flex-col rounded-2xl border border-border bg-background p-7 md:p-8"
                >
                  <div
                    className="mb-5 text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "var(--warm-orange)" }}
                  >
                    Result {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[15px] leading-[1.65] text-foreground md:text-base md:leading-[1.7]">
                    {r}
                  </p>
                </motion.article>
              ))}
            </div>

            {clients ? (
              <div
                className="mt-10 overflow-hidden rounded-3xl border border-border px-8 py-10 md:mt-12 md:px-12 md:py-12"
                style={{ background: "var(--foreground)" }}
              >
                <p
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(247,247,244,0.45)" }}
                >
                  Now working with
                </p>
                <p
                  className="mt-4 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
                  style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
                >
                  {clients.label}
                </p>
                {clients.note ? (
                  <p
                    className="mt-4 max-w-2xl text-sm leading-[1.7] md:text-base"
                    style={{ color: "rgba(247,247,244,0.55)" }}
                  >
                    {clients.note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {/* RELATED SERVICE */}
        {relatedService ? (
          <section className="border-b border-border px-6 py-12 md:py-16">
            <div className="mx-auto max-w-6xl">
              <SectionLabel>Related service</SectionLabel>
              <Link
                href={canonicalPath(relatedService.href)}
                className="inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)] transition-opacity hover:opacity-80"
              >
                {relatedService.label} <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        ) : null}

        {/* MORE WORK */}
        <section className="px-6 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <SectionLabel>More work</SectionLabel>
                <h2
                  className="text-2xl font-bold tracking-tight md:text-3xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Other case studies.
                </h2>
              </div>
              <Link
                href={canonicalPath("/work")}
                className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
              >
                View all <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={canonicalPath(item.href)}
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
              className="mb-5 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "rgba(247,247,244,0.45)" }}
            >
              Let&apos;s build something
            </p>
            <h2
              className="mb-5 text-3xl font-bold tracking-tight md:text-5xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Start a project.
            </h2>
            <p
              className="mb-10 text-base leading-[1.7] md:text-lg"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Tell us what you&apos;re building. We&apos;ll tell you how we&apos;d approach it — no
              commitment required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={canonicalPath("/contact")}
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
