import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
import { ServiceCompactSignal } from "@/components/services/compact-signals";
import type { CanonicalService } from "@/lib/canonical-services";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

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

const GRID_COLUMNS = 2;

/**
 * One shared hairline frame: outer border, perimeter padding, inner frame
 * with a 2-column grid of services divided by 1px rules. Each cell keeps its
 * existing visual signal, capability list and link — no rounded corners, no
 * per-card border or shadow.
 */
export function ServicesIndexGrid({
  services,
}: {
  services: readonly CanonicalService[];
}) {
  return (
    <div className="border-y border-border px-0 py-2 md:p-3">
      <div className="flat-frame grid grid-cols-1 lg:grid-cols-2">
        {services.map((service, index) => {
          const startsRow = index % GRID_COLUMNS === 0;

          return (
            <article
              key={service.slug}
              className={cn(
                "group flex h-full min-w-0 flex-col",
                index > 0 && "border-t border-border",
                "lg:border-t-0",
                index >= GRID_COLUMNS && "lg:border-t lg:border-border",
                !startsRow && "lg:border-l lg:border-border",
              )}
            >
              <ServiceCompactSignal
                slug={service.slug}
                className="w-full rounded-none border-0 border-b border-border"
              />
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
          );
        })}
      </div>
    </div>
  );
}
