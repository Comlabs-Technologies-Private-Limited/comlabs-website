import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { canonicalPath } from "@/lib/site";

type RelatedServiceProps = {
  label: string;
  href: string;
  description: string;
};

export function RelatedService({ label, href, description }: RelatedServiceProps) {
  return (
    <MarketingFadeIn>
      <section className="border-t border-border px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Related service</p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <Link
                href={canonicalPath(href)}
                className="group inline-flex flex-col gap-1 transition-colors"
              >
                <span className="text-base font-medium tracking-tight text-foreground group-hover:text-[var(--warm-orange)]">
                  {label}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground">
                  {description}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingFadeIn>
  );
}
