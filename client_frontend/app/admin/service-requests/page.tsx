import AdminServiceRequests from "@/components/admin/AdminServiceRequests";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Service Requests | VSF Admin",
  description: "Manage service requests from existing clients",
};

export default async function ServiceRequestsPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminServiceRequests />;
}
