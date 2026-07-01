"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  Search,
  RefreshCw,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  X,
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Trash2,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface PaymentRecord {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  amount: string;
  status: string;
  createdAt: string;
}

export default function AdminPayments() {
  const router = useRouter();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchPayments = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/payments");
      if (!res.ok) throw new Error("Database server error.");
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (err: any) {
      setError(err.message || "Error loading records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      setPayments((prev) =>
        prev.map((sub) => (sub._id === id ? { ...sub, status: newStatus } : sub))
      );
    } catch (err: any) {
      alert(err.message || "Error updating state.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this payment record?")) {
      return;
    }
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/payments?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete payment.");
      setPayments((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting record.");
    } finally {
      setIsDeleting(null);
    }
  };

  const totalPayments = payments.length;
  const pendingCount = payments.filter((s) => s.status === "Pending").length;
  const paidCount = payments.filter((s) => s.status === "Paid").length;
  const totalAmount = payments.reduce((acc, curr) => {
      // Only count Paid statuses towards total revenue if desired, or all. We'll show sum of 'Paid'.
      if(curr.status === "Paid") {
          return acc + parseFloat(curr.amount || "0");
      }
      return acc;
  }, 0);

  const filteredPayments = payments.filter((sub) => {
    const matchesSearch =
      sub.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { id: "All", label: "All Payments", count: totalPayments, icon: LayoutDashboard },
    { id: "Pending", label: "Pending", count: pendingCount, icon: Clock },
    { id: "Paid", label: "Paid", count: paidCount, icon: CheckCircle },
  ];

  const statCards = [
    {
      label: "Total Transactions",
      value: totalPayments,
      icon: FileText,
      gradient: "from-[#667eea] to-[#764ba2]",
      shadow: "shadow-[0_8px_24px_rgba(102,126,234,0.4)]",
    },
    {
      label: "Pending Verification",
      value: pendingCount,
      icon: AlertCircle,
      gradient: "from-[#f093fb] to-[#f5576c]",
      shadow: "shadow-[0_8px_24px_rgba(245,87,108,0.4)]",
    },
    {
      label: "Completed Payments",
      value: paidCount,
      icon: CheckCircle,
      gradient: "from-[#4facfe] to-[#00f2fe]",
      shadow: "shadow-[0_8px_24px_rgba(79,172,254,0.4)]",
    },
    {
      label: "Total Revenue (Paid)",
      value: `$${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      gradient: "from-[#43e97b] to-[#38f9d7]",
      shadow: "shadow-[0_8px_24px_rgba(67,233,123,0.4)]",
    },
  ];

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#f0f2f7]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white/[0.92] backdrop-blur-lg border-b border-black/[0.06] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#1e1b4b] rounded-[10px] px-4 py-1.5 flex items-center">
                <img
                  src="/images/logo2.png"
                  alt="VSF Admin Console"
                  className="h-[30px] w-auto object-contain"
                />
              </div>
              <div className="w-px h-6 bg-[#e2e8f0]" />
              <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-[#1e1b4b] m-0">
                {statusFilter === "All" ? "All Payments" : statusFilter}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-[9px] h-[15px] w-[15px] text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[240px] bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-2 pl-9 pr-3.5 text-[13px] text-[#1e293b] font-[family-name:var(--font-barlow)] outline-none transition-all duration-200 focus:border-[#818cf8] focus:shadow-[0_0_0_3px_rgba(129,140,248,0.1)]"
                />
              </div>
              <button
                onClick={fetchPayments}
                className="flex items-center gap-1.5 py-2 px-4 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white text-xs font-semibold text-[#475569] cursor-pointer transition-all hover:bg-[#f1f5f9]"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
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
        <div className="flex-1 p-7 animate-fade-up">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
            {statCards.map((card, i) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 ${card.shadow} transition-all duration-300 hover:-translate-y-[3px]`}
                >
                  <div className="absolute -top-5 -right-5 w-[100px] h-[100px] rounded-full bg-white/10" />
                  <div className="absolute -bottom-2.5 right-5 w-[60px] h-[60px] rounded-full bg-white/[0.06]" />
                  <div className="relative z-[1]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-white/85 uppercase tracking-[1px]">
                        {card.label}
                      </span>
                      <div className="w-[38px] h-[38px] rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <CardIcon className="h-[19px] w-[19px] text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white leading-none font-[family-name:var(--font-bebas)] tracking-[2px]">
                      {card.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between px-6 py-[18px] border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#818cf8]" />
                <span className="text-sm font-bold text-[#1e1b4b]">Payment History</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#eef2ff] text-[#6366f1]">
                  {filteredPayments.length}
                </span>
              </div>
              <div className="md:hidden flex gap-1">
                {navItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-[6px] text-[10px] font-semibold ${
                      statusFilter === tab.id ? "bg-[#6366f1] text-white" : "bg-[#f1f5f9] text-[#64748b]"
                    }`}
                  >
                    {tab.id === "All" ? "All" : tab.id}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center flex flex-col items-center gap-3.5">
                <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center shadow-[0_8px_20px_rgba(102,126,234,0.3)]">
                  <RefreshCw className="h-[22px] w-[22px] text-white animate-spin" />
                </div>
                <p className="text-sm text-[#64748b] font-medium">Loading payments...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-[14px] bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-[22px] w-[22px] text-red-500" />
                </div>
                <p className="text-sm font-semibold text-red-500">Failed to Load</p>
                <p className="text-xs text-[#94a3b8] mt-1">{error}</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#e0e7ff] to-[#ede9fe] flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-7 w-7 text-[#818cf8]" />
                </div>
                <p className="text-[15px] font-bold text-[#1e1b4b]">No Payments Found</p>
                <p className="text-[13px] text-[#94a3b8] mt-1">Payment intents will appear here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#fafbfd]">
                      {["Customer", "Email", "Date", "Amount", "Status", "Actions"].map((h) => (
                        <th
                          key={h}
                          className={`py-3.5 px-[22px] text-[11px] font-bold tracking-[0.8px] uppercase text-[#94a3b8] border-b border-[#f1f5f9] ${
                            h === "Actions" ? "text-right" : ""
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((sub) => {
                      const formattedDate = new Date(sub.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      });
                      
                      const statusClass =
                        sub.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : sub.status === "Failed" || sub.status === "Cancelled"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200";
                      
                      const dotClass =
                        sub.status === "Paid"
                          ? "bg-emerald-500"
                          : sub.status === "Failed" || sub.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-amber-500";

                      return (
                        <tr key={sub._id} className="border-b border-[#f8fafc] hover:bg-[#f8faff] transition-colors">
                          <td className="py-4 px-[22px]">
                            <div className="text-[13px] font-semibold text-[#1e293b]">{sub.firstName} {sub.lastName}</div>
                          </td>
                          <td className="py-4 px-[22px]">
                            <a href={`mailto:${sub.email}`} className="text-[12px] font-medium text-[#6366f1] hover:underline">{sub.email}</a>
                          </td>
                          <td className="py-4 px-[22px] text-xs text-[#64748b]">{formattedDate}</td>
                          <td className="py-4 px-[22px]">
                            <div className="text-[14px] font-bold text-[#1e293b]">
                              ${parseFloat(sub.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="py-4 px-[22px]">
                            <span className={`inline-flex items-center gap-[5px] px-3 py-1 rounded-full text-[11px] font-semibold border ${statusClass}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-4 px-[22px] text-right">
                            <div className="flex items-center justify-end gap-2">
                              <select
                                disabled={isUpdating === sub._id}
                                value={sub.status}
                                onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                                className="py-1.5 px-2.5 rounded-lg border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] text-[11px] font-medium text-[#475569] outline-none"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Failed">Failed</option>
                              </select>
                              <button
                                onClick={() => handleDelete(sub._id)}
                                disabled={isDeleting === sub._id}
                                className="inline-flex items-center px-2.5 py-1.5 rounded-lg border-[1.5px] border-[#fee2e2] bg-white text-[#ef4444] hover:bg-[#fef2f2] hover:border-[#fca5a5] disabled:opacity-50"
                              >
                                <Trash2 className="h-[13px] w-[13px]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
