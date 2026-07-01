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
  FileText,
  Briefcase,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({
    submissions: { total: 0, pending: 0 },
    contracts: { total: 0, pending: 0 },
    serviceRequests: { total: 0, pending: 0 },
    payments: { total: 0, pending: 0 },
    contacts: { total: 0, pending: 0 }, // For contacts, we consider unread/pending
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [subRes, contractRes, serviceRes, paymentRes, contactRes] = await Promise.all([
          fetch("/api/admin/submissions"),
          fetch("/api/admin/contracts"),
          fetch("/api/admin/service-requests"),
          fetch("/api/admin/payments"),
          fetch("/api/admin/contacts"),
        ]);

        const [subData, contractData, serviceData, paymentData, contactData] = await Promise.all([
          subRes.ok ? subRes.json() : { submissions: [] },
          contractRes.ok ? contractRes.json() : { contracts: [] },
          serviceRes.ok ? serviceRes.json() : { serviceRequests: [] },
          paymentRes.ok ? paymentRes.json() : { payments: [] },
          contactRes.ok ? contactRes.json() : { contacts: [] },
        ]);

        const subs = subData.submissions || [];
        const contracts = contractData.contracts || [];
        const services = serviceData.serviceRequests || [];
        const payments = paymentData.payments || [];
        const contacts = contactData.contacts || [];

        setMetrics({
          submissions: {
            total: subs.length,
            pending: subs.filter((s: any) => s.status === "Pending").length,
          },
          contracts: {
            total: contracts.length,
            pending: contracts.filter((s: any) => s.status === "Pending").length,
          },
          serviceRequests: {
            total: services.length,
            pending: services.filter((s: any) => s.status === "Pending").length,
          },
          payments: {
            total: payments.length,
            pending: payments.filter((s: any) => s.status === "Pending").length,
          },
          contacts: {
            total: contacts.length,
            pending: contacts.filter((s: any) => s.status === "Unread" || !s.status).length,
          },
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllStats();
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

  const statCards = [
    { label: "Quote Requests", data: metrics.submissions, icon: FileText, color: "text-[#e8c97a]", bg: "bg-[#eab308]/10", href: "/admin/submissions" },
    { label: "Contracts", data: metrics.contracts, icon: FileText, color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/admin/contracts" },
    { label: "Service Requests", data: metrics.serviceRequests, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10", href: "/admin/service-requests" },
    { label: "Payments", data: metrics.payments, icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10", href: "/admin/payments" },
    { label: "Contact Messages", data: metrics.contacts, icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10", href: "/admin/contacts" },
  ];

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      {/* ─── Main Content ─── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#0b1120] rounded-[10px] px-4 py-1.5 flex items-center md:hidden">
                <img
                  src="/images/logo2.png"
                  alt="VSF Admin Console"
                  className="h-[30px] w-auto object-contain"
                />
              </div>
              <div className="w-px h-6 bg-[#e2e8f0] md:hidden" />
              <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
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
          <div className="mb-8 p-8 rounded-3xl bg-gradient-to-br from-[#131e35] to-[#1a2845] text-white relative overflow-hidden shadow-[0_12px_40px_rgba(30,27,75,0.15)]">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-[600px]">
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-[2px] mb-3">
                Welcome to VSF Admin
              </h2>
              <p className="text-[#8898aa] text-[15px] leading-relaxed mb-6">
                Manage your website content, review incoming security inquiries,
                monitor contracts and process payments all from one central
                command center.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {/* Left Column - Stats */}
            <div className="space-y-7">
              <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#e8c97a]" /> Inquiry & Application Statistics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={i} 
                      onClick={() => router.push(stat.href)}
                      className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-[rgba(201,168,76,0.4)] transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div className="text-[12px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                          {isLoading ? "-" : stat.data.pending} Pending
                        </div>
                      </div>
                      <div>
                        <div className="text-[32px] font-extrabold font-[family-name:var(--font-bebas)] text-white tracking-[1px] leading-none mb-1 group-hover:text-[#eab308] transition-colors">
                          {isLoading ? "-" : stat.data.total}
                        </div>
                        <div className="text-[12px] font-semibold text-[#8898aa] uppercase tracking-[0.5px]">
                          Total {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Quick Links */}
            <div className="space-y-7">
              <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#8b5cf6]" /> Website Page Management
              </h3>

              <div className="bg-[#131e35] rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
                <div className="divide-y divide-[rgba(201,168,76,0.15)]">
                  {[
                    {
                      name: "Home Page",
                      desc: "Hero section, overview, footer",
                      link: "/admin/pages/home",
                    },
                    {
                      name: "About Us",
                      desc: "Company history, mission, team",
                      link: "/admin/pages/about-us",
                    },
                    {
                      name: "Services",
                      desc: "Security solutions, patrol details",
                      link: "/admin/pages/services",
                    },
                    {
                      name: "Testimonials",
                      desc: "Client reviews and ratings",
                      link: "/admin/pages/testimonials",
                    },
                    {
                      name: "Menu List",
                      desc: "Header navigation links",
                      link: "/admin/pages/menu",
                    },
                  ].map((page, i) => (
                    <div
                      key={i}
                      className="p-5 flex items-center justify-between hover:bg-[#1a2845] transition-colors group cursor-pointer"
                      onClick={() => router.push(page.link)}
                    >
                      <div>
                        <div className="text-[14px] font-bold text-[#f4f6f8] mb-1 group-hover:text-[#eab308] transition-colors">
                          {page.name}
                        </div>
                        <div className="text-[12px] text-[#8898aa]">
                          {page.desc}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#1a2845] flex items-center justify-center group-hover:bg-[#eab308]/10 group-hover:text-[#e8c97a] transition-colors">
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
