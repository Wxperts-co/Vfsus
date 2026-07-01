import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminPayments from "@/components/admin/AdminPayments";

export default async function AdminPaymentsPage() {
  const admin = await getAdminFromSession();
  
  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminPayments />;
}
