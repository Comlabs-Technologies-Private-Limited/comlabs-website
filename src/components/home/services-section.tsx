"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import {
  ServiceIllustrationFrame,
  serviceIllustrations,
} from "@/components/services/illustrations";
import { buildHomeServiceCards, type HomeServiceCard } from "@/lib/canonical-services";
import { cn } from "@/lib/utils";
import { canonicalPath } from "@/lib/site";

const ease = [0.25, 0.1, 0, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

const serviceItems = buildHomeServiceCards();

function ServiceVisual({
  background,
  index,
  id,
}: {
  background: string;
  index: number;
  id: string;
}) {
  const illustration = serviceIllustrations[id];
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame label={label} background={background} priority={index === 0}>
      <Component />
    </ServiceIllustrationFrame>
  );
}

export function ServiceRow({
  title,
  cardDescription,
  background,
  index,
  id,
  linkLabel,
  linkHref,
}: HomeServiceCard & { index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(rowRef, VIEWPORT);
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
          className="text-xl leading-[1.15] font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base">
          {cardDescription}
        </p>
        <Link
          href={canonicalPath(linkHref)}
          className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80 md:mt-6"
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
        <ServiceVisual background={background} index={index} id={id} />
      </div>
    </motion.article>
  );
}

export { serviceItems };
