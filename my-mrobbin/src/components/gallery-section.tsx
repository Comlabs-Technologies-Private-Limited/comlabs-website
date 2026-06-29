import { galleryItems } from "@/lib/content";
import { SectionHeader } from "./motion/section-header";
import { SectionShell } from "./motion/section-shell";
import { RevealGroup, RevealItem } from "./motion/reveal";
import { Photo } from "./photo";

export function GallerySection() {
  const [large, ...rest] = galleryItems;

  return (
    <SectionShell id="gallery" tone="plain">
      <SectionHeader eyebrow="The space" title="A quick look around" />

      <RevealGroup
        className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-3"
        stagger={0.06}
      >
        <RevealItem className="sm:col-span-2 md:row-span-2">
          <Photo
            {...large}
            priority
            className="aspect-[4/3] sm:aspect-[16/10] md:aspect-square"
          />
        </RevealItem>
        {rest.map((item) => (
          <RevealItem key={item.filename}>
            <Photo {...item} className="aspect-[4/3] sm:aspect-square" />
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
