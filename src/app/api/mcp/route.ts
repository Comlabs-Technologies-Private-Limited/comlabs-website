import { NextRequest } from "next/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/db";
import { Post } from "@/models/post";
import {
  calcReadingTime,
  serializePost,
  serializePostSummary,
  slugify,
} from "@/lib/post-utils";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "pre",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "width", "height", "loading"],
    code: ["class"],
    span: ["class"],
    pre: ["class"],
  },
};

function checkAuth(request: Request): Response | null {
  const apiKey = process.env.MCP_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "MCP_API_KEY is not configured on the server" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${apiKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
  return null;
}

function createMcpServer(): McpServer {
  const server = new McpServer({ name: "comlabs-blog", version: "1.0.0" });

  server.registerTool(
    "list_posts",
    {
      description:
        "List blog posts. Returns id, slug, title, status, excerpt, tags, author, publishedAt, readingTime, and timestamps for each post.",
      inputSchema: {
        status: z
          .enum(["draft", "published"])
          .optional()
          .describe("Filter by post status. Omit to return all."),
        search: z
          .string()
          .optional()
          .describe("Keyword search across title, excerpt, and tags."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(20)
          .describe("Maximum number of posts to return (1–50, default 20)."),
      },
    },
    async (args) => {
      await connectDB();
      const filter: Record<string, unknown> = {};
      if (args.status) filter.status = args.status;
      if (args.search)
        filter.$or = [
          { title: { $regex: args.search, $options: "i" } },
          { excerpt: { $regex: args.search, $options: "i" } },
          { tags: { $regex: args.search, $options: "i" } },
        ];
      const [docs, total] = await Promise.all([
        Post.find(filter)
          .select("-content")
          .sort({ updatedAt: -1 })
          .limit(args.limit)
          .lean(),
        Post.countDocuments(filter),
      ]);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({
              posts: docs.map((p) =>
                serializePostSummary(
                  p as Parameters<typeof serializePostSummary>[0]
                )
              ),
              total,
            }),
          },
        ],
      };
    }
  );

  server.registerTool(
    "create_draft_post",
    {
      description:
        "Create a new blog post saved as a draft. HTML content is sanitized server-side. Returns the full post object including the generated _id and slug.",
      inputSchema: {
        title: z.string().min(1).describe("Post title (required)."),
        content: z
          .string()
          .describe(
            "Post body as HTML. Supports h2, h3, h4, p, ul, ol, blockquote, code, pre, img tags."
          ),
        excerpt: z
          .string()
          .optional()
          .describe("Short description for post cards and meta tags."),
        tags: z
          .array(z.string())
          .optional()
          .describe("List of topic tags, e.g. ['Next.js', 'TypeScript']."),
        author: z
          .string()
          .optional()
          .describe("Author display name. Defaults to 'Comlabs'."),
        slug: z
          .string()
          .optional()
          .describe(
            "URL-friendly slug. Auto-generated from title if omitted."
          ),
        coverImage: z
          .string()
          .optional()
          .describe("Absolute URL of the cover image."),
        metaTitle: z
          .string()
          .optional()
          .describe("SEO <title> tag. Defaults to post title."),
        metaDescription: z
          .string()
          .optional()
          .describe("SEO meta description. Defaults to excerpt."),
        ogImage: z
          .string()
          .optional()
          .describe(
            "OpenGraph image URL for social sharing. Defaults to coverImage."
          ),
      },
    },
    async (args) => {
      await connectDB();
      const postSlug = args.slug?.trim()
        ? slugify(args.slug)
        : slugify(args.title);
      const existing = await Post.findOne({ slug: postSlug }).lean();
      if (existing) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error: a post with slug "${postSlug}" already exists. Provide a different slug or title.`,
            },
          ],
          isError: true,
        };
      }
      const cleanContent = sanitizeHtml(args.content, SANITIZE_OPTIONS);
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "https://comlabstechnologies.com";
      const post = await Post.create({
        title: args.title.trim(),
        slug: postSlug,
        excerpt: args.excerpt?.trim() ?? "",
        content: cleanContent,
        coverImage: args.coverImage?.trim() ?? "",
        tags: (args.tags ?? []).map((t) => t.trim()).filter(Boolean),
        status: "draft",
        author: args.author?.trim() || "Comlabs",
        publishedAt: null,
        readingTime: calcReadingTime(cleanContent),
        metaTitle: args.metaTitle?.trim() || args.title.trim(),
        metaDescription:
          args.metaDescription?.trim() || args.excerpt?.trim() || "",
        ogImage: args.ogImage?.trim() || args.coverImage?.trim() || "",
        canonicalUrl: `${siteUrl}/blog/${postSlug}`,
      });
      return {
        content: [{ type: "text" as const, text: JSON.stringify(serializePost(post)) }],
      };
    }
  );

  server.registerTool(
    "update_post",
    {
      description:
        "Update fields of an existing post. Provide either id (MongoDB _id) or slug to identify the post. Only supplied fields are changed. Revalidates the public blog cache if the post is published.",
      inputSchema: {
        id: z
          .string()
          .optional()
          .describe("MongoDB _id of the post to update."),
        slug: z
          .string()
          .optional()
          .describe("URL slug of the post (alternative to id)."),
        title: z.string().optional().describe("New title."),
        content: z.string().optional().describe("New body HTML."),
        excerpt: z.string().optional().describe("New short description."),
        tags: z
          .array(z.string())
          .optional()
          .describe("Replacement tag list (replaces all existing tags)."),
        author: z.string().optional().describe("New author name."),
        coverImage: z.string().optional().describe("New cover image URL."),
        metaTitle: z.string().optional().describe("New SEO title."),
        metaDescription: z
          .string()
          .optional()
          .describe("New SEO meta description."),
        ogImage: z.string().optional().describe("New OpenGraph image URL."),
        canonicalUrl: z
          .string()
          .optional()
          .describe("New canonical URL (overrides the auto-generated one)."),
      },
    },
    async (args) => {
      if (!args.id && !args.slug) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: provide either id or slug to identify the post.",
            },
          ],
          isError: true,
        };
      }
      await connectDB();
      const post = args.id
        ? await Post.findById(args.id)
        : await Post.findOne({ slug: args.slug });
      if (!post) {
        return {
          content: [{ type: "text" as const, text: "Error: post not found." }],
          isError: true,
        };
      }
      if (args.title !== undefined) post.title = args.title.trim();
      if (args.excerpt !== undefined) post.excerpt = args.excerpt.trim();
      if (args.content !== undefined) {
        const clean = sanitizeHtml(args.content, SANITIZE_OPTIONS);
        post.content = clean;
        post.readingTime = calcReadingTime(clean);
      }
      if (args.tags !== undefined)
        post.tags = args.tags.map((t) => t.trim()).filter(Boolean);
      if (args.author !== undefined) post.author = args.author.trim();
      if (args.coverImage !== undefined)
        post.coverImage = args.coverImage.trim();
      if (args.metaTitle !== undefined) post.metaTitle = args.metaTitle.trim();
      if (args.metaDescription !== undefined)
        post.metaDescription = args.metaDescription.trim();
      if (args.ogImage !== undefined) post.ogImage = args.ogImage.trim();
      if (args.canonicalUrl !== undefined)
        post.canonicalUrl = args.canonicalUrl.trim();
      await post.save();
      if (post.status === "published") {
        revalidatePath("/blog");
        revalidatePath(`/blog/${post.slug}`);
      }
      return {
        content: [{ type: "text" as const, text: JSON.stringify(serializePost(post)) }],
      };
    }
  );

  server.registerTool(
    "publish_post",
    {
      description:
        "Publish a draft post or revert a published post back to draft. Automatically revalidates the public blog cache.",
      inputSchema: {
        id: z
          .string()
          .optional()
          .describe("MongoDB _id of the post to publish."),
        slug: z
          .string()
          .optional()
          .describe("URL slug of the post (alternative to id)."),
        publish: z
          .boolean()
          .default(true)
          .describe(
            "true (default) to publish; false to revert to draft status."
          ),
      },
    },
    async (args) => {
      if (!args.id && !args.slug) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: provide either id or slug to identify the post.",
            },
          ],
          isError: true,
        };
      }
      await connectDB();
      const post = args.id
        ? await Post.findById(args.id)
        : await Post.findOne({ slug: args.slug });
      if (!post) {
        return {
          content: [{ type: "text" as const, text: "Error: post not found." }],
          isError: true,
        };
      }
      const publishing = args.publish !== false;
      post.status = publishing ? "published" : "draft";
      if (publishing && !post.publishedAt) post.publishedAt = new Date();
      await post.save();
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
      return {
        content: [
          {
            type: "text" as const,
            text: `Post "${post.title}" (slug: ${post.slug}) is now ${post.status}.`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "delete_post",
    {
      description:
        "Permanently delete a post by id or slug. This action is irreversible — there is no soft-delete or trash.",
      inputSchema: {
        id: z
          .string()
          .optional()
          .describe("MongoDB _id of the post to delete."),
        slug: z
          .string()
          .optional()
          .describe("URL slug of the post (alternative to id)."),
      },
    },
    async (args) => {
      if (!args.id && !args.slug) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Error: provide either id or slug to identify the post.",
            },
          ],
          isError: true,
        };
      }
      await connectDB();
      const post = args.id
        ? await Post.findByIdAndDelete(args.id)
        : await Post.findOneAndDelete({ slug: args.slug });
      if (!post) {
        return {
          content: [{ type: "text" as const, text: "Error: post not found." }],
          isError: true,
        };
      }
      revalidatePath("/blog");
      revalidatePath(`/blog/${post.slug}`);
      return {
        content: [
          {
            type: "text" as const,
            text: `Post "${post.title}" (slug: ${post.slug}) has been permanently deleted.`,
          },
        ],
      };
    }
  );

  return server;
}

async function handleMcp(request: NextRequest): Promise<Response> {
  const authError = checkAuth(request);
  if (authError) return authError;

  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });
  const server = createMcpServer();
  await server.connect(transport);
  return transport.handleRequest(request);
}

export const GET = handleMcp;
export const POST = handleMcp;
export const DELETE = handleMcp;
