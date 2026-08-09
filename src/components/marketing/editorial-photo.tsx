import type { ReactNode } from "react";
import Image from "next/image";

import type { EditorialImage } from "@/lib/editorial-images";

type EditorialPhotoProps = {
  image: EditorialImage;
  priority?: boolean;
  className?: string;
};

export function EditorialPhoto({ image, priority, className }: EditorialPhotoProps) {
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card ${className ?? ""}`}
      style={{ boxShadow: "0 2px 24px rgba(28,25,23,0.07)" }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, 1152px"
        className="object-cover object-center"
        priority={priority}
      />
    </div>
  );
}

export function EditorialPhotoSection({ image }: { image: EditorialImage }) {
  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <EditorialPhoto image={image} />
      </div>
    </section>
  );
}
