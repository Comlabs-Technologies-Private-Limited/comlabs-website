"use client";

import { ArrowRight, Cloud, Code2, LifeBuoy, Workflow, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  ServiceIllustrationFrame,
  serviceIllustrations,
} from "@/components/services/illustrations";
import { editorialImageSrc, editorialImages } from "@/lib/home-editorial-images";
import { HOME_SERVICES, type HomeService, type HomeServiceId } from "@/lib/home-services";
import { canonicalPath } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Tabbed suite order — Agentic AI is a standalone feature below the suite. */
const SUITE_SERVICE_IDS: readonly HomeServiceId[] = [
  "application-support",
  "cloud-infrastructure",
  "custom-software",
];

const SERVICE_ICONS: Record<HomeServiceId, LucideIcon> = {
  "application-support": LifeBuoy,
  "cloud-infrastructure": Cloud,
  "custom-software": Code2,
  "agentic-infrastructure": Workflow,
  "website-design": Code2,
  "mobile-app": Code2,
};

const DEEP_TEAL = "#0c4243";
const HAIRLINE = "var(--border)";

function serviceById(id: HomeServiceId): HomeService | undefined {
  return HOME_SERVICES.find((service) => service.id === id);
}

function ServiceVisual({
  service,
  className,
  style,
}: {
  service: HomeService;
  className?: string;
  style?: React.CSSProperties;
}) {
  const illustration = serviceIllustrations[service.id];
  if (!illustration) return null;
  const { Component, label } = illustration;

  return (
    <ServiceIllustrationFrame
      label={label}
      chrome={false}
      className={cn("h-full w-full rounded-none border-0 md:rounded-none", className)}
      style={style}
      stageClassName="p-0"
    >
      <Component />
    </ServiceIllustrationFrame>
  );
}

function ServiceCopy({
  service,
  tone = "light",
}: {
  service: HomeService;
  tone?: "light" | "dark";
}) {
  const Icon = SERVICE_ICONS[service.id];
  const dark = tone === "dark";
  const muted = dark ? "text-white/70" : "text-muted-foreground";

  return (
    <div className="flex h-full flex-col justify-center text-left">
      <p
        className={cn(
          "mb-5 inline-flex items-center gap-2 text-xs font-medium tracking-tight",
          dark ? "text-white/70" : "text-muted-foreground",
        )}
      >
        <Icon size={14} strokeWidth={1.75} aria-hidden />
        {service.title}
      </p>
      <h3
        className={cn(
          "text-xl leading-[1.15] font-bold tracking-tight md:text-2xl lg:text-[28px]",
          dark ? "text-white" : "text-foreground",
        )}
        style={{ letterSpacing: "-0.03em" }}
      >
        {service.title}
      </h3>
      <p className={cn("mt-4 text-[15px] leading-relaxed md:hidden", muted)}>
        {service.mobileDescription}
      </p>
      <p className={cn("mt-4 hidden max-w-[52ch] text-sm leading-relaxed md:block", muted)}>
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
      <ul
        className={cn(
          "mt-8 grid grid-cols-1 gap-y-2.5 text-sm sm:grid-cols-2 sm:gap-x-6",
          dark ? "text-white/80" : "text-foreground/80",
        )}
      >
        {service.capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-2.5">
            <span
              aria-hidden
              className="mt-[7px] h-1.5 w-1.5 shrink-0 border"
              style={{ borderColor: dark ? "rgba(255,255,255,0.55)" : "var(--foreground)" }}
            />
            {capability}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Three-service tabbed suite inside one shared hairline frame. */
export function ServicesSuite() {
  const services = SUITE_SERVICE_IDS.map(serviceById).filter(
    (service): service is HomeService => Boolean(service),
  );
  const [activeId, setActiveId] = useState<HomeServiceId>(SUITE_SERVICE_IDS[0]);

  return (
    <div className="border bg-background" style={{ borderColor: HAIRLINE, borderRadius: 0 }}>
      <div
        role="tablist"
        aria-label="Services"
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ borderBottom: `1px solid ${HAIRLINE}` }}
      >
        {services.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id];
          const active = service.id === activeId;
          return (
            <button
              key={service.id}
              type="button"
              role="tab"
              id={`service-tab-${service.id}`}
              aria-selected={active}
              aria-controls={`service-panel-${service.id}`}
              onClick={() => setActiveId(service.id)}
              className={cn(
                "flex h-[72px] w-full items-center justify-center gap-2.5 px-4 text-sm font-medium tracking-tight",
                index > 0 && "border-t md:border-t-0 md:border-l",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              style={{
                borderColor: HAIRLINE,
                borderRadius: 0,
                background: active ? "var(--secondary)" : "transparent",
                boxShadow: active ? "inset 0 -2px 0 0 var(--warm-orange)" : "none",
                transition: "none",
              }}
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden />
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>

      {services.map((service) => {
        const active = service.id === activeId;
        return (
          <div
            key={service.id}
            role="tabpanel"
            id={`service-panel-${service.id}`}
            aria-labelledby={`service-tab-${service.id}`}
            hidden={!active}
            className="md:grid md:grid-cols-[45fr_55fr]"
          >
            <div className="p-7 md:p-9 lg:p-14">
              <ServiceCopy service={service} />
            </div>
            <div
              className="relative min-h-[320px] md:min-h-[460px] md:border-l"
              style={{
                borderTop: undefined,
                borderColor: HAIRLINE,
                background: "#F4F3EF",
              }}
            >
              <div className="absolute inset-0 md:hidden" style={{ borderTop: `1px solid ${HAIRLINE}` }} />
              <div className="absolute inset-0">
                <ServiceVisual service={service} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Agentic Infrastructure & AI Agents — standalone dark-teal feature below the suite. */
export function AgenticFeature() {
  const service = serviceById("agentic-infrastructure");
  if (!service) return null;

  const texture = editorialImageSrc(editorialImages.lagoonTexture, 1600);

  return (
    <section
      aria-label={service.title}
      className="relative overflow-hidden border"
      style={{ borderColor: HAIRLINE, borderRadius: 0, background: DEEP_TEAL }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={texture}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(12, 66, 67, 0.86)" }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[52fr_48fr]">
        <div
          className="relative order-2 min-h-[340px] md:order-1 md:min-h-[520px] md:border-r"
          style={{ borderColor: "rgba(255,255,255,0.14)" }}
        >
          <div
            className="absolute inset-0 md:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}
          />
          <div className="absolute inset-0">
            <ServiceVisual service={service} />
          </div>
        </div>
        <div className="order-1 p-7 md:order-2 md:p-9 lg:p-14">
          <ServiceCopy service={service} tone="dark" />
        </div>
      </div>
    </section>
  );
}
