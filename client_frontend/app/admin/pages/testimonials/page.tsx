import { Metadata } from "next";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Testimonials Page Settings | Admin",
};

export default async function TestimonialsAdminPage() {
  const admin = await getAdminFromSession();
  if (!admin) redirect("/admin/login");

  return <AdminTestimonials />;
}
