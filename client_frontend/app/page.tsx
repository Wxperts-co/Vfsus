import { Metadata } from "next";
import dynamicImport from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import Aboutsection from "@/components/home/Aboutsection";
import Featuresection from "@/components/home/Featuresection";
import Servicesection from "@/components/home/Servicesection";
import { getHomePageData } from "@/lib/settings-server";

// Below-the-fold heavy components loaded dynamically
const Whychooseussection = dynamicImport(() => import("@/components/home/Whychooseussection"));
const Testimonialssection = dynamicImport(() => import("@/components/home/Testimonialssection"));

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();
  return {
    title: data.seo?.title || "Home | Virginia Surveillance Force",
    description: data.seo?.description || "Virginia Surveillance Force is a premier security and investigative firm.",
    keywords: data.seo?.keywords || "security, investigation, protection",
  };
}

export default async function Page() {
  const data = await getHomePageData();

  return (
    <>
      <HeroSection />
      <Aboutsection data={data.aboutSection} />
      <Featuresection />
      <Servicesection />
      <Whychooseussection data={data.whyChooseUsSection} />
      <Testimonialssection data={data.testimonialsSection} />
    </>
  );
}