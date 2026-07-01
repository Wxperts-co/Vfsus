import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminFromSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const admin = await getAdminFromSession();

  if (admin) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#f0f2f7] via-[#e8eaf3] to-[#ede9fe]">
      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(102,126,234,0.08)_0%,transparent_70%)] blur-[60px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(118,75,162,0.06)_0%,transparent_70%)] blur-[60px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[980px] flex justify-center animate-scale-up">
        <AdminLoginForm />
      </div>
    </div>
  );
}
