import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PROJECTS } from "@/components/home/figma/home-data";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { buildPageMetadata } from "@/lib/metadata";
import { canonicalPath } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Website & Product Development Case Studies",
  description:
    "Case studies from Comlabs Technologies Pvt Ltd — website rebuilds, product onboarding, and marketing sites for companies that needed clearer positioning and better delivery.",
  path: "/work",
});

export default function WorkIndexPage() {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav />

      <main>
        <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <PageBreadcrumbs currentPath="/work" items={[{ label: "Work" }]} />

            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Case studies
            </p>
            <h1
              className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Website and product development in practice.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Recent projects from Comlabs Technologies Pvt Ltd — from conversion-focused website
              rebuilds to product UI and onboarding flows.
            </p>
          </div>
        </section>

        <section className="border-t border-border px-6 pb-24 md:pb-32">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article
                key={project.href}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-foreground/20"
              >
                <Link href={canonicalPath(project.href)} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-sm font-semibold">{project.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{project.category}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {project.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)]">
                      Read case study <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
                {"liveSiteUrl" in project && project.liveSiteUrl ? (
                  <div className="border-t border-border px-6 py-3">
                    <a
                      href={project.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Visit {new URL(project.liveSiteUrl).hostname}
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card p-8 md:p-10">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Related services</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Each case study maps to services we offer — explore the pages below for scope, process,
              and deliverables.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={canonicalPath("/services/website-redesign")}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/20"
              >
                Website redesign
              </Link>
              <Link
                href={canonicalPath("/services/website-design-development")}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/20"
              >
                Website design & development
              </Link>
              <Link
                href={canonicalPath("/services/product-ui-development")}
                className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/20"
              >
                Product UI development
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
