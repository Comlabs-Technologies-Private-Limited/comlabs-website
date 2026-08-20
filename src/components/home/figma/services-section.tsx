import { ServiceRow } from "@/components/home/service-row";
import { buildHomeServiceCards } from "@/lib/canonical-services";

const serviceItems = buildHomeServiceCards();

export function FigmaServicesSection() {
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 md:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Services
          </p>
          <h2
            className="max-w-2xl text-2xl font-bold tracking-tight md:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Everything you need to ship{" "}
            <span style={{ color: "var(--warm-orange)" }}>great</span> products.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Websites, custom software, mobile products, and infrastructure — built to remove friction
            and help your business grow.
          </p>
        </div>

        <div className="flex flex-col gap-20 md:gap-28 lg:gap-32">
          {serviceItems.map((service, index) => (
            <ServiceRow key={service.id} {...service} index={index} variant="figma" />
          ))}
        </div>
      </div>
    </section>
  );
}
