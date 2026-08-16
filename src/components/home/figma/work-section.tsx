"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import { PROJECTS } from "@/components/home/figma/home-data";
import { canonicalPath } from "@/lib/site";

export function FigmaWorkSection() {
  return (
    <section id="work" className="border-y border-border bg-card px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Selected work
            </p>
            <h2
              className="text-2xl font-bold tracking-tight md:text-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Recent <span style={{ color: "var(--warm-orange)" }}>projects</span>.
            </h2>
          </div>
          <a
            href={canonicalPath("/work")}
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            View all <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href={canonicalPath(project.href)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group block overflow-hidden rounded-3xl border border-border bg-background transition-colors hover:border-foreground/20"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={`${project.title} website`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-6">
                <div className="mb-1.5 flex items-start justify-between">
                  <h3 className="text-sm font-semibold">{project.title}</h3>
                  <ExternalLink
                    size={13}
                    className="mt-0.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <p className="mb-3 text-xs text-muted-foreground">{project.category}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
                {"liveSiteUrl" in project && project.liveSiteUrl ? (
                  <span className="mt-4 block text-xs text-[var(--warm-orange)]">
                    {new URL(project.liveSiteUrl).hostname}
                  </span>
                ) : null}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
