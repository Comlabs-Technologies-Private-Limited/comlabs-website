"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { DIGITAL_MARKETING_WORK } from "@/lib/digital-marketing";
import { canonicalPath } from "@/lib/site";

const EASE = [0.25, 0.1, 0, 1] as const;

export function DigitalMarketingWork() {
  const featured = DIGITAL_MARKETING_WORK.find((item) => item.featured) ?? DIGITAL_MARKETING_WORK[0];
  const rest = DIGITAL_MARKETING_WORK.filter((item) => item !== featured);

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1380px] px-5 py-[72px] md:px-7 md:py-[120px] lg:px-12 lg:py-40 xl:px-[72px]">
        <p className="mb-5 text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Selected digital work
        </p>
        <h2
          className="max-w-[16ch] text-[clamp(1.85rem,3.4vw,3.25rem)] leading-[1.08] font-medium tracking-tight"
          style={{ letterSpacing: "-0.035em" }}
        >
          Work designed to move the business forward.
        </h2>

        {featured ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-12 md:mt-16"
          >
            <WorkCard item={featured} featured />
          </motion.div>
        ) : null}

        <div className="mt-6 flex flex-col gap-6">
          {rest.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: EASE }}
            >
              <WorkCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  item,
  featured = false,
}: {
  item: (typeof DIGITAL_MARKETING_WORK)[number];
  featured?: boolean;
}) {
  return (
    <Link
      href={canonicalPath(item.href)}
      className={`group grid overflow-hidden rounded-[16px] border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 ${
        featured ? "lg:grid-cols-12" : "md:grid-cols-12"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-secondary ${
          featured ? "aspect-[16/10] lg:col-span-8 lg:aspect-auto lg:min-h-[420px]" : "aspect-[16/10] md:col-span-5 md:aspect-auto"
        }`}
      >
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 768px) 100vw, 40vw"}
          className="object-cover object-top transition-transform duration-[280ms] ease-[cubic-bezier(0.25,0.1,0,1)] group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-foreground/0 transition-colors duration-[280ms] group-hover:bg-foreground/[0.06]"
          aria-hidden
        />
      </div>
      <div
        className={`flex flex-col justify-between p-6 md:p-8 ${
          featured ? "lg:col-span-4" : "md:col-span-7"
        }`}
      >
        <div>
          <p className="text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
            {item.discipline}
          </p>
          <h3
            className="mt-3 text-2xl font-medium tracking-tight md:text-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            {item.client}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {item.outcome}
          </p>
        </div>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
          Read case study
          <ArrowUpRight
            size={15}
            className="transition-transform duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
