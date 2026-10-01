import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminEmploymentApplications from "@/components/admin/AdminEmploymentApplications";

export const dynamic = "force-dynamic";

export default async function AdminEmploymentApplicationsPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminEmploymentApplications />;
}
