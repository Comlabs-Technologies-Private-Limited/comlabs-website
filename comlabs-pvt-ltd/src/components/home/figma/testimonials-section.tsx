"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { TESTIMONIALS } from "@/components/home/figma/home-data";

function TestimonialAvatar({
  name,
  initials,
  avatarSrc,
}: {
  name: string;
  initials: string;
  avatarSrc?: string;
}) {
  if (avatarSrc) {
    return (
      <Image
        src={avatarSrc}
        alt={name}
        width={28}
        height={28}
        className="h-7 w-7 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d8d8d3] text-[10px] font-semibold text-[#4a4a4a]"
      aria-hidden={!avatarSrc}
    >
      {initials}
    </div>
  );
}

export function FigmaTestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#f2f2ef] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 md:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Testimonials
          </p>
          <h2
            className="text-2xl font-bold tracking-tight md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            What founders say{" "}
            <span style={{ color: "var(--warm-orange)" }}>about us</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex min-h-[182px] flex-col border border-[#ecece8] bg-[#f5f5f2] px-4 py-4 md:min-h-[190px]"
            >
              <p className="text-[14px] leading-[1.45] text-[#2c2c2c]">&ldquo;{t.quote}&rdquo;</p>

              <footer className="mt-auto flex items-center gap-2.5 pt-5">
                <TestimonialAvatar name={t.name} initials={t.initials} avatarSrc={t.avatarSrc} />

                <div className="min-w-0 flex-1">
                  <cite className="not-italic">
                    {t.linkedinUrl ? (
                      <a
                        href={t.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-[13px] font-medium leading-none text-[#2b2b2b] transition-opacity hover:opacity-80"
                      >
                        {t.name}
                      </a>
                    ) : (
                      <span className="truncate text-[13px] font-medium leading-none text-[#2b2b2b]">
                        {t.name}
                      </span>
                    )}
                  </cite>
                  <p className="mt-1 truncate text-[12px] leading-none text-[#777771]">
                    {t.title}, {t.company}
                  </p>
                </div>

                {t.companyLogoSrc ? (
                  <Image
                    src={t.companyLogoSrc}
                    alt={`${t.company} logo`}
                    width={56}
                    height={20}
                    className="h-4 w-auto shrink-0 object-contain opacity-70"
                  />
                ) : null}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
