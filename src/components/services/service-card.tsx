import Image from "next/image";
import Link from "next/link";

import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

/** Slugs whose editorial photos need a stronger flat wash for title legibility. */
const STRONG_OVERLAY_SLUGS = new Set([
  "website-design-development",
  "custom-software-development",
  "mobile-app-development",
  "seo-aeo-copywriting",
  "cloud-infrastructure-scaling",
]);

type ServiceCardProps = {
  service: ServicePageData;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const image = service.editorialImage;
  const strongOverlay = STRONG_OVERLAY_SLUGS.has(service.slug);

  if (!image) {
    return null;
  }

  const flatWash = strongOverlay ? "bg-neutral-950/55" : "bg-neutral-950/45";

  return (
    <Link
      href={canonicalPath(service.path)}
      className="group relative block overflow-hidden rounded-2xl bg-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
    >
      <div className="relative aspect-[16/10] sm:aspect-[5/3]">
        <Image
          src={image.src}
          alt=""
          aria-hidden
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04] motion-safe:group-focus-visible:scale-[1.04]"
        />

        <div className={`pointer-events-none absolute inset-0 ${flatWash}`} aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/10 to-neutral-950/60"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <h3 className="max-w-[13ch] text-balance font-sans text-[15px] font-medium leading-snug tracking-[-0.01em] text-white md:text-base">
            {service.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

type ServicesGridProps = {
  services: ServicePageData[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6 lg:gap-5">
      {services.map((service, index) => (
        <div
          key={service.slug}
          className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
        >
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
}
