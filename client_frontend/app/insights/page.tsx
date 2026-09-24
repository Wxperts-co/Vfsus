import { Metadata } from "next";
import { getInsightsPageData } from "@/lib/settings-server";
import InsightsClient from "@/app/insights/InsightsClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInsightsPageData();

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: "https://vsfus.com/insights",
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      url: "https://vsfus.com/insights",
      type: "website",
      images: [
        {
          url: "/images/homepage-services-2.jpeg",
          width: 1200,
          height: 630,
          alt: "Virginia Surveillance Force Security Insights",
        },
      ],
    },
  };
}

export default async function InsightsPage() {
  const data = await getInsightsPageData();

  return <InsightsClient data={data} />;
}
