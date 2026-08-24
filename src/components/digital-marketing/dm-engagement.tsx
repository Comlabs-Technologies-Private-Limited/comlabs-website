import { DIGITAL_MARKETING_ENGAGEMENTS } from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";

export function DigitalMarketingEngagement() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1440px] px-5 md:px-6 lg:px-12 xl:px-16">
        <h2
          className="max-w-[18ch] text-[clamp(2rem,3.6vw,3.5rem)] leading-[1.06] font-medium tracking-tight"
          style={{ color: DM.text, letterSpacing: "-0.035em" }}
        >
          Built around the problem—not a fixed menu of deliverables.
        </h2>
        <div className="mt-14">
          {DIGITAL_MARKETING_ENGAGEMENTS.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-start"
              style={{ borderTop: `1px solid ${DM.hairline}` }}
            >
              <p className="text-[11px] tracking-[0.16em] uppercase md:col-span-2" style={{ color: DM.muted }}>
                {item.index}
              </p>
              <h3 className="text-xl font-medium tracking-tight md:col-span-4">{item.title}</h3>
              <p className="text-sm leading-relaxed md:col-span-6" style={{ color: DM.muted }}>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
