"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import PageBanner from "@/components/common-components/innerbanner";
import {
  RefreshCw,
  Shield,
  CheckCircle2,
  Building2,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";

interface FormData {
  // 1. Customer Information
  name: string;
  job_title: string;
  company: string;
  webaddress: string;
  address: string;
  city: string;
  statezip: string;
  email: string;
  phone: string;

  // 2. Service Location
  isSameAddress: "Yes" | "No";
  service_address: string;
  service_city: string;
  service_state: string;
  service_zip: string;
  toO: string;
  jobsite_specification: string;

  // 3. Service Schedule
  startDate: string;
  hours_service: string;
  days_per_week: string;
  service_term: string;

  // 4. Type of Security Personnel
  svctype1: string;
  svctype2: string;
  appearance_other: string;

  // 5. Services Required
  services: string[];
  serviceOthers: string;
  guards_needed: string;

  // 6. Staffing & Hours
  supervisor_needed: string;
  start_time: string;
  end_time: string;

  // 8. Additional Comments
  comment: string;
}

const AVAILABLE_SERVICES = [
  "Security Officer Services",
  "Vehicle Patrol Service",
  "Front Desk & Concierge Services",
  "Parking Attendant",
  "On-Site Security Officer with Marked Vehicle",
  "VIP / Executive Protection",
  "Alarm Response Service",
  "Investigations & Intelligence",
  "Medical & Legal Courier and Delivery Services",
  "Fire Watch",
  "Bank & ATM Security",
  "Other — Please Specify",
];

const SERVICE_TERMS = [
  "One-Time / Temporary",
  "1 Year",
  "3 Years",
  "4 Years",
];

const SUPERVISOR_OPTIONS = [
  "Yes — Shift Supervisor",
  "Yes — Site Supervisor",
  "No",
  "Not Sure",
];

export default function QuoteRequestClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    job_title: "",
    company: "",
    webaddress: "",
    address: "",
    city: "",
    statezip: "",
    email: "",
    phone: "",

    isSameAddress: "Yes",
    service_address: "",
    service_city: "",
    service_state: "",
    service_zip: "",
    toO: "",
    jobsite_specification: "",

    startDate: "",
    hours_service: "",
    days_per_week: "",
    service_term: "1 Year",

    svctype1: "Armed",
    svctype2: "Uniformed",
    appearance_other: "",

    services: [],
    serviceOthers: "",
    guards_needed: "1",

    supervisor_needed: "No",
    start_time: "",
    end_time: "",

    comment: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captcha, setCaptcha] = useState({ question: "", token: "", loading: true });

  const fetchCaptcha = async () => {
    setCaptcha((c) => ({ ...c, loading: true }));
    try {
      const res = await fetch("/api/captcha");
      if (res.ok) {
        const data = await res.json();
        setCaptcha({ question: data.question, token: data.token, loading: false });
      } else {
        setCaptcha({ question: "", token: "", loading: false });
      }
      setCaptchaAnswer("");
    } catch {
      setCaptcha({ question: "", token: "", loading: false });
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      const nextServices = exists
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return {
        ...prev,
        services: nextServices,
      };
    });

    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Customer Info
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.job_title.trim()) newErrors.job_title = "Job Title is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.statezip.trim()) newErrors.statezip = "State & ZIP is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";

    // 2. Service Location
    if (formData.isSameAddress === "No") {
      if (!formData.service_address.trim()) newErrors.service_address = "Service Address is required";
      if (!formData.service_city.trim()) newErrors.service_city = "City is required";
      if (!formData.service_state.trim()) newErrors.service_state = "State is required";
      if (!formData.service_zip.trim()) newErrors.service_zip = "ZIP code is required";
    }
    if (!formData.toO.trim()) newErrors.toO = "Type of Organization is required";
    if (!formData.jobsite_specification.trim()) {
      newErrors.jobsite_specification = "Description of security needs and service requirements is required";
    }

    // 3. Service Schedule
    if (!formData.startDate) newErrors.startDate = "Starting Date of Service is required";
    if (!formData.hours_service.trim()) newErrors.hours_service = "Service Hours Per Day is required";
    if (!formData.days_per_week.trim()) newErrors.days_per_week = "Days Per Week is required";
    if (!formData.service_term) newErrors.service_term = "Service Term is required";

    // 4. Security Personnel
    if (!formData.svctype1) newErrors.svctype1 = "Officer Type is required";
    if (!formData.svctype2) newErrors.svctype2 = "Appearance is required";
    if (formData.svctype2 === "Other" && !formData.appearance_other.trim()) {
      newErrors.appearance_other = "Please specify appearance requirement";
    }

    // 5. Services Required
    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service required";
    }
    if (formData.services.includes("Other — Please Specify") && !formData.serviceOthers.trim()) {
      newErrors.serviceOthers = "Please specify other service details";
    }
    if (!formData.guards_needed.trim()) {
      newErrors.guards_needed = "Please specify number of personnel needed per shift";
    }

    // 6. Staffing & Hours
    if (!formData.start_time.trim()) newErrors.start_time = "Start Time is required";
    if (!formData.end_time.trim()) newErrors.end_time = "End Time is required";

    // Captcha
    if (!captchaAnswer.trim()) {
      newErrors.captchaAnswer = "Please answer the security question";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Map payload to include backward-compatible field names for admin dashboard & email
      const payload = {
        ...formData,
        // Compatibility fields
        jobsite_location:
          formData.isSameAddress === "Yes"
            ? formData.address
            : formData.service_address,
        city2:
          formData.isSameAddress === "Yes"
            ? formData.city
            : formData.service_city,
        statezip2:
          formData.isSameAddress === "Yes"
            ? formData.statezip
            : `${formData.service_state} ${formData.service_zip}`.trim(),
        perweek: formData.days_per_week,
        permanent: formData.service_term,
        workHours: `${formData.start_time} - ${formData.end_time}`,
        serviceTiming: `${formData.hours_service} hrs/day, ${formData.days_per_week} days/wk (${formData.start_time} to ${formData.end_time})`,
        captchaAnswer,
        captchaToken: captcha.token,
      };

      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        fetchCaptcha();
        if (errData.issues?.captchaAnswer) {
          setErrors((prev) => ({
            ...prev,
            captchaAnswer: errData.issues.captchaAnswer[0],
          }));
        }
        throw new Error(errData.error || "Failed to submit quote request");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PageBanner title="REQUEST A QUOTE" />
        <div className="bg-[#0b1120] min-h-[70vh] py-20 flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="bg-[#131e35] border-2 border-[#eab308]/40 rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#eab308]/20 border border-[#eab308] flex items-center justify-center text-[#eab308]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-white text-3xl font-extrabold mb-3 heading-font">
                Quote Request Received!
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                Thank you for contacting Virginia Surveillance Force. Our operational security management team will review your requirements and provide a customized quote shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  fetchCaptcha();
                }}
                className="inline-flex items-center gap-2 bg-[#eab308] hover:bg-[#d9a507] text-[#002147] font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title="REQUEST A QUOTE" />

      <div className="bg-[#0b1120] min-h-screen py-12 md:py-16 text-[#f4f6f8]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#131e35] via-[#1a2845] to-[#131e35] border border-yellow-500/20 rounded-2xl p-6 md:p-8 mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[#eab308] text-xs font-bold uppercase tracking-wider mb-2">
                <Shield className="w-3.5 h-3.5" /> Rapid Security Proposal
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white heading-font">
                Request a Customized Security Quote
              </h1>
              <p className="text-gray-400 text-sm mt-1 max-w-xl">
                Complete the streamlined form below to receive a fast, detailed, and competitive proposal tailored to your specific facility and staffing needs.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <img
                src="/images/trust.gif"
                alt="VSF Trust Badge"
                className="w-20 md:w-24 h-auto mx-auto"
              />
              <span className="text-[11px] text-yellow-400/80 font-bold block mt-1 tracking-wide">
                24/7/365 Available
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* ── 1. CUSTOMER INFORMATION ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  1
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                  Customer Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.name ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="e.g. Property Manager / Director"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.job_title ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.job_title && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.job_title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.company ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.company && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    Web Address
                  </label>
                  <input
                    type="text"
                    name="webaddress"
                    value={formData.webaddress}
                    onChange={handleChange}
                    placeholder="e.g. https://yourcompany.com"
                    className="w-full px-4 py-3 bg-[#0b1120] border border-white/15 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.address ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.city ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> State &amp; ZIP
                  </label>
                  <input
                    type="text"
                    name="statezip"
                    value={formData.statezip}
                    onChange={handleChange}
                    placeholder="e.g. VA 20109"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.statezip ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.statezip && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.statezip}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.email ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(000) 000-0000"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.phone ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── 2. SERVICE LOCATION ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  2
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                  Service Location
                </h2>
              </div>

              {/* Same address toggle */}
              <div className="mb-6 p-4 rounded-xl bg-[#0b1120] border border-white/10">
                <label className="block text-sm font-semibold text-white mb-3">
                  Is the service location the same as the address above?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, isSameAddress: "Yes" }))
                    }
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                      formData.isSameAddress === "Yes"
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold"
                        : "bg-[#131e35] border-white/10 text-gray-300 hover:border-white/30"
                    }`}
                  >
                    <span>Yes — Same as Above</span>
                    {formData.isSameAddress === "Yes" && (
                      <Check className="w-4 h-4 text-yellow-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, isSameAddress: "No" }))
                    }
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                      formData.isSameAddress === "No"
                        ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold"
                        : "bg-[#131e35] border-white/10 text-gray-300 hover:border-white/30"
                    }`}
                  >
                    <span>No — Different Location</span>
                    {formData.isSameAddress === "No" && (
                      <Check className="w-4 h-4 text-yellow-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Conditional Different Address Fields */}
              {formData.isSameAddress === "No" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 animate-fade-in">
                  <div className="md:col-span-2">
                    <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-yellow-400">*</span> Service Address
                    </label>
                    <input
                      type="text"
                      name="service_address"
                      value={formData.service_address}
                      onChange={handleChange}
                      placeholder="Service site address"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.service_address
                          ? "border-red-500"
                          : "border-white/15"
                      }`}
                    />
                    {errors.service_address && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.service_address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-yellow-400">*</span> City
                    </label>
                    <input
                      type="text"
                      name="service_city"
                      value={formData.service_city}
                      onChange={handleChange}
                      placeholder="Service city"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.service_city
                          ? "border-red-500"
                          : "border-white/15"
                      }`}
                    />
                    {errors.service_city && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.service_city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-yellow-400">*</span> State
                    </label>
                    <input
                      type="text"
                      name="service_state"
                      value={formData.service_state}
                      onChange={handleChange}
                      placeholder="State (e.g. VA, MD, DC)"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.service_state
                          ? "border-red-500"
                          : "border-white/15"
                      }`}
                    />
                    {errors.service_state && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.service_state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="text-yellow-400">*</span> ZIP
                    </label>
                    <input
                      type="text"
                      name="service_zip"
                      value={formData.service_zip}
                      onChange={handleChange}
                      placeholder="ZIP code"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.service_zip ? "border-red-500" : "border-white/15"
                      }`}
                    />
                    {errors.service_zip && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.service_zip}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Type of Organization
                  </label>
                  <select
                    name="toO"
                    value={formData.toO}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.toO ? "border-red-500" : "border-white/15"
                    }`}
                  >
                    <option value="">Select Organization Type</option>
                    <option value="Commercial / Corporate">Commercial / Corporate Facility</option>
                    <option value="Residential / HOA / Community">Residential Community / HOA / Apartments</option>
                    <option value="Construction Site">Construction Site / Development</option>
                    <option value="Retail / Shopping Center">Retail / Shopping Center / Mall</option>
                    <option value="Healthcare / Hospital">Healthcare / Clinic / Hospital</option>
                    <option value="Educational / School / Campus">Educational / School / Campus</option>
                    <option value="Industrial / Warehouse / Logistics">Industrial / Warehouse / Logistics</option>
                    <option value="Hotel / Hospitality">Hotel / Hospitality Venue</option>
                    <option value="Government / Municipal">Government / Municipal Facility</option>
                    <option value="Event / Entertainment">Special Event / Entertainment Venue</option>
                    <option value="Other">Other Organization Type</option>
                  </select>
                  {errors.toO && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.toO}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Description of Security Needs and Service Requirements
                  </label>
                  <textarea
                    name="jobsite_specification"
                    value={formData.jobsite_specification}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe specific duties, access control requirements, patrol frequency, risk factors, or property scope..."
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.jobsite_specification
                        ? "border-red-500"
                        : "border-white/15"
                    }`}
                  />
                  {errors.jobsite_specification && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.jobsite_specification}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── 3. SERVICE SCHEDULE ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  3
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                  Service Schedule
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-6">
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Starting Date of Service
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.startDate ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.startDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Service Hours Per Day
                  </label>
                  <input
                    type="text"
                    name="hours_service"
                    value={formData.hours_service}
                    onChange={handleChange}
                    placeholder="e.g. 8 hours, 12 hours, 24 hours"
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.hours_service ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.hours_service && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.hours_service}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Days Per Week
                  </label>
                  <select
                    name="days_per_week"
                    value={formData.days_per_week}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.days_per_week ? "border-red-500" : "border-white/15"
                    }`}
                  >
                    <option value="">Select Days Per Week</option>
                    <option value="7 Days (24/7/365 Coverage)">7 Days (Full Week Coverage)</option>
                    <option value="5 Days (Monday - Friday)">5 Days (Monday – Friday)</option>
                    <option value="2 Days (Weekends Only)">2 Days (Weekends Only)</option>
                    <option value="6 Days Per Week">6 Days Per Week</option>
                    <option value="4 Days Per Week">4 Days Per Week</option>
                    <option value="3 Days Per Week">3 Days Per Week</option>
                    <option value="1 Day / As Needed">1 Day / On-Call</option>
                  </select>
                  {errors.days_per_week && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.days_per_week}</p>
                  )}
                </div>
              </div>

              {/* Service Term */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                  <span className="text-yellow-400">*</span> Service Term
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SERVICE_TERMS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, service_term: term }))
                      }
                      className={`p-3.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        formData.service_term === term
                          ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold shadow-md"
                          : "bg-[#0b1120] border-white/10 text-gray-300 hover:border-white/30"
                      }`}
                    >
                      {formData.service_term === term && (
                        <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                      )}
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 4. TYPE OF SECURITY PERSONNEL ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  4
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                  Type of Security Personnel
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Officer Type */}
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="text-yellow-400">*</span> Officer Type
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {["Armed", "Unarmed", "Not Applicable"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, svctype1: type }))
                        }
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          formData.svctype1 === type
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold"
                            : "bg-[#0b1120] border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        {formData.svctype1 === type && (
                          <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        )}
                        <span>{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appearance */}
                <div>
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="text-yellow-400">*</span> Appearance
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {["Uniformed", "Plain Clothes", "Other"].map((app) => (
                      <button
                        key={app}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            svctype2: app === "Other" ? "Other" : app,
                          }))
                        }
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          formData.svctype2 === app ||
                          (app === "Other" && formData.svctype2 === "Other")
                            ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold"
                            : "bg-[#0b1120] border-white/10 text-gray-300 hover:border-white/30"
                        }`}
                      >
                        {(formData.svctype2 === app ||
                          (app === "Other" && formData.svctype2 === "Other")) && (
                          <Check className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        )}
                        <span>{app}</span>
                      </button>
                    ))}
                  </div>

                  {formData.svctype2 === "Other" && (
                    <div className="mt-3">
                      <input
                        type="text"
                        name="appearance_other"
                        value={formData.appearance_other}
                        onChange={handleChange}
                        placeholder="Please specify appearance requirements..."
                        className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                          errors.appearance_other
                            ? "border-red-500"
                            : "border-white/15"
                        }`}
                      />
                      {errors.appearance_other && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.appearance_other}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── 5. SERVICES REQUIRED ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  5
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                    Services Required
                  </h2>
                  <p className="text-gray-400 text-xs">
                    Select all services that apply to your security scope.
                  </p>
                </div>
              </div>

              {/* Clickable Modern Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
                {AVAILABLE_SERVICES.map((svc) => {
                  const isSelected = formData.services.includes(svc);
                  return (
                    <div
                      key={svc}
                      onClick={() => toggleService(svc)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border-yellow-400 shadow-md transform -translate-y-0.5"
                          : "bg-[#0b1120] border-white/10 hover:border-white/25 hover:bg-[#0e1628]"
                      }`}
                    >
                      <div className="flex-1">
                        <span
                          className={`text-xs sm:text-sm font-semibold leading-snug block ${
                            isSelected ? "text-yellow-400 font-bold" : "text-gray-200"
                          }`}
                        >
                          {svc}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-yellow-400 border-yellow-400 text-[#002147]"
                            : "border-gray-500 bg-transparent"
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.services && (
                <p className="text-red-400 text-xs mb-4 font-semibold">
                  {errors.services}
                </p>
              )}

              {/* Other service input */}
              {formData.services.includes("Other — Please Specify") && (
                <div className="mb-6 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 animate-fade-in">
                  <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-yellow-400">*</span> Other Service Details
                  </label>
                  <input
                    type="text"
                    name="serviceOthers"
                    value={formData.serviceOthers}
                    onChange={handleChange}
                    placeholder="Describe any other customized services required..."
                    className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.serviceOthers ? "border-red-500" : "border-white/15"
                    }`}
                  />
                  {errors.serviceOthers && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.serviceOthers}
                    </p>
                  )}
                </div>
              )}

              {/* How Many Security Officers Needed */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-yellow-400">*</span> How Many Personnel Are Needed per Shift?
                </label>
                <select
                  name="guards_needed"
                  value={formData.guards_needed}
                  onChange={handleChange}
                  className={`w-full sm:w-1/2 px-4 py-3 bg-[#0b1120] border rounded-xl text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                    errors.guards_needed ? "border-red-500" : "border-white/15"
                  }`}
                >
                  <option value="1">1 Officer</option>
                  <option value="2">2 Officers</option>
                  <option value="3">3 Officers</option>
                  <option value="4">4 Officers</option>
                  <option value="5">5 Officers</option>
                  <option value="5 - 10">5 – 10 Officers</option>
                  <option value="10 - 15">10 – 15 Officers</option>
                  <option value="15 or More">15 or More Officers</option>
                </select>
                {errors.guards_needed && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.guards_needed}
                  </p>
                )}
              </div>
            </div>

            {/* ── 6. STAFFING & HOURS ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  6
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                  Staffing &amp; Hours
                </h2>
              </div>

              {/* Supervisor Needed */}
              <div className="mb-6">
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                  Is a Shift Supervisor or Site Supervisor Required?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {SUPERVISOR_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          supervisor_needed: opt,
                        }))
                      }
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        formData.supervisor_needed === opt
                          ? "bg-yellow-500/20 border-yellow-400 text-yellow-400 font-bold"
                          : "bg-[#0b1120] border-white/10 text-gray-300 hover:border-white/30"
                      }`}
                    >
                      <span>{opt}</span>
                      {formData.supervisor_needed === opt && (
                        <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours needed */}
              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                  Approximately What Hours Will Services Be Required?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-xs font-medium mb-1.5">
                      <span className="text-yellow-400">*</span> Start Time
                    </label>
                    <input
                      type="text"
                      name="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      placeholder="e.g. 08:00 AM or 18:00"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.start_time ? "border-red-500" : "border-white/15"
                      }`}
                    />
                    {errors.start_time && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.start_time}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-xs font-medium mb-1.5">
                      <span className="text-yellow-400">*</span> End Time
                    </label>
                    <input
                      type="text"
                      name="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      placeholder="e.g. 05:00 PM or 06:00 (Next Day)"
                      className={`w-full px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                        errors.end_time ? "border-red-500" : "border-white/15"
                      }`}
                    />
                    {errors.end_time && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.end_time}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Enter any specific shift start and end times that match your operational schedule.
                </p>
              </div>
            </div>

            {/* ── 8. ADDITIONAL COMMENTS (OPTIONAL) ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  7
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider heading-font">
                    Additional Comments
                  </h2>
                  <span className="text-xs text-gray-400 font-normal">
                    (Optional)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Additional Comments or Special Requirements
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share any additional details, special instructions, access constraints, or timeline preferences..."
                  className="w-full px-4 py-3 bg-[#0b1120] border border-white/15 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            </div>

            {/* ── SECURITY CHECK / CAPTCHA ── */}
            <div className="bg-[#131e35] rounded-2xl p-6 md:p-8 border border-yellow-500/20 shadow-lg">
              <label className="block text-white text-xs font-bold uppercase tracking-wider mb-3">
                <span className="text-yellow-400">*</span> Security Verification
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="py-3 px-5 bg-[#0b1120] border border-yellow-500/30 rounded-xl text-[#eab308] font-bold text-base tracking-wider text-center min-w-[140px]">
                  {captcha.loading ? "Loading..." : captcha.question || "—"}
                </div>
                <input
                  type="text"
                  placeholder="Enter math answer"
                  value={captchaAnswer}
                  onChange={(e) => {
                    setCaptchaAnswer(e.target.value);
                    if (errors.captchaAnswer) {
                      setErrors((prev) => ({ ...prev, captchaAnswer: "" }));
                    }
                  }}
                  className={`flex-1 px-4 py-3 bg-[#0b1120] border rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors ${
                    errors.captchaAnswer ? "border-red-500" : "border-white/15"
                  }`}
                />
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-yellow-400 transition-colors flex items-center justify-center cursor-pointer"
                  title="Refresh security question"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              {errors.captchaAnswer && (
                <p className="text-red-400 text-xs mt-2">{errors.captchaAnswer}</p>
              )}
            </div>

            {/* ── SUBMIT BUTTON ── */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || captcha.loading}
                className="w-full py-4 px-8 bg-gradient-to-r from-[#eab308] to-[#d9a507] hover:from-[#d9a507] hover:to-[#ca9806] text-[#002147] font-black text-lg uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Submitting Quote Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quote Request</span>
                    <Shield className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-xs mt-3">
                By submitting, you agree to have Virginia Surveillance Force contact you regarding this security service request.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
