// app/quote-request/page.tsx
"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import PageBanner from "@/components/common-components/innerbanner";
import { RefreshCw } from "lucide-react";

interface FormData {
  // Customer Information
  name: string;
  job_title: string;
  company: string;
  webaddress: string;
  address: string;
  city: string;
  statezip: string;
  email: string;
  phone: string;
  fax: string;

  // Service Location
  toO: string;
  jobsite_location: string;
  city2: string;
  statezip2: string;
  jobsite_specification: string;

  // Schedule
  Start_Month: string;
  Start_Day: string;
  End_Month: string;
  End_Day: string;
  hours_service: string;
  perweek: string;
  duties_perform: string;

  // Type of Service
  svctype1: string;
  svctype2: string;
  serNeededOthers: string;
  services: string[];
  serviceOthers: string;
  guards_needed: string;
  permanent: string;
  workHours: string;
  workDurationOthers: string;
  serviceTiming: string;

  // Additional Comments
  comment: string;
}

export default function QuoteRequest() {
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
    fax: "",
    toO: "",
    jobsite_location: "",
    city2: "",
    statezip2: "",
    jobsite_specification: "",
    Start_Month: "",
    Start_Day: "",
    End_Month: "",
    End_Day: "",
    hours_service: "",
    perweek: "",
    duties_perform: "",
    svctype1: "Unarmed",
    svctype2: "Uniformed",
    serNeededOthers: "",
    services: [],
    serviceOthers: "",
    guards_needed: "",
    permanent: "",
    workHours: "",
    workDurationOthers: "",
    serviceTiming: "",
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
    } catch (err) {
      setCaptcha({ question: "", token: "", loading: false });
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      if (checkbox.checked) {
        setFormData({
          ...formData,
          services: [...formData.services, value],
        });
      } else {
        setFormData({
          ...formData,
          services: formData.services.filter((item) => item !== value),
        });
      }
    } else if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Customer Information Validation
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.job_title) newErrors.job_title = "Job Title is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.webaddress) newErrors.webaddress = "Web Address is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.statezip) newErrors.statezip = "State & Zip is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.fax) newErrors.fax = "Fax number is required";

    // Service Location Validation
    if (!formData.toO) newErrors.toO = "Type of Organization is required";
    if (!formData.jobsite_location)
      newErrors.jobsite_location = "Job site location is required";
    if (!formData.city2) newErrors.city2 = "City is required";
    if (!formData.statezip2) newErrors.statezip2 = "State & Zip is required";
    if (!formData.jobsite_specification)
      newErrors.jobsite_specification = "Job site duties are required";

    // Schedule Validation
    if (!formData.Start_Month || formData.Start_Month === "select")
      newErrors.Start_Month = "Start month is required";
    if (!formData.Start_Day || formData.Start_Day === "select")
      newErrors.Start_Day = "Start day is required";
    if (!formData.End_Month || formData.End_Month === "select")
      newErrors.End_Month = "End month is required";
    if (!formData.End_Day || formData.End_Day === "select")
      newErrors.End_Day = "End day is required";
    if (!formData.hours_service)
      newErrors.hours_service = "Service hours per day is required";
    if (!formData.perweek) newErrors.perweek = "Hours per week is required";
    if (!formData.duties_perform)
      newErrors.duties_perform = "Duties expected are required";

    // Type of Service Validation
    if (!formData.svctype1) newErrors.svctype1 = "Officer type is required";
    if (!formData.svctype2) newErrors.svctype2 = "Appearance type is required";
    if (!formData.guards_needed)
      newErrors.guards_needed = "Number of officers needed is required";
    if (!formData.permanent)
      newErrors.permanent = "Please specify service type";
    if (!formData.workHours && !formData.workDurationOthers)
      newErrors.workHours = "Work hours are required";
    if (!formData.serviceTiming)
      newErrors.serviceTiming = "Service timing is required";
    if (!captchaAnswer)
      newErrors.captchaAnswer = "Please answer the security question";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save quote request to MongoDB
      const payload = {
        ...formData,
        captchaAnswer,
        captchaToken: captcha.token
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
           setErrors((prev) => ({ ...prev, captchaAnswer: errData.issues.captchaAnswer[0] }));
        }
        throw new Error(errData.error || "Failed to submit quote request");
      }

      console.log("Form submitted:", formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          job_title: "",
          company: "",
          webaddress: "",
          address: "",
          city: "",
          statezip: "",
          email: "",
          phone: "",
          fax: "",
          toO: "",
          jobsite_location: "",
          city2: "",
          statezip2: "",
          jobsite_specification: "",
          Start_Month: "",
          Start_Day: "",
          End_Month: "",
          End_Day: "",
          hours_service: "",
          perweek: "",
          duties_perform: "",
          svctype1: "Unarmed",
          svctype2: "Uniformed",
          serNeededOthers: "",
          services: [],
          serviceOthers: "",
          guards_needed: "",
          permanent: "",
          workHours: "",
          workDurationOthers: "",
          serviceTiming: "",
          comment: "",
        });
        setCaptchaAnswer("");
        fetchCaptcha();
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      job_title: "",
      company: "",
      webaddress: "",
      address: "",
      city: "",
      statezip: "",
      email: "",
      phone: "",
      fax: "",
      toO: "",
      jobsite_location: "",
      city2: "",
      statezip2: "",
      jobsite_specification: "",
      Start_Month: "",
      Start_Day: "",
      End_Month: "",
      End_Day: "",
      hours_service: "",
      perweek: "",
      duties_perform: "",
      svctype1: "Unarmed",
      svctype2: "Uniformed",
      serNeededOthers: "",
      services: [],
      serviceOthers: "",
      guards_needed: "",
      permanent: "",
      workHours: "",
      workDurationOthers: "",
      serviceTiming: "",
      comment: "",
    });
    setErrors({});
  };

  // Generate days for dropdown (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (submitted) {
    return (
      <>
        <PageBanner title="Quote Request" />
        <div className="bg-[#0b1120] min-h-screen py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-[rgba(39,174,96,0.1)] border border-[#27ae60] rounded-lg p-8 text-center">
              <div className="text-[#27ae60] text-5xl mb-4">✓</div>
              <h3 className="text-white text-2xl mb-3 font-['Bebas_Neue',sans-serif]">
                Thank You!
              </h3>
              <p className="text-[#8898aa]">
                Your quote request has been submitted successfully. We'll get
                back to you within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        body {
          background: #0b1120;
        }
      `}</style>

      <PageBanner title="Quote Request" />

      <div className="bg-[#0b1120] min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              <div>
                {/* <h2 className="text-3xl md:text-4xl font-['Bebas_Neue',sans-serif] text-white mb-2">
                                    Quote Request
                                </h2>
                                <p className="text-[#8898aa]">Please provide us the following information to better serve you.</p> */}
                <p className="text-[#c9a84c] text-sm mt-2">
                  <span className="text-[#c9a84c]">*</span> Indicates required
                  field
                </p>
              </div>
              <div className="flex-shrink-0">
                <img
                  src="/images/trust.gif"
                  alt="Trust"
                  className="w-24 h-auto"
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="space-y-8"
          >
            {/* Customer Information */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <h3 className="text-2xl font-['Bebas_Neue',sans-serif] font-extrabold text-[#eab308] text-center mb-6">
                Customer Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Job Title
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.job_title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.job_title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Web Address
                  </label>
                  <input
                    type="text"
                    name="webaddress"
                    value={formData.webaddress}
                    onChange={handleChange}
                    placeholder="Web Address"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.webaddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.webaddress}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> State &amp; Zip
                  </label>
                  <input
                    type="text"
                    name="statezip"
                    value={formData.statezip}
                    onChange={handleChange}
                    placeholder="State &amp; Zip"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.statezip && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.statezip}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Phone No.
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone No."
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Fax
                  </label>
                  <input
                    type="text"
                    name="fax"
                    value={formData.fax}
                    onChange={handleChange}
                    placeholder="Fax"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.fax && (
                    <p className="text-red-500 text-xs mt-1">{errors.fax}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Location if Different */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <h3 className="text-2xl font-['Bebas_Neue',sans-serif] font-extrabold text-[#eab308] text-center mb-6">
                SERVICE LOCATION IF DIFFERENT
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Type of
                    Organization
                  </label>
                  <select
                    name="toO"
                    value={formData.toO}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Residential">Residential</option>
                    <option value="Government">Government</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.toO && (
                    <p className="text-red-500 text-xs mt-1">{errors.toO}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Location of Job
                    Sites
                  </label>
                  <input
                    type="text"
                    name="jobsite_location"
                    value={formData.jobsite_location}
                    onChange={handleChange}
                    placeholder="Location of Job Sites"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.jobsite_location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jobsite_location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> City
                  </label>
                  <input
                    type="text"
                    name="city2"
                    value={formData.city2}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.city2 && (
                    <p className="text-red-500 text-xs mt-1">{errors.city2}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> State &amp; Zip
                  </label>
                  <input
                    type="text"
                    name="statezip2"
                    value={formData.statezip2}
                    onChange={handleChange}
                    placeholder="State &amp; Zip"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.statezip2 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.statezip2}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Job Site Duties
                  </label>
                  <textarea
                    name="jobsite_specification"
                    value={formData.jobsite_specification}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Job Site Duties"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none resize-y"
                  />
                  {errors.jobsite_specification && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.jobsite_specification}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <h3 className="text-2xl font-['Bebas_Neue',sans-serif] font-extrabold text-[#eab308] text-center mb-6">
                SCHEDULE
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Starting Date of
                    Service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      name="Start_Month"
                      value={formData.Start_Month}
                      onChange={handleChange}
                      className="px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                    >
                      <option value="select">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="Start_Day"
                      value={formData.Start_Day}
                      onChange={handleChange}
                      className="px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                    >
                      <option value="select">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(errors.Start_Month || errors.Start_Day) && (
                    <p className="text-red-500 text-xs mt-1">
                      Start date is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Ending Date of
                    Service
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      name="End_Month"
                      value={formData.End_Month}
                      onChange={handleChange}
                      className="px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                    >
                      <option value="select">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="End_Day"
                      value={formData.End_Day}
                      onChange={handleChange}
                      className="px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                    >
                      <option value="select">Day</option>
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                  </div>
                  {(errors.End_Month || errors.End_Day) && (
                    <p className="text-red-500 text-xs mt-1">
                      End date is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Service Hours Per
                    Day
                  </label>
                  <input
                    type="text"
                    name="hours_service"
                    value={formData.hours_service}
                    onChange={handleChange}
                    placeholder="Service Hours Per Day"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.hours_service && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.hours_service}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Per Week
                  </label>
                  <input
                    type="text"
                    name="perweek"
                    value={formData.perweek}
                    onChange={handleChange}
                    placeholder="Per Week"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  />
                  {errors.perweek && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.perweek}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> Duties expected of
                    VSF Personnel
                  </label>
                  <textarea
                    name="duties_perform"
                    value={formData.duties_perform}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Duties Expected of VSF Personnel"
                    className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none resize-y"
                  />
                  {errors.duties_perform && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.duties_perform}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Type of Service Needed */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <h3 className="text-2xl font-['Bebas_Neue',sans-serif] font-extrabold text-[#eab308] text-center mb-6">
                TYPE OF SERVICE NEEDED
              </h3>

              <div className="space-y-6">
                {/* Officer Type */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-3">
                    <span className="text-[#c9a84c]">*</span> Type of
                    Officer/Personnel requested
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="svctype1"
                        value="Armed"
                        checked={formData.svctype1 === "Armed"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Armed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="svctype1"
                        value="Unarmed"
                        checked={formData.svctype1 === "Unarmed"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Unarmed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="svctype2"
                        value="Uniformed"
                        checked={formData.svctype2 === "Uniformed"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Uniformed</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="svctype2"
                        value="Plain Cloth"
                        checked={formData.svctype2 === "Plain Cloth"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Plain Clothed</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white">Other:</span>
                      <input
                        type="text"
                        name="serNeededOthers"
                        value={formData.serNeededOthers}
                        onChange={handleChange}
                        placeholder="Specify"
                        className="px-3 py-1 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-white text-sm focus:border-[#c9a84c] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-3">
                    Services Required
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Security Service",
                      "Concierge Service",
                      "On Site Officer with Marked Vehicle",
                      "Courier & Delivery Services",
                      "Vehicle Patrol Service",
                      "Investigations",
                      "Alarm Response Service",
                      "Executive Protection",
                      "Bank ATM Service",
                    ].map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#c9a84c] rounded"
                        />
                        <span className="text-white text-sm">{service}</span>
                      </label>
                    ))}
                    <div className="flex items-center gap-2 col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="services"
                          value="Others"
                          checked={formData.services.includes("Others")}
                          onChange={handleChange}
                          className="w-4 h-4 text-[#c9a84c] rounded"
                        />
                        <span className="text-white">Others:</span>
                      </label>
                      <input
                        type="text"
                        name="serviceOthers"
                        value={formData.serviceOthers}
                        onChange={handleChange}
                        placeholder="Specify other services"
                        className="flex-1 px-3 py-1 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-white text-sm focus:border-[#c9a84c] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Officers */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-2">
                    <span className="text-[#c9a84c]">*</span> How Many Duty
                    Officers or VSF Personnel Needed per shift?
                  </label>
                  <select
                    name="guards_needed"
                    value={formData.guards_needed}
                    onChange={handleChange}
                    className="w-full md:w-64 px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="5 - 10">5 - 10</option>
                    <option value="10 - 15">10 - 15</option>
                    <option value="15 or More">15 or More</option>
                  </select>
                  {errors.guards_needed && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.guards_needed}
                    </p>
                  )}
                </div>

                {/* Permanent or Temporary */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-3">
                    <span className="text-[#c9a84c]">*</span> Are you seeking
                    permanent or yearly service contract or temporary services?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="permanent"
                        value="Permanent Service"
                        checked={formData.permanent === "Permanent Service"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Permanent</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="permanent"
                        value="Temporary Service"
                        checked={formData.permanent === "Temporary Service"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">Temporary</span>
                    </label>
                  </div>
                  {errors.permanent && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.permanent}
                    </p>
                  )}
                </div>

                {/* Work Hours */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-3">
                    <span className="text-[#c9a84c]">*</span> Approximately what
                    hours will the staff work?
                  </label>
                  <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="workHours"
                        value="7am-3pm"
                        checked={formData.workHours === "7am-3pm"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">7am-3pm</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="workHours"
                        value="3pm-11pm"
                        checked={formData.workHours === "3pm-11pm"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">3pm-11pm</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="workHours"
                        value="11pm-7am"
                        checked={formData.workHours === "11pm-7am"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">11pm-7am</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-white">Other:</span>
                      <input
                        type="text"
                        name="workDurationOthers"
                        value={formData.workDurationOthers}
                        onChange={handleChange}
                        placeholder="Specify hours"
                        className="px-3 py-1 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-white text-sm focus:border-[#c9a84c] focus:outline-none"
                      />
                    </div>
                  </div>
                  {errors.workHours && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.workHours}
                    </p>
                  )}
                </div>

                {/* Service Timing */}
                <div>
                  <label className="block text-[#8898aa] text-sm mb-3">
                    <span className="text-[#c9a84c]">*</span> How soon will you
                    be needing this service?
                  </label>
                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceTiming"
                        value="ASAP"
                        checked={formData.serviceTiming === "ASAP"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">ASAP</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceTiming"
                        value="2 Weeks"
                        checked={formData.serviceTiming === "2 Weeks"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">2 Weeks</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceTiming"
                        value="1 Month"
                        checked={formData.serviceTiming === "1 Month"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">1 Month</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="serviceTiming"
                        value="2 Months or More"
                        checked={formData.serviceTiming === "2 Months or More"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#c9a84c]"
                      />
                      <span className="text-white">2 Months or More</span>
                    </label>
                  </div>
                  {errors.serviceTiming && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.serviceTiming}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <h3 className="text-2xl font-['Bebas_Neue',sans-serif] font-extrabold text-[#eab308] text-center mb-6">
                ADDITIONAL COMMENTS
              </h3>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                placeholder="Any additional comments or requirements..."
                className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-white focus:border-[#c9a84c] focus:outline-none resize-y"
              />
            </div>

            {/* Captcha */}
            <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
              <label className="block text-[#8898aa] text-sm mb-2">
                <span className="text-[#c9a84c]">*</span> Security Check
              </label>
              <div className="flex gap-2.5 items-center">
                  <div className="shrink-0 py-3 px-4 bg-[#1a2845] border border-[rgba(201,168,76,0.3)] rounded text-[#eab308] text-[0.95rem] tracking-[1px] min-w-[110px] text-center">
                      {captcha.loading ? "…" : captcha.question || "—"}
                  </div>
                  <div className="flex-1">
                      <input
                          type="text"
                          placeholder="Answer"
                          value={captchaAnswer}
                          onChange={(e) => {
                              setCaptchaAnswer(e.target.value);
                              if (errors.captchaAnswer) setErrors((p) => ({ ...p, captchaAnswer: "" }));
                          }}
                          className={`w-full px-4 py-2.5 bg-[#131e35] border rounded-md text-white focus:border-[#c9a84c] focus:outline-none ${errors.captchaAnswer ? "border-red-500" : "border-[rgba(201,168,76,0.2)]"}`}
                      />
                  </div>
                  <button
                      type="button"
                      onClick={fetchCaptcha}
                      className="shrink-0 p-3 bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.2)] border border-[rgba(201,168,76,0.3)] rounded transition-colors cursor-pointer"
                      title="Reload Captcha"
                  >
                      <RefreshCw className="w-5 h-5 text-[#c9a84c]" />
                  </button>
              </div>
              {errors.captchaAnswer && (
                  <p className="text-red-500 text-xs mt-1">{errors.captchaAnswer}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting || captcha.loading}
                className="flex-1 bg-[#c9a84c] text-[#0b1120] cursor-pointer py-3 px-6 rounded-md font-['Bebas_Neue',sans-serif] text-lg tracking-wider hover:bg-[#e8c97a] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
