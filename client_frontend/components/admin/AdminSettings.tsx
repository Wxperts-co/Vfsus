"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Globe,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { SiteSettings, defaultSettings } from "@/lib/settings";

export default function AdminSettings() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  type TabId = "general" | "contact" | "locations" | "social" | "seo";
  const [activeTab, setActiveTab] = useState<TabId>("general");

  const tabs = [
    { id: "general", label: "General Identity", icon: ImageIcon },
    { id: "contact", label: "Contact Info", icon: Phone },
    { id: "locations", label: "Location Cards", icon: MapPin },
    { id: "social", label: "Social Links", icon: Globe },
    { id: "seo", label: "SEO & Meta", icon: Globe },
  ] as const;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            setSettings(data.settings);
          }
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (
    section: string | null,
    field: string,
    value: string,
  ) => {
    if (section) {
      setSettings((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof SiteSettings] as any),
          [field]: value,
        },
      }));
    } else {
      setSettings((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCardChange = (index: number, field: string, value: string) => {
    setSettings((prev) => {
      const newCards = [...(prev.contactCards || [])];
      if (field === "address") {
        newCards[index] = {
          ...newCards[index],
          address: value.split(",").map((s) => s.trim()),
        };
      } else {
        newCards[index] = { ...newCards[index], [field]: value };
      }
      return { ...prev, contactCards: newCards };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" });
        // Auto hide success message
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error(data.error || "Failed to save settings");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
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
              Global Settings
            </h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 py-2 px-5 rounded-[10px] border-none bg-gradient-to-br from-[#eab308] to-[#e8c97a] text-white text-[13px] font-bold cursor-pointer transition-all duration-200 hover:shadow-[0_4px_14px_rgba(102,126,234,0.3)] disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-7 max-w-[1000px] mx-auto w-full space-y-6">
          {/* Messages */}
          {message && (
            <div
              className={`p-4 rounded-xl flex items-center gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="text-sm font-semibold">{message.text}</span>
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="flex gap-2 border-b border-black/10 overflow-x-auto">
            {tabs.map((tab) => (
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

          {/* Form Sections */}
          <div className="grid grid-cols-1 gap-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-[#e8c97a]" /> General
                  Identity
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-3">
                      Website Logo
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {settings.logoUrl && (
                        <div className="relative w-40 h-16 bg-[#0b1120] rounded-xl overflow-hidden border border-black/10 flex items-center justify-center p-3 shadow-inner shrink-0">
                          <img
                            src={settings.logoUrl}
                            alt="Logo Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setIsSaving(true);
                            try {
                              const formData = new FormData();
                              formData.append("logo", file);
                              const res = await fetch(
                                "/api/admin/upload-logo",
                                {
                                  method: "POST",
                                  body: formData,
                                },
                              );
                              const data = await res.json();
                              if (res.ok) {
                                handleChange(null, "logoUrl", data.url);
                                setMessage({
                                  type: "success",
                                  text: "Logo uploaded successfully! Don't forget to save changes.",
                                });
                                setTimeout(() => setMessage(null), 4000);
                              } else {
                                throw new Error(data.error);
                              }
                            } catch (err: any) {
                              setMessage({
                                type: "error",
                                text: err.message || "Failed to upload logo",
                              });
                            } finally {
                              setIsSaving(false);
                            }
                          }}
                          className="w-full text-sm text-[#cbd5e1] file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-[13px] file:font-bold file:bg-[#eab308]/10 file:text-[#e8c97a] hover:file:bg-[#e0e7ff] cursor-pointer focus:outline-none"
                        />
                        <p className="text-[11px] text-[#94a3b8] mt-2 font-medium">
                          Recommended: PNG with transparent background.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeTab === "contact" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#8b5cf6]" /> Contact
                  Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" /> Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.contactNo}
                      onChange={(e) =>
                        handleChange(null, "contactNo", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        handleChange(null, "email", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> Physical Address
                    </label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) =>
                        handleChange(null, "location", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">
                      Google Maps URL Link
                    </label>
                    <input
                      type="text"
                      value={settings.mapLink}
                      onChange={(e) =>
                        handleChange(null, "mapLink", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Cards (Locations) */}
            {activeTab === "locations" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-500" /> Location Cards
                  (Contact Us Page)
                </h3>
                <div className="space-y-6">
                  {settings.contactCards?.map((card, index) => (
                    <div
                      key={card.id || index}
                      className="p-5 border border-[rgba(201,168,76,0.2)] rounded-xl bg-[#1a2845]"
                    >
                      <h4 className="font-semibold text-[14px] text-[#e2e8f0] mb-4 border-b border-[rgba(201,168,76,0.2)] pb-2">
                        Card {index + 1}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                            Badge Label
                          </label>
                          <input
                            type="text"
                            value={card.label}
                            onChange={(e) =>
                              handleCardChange(index, "label", e.target.value)
                            }
                            className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                            Location Name
                          </label>
                          <input
                            type="text"
                            value={card.name}
                            onChange={(e) =>
                              handleCardChange(index, "name", e.target.value)
                            }
                            className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                            Address Lines (comma separated)
                          </label>
                          <input
                            type="text"
                            value={card.address?.join(", ")}
                            onChange={(e) =>
                              handleCardChange(index, "address", e.target.value)
                            }
                            className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                            Telephone
                          </label>
                          <input
                            type="text"
                            value={card.tel}
                            onChange={(e) =>
                              handleCardChange(index, "tel", e.target.value)
                            }
                            className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                          />
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                              Extra Info Label (e.g. Fax)
                            </label>
                            <input
                              type="text"
                              value={card.extraLabel}
                              onChange={(e) =>
                                handleCardChange(
                                  index,
                                  "extraLabel",
                                  e.target.value,
                                )
                              }
                              className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[12px] font-semibold text-[#cbd5e1] mb-1">
                              Extra Info Value
                            </label>
                            <input
                              type="text"
                              value={card.extra}
                              onChange={(e) =>
                                handleCardChange(index, "extra", e.target.value)
                              }
                              className="w-full bg-[#131e35] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-lg py-2 px-3 text-sm outline-none focus:border-[#818cf8]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media */}
            {activeTab === "social" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#3b82f6]" /> Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />{" "}
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.facebook}
                      onChange={(e) =>
                        handleChange("socialUrls", "facebook", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Twitter className="h-3.5 w-3.5 text-[#1DA1F2]" /> Twitter
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.twitter}
                      onChange={(e) =>
                        handleChange("socialUrls", "twitter", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />{" "}
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.linkedin}
                      onChange={(e) =>
                        handleChange("socialUrls", "linkedin", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Youtube className="h-3.5 w-3.5 text-[#FF0000]" /> YouTube
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.youtube}
                      onChange={(e) =>
                        handleChange("socialUrls", "youtube", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <Instagram className="h-3.5 w-3.5 text-[#E1306C]" />{" "}
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.instagram || ""}
                      onChange={(e) =>
                        handleChange("socialUrls", "instagram", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5 flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 fill-[#25F4EE]" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .592.042.87.124V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.86 4.43 6.3 6.3 0 0 0 1.93-4.47V8.87a8.28 8.28 0 0 0 4.84 1.55V6.98a4.85 4.85 0 0 1-1.18-.29z"/>
                      </svg>{" "}
                      TikTok
                    </label>
                    <input
                      type="text"
                      value={settings.socialUrls.tiktok || ""}
                      onChange={(e) =>
                        handleChange("socialUrls", "tiktok", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEO Metadata */}
            {activeTab === "seo" && (
              <div className="bg-[#131e35] p-6 rounded-2xl border border-[rgba(201,168,76,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h3 className="font-bold text-[16px] text-[#f4f6f8] mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-500" /> SEO & Meta Tags
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">
                      Default Page Title
                    </label>
                    <input
                      type="text"
                      value={settings.seo.title}
                      onChange={(e) =>
                        handleChange("seo", "title", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">
                      Meta Description
                    </label>
                    <textarea
                      value={settings.seo.description}
                      onChange={(e) =>
                        handleChange("seo", "description", e.target.value)
                      }
                      rows={3}
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8] resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={settings.seo.keywords}
                      onChange={(e) =>
                        handleChange("seo", "keywords", e.target.value)
                      }
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
                    <p className="text-[11px] text-[#94a3b8] mt-1">
                      Comma separated
                    </p>
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-[#cbd5e1] mb-1.5">
                      Google Site Verification Content Code
                    </label>
                    <input
                      type="text"
                      value={settings.seo.googleSiteVerification}
                      onChange={(e) =>
                        handleChange(
                          "seo",
                          "googleSiteVerification",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. dsf789dsf78dsf789ds"
                      className="w-full bg-[#1a2845] text-[#f4f6f8] border border-[rgba(201,168,76,0.2)] rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#818cf8]"
                    />
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
