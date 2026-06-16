"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { SectionHeader } from "@/components/home/section-header";
import { SectionContainer } from "@/components/layout/section-container";
import { MOCK_VIEWPORT, ServiceMockup } from "@/components/home/services-mockups";
import { servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const serviceBackgrounds = [
  "/services-bg/service-bg-1.png",
  "/services-bg/service-bg-2.png",
  "/services-bg/service-bg-3.png",
  "/services-bg/service-bg-4.png",
  "/services-bg/service-bg-5.png",
] as const;

const services = [
  {
    id: "website-rebuild",
    title: "Website Rebuilds",
    description:
      "Turn an outdated website into a sharper, faster site that builds trust and brings more inquiries.",
    background: serviceBackgrounds[0],
    mockupImage: "/card-bg/mockup_before.png",
    mockupAlt: "Before and after website rebuild comparison",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "mt-12 md:mt-22",
    mockupClassName: "scale-107 pl-1",
  },
  {
    id: "landing-sprint",
    title: "Launch Landing Page",
    description:
      "Clear landing pages for launches, waitlists, and campaigns — built to explain fast and convert visitors.",
    background: serviceBackgrounds[1],
    mockupAlt: "",
    mockupOverlayClassName: "md:top-6 top-2 bottom-2 items-stretch",
    mockupWrapperClassName: "mt-6 flex h-full flex-col",
    mockupClassName: "",
  },
  {
    id: "ai-automation",
    title: "AI Automations",
    description:
      "Automate lead capture, follow-ups, onboarding, and support so your team saves time every week.",
    background: serviceBackgrounds[2],
    mockupAlt: "",
    mockupOverlayClassName: "inset-2.5 top-8 bottom-2.5 items-stretch md:inset-3 md:top-10",
    mockupWrapperClassName: "flex h-full w-full max-w-[94%] flex-col",
    mockupClassName: "",
  },
  {
    id: "product-ui",
    title: "Product UI & Frontend",
    description:
      "Clean dashboards, portals, and product interfaces that feel polished, usable, and ready to scale.",
    background: serviceBackgrounds[3],
    mockupImage: "/card-bg/product-ui-mockup.png",
    mockupAlt: "Pulse SaaS dashboard and mobile UI design mockup",
    mockupOverlayClassName: "mt-5 md:mt-6 scale-112",
    mockupWrapperClassName: "",
    mockupClassName: "",
  },

  {
    id: "growth-cro",
    title: "Strategy Calls",
    description:
      "Get clear direction on your website, positioning, page structure, and next best improvements.",
    background: serviceBackgrounds[4],
    mockupImage: "/card-bg/consultation_strategy_card_only.png",
    mockupAlt: "Live consultation call with strategy board, live notes, and focus areas",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "md:mt-20 mt-12",
    mockupClassName: "",
  },
  {
    id: "maintenance",
    title: "Copywriting & SEO",
    description:
      "Get found on Google, ChatGPT, and Perplexity — with clear copy that turns visitors into customers.",
    background: serviceBackgrounds[0],
    mockupAlt: "",
    mockupOverlayClassName: "md:top-16 top-8 items-",
    mockupWrapperClassName: "top-16",
    mockupClassName: "",
  },
] as const;

export type ServiceItem = (typeof services)[number];

export function ServiceCard({
  title,
  description,
  background,
  index,
  mockupImage,
  mockupAlt,
  mockupOverlayClassName,
  mockupWrapperClassName,
  mockupClassName,
  id,
  variant = "legacy",
}: ServiceItem & { index: number; mockupImage?: string; variant?: "legacy" | "figma" }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(cardRef, MOCK_VIEWPORT);
  const visible = reduceMotion || inView;

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        "flex flex-col",
        variant === "figma"
          ? "rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 md:p-5"
          : "rounded-sm border border-zinc-200 bg-white p-4 shadow-none md:p-4",
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06, ease }}
    >
      <div
        className={cn(
          "relative mask-t-from-95% mask-b-from-95% aspect-[6/4] overflow-hidden rounded-lg border p-2.5 md:p-3",
          variant === "figma" ? "border-border bg-secondary/40" : "border-zinc-100",
        )}
      >
        {mockupImage ? (
          <>
            <Image
              src={background}
              alt=""
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center saturate-100"
              aria-hidden
            />
            <motion.div
              className={cn(
                "absolute inset-2.5 flex items-center justify-center md:inset-3",
                mockupOverlayClassName,
              )}
              initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
              animate={
                visible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
            >
              <div
                className={cn(
                  "relative h-full w-full max-w-[92%]",
                  mockupWrapperClassName,
                )}
              >
                <Image
                  src={mockupImage}
                  alt={mockupAlt || "Service preview mockup"}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={cn(
                    "pointer-events-none rounded-lg object-contain object-center",
                    mockupClassName,
                  )}
                />
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <Image
              src={background}
              alt=""
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center saturate-180"
              aria-hidden
            />
            <div
              className={cn(
                "absolute right-2 bottom-2 left-2 flex justify-center px-3 py-2 md:px-4",
                mockupOverlayClassName,
              )}
            >
              <div
                className={cn(
                  "w-full max-w-[92%] [&>*]:shadow-[0_8px_24px_rgba(0,0,0,0.08)]",
                  mockupWrapperClassName,
                  mockupClassName,
                )}
              >
                <ServiceMockup id={id} active={visible} />
              </div>
            </div>
          </>
        )}
      </div>

      <h3
        className={cn(
          "mt-4 text-[15px] leading-snug font-medium tracking-tight md:mt-5 md:text-base",
          variant === "figma" ? "text-sm font-semibold text-foreground" : "text-zinc-900",
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-1.5 text-[13px] leading-relaxed font-normal md:text-[14px]",
          variant === "figma" ? "text-sm text-muted-foreground" : "text-zinc-500",
        )}
      >
        {description}
      </p>
    </motion.article>
  );
}

export { services as serviceItems };

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className={servicesEyebrow}>Services</p>
          <h2 className={servicesTitle}>
            What we ship for startups <br />that need to move <br />
            faster.
          </h2>
          <p className={servicesSubtitle}>
          Focused website, product, and automation work designed to remove friction <br/> and help your business grow.
          </p>
        </SectionHeader>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
