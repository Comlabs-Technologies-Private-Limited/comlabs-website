import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ServiceCompactSignal } from "@/components/services/compact-signals";
import { PageBreadcrumbs } from "@/components/seo/page-breadcrumbs";
import type { CanonicalServiceSlug } from "@/lib/canonical-services";
import { mediaUrl } from "@/lib/cloudinary";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type ServicePageHeroProps = {
  service: ServicePageData;
};

export function ServicePageHero({ service }: ServicePageHeroProps) {
  const ctaLabel = service.heroCtaLabel ?? `Discuss ${service.title}`;
  const hasPhoto = Boolean(service.editorialImage);

  return (
    <section className="border-b border-border px-6 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div>
          <PageBreadcrumbs
            currentPath={service.path}
            items={[
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
          <p className="mt-8 mb-4 text-xs tracking-widest text-muted-foreground uppercase">
            {service.eyebrow}
          </p>
          <h1
            className="max-w-xl text-3xl leading-[1.08] font-medium tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {service.headline}
          </h1>
          <div className="mt-5 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-[17px]">
            {service.heroCopy.slice(0, 2).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={canonicalPath("/contact")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            >
              {ctaLabel}
              <ArrowRight size={14} aria-hidden />
            </Link>
            <Link
              href="#engagement"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See how we work
            </Link>
          </div>
        </div>

        <div className="min-w-0">
          {hasPhoto && service.editorialImage ? (
            <div className="overflow-hidden rounded-3xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaUrl(service.editorialImage.src)}
                alt={service.editorialImage.alt}
                className="aspect-[5/4] h-full w-full object-cover"
              />
            </div>
          ) : (
            <ServiceCompactSignal
              slug={service.slug as CanonicalServiceSlug}
              className="min-h-[16rem] md:min-h-[20rem]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
