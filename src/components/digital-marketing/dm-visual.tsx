"use client";

import Image from "next/image";

import { DmArtefact } from "@/components/digital-marketing/dm-artefacts";
import { DmPhoto } from "@/components/digital-marketing/dm-photo";
import { DM } from "@/lib/digital-marketing-media";
import { DM_PHOTOS } from "@/lib/digital-marketing-media";
import type { DigitalMarketingVisual } from "@/lib/digital-marketing";
import { cn } from "@/lib/utils";

type DmVisualProps = {
  visual: DigitalMarketingVisual;
  className?: string;
  size?: "hero" | "tile" | "feature";
  priority?: boolean;
  sizes?: string;
};

export function DmVisual({ visual, className, size = "tile", priority, sizes }: DmVisualProps) {
  if (visual.kind === "photo") {
    const photo = DM_PHOTOS[visual.id];
    return (
      <DmPhoto
        photo={photo}
        alt={visual.alt ?? photo.alt}
        size={size}
        priority={priority}
        className={className}
        sizes={sizes}
      />
    );
  }

  if (visual.kind === "artefact") {
    return <DmArtefact id={visual.id} className={className} />;
  }

  if (visual.kind === "work") {
    return (
      <div
        className={cn("relative h-full w-full overflow-hidden", className)}
        style={{
          background: DM.elevated,
          borderRadius: 12,
          boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
        }}
      >
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 40vw"}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return <CampaignBillboard className={className} />;
}

function CampaignBillboard({ className }: { className?: string }) {
  const photo = DM_PHOTOS["IMG-07"];
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} style={{ borderRadius: 12 }}>
      <DmPhoto photo={photo} size="feature" className="h-full w-full" />
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute top-[18%] left-[16%] flex h-[58%] w-[28%] flex-col justify-between p-3"
          style={{ background: DM.accent, color: DM.warm }}
        >
          <span className="text-[8px] tracking-[0.16em] uppercase">Comlabs</span>
          <span className="text-[13px] leading-tight font-medium tracking-tight">Signal, not noise.</span>
        </div>
        <div
          className="absolute top-[18%] right-[18%] flex h-[58%] w-[28%] flex-col justify-between p-3"
          style={{ background: DM.black, color: DM.warm, boxShadow: `inset 0 0 0 1px ${DM.hairline}` }}
        >
          <span className="text-[8px] tracking-[0.16em] uppercase">Campaign</span>
          <span className="text-[13px] leading-tight font-medium tracking-tight">Attention, then proof.</span>
        </div>
      </div>
    </div>
  );
}
