import type { CaseStudy as PrismaCaseStudy, Prisma } from "@/generated/prisma/client";
import type {
  CaseStudyContent,
  CaseStudyHeadline,
  CaseStudyMedia,
  CaseStudyMetaItem,
  CaseStudySection,
} from "@/lib/case-studies";
import { formialLabsCaseStudy } from "@/lib/case-studies/formial-labs";
import { globalServicesCaseStudy } from "@/lib/case-studies/global-services";
import { vithubCaseStudy } from "@/lib/case-studies/vithub";
import { getPrisma } from "@/lib/prisma";

export type CaseStudyRecord = CaseStudyContent & {
  id: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
};

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
  try {
    const prisma = getPrisma();
    const record = await prisma.caseStudy.findFirst({
      where: { slug, status: "published" },
    });
    if (record) {
      const serialized = serializeCaseStudy(record);
      const { id: _id, status: _status, metaTitle: _mt, metaDescription: _md, createdAt: _c, updatedAt: _u, ...content } =
        serialized;
      return content;
    }
  } catch {
    // fall through to static content
  }

  return getStaticCaseStudy(slug);
}

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

export async function createCaseStudy(input: CaseStudyInput): Promise<CaseStudyRecord> {
  const prisma = getPrisma();
  const record = await prisma.caseStudy.create({
    data: {
      slug: input.slug.trim(),
      client: input.client.trim(),
      year: input.year.trim(),
      headline: input.headline as Prisma.InputJsonValue,
      standfirst: input.standfirst ?? "",
      meta: input.meta as Prisma.InputJsonValue,
      leadImage: input.leadImage as Prisma.InputJsonValue,
      sections: input.sections as Prisma.InputJsonValue,
      status: input.status ?? "draft",
      metaTitle: input.metaTitle ?? "",
      metaDescription: input.metaDescription ?? "",
    },
  });
  return serializeCaseStudy(record);
}

export async function updateCaseStudy(
  id: string,
  input: Partial<CaseStudyInput>,
): Promise<CaseStudyRecord | null> {
  const prisma = getPrisma();
  const existing = await prisma.caseStudy.findUnique({ where: { id } });
  if (!existing) return null;

  const record = await prisma.caseStudy.update({
    where: { id },
    data: {
      ...(input.slug !== undefined ? { slug: input.slug.trim() } : {}),
      ...(input.client !== undefined ? { client: input.client.trim() } : {}),
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
      ...(input.metaTitle !== undefined ? { metaTitle: input.metaTitle } : {}),
      ...(input.metaDescription !== undefined ? { metaDescription: input.metaDescription } : {}),
    },
  });

  return serializeCaseStudy(record);
}

export async function deleteCaseStudy(id: string): Promise<boolean> {
  const prisma = getPrisma();
  try {
    await prisma.caseStudy.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
