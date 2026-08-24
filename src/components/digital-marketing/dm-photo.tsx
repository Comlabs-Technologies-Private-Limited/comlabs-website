"use client";

import Image from "next/image";

import { DM, type DmPhotoAsset } from "@/lib/digital-marketing-media";
import { cn } from "@/lib/utils";

type DmPhotoProps = {
  photo: DmPhotoAsset;
  alt?: string;
  size?: "hero" | "tile" | "feature";
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

const SIZE_SRC: Record<NonNullable<DmPhotoProps["size"]>, "src" | "srcSm"> = {
  hero: "src",
  feature: "src",
  tile: "srcSm",
};

export function DmPhoto({
  photo,
  alt,
  size = "tile",
  priority = false,
  className,
  imageClassName,
  sizes,
}: DmPhotoProps) {
  const src = photo[SIZE_SRC[size]];
  const resolvedSizes =
    sizes ??
    (size === "hero"
      ? "(max-width: 768px) 50vw, (max-width: 1200px) 22vw, 280px"
      : size === "feature"
        ? "(max-width: 768px) 100vw, 70vw"
        : "(max-width: 768px) 50vw, 28vw");

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: photo.placeholder,
        borderRadius: 12,
        boxShadow: `inset 0 0 0 1px ${DM.hairline}`,
      }}
    >
      <Image
        src={src}
        alt={alt ?? photo.alt}
        fill
        sizes={resolvedSizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
