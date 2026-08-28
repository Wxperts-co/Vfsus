"use client";

import { useState, useEffect, useRef } from "react";
import { ServicesPageData, ServiceData, ServiceSection, extractServicesVideoList } from "@/lib/page-services";
import TiptapEditor from "../common-components/TiptapEditor";
import AdminSidebar from "./AdminSidebar";
import { Save, Plus, Trash2, Edit2, X, MoveUp, MoveDown, Globe, Info, Video, Briefcase, Loader2, CheckCircle2, AlertCircle, Upload, Image as ImageIcon, RotateCcw } from "lucide-react";

export default function AdminServices() {
  const [data, setData] = useState<ServicesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("seo");
  
  // For editing a specific service
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingVideoIndex, setUploadingVideoIndex] = useState<number | null>(null);
  const [targetUploadIndex, setTargetUploadIndex] = useState<number | null>(null);

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
      const vList = extractServicesVideoList(dataToSave.video);
      const payload = {
        ...dataToSave,
        video: {
          ...dataToSave.video,
          videos: vList,
          wistiaUrl: vList[0] || "",
          wistiaUrl2: vList[1] || "",
        }
      };

      const res = await fetch("/api/admin/page-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#e8c97a]" />
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
      icon: "🛡️",
      image: "/images/services/services-1.jpg",
      excerpt: "Short description of the new service.",
      intro: ["First introductory paragraph."],
    };
    const newServices = [...data.services, newService];
    const newData = { ...data, services: newServices };
    setData(newData);
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
    if (!file || editingServiceIndex === null || !data) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "services");

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        const newServices = [...data.services];
        newServices[editingServiceIndex] = { ...newServices[editingServiceIndex], image: url };
        const updatedData = { ...data, services: newServices };
        setData(updatedData);
        await handleSave(updatedData);
        setMessage({ type: 'success', text: "Service image uploaded and saved successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to upload image");
      }
    } catch (err: any) {
      console.error("Upload error, using fallback reader:", err);
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = reader.result as string;
          const newServices = [...data.services];
          newServices[editingServiceIndex] = { ...newServices[editingServiceIndex], image: base64 };
          const updatedData = { ...data, services: newServices };
          setData(updatedData);
          await handleSave(updatedData);
          setMessage({ type: 'success', text: "Service image saved successfully!" });
          setTimeout(() => setMessage(null), 3000);
        };
        reader.readAsDataURL(file);
      } catch (fallbackErr) {
        alert("Error uploading image: " + (err.message || "Unknown error"));
      }
    } finally {
      setUploadingImage(false);
      if (e.target) e.target.value = "";
    }
  };

  const getVideosList = () => {
    return extractServicesVideoList(data?.video);
  };

  const addVideoItem = () => {
    if (!data) return;
    const currentList = getVideosList();
    const updated = [...currentList, ""];
    const newData = {
      ...data,
      video: {
        ...data.video,
        videos: updated,
        wistiaUrl: updated[0] || "",
        wistiaUrl2: updated[1] || "",
      },
    };
    setData(newData);
  };

  const removeVideoItem = async (index: number) => {
    if (!data) return;
    const currentList = getVideosList();
    const videoToRemove = currentList[index];
    if (videoToRemove && videoToRemove.startsWith("/uploads/")) {
      try {
        await fetch("/api/admin/upload-video", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: videoToRemove }),
        });
      } catch (err) {
        console.warn("Could not delete video file from server:", err);
      }
    }
    const updated = currentList.filter((_, i) => i !== index);
    const newData = {
      ...data,
      video: {
        ...data.video,
        videos: updated,
        wistiaUrl: updated[0] || "",
        wistiaUrl2: updated[1] || "",
      },
    };
    setData(newData);
  };

  const updateVideoItem = (index: number, val: string) => {
    if (!data) return;
    const currentList = [...getVideosList()];
    while (currentList.length <= index) currentList.push("");
    currentList[index] = val;
    const newData = {
      ...data,
      video: {
        ...data.video,
        videos: currentList,
        wistiaUrl: currentList[0] || "",
        wistiaUrl2: currentList[1] || "",
      },
    };
    setData(newData);
  };

  const triggerUpload = (index: number) => {
    setTargetUploadIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || targetUploadIndex === null) return;
    
    const idx = targetUploadIndex;
    setUploadingVideoIndex(idx);
    const formData = new FormData();
    formData.append("video", e.target.files[0]);
    formData.append("folder", "services");

    try {
      const res = await fetch("/api/admin/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMsg = "Upload failed";
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
        } catch (_) {}
        throw new Error(errorMsg);
      }

      const result = await res.json();
      updateVideoItem(idx, result.url);
    } catch (error: any) {
      console.error("Video upload error:", error);
      alert(error.message || "Failed to upload video. Please try again.");
    } finally {
      setUploadingVideoIndex(null);
      setTargetUploadIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
              Services Page Settings
            </h1>
            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="flex items-center gap-2 py-2 px-5 rounded-[10px] border-none bg-gradient-to-br from-[#eab308] to-[#e8c97a] text-white text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_14px_rgba(102,126,234,0.3)] disabled:opacity-70"
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
              { id: "main", label: "Intro", icon: Info },
              { id: "video", label: "Video", icon: Video },
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
                    ? "bg-[#131e35] text-[#e8c97a] border-t border-x border-[rgba(201,168,76,0.12)] border-b-transparent relative z-10"
                    : "text-[#8898aa] hover:text-[#e2e8f0] hover:bg-black/5 border-b-transparent"
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
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" /> Page SEO
                </h3>
                <div className="space-y-5 max-w-3xl">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={data.seo.title}
                      onChange={(e) => updateMainData("seo", e.target.value, "title")}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Description</label>
                    <textarea
                      value={data.seo.description}
                      onChange={(e) => updateMainData("seo", e.target.value, "description")}
                      rows={3}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Keywords</label>
                    <input
                      type="text"
                      value={data.seo.keywords}
                      onChange={(e) => updateMainData("seo", e.target.value, "keywords")}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── MAIN PAGE TAB ── */}
            {activeTab === "main" && (
              <div className="space-y-6">
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" /> Introduction Section
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Main Headline (HTML allowed)</label>
                      <input
                        type="text"
                        value={data.intro.headline}
                        onChange={(e) => updateMainData("intro", e.target.value, "headline")}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Introduction Text</label>
                      <TiptapEditor 
                        content={data.intro.contentHtml} 
                        onChange={(val) => updateMainData("intro", val, "contentHtml")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── VIDEO TAB ── */}
            {activeTab === "video" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(201,168,76,0.12)]">
                  <div>
                    <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2 m-0">
                      <Video className="h-5 w-5 text-purple-500" /> Video Section ({getVideosList().length} Videos)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 mb-0">Manage videos displayed on the Services page. You can add, edit, preview, and delete videos.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addVideoItem}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#eab308]/20 border border-[rgba(201,168,76,0.3)] py-2 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="h-4 w-4" /> Add Video
                  </button>
                </div>

                <div className="max-w-md">
                  <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Badge Text (above videos)</label>
                  <input
                    type="text"
                    value={data.video.badgeText}
                    onChange={(e) => updateMainData("video", e.target.value, "badgeText")}
                    className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    placeholder="e.g. Live Operations"
                  />
                </div>

                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                />

                <div className="space-y-4">
                  {getVideosList().map((videoUrl, idx) => {
                    const isDirect =
                      videoUrl.startsWith("/uploads/") ||
                      videoUrl.split("?")[0].toLowerCase().endsWith(".mp4") ||
                      videoUrl.split("?")[0].toLowerCase().endsWith(".webm") ||
                      videoUrl.split("?")[0].toLowerCase().endsWith(".ogg") ||
                      videoUrl.startsWith("/images/");

                    return (
                      <div
                        key={idx}
                        className="p-5 border border-[rgba(201,168,76,0.2)] rounded-xl bg-[#1a2845] space-y-4 relative group hover:border-[rgba(201,168,76,0.45)] transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-['Bebas_Neue',sans-serif] tracking-[1.5px] text-base text-[#e8c97a] flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#131e35] border border-[rgba(201,168,76,0.3)] text-xs flex items-center justify-center text-[#f4f6f8]">
                              {idx + 1}
                            </span>
                            Video #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeVideoItem(idx)}
                            className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Delete this video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="font-semibold">Delete</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[12px] font-semibold text-[#cbd5e1]">Video URL or Upload File</label>
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <input
                              type="text"
                              value={videoUrl}
                              onChange={(e) => updateVideoItem(idx, e.target.value)}
                              className="flex-1 bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                              placeholder="Paste Wistia / YouTube / MP4 URL or click upload..."
                            />
                            <button
                              type="button"
                              onClick={() => triggerUpload(idx)}
                              disabled={uploadingVideoIndex === idx}
                              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#131e35] hover:bg-[#0b1120] border border-[rgba(201,168,76,0.3)] text-[#e8c97a] rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                            >
                              {uploadingVideoIndex === idx ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Video className="w-4 h-4" />
                              )}
                              {uploadingVideoIndex === idx ? "Uploading..." : "Upload Video"}
                            </button>
                          </div>
                        </div>

                        {videoUrl && (
                          <div className="pt-3 border-t border-[rgba(201,168,76,0.1)]">
                            <div className="text-xs text-[#cbd5e1] font-semibold mb-2">Live Preview:</div>
                            <div className="max-w-md h-[180px] rounded-lg overflow-hidden border border-[rgba(201,168,76,0.2)] bg-black">
                              {isDirect ? (
                                <video
                                  src={videoUrl}
                                  controls
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <iframe
                                  src={videoUrl}
                                  scrolling="no"
                                  allowFullScreen
                                  className="w-full h-full border-none"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {getVideosList().length === 0 && (
                    <div className="text-center py-10 bg-[#1a2845]/50 border border-dashed border-[rgba(201,168,76,0.2)] rounded-xl">
                      <Video className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm mb-3">No videos currently configured on Services page.</p>
                      <button
                        type="button"
                        onClick={addVideoItem}
                        className="px-4 py-2 bg-[#eab308]/20 hover:bg-[#eab308]/30 text-[#e8c97a] rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add First Video
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── MANAGE SERVICES TAB ── */}
            {activeTab === "services" && editingServiceIndex === null && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-indigo-500" /> All Services ({data.services.length})
                  </h3>
                  <button
                    onClick={addNewService}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-2 px-4 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {data.services.map((service, index) => (
                    <div key={index} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 flex flex-col hover:border-[#818cf8] transition-colors relative group">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl bg-[#131e35] border border-[rgba(201,168,76,0.2)] w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">{service.icon}</span>
                        <div>
                          <h4 className="font-bold text-[#f4f6f8] line-clamp-1">{service.title}</h4>
                          <span className="text-[11px] font-semibold text-[#eab308] block">{service.slug}</span>
                        </div>
                      </div>
                      
                      <p className="text-[#8898aa] text-xs flex-1 line-clamp-2 mb-5 leading-relaxed">{service.excerpt}</p>
                      
                      <div className="flex justify-between items-center border-t border-[rgba(201,168,76,0.12)] pt-4 mt-auto">
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
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] hover:border-[#818cf8] hover:text-[#eab308] text-[#cbd5e1] rounded-md text-xs font-semibold transition-colors shadow-sm"
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
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
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
                      <h3 className="text-lg font-bold text-[#f4f6f8]">
                        Editing: <span className="text-[#e8c97a]">{data.services[editingServiceIndex].title || "New Service"}</span>
                      </h3>
                      <p className="text-xs text-[#8898aa]">Configure individual service content and layout.</p>
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
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-5 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-500" /> SEO Details
                  </h4>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Page Title</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].seo?.title || ""}
                        onChange={(e) => updateActiveServiceSEO("title", e.target.value)}
                        placeholder={`${data.services[editingServiceIndex].title} | Virginia Surveillance Force`}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Description</label>
                      <textarea
                        value={data.services[editingServiceIndex].seo?.description || ""}
                        onChange={(e) => updateActiveServiceSEO("description", e.target.value)}
                        placeholder={data.services[editingServiceIndex].excerpt}
                        rows={3}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Keywords</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].seo?.keywords || ""}
                        onChange={(e) => updateActiveServiceSEO("keywords", e.target.value)}
                        placeholder="e.g. security guards, concierge, retail security"
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span> 
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Service Title</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].title}
                        onChange={(e) => updateActiveService("title", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">URL Slug (e.g. security-guards)</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].slug}
                        onChange={(e) => updateActiveService("slug", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Icon (Emoji or character)</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].icon}
                        onChange={(e) => updateActiveService("icon", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Hero Image</label>
                      <div className="space-y-3">
                        {/* Image Preview & Upload Controls */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#131e35] p-3 rounded-xl border border-[rgba(201,168,76,0.2)]">
                          {/* Image Thumbnail */}
                          <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-[#0b1120] border border-[rgba(201,168,76,0.3)] shrink-0 flex items-center justify-center">
                            {data.services[editingServiceIndex].image ? (
                              <img
                                src={data.services[editingServiceIndex].image}
                                alt="Service Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/services/services-1.jpg";
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-8 h-8 text-slate-500" />
                            )}
                          </div>

                          {/* Upload / Change Button */}
                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#eab308] to-[#e8c97a] hover:opacity-95 text-[#0b1120] font-bold text-xs rounded-xl cursor-pointer transition-all shadow-sm">
                                {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                <span>{uploadingImage ? "Uploading & Saving..." : "Upload New Image"}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  disabled={uploadingImage}
                                  className="hidden"
                                />
                              </label>
                              
                              <button
                                type="button"
                                onClick={() => {
                                  const defaultImg = `/images/services/services-${Math.min(editingServiceIndex + 1, 16)}.jpg`;
                                  updateActiveService("image", defaultImg);
                                }}
                                className="flex items-center gap-1.5 px-3 py-2 bg-[#1a2845] hover:bg-[#223358] text-[#cbd5e1] border border-[rgba(201,168,76,0.2)] rounded-xl text-xs font-semibold transition-colors"
                                title="Reset to default service image"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Reset Default
                              </button>
                            </div>
                            
                            {/* URL Text input */}
                            <div>
                              <input
                                type="text"
                                value={data.services[editingServiceIndex].image || ""}
                                onChange={(e) => updateActiveService("image", e.target.value)}
                                placeholder="Image URL (e.g. /uploads/services/... or /images/...)"
                                className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-1.5 px-3 text-xs outline-none focus:border-[#818cf8]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Short Excerpt (For Grid Cards)</label>
                    <textarea
                      value={data.services[editingServiceIndex].excerpt}
                      onChange={(e) => updateActiveService("excerpt", e.target.value)}
                      rows={2}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                </div>

                {/* Intro Paragraphs */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-sm font-bold text-[#f4f6f8] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span> 
                      Introductory Paragraphs
                    </h4>
                    <button
                      onClick={() => {
                        const newIntro = [...(data.services[editingServiceIndex!].intro || []), ""];
                        updateActiveService("intro", newIntro);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
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
                          className="flex-1 bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl px-4 py-3 text-sm text-[#f4f6f8] outline-none focus:border-[#818cf8] resize-none"
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
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-sm font-bold text-[#f4f6f8] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs">3</span> 
                      Content Sections
                    </h4>
                    <button
                      onClick={() => {
                        const newSections = [...(data.services[editingServiceIndex!].sections || []), { heading: "New Heading", body: "Description text..." }];
                        updateActiveService("sections", newSections);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Section
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(data.services[editingServiceIndex].sections || []).map((sec, sIndex) => (
                      <div key={sIndex} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 relative group">
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
                          className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none mb-3 focus:border-[#818cf8]"
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
                          className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none resize-none focus:border-[#818cf8]"
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
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs">4</span> 
                    Optional: Staffing/Bullet Points List
                  </h4>
                  <div className="space-y-5 mb-6">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">List Heading</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].staffingHeading || ""}
                        onChange={(e) => updateActiveService("staffingHeading", e.target.value)}
                        placeholder="e.g. CONCIERGE STAFFING OPTIONS!"
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">List Intro Text</label>
                      <input
                        type="text"
                        value={data.services[editingServiceIndex].staffingIntro || ""}
                        onChange={(e) => updateActiveService("staffingIntro", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1]">Bullet Points</label>
                    <button
                      onClick={() => {
                        const newOpts = [...(data.services[editingServiceIndex!].staffingOptions || []), "New Option"];
                        updateActiveService("staffingOptions", newOpts);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1 rounded-md transition-colors flex items-center gap-1"
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
                          className="flex-1 bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#818cf8]"
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
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs">5</span> 
                    Closing Paragraph
                  </h4>
                  <textarea
                    value={data.services[editingServiceIndex].closing || ""}
                    onChange={(e) => updateActiveService("closing", e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
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
