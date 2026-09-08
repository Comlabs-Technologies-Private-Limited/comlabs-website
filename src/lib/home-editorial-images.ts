/**
 * Editorial photography referenced directly from Unsplash for the homepage
 * Services / Proof hairline-grid regions. Nothing is downloaded or stored
 * locally; the photo page URLs below are the source of record and the
 * runtime `src` is derived from the photo id.
 */

export const editorialImages = {
  productScenes:
    "https://unsplash.com/photos/sunlit-hallway-with-geometric-shadows-on-the-floor-W-YxclaXSoc",
  motion:
    "https://unsplash.com/photos/brutalist-architecture-with-arched-ceilings-and-sunlight-P5IyVUkdwxw",
  lagoonTexture:
    "https://unsplash.com/photos/dark-teal-ocean-water-with-white-foamy-waves-WOqbsCLGWDY",
} as const;

export type EditorialImageKey = keyof typeof editorialImages;

/** `…-W-YxclaXSoc` → `W-YxclaXSoc` (Unsplash photo ids are 11 characters). */
export function unsplashPhotoId(photoPageUrl: string): string {
  const path = photoPageUrl.split("?")[0]?.replace(/\/+$/, "") ?? photoPageUrl;
  const slug = path.slice(path.lastIndexOf("/") + 1);
  return slug.slice(-11);
}

/**
 * Direct image `src` for an Unsplash photo page URL. Uses Unsplash's
 * id-based image endpoint (redirects to the CDN file) so the page URL
 * itself is never used as a link.
 */
export function editorialImageSrc(photoPageUrl: string, width = 1600): string {
  const id = unsplashPhotoId(photoPageUrl);
  return `https://unsplash.com/photos/${id}/download?force=true&w=${width}`;
}

/**
 * Shared shell for the homepage hairline-grid collections:
 * desktop min(100% - 64px, 1440px), tablet min(100% - 48px, 1240px),
 * mobile 100% - 40px — centred, with 24px inner breathing room.
 */
export const EDITORIAL_SHELL_CLASS =
  "mx-auto w-[calc(100%-40px)] p-6 md:w-[min(calc(100%-48px),1240px)] lg:w-[min(calc(100%-64px),1440px)]";
