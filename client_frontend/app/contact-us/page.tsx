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

export default function ContactUsPage() {
  return <ContactUsClient />;
}