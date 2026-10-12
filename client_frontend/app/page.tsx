import { Metadata } from "next";
import dynamicImport from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import AnswerSnippetSection from "@/components/home/AnswerSnippetSection";
import Aboutsection from "@/components/home/Aboutsection";
import Featuresection from "@/components/home/Featuresection";
import Servicesection from "@/components/home/Servicesection";
import { getHomePageData } from "@/lib/settings-server";

// Below-the-fold heavy components loaded dynamically
const Whychooseussection = dynamicImport(() => import("@/components/home/Whychooseussection"));
const Testimonialssection = dynamicImport(() => import("@/components/home/Testimonialssection"));
const SemanticKeynotesSection = dynamicImport(() => import("@/components/home/SemanticKeynotesSection"));

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  return {
    title: data.seo?.title || "Security Services Washington, DC | Virginia Surveillance Force",
    description: data.seo?.description || "Virginia Surveillance Force offers professional security services across Washington DC, Maryland, and Virginia. Get licensed armed and unarmed security guards—get a free quote today!",
    keywords: data.seo?.keywords || "security services Virginia, security company Maryland, security services Washington DC",
    alternates: {
      canonical: "https://vsfus.com/",
    },
  };
}

const homeProfessionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.vsfus.com/#organization",
  "name": "Virginia Surveillance Force",
  "description": "Virginia Surveillance Force provides professional security services including armed and unarmed guards, vehicle patrol, and corporate security across Washington DC, Virginia, and Maryland. Trusted since 1987.",
  "url": "https://www.vsfus.com/",
  "logo": "https://www.vsfus.com/wp-content/uploads/2023/10/VSF-Logo-01.png",
  "image": "https://www.vsfus.com/wp-content/uploads/2023/10/VSF-Logo-01.png",
  "telephone": "+1-703-631-6559",
  "email": "info@vsfus.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7544 Diplomat Dr #101",
    "addressLocality": "Manassas",
    "addressRegion": "VA",
    "postalCode": "20109",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "$$",
  "knowsAbout": [
    "Armed Security",
    "Unarmed Security",
    "Special Police",
    "Corporate Security",
    "Vehicle Patrol",
    "Fire Watch",
    "Bodyguard Services",
    "Security Consulting"
  ],
  "sameAs": [
    "https://www.facebook.com/pages/VSF/160758390617323",
    "https://twitter.com/vsfus",
    "https://www.linkedin.com/company/virginia-surveillance-force",
    "https://www.youtube.com/channel/UCHi7o-he252fKlxkMGloQtw",
    "https://www.instagram.com/surveillance_force"
  ],
  "areaServed": [
    "Washington, DC",
    "Virginia",
    "Maryland"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional Security Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Armed & Unarmed Security"
      },
      {
        "@type": "Service",
        "name": "Office & Corporate Security"
      },
      {
        "@type": "Service",
        "name": "Vehicle Patrol Services"
      },
      {
        "@type": "Service",
        "name": "Fire Watch"
      },
      {
        "@type": "Service",
        "name": "Bodyguard & Protective Services"
      }
    ]
  }
};

export default async function Page() {
  const data = await getHomePageData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeProfessionalServiceSchema) }}
      />
      <HeroSection />
      <AnswerSnippetSection />
      <Aboutsection data={data.aboutSection} />
      <Featuresection />
      <Servicesection />
      <Whychooseussection data={data.whyChooseUsSection} />
      <Testimonialssection data={data.testimonialsSection} />
      <SemanticKeynotesSection />
    </>
  );
}