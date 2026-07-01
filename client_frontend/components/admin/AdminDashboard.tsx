"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Users,
  Activity,
  Globe,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/submissions");
        if (res.ok) {
          const data = await res.json();
          const submissions = data.submissions || [];
          setStats({
            total: submissions.length,
            pending: submissions.filter((s: any) => s.status === "Pending")
              .length,
            completed: submissions.filter((s: any) => s.status === "Completed")
              .length,
          });
        }
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#f0f2f7]">
      <AdminSidebar />

      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white/[0.92] backdrop-blur-lg border-b border-black/[0.06] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#1e1b4b] rounded-[10px] px-4 py-1.5 flex items-center md:hidden">
                <img
                  src="/images/logo2.png"
                  alt="VSF Admin Console"
                  className="h-[30px] w-auto object-contain"
                />
              </div>
              <div className="w-px h-6 bg-[#e2e8f0] md:hidden" />
              <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-[#1e1b4b] m-0">
                System Overview
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="md:hidden flex items-center p-2 rounded-[10px] bg-red-50 border border-red-200 text-red-600 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 p-7 animate-fade-up max-w-[1200px] mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white relative overflow-hidden shadow-[0_12px_40px_rgba(30,27,75,0.15)]">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-[600px]">
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[2px] mb-3">
                Welcome to VSF Admin
              </h2>
              <p className="text-[#a5b4fc] text-[15px] leading-relaxed mb-6">
                Manage your website content, review incoming security inquiries,
                and monitor your business operations all from one central
                command center.
              </p>
              <button
                onClick={() => router.push("/admin/submissions")}
                className="inline-flex items-center gap-2 bg-white text-[#1e1b4b] px-6 py-2.5 rounded-xl font-bold text-[13px] hover:bg-[#f8fafc] transition-colors shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
              >
                View Latest Inquiries <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Left Column - Stats */}
            <div className="space-y-7">
              <h3 className="font-bold text-[16px] text-[#1e293b] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#6366f1]" /> Inquiry
                Statistics
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="text-[32px] font-extrabold font-[family-name:var(--font-bebas)] text-[#1e1b4b] tracking-[1px] leading-none mb-1">
                      {isLoading ? "-" : stats.total}
                    </div>
                    <div className="text-[12px] font-semibold text-[#64748b] uppercase tracking-[0.5px]">
                      Total Inquiries
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-[32px] font-extrabold font-[family-name:var(--font-bebas)] text-[#1e1b4b] tracking-[1px] leading-none mb-1">
                      {isLoading ? "-" : stats.pending}
                    </div>
                    <div className="text-[12px] font-semibold text-[#64748b] uppercase tracking-[0.5px]">
                      Pending Review
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Links */}
            <div className="space-y-7">
              <h3 className="font-bold text-[16px] text-[#1e293b] flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#8b5cf6]" /> Website Management
              </h3>

              <div className="bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="divide-y divide-[#f1f5f9]">
                  {[
                    {
                      name: "Home Page",
                      desc: "Hero section, services overview",
                      link: "/admin/pages/home",
                    },
                    {
                      name: "About Us",
                      desc: "Company history, mission, team",
                      link: "/admin/pages/about",
                    },
                    {
                      name: "Services",
                      desc: "Security solutions, patrol details",
                      link: "/admin/pages/services",
                    },
                  ].map((page, i) => (
                    <div
                      key={i}
                      className="p-5 flex items-center justify-between hover:bg-[#f8fafc] transition-colors group cursor-pointer"
                      onClick={() => router.push(page.link)}
                    >
                      <div>
                        <div className="text-[14px] font-bold text-[#1e293b] mb-1">
                          {page.name}
                        </div>
                        <div className="text-[12px] text-[#64748b]">
                          {page.desc}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center group-hover:bg-[#eef2ff] group-hover:text-[#6366f1] transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
