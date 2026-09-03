import { ChromaticImageBentoFeatures } from "@/components/home/figma/chromatic-image-bento-features";
import { PROCESS_STEPS } from "@/components/home/figma/home-data";

const leftFeatures = PROCESS_STEPS.slice(0, 2).map((step) => ({
  number: step.step,
  title: step.title,
  description: step.description,
}));

const rightFeatures = PROCESS_STEPS.slice(2).map((step) => ({
  number: step.step,
  title: step.title,
  description: step.description,
}));

export function FigmaProcessSection() {
  return (
    <section id="process" className="bg-[#141414] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-100/55 uppercase">
            How we work
          </p>
          <h2
            className="text-2xl font-bold tracking-tight text-neutral-100 md:text-4xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            From problem to{" "}
            <span style={{ color: "var(--warm-orange)" }}>dependable</span> operation.
          </h2>
        </div>

        <ChromaticImageBentoFeatures
          leftFeatures={leftFeatures}
          rightFeatures={rightFeatures}
          imageSrc="/process/green-dither.webp"
          imageAlt="Dithered green mountain valley with a river and village"
        />
      </div>
    </section>
  );
}
