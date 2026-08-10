import Image from "next/image";
import Link from "next/link";

import { getCanonicalService } from "@/lib/canonical-services";
import type { ServicePageData } from "@/lib/services-data";
import { canonicalPath } from "@/lib/site";

/** Slugs whose editorial photos need a stronger flat wash for title legibility. */
const STRONG_OVERLAY_SLUGS = new Set([
  "website-design-development",
  "seo-aeo-copywriting",
  "mobile-app-development",
]);

type ServiceCardProps = {
  service: ServicePageData;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const summary =
    getCanonicalService(service.slug)?.cardDescription ?? service.metaDescription;
  const image = service.editorialImage;
  const strongOverlay = STRONG_OVERLAY_SLUGS.has(service.slug);

  if (!image) {
    return null;
  }

  const flatWash = strongOverlay
    ? "bg-neutral-950/55 group-hover:bg-neutral-950/60"
    : "bg-neutral-950/45 group-hover:bg-neutral-950/55";

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

        <div
          className={`pointer-events-none absolute inset-0 motion-safe:transition-colors motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${flatWash}`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/10 to-neutral-950/60"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="flex flex-col items-center">
            <h3 className="max-w-[13ch] text-balance font-sans text-[15px] font-medium leading-snug tracking-[-0.01em] text-white md:text-base">
              {service.title}
            </h3>
            <span
              className="mt-3 block h-px w-6 origin-center bg-white/40 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-x-[2.4] motion-safe:group-focus-visible:scale-x-[2.4]"
              aria-hidden
            />
            <p className="mt-3 max-w-[28ch] font-sans text-[12.5px] font-light leading-relaxed text-white/0 motion-safe:transition-colors motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:text-white/70 motion-safe:group-focus-visible:text-white/70">
              {summary}
            </p>
          </div>

          <span className="absolute bottom-5 left-0 right-0 font-sans text-[10px] font-light uppercase tracking-[0.18em] text-white/0 motion-safe:transition-colors motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:text-white/70 motion-safe:group-focus-visible:text-white/70">
            View service
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
