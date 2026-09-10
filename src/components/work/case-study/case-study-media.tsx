import Image from "next/image";

import type { CaseStudyMedia as CaseStudyMediaType } from "@/lib/case-studies";
import { CASE_STUDY_MEDIA_SIZE, mediaUrl } from "@/lib/cloudinary";

import { CaseStudyCaption } from "./case-study-caption";

type CaseStudyMediaProps = {
  media: CaseStudyMediaType;
};

function isRemoteSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function CaseStudyMedia({ media }: CaseStudyMediaProps) {
  const { src, alt, caption, variant = "article", padded = false } = media;

  const widthClass =
    variant === "full"
      ? "w-full"
      : variant === "wide"
        ? "w-full max-w-5xl"
        : "w-full";

  const imageClass = padded
    ? "mx-auto max-h-32 max-w-[70%] object-contain object-center py-12 md:max-h-40"
    : "h-auto w-full object-contain object-center";

  const containerClass = padded
    ? "overflow-hidden border border-border"
    : "overflow-hidden border border-border bg-card";

  return (
    <figure className={`${widthClass} mx-auto`}>
      <div
        className={containerClass}
        style={padded ? { backgroundColor: "#FDF5E8" } : undefined}
      >
        {isRemoteSrc(src) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={mediaUrl(src)}
            alt={alt}
            width={CASE_STUDY_MEDIA_SIZE.width}
            height={CASE_STUDY_MEDIA_SIZE.height}
            className={imageClass}
            loading="lazy"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={CASE_STUDY_MEDIA_SIZE.width}
            height={CASE_STUDY_MEDIA_SIZE.height}
            className={imageClass}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px"
          />
        )}
      </div>
      {caption ? <CaseStudyCaption>{caption}</CaseStudyCaption> : null}
    </figure>
  );
}
