import { getMenuPageData } from "@/lib/settings-server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MenuDetailClient from "./MenuDetailClient";

export const revalidate = 60;

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
    alternates: {
      canonical: `https://vsfus.com/menu/${resolvedParams.slug}`,
    },
  };
}

const whyChooseUsSchema = {
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
      "@type": "WebPage",
      "@id": "https://www.vsfus.com/menu/why-choose-us#webpage",
      "url": "https://www.vsfus.com/menu/why-choose-us",
      "name": "Why Choose Virginia Surveillance Force?",
      "description": "Learn why organizations choose Virginia Surveillance Force for professional security services, including experienced personnel, security management, and customized protection for government facilities, healthcare facilities, corporate offices, hotels, warehouses, retail properties, and residential communities.",
      "isPartOf": {
        "@id": "https://www.vsfus.com/#website"
      },
      "about": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "mainEntity": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
};

const howWeRecruitSchema = {
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
      "@type": "WebPage",
      "@id": "https://www.vsfus.com/menu/how-we-recruit#webpage",
      "url": "https://www.vsfus.com/menu/how-we-recruit",
      "name": "How We Recruit | Virginia Surveillance Force",
      "description": "Learn how Virginia Surveillance Force selects, screens, vets, and trains security professionals. The recruitment process emphasizes qualifications, licensing, employment verification, background screening, assignment-specific training, supervision, and accountability.",
      "isPartOf": {
        "@id": "https://www.vsfus.com/#website"
      },
      "about": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Virginia Surveillance Force Recruitment and Training Process",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Employment Background Screening",
            "description": "Evaluate candidates' qualifications, experience, licensing, reliability, and suitability for the position."
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Vetting and Screening Protocols",
            "description": "Verify employment history, references, qualifications, and applicable licensing or registration requirements."
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Security Officer Training",
            "description": "Prepare officers through duty-specific training, security procedures, emergency response, communication, and site-specific orientation."
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Management Oversight and Accountability",
            "description": "Maintain supervision, communication, client coordination, and ongoing performance development."
          }
        ]
      },
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
};

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getMenuPageData();
  const menuItem = data.menus.find(m => m.slug === resolvedParams.slug);

  if (!menuItem) {
    notFound();
  }

  return (
    <>
      {resolvedParams.slug === "why-choose-us" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(whyChooseUsSchema) }}
        />
      )}
      {resolvedParams.slug === "how-we-recruit" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howWeRecruitSchema) }}
        />
      )}
      <MenuDetailClient data={data} menuItem={menuItem} />
    </>
  );
}
