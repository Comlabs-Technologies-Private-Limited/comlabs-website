import Image from "next/image";
import Link from "next/link";

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
  const description = canonical?.cardDescription ?? service.subheadline;
  const highlight = canonical?.cardTitleHighlight ?? service.title.split(" ")[0] ?? service.title;

  if (!image) {
    return null;
  }

  return (
    <Link
      href={canonicalPath(service.path)}
      className={`group relative block overflow-hidden bg-[#f7f7f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 ${
        spanFull ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative min-h-[14rem] sm:min-h-[16rem] md:min-h-[18rem] lg:min-h-[20rem]">
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
          className="object-cover saturate-[0.92] motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f7f7f4]/92 via-[#f7f7f4]/58 to-[#f7f7f4]/28"
          aria-hidden
        />

        <div className="relative flex h-full flex-col p-6 sm:p-8 md:p-10 lg:p-12">
          <h3 className="max-w-[16ch] text-pretty font-sans text-[1.0625rem] font-medium leading-[1.2] tracking-[-0.02em] text-neutral-900 sm:max-w-[18ch] sm:text-lg md:text-xl md:leading-tight">
            <ServiceCardTitle title={service.title} highlight={highlight} />
          </h3>
          <p className="mt-3 max-w-[32ch] text-pretty text-[13px] font-normal leading-[1.6] text-neutral-600 sm:mt-4 sm:max-w-[34ch] sm:text-sm sm:leading-[1.65]">
            {description}
          </p>
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
