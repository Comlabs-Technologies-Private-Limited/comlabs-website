import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PROJECTS } from "@/components/home/figma/home-data";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { siteLocation, siteName } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About Comlabs Technologies Pvt Ltd",
  description:
    "Learn about Comlabs Technologies Pvt Ltd — a Pune-based website design and software development studio building websites, CMS platforms, and product interfaces.",
  path: "/about",
  absoluteTitle: true,
});

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <PageBreadcrumbs currentPath="/about" items={[{ label: "About" }]} />

            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              About
            </p>
            <h1
              className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {siteName}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A website design and software development studio in {siteLocation}. We help companies
              ship credible websites, content systems, product interfaces, and focused internal tools.
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-card px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What we do</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Comlabs combines UX structure, interface design, and front-end engineering. Projects
                range from marketing websites and redesigns to CMS implementations, ERP modules, and
                product UI for web applications.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">How we work</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Engagements are direct and scope-aware. You work with the team building the work —
                short feedback loops, clear milestones, and production-ready delivery rather than
                slide decks that never ship.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Selected work</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore case studies across website rebuilds, product onboarding, and brand-led marketing
              sites.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PROJECTS.map((project) => (
                <Link
                  key={project.href}
                  href={project.href}
                  className="rounded-2xl border border-border bg-background p-6 transition-colors hover:border-foreground/20"
                >
                  <h3 className="text-sm font-semibold">{project.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{project.category}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)]"
            >
              View all case studies <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="mx-6 mb-16 overflow-hidden rounded-3xl" style={{ background: "var(--foreground)" }}>
          <div className="mx-auto max-w-2xl px-8 py-16 text-center md:px-10 md:py-20">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Start a conversation
            </h2>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Based in {siteLocation}. Available for local and remote projects.
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
