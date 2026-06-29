import Image from "next/image";
import { Star } from "lucide-react";
import { GUEST_AVATAR, HOST_AVATAR, HOST_NAME, reviews } from "@/lib/content";
import { SectionHeader } from "./motion/section-header";
import { SectionShell } from "./motion/section-shell";
import { RevealGroup, RevealItem } from "./motion/reveal";

function reviewAvatar(author: string) {
  return author === HOST_NAME ? HOST_AVATAR : GUEST_AVATAR;
}

export function ReviewsSection() {
  return (
    <SectionShell id="reviews" tone="plain">
      <SectionHeader
        eyebrow="Reviews"
        title="What people are (not publicly) saying"
      />

      <RevealGroup className="grid gap-8 md:grid-cols-3" stagger={0.06}>
        {reviews.map(({ quote, author, role, image }) => (
          <RevealItem key={quote}>
            <article className="h-full border-t border-deco pt-5">
              <div className="flex items-center gap-1 text-hof">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-normal tracking-tight text-hof">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={image ?? reviewAvatar(author)}
                    alt={`${author}'s profile photo`}
                    fill
                    sizes="40px"
                    className={`object-cover ${image ? "object-center" : "object-top"}`}
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-hof">{author}</p>
                  <p className="text-xs tracking-tight text-foggy">{role}</p>
                </div>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
