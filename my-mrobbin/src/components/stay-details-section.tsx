import { stayDetails } from "@/lib/content";
import { SectionHeader } from "./motion/section-header";
import { SectionShell } from "./motion/section-shell";
import { RevealGroup, RevealItem } from "./motion/reveal";

export function StayDetailsSection() {
  return (
    <SectionShell id="details" tone="plain">
      <SectionHeader eyebrow="The details" title="Everything you need to know" />

      <RevealGroup className="grid gap-5 md:grid-cols-3" stagger={0.06}>
        {stayDetails.map(({ icon: Icon, title, description, meta }) => (
          <RevealItem key={title}>
            <div className="h-full rounded-xl border border-rose-100 bg-gradient-to-b from-rose-50/80 to-blush-surface p-5 sm:p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50">
                <Icon className="h-4 w-4 text-rausch" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-hof">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed tracking-tight text-foggy">{description}</p>
              {meta && (
                <p className="mt-4 flex items-center gap-1.5 text-sm font-medium tracking-tight text-rausch">
                  <meta.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  {meta.text}
                </p>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
