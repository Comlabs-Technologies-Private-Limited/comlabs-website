import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { servicePages, servicesIndex } from "@/lib/services-data";

export const metadata: Metadata = buildPageMetadata({
  title: servicesIndex.metaTitle,
  description: servicesIndex.metaDescription,
  path: servicesIndex.path,
});

export default function ServicesIndexPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <PageBreadcrumbs currentPath="/services" items={[{ label: "Services" }]} />

            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {servicesIndex.eyebrow}
            </p>
            <h1
              className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {servicesIndex.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {servicesIndex.subheadline}
            </p>
          </div>
        </section>

        <section className="border-t border-border px-6 pb-24 md:pb-32">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
            {servicePages.map((service) => (
              <Link
                key={service.slug}
                href={service.path}
                className="group rounded-3xl border border-border bg-card p-8 transition-colors hover:border-foreground/20"
              >
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {service.eyebrow}
                </p>
                <h2 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.metaDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)]">
                  View service <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-6 mb-16 overflow-hidden rounded-3xl" style={{ background: "var(--foreground)" }}>
          <div className="mx-auto max-w-2xl px-8 py-16 text-center md:px-10 md:py-20">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Not sure where to start?
            </h2>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Share your goal — website launch, redesign, CMS, ERP module, or product UI — and we
              will recommend the right starting point.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Contact us <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
