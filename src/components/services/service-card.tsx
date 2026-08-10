import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { getCanonicalService } from "@/lib/canonical-services";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type ServiceCardTitleProps = {
  title: string;
  highlight: string;
};

function ServiceCardTitle({ title, highlight }: ServiceCardTitleProps) {
  const index = title.indexOf(highlight);
  if (index === -1) {
    return <>{title}</>;
  }

  return (
    <>
      {title.slice(0, index)}
      <MarketingOrangeHighlight>{highlight}</MarketingOrangeHighlight>
      {title.slice(index + highlight.length)}
    </>
  );
}

type ServiceCardProps = {
  service: ServicePageData;
  /** Span both columns — used for the last tile when the count is odd. */
  spanFull?: boolean;
};

export function ServiceCard({ service, spanFull = false }: ServiceCardProps) {
  const image = service.editorialImage;
  const canonical = getCanonicalService(service.slug);
  const highlight = canonical?.cardTitleHighlight ?? service.title.split(" ")[0] ?? service.title;

  if (!image) {
    return null;
  }

  return (
    <Link
      href={canonicalPath(service.path)}
      className={`group relative block overflow-hidden bg-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
        spanFull ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative min-h-[12rem] sm:min-h-[14rem] md:min-h-[16rem] lg:min-h-[18rem]">
        <Image
          src={image.src}
          alt=""
          aria-hidden
          fill
          sizes={
            spanFull
              ? "(max-width: 768px) 100vw, 960px"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
        />

        <div className="pointer-events-none absolute inset-0 bg-neutral-950/55" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/10 to-neutral-950/60"
          aria-hidden
        />

        <div className="relative h-full p-6 sm:p-8 md:p-10 lg:p-12">
          <h3 className="max-w-[16ch] text-pretty font-sans text-[1.0625rem] font-medium leading-[1.2] tracking-[-0.02em] text-white sm:max-w-[18ch] sm:text-lg md:text-xl md:leading-tight">
            <ServiceCardTitle title={service.title} highlight={highlight} />
          </h3>

          <span className="absolute bottom-6 right-6 inline-flex items-center gap-1 text-[11px] font-normal tracking-tight text-white/45 transition-colors group-hover:text-white/65 sm:bottom-8 sm:right-8 sm:text-xs">
            Read more
            <ArrowUpRight
              size={12}
              strokeWidth={1.75}
              className="shrink-0 opacity-60 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-px motion-safe:group-hover:-translate-y-px motion-safe:group-hover:opacity-80"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

type ServicesGridProps = {
  services: ServicePageData[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  const lastIndex = services.length - 1;
  const lastSpansFull = services.length % 2 !== 0;

  return (
    <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
      {services.map((service, index) => (
        <ServiceCard
          key={service.slug}
          service={service}
          spanFull={lastSpansFull && index === lastIndex}
        />
      ))}
    </div>
  );
}
