/** Local editorial photography — sourced from Unsplash, stored in /public/editorial/. */

export type EditorialImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const editorialImages = {
  generalLandscape: {
    src: "/editorial/general-landscape.jpg",
    alt: "Wide landscape with warm-toned hills and open sky",
    width: 1800,
    height: 1200,
  },
  websiteDesign: {
    src: "/editorial/website-design.jpg",
    alt: "Mountain ridge under a clear blue sky",
    width: 1800,
    height: 1200,
  },
  customSoftware: {
    src: "/editorial/custom-software.jpg",
    alt: "Mountain range above a sea of clouds in warm, muted light",
    width: 1800,
    height: 1200,
  },
  mobileApp: {
    src: "/editorial/mobile-app.jpg",
    alt: "Orange smartphone back with camera lenses on a neutral surface",
    width: 1800,
    height: 1200,
  },
  seoAeo: {
    src: "/editorial/seo-aeo.jpg",
    alt: "Rock formation silhouette beside calm water in warm daylight",
    width: 1800,
    height: 1200,
  },
  cloudInfrastructure: {
    src: "/editorial/cloud-infrastructure.jpg",
    alt: "Server rack cables and network connections in a data centre",
    width: 1800,
    height: 1200,
  },
  aboutDesert: {
    src: "/editorial/about-desert.jpg",
    alt: "Large sand dune in a desert landscape with soft light",
    width: 1800,
    height: 1200,
  },
  appliedAi: {
    src: "/editorial/applied-ai.jpg",
    alt: "Empty road through desert mountains at sunset",
    width: 1800,
    height: 1200,
  },
} as const satisfies Record<string, EditorialImage>;
