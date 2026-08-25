import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import Aboutsection from "@/components/home/Aboutsection";
import Featuresection from "@/components/home/Featuresection";
import Servicesection from "@/components/home/Servicesection";
import Whychooseussection from "@/components/home/Whychooseussection";
import Testimonialssection from "@/components/home/Testimonialssection"; 
import Footersection from "@/components/common-components/footer"; 

import { getHomePageData } from "@/lib/settings-server";

export const dynamic = "force-dynamic";

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