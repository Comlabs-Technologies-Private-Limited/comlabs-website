import { put } from "@vercel/blob";

export function isImageUploadConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function sanitizeFilename(filename: string): string {
  return filename
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string,
  contentType: string,
): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  const safeName = sanitizeFilename(filename) || `image-${Date.now()}.jpg`;
  const pathname = safeName.startsWith("uploads/") ? safeName : `uploads/${safeName}`;

  const blob = await put(pathname, buffer, {
    access: "public",
    token,
    contentType,
  });

  return blob.url;
}

export async function uploadImageFromUrl(
  url: string,
  filename?: string,
): Promise<{ url: string; contentType: string; sizeBytes: number }> {
  const response = await fetch(url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to fetch image (${response.status}) from ${url}`);
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  if (!contentType.startsWith("image/")) {
    throw new Error(`URL did not return an image (content-type: ${contentType})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error("Fetched image was empty.");
  }

  const derivedName =
    filename ??
    url.split("/").pop()?.split("?")[0] ??
    `image-${Date.now()}.${contentType.split("/")[1] ?? "jpg"}`;

  const uploadedUrl = await uploadImageBuffer(buffer, derivedName, contentType);

  return {
    url: uploadedUrl,
    contentType,
    sizeBytes: buffer.length,
  };
}

export async function uploadImageFromBase64(
  base64: string,
  filename: string,
  contentType = "image/jpeg",
): Promise<{ url: string; contentType: string; sizeBytes: number }> {
  const normalized = base64.includes(",") ? base64.split(",").pop() ?? "" : base64;
  const buffer = Buffer.from(normalized, "base64");

  if (buffer.length === 0) {
    throw new Error("Base64 image data was empty or invalid.");
  }

  const uploadedUrl = await uploadImageBuffer(buffer, filename, contentType);

  return {
    url: uploadedUrl,
    contentType,
    sizeBytes: buffer.length,
  };
}
