/** Editorial photography for marketing pages — service heroes/cards hosted on Cloudinary. */

export type EditorialImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const cloudinaryBase =
  "https://res.cloudinary.com/p8osc4y4/image/upload/v1786355515";

export const editorialImages = {
  generalLandscape: {
    src: "/editorial/general-landscape.jpg",
    alt: "Wide landscape with warm-toned hills and open sky",
    width: 1800,
    height: 1200,
  },
  websiteDesign: {
    src: `${cloudinaryBase}/ChatGPT_Image_Aug_10_2026_03_09_22_PM_5_mv4tv3.png`,
    alt: "Snow-capped mountain peak above a hazy desert valley in soft morning light",
    width: 1800,
    height: 1200,
  },
  customSoftware: {
    src: `${cloudinaryBase}/ChatGPT_Image_Aug_10_2026_03_09_22_PM_4_ozpr79.png`,
    alt: "Mountain range rising above a sea of clouds in warm, muted light",
    width: 1800,
    height: 1200,
  },
  mobileApp: {
    src: `${cloudinaryBase}/ChatGPT_Image_Aug_10_2026_03_09_20_PM_2_jvnwb1.png`,
    alt: "Gold smartphone back with camera module against a soft pastel sky",
    width: 1800,
    height: 1200,
  },
  seoAeo: {
    src: `${cloudinaryBase}/ChatGPT_Image_Aug_10_2026_03_09_22_PM_6_iwgyh5.png`,
    alt: "Desert rock formations emerging through pale mist in warm daylight",
    width: 1800,
    height: 1200,
  },
  cloudInfrastructure: {
    src: `${cloudinaryBase}/ChatGPT_Image_Aug_10_2026_03_09_20_PM_1_yztxvp.png`,
    alt: "Open desert road winding toward the horizon under a bright cloud-filled sky",
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
