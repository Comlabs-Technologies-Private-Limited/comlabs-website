import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import {
  createCaseStudy,
  deleteCaseStudy,
  listCaseStudies,
  resolveCaseStudy,
  updateCaseStudy,
} from "@/lib/admin/case-studies";
import {
  createPost,
  deletePost,
  listPosts,
  resolvePost,
  updatePost,
} from "@/lib/admin/posts";
import { isDatabaseConfigured } from "@/lib/prisma";
import { mcpError, mcpTextResult } from "@/lib/mcp/response";
import { sanitizeBlogHtml } from "@/lib/mcp/sanitize";
import {
  caseStudyHeadlineSchema,
  caseStudyMediaSchema,
  caseStudyMetaItemSchema,
  caseStudySectionSchema,
  postStatusSchema,
} from "@/lib/mcp/schemas";
import {
  isImageUploadConfigured,
  uploadImageFromBase64,
  uploadImageFromUrl,
} from "@/lib/mcp/upload-image";

function requireDatabase() {
  if (!isDatabaseConfigured()) {
    throw new Error("MONGODB_URI is not configured.");
  }
}

export function registerComlabsMcpTools(server: McpServer): void {
  server.registerTool(
    "list_posts",
    {
      title: "List blog posts",
      description:
        "List blog posts from the Comlabs admin panel. Optionally filter by status or search by title/slug.",
      inputSchema: z.object({
        status: postStatusSchema.optional().describe("Filter by draft or published"),
        search: z.string().optional().describe("Search title or slug"),
      }),
    },
    async ({ status, search }) => {
      try {
        requireDatabase();
        const posts = await listPosts({ status, search });
        return mcpTextResult({ count: posts.length, posts }, "Blog posts");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to list posts.");
      }
    },
  );

  server.registerTool(
    "get_post",
    {
      title: "Get blog post",
      description: "Fetch a single blog post by MongoDB id or slug.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Post id or slug"),
      }),
    },
    async ({ idOrSlug }) => {
      try {
        requireDatabase();
        const post = await resolvePost(idOrSlug);
        if (!post) return mcpError(`Post not found: ${idOrSlug}`);
        return mcpTextResult(post, "Blog post");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to fetch post.");
      }
    },
  );

  server.registerTool(
    "create_draft_post",
    {
      title: "Create blog post",
      description:
        "Create a blog post in the Comlabs CMS via API (no browser login needed). Content should be HTML. SEO fields auto-generate when omitted. Defaults to draft.",
      inputSchema: z.object({
        title: z.string().describe("Post title"),
        slug: z.string().optional().describe("URL slug; auto-generated from title if omitted"),
        excerpt: z.string().optional(),
        content: z.string().optional().describe("HTML body content"),
        coverImage: z.string().optional().describe("Cover image URL"),
        tags: z.array(z.string()).optional(),
        status: postStatusSchema.optional().describe("Defaults to draft"),
        author: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonicalUrl: z.string().optional(),
      }),
    },
    async (input) => {
      try {
        requireDatabase();
        const post = await createPost({
          ...input,
          content: input.content ? sanitizeBlogHtml(input.content) : undefined,
          status: input.status ?? "draft",
        });
        return mcpTextResult(post, "Created blog post");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to create post.");
      }
    },
  );

  server.registerTool(
    "update_post",
    {
      title: "Update blog post",
      description: "Update an existing blog post by id or slug.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Post id or slug"),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional().describe("HTML body content"),
        coverImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        status: postStatusSchema.optional(),
        author: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
        ogImage: z.string().optional(),
        canonicalUrl: z.string().optional(),
      }),
    },
    async ({ idOrSlug, content, ...fields }) => {
      try {
        requireDatabase();
        const existing = await resolvePost(idOrSlug);
        if (!existing) return mcpError(`Post not found: ${idOrSlug}`);

        const post = await updatePost(existing._id, {
          ...fields,
          ...(content !== undefined ? { content: sanitizeBlogHtml(content) } : {}),
        });
        if (!post) return mcpError(`Post not found: ${idOrSlug}`);
        return mcpTextResult(post, "Updated blog post");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to update post.");
      }
    },
  );

  server.registerTool(
    "publish_post",
    {
      title: "Publish or unpublish blog post",
      description: "Set a blog post status to published or draft.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Post id or slug"),
        status: postStatusSchema.describe("published or draft"),
      }),
    },
    async ({ idOrSlug, status }) => {
      try {
        requireDatabase();
        const existing = await resolvePost(idOrSlug);
        if (!existing) return mcpError(`Post not found: ${idOrSlug}`);

        const post = await updatePost(existing._id, { status });
        if (!post) return mcpError(`Post not found: ${idOrSlug}`);
        return mcpTextResult(post, `Post status set to ${status}`);
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to update post status.");
      }
    },
  );

  server.registerTool(
    "delete_post",
    {
      title: "Delete blog post",
      description: "Permanently delete a blog post by id or slug. This cannot be undone.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Post id or slug"),
      }),
    },
    async ({ idOrSlug }) => {
      try {
        requireDatabase();
        const existing = await resolvePost(idOrSlug);
        if (!existing) return mcpError(`Post not found: ${idOrSlug}`);

        const deleted = await deletePost(existing._id);
        if (!deleted) return mcpError(`Post not found: ${idOrSlug}`);
        return mcpTextResult({ ok: true, id: existing._id, slug: existing.slug }, "Deleted blog post");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to delete post.");
      }
    },
  );

  server.registerTool(
    "list_case_studies",
    {
      title: "List case studies",
      description: "List case studies from the Comlabs admin panel.",
      inputSchema: z.object({
        status: postStatusSchema.optional().describe("Filter by draft or published"),
      }),
    },
    async ({ status }) => {
      try {
        requireDatabase();
        const caseStudies = await listCaseStudies({ status });
        return mcpTextResult({ count: caseStudies.length, caseStudies }, "Case studies");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to list case studies.");
      }
    },
  );

  server.registerTool(
    "get_case_study",
    {
      title: "Get case study",
      description: "Fetch a single case study by MongoDB id or slug.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Case study id or slug"),
      }),
    },
    async ({ idOrSlug }) => {
      try {
        requireDatabase();
        const caseStudy = await resolveCaseStudy(idOrSlug);
        if (!caseStudy) return mcpError(`Case study not found: ${idOrSlug}`);
        return mcpTextResult(caseStudy, "Case study");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to fetch case study.");
      }
    },
  );

  server.registerTool(
    "create_case_study",
    {
      title: "Create case study",
      description:
        "Create a case study (draft by default). Use upload_image tools first to host images, then pass URLs in leadImage and sections.",
      inputSchema: z.object({
        slug: z.string().describe("URL slug, e.g. formial-labs"),
        client: z.string().describe("Client name"),
        year: z.string().describe("Project year, e.g. 2025"),
        headline: caseStudyHeadlineSchema,
        standfirst: z.string().optional(),
        meta: z.array(caseStudyMetaItemSchema),
        leadImage: caseStudyMediaSchema,
        sections: z.array(caseStudySectionSchema),
        status: postStatusSchema.optional().describe("Defaults to draft"),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }),
    },
    async (input) => {
      try {
        requireDatabase();
        const caseStudy = await createCaseStudy({
          ...input,
          status: input.status ?? "draft",
        });
        return mcpTextResult(caseStudy, "Created case study");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to create case study.");
      }
    },
  );

  server.registerTool(
    "update_case_study",
    {
      title: "Update case study",
      description: "Update an existing case study by id or slug. Only include fields to change.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Case study id or slug"),
        slug: z.string().optional(),
        client: z.string().optional(),
        year: z.string().optional(),
        headline: caseStudyHeadlineSchema.optional(),
        standfirst: z.string().optional(),
        meta: z.array(caseStudyMetaItemSchema).optional(),
        leadImage: caseStudyMediaSchema.optional(),
        sections: z.array(caseStudySectionSchema).optional(),
        status: postStatusSchema.optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }),
    },
    async ({ idOrSlug, ...fields }) => {
      try {
        requireDatabase();
        const existing = await resolveCaseStudy(idOrSlug);
        if (!existing) return mcpError(`Case study not found: ${idOrSlug}`);

        const caseStudy = await updateCaseStudy(existing.id, fields);
        if (!caseStudy) return mcpError(`Case study not found: ${idOrSlug}`);
        return mcpTextResult(caseStudy, "Updated case study");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to update case study.");
      }
    },
  );

  server.registerTool(
    "publish_case_study",
    {
      title: "Publish or unpublish case study",
      description: "Set a case study status to published or draft.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Case study id or slug"),
        status: postStatusSchema.describe("published or draft"),
      }),
    },
    async ({ idOrSlug, status }) => {
      try {
        requireDatabase();
        const existing = await resolveCaseStudy(idOrSlug);
        if (!existing) return mcpError(`Case study not found: ${idOrSlug}`);

        const caseStudy = await updateCaseStudy(existing.id, { status });
        if (!caseStudy) return mcpError(`Case study not found: ${idOrSlug}`);
        return mcpTextResult(caseStudy, `Case study status set to ${status}`);
      } catch (error) {
        return mcpError(
          error instanceof Error ? error.message : "Failed to update case study status.",
        );
      }
    },
  );

  server.registerTool(
    "delete_case_study",
    {
      title: "Delete case study",
      description: "Permanently delete a case study by id or slug. This cannot be undone.",
      inputSchema: z.object({
        idOrSlug: z.string().describe("Case study id or slug"),
      }),
    },
    async ({ idOrSlug }) => {
      try {
        requireDatabase();
        const existing = await resolveCaseStudy(idOrSlug);
        if (!existing) return mcpError(`Case study not found: ${idOrSlug}`);

        const deleted = await deleteCaseStudy(existing.id);
        if (!deleted) return mcpError(`Case study not found: ${idOrSlug}`);
        return mcpTextResult(
          { ok: true, id: existing.id, slug: existing.slug },
          "Deleted case study",
        );
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to delete case study.");
      }
    },
  );

  server.registerTool(
    "upload_image_from_url",
    {
      title: "Upload image from URL",
      description:
        "Download an image from a public URL and store it in Cloudinary (or Vercel Blob if Cloudinary is unset). Returns a permanent URL.",
      inputSchema: z.object({
        url: z.string().url().describe("Public image URL to fetch"),
        filename: z.string().optional().describe("Optional filename, e.g. formial-hero.jpg"),
      }),
    },
    async ({ url, filename }) => {
      try {
        if (!isImageUploadConfigured()) {
          return mcpError("Cloudinary or BLOB_READ_WRITE_TOKEN is not configured for image uploads.");
        }
        const result = await uploadImageFromUrl(url, filename);
        return mcpTextResult(result, "Image uploaded");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to upload image.");
      }
    },
  );

  server.registerTool(
    "upload_image",
    {
      title: "Upload image from base64",
      description:
        "Upload raw base64 image data to Cloudinary (or Vercel Blob if Cloudinary is unset). Returns a permanent URL.",
      inputSchema: z.object({
        base64: z.string().describe("Base64-encoded image data (with or without data: prefix)"),
        filename: z.string().describe("Filename with extension, e.g. cover.jpg"),
        contentType: z
          .string()
          .optional()
          .describe("MIME type, e.g. image/png. Defaults to image/jpeg"),
      }),
    },
    async ({ base64, filename, contentType }) => {
      try {
        if (!isImageUploadConfigured()) {
          return mcpError("Cloudinary or BLOB_READ_WRITE_TOKEN is not configured for image uploads.");
        }
        const result = await uploadImageFromBase64(base64, filename, contentType ?? "image/jpeg");
        return mcpTextResult(result, "Image uploaded");
      } catch (error) {
        return mcpError(error instanceof Error ? error.message : "Failed to upload image.");
      }
    },
  );
}
