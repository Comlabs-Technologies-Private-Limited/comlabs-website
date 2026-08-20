import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HydrateOnView } from "@/components/media/hydrate-on-view";
import { ServiceVisual } from "@/components/home/service-visual";
import { buildHomeServiceCards, type HomeServiceCard } from "@/lib/canonical-services";
import { cn } from "@/lib/utils";
import { canonicalPath } from "@/lib/site";

export const serviceItems = buildHomeServiceCards();

export type ServiceItem = HomeServiceCard;

export function ServiceRow({
  title,
  cardDescription,
  background,
  index,
  visualClassName,
  id,
  linkLabel,
  linkHref,
  variant = "legacy",
}: HomeServiceCard & { index: number; variant?: "legacy" | "figma"; visualClassName?: string }) {
  const reversed = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
      <div className={cn("max-w-lg", reversed && "md:order-2 md:justify-self-end")}>
        <h3
          className={cn(
            variant === "figma"
              ? "text-xl leading-[1.15] font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl"
              : "text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.12] font-medium tracking-tight text-zinc-900",
          )}
          style={variant === "figma" ? { letterSpacing: "-0.03em" } : undefined}
        >
          {title}
        </h3>
        <p
          className={cn(
            variant === "figma"
              ? "mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base"
              : "mt-4 text-[15px] leading-relaxed text-zinc-500 md:text-base",
          )}
        >
          {cardDescription}
        </p>
        <Link
          href={canonicalPath(linkHref)}
          className={cn(
            "group inline-flex items-center gap-1.5 font-medium transition-opacity hover:opacity-80",
            variant === "figma"
              ? "mt-5 text-sm text-[var(--warm-orange)] md:mt-6"
              : "mt-6 text-[15px] text-zinc-900",
          )}
        >
          {linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>

      <div className={cn(reversed && "md:order-1")}>
        <HydrateOnView minHeightClassName="aspect-[5/4] md:aspect-[4/3]">
          <ServiceVisual background={background} id={id} visualClassName={visualClassName} />
        </HydrateOnView>
      </div>
    </article>
  );
}

/** @deprecated Use ServiceRow — kept for compatibility */
export const ServiceCard = ServiceRow;
