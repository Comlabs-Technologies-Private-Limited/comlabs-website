import Image from "next/image";
import Link from "next/link";

import { getCanonicalService } from "@/lib/canonical-services";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

type ServiceCardProps = {
  service: ServicePageData;
  /** Span both columns — used for the last tile when the count is odd. */
  spanFull?: boolean;
};

export function ServiceCard({ service, spanFull = false }: ServiceCardProps) {
  const image = service.editorialImage;
  const canonical = getCanonicalService(service.slug);
  const description = canonical?.cardDescription ?? service.subheadline;

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
      <div className="relative min-h-[16rem] sm:min-h-[18rem] lg:min-h-[20rem]">
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

        <div className="relative flex h-full flex-col p-8 md:p-10 lg:p-12">
          <h3 className="max-w-[18ch] text-pretty font-sans text-lg font-medium leading-tight tracking-[-0.02em] text-neutral-900 md:text-xl">
            {service.title}
          </h3>
          <p className="mt-1.5 text-sm font-normal leading-snug text-neutral-600">
            {service.eyebrow}
          </p>
          <span className="mt-4 block h-px w-10 bg-neutral-900/20" aria-hidden />
          <p className="mt-4 max-w-[34ch] text-pretty text-sm font-normal leading-[1.65] text-neutral-600">
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
