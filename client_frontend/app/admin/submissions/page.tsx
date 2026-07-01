import AdminSubmissions from "@/components/admin/AdminSubmissions";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminSubmissionsPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminSubmissions />;
}
