"use client";

import type { ImageLoaderProps } from "next/image";

import { mediaUrl } from "./cloudinary";

export default function cloudinaryImageLoader({
  src,
  width,
}: ImageLoaderProps): string {
  return mediaUrl(src, {
    width,
    quality: "auto",
  });
}
