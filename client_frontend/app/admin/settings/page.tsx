import AdminSettings from "@/components/admin/AdminSettings";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSettingsPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminSettings />;
}
