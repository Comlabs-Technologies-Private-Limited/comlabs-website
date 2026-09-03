import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { referringAnchorProps } from "@/lib/seo/prepare-html-links";
import { canonicalPath } from "@/lib/site";

type CaseStudyCtaProps = {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  secondary?: { label: string; href: string; external?: boolean };
};

const DEFAULT_SECONDARY = { label: "View all case studies", href: "/case-studies" } as const;

export function CaseStudyCta({
  heading = "Start a project.",
  body = "Tell us what you're building. We'll tell you how we'd approach it — no commitment required.",
  primaryLabel = "Get in touch",
  secondary = DEFAULT_SECONDARY,
}: CaseStudyCtaProps) {
  const secondaryClassName =
    "inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90";
  const secondaryStyle = {
    borderColor: "rgba(247,247,244,0.25)",
    color: "var(--background)",
  };

  return (
    <section
      className="mx-6 mb-12 overflow-hidden rounded-3xl"
      style={{ background: "var(--foreground)" }}
      aria-label="Contact Comlabs"
    >
      <div className="mx-auto max-w-2xl px-8 py-16 text-center md:px-10 md:py-20">
        <p
          className="mb-5 text-xs tracking-widest uppercase"
          style={{ color: "rgba(247,247,244,0.45)" }}
        >
          Let&apos;s build something
        </p>
        <h2
          className="mb-5 text-3xl font-medium tracking-tight md:text-5xl"
          style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
        >
          {heading}
        </h2>
        <p
          className="mb-10 text-base leading-[1.7] md:text-lg"
          style={{ color: "rgba(247,247,244,0.55)" }}
        >
          {body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={canonicalPath("/contact")}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--background)", color: "var(--foreground)" }}
          >
            {primaryLabel} <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {secondary.external ? (
            <a
              {...referringAnchorProps(secondary.href)}
              className={secondaryClassName}
              style={secondaryStyle}
            >
              {secondary.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={canonicalPath(secondary.href)}
              className={secondaryClassName}
              style={secondaryStyle}
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
