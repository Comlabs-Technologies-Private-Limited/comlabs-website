/**
 * Upload every `/public` raster/svg asset (except favicons) to Cloudinary.
 *
 * Requires:
 *   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (or CLOUDINARY_CLOUD_NAME)
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *   NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER (optional, default comlabs-website)
 *
 * Usage: npx tsx scripts/upload-public-to-cloudinary.ts
 */
import { readdir, readFile } from "fs/promises";
import path from "path";

import { config as loadEnv } from "dotenv";

import { publicIdFromLocalPath } from "../src/lib/cloudinary";
import { isCloudinaryUploadConfigured, uploadBufferToCloudinary } from "../src/lib/cloudinary-upload";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });

const PUBLIC_ROOT = path.resolve(process.cwd(), "public");
const SKIP = new Set(["favicon.svg", "favicon.png", "apple-touch-icon.png"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  if (!isCloudinaryUploadConfigured()) {
    console.error(
      "Missing Cloudinary env. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
    process.exit(1);
  }

  const files = (await walk(PUBLIC_ROOT)).filter((file) => {
    const relative = path.relative(PUBLIC_ROOT, file);
    if (SKIP.has(path.basename(file))) return false;
    if (relative.startsWith("google")) return false;
    return IMAGE_EXT.has(path.extname(file).toLowerCase());
  });

  console.log(`Uploading ${files.length} files from public/ …`);

  let failed = 0;
  for (const file of files) {
    const relative = path.relative(PUBLIC_ROOT, file).split(path.sep).join("/");
    const localPath = `/${relative}`;
    const publicId = publicIdFromLocalPath(localPath);
    const ext = path.extname(file).toLowerCase();
    const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream";
    const buffer = await readFile(file);

    try {
      const url = await uploadBufferToCloudinary(buffer, path.basename(file), contentType, publicId);
      console.log(`ok  ${localPath} → ${url}`);
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`fail ${localPath}: ${message}`);
    }
  }

  if (failed > 0) {
    console.error(`Finished with ${failed} failure(s).`);
    process.exit(1);
  }

  console.log("All uploads succeeded.");
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
