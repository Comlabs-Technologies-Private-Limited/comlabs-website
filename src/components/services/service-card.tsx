import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
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
 * The services index reads as a decision list, not a gallery.
 *
 * Each cell leads with the service name so the list can be scanned, then gives
 * the one line that lets a visitor rule it in or out ("Best when…"), then the
 * scope. The homepage's product illustrations are deliberately absent: they are
 * the homepage's argument, and repeating them here made this page a second
 * homepage instead of a place to choose something.
 *
 * The whole cell is one link target, with the visible affordance kept as a
 * single anchor so there is exactly one tab stop per service.
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
                "group relative flex h-full min-w-0 flex-col p-6 transition-colors duration-300 md:p-8 lg:hover:bg-card",
                index > 0 && "border-t border-border",
                "lg:border-t-0",
                index >= GRID_COLUMNS && "lg:border-t lg:border-border",
                !startsRow && "lg:border-l lg:border-border",
              )}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-[11px] tabular-nums text-muted-foreground"
                  style={{ fontFamily: "var(--font-mono)" }}
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-lg leading-[1.2] font-medium tracking-tight md:text-xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  <Link
                    href={canonicalPath(service.path)}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    <ServiceCardTitle
                      title={service.title}
                      highlight={service.cardTitleHighlight}
                    />
                  </Link>
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {service.cardDescription}
              </p>

              {/* The qualifier that lets someone rule this service in or out. */}
              <p className="mt-5 border-l-2 border-[var(--warm-orange-light)] pl-4 text-[13px] leading-relaxed text-foreground/80">
                <span className="text-muted-foreground">Best when </span>
                {service.bestWhen}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2 border-t border-border pt-5">
                {service.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45em] size-1 shrink-0"
                      style={{ background: "var(--warm-orange)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)]">
                {service.linkLabel}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </article>
          );
        })}
      </div>
    </div>
  );
}
