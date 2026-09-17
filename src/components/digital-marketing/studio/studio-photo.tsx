import Image from "next/image";

import { DM_PHOTOS, type DmPhotoId } from "@/lib/digital-marketing-media";
import { cn } from "@/lib/utils";

/**
 * Editorial photograph, graded to the studio palette.
 *
 * The library in `public/media/digital-marketing/` is warm — it was shot for
 * the previous orange identity. Rendering it desaturated and slightly cooled
 * lets it sit inside a blue-signal palette without a reshoot; colour returns
 * on hover, which is what makes a grid of them feel alive rather than
 * decorative.
 *
 * Self-hosted AVIF with a placeholder colour behind it, so there is no flash
 * of empty frame and no layout shift.
 */

type Props = {
  id: DmPhotoId;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function StudioPhoto({ id, sizes, className, priority = false }: Props) {
  const photo = DM_PHOTOS[id];

  return (
    <div
      className={cn("studio-photo relative overflow-hidden", className)}
      style={{ backgroundColor: photo.placeholder }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
