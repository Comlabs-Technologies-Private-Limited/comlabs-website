"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  ServiceIllustrationFrame,
  serviceIllustrations,
} from "@/components/services/illustrations";
import { HOME_SERVICES, type HomeService } from "@/lib/home-services";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

function ServiceCardVisual({
  service,
  index,
  featured = false,
}: {
  service: HomeService;
  index: number;
  featured?: boolean;
}) {
  const illustration = serviceIllustrations[service.id];
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame
      label={label}
      background={service.background}
      priority={index < 3}
      className={cn(
        "w-full shrink-0 rounded-none border-0 md:rounded-none",
        featured && "md:h-full md:min-h-[360px] md:flex-1 md:aspect-auto",
      )}
      style={featured ? undefined : { aspectRatio: "5 / 4" }}
      stageClassName={service.id === "mobile-app" ? "p-3 lg:p-4" : "p-0"}
    >
      <Component />
    </ServiceIllustrationFrame>
  );
}

export function HomeServiceCard({
  service,
  index,
}: {
  service: HomeService;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const featured = Boolean(service.featured);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.28,
        delay: reduceMotion ? 0 : (index % 2) * 0.06,
        ease,
      }}
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden shadow-md rounded-3xl border border-border bg-background transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]",
        featured && "md:col-span-2 md:flex-row",
      )}
    >
      <div className={cn("min-w-0", featured && "md:flex md:h-full md:w-[55%] md:shrink-0 md:flex-col")}>
        <ServiceCardVisual service={service} index={index} featured={featured} />
      </div>
      <div
        className="flex flex-1 flex-col justify-center p-6 text-left md:p-8 "
        style={{ background: "#F7F7F4" }}
      >
        <h3
          className="text-lg leading-[1.2] font-bold tracking-tight md:text-xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground md:hidden">
          {service.mobileDescription}
        </p>
        <p className="mt-3 hidden text-sm leading-relaxed text-muted-foreground md:block">
          {service.description}
        </p>
        <Link
          href={canonicalPath(service.href)}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--warm-orange)] transition-opacity hover:opacity-80"
        >
          {service.linkLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </motion.article>
  );
}

export const homeServiceItems = HOME_SERVICES;
