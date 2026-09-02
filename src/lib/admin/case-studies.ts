import type { CaseStudy as PrismaCaseStudy, Prisma } from "@prisma/client";
import type {
  CaseStudyContent,
  CaseStudyHeadline,
  CaseStudyMedia,
  CaseStudyMetaItem,
  CaseStudySection,
} from "@/lib/case-studies";
import { CASE_STUDY_ORDER } from "@/lib/case-studies";
import { formialLabsCaseStudy } from "@/lib/case-studies/formial-labs";
import { globalServicesCaseStudy } from "@/lib/case-studies/global-services";
import { radiantCaseStudy } from "@/lib/case-studies/radiant";
import { vithubCaseStudy } from "@/lib/case-studies/vithub";
import { cache } from "react";

import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";
import { buildCaseStudySeo } from "@/lib/seo/auto-metadata";
import { revalidateContentPaths } from "@/lib/seo/revalidate-content";

export type CaseStudyRecord = CaseStudyContent & {
  id: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type CaseStudyPageData = CaseStudyContent & {
  metaTitle: string;
  metaDescription: string;
  updatedAt?: string;
  /** The title was authored in full, so it should bypass the site title template. */
  absoluteTitle?: boolean;
};

function toCaseStudyContent(record: CaseStudyRecord): CaseStudyContent {
  const {
    id: _id,
    status: _status,
    metaTitle: _metaTitle,
    metaDescription: _metaDescription,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...content
  } = record;
  return content;
}

export type CaseStudyInput = {
  slug: string;
  client: string;
  year: string;
  headline: CaseStudyHeadline;
  standfirst?: string;
  meta: CaseStudyMetaItem[];
  leadImage: CaseStudyMedia;
  sections: CaseStudySection[];
  status?: "draft" | "published";
  metaTitle?: string;
  metaDescription?: string;
};

const STATIC_CASE_STUDIES: Record<string, CaseStudyContent> = {
  radiant: radiantCaseStudy,
  "formial-labs": formialLabsCaseStudy,
  "global-services": globalServicesCaseStudy,
  vithub: vithubCaseStudy,
};

function parseJsonField<T>(value: Prisma.JsonValue, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  return value as T;
}

function serializeCaseStudy(record: PrismaCaseStudy): CaseStudyRecord {
  return {
    id: record.id,
    slug: record.slug,
    client: record.client,
    year: record.year,
    headline: parseJsonField<CaseStudyHeadline>(record.headline, {
      highlight: record.client,
    }),
    standfirst: record.standfirst,
    meta: parseJsonField<CaseStudyMetaItem[]>(record.meta, []),
    leadImage: parseJsonField<CaseStudyMedia>(record.leadImage, {
      src: "",
      alt: record.client,
    }),
    sections: parseJsonField<CaseStudySection[]>(record.sections, []),
    status: record.status as "draft" | "published",
    metaTitle: record.metaTitle,
    metaDescription: record.metaDescription,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export function getStaticCaseStudy(slug: string): CaseStudyContent | null {
  return STATIC_CASE_STUDIES[slug] ?? null;
}

export async function getPublishedCaseStudy(slug: string): Promise<CaseStudyContent | null> {
  const page = await getPublishedCaseStudyPage(slug);
  if (!page) return null;
  const { metaTitle: _mt, metaDescription: _md, updatedAt: _u, ...content } = page;
  return content;
}

export async function getPublishedCaseStudyPage(slug: string): Promise<CaseStudyPageData | null> {
  const staticContent = getStaticCaseStudy(slug);
  if (staticContent) {
    const seo = buildCaseStudySeo({
      client: staticContent.client,
      standfirst: staticContent.standfirst,
      headline: staticContent.headline,
      metaTitle: staticContent.metaTitle,
      metaDescription: staticContent.metaDescription,
    });

    return {
      ...staticContent,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      absoluteTitle: Boolean(staticContent.metaTitle),
    };
  }

  try {
    const prisma = getPrisma();
    const record = await prisma.caseStudy.findFirst({
      where: { slug, status: "published" },
    });
    if (record) {
      const serialized = serializeCaseStudy(record);
      const seo = buildCaseStudySeo({
        client: serialized.client,
        standfirst: serialized.standfirst,
        headline: serialized.headline,
        metaTitle: serialized.metaTitle,
        metaDescription: serialized.metaDescription,
      });
      return {
        ...toCaseStudyContent(serialized),
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        updatedAt: serialized.updatedAt,
      };
    }
  } catch {
    // fall through when the database is unavailable
  }

  return null;
}

export async function getPublishedCaseStudySlugs(): Promise<string[]> {
  try {
    const prisma = getPrisma();
    const records = await prisma.caseStudy.findMany({
      where: { status: "published" },
      select: { slug: true },
      orderBy: { updatedAt: "desc" },
    });
    const dbSlugs = records.map((record) => record.slug);
    // Keep static slugs resolvable for existing authored pages and next-links.
    return [...new Set([...dbSlugs, ...Object.keys(STATIC_CASE_STUDIES)])];
  } catch {
    return [...CASE_STUDY_ORDER];
  }
}

export type CaseStudySummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  href: string;
  year: string;
};

function categoryFromMeta(meta: CaseStudyMetaItem[]): string {
  const hit = meta.find((item) =>
    /service|categor|discipline|type|industry/i.test(item.label),
  );
  return hit?.value ?? "Case study";
}

function toSummary(record: {
  slug: string;
  client: string;
  standfirst: string;
  meta: CaseStudyMetaItem[];
  leadImage: { src: string };
  year: string;
}): CaseStudySummary {
  return {
    slug: record.slug,
    title: record.client,
    description: record.standfirst,
    category: categoryFromMeta(record.meta),
    image: record.leadImage.src,
    href: `/work/${record.slug}`,
    year: record.year,
  };
}

function staticCaseStudySummaries(): CaseStudySummary[] {
  return CASE_STUDY_ORDER.map((slug) => toSummary(STATIC_CASE_STUDIES[slug]!));
}

/**
 * Published case studies for homepage / nav / index grids.
 * When MongoDB is configured, returns only `published` DB records (no static merge).
 * Falls back to static authored studies only when the database is unavailable.
 */
export const listPublishedCaseStudySummaries = cache(
  async (): Promise<CaseStudySummary[]> => {
    if (!isDatabaseConfigured()) {
      return staticCaseStudySummaries();
    }

    try {
      const records = await listCaseStudies({ status: "published" });
      return records.map(toSummary);
    } catch {
      return staticCaseStudySummaries();
    }
  },
);

export async function listCaseStudies(options?: {
  status?: "draft" | "published";
}): Promise<CaseStudyRecord[]> {
  const prisma = getPrisma();
  const records = await prisma.caseStudy.findMany({
    where: options?.status ? { status: options.status } : undefined,
    orderBy: { updatedAt: "desc" },
  });
  return records.map(serializeCaseStudy);
}

export async function getCaseStudyById(id: string): Promise<CaseStudyRecord | null> {
  const prisma = getPrisma();
  const record = await prisma.caseStudy.findUnique({ where: { id } });
  return record ? serializeCaseStudy(record) : null;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const prisma = getPrisma();
  const record = await prisma.caseStudy.findFirst({ where: { slug } });
  return record ? serializeCaseStudy(record) : null;
}

export async function resolveCaseStudy(idOrSlug: string): Promise<CaseStudyRecord | null> {
  const byId = await getCaseStudyById(idOrSlug);
  if (byId) return byId;
  return getCaseStudyBySlug(idOrSlug);
}

export async function createCaseStudy(input: CaseStudyInput): Promise<CaseStudyRecord> {
  const prisma = getPrisma();
  const seo = buildCaseStudySeo({
    client: input.client,
    standfirst: input.standfirst,
    headline: input.headline,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
  });
  const slug = input.slug.trim();

  const record = await prisma.caseStudy.create({
    data: {
      slug,
      client: input.client.trim(),
      year: input.year.trim(),
      headline: input.headline as Prisma.InputJsonValue,
      standfirst: input.standfirst ?? "",
      meta: input.meta as Prisma.InputJsonValue,
      leadImage: input.leadImage as Prisma.InputJsonValue,
      sections: input.sections as Prisma.InputJsonValue,
      status: input.status ?? "draft",
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
    },
  });

  revalidateContentPaths({ type: "case-study", slug });
  return serializeCaseStudy(record);
}

export async function updateCaseStudy(
  id: string,
  input: Partial<CaseStudyInput>,
): Promise<CaseStudyRecord | null> {
  const prisma = getPrisma();
  const existing = await prisma.caseStudy.findUnique({ where: { id } });
  if (!existing) return null;

  const client = input.client !== undefined ? input.client.trim() : existing.client;
  const slug = input.slug !== undefined ? input.slug.trim() : existing.slug;
  const headline = input.headline ?? parseJsonField<CaseStudyHeadline>(existing.headline, {
    highlight: existing.client,
  });
  const standfirst = input.standfirst ?? existing.standfirst;
  const seo = buildCaseStudySeo({
    client,
    standfirst,
    headline,
    metaTitle: input.metaTitle ?? existing.metaTitle,
    metaDescription: input.metaDescription ?? existing.metaDescription,
  });

  const record = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...(input.slug !== undefined ? { slug } : {}),
      ...(input.client !== undefined ? { client } : {}),
      ...(input.year !== undefined ? { year: input.year.trim() } : {}),
      ...(input.headline !== undefined
        ? { headline: input.headline as Prisma.InputJsonValue }
        : {}),
      ...(input.standfirst !== undefined ? { standfirst: input.standfirst } : {}),
      ...(input.meta !== undefined ? { meta: input.meta as Prisma.InputJsonValue } : {}),
      ...(input.leadImage !== undefined
        ? { leadImage: input.leadImage as Prisma.InputJsonValue }
        : {}),
      ...(input.sections !== undefined
        ? { sections: input.sections as Prisma.InputJsonValue }
        : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
    },
  });

  revalidateContentPaths({ type: "case-study", slug: existing.slug });
  if (slug !== existing.slug) {
    revalidateContentPaths({ type: "case-study", slug });
  }
  return serializeCaseStudy(record);
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  const prisma = getPrisma();
  try {
    const existing = await prisma.caseStudy.findUnique({ where: { id }, select: { slug: true } });
    await prisma.caseStudy.delete({ where: { id } });
    if (existing?.slug) {
      revalidateContentPaths({ type: "case-study", slug: existing.slug });
    } else {
      revalidateContentPaths({ type: "case-study" });
    }
    return true;
  } catch {
    return false;
  }
}
