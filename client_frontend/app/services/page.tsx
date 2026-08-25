import { Metadata } from "next";
import { getServicesPageData } from "@/lib/settings-server";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServicesPageData();
  
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
  };
}

export default async function ServicesPage() {
  const data = await getServicesPageData();

  return <ServicesClient data={data} />;
}