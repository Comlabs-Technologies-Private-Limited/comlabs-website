export type PostStatus = "draft" | "published";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
  author: string;
  publishedAt: string | null;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type PostSummary = Omit<Post, "content">;

export type CreatePostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: PostStatus;
  author: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
};

export type UpdatePostInput = Partial<CreatePostInput>;
