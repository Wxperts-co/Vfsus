import { getMenuPageData } from "@/lib/settings-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MenuDetailClient from "./MenuDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getMenuPageData();
  const menuItem = data.menus.find(m => m.slug === resolvedParams.slug);

  if (!menuItem) {
    return { title: "Not Found | Virginia Surveillance Force" };
  }

  // Use specific SEO if provided, otherwise fallback to global SEO
  const seoTitle = menuItem.seo?.title || `${menuItem.title} | ${data.seo.title}`;
  const seoDescription = menuItem.seo?.description || data.seo.description;
  const seoKeywords = menuItem.seo?.keywords || data.seo.keywords;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
  };
}

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getMenuPageData();
  const menuItem = data.menus.find(m => m.slug === resolvedParams.slug);

  if (!menuItem) {
    notFound();
  }

  return <MenuDetailClient data={data} menuItem={menuItem} />;
}
