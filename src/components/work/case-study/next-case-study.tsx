import Image from "next/image";
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
                className="group flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10"
              >
                <div className="relative aspect-[16/10] w-full min-h-0 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary sm:aspect-auto sm:h-28 sm:w-44">
                  <Image
                    src={thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 640px) calc(100vw - 48px), 176px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
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
