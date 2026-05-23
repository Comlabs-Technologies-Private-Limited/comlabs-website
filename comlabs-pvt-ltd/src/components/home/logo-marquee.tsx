import type { SimpleIcon } from "simple-icons";
import {
  siDocker,
  siDropbox,
  siFigma,
  siGithub,
  siHubspot,
  siLinear,
  siMongodb,
  siNotion,
  siShopify,
  siStripe,
  siSupabase,
  siVercel,
} from "simple-icons";

/** Optional shorter labels where `icon.title` is awkward for a strip. */
const displayName: Partial<Record<string, string>> = {
  mongodb: "MongoDB",
  github: "GitHub",
  hubspot: "HubSpot",
};

const brands: SimpleIcon[] = [
  siStripe,
  siVercel,
  siGithub,
  siNotion,
  siShopify,
  siFigma,
  siMongodb,
  siDocker,
  siSupabase,
  siLinear,
  siHubspot,
  siDropbox,
];

function BrandMark({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="h-[22px] w-[22px] shrink-0 text-[var(--fg-primary)] opacity-[0.38] transition-opacity duration-300"
    >
      <path fill="currentColor" d={icon.path} />
    </svg>
  );
}

function BrandItem({ icon }: { icon: SimpleIcon }) {
  const name = displayName[icon.slug] ?? icon.title;

  return (
    <div
      className="flex shrink-0 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg-surface)]/60 px-4 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-sm"
      aria-label={name}
    >
      <BrandMark icon={icon} />
      <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.02em] text-[var(--fg-secondary)]">
        {name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  const track = (
    <>
      {brands.map((icon) => (
        <BrandItem key={icon.slug} icon={icon} />
      ))}
      {brands.map((icon) => (
        <BrandItem key={`${icon.slug}-dup`} icon={icon} />
      ))}
    </>
  );

  return (
    <section
      className="relative border-y border-[var(--border)] bg-[var(--bg-primary)] py-10 md:py-14"
      aria-label="Technologies and platforms"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent opacity-80" />

      <p className="mb-8 px-4 text-center text-[11px] font-normal uppercase leading-none tracking-[0.2em] text-[var(--fg-tertiary)] md:mb-10">
        Trusted by teams shipping on
      </p>

      {/* Edge fade via overlays — avoids mask+overflow on the transformed track (fixes stuck marquee in WebKit). */}
      <div className="relative overflow-x-clip">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg-primary)] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg-primary)] to-transparent md:w-24" />
        <div className="animate-marquee-logos inline-flex w-max max-w-none flex-nowrap items-center gap-5 md:gap-6">
          {track}
        </div>
      </div>
    </section>
  );
}
