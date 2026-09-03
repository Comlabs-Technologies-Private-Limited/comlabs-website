import { ComlabsLogo } from "@/components/brand/comlabs-logo";
import { FigmaFooterSocialLinks } from "@/components/layout/figma-footer-social-links";
import Link from "next/link";

import { CASE_STUDIES_PATH, canonicalPath, caseStudyPath, isBlogPublic, siteDescriptor, siteLocation, siteName } from "@/lib/site";

type FooterLink = {
  label: string;
  href: string;
};

type FigmaFooterProps = {
  showBlogLink?: boolean;
  tone?: "light" | "dark";
  caseStudies?: FooterLink[];
};

const FALLBACK_CASE_STUDY_LINKS: FooterLink[] = [
  { label: "Radiant", href: caseStudyPath("radiant") },
  { label: "Global Services", href: caseStudyPath("global-services") },
  { label: "Formial Labs", href: caseStudyPath("formial-labs") },
  { label: "Vithub", href: caseStudyPath("vithub") },
];

export function FigmaFooter({
  showBlogLink = true,
  tone = "light",
  caseStudies,
}: FigmaFooterProps) {
  const studyLinks =
    caseStudies && caseStudies.length > 0 ? caseStudies : FALLBACK_CASE_STUDY_LINKS;

  const columns: Array<{ heading: string; links: FooterLink[] }> = [
    {
      heading: "Company",
      links: [
        { label: "Services", href: "/services" },
        { label: "Case Studies", href: CASE_STUDIES_PATH },
        { label: "About", href: "/about" },
        ...(showBlogLink && isBlogPublic() ? [{ label: "Blog", href: "/blog" }] : []),
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" },
        { label: "Digital Marketing", href: "/digital-marketing" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "L1–L4 Application Support", href: "/services/application-support" },
        { label: "Agentic Infrastructure & AI Agents", href: "/services/ai-agent-development" },
        { label: "AWS Cloud & DevOps", href: "/services/cloud-infrastructure-scaling" },
        { label: "Custom Software Engineering", href: "/services/custom-software-development" },
        { label: "Mobile Engineering", href: "/services/mobile-app-development" },
        { label: "Web & Digital Experience", href: "/services/website-design-development" },
        { label: "SEO, AEO & Search Engineering", href: "/services/seo-aeo-copywriting" },
      ],
    },
    {
      heading: "Case Studies",
      links: [{ label: "All case studies", href: CASE_STUDIES_PATH }, ...studyLinks],
    },
  ];

  return (
    <footer
      className="border-t px-6 py-14"
      style={
        tone === "dark"
          ? {
              background: "#141414",
              borderColor: "rgba(244,242,237,0.12)",
              color: "#F4F2ED",
            }
          : undefined
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="mb-3 block" aria-label="Comlabs home">
              <ComlabsLogo
                decorative
                className={tone === "dark" ? "h-6 w-auto brightness-0 invert" : "h-6 w-auto"}
              />
            </Link>
            <p className="pt-[2px] text-sm font-medium text-foreground">{siteName}</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              Engineering and technology operations for production applications, AI systems, cloud
              infrastructure and digital products.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{siteDescriptor}</p>
            <p className="mt-1 text-sm text-muted-foreground">{siteLocation}</p>
            <FigmaFooterSocialLinks tone={tone} />
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm md:grid-cols-3">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.label}-${link.href}`}>
                      <Link
                        href={canonicalPath(link.href)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-8 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
