import { Metadata } from "next";
import { getTestimonialsPageData } from "@/lib/settings-server";
import TestimonialsClient from "./TestimonialsClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTestimonialsPageData();

  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    alternates: {
      canonical: "https://vsfus.com/testimonials",
    },
  };
}

const testimonialsPageSchema = {
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
      "@id": "https://www.vsfus.com/testimonials#webpage",
      "url": "https://www.vsfus.com/testimonials",
      "name": "Testimonials | Virginia Surveillance Force",
      "description": "Read client recommendation letters and watch video testimonials about Virginia Surveillance Force's professional security services for businesses, residential communities, jewelry stores, banking facilities, and other organizations.",
      "isPartOf": {
        "@id": "https://www.vsfus.com/#website"
      },
      "about": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "publisher": {
        "@id": "https://www.vsfus.com/#organization"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Client Testimonials and Recommendation Letters",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "CreativeWork",
              "name": "Video Review by Barbra A. Ghent"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "CreativeWork",
              "name": "Video Review by Adnan Ali"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "CreativeWork",
              "name": "Video Review by Jeffrey Goldberg"
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "CreativeWork",
              "name": "Video Review by Candace Kiman"
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "CreativeWork",
              "name": "Video Review by Sheila A. Foote"
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Edward Germain"
            }
          },
          {
            "@type": "ListItem",
            "position": 7,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by James L. Pierce"
            }
          },
          {
            "@type": "ListItem",
            "position": 8,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Thomas S. Patti"
            }
          },
          {
            "@type": "ListItem",
            "position": 9,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Rosemarie Bouchard"
            }
          },
          {
            "@type": "ListItem",
            "position": 10,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Jennifer Ranft"
            }
          },
          {
            "@type": "ListItem",
            "position": 11,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Neal Krysinski"
            }
          },
          {
            "@type": "ListItem",
            "position": 12,
            "item": {
              "@type": "CreativeWork",
              "name": "Client Recommendation Letter by Adnan Ali"
            }
          }
        ]
      },
      "inLanguage": "en-US"
    }
  ]
};

export default async function TestimonialsPage() {
  const data = await getTestimonialsPageData();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(testimonialsPageSchema) }}
      />
      <TestimonialsClient data={data} />
    </>
  );
}
