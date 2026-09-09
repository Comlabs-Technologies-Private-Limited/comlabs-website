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
import { cn } from "@/lib/utils";

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
    <section className="relative border-y border-border bg-card py-14 md:py-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <div className="mb-10 flex items-end justify-between gap-6 px-3 md:mb-12 md:px-4">
          <MarketingSectionHeader
            className="mb-0"
            eyebrow="Related case study"
            title={
              <>
                Proof from a{" "}
                <MarketingOrangeHighlight>live project</MarketingOrangeHighlight>.
              </>
            }
          />
          <Link
            href={canonicalPath("/case-studies")}
            className="hidden shrink-0 pb-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            All case studies →
          </Link>
        </div>

        <MarketingFadeIn>
          <div className="flat-frame">
            <Link href={canonicalPath(caseStudy.href)} className="group grid lg:grid-cols-2">
              {project ? (
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary lg:aspect-auto lg:min-h-[360px] lg:border-r lg:border-b-0">
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover object-top"
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
          </div>
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
  const columns = services.length === 2 ? 2 : 3;
  const columnClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <section className="relative border-t border-border bg-card py-14 md:py-16">
      <span aria-hidden className="gutter-hatch" />
      <div className="section-layout">
        <MarketingSectionHeader
          className="mb-12 px-3 md:mb-14 md:px-4"
          eyebrow="Related capabilities"
          title={
            <>
              Adjacent work across the{" "}
              <MarketingOrangeHighlight>stack</MarketingOrangeHighlight>.
            </>
          }
        />

        <div className="border-y border-border p-2 md:p-3">
          <div className={`flat-frame grid grid-cols-1 ${columnClass}`}>
            {services.map((item, index) => {
              const canonical = canonicalServices.find(
                (service) => service.path === item.href,
              );
              const page = servicePages.find((service) => service.path === item.href);
              const image = page?.editorialImage;

              return (
                <MarketingFadeIn
                  key={item.href}
                  delay={index * 0.06}
                  className={cn(
                    "flex h-full min-w-0 flex-col",
                    index > 0 && "border-t border-border",
                    "md:border-t-0",
                    index >= columns && "md:border-t md:border-border",
                    index % columns !== 0 && "md:border-l md:border-border",
                  )}
                >
                  <Link href={canonicalPath(item.href)} className="group flex h-full flex-col">
                    {image ? (
                      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-cover"
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
      </div>
    </section>
  );
}
