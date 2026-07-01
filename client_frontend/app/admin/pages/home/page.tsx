import AdminHome from "@/components/admin/AdminHome";
import { Metadata } from "next";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Home Page Settings | Admin Panel",
  description: "Manage Home Page content and SEO",
};

export default async function HomeSettingsPage() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  return <AdminHome />;
}
