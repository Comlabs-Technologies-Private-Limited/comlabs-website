import { FigmaNav, type NavCaseStudyItem } from "@/components/layout/figma-nav";
import { FigmaFooter } from "@/components/layout/figma-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import { HERO_BACKGROUND_PATH, mediaUrl } from "@/lib/cloudinary";
import { canonicalPath, siteLocation, siteName } from "@/lib/site";
import Link from "next/link";

const BACKGROUND_IMAGE = HERO_BACKGROUND_PATH;

type ContactPageProps = {
  caseStudies?: NavCaseStudyItem[];
  footerCaseStudies?: Array<{ label: string; href: string }>;
  services?: Array<{ label: string; href: string }>;
};

export function ContactPage({
  caseStudies,
  footerCaseStudies,
  services = [],
}: ContactPageProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav caseStudies={caseStudies} />

      <main>
        <div className="grid min-h-screen lg:grid-cols-2">
          <div className="relative flex md:min-h-screen flex-col justify-end px-8 py-12 lg:min-h-0 lg:px-12 lg:py-28">
            <img
              src={mediaUrl(BACKGROUND_IMAGE)}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(28,25,23,0.15) 0%, rgba(28,25,23,0.55) 55%, rgba(28,25,23,0.82) 100%)",
              }}
            />

            <div className="relative z-10 max-w-lg">
              <p
                className="mb-4 text-xs font-medium tracking-[0.14em] uppercase"
                style={{ color: "rgba(247,247,244,0.5)" }}
              >
                Contact
              </p>
              <blockquote
                className="text-2xl leading-[1.2] font-medium tracking-tight md:text-4xl"
                style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
              >
                &ldquo;Tell us what you need supported, built or operated. We&apos;ll tell you how
                we&apos;d approach it.&rdquo;
              </blockquote>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
                {siteName} · {siteLocation}
              </p>
            </div>
          </div>

          <div className="flex items-center px-6 py-12 md:px-12 lg:px-16 lg:py-20">
            <div className="mx-auto w-full max-w-md">
              <PageBreadcrumbs currentPath="/contact" items={[{ label: "Contact" }]} />
              <h1
                className="text-3xl font-medium tracking-tight md:text-4xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Contact Comlabs
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Talk to us about application support, AI engineering, AWS infrastructure, custom
                software, mobile products or digital experience requirements.
              </p>

              <div className="mt-10">
                <ContactForm />
              </div>

              {services.length > 0 ? (
                <nav aria-label="Services" className="mt-12 border-t border-border pt-8">
                  <p className="mb-3 text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    Related services
                  </p>
                  <ul className="flex flex-col gap-2">
                    {services.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={canonicalPath(service.href)}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <FigmaFooter caseStudies={footerCaseStudies} />
    </div>
  );
}
