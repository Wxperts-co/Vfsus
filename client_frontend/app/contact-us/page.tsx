import { Metadata } from "next";
import { getGlobalSettings } from "@/lib/settings-server";
import ContactUsClient from "./ContactUsClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  const contactSeo = (settings as any).contactUsSeo;

  return {
    title: contactSeo?.title?.trim() || "Security Guard Services Maryland | Virginia Surveillance Force",
    description: contactSeo?.description?.trim() || "Virginia Surveillance Force offers professional security guard services across Maryland and Washington DC. Safeguard your assets—request a quote today!",
    keywords: contactSeo?.keywords?.trim() || "Security Guard Services Maryland, security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA",
    alternates: {
      canonical: "https://vsfus.com/contact-us",
    },
  };
}

const contactPageSchema = {
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
      "@type": "ContactPage",
      "@id": "https://www.vsfus.com/contact-us#webpage",
      "url": "https://www.vsfus.com/contact-us",
      "name": "Contact Virginia Surveillance Force",
      "description": "Contact Virginia Surveillance Force to inquire about professional security, protective, patrol, and investigative services serving Virginia, Maryland, and Washington, DC.",
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

export default function ContactUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactUsClient />
    </>
  );
}