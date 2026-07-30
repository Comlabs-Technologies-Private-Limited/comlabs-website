import mongoose, { type Document, type Model, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: "draft" | "published";
  author: string;
  publishedAt: Date | null;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    tags: [{ type: String }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    author: { type: String, default: "Comlabs" },
    publishedAt: { type: Date, default: null },
    readingTime: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

PostSchema.index({ slug: 1 });
PostSchema.index({ status: 1 });

export const Post: Model<IPost> =
  mongoose.models.Post ?? mongoose.model<IPost>("Post", PostSchema);
