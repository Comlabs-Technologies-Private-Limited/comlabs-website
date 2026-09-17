import type { ReactNode } from "react";

import { FigmaFooter } from "@/components/layout/figma-footer";
import { FigmaNavLoader } from "@/components/layout/figma-nav-loader";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Square-dot bullet list, matching the Industries section's marker style. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-[7px] h-1.5 w-1.5 shrink-0 border"
            style={{ borderColor: "var(--foreground)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Definition row for terms like "Client", "Deliverables", "Confidential Information". */
export function LegalTerm({ term, children }: { term: string; children: ReactNode }) {
  return (
    <p>
      <span className="font-medium text-foreground">{term}.</span> {children}
    </p>
  );
}

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  lastUpdated: string;
  sections: LegalSection[];
  footerCaseStudies: Array<{ label: string; href: string }>;
};

/**
 * Shared shell for the legal pages. Same hairline-grid system as the
 * homepage: an outer border, an inner frame around the section list, and a
 * flush 1px-divided table of contents beside the prose — no cards, no
 * rounded corners.
 */
export async function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  footerCaseStudies,
}: LegalPageLayoutProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNavLoader />

      <main>
        <section className="relative border-b border-border py-14 md:py-16">
          <span aria-hidden className="gutter-hatch" />
          <div className="section-layout">
            <div className="max-w-2xl px-1 md:px-4">
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {eyebrow}
              </p>
              <h1
                className="text-2xl font-bold tracking-tight md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {intro}
              </p>
              <p className="mt-6 text-xs tracking-tight text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-14 md:py-16">
          <span aria-hidden className="gutter-hatch" />
          <div className="section-layout">
            <div className="border-y border-border px-0 py-2 md:p-3">
              <div className="flat-frame grid grid-cols-1 lg:grid-cols-[240px_1px_1fr]">
                {/* Table of contents */}
                <nav
                  aria-label="Sections"
                  className="border-b border-border p-6 lg:sticky lg:top-6 lg:h-fit lg:border-b-0 lg:p-8"
                >
                  <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    On this page
                  </p>
                  <ol className="space-y-2.5">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <span className="tabular-nums text-muted-foreground/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.heading}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="hidden lg:block" style={{ background: "var(--border)" }} />

                {/* Prose */}
                <div>
                  {sections.map((section, index) => (
                    <article
                      key={section.id}
                      id={section.id}
                      className={cn(index > 0 && "border-t border-border")}
                    >
                      <div className="p-6 lg:p-8">
                        <h2
                          className="mb-4 text-lg font-semibold tracking-tight md:text-xl"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          <span className="mr-2 tabular-nums text-muted-foreground/60">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {section.heading}
                        </h2>
                        <div className="max-w-[70ch] space-y-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                          {section.body}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-12">
          <div className="section-layout">
            <div className="max-w-2xl px-1 md:px-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Questions about this policy? Contact us at{" "}
                <a
                  href="mailto:admin@comlabstechnologies.com"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
                >
                  admin@comlabstechnologies.com
                </a>{" "}
                or through our{" "}
                <a
                  href={canonicalPath("/contact")}
                  className="font-medium text-foreground underline underline-offset-2 hover:text-[var(--warm-orange)]"
                >
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
