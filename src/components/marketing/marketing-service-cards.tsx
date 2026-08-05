"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type MarketingServiceCardsProps = {
  services: ServicePageData[];
};

export function MarketingServiceCards({ services }: MarketingServiceCardsProps) {
  return (
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 md:gap-5">
      {services.map((service, index) => (
        <MarketingFadeIn key={service.slug} delay={index * 0.06}>
          <Link
            href={canonicalPath(service.path)}
            className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)] md:p-9"
          >
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {service.eyebrow}
            </p>
            <h2 className="mt-3 text-xl font-bold tracking-tight md:text-2xl">{service.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {service.metaDescription}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-transform duration-300 group-hover:translate-x-0.5">
              View service <ArrowRight size={14} />
            </span>
          </Link>
        </MarketingFadeIn>
      ))}
    </div>
  );
}
