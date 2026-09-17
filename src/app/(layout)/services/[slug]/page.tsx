import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServicePageLayout } from "@/components/services/service-page-layout";
import { buildPageMetadata } from "@/lib/metadata";
import { getServiceBySlug, servicePages } from "@/lib/services-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildPageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: service.path,
    absoluteTitle: true,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return <ServicePageLayout service={service} />;
}
