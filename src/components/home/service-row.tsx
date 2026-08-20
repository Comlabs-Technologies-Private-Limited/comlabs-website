"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { ServiceIllustrationFrame } from "@/components/services/illustrations";
import { lazyServiceVisuals } from "@/components/services/illustrations/lazy-visuals";
import { buildHomeServiceCards, type HomeServiceCard } from "@/lib/canonical-services";
import { cn } from "@/lib/utils";
import { canonicalPath } from "@/lib/site";

const ease = [0.25, 0.1, 0, 1] as const;
const SERVICE_VIEWPORT = { once: true, amount: 0.2 } as const;

export const serviceItems = buildHomeServiceCards();

export type ServiceItem = HomeServiceCard;

function ServiceVisual({
  background,
  visualClassName,
  id,
}: {
  background: string;
  visualClassName?: string;
  id: string;
}) {
  const illustration = lazyServiceVisuals[id];
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame label={label} background={background} className={visualClassName}>
      <Component />
    </ServiceIllustrationFrame>
  );
}

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
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(rowRef, SERVICE_VIEWPORT);
  const visible = inView;
  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={rowRef}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-20"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : index * 0.08, ease }}
    >
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
        <ServiceVisual background={background} id={id} visualClassName={visualClassName} />
      </div>
    </motion.article>
  );
}

/** @deprecated Use ServiceRow — kept for compatibility */
export const ServiceCard = ServiceRow;
