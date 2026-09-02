import { CareersForm } from "@/components/careers/careers-form";
import { FigmaNav, type NavCaseStudyItem } from "@/components/layout/figma-nav";
import { HERO_BACKGROUND_PATH, mediaUrl } from "@/lib/cloudinary";

const BACKGROUND_IMAGE = HERO_BACKGROUND_PATH;

type CareersPageProps = {
  caseStudies?: NavCaseStudyItem[];
};

export function CareersPage({ caseStudies }: CareersPageProps) {
  return (
    <div
      className="min-h-screen bg-background text-foreground antialiased"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <FigmaNav caseStudies={caseStudies} />

      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative flex md:min-h-screen flex-col justify-end px-8 py-12 lg:min-h-0 lg:px-12 lg:py-28">
          <img
            src={mediaUrl(BACKGROUND_IMAGE)}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(28,25,23,0.15) 0%, rgba(28,25,23,0.55) 55%, rgba(28,25,23,0.82) 100%)",
            }}
          />

          <div className="relative z-10 max-w-lg">
            <p
              className="mb-4 text-xs font-semibold tracking-[0.14em] uppercase"
              style={{ color: "rgba(247,247,244,0.5)" }}
            >
              Careers
            </p>
            <blockquote
              className="text-2xl leading-[1.2] font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--background)", letterSpacing: "-0.03em" }}
            >
              &ldquo;Build with a studio that ships. Tell us what you want to work on.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(247,247,244,0.55)" }}>
              Comlabs Technologies Pvt Ltd · Pune, Maharashtra, India
            </p>
          </div>
        </div>

        <div className="flex items-center px-6 py-12 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-md">
            <h1
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Apply to Comlabs.
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              We&apos;re a design and engineering studio in Pune. We hire people who can design,
              write, and ship work that holds up in production. Send a note — we read every
              application.
            </p>

            <div className="mt-10">
              <CareersForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
