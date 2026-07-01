import { Metadata } from "next";
import { getAboutUsPageData } from "@/lib/settings-server";
import AboutUsClient from "./AboutUsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPageData();
  
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
  };
}

export default async function AboutUs() {
  const data = await getAboutUsPageData();
  
  return <AboutUsClient data={data} />;
}