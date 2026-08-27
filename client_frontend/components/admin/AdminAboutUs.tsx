"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save, Globe, Video, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, Edit2, X, Info, ShieldCheck, HelpCircle, BookOpen, ChevronLeft, ChevronRight, BarChart2
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import TiptapEditor from "../common-components/TiptapEditor";
import { AboutUsPageData, defaultAboutUsData, extractVideoList } from "@/lib/page-about-us";

type TabId = "seo" | "intro" | "video" | "stats" | "promises" | "training";

export default function AdminAboutUs() {
  const [data, setData] = useState<AboutUsPageData>(defaultAboutUsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("seo");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingVideoIndex, setUploadingVideoIndex] = useState<number | null>(null);
  const [targetUploadIndex, setTargetUploadIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/page-about-us");
        if (res.ok) {
          const result = await res.json();
          if (result.data) {
            setData(result.data);
          }
        }
      } catch (err) {
        console.error("Failed to load about us page data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const vList = extractVideoList(data.video);
      const dataToSave = {
        ...data,
        video: {
          ...data.video,
          videos: vList,
          wistiaUrl: vList[0] || "",
          wistiaUrl2: vList[1] || "",
        }
      };

      const res = await fetch("/api/admin/page-about-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: "About Us page data saved successfully!" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(result.error || "Failed to save data");
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const updateNested = (category: keyof AboutUsPageData, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value
      }
    }));
  };

  const getVideosList = () => {
    return extractVideoList(data.video);
  };

  const addVideoItem = () => {
    const currentList = getVideosList();
    const updated = [...currentList, ""];
    setData((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        videos: updated,
        wistiaUrl: updated[0] || "",
        wistiaUrl2: updated[1] || "",
      },
    }));
  };

  const removeVideoItem = async (index: number) => {
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
    setData((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        videos: updated,
        wistiaUrl: updated[0] || "",
        wistiaUrl2: updated[1] || "",
      },
    }));
  };

  const updateVideoItem = (index: number, val: string) => {
    const currentList = [...getVideosList()];
    while (currentList.length <= index) currentList.push("");
    currentList[index] = val;
    setData((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        videos: currentList,
        wistiaUrl: currentList[0] || "",
        wistiaUrl2: currentList[1] || "",
      },
    }));
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
    formData.append("folder", "about-us");

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

  const addArrayItem = (category: "stats" | "promises" | "training", defaultItem: any) => {
    setData((prev) => {
      const categoryData = prev[category];
      if (Array.isArray(categoryData)) {
        return { ...prev, [category]: [...categoryData, defaultItem] };
      } else {
        return {
          ...prev,
          [category]: {
            ...categoryData,
            items: [...(categoryData as any).items, defaultItem]
          }
        };
      }
    });
  };

  const removeArrayItem = (category: "stats" | "promises" | "training", index: number) => {
    setData((prev) => {
      const categoryData = prev[category];
      if (Array.isArray(categoryData)) {
        const newArr = [...categoryData];
        newArr.splice(index, 1);
        return { ...prev, [category]: newArr };
      } else {
        const newArr = [...(categoryData as any).items];
        newArr.splice(index, 1);
        return {
          ...prev,
          [category]: { ...categoryData, items: newArr }
        };
      }
    });
  };

  const updateArrayItem = (category: "stats" | "promises" | "training", index: number, field: string, value: any) => {
    setData((prev) => {
      const categoryData = prev[category];
      if (Array.isArray(categoryData)) {
        const newArr = [...categoryData];
        newArr[index] = { ...newArr[index], [field]: value };
        return { ...prev, [category]: newArr };
      } else {
        const newArr = [...(categoryData as any).items];
        newArr[index] = { ...newArr[index], [field]: value };
        return {
          ...prev,
          [category]: { ...categoryData, items: newArr }
        };
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#e8c97a]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
              About Us Page Settings
            </h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 py-2 px-5 rounded-[10px] border-none bg-gradient-to-br from-[#eab308] to-[#e8c97a] text-white text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_14px_rgba(102,126,234,0.3)] disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Content */}
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
              { id: "intro", label: "Intro", icon: Info },
              { id: "video", label: "Video", icon: Video },
              { id: "stats", label: "Stats", icon: BarChart2 },
              { id: "promises", label: "Promises", icon: ShieldCheck },
              { id: "training", label: "Training", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
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
            
            {/* SEO Metadata */}
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
                      onChange={(e) => updateNested("seo", "title", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Description</label>
                    <textarea
                      value={data.seo.description}
                      onChange={(e) => updateNested("seo", "description", e.target.value)}
                      rows={3}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Keywords</label>
                    <input
                      type="text"
                      value={data.seo.keywords}
                      onChange={(e) => updateNested("seo", "keywords", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Intro */}
            {activeTab === "intro" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" /> Introduction Section
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Headline */}
                  <div className="md:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Left Part (White)</label>
                      <input
                        type="text"
                        value={data.intro.headlineLeft}
                        onChange={(e) => updateNested("intro", "headlineLeft", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Right Part (Gold)</label>
                      <input
                        type="text"
                        value={data.intro.headlineRight}
                        onChange={(e) => updateNested("intro", "headlineRight", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  {/* Left Column Content */}
                  <div className="space-y-1.5">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1]">Left Column Content</label>
                    <TiptapEditor 
                      content={data.intro.contentLeftHtml} 
                      onChange={(val) => updateNested("intro", "contentLeftHtml", val)} 
                    />
                  </div>

                  {/* Right Column Content */}
                  <div className="space-y-1.5">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1]">Right Column Content</label>
                    <TiptapEditor 
                      content={data.intro.contentRightHtml} 
                      onChange={(val) => updateNested("intro", "contentRightHtml", val)} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Video */}
            {activeTab === "video" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(201,168,76,0.12)]">
                  <div>
                    <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2 m-0">
                      <Video className="h-5 w-5 text-purple-500" /> Video Section ({getVideosList().length} Videos)
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 mb-0">Manage videos displayed on the About Us page. You can add, edit, preview, and delete videos.</p>
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
                    onChange={(e) => updateNested("video", "badgeText", e.target.value)}
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
                      <p className="text-slate-400 text-sm mb-3">No videos currently configured on About Us page.</p>
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

            {/* Stats */}
            {activeTab === "stats" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-indigo-500" /> Stats ({data.stats.length})
                  </h3>
                  <button 
                    onClick={() => addArrayItem("stats", { id: `s_${Date.now()}`, icon: "⭐", label: "New Stat" })}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-1.5 px-3 rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Stat
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.stats.map((stat, index) => (
                    <div key={stat.id || index} className="p-4 border border-[rgba(201,168,76,0.2)] rounded-xl bg-[#1a2845] relative group">
                      <button onClick={() => removeArrayItem("stats", index)} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100" title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="space-y-4 pr-6">
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">Emoji Icon</label>
                          <input type="text" value={stat.icon} onChange={(e) => updateArrayItem("stats", index, "icon", e.target.value)} className="w-16 text-center bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-1.5 px-2 text-sm outline-none focus:border-[#818cf8]" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">Label</label>
                          <input type="text" value={stat.label} onChange={(e) => updateArrayItem("stats", index, "label", e.target.value)} className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-1.5 px-3 text-sm outline-none focus:border-[#818cf8]" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.stats.length === 0 && <p className="text-sm text-slate-500 py-6 md:col-span-3 text-center">No stats added yet.</p>}
                </div>
              </div>
            )}

            {/* Promises */}
            {activeTab === "promises" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-amber-500" /> Promises ({data.promises.items.length})
                  </h3>
                  <button 
                    onClick={() => addArrayItem("promises", { id: `p_${Date.now()}`, title: "New Promise", body: "Description goes here..." })}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-1.5 px-3 rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Promise
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[rgba(201,168,76,0.12)]">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Left Part (White)</label>
                    <input
                      type="text"
                      value={data.promises.headlineLeft}
                      onChange={(e) => updateNested("promises", "headlineLeft", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Right Part (Gold)</label>
                    <input
                      type="text"
                      value={data.promises.headlineRight}
                      onChange={(e) => updateNested("promises", "headlineRight", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.promises.items.map((promise, index) => (
                    <div key={promise.id || index} className="p-4 border border-[rgba(201,168,76,0.2)] rounded-xl bg-[#1a2845] relative group">
                      <button onClick={() => removeArrayItem("promises", index)} className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100" title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="space-y-4 pr-6">
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">Title</label>
                          <input type="text" value={promise.title} onChange={(e) => updateArrayItem("promises", index, "title", e.target.value)} className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-1.5 px-3 text-sm outline-none focus:border-[#818cf8]" />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">Body Text</label>
                          <textarea value={promise.body} onChange={(e) => updateArrayItem("promises", index, "body", e.target.value)} rows={3} className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-1.5 px-3 text-sm outline-none focus:border-[#818cf8] resize-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.promises.items.length === 0 && <p className="text-sm text-slate-500 py-6 md:col-span-2 text-center">No promises added yet.</p>}
                </div>
              </div>
            )}

            {/* Training */}
            {activeTab === "training" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-500" /> Training Settings
                  </h3>
                  <button 
                    onClick={() => addArrayItem("training", { id: `t_${Date.now()}`, text: "New training item" })}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-1.5 px-3 rounded-lg transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Training Item
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Left Part (White)</label>
                    <input
                      type="text"
                      value={data.training.headlineLeft}
                      onChange={(e) => updateNested("training", "headlineLeft", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Headline Right Part (Gold)</label>
                    <input
                      type="text"
                      value={data.training.headlineRight}
                      onChange={(e) => updateNested("training", "headlineRight", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Introduction Paragraph</label>
                    <TiptapEditor 
                      content={data.training.introHtml} 
                      onChange={(val) => updateNested("training", "introHtml", val)} 
                    />
                  </div>
                </div>

                <h4 className="font-semibold text-sm text-[#e2e8f0] mb-3 pb-2 border-b border-[rgba(201,168,76,0.12)]">Training List Items ({data.training.items.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.training.items.map((item, index) => (
                    <div key={item.id || index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={item.text} 
                        onChange={(e) => updateArrayItem("training", index, "text", e.target.value)} 
                        className="flex-1 bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]" 
                      />
                      <button onClick={() => removeArrayItem("training", index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {data.training.items.length === 0 && <p className="text-sm text-slate-500 py-4 md:col-span-2 text-center">No training items added yet.</p>}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
