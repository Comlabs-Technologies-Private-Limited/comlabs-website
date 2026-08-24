export const DM = {
  bg: "#141414",
  elevated: "#1A1A1A",
  text: "#F4F2ED",
  muted: "rgba(244, 242, 237, 0.58)",
  hairline: "rgba(244, 242, 237, 0.12)",
  accent: "#D9603D",
  warm: "#E9E4DA",
  black: "#0A0A0A",
} as const;

export const DM_EASE = [0.25, 0.1, 0, 1] as const;

export type DmPhotoId =
  | "IMG-01"
  | "IMG-02"
  | "IMG-03"
  | "IMG-04"
  | "IMG-05"
  | "IMG-06"
  | "IMG-07"
  | "IMG-08"
  | "IMG-09"
  | "IMG-10"
  | "IMG-11"
  | "IMG-12"
  | "IMG-13"
  | "IMG-14";

export type DmPhotoAsset = {
  id: DmPhotoId;
  slug: string;
  src: string;
  srcSm: string;
  fallback: string;
  fallbackSm: string;
  width: number;
  height: number;
  placeholder: string;
  alt: string;
};

export const DM_PHOTOS: Record<DmPhotoId, DmPhotoAsset> = {
  "IMG-01": {
    id: "IMG-01",
    slug: "orange-tiled-geometry",
    src: "/digital-marketing/orange-tiled-geometry.avif",
    srcSm: "/digital-marketing/orange-tiled-geometry-sm.avif",
    fallback: "/digital-marketing/orange-tiled-geometry.webp",
    fallbackSm: "/digital-marketing/orange-tiled-geometry-sm.webp",
    width: 1600,
    height: 2137,
    placeholder: "#180808",
    alt: "Corner of orange tiled walls with a sharp shadow along the trim",
  },
  "IMG-02": {
    id: "IMG-02",
    slug: "orange-surfaces-shadows",
    src: "/digital-marketing/orange-surfaces-shadows.avif",
    srcSm: "/digital-marketing/orange-surfaces-shadows-sm.avif",
    fallback: "/digital-marketing/orange-surfaces-shadows.webp",
    fallbackSm: "/digital-marketing/orange-surfaces-shadows-sm.webp",
    width: 1400,
    height: 2100,
    placeholder: "#f89858",
    alt: "Abstract orange and red surfaces with a strong diagonal shadow in sunlight",
  },
  "IMG-03": {
    id: "IMG-03",
    slug: "blue-glass-sculpture",
    src: "/digital-marketing/blue-glass-sculpture.avif",
    srcSm: "/digital-marketing/blue-glass-sculpture-sm.avif",
    fallback: "/digital-marketing/blue-glass-sculpture.webp",
    fallbackSm: "/digital-marketing/blue-glass-sculpture-sm.webp",
    width: 1200,
    height: 1500,
    placeholder: "#68c8f8",
    alt: "Abstract flowing blue glass sculpture on a soft gradient backdrop",
  },
  "IMG-04": {
    id: "IMG-04",
    slug: "marketing-strategy-writing",
    src: "/digital-marketing/marketing-strategy-writing.avif",
    srcSm: "/digital-marketing/marketing-strategy-writing-sm.avif",
    fallback: "/digital-marketing/marketing-strategy-writing.webp",
    fallbackSm: "/digital-marketing/marketing-strategy-writing-sm.webp",
    width: 1400,
    height: 948,
    placeholder: "#c8d8d8",
    alt: "Hands writing a marketing strategy on white paper",
  },
  "IMG-05": {
    id: "IMG-05",
    slug: "sticky-note-research",
    src: "/digital-marketing/sticky-note-research.avif",
    srcSm: "/digital-marketing/sticky-note-research-sm.avif",
    fallback: "/digital-marketing/sticky-note-research.webp",
    fallbackSm: "/digital-marketing/sticky-note-research-sm.webp",
    width: 1600,
    height: 900,
    placeholder: "#082838",
    alt: "Person reviewing colourful sticky notes arranged on glass",
  },
  "IMG-06": {
    id: "IMG-06",
    slug: "pink-digital-billboard",
    src: "/digital-marketing/pink-digital-billboard.avif",
    srcSm: "/digital-marketing/pink-digital-billboard-sm.avif",
    fallback: "/digital-marketing/pink-digital-billboard.webp",
    fallbackSm: "/digital-marketing/pink-digital-billboard-sm.webp",
    width: 1800,
    height: 1200,
    placeholder: "#f8f8f8",
    alt: "Outdoor digital billboard showing pink abstract art in an architectural setting",
  },
  "IMG-07": {
    id: "IMG-07",
    slug: "concrete-billboard-mockup",
    src: "/digital-marketing/concrete-billboard-mockup.avif",
    srcSm: "/digital-marketing/concrete-billboard-mockup-sm.avif",
    fallback: "/digital-marketing/concrete-billboard-mockup.webp",
    fallbackSm: "/digital-marketing/concrete-billboard-mockup-sm.webp",
    width: 1600,
    height: 1113,
    placeholder: "#080808",
    alt: "Two poster boards on a concrete wall used as a Comlabs campaign mockup",
  },
  "IMG-08": {
    id: "IMG-08",
    slug: "minimal-marketing-editorial",
    src: "/digital-marketing/minimal-marketing-editorial.avif",
    srcSm: "/digital-marketing/minimal-marketing-editorial-sm.avif",
    fallback: "/digital-marketing/minimal-marketing-editorial.webp",
    fallbackSm: "/digital-marketing/minimal-marketing-editorial-sm.webp",
    width: 1200,
    height: 800,
    placeholder: "#e8e8e8",
    alt: "Minimal black and white box still life on a white table",
  },
  "IMG-09": {
    id: "IMG-09",
    slug: "orange-editorial-book",
    src: "/digital-marketing/orange-editorial-book.avif",
    srcSm: "/digital-marketing/orange-editorial-book-sm.avif",
    fallback: "/digital-marketing/orange-editorial-book.webp",
    fallbackSm: "/digital-marketing/orange-editorial-book-sm.webp",
    width: 1400,
    height: 927,
    placeholder: "#c8c8d8",
    alt: "Open editorial book with orange pages and paper markers",
  },
  "IMG-10": {
    id: "IMG-10",
    slug: "smartphone-editorial-still",
    src: "/digital-marketing/smartphone-editorial-still.avif",
    srcSm: "/digital-marketing/smartphone-editorial-still-sm.avif",
    fallback: "/digital-marketing/smartphone-editorial-still.webp",
    fallbackSm: "/digital-marketing/smartphone-editorial-still-sm.webp",
    width: 1200,
    height: 1599,
    placeholder: "#080808",
    alt: "Smartphone and sunglasses resting on a printed magazine",
  },
  "IMG-11": {
    id: "IMG-11",
    slug: "content-creator-filming",
    src: "/digital-marketing/content-creator-filming.avif",
    srcSm: "/digital-marketing/content-creator-filming-sm.avif",
    fallback: "/digital-marketing/content-creator-filming.webp",
    fallbackSm: "/digital-marketing/content-creator-filming-sm.webp",
    width: 1200,
    height: 675,
    placeholder: "#485858",
    alt: "Creator sitting on the floor speaking to a camera on a tripod",
  },
  "IMG-12": {
    id: "IMG-12",
    slug: "designed-workspace",
    src: "/digital-marketing/designed-workspace.avif",
    srcSm: "/digital-marketing/designed-workspace-sm.avif",
    fallback: "/digital-marketing/designed-workspace.webp",
    fallbackSm: "/digital-marketing/designed-workspace-sm.webp",
    width: 1400,
    height: 2097,
    placeholder: "#e8e8e8",
    alt: "Editorial photograph of a person working on a laptop in a designed workspace — not a Comlabs team portrait",
  },
  "IMG-13": {
    id: "IMG-13",
    slug: "orange-concrete-structure",
    src: "/digital-marketing/orange-concrete-structure.avif",
    srcSm: "/digital-marketing/orange-concrete-structure-sm.avif",
    fallback: "/digital-marketing/orange-concrete-structure.webp",
    fallbackSm: "/digital-marketing/orange-concrete-structure-sm.webp",
    width: 1200,
    height: 800,
    placeholder: "#f89848",
    alt: "Architectural photograph of an orange concrete structure against blue sky",
  },
  "IMG-14": {
    id: "IMG-14",
    slug: "concrete-editorial-portrait",
    src: "/digital-marketing/concrete-editorial-portrait.avif",
    srcSm: "/digital-marketing/concrete-editorial-portrait-sm.avif",
    fallback: "/digital-marketing/concrete-editorial-portrait.webp",
    fallbackSm: "/digital-marketing/concrete-editorial-portrait-sm.webp",
    width: 1200,
    height: 1800,
    placeholder: "#989898",
    alt: "Editorial portrait of a person standing against a concrete wall, used as an anonymous campaign concept",
  },
};

export type DmArtefactId =
  | "positioning-map"
  | "campaign-poster"
  | "performance-panel"
  | "channel-attribution"
  | "landing-experiment"
  | "search-cluster"
  | "ai-visibility"
  | "content-architecture"
  | "social-system"
  | "customer-journey"
  | "conversion-funnel"
  | "content-calendar"
  | "landing-preview";

export const HERO_PRELOAD_PHOTOS: readonly DmPhotoId[] = [
  "IMG-06",
  "IMG-03",
  "IMG-01",
  "IMG-10",
];
