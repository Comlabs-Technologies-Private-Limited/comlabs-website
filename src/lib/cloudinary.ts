/**
 * Cloudinary delivery for marketing images.
 *
 * Local `/public` photos were uploaded and removed from the repo. Delivery
 * requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME. Favicons stay same-origin.
 *
 * Existing `res.cloudinary.com` URLs always get f_auto/q_auto (and width when
 * requested) regardless of env.
 */

export type MediaTransform = {
  width?: number;
  quality?: number | "auto";
};

const CLOUDINARY_HOST = "https://res.cloudinary.com";

const LOCAL_ONLY_PATHS = new Set([
  "/favicon.svg",
  "/favicon.png",
  "/apple-touch-icon.png",
]);

const LOCAL_ONLY_PREFIXES = ["/media/digital-marketing/", "/illustrations/"] as const;

function isLocalStaticAsset(src: string): boolean {
  const path = src.split("?")[0] ?? src;
  if (LOCAL_ONLY_PATHS.has(path)) return true;
  return LOCAL_ONLY_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export const HERO_BACKGROUND_PATH = "/hero/hero-bg.png";

export function getCloudinaryCloudName(): string | undefined {
  const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  return name || undefined;
}

export function getCloudinaryAssetsFolder(): string {
  return (process.env.NEXT_PUBLIC_CLOUDINARY_ASSETS_FOLDER ?? "comlabs-website")
    .trim()
    .replace(/^\/+|\/+$/g, "");
}

export function isCloudinaryDeliveryEnabled(): boolean {
  return Boolean(getCloudinaryCloudName());
}

export function isCloudinaryDeliveryUrl(src: string): boolean {
  return /^https:\/\/res\.cloudinary\.com\//i.test(src);
}

function isAbsoluteUrl(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

function isSvgSrc(src: string): boolean {
  const path = src.split("?")[0] ?? src;
  return path.toLowerCase().endsWith(".svg");
}

/** `/hero/hero-bg.png` → `comlabs-website/hero/hero-bg` */
export function publicIdFromLocalPath(localPath: string): string {
  const folder = getCloudinaryAssetsFolder();
  const cleaned = localPath.replace(/^\//, "").split("?")[0] ?? localPath;
  const withoutExt = cleaned.replace(/\.[a-z0-9]+$/i, "");
  return `${folder}/${withoutExt}`;
}

function transformSegment(src: string, options: MediaTransform): string {
  const parts: string[] = [];
  if (!isSvgSrc(src)) {
    parts.push("f_auto");
    const quality = options.quality ?? "auto";
    parts.push(`q_${quality}`);
  }
  if (options.width && options.width > 0) {
    parts.push(`c_limit`, `w_${Math.round(options.width)}`);
  }
  return parts.join(",");
}

function withCloudinaryTransforms(src: string, options: MediaTransform): string {
  const match = src.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/i,
  );
  if (!match) return src;

  const prefix = match[1];
  const rest = match[2];
  if (!prefix || !rest) return src;

  const segments = rest.split("/");
  let index = 0;
  while (index < segments.length && looksLikeTransform(segments[index] ?? "")) {
    index += 1;
  }
  const remainder = segments.slice(index).join("/");
  const transforms = transformSegment(src, options);
  if (!transforms) return `${prefix}${remainder}`;
  return `${prefix}${transforms}/${remainder}`;
}

function looksLikeTransform(segment: string): boolean {
  if (/^v\d+$/.test(segment)) return false;
  return segment.includes(",") || /^[a-z]+_/.test(segment);
}

/**
 * Resolve a site image src to a Cloudinary URL when delivery is configured.
 * Leaves other remote hosts (Blob, LinkedIn, client CDNs) unchanged.
 */
export function mediaUrl(src: string, options: MediaTransform = {}): string {
  if (!src || src.startsWith("data:") || src.startsWith("blob:")) return src;

  if (isCloudinaryDeliveryUrl(src)) {
    return withCloudinaryTransforms(src, options);
  }

  if (isAbsoluteUrl(src)) return src;
  if (isLocalStaticAsset(src)) return src;

  const cloud = getCloudinaryCloudName();
  if (!cloud) return src;

  const transforms = transformSegment(src, options);
  const publicId = publicIdFromLocalPath(src);
  if (!transforms) {
    return `${CLOUDINARY_HOST}/${cloud}/image/upload/${publicId}`;
  }
  return `${CLOUDINARY_HOST}/${cloud}/image/upload/${transforms}/${publicId}`;
}

/** Absolute URL for JSON-LD, Open Graph, and other crawlers. */
export function absoluteMediaUrl(src: string, origin: string, options: MediaTransform = {}): string {
  const resolved = mediaUrl(src, options);
  if (isAbsoluteUrl(resolved)) return resolved;
  const path = resolved.startsWith("/") ? resolved : `/${resolved}`;
  return `${origin.replace(/\/$/, "")}${path}`;
}

/** CSS `background-image` layer: overlay gradient plus a resolved photo URL. */
export function layeredBackgroundImage(overlay: string, imageSrc: string): string {
  return `${overlay}, url(${JSON.stringify(mediaUrl(imageSrc))})`;
}
