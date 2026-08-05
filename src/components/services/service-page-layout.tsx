import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNav } from "@/components/layout/figma-nav";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getFaqPageSchema, getServiceSchema } from "@/lib/schema";
import type { ServicePageData } from "@/lib/services-data";
import { siteUrl } from "@/lib/site";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  );
}

export function ServicePageLayout({ service }: { service: ServicePageData }) {
  const pageUrl = `${siteUrl}${service.path}`;

  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <JsonLdScript
        data={getServiceSchema({
          url: pageUrl,
          name: service.title,
          description: service.schemaDescription,
          serviceType: service.serviceType,
        })}
      />
      {service.faqs.length > 0 ? (
        <JsonLdScript data={getFaqPageSchema(service.faqs)} />
      ) : null}

      <FigmaNav />

      <main>
        <section className="px-6 pt-14 pb-16 md:pt-20 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <PageBreadcrumbs
              currentPath={service.path}
              items={[
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
            />

            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {service.eyebrow}
            </p>
            <h1
              className="max-w-3xl text-3xl leading-[1.08] font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {service.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.subheadline}
            </p>
          </div>
        </section>

        <section className="border-y border-border bg-card px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionLabel>What we do</SectionLabel>
              {service.proposition.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-[1.7] text-foreground md:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <SectionLabel>Problems we address</SectionLabel>
              <ul className="space-y-4">
                {service.problems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3 text-base leading-[1.65] text-muted-foreground"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--warm-orange)" }}
                      aria-hidden
                    />
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Deliverables</SectionLabel>
            <ul className="grid gap-4 md:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-border bg-background p-6 text-sm leading-relaxed text-foreground md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40 px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Process</SectionLabel>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step) => (
                <article
                  key={step.step}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <p
                    className="mb-3 text-xs font-semibold tracking-widest uppercase"
                    style={{ color: "var(--warm-orange)" }}
                  >
                    {step.step}
                  </p>
                  <h2 className="text-lg font-bold tracking-tight">{step.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Capabilities</SectionLabel>
              <ul className="space-y-3">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="rounded-xl border border-border px-4 py-3 text-sm text-foreground"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionLabel>Who this is for</SectionLabel>
              <ul className="space-y-3">
                {service.suitableFor.map((item) => (
                  <li
                    key={item}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
                Comlabs Technologies Pvt Ltd is based in Pune, Maharashtra, India and works with
                local and remote clients worldwide.
              </p>
            </div>
          </div>
        </section>

        {service.relatedCaseStudy ? (
          <section className="border-y border-border px-6 py-16 md:py-20">
            <div className="mx-auto max-w-6xl">
              <SectionLabel>Related work</SectionLabel>
              <Link
                href={service.relatedCaseStudy.href}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-8 transition-colors hover:border-foreground/20 md:max-w-2xl"
              >
                <p className="text-sm font-semibold text-foreground">
                  {service.relatedCaseStudy.client}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.relatedCaseStudy.summary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)]">
                  Read case study <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </section>
        ) : null}

        <section className="px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>FAQ</SectionLabel>
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-2xl border border-border bg-background px-6 py-4 open:bg-card"
                >
                  <summary className="cursor-pointer list-none text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Related services</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {service.relatedServices.map((related) => (
                <Link
                  key={related.href}
                  href={related.href}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                >
                  {related.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-6 mb-16 overflow-hidden rounded-3xl" style={{ background: "var(--foreground)" }}>
          <div className="mx-auto max-w-2xl px-8 py-16 text-center md:px-10 md:py-20">
            <h2
              className="mb-4 text-2xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              Discuss this service
            </h2>
            <p
              className="mb-8 text-base leading-relaxed"
              style={{ color: "rgba(247,247,244,0.55)" }}
            >
              Tell us what you are building. We will outline how we would approach scope, timeline,
              and delivery.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
            >
              Contact Comlabs <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <FigmaFooter />
    </div>
  );
}
