"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Globe,
  Video,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Search,
  Edit2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import TiptapEditor from "../common-components/TiptapEditor";
import { TestimonialsPageData, defaultTestimonialsData } from "@/lib/page-testimonials";

type TabId = "seo" | "videos" | "letters";

export default function AdminTestimonials() {
  const [data, setData] = useState<TestimonialsPageData>(defaultTestimonialsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("seo");

  const [searchQuery, setSearchQuery] = useState("");
  const [editingLetterId, setEditingLetterId] = useState<string | null>(null);
  const [letterPage, setLetterPage] = useState(1);

  const [searchQueryVideos, setSearchQueryVideos] = useState("");
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoPage, setVideoPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/page-testimonials");
        if (res.ok) {
          const result = await res.json();
          if (result.data) {
            setData(result.data);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials page data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSeoChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value }
    }));
  };

  // Video Handlers
  const handleAddVideo = () => {
    const newId = `vid_${Date.now()}`;
    setData((prev) => ({
      ...prev,
      videos: [{ id: newId, src: "", title: "" }, ...prev.videos]
    }));
    setEditingVideoId(newId);
    setSearchQueryVideos("");
    setVideoPage(1);
  };

  const handleVideoChange = (index: number, field: string, value: string) => {
    setData((prev) => {
      const newVideos = [...prev.videos];
      newVideos[index] = { ...newVideos[index], [field]: value };
      return { ...prev, videos: newVideos };
    });
  };

  const handleRemoveVideo = (index: number) => {
    setData((prev) => {
      const newVideos = [...prev.videos];
      newVideos.splice(index, 1);
      return { ...prev, videos: newVideos };
    });
  };

  // Letters Handlers
  const handleAddLetter = () => {
    const newId = `let_${Date.now()}`;
    setData((prev) => ({
      ...prev,
      letters: [{ id: newId, name: "", date: "", role: "", contentHtml: "" }, ...prev.letters]
    }));
    setEditingLetterId(newId);
    setSearchQuery(""); // Clear search to see new letter
    setLetterPage(1);
  };

  const handleLetterChange = (index: number, field: string, value: string) => {
    setData((prev) => {
      const newLetters = [...prev.letters];
      newLetters[index] = { ...newLetters[index], [field]: value };
      return { ...prev, letters: newLetters };
    });
  };

  const handleRemoveLetter = (index: number) => {
    setData((prev) => {
      const newLetters = [...prev.letters];
      newLetters.splice(index, 1);
      return { ...prev, letters: newLetters };
    });
  };

  const filteredVideos = data.videos.filter(v => 
    v.title.toLowerCase().includes(searchQueryVideos.toLowerCase()) || 
    v.src.toLowerCase().includes(searchQueryVideos.toLowerCase())
  );
  const totalVideoPages = Math.ceil(filteredVideos.length / ITEMS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice((videoPage - 1) * ITEMS_PER_PAGE, videoPage * ITEMS_PER_PAGE);

  const filteredLetters = data.letters.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.contentHtml.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalLetterPages = Math.ceil(filteredLetters.length / ITEMS_PER_PAGE);
  const paginatedLetters = filteredLetters.slice((letterPage - 1) * ITEMS_PER_PAGE, letterPage * ITEMS_PER_PAGE);

  useEffect(() => { setLetterPage(1); }, [searchQuery]);
  useEffect(() => { setVideoPage(1); }, [searchQueryVideos]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/page-testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: "Testimonials page data saved successfully!" });
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
              Testimonials Page Settings
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
        <div className="flex-1 p-7 max-w-[1000px] mx-auto w-full space-y-6">
          
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
              { id: "seo", label: "Page SEO", icon: Globe },
              { id: "videos", label: "Video Reviews", icon: Video },
              { id: "letters", label: "Recommendation Letters", icon: FileText },
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

          <div className="grid grid-cols-1 gap-6">
            
            {/* SEO Metadata */}
            {activeTab === "seo" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" /> Testimonials Page SEO
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Page Title</label>
                    <input
                      type="text"
                      value={data.seo.title}
                      onChange={(e) => handleSeoChange("title", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Description</label>
                    <textarea
                      value={data.seo.description}
                      onChange={(e) => handleSeoChange("description", e.target.value)}
                      rows={3}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Keywords</label>
                    <input
                      type="text"
                      value={data.seo.keywords}
                      onChange={(e) => handleSeoChange("keywords", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                    <p className="text-[11px] text-[#94a3b8] mt-1">Comma separated</p>
                  </div>
                </div>
              </div>
            )}

            {/* Video Reviews */}
            {activeTab === "videos" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                {editingVideoId ? (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center mb-6 border-b border-[rgba(201,168,76,0.2)] pb-4">
                      <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                        <Edit2 className="h-5 w-5 text-purple-500" /> Edit Video Review
                      </h3>
                      <button onClick={() => setEditingVideoId(null)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <X className="h-4 w-4" /> Close
                      </button>
                    </div>
                    {data.videos.map((vid, index) => {
                      if (vid.id !== editingVideoId && index.toString() !== editingVideoId) return null;
                      return (
                        <div key={vid.id || index} className="space-y-4">
                          <div>
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title (e.g. Client Name)</label>
                            <input type="text" value={vid.title} onChange={(e) => handleVideoChange(index, "title", e.target.value)} className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Wistia Embed URL</label>
                            <input type="text" value={vid.src} onChange={(e) => handleVideoChange(index, "src", e.target.value)} className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]" />
                          </div>
                          <div className="mt-4 pt-2">
                            <button 
                              onClick={() => { setEditingVideoId(null); handleSave(); }} 
                              disabled={isSaving}
                              className="bg-[#6366f1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#4f46e5] transition-colors disabled:opacity-70 flex items-center gap-2"
                            >
                              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                              Done & Save
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                        <Video className="h-5 w-5 text-purple-500" /> Video Reviews ({data.videos.length})
                      </h3>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Search videos..." 
                            value={searchQueryVideos}
                            onChange={(e) => setSearchQueryVideos(e.target.value)}
                            className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <button onClick={handleAddVideo} className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-2 px-4 rounded-lg transition-colors">
                          <Plus className="h-4 w-4" /> Add Video
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-[rgba(201,168,76,0.2)] rounded-xl mb-4">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1a2845] border-b border-[rgba(201,168,76,0.2)]">
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[40%]">Title</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[50%]">Wistia URL</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[10%] text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0]">
                          {paginatedVideos.map((vid) => {
                            const originalIndex = data.videos.findIndex(v => v.id === vid.id);
                            return (
                              <tr key={vid.id} className="hover:bg-[#1a2845] transition-colors group">
                                <td className="py-3 px-4 text-[13px] font-semibold text-[#f4f6f8]">{vid.title || "—"}</td>
                                <td className="py-3 px-4 text-[13px] text-[#cbd5e1] truncate max-w-[300px]">
                                  {vid.src || "—"}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingVideoId(vid.id)} className="p-1.5 text-purple-500 hover:bg-purple-50 rounded" title="Edit">
                                      <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleRemoveVideo(originalIndex)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {paginatedVideos.length === 0 && (
                            <tr>
                              <td colSpan={3} className="py-8 text-center text-[13px] text-[#8898aa]">
                                {data.videos.length === 0 ? "No videos added yet." : "No videos match your search."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalVideoPages > 1 && (
                      <div className="flex items-center justify-between border-t border-[rgba(201,168,76,0.12)] pt-4">
                        <span className="text-[13px] text-slate-500">
                          Showing {(videoPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(videoPage * ITEMS_PER_PAGE, filteredVideos.length)} of {filteredVideos.length} entries
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setVideoPage(p => Math.max(1, p - 1))}
                            disabled={videoPage === 1}
                            className="p-1.5 rounded border border-[rgba(201,168,76,0.2)] text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className="text-[13px] font-semibold text-slate-700">
                            Page {videoPage} of {totalVideoPages}
                          </span>
                          <button 
                            onClick={() => setVideoPage(p => Math.min(totalVideoPages, p + 1))}
                            disabled={videoPage === totalVideoPages}
                            className="p-1.5 rounded border border-[rgba(201,168,76,0.2)] text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Recommendation Letters */}
            {activeTab === "letters" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                {editingLetterId ? (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center mb-6 border-b border-[rgba(201,168,76,0.2)] pb-4">
                      <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                        <Edit2 className="h-5 w-5 text-blue-500" /> Edit Recommendation Letter
                      </h3>
                      <button onClick={() => setEditingLetterId(null)} className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <X className="h-4 w-4" /> Close
                      </button>
                    </div>
                    {data.letters.map((letItem, index) => {
                      if (letItem.id !== editingLetterId && index.toString() !== editingLetterId) return null;
                      return (
                        <div key={letItem.id || index} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="md:col-span-2">
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Client Name</label>
                            <input type="text" value={letItem.name} onChange={(e) => handleLetterChange(index, "name", e.target.value)} className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Date</label>
                            <input type="text" value={letItem.date} onChange={(e) => handleLetterChange(index, "date", e.target.value)} className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Role / Title</label>
                            <input type="text" value={letItem.role} onChange={(e) => handleLetterChange(index, "role", e.target.value)} className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Rich Text Content</label>
                            <TiptapEditor 
                              content={letItem.contentHtml} 
                              onChange={(val) => handleLetterChange(index, "contentHtml", val)} 
                              placeholder="Type the testimonial here..."
                            />
                          </div>
                          <div className="md:col-span-2 mt-4">
                            <button 
                              onClick={() => { setEditingLetterId(null); handleSave(); }} 
                              disabled={isSaving}
                              className="bg-[#6366f1] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#4f46e5] transition-colors disabled:opacity-70 flex items-center gap-2"
                            >
                              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                              Done & Save
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" /> Recommendation Letters ({data.letters.length})
                      </h3>
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="Search letters..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <button onClick={handleAddLetter} className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#e8c97a] bg-[#eab308]/10 hover:bg-[#e0e7ff] py-2 px-4 rounded-lg transition-colors">
                          <Plus className="h-4 w-4" /> Add Letter
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-[rgba(201,168,76,0.2)] rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1a2845] border-b border-[rgba(201,168,76,0.2)]">
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[25%]">Name</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[25%]">Role</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[15%]">Date</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[25%]">Preview</th>
                            <th className="py-3 px-4 text-[12px] font-bold text-[#cbd5e1] uppercase tracking-wider w-[10%] text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0]">
                          {paginatedLetters.map((letItem) => {
                            const originalIndex = data.letters.findIndex(l => l.id === letItem.id);
                            return (
                              <tr key={letItem.id} className="hover:bg-[#1a2845] transition-colors group">
                                <td className="py-3 px-4 text-[13px] font-semibold text-[#f4f6f8]">{letItem.name || "—"}</td>
                                <td className="py-3 px-4 text-[13px] text-[#cbd5e1]">{letItem.role || "—"}</td>
                                <td className="py-3 px-4 text-[13px] text-[#cbd5e1]">{letItem.date || "—"}</td>
                                <td className="py-3 px-4 text-[13px] text-[#cbd5e1] truncate max-w-[200px]">
                                  {letItem.contentHtml.replace(/<[^>]+>/g, ' ').substring(0, 40) || "—"}...
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditingLetterId(letItem.id)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded" title="Edit">
                                      <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button onClick={() => handleRemoveLetter(originalIndex)} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Delete">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {paginatedLetters.length === 0 && (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-[13px] text-[#8898aa]">
                                {data.letters.length === 0 ? "No letters added yet." : "No letters match your search."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {totalLetterPages > 1 && (
                      <div className="flex items-center justify-between border-t border-[rgba(201,168,76,0.12)] pt-4">
                        <span className="text-[13px] text-slate-500">
                          Showing {(letterPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(letterPage * ITEMS_PER_PAGE, filteredLetters.length)} of {filteredLetters.length} entries
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setLetterPage(p => Math.max(1, p - 1))}
                            disabled={letterPage === 1}
                            className="p-1.5 rounded border border-[rgba(201,168,76,0.2)] text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <span className="text-[13px] font-semibold text-slate-700">
                            Page {letterPage} of {totalLetterPages}
                          </span>
                          <button 
                            onClick={() => setLetterPage(p => Math.min(totalLetterPages, p + 1))}
                            disabled={letterPage === totalLetterPages}
                            className="p-1.5 rounded border border-[rgba(201,168,76,0.2)] text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
