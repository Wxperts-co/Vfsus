import AdminContacts from "@/components/admin/AdminContacts";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Contact Messages | VSF Admin",
  description: "Manage contact messages from website visitors",
};

export default async function ContactsPage() {
  const admin = await getAdminFromSession();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminContacts />;
}
