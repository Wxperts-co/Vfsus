import { Metadata } from "next";
import { getTestimonialsPageData } from "@/lib/settings-server";
import TestimonialsClient from "./TestimonialsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTestimonialsPageData();
  
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
  };
}

export default async function TestimonialsPage() {
  const data = await getTestimonialsPageData();
  return <TestimonialsClient data={data} />;
}
