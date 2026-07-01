import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
