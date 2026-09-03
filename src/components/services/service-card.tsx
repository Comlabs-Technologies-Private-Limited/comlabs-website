import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { ServiceCompactSignal } from "@/components/services/compact-signals";
import type { CanonicalService } from "@/lib/canonical-services";
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

export function ServicesIndexGrid({
  services,
}: {
  services: readonly CanonicalService[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {services.map((service) => (
        <article
          key={service.slug}
          className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-background transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]"
        >
          <ServiceCompactSignal slug={service.slug} className="rounded-none border-0 border-b" />
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">Best when</p>
            <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">{service.bestWhen}</p>
            <h3
              className="mt-5 text-lg leading-[1.2] font-medium tracking-tight md:text-xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              <ServiceCardTitle title={service.title} highlight={service.cardTitleHighlight} />
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {service.cardDescription}
            </p>
            <ul className="mt-5 flex flex-1 flex-col gap-2">
              {service.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span
                    className="mt-0.5 shrink-0 font-medium"
                    style={{ color: "var(--warm-orange)" }}
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={canonicalPath(service.path)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
            >
              {service.linkLabel}
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
