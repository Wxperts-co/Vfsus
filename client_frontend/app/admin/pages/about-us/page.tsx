import AdminAboutUs from "@/components/admin/AdminAboutUs";
import { Metadata } from "next";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "About Us Page Settings | Admin",
  description: "Manage About Us page content and SEO",
};

export default async function AdminAboutUsPage() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  return <AdminAboutUs />;
}
