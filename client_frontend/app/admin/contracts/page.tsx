import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminContracts from "@/components/admin/AdminContracts";

export default async function AdminContractsPage() {
  const admin = await getAdminFromSession();
  
  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminContracts />;
}
