import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PROJECTS } from "@/components/home/figma/home-data";
import { MarketingFadeIn } from "@/components/marketing/marketing-motion";
import {
  MarketingOrangeHighlight,
  MarketingSectionHeader,
} from "@/components/marketing/marketing-section-header";
import { canonicalServices } from "@/lib/canonical-services";
import { servicePages } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type RelatedCaseStudy = {
  client: string;
  href: string;
  summary: string;
};

type RelatedServiceLink = {
  label: string;
  href: string;
};

export function ServiceRelatedWork({
  caseStudy,
}: {
  caseStudy: RelatedCaseStudy;
}) {
  const project = PROJECTS.find((item) => item.href === caseStudy.href);

  return (
    <section className="border-y border-border bg-card px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
          <MarketingSectionHeader
            className="mb-0"
            eyebrow="Related work"
            title={
              <>
                Proof from a{" "}
                <MarketingOrangeHighlight>live project</MarketingOrangeHighlight>.
              </>
            }
          />
          <Link
            href={canonicalPath("/work")}
            className="hidden shrink-0 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            All work →
          </Link>
        </div>

        <MarketingFadeIn>
          <Link
            href={canonicalPath(caseStudy.href)}
            className="group grid overflow-hidden rounded-2xl border border-border bg-background transition-[border-color,box-shadow] duration-[180ms] hover:border-foreground/15 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:grid-cols-2"
          >
            {project ? (
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[360px]">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-[1.03]"
                />
              </div>
            ) : null}

            <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
              {project ? (
                <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                  {project.category}
                </p>
              ) : null}
              <h3
                className="mt-3 text-2xl font-medium tracking-tight md:text-[32px]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {caseStudy.client}
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-base">
                {caseStudy.summary}
              </p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-[var(--warm-orange)] transition-transform duration-[180ms] group-hover:translate-x-0.5">
                Read case study
                <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </MarketingFadeIn>
      </div>
    </section>
  );
}

export function ServiceRelatedServices({
  services,
}: {
  services: readonly RelatedServiceLink[];
}) {
  const columns = services.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="border-t border-border bg-card px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <MarketingSectionHeader
          eyebrow="Related capabilities"
          title={
            <>
              Adjacent work across the{" "}
              <MarketingOrangeHighlight>stack</MarketingOrangeHighlight>.
            </>
          }
        />

        <div className={`grid gap-4 ${columns}`}>
          {services.map((item, index) => {
            const canonical = canonicalServices.find(
              (service) => service.path === item.href,
            );
            const page = servicePages.find((service) => service.path === item.href);
            const image = page?.editorialImage;

            return (
              <MarketingFadeIn key={item.href} delay={index * 0.06} className="h-full">
                <Link
                  href={canonicalPath(item.href)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-[border-color,box-shadow] duration-[180ms] hover:border-foreground/15 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
                >
                  {image ? (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-[1.03]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                        aria-hidden
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <h3
                      className="text-[15px] font-medium tracking-tight md:text-base"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {item.label}
                    </h3>
                    {canonical ? (
                      <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                        {canonical.cardDescription}
                      </p>
                    ) : null}
                    <span className="mt-5 inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors duration-[180ms] group-hover:text-foreground">
                      {canonical?.linkLabel ?? item.label}
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </MarketingFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
