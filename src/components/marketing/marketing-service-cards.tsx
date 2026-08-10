"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { getCanonicalService } from "@/lib/canonical-services";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type MarketingServiceCardsProps = {
  services: ServicePageData[];
};

export function MarketingServiceCards({ services }: MarketingServiceCardsProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:gap-6">
      {services.map((service, index) => (
        <MarketingFadeIn key={service.slug} delay={index * 0.06}>
          <Link
            href={canonicalPath(service.path)}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]"
          >
            {service.editorialImage ? (
              <div className="relative aspect-[16/9] overflow-hidden bg-secondary/30">
                <img
                  src={service.editorialImage.src}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-8 md:p-9">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {service.eyebrow}
              </p>
              <h2 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">{service.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {getCanonicalService(service.slug)?.cardDescription ?? service.metaDescription}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform duration-300 group-hover:translate-x-0.5">
                View service <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </MarketingFadeIn>
      ))}
    </div>
  );
}
