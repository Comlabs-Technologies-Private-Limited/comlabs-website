import { SectionHeader } from "@/components/home/section-header";
import { ServiceRow, serviceItems } from "@/components/home/service-row";
import { SectionContainer } from "@/components/layout/section-container";
import { servicesEyebrow, servicesSubtitle, servicesTitle } from "@/lib/page-styles";

export { ServiceRow, serviceItems, ServiceCard } from "@/components/home/service-row";
export type { ServiceItem } from "@/components/home/service-row";

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-4 py-20 md:px-8 md:py-24">
      <SectionContainer>
        <SectionHeader>
          <p className={servicesEyebrow}>Services</p>
          <h2 className={servicesTitle}>
            What we ship for startups <br />
            that need to move <br />
            faster.
          </h2>
          <p className={servicesSubtitle}>
            Focused website, product, and automation work designed to remove friction <br /> and help
            your business grow.
          </p>
        </SectionHeader>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28 lg:gap-32">
          {serviceItems.map((service, index) => (
            <ServiceRow key={service.id} {...service} index={index} />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
