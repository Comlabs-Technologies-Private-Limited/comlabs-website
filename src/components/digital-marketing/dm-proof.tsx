import Image from "next/image";

import { DIGITAL_MARKETING_PROOF } from "@/lib/digital-marketing";
import { DM } from "@/lib/digital-marketing-media";

export function DigitalMarketingProof() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12 xl:px-16">
        {DIGITAL_MARKETING_PROOF.map((item) => (
          <figure key={item.name} className="flex flex-col justify-between">
            <blockquote
              className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.25] font-medium tracking-tight"
              style={{ color: DM.text, letterSpacing: "-0.03em" }}
            >
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4">
              {item.avatarSrc ? (
                <Image
                  src={item.avatarSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover"
                  style={{ borderRadius: 999, background: DM.elevated }}
                />
              ) : (
                <span
                  className="flex h-12 w-12 items-center justify-center text-sm"
                  style={{ background: DM.elevated, color: DM.warm, borderRadius: 999 }}
                >
                  {item.initials}
                </span>
              )}
              <div>
                <p className="text-sm font-medium tracking-tight">{item.name}</p>
                <p className="text-sm" style={{ color: DM.muted }}>
                  {item.title}, {item.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
