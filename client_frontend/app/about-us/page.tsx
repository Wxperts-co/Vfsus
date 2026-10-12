import { Metadata } from "next";
import { getAboutUsPageData } from "@/lib/settings-server";
import AboutUsClient from "./AboutUsClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPageData();

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: "https://vsfus.com/about-us",
    },
  };
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.vsfus.com/#organization",
      "name": "Virginia Surveillance Force, Inc.",
      "alternateName": "VSF",
      "url": "https://www.vsfus.com/",
      "telephone": "+1-703-631-6559",
      "email": "info@vsfus.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7544 Diplomat Drive, Suite 101",
        "addressLocality": "Manassas",
        "addressRegion": "VA",
        "postalCode": "20109",
        "addressCountry": "US"
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.vsfus.com/about-us#webpage",
      "url": "https://www.vsfus.com/about-us",
      "name": "About Virginia Surveillance Force",
      "description": "Learn about Virginia Surveillance Force, Inc., its professional security and investigative services, trained personnel, company values, and commitment to protecting people, property, and assets throughout Virginia, Maryland, and Washington, DC.",
      "isPartOf": {
        "@id": "https://www.vsfus.com/#website"
      },
      "about": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "mainEntity": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebSite",
      "@id": "https://www.vsfus.com/#website",
      "url": "https://www.vsfus.com/",
      "name": "Virginia Surveillance Force",
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
};

export default async function AboutUs() {
  const data = await getAboutUsPageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutUsClient data={data} />
    </>
  );
}