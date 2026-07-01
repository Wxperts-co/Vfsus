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
  Shield,
  X,
  Eye,
  LayoutDashboard,
  TrendingUp,
  Users,
  Activity,
  Trash2,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface ContactSubmission {
  _id: string;
  name: string;
  address?: string;
  citytown?: string;
  province?: string;
  postalcode?: string;
  email: string;
  phone: string;
  comments?: string;
  status: string;
  createdAt: string;
  notes?: string;
}

export default function AdminContacts() {
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchContacts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Database server error.");
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err: any) {
      setError(err.message || "Error loading records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
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
      const res = await fetch("/api/admin/contacts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      setContacts((prev) =>
        prev.map((sub) => (sub._id === id ? { ...sub, status: newStatus } : sub))
      );
      if (selectedContact?._id === id) {
        setSelectedContact((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message || "Error updating state.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) {
      return;
    }
    
    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact.");
      setContacts((prev) => prev.filter((sub) => sub._id !== id));
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    } catch (err: any) {
      alert(err.message || "Error deleting record.");
    } finally {
      setIsDeleting(null);
    }
  };

  const totalContacts = contacts.length;
  const pendingCount = contacts.filter((s) => s.status === "Pending").length;
  const inProgressCount = contacts.filter((s) => s.status === "In Progress").length;
  const completedCount = contacts.filter((s) => s.status === "Completed").length;

  const filteredContacts = contacts.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const navItems = [
    { id: "All", label: "All Messages", count: totalContacts, icon: LayoutDashboard },
    { id: "Pending", label: "Pending", count: pendingCount, icon: AlertCircle },
    { id: "In Progress", label: "In Progress", count: inProgressCount, icon: Clock },
    { id: "Completed", label: "Completed", count: completedCount, icon: CheckCircle },
  ];

  const statCards = [
    {
      label: "Total Messages",
      value: totalContacts,
      icon: Users,
      gradient: "from-[#667eea] to-[#764ba2]",
      shadow: "shadow-[0_8px_24px_rgba(102,126,234,0.4)]",
    },
    {
      label: "Pending Review",
      value: pendingCount,
      icon: AlertCircle,
      gradient: "from-[#f093fb] to-[#f5576c]",
      shadow: "shadow-[0_8px_24px_rgba(245,87,108,0.4)]",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      icon: Activity,
      gradient: "from-[#4facfe] to-[#00f2fe]",
      shadow: "shadow-[0_8px_24px_rgba(79,172,254,0.4)]",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: TrendingUp,
      gradient: "from-[#43e97b] to-[#38f9d7]",
      shadow: "shadow-[0_8px_24px_rgba(67,233,123,0.4)]",
    },
  ];

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#f0f2f7]">
      <AdminSidebar />

      {/* ─── Main Content ─── */}
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
                {statusFilter === "All" ? "All Messages" : statusFilter}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-[9px] h-[15px] w-[15px] text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[240px] bg-[#f1f5f9] border-[1.5px] border-[#e2e8f0] rounded-[10px] py-2 pl-9 pr-3.5 text-[13px] text-[#1e293b] font-[family-name:var(--font-barlow)] outline-none transition-all duration-200 focus:border-[#818cf8] focus:shadow-[0_0_0_3px_rgba(129,140,248,0.1)]"
                />
              </div>
              <button
                onClick={fetchContacts}
                className="flex items-center gap-1.5 py-2 px-4 rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white text-xs font-semibold text-[#475569] cursor-pointer font-[family-name:var(--font-barlow)] transition-all duration-150 hover:bg-[#f1f5f9]"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Refresh
              </button>
              {/* Mobile logout */}
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
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 ${card.shadow} transition-all duration-300 cursor-default hover:-translate-y-[3px]`}
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
                    <div className="text-4xl font-extrabold text-white leading-none font-[family-name:var(--font-bebas)] tracking-[2px]">
                      {card.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            {/* Table header bar */}
            <div className="flex items-center justify-between px-6 py-[18px] border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#818cf8]" />
                <span className="text-sm font-bold text-[#1e1b4b]">
                  Recent Contact Messages
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#eef2ff] text-[#6366f1]">
                  {filteredContacts.length}
                </span>
              </div>
              {/* Mobile filter */}
              <div className="md:hidden flex gap-1">
                {navItems.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-[6px] border-none cursor-pointer text-[10px] font-semibold font-[family-name:var(--font-barlow)] ${
                      statusFilter === tab.id
                        ? "bg-[#6366f1] text-white"
                        : "bg-[#f1f5f9] text-[#64748b]"
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
                <p className="text-sm text-[#64748b] font-medium">Loading records...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-[14px] bg-red-50 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-[22px] w-[22px] text-red-500" />
                </div>
                <p className="text-sm font-semibold text-red-500">Failed to Load</p>
                <p className="text-xs text-[#94a3b8] mt-1">{error}</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-[#e0e7ff] to-[#ede9fe] flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-7 w-7 text-[#818cf8]" />
                </div>
                <p className="text-[15px] font-bold text-[#1e1b4b]">No Messages Found</p>
                <p className="text-[13px] text-[#94a3b8] mt-1">
                  Contact form submissions will appear here
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#fafbfd]">
                      {["Sender", "Date", "Status", "Actions"].map((h) => (
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
                    {filteredContacts.map((sub) => {
                      const formattedDate = new Date(sub.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                      const statusClass =
                        sub.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : sub.status === "In Progress"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200";

                      const dotClass =
                        sub.status === "Completed"
                          ? "bg-emerald-500"
                          : sub.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-amber-500";

                      return (
                        <tr
                          key={sub._id}
                          className="border-b border-[#f8fafc] transition-colors duration-150 hover:bg-[#f8faff]"
                        >
                          <td className="py-4 px-[22px]">
                            <div className="text-[13px] font-semibold text-[#1e293b]">
                              {sub.name}
                            </div>
                            <div className="text-[11px] text-[#94a3b8] mt-0.5">{sub.email}</div>
                          </td>
                          <td className="py-4 px-[22px] text-xs text-[#64748b]">
                            {formattedDate}
                          </td>
                          <td className="py-4 px-[22px]">
                            <span
                              className={`inline-flex items-center gap-[5px] px-3 py-1 rounded-full text-[11px] font-semibold border ${statusClass}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                              {sub.status}
                            </span>
                          </td>
                          <td className="py-4 px-[22px] text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedContact(sub)}
                                className="inline-flex items-center gap-[5px] px-3.5 py-1.5 rounded-lg border-[1.5px] border-[#e2e8f0] bg-white text-xs font-semibold text-[#475569] cursor-pointer font-[family-name:var(--font-barlow)] transition-all duration-150 hover:bg-[#f1f5f9] hover:border-[#cbd5e1]"
                              >
                                <Eye className="h-[13px] w-[13px] text-[#818cf8]" />
                                View
                              </button>
                              <select
                                disabled={isUpdating === sub._id}
                                value={sub.status}
                                onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                                className="py-1.5 px-2.5 rounded-lg border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] text-[11px] font-medium text-[#475569] cursor-pointer font-[family-name:var(--font-barlow)] outline-none"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <button
                                onClick={() => handleDelete(sub._id)}
                                disabled={isDeleting === sub._id}
                                className="inline-flex items-center gap-[5px] px-2.5 py-1.5 rounded-lg border-[1.5px] border-[#fee2e2] bg-white text-xs font-semibold text-[#ef4444] cursor-pointer transition-all duration-150 hover:bg-[#fef2f2] hover:border-[#fca5a5] disabled:opacity-50"
                                title="Delete"
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

      {/* ─── Detail Modal ─── */}
      {selectedContact && (
        <div className="fixed inset-0 bg-[rgba(15,15,30,0.5)] backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-[720px] rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[85vh] animate-fade-up">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[#f1f5f9] bg-gradient-to-br from-[#1e1b4b] to-[#312e81]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-white m-0">Contact Details</h3>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="w-[34px] h-[34px] rounded-[10px] border border-white/15 bg-white/10 flex items-center justify-center cursor-pointer text-white transition-all duration-150 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModalSection title="Sender Info">
                  <DetailRow label="Name" value={selectedContact.name} />
                  <DetailRow label="Email" value={selectedContact.email} isLink />
                  <DetailRow label="Phone" value={selectedContact.phone} />
                </ModalSection>
                <ModalSection title="Location">
                  <DetailRow label="Address" value={selectedContact.address || "N/A"} />
                  <DetailRow label="City/Town" value={selectedContact.citytown || "N/A"} />
                  <DetailRow label="Province/State" value={selectedContact.province || "N/A"} />
                  <DetailRow label="Postal Code" value={selectedContact.postalcode || "N/A"} />
                </ModalSection>
              </div>

              {selectedContact.comments && (
                <div className="mt-5">
                  <ModalSection title="Message / Comments">
                    <div className="p-3.5 bg-[#f8fafc] rounded-[10px] border border-[#e2e8f0] text-[13px] text-[#334155] leading-relaxed whitespace-pre-wrap">
                      {selectedContact.comments}
                    </div>
                  </ModalSection>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-4 border-t border-[#f1f5f9] bg-[#fafbfc]">
              <button
                onClick={() => setSelectedContact(null)}
                className="py-2.5 px-7 rounded-[10px] border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-[13px] font-bold cursor-pointer font-[family-name:var(--font-barlow)] tracking-[0.5px] shadow-[0_4px_14px_rgba(102,126,234,0.3)] transition-all duration-200 hover:shadow-[0_8px_24px_rgba(102,126,234,0.4)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold tracking-[1.5px] uppercase text-[#818cf8] mb-3.5 pb-2 border-b-2 border-[#eef2ff]">
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function DetailRow({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#94a3b8] mb-0.5">
        {label}
      </div>
      {isLink && value && value !== "N/A" ? (
        <a
          href={`mailto:${value}`}
          className="text-[13px] font-medium text-[#6366f1] no-underline hover:underline"
        >
          {value}
        </a>
      ) : (
        <div className="text-[13px] font-medium text-[#1e293b]">{value}</div>
      )}
    </div>
  );
}
