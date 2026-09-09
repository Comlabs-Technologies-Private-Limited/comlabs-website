import Link from "next/link";

import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { DIGITAL_MARKETING_CONTACT_EMAIL } from "@/lib/digital-marketing";
import {
  DIGITAL_STUDIO_HERO_CREDIT,
  DIGITAL_STUDIO_SECTIONS,
} from "@/lib/digital-marketing-studio";
import { CASE_STUDIES_PATH, canonicalPath, siteLocation, siteName } from "@/lib/site";

const STUDIO_LINKS = [
  { label: "Selected work", href: `#${DIGITAL_STUDIO_SECTIONS.work}` },
  { label: "Capabilities", href: `#${DIGITAL_STUDIO_SECTIONS.capabilities}` },
  { label: "Process", href: `#${DIGITAL_STUDIO_SECTIONS.process}` },
  { label: "Engagement models", href: `#${DIGITAL_STUDIO_SECTIONS.engagements}` },
  { label: "Questions", href: `#${DIGITAL_STUDIO_SECTIONS.faq}` },
] as const;

/** Real site routes only — every entry here resolves to a published page. */
const COMLABS_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Case studies", href: CASE_STUDIES_PATH },
  { label: "SEO, AEO & Search Engineering", href: "/services/seo-aeo-copywriting" },
  { label: "Web & Digital Experience", href: "/services/website-design-development" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;

export function StudioFooter() {
  return (
    <footer className="bg-[var(--studio-black)] text-[var(--studio-white)]">
      <div className="studio-shell border-t border-[var(--studio-line-dark)] py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          <div>
            <Link href={canonicalPath("/")} aria-label={`${siteName} home`}>
              <ComlabsLogo decorative className="h-6 w-auto brightness-0 invert" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[rgba(250,250,247,0.62)]">
              The digital marketing and design studio inside {siteName} — positioning, creative,
              search, performance and analytics as one system.
            </p>
            <p className="mt-4 text-sm text-[rgba(250,250,247,0.62)]">{siteLocation}</p>
            <a
              href={`mailto:${DIGITAL_MARKETING_CONTACT_EMAIL}`}
              className="mt-2 inline-block text-sm text-[rgba(250,250,247,0.62)] underline-offset-4 transition-colors hover:text-[var(--studio-white)]"
            >
              {DIGITAL_MARKETING_CONTACT_EMAIL}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="This page">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-[rgba(250,250,247,0.44)] uppercase">
                Studio
              </p>
              <ul className="mt-5 space-y-3">
                {STUDIO_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[rgba(250,250,247,0.72)] transition-colors hover:text-[var(--studio-white)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Comlabs">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-[rgba(250,250,247,0.44)] uppercase">
                Comlabs
              </p>
              <ul className="mt-5 space-y-3">
                {COMLABS_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={canonicalPath(link.href)}
                      className="text-sm text-[rgba(250,250,247,0.72)] transition-colors hover:text-[var(--studio-white)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--studio-line-dark)] pt-8 text-xs text-[rgba(250,250,247,0.5)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={canonicalPath(link.href)}
                  className="transition-colors hover:text-[var(--studio-white)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-[rgba(250,250,247,0.38)]">
          Hero photograph by{" "}
          <a
            href={DIGITAL_STUDIO_HERO_CREDIT.photographerUrl}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="underline underline-offset-4 transition-colors hover:text-[var(--studio-white)]"
          >
            {DIGITAL_STUDIO_HERO_CREDIT.photographer}
          </a>{" "}
          on{" "}
          <a
            href={DIGITAL_STUDIO_HERO_CREDIT.sourceUrl}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className="underline underline-offset-4 transition-colors hover:text-[var(--studio-white)]"
          >
            {DIGITAL_STUDIO_HERO_CREDIT.source}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
