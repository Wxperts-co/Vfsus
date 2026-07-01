"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Home,
  Info,
  Briefcase,
  Phone,
  MessageSquare,
  LogOut,
  Settings,
  List,
  CreditCard,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

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

  const menuGroups = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { id: "submissions", label: "Quote Requests", href: "/admin/submissions", icon: FileText },
        { id: "contracts", label: "Contracts", href: "/admin/contracts", icon: FileText },
        { id: "service-requests", label: "Service Requests", href: "/admin/service-requests", icon: Briefcase },
        { id: "payments", label: "Payments", href: "/admin/payments", icon: CreditCard },
        { id: "contacts", label: "Contact Messages", href: "/admin/contacts", icon: MessageSquare },
        { id: "settings", label: "Global Settings", href: "/admin/settings", icon: Settings },
      ],
    },
    {
      title: "Website Pages",
      items: [
        { id: "home", label: "Home Page", href: "/admin/pages/home", icon: Home },
        { id: "about", label: "About Us", href: "/admin/pages/about-us", icon: Info },
        { id: "services", label: "Services", href: "/admin/pages/services", icon: Briefcase },
        { id: "testimonials", label: "Testimonials", href: "/admin/pages/testimonials", icon: MessageSquare },
        { id: "menu", label: "Menu List", href: "/admin/pages/menu", icon: List },
      ],
    },
  ];

  return (
    <aside className="hidden md:flex w-[260px] flex-col justify-between bg-gradient-to-b from-[#1e1b4b] to-[#1e293b] sticky top-0 h-screen z-30 overflow-hidden shrink-0">
      {/* Decorative circles */}
      <div className="absolute -top-15 -right-15 w-[180px] h-[180px] rounded-full bg-[rgba(129,140,248,0.08)] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-[120px] h-[120px] rounded-full bg-[rgba(244,114,182,0.06)] pointer-events-none" />

      <div className="relative z-[1] overflow-y-auto">
        {/* Brand */}
        <div className="p-5 pb-[18px] border-b border-white/[0.06] sticky top-0 bg-[#1e1b4b] z-10">
          <img
            src="/images/logo2.png"
            alt="VSF Admin Console"
            className="h-[50px] w-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <div className="p-5 pt-5 px-3.5 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-white/25 px-2.5 mb-3">
                {group.title}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <button
                      key={item.id}
                      onClick={() => router.push(item.href)}
                      className={`flex items-center justify-between w-full py-2.5 px-3 rounded-[10px] cursor-pointer text-[13px] font-[family-name:var(--font-barlow)] transition-all duration-200 border ${
                        isActive
                          ? "bg-white/[0.12] border-white/10 text-white font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                          : "bg-transparent border-transparent text-white/50 font-normal hover:bg-white/[0.08] hover:text-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 ${
                            isActive ? "text-[#818cf8]" : "text-white/30"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom profile */}
      <div className="relative z-[1] p-4 pb-[22px] border-t border-white/[0.06] bg-[#1e293b]">
        <div className="flex items-center gap-2.5 mb-3.5 px-1">
          <div className="h-[34px] w-[34px] rounded-[10px] bg-gradient-to-br from-[#818cf8] to-[#c084fc] flex items-center justify-center text-xs font-extrabold text-white shadow-[0_4px_10px_rgba(129,140,248,0.3)]">
            A
          </div>
          <div>
            <div className="text-[13px] font-semibold text-white leading-none">
              Admin
            </div>
            <div className="text-[10px] text-white/30 mt-[3px]">
              Administrator
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] border border-red-500/20 bg-red-500/[0.08] text-red-300 text-xs font-semibold cursor-pointer font-[family-name:var(--font-barlow)] transition-all duration-200 hover:bg-red-500/15"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
