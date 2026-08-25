import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicesPageData } from "@/lib/settings-server";
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getServicesPageData();
  const service = data.services.find(s => s.slug === resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found | VSF" };
  }

  return {
    title: service.seo?.title || `${service.title} | Virginia Surveillance Force`,
    description: service.seo?.description || service.excerpt,
    keywords: service.seo?.keywords || "",
    openGraph: {
      title: service.seo?.title || `${service.title} | VSF`,
      description: service.seo?.description || service.excerpt,
      images: [service.image],
    }
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getServicesPageData();
  
  const service = data.services.find(s => s.slug === resolvedParams.slug);
  
  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} allServices={data.services} />;
}