import { createHash } from "crypto";

function cloudName(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() ||
    process.env.CLOUDINARY_CLOUD_NAME?.trim() ||
    undefined
  );
}

export function isCloudinaryUploadConfigured(): boolean {
  return Boolean(
    cloudName() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

function assetsFolder(): string {
  return (process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER ?? "comlabs-website")
    .trim()
    .replace(/^\/+|\/+$/g, "");
}

function sign(params: Record<string, string>, apiSecret: string): string {
  const payload =
    Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&") + apiSecret;
  return createHash("sha1").update(payload).digest("hex");
}

function publicIdForUpload(filename: string): string {
  const folder = assetsFolder();
  const cleaned = filename
    .trim()
    .replace(/^\/+/, "")
    .replace(/^uploads\//, "")
    .replace(/\.[a-z0-9]+$/i, "");
  const safe = cleaned.replace(/[^a-zA-Z0-9/_-]+/g, "-").replace(/^-+|-+$/g, "");
  return `${folder}/uploads/${safe || `image-${Date.now()}`}`;
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  filename: string,
  contentType: string,
  publicId?: string,
): Promise<string> {
  const name = cloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
  if (!name || !apiKey || !apiSecret) {
    throw new Error("Cloudinary upload env is not configured.");
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const id = publicId ?? publicIdForUpload(filename);
  const params = {
    invalidate: "true",
    overwrite: "true",
    public_id: id,
    timestamp,
  };
  const signature = sign(params, apiSecret);

  const body = new FormData();
  body.append("file", new Blob([new Uint8Array(buffer)], { type: contentType }), filename);
  body.append("api_key", apiKey);
  body.append("timestamp", timestamp);
  body.append("signature", signature);
  body.append("public_id", id);
  body.append("overwrite", "true");
  body.append("invalidate", "true");

  const response = await fetch(`https://api.cloudinary.com/v1_1/${name}/image/upload`, {
    method: "POST",
    body,
  });

  const payload = (await response.json()) as { secure_url?: string; error?: { message?: string } };
  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message ?? `Cloudinary upload failed (${response.status})`);
  }

  return payload.secure_url;
}
