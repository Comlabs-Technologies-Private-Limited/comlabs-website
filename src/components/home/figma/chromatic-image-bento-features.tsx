import { ChromaticImage } from "@/components/ui/chromatic-image";

export type ChromaticBentoFeature = {
  number: string;
  title: string;
  description: string;
};

type ChromaticImageBentoFeaturesProps = {
  leftFeatures: readonly ChromaticBentoFeature[];
  rightFeatures: readonly ChromaticBentoFeature[];
  imageSrc: string;
  imageAlt: string;
  backgroundColor?: string;
};

function FeatureColumn({ features }: { features: readonly ChromaticBentoFeature[] }) {
  return (
    <dl className="grid h-full grid-rows-2 divide-y divide-white/10">
      {features.map((feature) => (
        <div
          key={feature.number}
          className="flex min-h-48 flex-col justify-between gap-8 p-6 sm:p-8"
        >
          <dt className="flex items-start justify-between gap-4">
            <span className="text-lg font-medium tracking-tight text-neutral-100">
              {feature.title}
            </span>
            <span
              className="text-sm tracking-wide text-neutral-100/40 tabular-nums"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {feature.number}
            </span>
          </dt>
          <dd className="max-w-[40ch] text-pretty text-base/7 text-neutral-100/70 sm:text-sm/6">
            {feature.description}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ChromaticImageBentoFeatures({
  leftFeatures,
  rightFeatures,
  imageSrc,
  imageAlt,
  backgroundColor = "#9cae65",
}: ChromaticImageBentoFeaturesProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#141414] text-neutral-100 outline-1 -outline-offset-1 outline-white/10">
      <div className="grid lg:grid-cols-[3fr_4fr_3fr]">
        <div className="order-2 border-white/10 lg:order-1 lg:border-r">
          <FeatureColumn features={leftFeatures} />
        </div>
        <ChromaticImage
          src={imageSrc}
          alt={imageAlt}
          backgroundColor={backgroundColor}
          zoom={0.14}
          displacement={0.035}
          chromaticShift={0.009}
          tilt={0.14}
          className="order-1 aspect-[4/5] min-h-96 bg-[#141414] lg:order-2 lg:aspect-auto lg:min-h-[42rem]"
        />
        <div className="order-3 border-t border-white/10 lg:border-t-0 lg:border-l">
          <FeatureColumn features={rightFeatures} />
        </div>
      </div>
    </div>
  );
}
