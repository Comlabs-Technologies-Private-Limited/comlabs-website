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

const ease = [0.25, 0.1, 0, 1] as const;

function ServiceCardVisual({ service, index }: { service: HomeService; index: number }) {
  const illustration = serviceIllustrations[service.id];
  if (!illustration) return null;

  const { Component, label } = illustration;
  return (
    <ServiceIllustrationFrame
      label={label}
      background={service.background}
      priority={index < 2}
      className="w-full shrink-0 rounded-none border-0 md:rounded-none"
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
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border bg-background transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(28,25,23,0.06)]"
    >
      <ServiceCardVisual service={service} index={index} />
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3
          className="text-lg leading-[1.2] font-bold tracking-tight md:text-xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          {service.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
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
