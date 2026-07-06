"use client";

import { useState, useEffect, useRef } from "react";
import {
  Save, Globe, Video, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, Edit2, X, Info, ShieldCheck, HelpCircle, BookOpen, ChevronLeft, ChevronRight, BarChart2
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import TiptapEditor from "../common-components/TiptapEditor";
import { AboutUsPageData, defaultAboutUsData } from "@/lib/page-about-us";

type TabId = "seo" | "intro" | "video" | "stats" | "promises" | "training";

export default function AdminAboutUs() {
  const [data, setData] = useState<AboutUsPageData>(defaultAboutUsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("seo");
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef2 = useRef<HTMLInputElement>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);

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
      const res = await fetch("/api/admin/page-about-us", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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

  const handleVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "wistiaUrl" | "wistiaUrl2"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingVideo(true);
    const formData = new FormData();
    formData.append("video", e.target.files[0]);
    formData.append("folder", "about-us"); // Save in /public/uploads/about-us/

    try {
      const res = await fetch("/api/admin/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      updateNested("video", field, result.url);
      if (field === "wistiaUrl" && videoInputRef.current) videoInputRef.current.value = "";
      if (field === "wistiaUrl2" && videoInputRef2.current) videoInputRef2.current.value = "";
    } catch (error) {
      console.error("Video upload error:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploadingVideo(false);
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
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Video className="h-5 w-5 text-purple-500" /> Video Section
                </h3>
                <div className="space-y-5 max-w-3xl">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Badge Text (above video)</label>
                    <input
                      type="text"
                      value={data.video.badgeText}
                      onChange={(e) => updateNested("video", "badgeText", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">First Video URL / File</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={data.video.wistiaUrl}
                        onChange={(e) => updateNested("video", "wistiaUrl", e.target.value)}
                        className="flex-1 bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                        placeholder="e.g. https://fast.wistia.net/embed/iframe/... or uploaded video path"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        ref={videoInputRef}
                        onChange={(e) => handleVideoUpload(e, "wistiaUrl")}
                      />
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        disabled={uploadingVideo}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
                      >
                        {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                        {uploadingVideo ? "Uploading..." : "Upload Video 1"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Second Video URL / File (Optional)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={data.video.wistiaUrl2 || ""}
                        onChange={(e) => updateNested("video", "wistiaUrl2", e.target.value)}
                        className="flex-1 bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                        placeholder="e.g. https://fast.wistia.net/embed/iframe/... or uploaded video path"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        ref={videoInputRef2}
                        onChange={(e) => handleVideoUpload(e, "wistiaUrl2")}
                      />
                      <button
                        type="button"
                        onClick={() => videoInputRef2.current?.click()}
                        disabled={uploadingVideo}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
                      >
                        {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                        {uploadingVideo ? "Uploading..." : "Upload Video 2"}
                      </button>
                    </div>
                  </div>
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
