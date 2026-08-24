import Image from "next/image";

import { DmArtefact } from "@/components/digital-marketing/dm-artefacts";
import { DmPhoto } from "@/components/digital-marketing/dm-photo";
import { DIGITAL_MARKETING_WORK } from "@/lib/digital-marketing";
import { DM, DM_PHOTOS } from "@/lib/digital-marketing-media";

export function DigitalMarketingAbout() {
  const studio = DIGITAL_MARKETING_WORK[0];
  const second = DIGITAL_MARKETING_WORK[1];

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] items-start gap-12 px-5 md:px-6 lg:grid-cols-12 lg:px-12 xl:px-16">
        <div className="lg:col-span-5">
          <h2
            className="max-w-[14ch] text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.06] font-medium tracking-tight"
            style={{ color: DM.text, letterSpacing: "-0.035em" }}
          >
            Marketing shaped by people who understand the product.
          </h2>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed" style={{ color: DM.muted }}>
            Comlabs brings design, engineering and growth thinking into the same conversation. That
            means campaigns are planned with a clear understanding of the website, product, customer
            journey and systems behind the message.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-3 lg:gap-4">
          {studio ? (
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden lg:col-span-2" style={{ borderRadius: 12 }}>
              <Image
                src={studio.image}
                alt={studio.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          ) : null}
          <DmPhoto photo={DM_PHOTOS["IMG-08"]} size="tile" className="min-h-[180px]" />
          {second ? (
            <div className="relative aspect-[4/5] overflow-hidden" style={{ borderRadius: 12 }}>
              <Image
                src={second.image}
                alt={second.imageAlt}
                fill
                sizes="(max-width: 1024px) 50vw, 18vw"
                className="object-cover object-top"
              />
            </div>
          ) : null}
          <DmPhoto photo={DM_PHOTOS["IMG-13"]} size="tile" className="min-h-[180px]" />
          <DmArtefact id="campaign-poster" className="min-h-[180px]" />
        </div>
      </div>
    </section>
  );
}
