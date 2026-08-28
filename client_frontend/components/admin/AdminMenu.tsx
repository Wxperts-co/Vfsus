"use client";

import { useState, useEffect } from "react";
import { MenuPageData, MenuListItem, MenuSection, FAQListItem, ResourceArticle } from "@/lib/page-menu";
import AdminSidebar from "./AdminSidebar";
import { Save, Plus, Trash2, Edit2, X, MoveUp, MoveDown, Globe, List, Loader2, CheckCircle2, AlertCircle, FileText, HelpCircle, BookOpen } from "lucide-react";
import TiptapEditor from "../common-components/TiptapEditor";

const toHtml = (val: string | string[] | undefined): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map((p) => (p.startsWith("<") ? p : `<p>${p}</p>`)).join("");
  }
  return "";
};

export default function AdminMenu() {
  const [data, setData] = useState<MenuPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState("seo");

  // For editing a specific menu item
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/page-menu");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch menu page data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (dataToSave = data) => {
    if (!dataToSave) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/page-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
      });
      if (res.ok) {
        setMessage({ type: 'success', text: "Menu page data saved successfully!" });
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

  // Helper to move item
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...data.menus];
    if (direction === 'up' && index > 0) {
      const temp = newItems[index - 1];
      newItems[index - 1] = newItems[index];
      newItems[index] = temp;
    } else if (direction === 'down' && index < newItems.length - 1) {
      const temp = newItems[index + 1];
      newItems[index + 1] = newItems[index];
      newItems[index] = temp;
    }

    const newData = { ...data, menus: newItems };
    setData(newData);
    handleSave(newData);
  };

  const deleteItem = (index: number) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    const newItems = [...data.menus];
    newItems.splice(index, 1);
    const newData = { ...data, menus: newItems };
    setData(newData);
    handleSave(newData);
  };

  const addNewItem = (type: 'standard' | 'faq' | 'resource') => {
    const newItem: MenuListItem = {
      slug: "new-" + type + "-" + Date.now(),
      title: "New " + type.charAt(0).toUpperCase() + type.slice(1) + " Page",
      icon: "✨",
      type: type,
      intro: ["First introductory paragraph."],
      sections: type === 'standard' ? [] : undefined,
      faqItems: type === 'faq' ? [] : undefined,
      resourceItems: type === 'resource' ? [] : undefined,
    };
    const newItems = [...data.menus, newItem];
    const newData = { ...data, menus: newItems };
    setData(newData);
    handleSave(newData);
    setEditingIndex(newItems.length - 1);
  };

  // For editing a single menu
  const updateActiveMenu = (field: keyof MenuListItem, value: any) => {
    if (editingIndex === null) return;
    const newItems = [...data.menus];
    newItems[editingIndex] = { ...newItems[editingIndex], [field]: value };
    setData({ ...data, menus: newItems });
  };

  const activeItem = editingIndex !== null ? data.menus[editingIndex] : null;

  return (
    <div className="flex min-h-screen font-[family-name:var(--font-barlow)] bg-[#0b1120]">
      <AdminSidebar />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-[#131e35]/[0.92] backdrop-blur-lg border-b border-[rgba(201,168,76,0.12)] py-3.5 px-8 sticky top-0 z-40">
          <div className="flex justify-between items-center">
            <h1 className="font-[family-name:var(--font-bebas)] text-[22px] tracking-[2px] text-white m-0">
              Menu Pages Settings
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
              { id: "seo", label: "Global Menu SEO", icon: Globe },
              { id: "menus", label: "Manage Menus", icon: List },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingIndex(null);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-[14px] font-bold transition-all duration-200 whitespace-nowrap -mb-px ${activeTab === tab.id
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
                  <Globe className="h-5 w-5 text-emerald-500" /> Menu Base SEO
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

            {/* ── MANAGE MENUS TAB ── */}
            {activeTab === "menus" && editingIndex === null && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[16px] text-[#f4f6f8] flex items-center gap-2">
                    <List className="h-5 w-5 text-indigo-500" /> All Menu Items ({data.menus.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addNewItem('standard')}
                      className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 px-3 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Standard
                    </button>
                    <button
                      onClick={() => addNewItem('faq')}
                      className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 py-2 px-3 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> FAQ
                    </button>
                    <button
                      onClick={() => addNewItem('resource')}
                      className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 py-2 px-3 rounded-lg transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Resource
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {data.menus.map((item, index) => (
                    <div key={index} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-4 flex items-center justify-between hover:border-[#818cf8] transition-colors group">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl w-10 h-10 bg-[#131e35] border border-[rgba(201,168,76,0.2)] flex items-center justify-center rounded-lg shadow-sm">{item.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#f4f6f8]">{item.title}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#eab308] block mt-0.5">/{item.slug}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 mr-2">
                          <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md transition-colors">
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button onClick={() => moveItem(index, 'down')} disabled={index === data.menus.length - 1} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 disabled:opacity-30 rounded-md transition-colors">
                            <MoveDown className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => setEditingIndex(index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] hover:border-[#818cf8] hover:text-[#eab308] text-[#cbd5e1] rounded-md text-xs font-semibold transition-colors shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => deleteItem(index)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── EDITING A SINGLE MENU ── */}
            {activeTab === "menus" && activeItem && (
              <div className="space-y-6">
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setEditingIndex(null);
                        handleSave();
                      }}
                      className="p-2 hover:bg-black/5 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className="text-lg font-bold text-[#f4f6f8]">
                        Editing: <span className="text-[#e8c97a]">{activeItem.title}</span>
                        <span className="ml-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-slate-100 text-slate-600 align-middle">
                          TYPE: {activeItem.type}
                        </span>
                      </h3>
                      <p className="text-xs text-[#8898aa]">Configure menu content and details.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleSave();
                      setEditingIndex(null);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#818cf8] hover:bg-[#6366f1] text-white rounded-xl text-sm font-bold transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" /> Save & Close
                  </button>
                </div>

                {/* Basic Info */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Title</label>
                      <input
                        type="text"
                        value={activeItem.title}
                        onChange={(e) => updateActiveMenu("title", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">URL Slug (e.g. why-choose-us)</label>
                      <input
                        type="text"
                        value={activeItem.slug}
                        onChange={(e) => updateActiveMenu("slug", e.target.value)}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Icon (Emoji or character)</label>
                    <input
                      type="text"
                      value={activeItem.icon}
                      onChange={(e) => updateActiveMenu("icon", e.target.value)}
                      className="w-full max-w-[200px] bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>

                {/* Individual SEO Info */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] mt-6">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">SEO</span> 
                    Page Specific SEO
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Title (leave empty to use global)</label>
                      <input
                        type="text"
                        value={activeItem.seo?.title || ""}
                        onChange={(e) => {
                          const seo = { ...(activeItem.seo || { title: '', description: '', keywords: '' }), title: e.target.value };
                          updateActiveMenu("seo", seo);
                        }}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                        placeholder={`e.g. ${activeItem.title} | VSF`}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Description</label>
                      <textarea
                        value={activeItem.seo?.description || ""}
                        onChange={(e) => {
                          const seo = { ...(activeItem.seo || { title: '', description: '', keywords: '' }), description: e.target.value };
                          updateActiveMenu("seo", seo);
                        }}
                        rows={2}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">Meta Keywords</label>
                      <input
                        type="text"
                        value={activeItem.seo?.keywords || ""}
                        onChange={(e) => {
                          const seo = { ...(activeItem.seo || { title: '', description: '', keywords: '' }), keywords: e.target.value };
                          updateActiveMenu("seo", seo);
                        }}
                        className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Intro Content */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h4 className="text-sm font-bold text-[#f4f6f8] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">2</span>
                    Introductory Content
                  </h4>
                  <TiptapEditor
                    content={toHtml(activeItem.intro)}
                    onChange={(val) => updateActiveMenu("intro", val)}
                    placeholder="Write introductory content..."
                  />
                </div>

                {/* Specific Layout Details based on TYPE */}
                <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div className="flex justify-between items-center mb-5">
                    <h4 className="text-sm font-bold text-[#f4f6f8] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs">3</span>
                      {activeItem.type === 'standard' && "Standard Sections"}
                      {activeItem.type === 'faq' && "FAQ Items"}
                      {activeItem.type === 'resource' && "Resource Articles"}
                    </h4>

                    {/* Add Buttons based on type */}
                    {activeItem.type === 'standard' && (
                      <button onClick={() => {
                        const s = [...(activeItem.sections || []), { title: "New Title", body: "<p>Content text...</p>" }];
                        updateActiveMenu("sections", s);
                      }} className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Section
                      </button>
                    )}
                    {activeItem.type === 'faq' && (
                      <button onClick={() => {
                        const f = [...(activeItem.faqItems || []), { id: "faq-" + Date.now(), question: "New Question?", answer: ["Answer..."] }];
                        updateActiveMenu("faqItems", f);
                      }} className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add FAQ
                      </button>
                    )}
                    {activeItem.type === 'resource' && (
                      <button onClick={() => {
                        const r = [...(activeItem.resourceItems || []), { id: "res-" + Date.now(), title: "New Article", body: ["Body..."] }];
                        updateActiveMenu("resourceItems", r);
                      }} className="text-xs font-semibold bg-[#1a2845] border border-[rgba(201,168,76,0.2)] hover:bg-[#1a2845] text-[#cbd5e1] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Add Article
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* STANDARD SECTIONS */}
                    {activeItem.type === 'standard' && (activeItem.sections || []).map((sec, sIndex) => (
                      <div key={sIndex} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 relative group">
                        <button onClick={() => {
                          const s = [...activeItem.sections!];
                          s.splice(sIndex, 1);
                          updateActiveMenu("sections", s);
                        }} className="absolute top-3 right-3 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md z-10" title="Delete Section">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="mb-4 pr-8">
                          <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">Section Title</label>
                          <input
                            type="text"
                            value={sec.title}
                            onChange={(e) => {
                              const s = [...activeItem.sections!];
                              s[sIndex].title = e.target.value;
                              updateActiveMenu("sections", s);
                            }}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3.5 py-2.5 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                            placeholder="e.g. Quality People & Professional Standards"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#cbd5e1] mb-1.5">Section Body (Rich Text)</label>
                          <TiptapEditor
                            content={toHtml(sec.body)}
                            onChange={(val) => {
                              const s = [...activeItem.sections!];
                              s[sIndex].body = val;
                              updateActiveMenu("sections", s);
                            }}
                            placeholder="Write section content here..."
                          />
                        </div>
                      </div>
                    ))}

                    {/* FAQ ITEMS */}
                    {activeItem.type === 'faq' && (activeItem.faqItems || []).map((faq, fIndex) => (
                      <div key={faq.id} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 relative group">
                        <button onClick={() => {
                          const f = [...activeItem.faqItems!];
                          f.splice(fIndex, 1);
                          updateActiveMenu("faqItems", f);
                        }} className="absolute top-3 right-3 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="mb-3 pr-8">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Question</label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const f = [...activeItem.faqItems!];
                              f[fIndex].question = e.target.value;
                              updateActiveMenu("faqItems", f);
                            }}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Answer Paragraphs (blank line to separate)</label>
                          <textarea
                            value={faq.answer.join("\n\n")}
                            onChange={(e) => {
                              const f = [...activeItem.faqItems!];
                              f[fIndex].answer = e.target.value.split("\n\n");
                              updateActiveMenu("faqItems", f);
                            }}
                            rows={3}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none resize-none focus:border-[#818cf8]"
                          />
                        </div>

                        {/* Bullets */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500">Bullets (Optional)</label>
                            <button onClick={() => {
                              const f = [...activeItem.faqItems!];
                              if (!f[fIndex].bullets) f[fIndex].bullets = [];
                              f[fIndex].bullets!.push("New point");
                              updateActiveMenu("faqItems", f);
                            }} className="text-[10px] text-blue-600 font-bold uppercase hover:underline">+ Add Bullet</button>
                          </div>
                          {faq.bullets?.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 mb-2 items-center">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const f = [...activeItem.faqItems!];
                                  f[fIndex].bullets![bIdx] = e.target.value;
                                  updateActiveMenu("faqItems", f);
                                }}
                                className="flex-1 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md px-2 py-1 text-sm outline-none focus:border-[#818cf8]"
                              />
                              <button onClick={() => {
                                const f = [...activeItem.faqItems!];
                                f[fIndex].bullets!.splice(bIdx, 1);
                                updateActiveMenu("faqItems", f);
                              }} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-4 bg-[#131e35] p-3 rounded-lg border border-[rgba(201,168,76,0.2)]">
                          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!faq.clientLogos}
                              onChange={(e) => {
                                const f = [...activeItem.faqItems!];
                                f[fIndex].clientLogos = e.target.checked;
                                updateActiveMenu("faqItems", f);
                              }}
                              className="rounded border-slate-300 text-[#e8c97a] focus:ring-[#6366f1]"
                            />
                            Show Client Logos
                          </label>
                        </div>
                      </div>
                    ))}

                    {/* RESOURCE ARTICLES */}
                    {activeItem.type === 'resource' && (activeItem.resourceItems || []).map((res, rIndex) => (
                      <div key={res.id} className="bg-[#1a2845] border border-[rgba(201,168,76,0.2)] rounded-xl p-5 relative group">
                        <button onClick={() => {
                          const r = [...activeItem.resourceItems!];
                          r.splice(rIndex, 1);
                          updateActiveMenu("resourceItems", r);
                        }} className="absolute top-3 right-3 p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 rounded-md">
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="mb-3 pr-8">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Article Title</label>
                          <input
                            type="text"
                            value={res.title}
                            onChange={(e) => {
                              const r = [...activeItem.resourceItems!];
                              r[rIndex].title = e.target.value;
                              updateActiveMenu("resourceItems", r);
                            }}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#f4f6f8] font-bold text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>

                        <div className="mb-3">
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Article Paragraphs (blank line to separate)</label>
                          <textarea
                            value={res.body.join("\n\n")}
                            onChange={(e) => {
                              const r = [...activeItem.resourceItems!];
                              r[rIndex].body = e.target.value.split("\n\n");
                              updateActiveMenu("resourceItems", r);
                            }}
                            rows={4}
                            className="w-full bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-[#cbd5e1] text-sm outline-none resize-none focus:border-[#818cf8]"
                          />
                        </div>

                        {/* Bullets */}
                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-slate-500">Bullets (Optional)</label>
                            <button onClick={() => {
                              const r = [...activeItem.resourceItems!];
                              if (!r[rIndex].bullets) r[rIndex].bullets = [];
                              r[rIndex].bullets!.push("New point");
                              updateActiveMenu("resourceItems", r);
                            }} className="text-[10px] text-blue-600 font-bold uppercase hover:underline">+ Add Bullet</button>
                          </div>
                          {res.bullets?.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 mb-2 items-center">
                              <input
                                type="text"
                                value={b}
                                onChange={(e) => {
                                  const r = [...activeItem.resourceItems!];
                                  r[rIndex].bullets![bIdx] = e.target.value;
                                  updateActiveMenu("resourceItems", r);
                                }}
                                className="flex-1 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md px-2 py-1 text-sm outline-none focus:border-[#818cf8]"
                              />
                              <button onClick={() => {
                                const r = [...activeItem.resourceItems!];
                                r[rIndex].bullets!.splice(bIdx, 1);
                                updateActiveMenu("resourceItems", r);
                              }} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          ))}
                        </div>
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
