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
  Paperclip,
  Download,
  FileBadge,
  GraduationCap,
  Briefcase,
  UserCheck,
  Calendar,
  ExternalLink
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface AttachedDocument {
  fieldName: string;
  originalName: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
}

interface ApplicationSubmission {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  cellPhone?: string;
  homePhone?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  appDate?: string;
  desiredRate?: string;
  positions?: string[];
  otherPosition?: string;
  statusDesired?: string[];
  shifts?: string[];
  locations?: string[];
  otherLocation?: string;
  nicknames?: string;
  eligibleUSA?: string;
  hasHighSchoolDiploma?: string;
  is18OrOlder?: string;
  hasDriversLicense?: string;
  driversLicenseNum?: string;
  highSchool?: {
    schoolName?: string;
    website?: string;
    address?: string;
    graduationDate?: string;
    canProvideProof?: string;
  };
  collegeEducation?: {
    school: string;
    major: string;
    credits: string;
    degree: string;
    yearsCompleted: string;
  }[];
  licensesAndCertificates?: {
    description: string;
    issuedBy: string;
    idNum: string;
    expirationDate: string;
  }[];
  questionnaire?: Record<string, string>;
  workHistory?: {
    company: string;
    address: string;
    phone: string;
    website: string;
    supervisor: string;
    startDate: string;
    endDate: string;
    supervisorEmail: string;
    supervisorPhone: string;
    reasonForLeaving: string;
    jobTitle: string;
    jobDuties: string;
  }[];
  references?: {
    name: string;
    phone: string;
    address: string;
    yearsKnown: string;
    email: string;
  }[];
  availability?: {
    currentlyEmployed?: string;
    currentEmploymentShifts?: string;
    vsfAvailability?: string;
    travelDistance?: string;
    bestTimeToContact?: string;
    interviewDays?: string;
  };
  applicantSignature?: string;
  signatureDate?: string;
  documents?: AttachedDocument[];
  status: string;
  createdAt: string;
  notes?: string;
}

