"use client";

import { useState, useEffect, useRef } from "react";
import { HomePageData } from "@/lib/page-home";
import AdminSidebar from "./AdminSidebar";
import { Save, Globe, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, PlayCircle, Plus, Trash2, Star } from "lucide-react";
import TiptapEditor from "../common-components/TiptapEditor";

export default function AdminHome() {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefWhyBg = useRef<HTMLInputElement>(null);
  const fileInputRefWhyImg = useRef<HTMLInputElement>(null);
  const fileInputRefTestiBg = useRef<HTMLInputElement>(null);
  const fileInputRefTestiLogo = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/page-home");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch home page data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (dataToSave = data) => {
    if (!dataToSave) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/page-home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: "Home page data saved successfully!" });
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

  const updateSEO = (field: keyof HomePageData['seo'], value: string) => {
    if (!data) return;
    setData({
      ...data,
      seo: { ...data.seo, [field]: value }
    });
  };

  const updateAbout = (field: keyof HomePageData['aboutSection'], value: any) => {
    if (!data) return;
    setData({
      ...data,
      aboutSection: { ...data.aboutSection, [field]: value }
    });
  };

  const updateWhyChooseUs = (field: keyof HomePageData['whyChooseUsSection'], value: any) => {
    if (!data) return;
    setData({
      ...data,
      whyChooseUsSection: { ...data.whyChooseUsSection, [field]: value }
    });
  };

  const updateTestimonials = (field: keyof HomePageData['testimonialsSection'], value: any) => {
    if (!data) return;
    setData({
      ...data,
      testimonialsSection: { ...data.testimonialsSection, [field]: value }
    });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    section: "about" | "whyChooseBg" | "whyChooseImg" | "testiBg" | "testiLogo"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("folder", "home"); // Save in /public/uploads/home/

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      if (section === "about") {
        updateAbout("image", result.url);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else if (section === "whyChooseBg") {
        updateWhyChooseUs("backgroundImage", result.url);
        if (fileInputRefWhyBg.current) fileInputRefWhyBg.current.value = "";
      } else if (section === "whyChooseImg") {
        updateWhyChooseUs("rightImage", result.url);
        if (fileInputRefWhyImg.current) fileInputRefWhyImg.current.value = "";
      } else if (section === "testiBg") {
        updateTestimonials("backgroundImage", result.url);
        if (fileInputRefTestiBg.current) fileInputRefTestiBg.current.value = "";
      } else if (section === "testiLogo") {
        updateTestimonials("googleReviewLogo", result.url);
        if (fileInputRefTestiLogo.current) fileInputRefTestiLogo.current.value = "";
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>, 
    section: "about"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingVideo(true);
    const formData = new FormData();
    formData.append("video", e.target.files[0]);
    formData.append("folder", "home"); // Save in /public/uploads/home/

    try {
      const res = await fetch("/api/admin/upload-video", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      if (section === "about") {
        updateAbout("videoUrl", result.url);
        if (videoInputRef.current) videoInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Video upload error:", error);
      alert("Failed to upload video. Please try again.");
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleIndustryIconUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("folder", "home/icons");

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      const newIndustries = [...data!.whyChooseUsSection.industries];
      newIndustries[index].icon = result.url;
      updateWhyChooseUs("industries", newIndustries);
    } catch (error) {
      console.error("Icon upload error:", error);
      alert("Failed to upload icon.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleClientLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("folder", "home/clients");

    try {
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();
      const newLogos = [...data!.testimonialsSection.logoSlides];
      newLogos[index].image = result.url;
      updateTestimonials("logoSlides", newLogos);
    } catch (error) {
      console.error("Logo upload error:", error);
      alert("Failed to upload client logo.");
    } finally {
      setUploadingImage(false);
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

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
              Home Page Settings
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
              { id: "about", label: "About Section", icon: PlayCircle },
              { id: "why-choose", label: "Why Choose Us Section", icon: CheckCircle2 },
              { id: "testimonials", label: "Testimonials Section", icon: Star },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
            
            {/* ── ABOUT SECTION ── */}
            {activeTab === "about" && (
            <div className="space-y-6">
                
                {/* Text Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Content & Text</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Line 1</label>
                      <input
                        type="text"
                        value={data.aboutSection.titleLine1}
                        onChange={(e) => updateAbout("titleLine1", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Line 2</label>
                      <input
                        type="text"
                        value={data.aboutSection.titleLine2}
                        onChange={(e) => updateAbout("titleLine2", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Main Description</label>
                    <TiptapEditor
                      content={data.aboutSection.description || ""}
                      onChange={(val) => updateAbout("description", val)}
                      placeholder="Write main description..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Button Text</label>
                      <input
                        type="text"
                        value={data.aboutSection.buttonText}
                        onChange={(e) => updateAbout("buttonText", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Button Link</label>
                      <input
                        type="text"
                        value={data.aboutSection.buttonLink}
                        onChange={(e) => updateAbout("buttonLink", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Media</h3>
                  
                  <div className="mb-6">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Video IFrame URL / File</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={data.aboutSection.videoUrl}
                        onChange={(e) => updateAbout("videoUrl", e.target.value)}
                        className="flex-1 bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                        placeholder="e.g. https://fast.wistia.net/embed/iframe/bukr8v224n"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        ref={videoInputRef}
                        onChange={(e) => handleVideoUpload(e, "about")}
                      />
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        disabled={uploadingVideo}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shrink-0"
                      >
                        {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
                        {uploadingVideo ? "Uploading..." : "Upload Video"}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">Enter an iframe URL or upload a video file (.mp4, .webm, etc.).</p>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-2">Right Side Image</label>
                    <div className="flex items-start gap-5">
                      {data.aboutSection.image && (
                        <div className="relative w-40 h-32 rounded-lg overflow-hidden border border-slate-200">
                          <img src={data.aboutSection.image} alt="About Section Image" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={(e) => handleImageUpload(e, "about")}
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                          {uploadingImage ? "Uploading..." : "Upload New Image"}
                        </button>
                        <p className="text-xs text-slate-500 mt-2 max-w-xs">Recommended size: 600x400px. Image will be cropped to fit the design.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Counters */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-[16px] text-[#f4f6f8]">Animated Counters</h3>
                    {data.aboutSection.counters.length < 4 && (
                      <button
                        onClick={() => {
                          const newCounters = [...data.aboutSection.counters, { number: 0, label: "New Counter", symbol: "+" }];
                          updateAbout("counters", newCounters);
                        }}
                        className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Counter
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {data.aboutSection.counters.map((counter, idx) => (
                      <div key={idx} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-4 relative group">
                        <button 
                          onClick={() => {
                            const newCounters = [...data.aboutSection.counters];
                            newCounters.splice(idx, 1);
                            updateAbout("counters", newCounters);
                          }} 
                          className="absolute top-2 right-2 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Number</label>
                            <input
                              type="number"
                              value={counter.number}
                              onChange={(e) => {
                                const newCounters = [...data.aboutSection.counters];
                                newCounters[idx].number = parseInt(e.target.value) || 0;
                                updateAbout("counters", newCounters);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Symbol</label>
                            <input
                              type="text"
                              value={counter.symbol}
                              onChange={(e) => {
                                const newCounters = [...data.aboutSection.counters];
                                newCounters[idx].symbol = e.target.value;
                                updateAbout("counters", newCounters);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Label</label>
                          <input
                            type="text"
                            value={counter.label}
                            onChange={(e) => {
                              const newCounters = [...data.aboutSection.counters];
                              newCounters[idx].label = e.target.value;
                              updateAbout("counters", newCounters);
                            }}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

            </div>
            )}

            {/* ── WHY CHOOSE US SECTION ── */}
            {activeTab === "why-choose" && (
              <div className="space-y-6">
                
                {/* Text Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Content & Text</h3>
                  
                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Subtitle</label>
                    <input
                      type="text"
                      value={data.whyChooseUsSection.subtitle}
                      onChange={(e) => updateWhyChooseUs("subtitle", e.target.value)}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Line 1</label>
                      <input
                        type="text"
                        value={data.whyChooseUsSection.titleLine1}
                        onChange={(e) => updateWhyChooseUs("titleLine1", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Line 2</label>
                      <input
                        type="text"
                        value={data.whyChooseUsSection.titleLine2}
                        onChange={(e) => updateWhyChooseUs("titleLine2", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Description</label>
                    <textarea
                      value={data.whyChooseUsSection.description}
                      onChange={(e) => updateWhyChooseUs("description", e.target.value)}
                      rows={5}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                </div>

                {/* Media Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Media</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-2">Background Image</label>
                      <div className="flex flex-col gap-3">
                        {data.whyChooseUsSection.backgroundImage && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                            <img src={data.whyChooseUsSection.backgroundImage} alt="Background" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRefWhyBg}
                            onChange={(e) => handleImageUpload(e, "whyChooseBg")}
                          />
                          <button
                            onClick={() => fileInputRefWhyBg.current?.click()}
                            disabled={uploadingImage}
                            className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Background
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-2">Right Side Image</label>
                      <div className="flex flex-col gap-3">
                        {data.whyChooseUsSection.rightImage && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                            <img src={data.whyChooseUsSection.rightImage} alt="Right Image" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRefWhyImg}
                            onChange={(e) => handleImageUpload(e, "whyChooseImg")}
                          />
                          <button
                            onClick={() => fileInputRefWhyImg.current?.click()}
                            disabled={uploadingImage}
                            className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Right Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Industries */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-[16px] text-[#f4f6f8]">Industries / Sectors</h3>
                    <button
                      onClick={() => {
                        const newId = Date.now();
                        const newIndustries = [...data.whyChooseUsSection.industries, { id: newId, title: "New Industry", description: "Description", icon: "", delay: "100", column: 1 as const }];
                        updateWhyChooseUs("industries", newIndustries);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Industry
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {data.whyChooseUsSection.industries.map((industry, idx) => (
                      <div key={industry.id || idx} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-4 flex gap-4 items-start relative group">
                        
                        {/* Icon Upload Area */}
                        <div className="flex-shrink-0 w-[60px]">
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Icon</label>
                          <div className="w-[50px] h-[50px] rounded-lg bg-[#131e35] border border-slate-200 flex items-center justify-center relative overflow-hidden group-hover/icon cursor-pointer">
                            {industry.icon ? (
                              <img src={industry.icon} alt="icon" className="w-[30px] h-[30px] object-contain" />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-slate-300" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/icon:opacity-100 flex items-center justify-center transition-opacity">
                              <label className="cursor-pointer text-white w-full h-full flex items-center justify-center">
                                <Plus className="w-4 h-4" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleIndustryIconUpload(e, idx)}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Title</label>
                            <input
                              type="text"
                              value={industry.title}
                              onChange={(e) => {
                                const newIndustries = [...data.whyChooseUsSection.industries];
                                newIndustries[idx].title = e.target.value;
                                updateWhyChooseUs("industries", newIndustries);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                            <input
                              type="text"
                              value={industry.description}
                              onChange={(e) => {
                                const newIndustries = [...data.whyChooseUsSection.industries];
                                newIndustries[idx].description = e.target.value;
                                updateWhyChooseUs("industries", newIndustries);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Column (1-3)</label>
                            <select
                              value={industry.column}
                              onChange={(e) => {
                                const newIndustries = [...data.whyChooseUsSection.industries];
                                newIndustries[idx].column = parseInt(e.target.value) as 1 | 2 | 3;
                                updateWhyChooseUs("industries", newIndustries);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] text-sm outline-none focus:border-[#818cf8]"
                            >
                              <option value={1}>Column 1</option>
                              <option value={2}>Column 2</option>
                              <option value={3}>Column 3</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Animation Delay</label>
                            <input
                              type="text"
                              value={industry.delay}
                              onChange={(e) => {
                                const newIndustries = [...data.whyChooseUsSection.industries];
                                newIndustries[idx].delay = e.target.value;
                                updateWhyChooseUs("industries", newIndustries);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none focus:border-[#818cf8]"
                              placeholder="e.g. 100"
                            />
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button 
                          onClick={() => {
                            const newIndustries = [...data.whyChooseUsSection.industries];
                            newIndustries.splice(idx, 1);
                            updateWhyChooseUs("industries", newIndustries);
                          }} 
                          className="absolute top-2 right-2 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ── TESTIMONIALS SECTION ── */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                
                {/* Text Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Section Title</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Part 1 (e.g. Our)</label>
                      <input
                        type="text"
                        value={data.testimonialsSection.titlePart1}
                        onChange={(e) => updateTestimonials("titlePart1", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title Part 2 (e.g. Happy Customers)</label>
                      <input
                        type="text"
                        value={data.testimonialsSection.titlePart2}
                        onChange={(e) => updateTestimonials("titlePart2", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-5">Media</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-2">Background Image</label>
                      <div className="flex flex-col gap-3">
                        {data.testimonialsSection.backgroundImage && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                            <img src={data.testimonialsSection.backgroundImage} alt="Background" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRefTestiBg}
                            onChange={(e) => handleImageUpload(e, "testiBg")}
                          />
                          <button
                            onClick={() => fileInputRefTestiBg.current?.click()}
                            disabled={uploadingImage}
                            className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Background
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-2">Google Review Logo</label>
                      <div className="flex flex-col gap-3">
                        {data.testimonialsSection.googleReviewLogo && (
                          <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                            <img src={data.testimonialsSection.googleReviewLogo} alt="Review Logo" className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRefTestiLogo}
                            onChange={(e) => handleImageUpload(e, "testiLogo")}
                          />
                          <button
                            onClick={() => fileInputRefTestiLogo.current?.click()}
                            disabled={uploadingImage}
                            className="flex justify-center items-center gap-2 px-4 py-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                          >
                            <ImageIcon className="w-4 h-4" /> Upload Review Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Reviews */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-[16px] text-[#f4f6f8]">Customer Reviews</h3>
                    <button
                      onClick={() => {
                        const newId = Date.now();
                        const newReviews = [...data.testimonialsSection.testimonials, { id: newId, name: "New Customer", description: "Review text here...", rating: 5 }];
                        updateTestimonials("testimonials", newReviews);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Review
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {data.testimonialsSection.testimonials.map((review, idx) => (
                      <div key={review.id || idx} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-4 flex flex-col gap-3 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Customer Name</label>
                            <input
                              type="text"
                              value={review.name}
                              onChange={(e) => {
                                const newReviews = [...data.testimonialsSection.testimonials];
                                newReviews[idx].name = e.target.value;
                                updateTestimonials("testimonials", newReviews);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rating (1-5)</label>
                            <input
                              type="number"
                              min="1" max="5"
                              value={review.rating}
                              onChange={(e) => {
                                const newReviews = [...data.testimonialsSection.testimonials];
                                newReviews[idx].rating = parseInt(e.target.value);
                                updateTestimonials("testimonials", newReviews);
                              }}
                              className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Review Description</label>
                          <textarea
                            value={review.description}
                            onChange={(e) => {
                              const newReviews = [...data.testimonialsSection.testimonials];
                              newReviews[idx].description = e.target.value;
                              updateTestimonials("testimonials", newReviews);
                            }}
                            rows={3}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none focus:border-[#818cf8] resize-none"
                          />
                        </div>

                        {/* Delete Button */}
                        <button 
                          onClick={() => {
                            const newReviews = [...data.testimonialsSection.testimonials];
                            newReviews.splice(idx, 1);
                            updateTestimonials("testimonials", newReviews);
                          }} 
                          className="absolute top-2 right-2 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Logos */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-[16px] text-[#f4f6f8]">Client Logos Carousel</h3>
                    <button
                      onClick={() => {
                        const newId = Date.now();
                        const newLogos = [...data.testimonialsSection.logoSlides, { id: newId, image: "", alt: "New Client" }];
                        updateTestimonials("logoSlides", newLogos);
                      }}
                      className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Logo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {data.testimonialsSection.logoSlides.map((logo, idx) => (
                      <div key={logo.id || idx} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-3 flex flex-col gap-2 relative group">
                        
                        {/* Logo Upload Area */}
                        <div className="w-full h-[60px] rounded-lg bg-[#131e35] border border-slate-200 flex items-center justify-center relative overflow-hidden group-hover/icon cursor-pointer">
                          {logo.image ? (
                            <img src={logo.image} alt={logo.alt} className="w-[80%] h-[80%] object-contain" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-300" />
                          )}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/icon:opacity-100 flex items-center justify-center transition-opacity">
                            <label className="cursor-pointer text-white w-full h-full flex items-center justify-center">
                              <Plus className="w-5 h-5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleClientLogoUpload(e, idx)}
                              />
                            </label>
                          </div>
                        </div>

                        {/* Alt Text */}
                        <input
                          type="text"
                          value={logo.alt}
                          onChange={(e) => {
                            const newLogos = [...data.testimonialsSection.logoSlides];
                            newLogos[idx].alt = e.target.value;
                            updateTestimonials("logoSlides", newLogos);
                          }}
                          placeholder="Alt text"
                          className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md px-2 py-1 text-[#f4f6f8] text-xs outline-none focus:border-[#818cf8]"
                        />

                        {/* Delete Button */}
                        <button 
                          onClick={() => {
                            const newLogos = [...data.testimonialsSection.logoSlides];
                            newLogos.splice(idx, 1);
                            updateTestimonials("logoSlides", newLogos);
                          }} 
                          className="absolute -top-2 -right-2 p-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 bg-[#131e35] shadow-sm border border-slate-100 rounded-full"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
