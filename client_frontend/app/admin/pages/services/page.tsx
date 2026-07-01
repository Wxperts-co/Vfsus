import AdminServices from "@/components/admin/AdminServices";
import { Metadata } from "next";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Services Settings | Admin Panel",
  description: "Manage Services page content and SEO",
};

export default async function ServicesSettingsPage() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  return <AdminServices />;
}
