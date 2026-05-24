"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { TextFade } from "@/components/motion/text-fade";
import { MOCK_VIEWPORT, ServiceMockup } from "@/components/home/services-mockups";
import { cn } from "@/lib/utils";

const ease = [0.25, 0.1, 0, 1] as const;

const serviceBackgrounds = [
  "/card-bg/service-bg-1.png",
  "/card-bg/service-bg-2.png",
  "/card-bg/service-bg-3.png",
] as const;

const services = [
  {
    id: "website-rebuild",
    title: "Startup website rebuilds",
    description:
      "For startups with outdated, unclear, or underperforming websites that need to look more credible and convert better.",
    background: serviceBackgrounds[0],
    mockupImage: "/card-bg/mockup_before.png",
    mockupAlt: "Before and after website rebuild comparison",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "mt-12 md:mt-22",
    mockupClassName: "scale-107 pl-1",
  },
  {
    id: "landing-sprint",
    title: "Launch-ready landing pages",
    description:
      "For product launches, waitlists, campaigns, and high-intent traffic that needs speed without sacrificing quality.",
    background: serviceBackgrounds[1],
    mockupAlt: "",
    mockupOverlayClassName: "top-6 bottom-2 items-stretch",
    mockupWrapperClassName: "mt-6 flex h-full flex-col",
    mockupClassName: "",
  },
  {
    id: "ai-automation",
    title: "AI automation layers",
    description:
      "For lead capture, onboarding, support workflows, and repeatable processes where automation removes friction.",
    background: serviceBackgrounds[1],
    mockupAlt: "",
    mockupOverlayClassName: "top-20 items-center",
    mockupWrapperClassName: "mt-4",
    mockupClassName: "",
  },
  {
    id: "product-ui",
    title: "Product UI and frontend",
    description:
      "For dashboards, SaaS interfaces, portals, and customer-facing product flows that should feel like one system.",
    background: serviceBackgrounds[0],
    mockupImage: "/card-bg/product-ui-mockup.png",
    mockupAlt: "Pulse SaaS dashboard and mobile UI design mockup",
    mockupOverlayClassName: "mt-8 md:mt-12",
    mockupWrapperClassName: "",
    mockupClassName: "",
  },
  {
    id: "maintenance",
    title: "Copywriting and SEO",
    description:
      "We make sure that you're found on Google and platforms like ChatGPT and Perplexity. We also write the copy for your website to make it more engaging.",
    background: serviceBackgrounds[0],
    mockupAlt: "",
    mockupOverlayClassName: "md:top-12 top-8 items-start",
    mockupWrapperClassName: "",
    mockupClassName: "",
  },
  {
    id: "growth-cro",
    title: "Consultation and Strategy",
    description:
      "We help you with your existing landing page on design, strategy and optimizations.",
    background: serviceBackgrounds[1],
    mockupImage: "/card-bg/consultation_strategy_card_only.png",
    mockupAlt: "Live consultation call with strategy board, live notes, and focus areas",
    mockupOverlayClassName: "",
    mockupWrapperClassName: "md:mt-20 mt-12",
    mockupClassName: "",
  },
] as const;

function ServiceCard({
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
}: (typeof services)[number] & { index: number; mockupImage?: string }) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(cardRef, MOCK_VIEWPORT);
  const visible = reduceMotion || inView;

  return (
    <motion.article
      ref={cardRef}
      className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-none md:p-4"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06, ease }}
    >
      <div className="relative mask-t-from-95% mask-b-from-95% aspect-[6/4] overflow-hidden rounded-lg border border-zinc-100 p-2.5 md:p-3">
        {mockupImage ? (
          <>
            <Image
              src={background}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
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
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
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

      <h3 className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-zinc-900 md:mt-5 md:text-base">
        {title}
      </h3>
      <p className="mt-1.5 text-[13px] font-normal leading-relaxed text-zinc-500 md:text-[14px]">
        {description}
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="inview" viewport={MOCK_VIEWPORT}>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">
            Services
          </p>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.625rem,3.2vw,2.375rem)] font-medium leading-[1.12] tracking-tighter text-[var(--fg-primary)]">
            What we ship for startups that need to move faster.
          </h2>
          <p className="mt-4 max-w-[42rem] text-[0.9375rem] font-normal leading-relaxed text-[var(--fg-secondary)]">
            Focused services for sharper websites, stronger product experience, and systems that
            save time — scoped tightly and shipped in focused slices.
          </p>
        </TextFade>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
