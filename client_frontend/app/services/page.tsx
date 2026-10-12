import { Metadata } from "next";
import { getServicesPageData } from "@/lib/settings-server";
import ServicesClient from "./ServicesClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getServicesPageData();

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: "https://vsfus.com/services",
    },
  };
}

const servicesPageSchema = {
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
      "@type": "WebSite",
      "@id": "https://www.vsfus.com/#website",
      "url": "https://www.vsfus.com/",
      "name": "Virginia Surveillance Force",
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "CollectionPage",
      "@id": "https://www.vsfus.com/services#webpage",
      "url": "https://www.vsfus.com/services",
      "name": "Professional Security and Protective Services",
      "description": "Explore professional security and protective services from Virginia Surveillance Force, including armed and unarmed security, vehicle patrol, office security, concierge services, residential security, executive protection, investigations, alarm response, fire watch, and specialized security solutions.",
      "isPartOf": {
        "@id": "https://www.vsfus.com/#website"
      },
      "about": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Security Services",
        "itemListOrder": "https://schema.org/ItemListUnordered",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Armed and Unarmed Security"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Vehicle Patrol Services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Office and Corporate Security"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Concierge and Front Desk Services"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Residential and Gated Community Security"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Retail, Shopping Centers, Mall and Commercial Security"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Warehouse and Industrial Security"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Hotel, Motel and Resort Security"
          },
          {
            "@type": "ListItem",
            "position": 9,
            "name": "Government and Diplomatic Security"
          },
          {
            "@type": "ListItem",
            "position": 10,
            "name": "Healthcare and Hospital Security"
          },
          {
            "@type": "ListItem",
            "position": 11,
            "name": "School, College and University Security"
          },
          {
            "@type": "ListItem",
            "position": 12,
            "name": "VIP Executive Protection and Bodyguard Services"
          },
          {
            "@type": "ListItem",
            "position": 13,
            "name": "Special Police Services"
          },
          {
            "@type": "ListItem",
            "position": 14,
            "name": "Alarm Response Services"
          },
          {
            "@type": "ListItem",
            "position": 15,
            "name": "Investigations and Intelligence"
          },
          {
            "@type": "ListItem",
            "position": 16,
            "name": "Medical and Legal Courier and Delivery"
          },
          {
            "@type": "ListItem",
            "position": 17,
            "name": "Bank and ATM Security"
          },
          {
            "@type": "ListItem",
            "position": 18,
            "name": "Fire Watch Services"
          }
        ]
      }
    }
  ]
};

export default async function ServicesPage() {
  const data = await getServicesPageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <ServicesClient data={data} />
    </>
  );
}