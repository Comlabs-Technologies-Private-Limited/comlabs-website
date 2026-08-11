import { z } from "zod";

export const postStatusSchema = z.enum(["draft", "published"]);

export const caseStudyMediaSchema = z.object({
  src: z.string().describe("Image URL"),
  alt: z.string().describe("Alt text for accessibility"),
  caption: z.string().optional(),
  variant: z.enum(["article", "wide", "full"]).optional(),
  padded: z.boolean().optional(),
});

export const caseStudyHeadlineSchema = z.object({
  before: z.string().optional(),
  highlight: z.string(),
  after: z.string().optional(),
});

export const caseStudyMetaItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
});

export const caseStudySectionSchema = z.object({
  number: z.string(),
  title: z.string(),
  paragraphs: z.array(z.string()).optional(),
  principles: z
    .array(
      z.object({
        number: z.string(),
        text: z.string(),
      }),
    )
    .optional(),
  subsections: z
    .array(
      z.object({
        title: z.string(),
        paragraphs: z.array(z.string()),
        media: caseStudyMediaSchema.optional(),
      }),
    )
    .optional(),
  media: z.union([caseStudyMediaSchema, z.array(caseStudyMediaSchema)]).optional(),
  transformation: z
    .object({
      before: z.array(z.string()),
      after: z.array(z.string()),
    })
    .optional(),
  outcomes: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
});