export default function AdminEmploymentApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState<ApplicationSubmission | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const fetchApplications = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/employment-applications");
      if (!res.ok) throw new Error("Database server error.");
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err: any) {
      setError(err.message || "Error loading records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (selectedApp) {
      setAdminNotes(selectedApp.notes || "");
    }
  }, [selectedApp]);

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
      const res = await fetch("/api/admin/employment-applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status.");
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApp?._id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message || "Error updating status.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setIsUpdating(selectedApp._id);
    try {
      const res = await fetch("/api/admin/employment-applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedApp._id, status: selectedApp.status, notes: adminNotes }),
      });
      if (!res.ok) throw new Error("Failed to save notes.");
      setApplications((prev) =>
        prev.map((app) => (app._id === selectedApp._id ? { ...app, notes: adminNotes } : app))
      );
      setSelectedApp((prev) => (prev ? { ...prev, notes: adminNotes } : null));
      alert("Notes saved successfully.");
    } catch (err: any) {
      alert(err.message || "Error saving notes.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this application?")) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/employment-applications?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete application.");
      setApplications((prev) => prev.filter((app) => app._id !== id));
      if (selectedApp?._id === id) {
        setSelectedApp(null);
      }
    } catch (err: any) {
      alert(err.message || "Error deleting record.");
    } finally {
      setIsDeleting(null);
    }
  };

  const totalCount = applications.length;
  const pendingCount = applications.filter((s) => s.status === "Pending").length;
  const inReviewCount = applications.filter((s) => s.status === "In Review" || s.status === "Interview Scheduled").length;
  const hiredCount = applications.filter((s) => s.status === "Hired" || s.status === "Completed").length;

  const filteredApplications = applications.filter((app) => {
    const fullName = `${app.firstName || ""} ${app.lastName || ""}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.cellPhone?.includes(searchQuery) ||
      (Array.isArray(app.positions) && app.positions.join(" ").toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statCards = [
    {
      label: "Total Applications",
      value: totalCount,
      icon: Users,
      gradient: "from-[#eab308] to-[#e8c97a]",
      shadow: "shadow-[0_8px_24px_rgba(234,179,8,0.25)]",
    },
    {
      label: "Pending Review",
      value: pendingCount,
      icon: AlertCircle,
      gradient: "from-[#131e35] to-[#1a2845]",
      shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
    },
    {
      label: "In Review / Interview",
      value: inReviewCount,
      icon: Activity,
      gradient: "from-[#131e35] to-[#1a2845]",
      shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
    },
    {
      label: "Hired / Completed",
      value: hiredCount,
      icon: CheckCircle,
      gradient: "from-[#131e35] to-[#1a2845]",
      shadow: "shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
    },
  ];

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <div className="bg-[#0b1120] rounded-[10px] px-4 py-1.5 flex items-center">
                <img
                  src="/images/logo2.png"
                  alt="VSF Admin"
                  className="h-[30px] w-auto object-contain"
                />
              </div>
              <div className="w-px h-6 bg-[rgba(201,168,76,0.2)]" />
              <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
                Employment Applications
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-[9px] h-[15px] w-[15px] text-[#94a3b8]" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[240px] bg-[#1a2845] border-[1.5px] border-[rgba(201,168,76,0.2)] rounded-[10px] py-2 pl-9 pr-3.5 text-[13px] text-[#f4f6f8] outline-none focus:border-[#eab308]"
                />
              </div>
              <button
                onClick={fetchApplications}
                className="flex items-center gap-1.5 py-2 px-4 rounded-[10px] border-[1.5px] border-[rgba(201,168,76,0.2)] bg-[#131e35] text-xs font-semibold text-[#cbd5e1] cursor-pointer transition-all hover:bg-[#1a2845]"
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
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} p-6 ${card.shadow} transition-all duration-300 hover:-translate-y-[3px] border border-[rgba(201,168,76,0.12)]`}
                >
                  <div className="relative z-[1]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-white/85 uppercase tracking-[1px]">
                        {card.label}
                      </span>
                      <div className="w-[38px] h-[38px] rounded-xl bg-[#0b1120]/30 backdrop-blur-sm flex items-center justify-center">
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
          <div className="bg-[#131e35] rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.12)] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-[18px] border-b border-[rgba(201,168,76,0.15)] flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#eab308]" />
                <span className="text-sm font-bold text-white">Received Applications</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#eab308]/10 text-[#e8c97a]">
                  {filteredApplications.length}
                </span>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {["All", "Pending", "In Review", "Interview Scheduled", "Hired", "Rejected"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? "bg-[#eab308] text-[#0b1120] shadow-md shadow-yellow-500/20"
                        : "bg-[#1a2845] text-[#8898aa] hover:text-[#f4f6f8]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="py-20 text-center flex flex-col items-center gap-3.5">
                <div className="w-12 h-12 rounded-[14px] bg-[#eab308]/20 flex items-center justify-center">
                  <RefreshCw className="h-[22px] w-[22px] text-[#eab308] animate-spin" />
                </div>
                <p className="text-sm text-[#8898aa] font-medium">Loading applications...</p>
              </div>
            ) : error ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-[14px] bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-[22px] w-[22px] text-red-500" />
                </div>
                <p className="text-sm font-semibold text-red-500">Failed to Load Applications</p>
                <p className="text-xs text-[#94a3b8] mt-1">{error}</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-[20px] bg-[#1a2845] flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-7 w-7 text-[#eab308]" />
                </div>
                <p className="text-[15px] font-bold text-white">No Applications Found</p>
                <p className="text-[13px] text-[#94a3b8] mt-1">
                  Applications will appear here once candidates submit the online form.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#1a2845]">
                      {["Applicant Name", "Positions / Rates", "Contact Info", "Date", "Documents", "Status", "Actions"].map((h) => (
                        <th
                          key={h}
                          className={`py-3.5 px-5 text-[11px] font-bold tracking-[0.8px] uppercase text-[#94a3b8] border-b border-[rgba(201,168,76,0.15)] ${
                            h === "Actions" ? "text-right" : ""
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => {
                      const formattedDate = new Date(app.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                      const posText = Array.isArray(app.positions) && app.positions.length > 0 
                        ? app.positions.join(", ") 
                        : (app.otherPosition || "Security Officer");

                      const docsCount = Array.isArray(app.documents) ? app.documents.length : 0;

                      const statusColor =
                        app.status === "Hired" || app.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : app.status === "In Review" || app.status === "Interview Scheduled"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : app.status === "Rejected"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30";

                      return (
                        <tr key={app._id} className="border-b border-[rgba(201,168,76,0.1)] hover:bg-[#1a2845]/40 transition-colors">
                          <td className="py-4 px-5">
                            <div className="text-[13px] font-bold text-[#f4f6f8]">
                              {app.firstName} {app.middleName ? `${app.middleName} ` : ""}{app.lastName}
                            </div>
                            <div className="text-[11px] text-[#8898aa]">
                              {app.city ? `${app.city}, ${app.state || "VA"}` : "—"}
                            </div>
                          </td>

                          <td className="py-4 px-5">
                            <div className="text-[13px] font-medium text-[#e8c97a]">{posText}</div>
                            <div className="text-[11px] text-[#94a3b8]">
                              {app.desiredRate ? `$${app.desiredRate}/hr` : "No rate set"}
                            </div>
                          </td>

                          <td className="py-4 px-5">
                            <div className="text-[12px] text-[#cbd5e1]">{app.cellPhone || app.phone || app.homePhone || "—"}</div>
                            <div className="text-[11px] text-[#8898aa]">{app.email}</div>
                          </td>

                          <td className="py-4 px-5 text-xs text-[#8898aa] whitespace-nowrap">
                            {formattedDate}
                          </td>

                          <td className="py-4 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                              docsCount > 0 ? "bg-[#eab308]/15 border-[#eab308]/30 text-[#e8c97a]" : "bg-gray-800 border-gray-700 text-gray-400"
                            }`}>
                              <Paperclip className="w-3 h-3" />
                              {docsCount} {docsCount === 1 ? "File" : "Files"}
                            </span>
                          </td>

                          <td className="py-4 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${statusColor}`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {app.status}
                            </span>
                          </td>

                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(201,168,76,0.3)] bg-[#1a2845] text-xs font-semibold text-[#cbd5e1] hover:bg-[#223358] hover:border-[#eab308] transition-all cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5 text-[#eab308]" /> View Details
                              </button>

                              <select
                                disabled={isUpdating === app._id}
                                value={app.status}
                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                className="py-1.5 px-2 rounded-lg border border-[rgba(201,168,76,0.2)] bg-[#1a2845] text-[11px] font-medium text-[#cbd5e1] outline-none cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Review">In Review</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                              </select>

                              <button
                                onClick={() => handleDelete(app._id)}
                                disabled={isDeleting === app._id}
                                className="inline-flex items-center p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50 cursor-pointer"
                                title="Delete application"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
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

      {/* DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#131e35] border border-[rgba(201,168,76,0.3)] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-fade-up my-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-[rgba(201,168,76,0.2)] bg-gradient-to-r from-[#0b1120] to-[#1a2845]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eab308]/20 border border-[#eab308]/40 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-[#eab308]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white m-0">
                    {selectedApp.firstName} {selectedApp.middleName ? `${selectedApp.middleName} ` : ""}{selectedApp.lastName}
                  </h3>
                  <p className="text-xs text-[#8898aa]">
                    Submitted: {new Date(selectedApp.createdAt).toLocaleString()} &bull; Status: <strong className="text-[#e8c97a]">{selectedApp.status}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-lg bg-[#1a2845] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#8898aa] hover:text-white transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* ATTACHED DOCUMENTS SECTION */}
              <div className="bg-[#0b1120] p-5 rounded-xl border border-[rgba(201,168,76,0.25)]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#eab308] flex items-center gap-2 mb-3">
                  <Paperclip className="w-4 h-4" /> Attached Applicant Documents ({selectedApp.documents?.length || 0})
                </h4>
                {selectedApp.documents && selectedApp.documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedApp.documents.map((doc, idx) => (
                      <div key={idx} className="p-3 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg flex flex-col justify-between space-y-2">
                        <div>
                          <span className="text-[11px] font-bold text-[#e8c97a] uppercase block">{doc.fieldName}</span>
                          <p className="text-xs text-white truncate font-medium mt-0.5">{doc.originalName}</p>
                          <span className="text-[10px] text-[#8898aa]">{(doc.size / 1024).toFixed(0)} KB</span>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 bg-[#eab308] hover:bg-[#e8c97a] text-[#0b1120] text-xs font-bold rounded transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" /> View / Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8898aa]">No documents were attached with this application.</p>
                )}
              </div>

              {/* SECTION: PERSONAL & APPLICATION DETAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Applicant Information
                  </h4>
                  <DetailRow label="Full Legal Name" value={`${selectedApp.firstName} ${selectedApp.middleName || ""} ${selectedApp.lastName}`} />
                  <DetailRow label="Email" value={selectedApp.email} isLink />
                  <DetailRow label="Cell Phone" value={selectedApp.cellPhone} />
                  <DetailRow label="Home Phone" value={selectedApp.homePhone} />
                  <DetailRow label="Street Address" value={`${selectedApp.address || ""}, ${selectedApp.city || ""} ${selectedApp.state || ""} ${selectedApp.zip || ""}`} />
                  <DetailRow label="Nicknames / Aliases" value={selectedApp.nicknames} />
                  <DetailRow label="Authorized to work in USA" value={selectedApp.eligibleUSA} />
                  <DetailRow label="Driver's License" value={selectedApp.hasDriversLicense === 'Yes' ? `Yes (${selectedApp.driversLicenseNum || "No #"})` : selectedApp.hasDriversLicense} />
                  <DetailRow label="18 Years or Older" value={selectedApp.is18OrOlder} />
                  <DetailRow label="High School Diploma/GED" value={selectedApp.hasHighSchoolDiploma} />
                </div>

                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Position & Schedule Preferences
                  </h4>
                  <DetailRow label="Positions Applied" value={Array.isArray(selectedApp.positions) ? selectedApp.positions.join(", ") : selectedApp.positions} />
                  {selectedApp.otherPosition && <DetailRow label="Other Position" value={selectedApp.otherPosition} />}
                  <DetailRow label="Desired Hourly Rate" value={selectedApp.desiredRate ? `$${selectedApp.desiredRate}/hr` : undefined} />
                  <DetailRow label="Status Desired" value={Array.isArray(selectedApp.statusDesired) ? selectedApp.statusDesired.join(", ") : selectedApp.statusDesired} />
                  <DetailRow label="Shifts" value={Array.isArray(selectedApp.shifts) ? selectedApp.shifts.join(", ") : selectedApp.shifts} />
                  <DetailRow label="Jurisdictions / Locations" value={Array.isArray(selectedApp.locations) ? selectedApp.locations.join(", ") : selectedApp.locations} />
                  {selectedApp.otherLocation && <DetailRow label="Other Location" value={selectedApp.otherLocation} />}
                  <DetailRow label="Currently Employed" value={selectedApp.availability?.currentlyEmployed} />
                  <DetailRow label="Current Shifts" value={selectedApp.availability?.currentEmploymentShifts} />
                  <DetailRow label="VSF Availability" value={selectedApp.availability?.vsfAvailability} />
                  <DetailRow label="Travel Distance" value={selectedApp.availability?.travelDistance} />
                  <DetailRow label="Interview Days" value={selectedApp.availability?.interviewDays} />
                </div>
              </div>

              {/* SECTION: QUESTIONNAIRE */}
              {selectedApp.questionnaire && (
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Employment Questionnaire Responses
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { key: 'q1_firearm', label: '1. Own or possess a firearm?' },
                      { key: 'q3_military', label: '2. US Military Service?' },
                      { key: 'q4_police_federal', label: '3. Police / Fed Agency / National Guard?' },
                      { key: 'q5_drug_testing', label: '4. Drug testing consent (law/policy/position)?' },
                      { key: 'q6_field_experience', label: '5. Security field experience?' },
                      { key: 'q9_conflict_interest', label: '6. Security firm conflict of interest?' },
                      { key: 'q10_currently_employed_security', label: '7. Currently employed with security firm?' },
                      { key: 'q11_contact_employer', label: '8. May contact present employer?' },
                      { key: 'q12_driving_criminal_record', label: '9. Can provide driving/criminal record?' },
                    ].map((item) => {
                      const ans = selectedApp.questionnaire?.[item.key];
                      return (
                        <div key={item.key} className="flex justify-between items-center p-2 bg-[#131e35] rounded border border-[rgba(201,168,76,0.1)]">
                          <span className="text-[#8898aa] pr-2">{item.label}</span>
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${
                            ans === 'Yes' ? 'bg-emerald-500/20 text-emerald-300' : ans === 'No' ? 'bg-amber-500/20 text-amber-300' : 'text-gray-500'
                          }`}>
                            {ans || '—'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION: LICENSES & EDUCATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Licenses & Registrations
                  </h4>
                  {selectedApp.licensesAndCertificates && selectedApp.licensesAndCertificates.length > 0 ? (
                    selectedApp.licensesAndCertificates.map((lic, idx) => (
                      <div key={idx} className="p-2.5 bg-[#131e35] rounded border border-[rgba(201,168,76,0.1)] text-xs space-y-1">
                        <div className="font-bold text-white">{lic.description}</div>
                        <div className="text-[#8898aa]">Issued By: {lic.issuedBy || "—"} &bull; ID#: {lic.idNum || "—"}</div>
                        <div className="text-[#e8c97a]">Exp: {lic.expirationDate || "—"}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#8898aa]">None listed.</p>
                  )}
                </div>

                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Education & Training
                  </h4>
                  {selectedApp.highSchool?.schoolName && (
                    <div className="p-2.5 bg-[#131e35] rounded border border-[rgba(201,168,76,0.1)] text-xs">
                      <div className="font-bold text-white">High School: {selectedApp.highSchool.schoolName}</div>
                      <div className="text-[#8898aa]">Grad Date: {selectedApp.highSchool.graduationDate || "—"}</div>
                    </div>
                  )}
                  {selectedApp.collegeEducation && selectedApp.collegeEducation.length > 0 ? (
                    selectedApp.collegeEducation.map((c, idx) => (
                      <div key={idx} className="p-2.5 bg-[#131e35] rounded border border-[rgba(201,168,76,0.1)] text-xs space-y-1">
                        <div className="font-bold text-white">{c.school}</div>
                        <div className="text-[#8898aa]">{c.degree} ({c.major}) &bull; {c.yearsCompleted}</div>
                      </div>
                    ))
                  ) : null}
                </div>
              </div>

              {/* SECTION: WORK HISTORY */}
              {selectedApp.workHistory && selectedApp.workHistory.length > 0 && (
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    Work History (Past 5 Years)
                  </h4>
                  <div className="space-y-3">
                    {selectedApp.workHistory.map((w, idx) => (
                      <div key={idx} className="p-3 bg-[#131e35] rounded-lg border border-[rgba(201,168,76,0.1)] text-xs space-y-1.5">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <span className="font-bold text-white text-sm">{w.jobTitle || "Security Officer"}</span> &bull; <span className="text-[#e8c97a]">{w.company}</span>
                            <div className="text-[#8898aa]">{w.address}</div>
                          </div>
                          <span className="px-2.5 py-0.5 bg-[#1a2845] rounded text-[11px] text-[#cbd5e1] font-semibold">
                            {w.startDate} — {w.endDate}
                          </span>
                        </div>
                        <div className="text-[#cbd5e1]">
                          Supervisor: {w.supervisor} ({w.supervisorPhone || w.supervisorEmail || "—"})
                        </div>
                        <div className="text-[#8898aa]">
                          Reason for leaving: {w.reasonForLeaving || "—"}
                        </div>
                        {w.jobDuties && (
                          <div className="p-2 bg-[#0b1120] rounded text-[#cbd5e1] mt-1">
                            Duties: {w.jobDuties}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: REFERENCES */}
              {selectedApp.references && selectedApp.references.length > 0 && (
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308] border-b border-[rgba(201,168,76,0.15)] pb-2">
                    References
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedApp.references.map((r, idx) => (
                      <div key={idx} className="p-3 bg-[#131e35] rounded border border-[rgba(201,168,76,0.1)] text-xs space-y-1">
                        <div className="font-bold text-white">{r.name}</div>
                        <div className="text-[#e8c97a]">{r.phone}</div>
                        <div className="text-[#8898aa]">{r.email}</div>
                        <div className="text-[#8898aa]">Known: {r.yearsKnown}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: SIGNATURE & NOTES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308]">Applicant Signature</h4>
                  <div className="p-3 bg-[#131e35] rounded border border-[rgba(201,168,76,0.2)]">
                    <p className="text-sm font-bold text-white tracking-wider">{selectedApp.applicantSignature || "—"}</p>
                    <p className="text-[11px] text-[#8898aa] mt-1">Signed on: {selectedApp.signatureDate || "—"}</p>
                  </div>
                </div>

                <div className="p-4 bg-[#0b1120] rounded-xl border border-[rgba(201,168,76,0.15)] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#eab308]">Internal Admin Notes</h4>
                  <textarea
                    rows={3}
                    placeholder="Enter notes about interview, background check, license verification..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full p-2.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    disabled={isUpdating === selectedApp._id}
                    className="px-3 py-1 bg-[#eab308] hover:bg-[#e8c97a] text-[#0b1120] text-xs font-bold rounded cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-[rgba(201,168,76,0.2)] bg-[#0b1120]">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8898aa]">Update Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleStatusChange(selectedApp._id, e.target.value)}
                  className="py-1.5 px-3 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg text-xs font-bold text-[#eab308] outline-none cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="py-2 px-6 rounded-lg bg-[#1a2845] hover:bg-[#223358] text-white text-xs font-bold border border-[rgba(201,168,76,0.2)] cursor-pointer"
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

function DetailRow({ label, value, isLink }: { label: string; value?: string; isLink?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <div className="text-[10px] font-bold tracking-[0.5px] uppercase text-[#8898aa] mb-0.5">{label}</div>
      {isLink ? (
        <a href={`mailto:${value}`} className="text-xs font-medium text-[#e8c97a] hover:underline">
          {value}
        </a>
      ) : (
        <div className="text-xs font-medium text-[#f4f6f8]">{value}</div>
      )}
    </div>
  );
}
