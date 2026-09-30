import { Metadata } from "next";
import PayNowClient from "./PayNowClient";

export const metadata: Metadata = {
  title: "Pay Now | Virginia Surveillance Force",
  description: "Secure online payment portal for Virginia Surveillance Force security and protective services.",
  alternates: {
    canonical: "https://vsfus.com/pay-now",
  },
};

export default function PayNowPage() {
  return <PayNowClient />;
}
