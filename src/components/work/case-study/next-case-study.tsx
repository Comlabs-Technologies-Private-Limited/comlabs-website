import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import { canonicalPath } from "@/lib/site";

type NextCaseStudyProps = {
  client: string;
  headline: string;
  href: string;
  thumbnail: string;
};

export function NextCaseStudy({ client, headline, href, thumbnail }: NextCaseStudyProps) {
  return (
    <MarketingFadeIn>
      <section className="border-t border-border px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            <div className="col-span-12 lg:col-span-3">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Next case study</p>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <Link
                href={canonicalPath(href)}
                className="group flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12"
              >
                <div
                  className="flex h-24 w-full shrink-0 items-center justify-center rounded-2xl border border-border sm:h-28 sm:w-40"
                  style={{ backgroundColor: "#FDF5E8" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnail}
                    alt=""
                    className="max-h-12 max-w-[80%] object-contain object-center"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{client}</p>
                  <p
                    className="mt-2 text-xl font-medium tracking-tight text-foreground md:text-2xl"
                    style={{ letterSpacing: "-0.025em" }}
                  >
                    {headline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)] transition-transform group-hover:translate-x-0.5">
                    View case study
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingFadeIn>
  );
}
