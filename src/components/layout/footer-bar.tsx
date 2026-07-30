import Link from "next/link";

import { PixelGridMark } from "@/components/decorative/pixel-grid-mark";
import { SectionContainer } from "@/components/layout/section-container";
import { cn } from "@/lib/utils";

const linkClass =
  "text-[13px] font-normal leading-[1.65] text-zinc-400 transition-colors hover:text-zinc-100";

const headingClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500";

const columns: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
  {
    title: "Capabilities",
    links: [
      { href: "/#services", label: "Website rebuilds" },
      { href: "/#services", label: "Startup websites" },
      { href: "/#services", label: "Product UI/UX" },
      { href: "/#services", label: "AI automation" },
      { href: "/#work", label: "Work" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/#services", label: "Startup website design" },
      { href: "/#services", label: "Conversion-focused websites" },
      { href: "/#services", label: "Product UI for startups" },
      { href: "/#services", label: "Frontend development" },
      { href: "/#services", label: "AI automation for startups" },
      { href: "/#tools", label: "Stack & tools" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Privacy policy" },
      { href: "/contact", label: "Terms of use" },
      { href: "/contact", label: "Security" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
      { href: "/#work", label: "Case studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/#services", label: "Services" },
      { href: "/#work", label: "Work" },
      { href: "/#faq", label: "Writing" },
    ],
  },
];

const stackLinks = [
  { href: "/#tools", label: "Next.js" },
  { href: "/#tools", label: "React" },
  { href: "/#tools", label: "TypeScript" },
  { href: "/#tools", label: "Node" },
];

const socialLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "mailto:hello@comlabstechnologies.com", label: "Email" },
  {
    href: "https://www.linkedin.com/company/comlabs",
    label: "LinkedIn",
    external: true,
  },
];

export function FooterBar() {
  return (
    <footer className="relative z-40 border-t border-zinc-800/80 bg-[#111111] text-zinc-400">
      <SectionContainer className="px-4 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-10 xl:gap-14">
          <div className="flex items-start gap-4 lg:max-w-[5.5rem] lg:flex-col lg:gap-6">
            <PixelGridMark surface="footer" className="opacity-90" />
            <div className="min-w-0 flex-1 lg:flex-initial">
              <p className="text-[13px] font-medium text-zinc-200">ComLabs</p>
              <p className="mt-2 text-[12px] font-normal leading-relaxed text-zinc-500">
                Premium websites, product interfaces, and automation systems for startups that need to
                move fast and look credible.
              </p>
            </div>
          </div>

          <nav
            className="grid flex-1 grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6"
            aria-label="Footer"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p className={headingClass}>{col.title}</p>
                <ul className="mt-4 space-y-0">
                  {col.links.map((l) => (
                    <li key={l.label} className="pt-1.5 first:pt-0">
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-10">
              <div>
                <p className={headingClass}>Stack</p>
                <ul className="mt-4 space-y-0">
                  {stackLinks.map((l) => (
                    <li key={l.label} className="pt-1.5 first:pt-0">
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={headingClass}>Socials</p>
                <ul className="mt-4 space-y-0">
                  {socialLinks.map((l) => (
                    <li key={l.label} className="pt-1.5 first:pt-0">
                      {l.external ? (
                        <a
                          href={l.href}
                          className={linkClass}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <a href={l.href} className={linkClass}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-zinc-800/80 pt-8 text-[12px] font-normal text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ComLabs Technology Pvt. Ltd. · Pune, India</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="text-zinc-500 transition-colors hover:text-zinc-200">
              Privacy
            </Link>
            <Link href="/contact" className="text-zinc-500 transition-colors hover:text-zinc-200">
              Terms
            </Link>
            <Link href="/contact" className="text-zinc-500 transition-colors hover:text-zinc-200">
              Contact
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}
