import AdminMenu from "@/components/admin/AdminMenu";
import { Metadata } from "next";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Menu Settings | Admin Panel",
  description: "Manage Menu List pages content and SEO",
};

export default async function MenuSettingsPage() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  return <AdminMenu />;
}
