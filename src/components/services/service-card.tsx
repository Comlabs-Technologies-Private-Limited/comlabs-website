import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MarketingOrangeHighlight } from "@/components/marketing/marketing-section-header";
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
          className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-background p-6 md:p-8"
        >
          <h3
            className="text-lg leading-[1.2] font-medium tracking-tight md:text-xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            <ServiceCardTitle title={service.title} highlight={service.cardTitleHighlight} />
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {service.cardDescription}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.cardBody}</p>
          <ul className="mt-5 flex flex-1 flex-col gap-2">
            {service.capabilities.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 shrink-0 font-medium" style={{ color: "var(--warm-orange)" }}>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={canonicalPath(service.path)}
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
          >
            {service.linkLabel}
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </article>
      ))}
    </div>
  );
}
