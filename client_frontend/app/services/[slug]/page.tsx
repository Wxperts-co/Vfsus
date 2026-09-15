import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicesPageData } from "@/lib/settings-server";
import ServiceDetailClient from "./ServiceDetailClient";

export const revalidate = 60;

const legacySlugMap: Record<string, string> = {
  "permanent-or-temporary-security": "armed-and-unarmed-security",
  "vehicle-patrol": "vehicle-patrol-services",
  "concierge-and-frontdesk": "concierge-and-front-desk-services",
  "residential-and-gated-communities": "residential-and-gated-community-security",
  "malls-retail-shopping-centers-ware-houses-and-industrial-security": "retail-shopping-centers-mall-commercial-security",
  "hotel-motel-and-resorts": "hotel-motel-and-resort-security",
  "government-and-diplomat-facilities": "government-and-diplomatic-security",
  "hospital-and-health-care-facilities": "healthcare-and-hospital-security",
  "schools-colleges-and-universities": "school-college-and-university-security",
  "vip-executive-protection-and-body-guard-service": "vip-executive-protection-and-bodyguard-services",
  "alarm-response": "alarm-response-services",
  "courier-and-delivery": "medical-and-legal-courier-delivery",
  "bank-security-and-atm-service": "bank-and-atm-security",
  "fire-watch": "fire-watch-services",
};

function findServiceBySlug(services: any[], slug: string) {
  const targetSlug = legacySlugMap[slug] || slug;
  return services.find(s => s.slug === targetSlug || s.slug === slug);
}

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getServicesPageData();
  const service = findServiceBySlug(data.services, resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found | VSF" };
  }

  return {
    title: service.seo?.title || `${service.title} | Virginia Surveillance Force`,
    description: service.seo?.description || service.excerpt,
    keywords: service.seo?.keywords || "",
    alternates: {
      canonical: `https://vsfus.com/services/${service.slug}`,
    },
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

  const service = findServiceBySlug(data.services, resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} allServices={data.services} />;
}