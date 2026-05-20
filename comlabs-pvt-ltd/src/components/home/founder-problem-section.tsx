"use client";

import { TextFade } from "@/components/motion/text-fade";
import { bodyText, cardSurface, eyebrow, sectionTitle } from "@/lib/page-styles";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Outdated design kills trust",
    body: "Your product may be strong, but a weak website makes buyers, investors, and candidates hesitate.",
  },
  {
    title: "Generic pages do not convert",
    body: "Most websites explain features. Good ones create confidence, momentum, and action.",
  },
  {
    title: "Slow execution costs momentum",
    body: "Founders need senior-level execution without long agency timelines or constant handholding.",
  },
  {
    title: "Clarity compounds",
    body: "Clear positioning, sharp page structure, and focused CTAs make every visit more valuable.",
  },
];

export function FounderProblemSection() {
  return (
    <section className="bg-[var(--bg-primary)] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <TextFade mode="scroll">
          <p className={eyebrow}>Why it matters</p>
          <h2 className={cn(sectionTitle, "mt-4 max-w-[32ch]")}>
            Your website is often the first investor, customer, or partner touchpoint.
          </h2>
          <p className={cn(bodyText, "mt-4 max-w-2xl")}>
            It cannot feel unfinished. A strong website makes your startup easier to trust, easier to
            understand, and easier to buy from.
          </p>
        </TextFade>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {cards.map((c) => (
            <article key={c.title} className={cn(cardSurface, "flex flex-col gap-3")}>
              <h3 className="text-[15px] font-medium text-[var(--fg-primary)]">{c.title}</h3>
              <p className={cn(bodyText, "text-[13px]")}>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
