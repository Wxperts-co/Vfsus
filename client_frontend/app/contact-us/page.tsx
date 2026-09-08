import { Metadata } from "next";
import ContactUsClient from "./ContactUsClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Security Guard Services Maryland | Virginia Surveillance Force",
    description: "Virginia Surveillance Force offers professional security guard services across Maryland and Washington DC. Safeguard your assets—request a quote today!",
    keywords: "Security Guard Services Maryland, security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA",
  };
}

export default function ContactUsPage() {
  return <ContactUsClient />;
}