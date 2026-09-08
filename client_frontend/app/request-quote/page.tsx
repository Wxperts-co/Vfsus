import type { Metadata } from "next";
import QuoteRequestClient from "./QuoteRequestClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Emergency Security Services Maryland | Virginia Surveillance Force",
    description:
      "Virginia Surveillance Force provides rapid-response emergency security services across Maryland and Washington DC. Protect your site instantly—request a quote today!",
    keywords: [
      "Emergency Security Services Maryland",
      "security company Maryland",
      "security services Washington DC",
      "private security services Maryland",
      "professional security services",
      "licensed security guards Virginia",
      "armed security services Virginia",
      "armed security guards Maryland",
      "unarmed security services Virginia",
      "security services DC Maryland Virginia",
      "Commercial security services Virginia",
      "Residential security services Virginia",
      "Corporate security services Virginia",
      "Executive protection Virginia",
      "24/7 security services Virginia",
      "Security patrol services Virginia",
      "Fire watch services Virginia",
      "Security guards Northern Virginia",
      "security guards for hotels",
      "security guards for hospitals",
      "security guards for schools",
      "security guards for retail stores",
      "security guards Alexandria VA",
      "security services Manassas VA",
    ],
    alternates: {
      canonical: "https://www.vsfus.com/request-quote",
    },
  };
}

export default function QuoteRequestPage() {
  return <QuoteRequestClient />;
}
