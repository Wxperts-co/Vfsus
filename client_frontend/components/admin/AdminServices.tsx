"use client";

import { useState, useEffect } from "react";
import { ServicesPageData, ServiceData, ServiceSection } from "@/lib/page-services";
import TiptapEditor from "../common-components/TiptapEditor";
import AdminSidebar from "./AdminSidebar";
import { Save, Plus, Trash2, Edit2, X, MoveUp, MoveDown, Globe, Info, Video, Briefcase, Loader2, CheckCircle2, AlertCircle, Upload } from "lucide-react";

export default function AdminServices() {
  const [data, setData] = useState<ServicesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("seo");
  
  // For editing a specific service
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/page-services");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch services page data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (dataToSave = data) => {
    if (!dataToSave) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/page-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: "Services page data saved successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setMessage({ type: 'error', text: err.message || "Error saving settings" });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#f0f2f7]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#6366f1]" />
        </div>
      </div>
    );
  }

  // Helper to update main data
  const updateMainData = (field: string, value: any, subfield?: string) => {
    const newData = { ...data };
    if (subfield) {
      (newData as any)[field][subfield] = value;
    } else {
      (newData as any)[field] = value;
    }
    setData(newData);
  };

  // Helper to move service
  const moveService = (index: number, direction: 'up' | 'down') => {
    const newServices = [...data.services];
    if (direction === 'up' && index > 0) {
      const temp = newServices[index - 1];
      newServices[index - 1] = newServices[index];
      newServices[index] = temp;
    } else if (direction === 'down' && index < newServices.length - 1) {
      const temp = newServices[index + 1];
      newServices[index + 1] = newServices[index];
      newServices[index] = temp;
    }
    
    const newData = { ...data, services: newServices };
    setData(newData);
    handleSave(newData);
  };

  const deleteService = (index: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    const newServices = [...data.services];
    newServices.splice(index, 1);
    const newData = { ...data, services: newServices };
    setData(newData);
    handleSave(newData);
  };

  const addNewService = () => {
    const newService: ServiceData = {
      slug: "new-service-" + Date.now(),
      title: "New Service",
      icon: "✨",
      image: "/images/services/placeholder.jpg",
      excerpt: "Short description of the new service.",
      intro: ["First introductory paragraph."],
    };
    const newServices = [...data.services, newService];
    const newData = { ...data, services: newServices };
    setData(newData);
    handleSave(newData);
    setEditingServiceIndex(newServices.length - 1);
  };

  const updateActiveService = (field: keyof ServiceData, value: any) => {
    if (editingServiceIndex === null) return;
    const newServices = [...data.services];
    newServices[editingServiceIndex] = { ...newServices[editingServiceIndex], [field]: value };
    setData({ ...data, services: newServices });
  };

  const updateActiveServiceSEO = (field: "title" | "description" | "keywords", value: string) => {
    if (editingServiceIndex === null) return;
    const newServices = [...data.services];
    const service = newServices[editingServiceIndex];
    const newSeo = service.seo ? { ...service.seo, [field]: value } : { title: "", description: "", keywords: "", [field]: value };
    newServices[editingServiceIndex] = { ...service, seo: newSeo };
    setData({ ...data, services: newServices });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || editingServiceIndex === null) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        updateActiveService("image", url);
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#f0f2f7]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white/[0.92] backdrop-blur-lg border-b border-black/[0.06] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-[#1e1b4b] m-0">
              Services Page Settings
            </h1>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-2 py-2 px-5 rounded-[10px] border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_14px_rgba(102,126,234,0.3)] disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-7 max-w-[1200px] mx-auto w-full space-y-6">
          
          {/* Messages */}
          {message && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm font-semibold">{message.text}</span>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="flex gap-2 border-b border-black/10 overflow-x-auto pb-0">
            {[
              { id: "seo", label: "SEO", icon: Globe },
              { id: "main", label: "Main Page", icon: Info },
              { id: "services", label: "Manage Services", icon: Briefcase },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingServiceIndex(null);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-[14px] font-bold transition-all duration-200 whitespace-nowrap -mb-px ${
                  activeTab === tab.id
                    ? "bg-white text-[#6366f1] border-t border-x border-black/5 border-b-transparent relative z-10"
                    : "text-[#64748b] hover:text-[#334155] hover:bg-black/5 border-b-transparent"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 pb-20">
            
            {/* ── SEO TAB ── */}
            {activeTab === "seo" && (
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#1e293b] mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" /> Page SEO
                </h3>
                <div className="space-y-5 max-w-3xl">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={data.seo.title}
                      onChange={(e) => updateMainData("seo", e.target.value, "title")}
                      className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Meta Description</label>
                    <textarea
                      value={data.seo.description}
                      onChange={(e) => updateMainData("seo", e.target.value, "description")}
                      rows={3}
                      className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Meta Keywords</label>
                    <input
                      type="text"
                      value={data.seo.keywords}
                      onChange={(e) => updateMainData("seo", e.target.value, "keywords")}
                      className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── MAIN PAGE TAB ── */}
            {activeTab === "main" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#1e293b] mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" /> Introduction Section
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Main Headline (HTML allowed)</label>
                      <input
                        type="text"
                        value={data.intro.headline}
                        onChange={(e) => updateMainData("intro", e.target.value, "headline")}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Introduction Text</label>
                      <TiptapEditor 
                        content={data.intro.contentHtml} 
                        onChange={(val) => updateMainData("intro", val, "contentHtml")}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#1e293b] mb-4 flex items-center gap-2">
                    <Video className="h-5 w-5 text-purple-500" /> Video Section
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Badge Text</label>
                      <input
                        type="text"
                        value={data.video.badgeText}
                        onChange={(e) => updateMainData("video", e.target.value, "badgeText")}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Wistia / YouTube URL</label>
                      <input
                        type="text"
                        value={data.video.wistiaUrl}
                        onChange={(e) => updateMainData("video", e.target.value, "wistiaUrl")}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── MANAGE SERVICES TAB ── */}
            {activeTab === "services" && editingServiceIndex === null && (
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#1e293b] flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-indigo-500" /> All Services ({data.services.length})
                  </h3>
                  <button
                    onClick={addNewService}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#6366f1] bg-[#eef2ff] hover:bg-[#e0e7ff] py-2 px-4 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {data.services.map((service, index) => (
                    <div key={index} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 flex flex-col hover:border-[#818cf8] transition-colors relative group">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl bg-white border border-[#e2e8f0] w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">{service.icon}</span>
                        <div>
                          <h4 className="font-bold text-[#1e293b] line-clamp-1">{service.title}</h4>
                          <span className="text-[11px] font-semibold text-[#818cf8] block">{service.slug}</span>
                        </div>
                      </div>
                      
                      <p className="text-[#64748b] text-xs flex-1 line-clamp-2 mb-5 leading-relaxed">{service.excerpt}</p>
                      
                      <div className="flex justify-between items-center border-t border-black/5 pt-4 mt-auto">
                        <div className="flex gap-1.5">
                          <button onClick={() => moveService(index, 'up')} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md transition-colors">
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => moveService(index, 'down')} disabled={index === data.services.length - 1} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md transition-colors">
                            <MoveDown className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingServiceIndex(index)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e8f0] hover:border-[#818cf8] hover:text-[#818cf8] text-[#475569] rounded-md text-xs font-semibold transition-colors shadow-sm"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => deleteService(index)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── EDITING A SINGLE SERVICE ── */}
            {activeTab === "services" && editingServiceIndex !== null && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => {
                        setEditingServiceIndex(null);
                        handleSave();
                      }}
                      className="p-2 hover:bg-black/5 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold text-[#1e293b]">
                        Editing: <span className="text-[#6366f1]">{data.services[editingServiceIndex].title || "New Service"}</span>
                      </h3>
                      <p className="text-xs text-[#64748b]">Configure individual service content and layout.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSave();
                      setEditingServiceIndex(null);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" /> Save & Close
                  </button>
                </div>

                {/* Specific SEO for this Service */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500" /> SEO Details
                  </h4>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Page Title</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].seo?.title || ""}
                        onChange={(e) => updateActiveServiceSEO("title", e.target.value)}
                        placeholder={`${data.services[editingServiceIndex].title} | Virginia Surveillance Force`}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Meta Description</label>
                      <textarea
                        value={data.services[editingServiceIndex].seo?.description || ""}
                        onChange={(e) => updateActiveServiceSEO("description", e.target.value)}
                        placeholder={data.services[editingServiceIndex].excerpt}
                        rows={3}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Meta Keywords</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].seo?.keywords || ""}
                        onChange={(e) => updateActiveServiceSEO("keywords", e.target.value)}
                        placeholder="e.g. security guards, concierge, retail security"
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span> 
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Service Title</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].title}
                        onChange={(e) => updateActiveService("title", e.target.value)}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">URL Slug (e.g. security-guards)</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].slug}
                        onChange={(e) => updateActiveService("slug", e.target.value)}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Icon (Emoji or character)</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].icon}
                        onChange={(e) => updateActiveService("icon", e.target.value)}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Hero Image</label>
                      <div className="flex items-center gap-3">
                        <div className="relative overflow-hidden rounded-xl border border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-center h-[42px] px-4 w-full group transition-colors hover:border-[#818cf8]">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                          />
                          <div className="flex items-center gap-2 text-sm text-[#475569] font-medium group-hover:text-[#6366f1] transition-colors">
                            {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            <span>{uploadingImage ? "Uploading..." : "Click to Upload Image"}</span>
                          </div>
                        </div>
                      </div>
                      {data.services[editingServiceIndex].image && (
                        <div className="mt-2 text-xs text-[#64748b] break-all bg-[#f1f5f9] p-2 rounded-lg border border-[#e2e8f0]">
                          <span className="font-semibold text-[#475569]">Current:</span> {data.services[editingServiceIndex].image}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">Short Excerpt (For Grid Cards)</label>
                    <textarea
                      value={data.services[editingServiceIndex].excerpt}
                      onChange={(e) => updateActiveService("excerpt", e.target.value)}
                      rows={2}
                      className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                </div>

                {/* Intro Paragraphs */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-sm font-bold text-[#1e293b] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span> 
                      Introductory Paragraphs
                    </h4>
                    <button
                      onClick={() => {
                        const newIntro = [...(data.services[editingServiceIndex!].intro || []), ""];
                        updateActiveService("intro", newIntro);
                      }}
                      className="text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#475569] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Paragraph
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(data.services[editingServiceIndex].intro || []).map((para, pIndex) => (
                      <div key={pIndex} className="flex gap-3 relative group">
                        <textarea
                          value={para}
                          onChange={(e) => {
                            const newIntro = [...data.services[editingServiceIndex!].intro];
                            newIntro[pIndex] = e.target.value;
                            updateActiveService("intro", newIntro);
                          }}
                          rows={3}
                          className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#1e293b] outline-none focus:border-[#818cf8] resize-none"
                        />
                        <button
                          onClick={() => {
                            const newIntro = [...data.services[editingServiceIndex!].intro];
                            newIntro.splice(pIndex, 1);
                            updateActiveService("intro", newIntro);
                          }}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors h-fit self-start mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(!data.services[editingServiceIndex].intro || data.services[editingServiceIndex].intro.length === 0) && (
                      <p className="text-slate-400 text-sm italic py-4">No intro paragraphs added.</p>
                    )}
                  </div>
                </div>

                {/* Detailed Sections */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-sm font-bold text-[#1e293b] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs">3</span> 
                      Content Sections
                    </h4>
                    <button
                      onClick={() => {
                        const newSections = [...(data.services[editingServiceIndex!].sections || []), { heading: "New Heading", body: "Description text..." }];
                        updateActiveService("sections", newSections);
                      }}
                      className="text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#475569] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Section
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(data.services[editingServiceIndex].sections || []).map((sec, sIndex) => (
                      <div key={sIndex} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 relative group">
                        <button
                          onClick={() => {
                            const newSections = [...data.services[editingServiceIndex!].sections!];
                            newSections.splice(sIndex, 1);
                            updateActiveService("sections", newSections);
                          }}
                          className="absolute top-3 right-3 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <input
                          type="text"
                          value={sec.heading}
                          onChange={(e) => {
                            const newSections = [...data.services[editingServiceIndex!].sections!];
                            newSections[sIndex].heading = e.target.value;
                            updateActiveService("sections", newSections);
                          }}
                          className="w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#1e293b] font-bold text-sm outline-none mb-3 focus:border-[#818cf8]"
                          placeholder="Section Heading"
                        />
                        <textarea
                          value={sec.body}
                          onChange={(e) => {
                            const newSections = [...data.services[editingServiceIndex!].sections!];
                            newSections[sIndex].body = e.target.value;
                            updateActiveService("sections", newSections);
                          }}
                          rows={3}
                          className="w-full bg-white border border-[#e2e8f0] rounded-lg px-3 py-2 text-[#475569] text-sm outline-none resize-none focus:border-[#818cf8]"
                          placeholder="Section Body"
                        />
                      </div>
                    ))}
                    {(!data.services[editingServiceIndex].sections || data.services[editingServiceIndex].sections.length === 0) && (
                      <p className="text-slate-400 text-sm italic py-4">No sections added.</p>
                    )}
                  </div>
                </div>

                {/* Staffing Options (Optional Feature) */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#1e293b] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">4</span> 
                    Optional: Staffing/Bullet Points List
                  </h4>
                  <div className="space-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">List Heading</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].staffingHeading || ""}
                        onChange={(e) => updateActiveService("staffingHeading", e.target.value)}
                        placeholder="e.g. CONCIERGE STAFFING OPTIONS!"
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#475569] mb-1.5">List Intro Text</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].staffingIntro || ""}
                        onChange={(e) => updateActiveService("staffingIntro", e.target.value)}
                        className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-[13px] font-semibold text-[#475569]">Bullet Points</label>
                    <button
                      onClick={() => {
                        const newOpts = [...(data.services[editingServiceIndex!].staffingOptions || []), "New Option"];
                        updateActiveService("staffingOptions", newOpts);
                      }}
                      className="text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] hover:bg-[#f1f5f9] text-[#475569] px-3 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Point
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(data.services[editingServiceIndex].staffingOptions || []).map((opt, oIndex) => (
                      <div key={oIndex} className="flex gap-2 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] shrink-0 ml-1 mr-2" />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...data.services[editingServiceIndex!].staffingOptions!];
                            newOpts[oIndex] = e.target.value;
                            updateActiveService("staffingOptions", newOpts);
                          }}
                          className="flex-1 bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#818cf8]"
                        />
                        <button
                          onClick={() => {
                            const newOpts = [...data.services[editingServiceIndex!].staffingOptions!];
                            newOpts.splice(oIndex, 1);
                            updateActiveService("staffingOptions", newOpts);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing */}
                <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#1e293b] mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">5</span> 
                    Closing Paragraph
                  </h4>
                  <textarea
                    value={data.services[editingServiceIndex].closing || ""}
                    onChange={(e) => updateActiveService("closing", e.target.value)}
                    rows={3}
                    className="w-full bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
