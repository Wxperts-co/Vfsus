import HeroSection from "@/components/home/HeroSection";
import Aboutsection from "@/components/home/Aboutsection";
import Featuresection from "@/components/home/Featuresection";
import Servicesection from "@/components/home/Servicesection";
import Whychooseussection from "@/components/home/Whychooseussection";
import Testimonialssection from "@/components/home/Testimonialssection"; 
import Footersection from "@/components/common-components/footer"; 

import { getHomePageData } from "@/lib/settings-server";

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