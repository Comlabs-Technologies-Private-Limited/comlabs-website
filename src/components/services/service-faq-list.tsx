"use client";

import { ChevronDown } from "lucide-react";

import type { ServiceFaq } from "@/lib/services-data";

type ServiceFaqListProps = {
  faqs: ServiceFaq[];
};

export function ServiceFaqList({ faqs }: ServiceFaqListProps) {
  return (
    <div className="border-b border-neutral-200">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-t border-neutral-200">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown
              size={16}
              className="shrink-0 text-neutral-400 motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 text-sm font-normal leading-relaxed text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
