import Image from "next/image";

import type { CaseStudyMedia as CaseStudyMediaType } from "@/lib/case-studies";

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
    ? "overflow-hidden rounded-2xl border border-border"
    : "overflow-hidden rounded-2xl border border-border bg-card";

  return (
    <figure className={`${widthClass} mx-auto`}>
      <div
        className={containerClass}
        style={padded ? { backgroundColor: "#FDF5E8" } : undefined}
      >
        {isRemoteSrc(src) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={imageClass} loading="lazy" />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={900}
            className={imageClass}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px"
          />
        )}
      </div>
      {caption ? <CaseStudyCaption>{caption}</CaseStudyCaption> : null}
    </figure>
  );
}
