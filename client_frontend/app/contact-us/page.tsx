"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import PageBanner from "@/components/common-components/innerbanner";

// ── Types ──────────────────────────────────────────────────────────────────
interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
    className?: string;
}

interface ContactLocation {
    label: string;
    name: string;
    address: string[];
    tel: string;
    extra: string;
    extraLabel: string;
    icon: string;
}

interface FormField {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    required: boolean;
}

interface FormData {
    name: string;
    address: string;
    citytown: string;
    province: string;
    postalcode: string;
    email: string;
    phone: string;
    comments: string;
    my_file: File | null;
}

// ── Hook ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

// ── Animated wrapper ───────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = "up", className = "" }: FadeInProps) {
    const [ref, inView] = useInView();
    const translate =
        direction === "left" ? "translateX(-28px)" :
            direction === "right" ? "translateX(28px)" :
                "translateY(28px)";
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translate(0,0)" : translate,
                transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

// ── Data ───────────────────────────────────────────────────────────────────
const LOCATIONS: ContactLocation[] = [
    {
        label: "Virginia",
        name: "Virginia Surveillance Force",
        address: ["7544 Diplomat Drive; Suite 101", "Manassas, VA 20109"],
        tel: "(703) 631-6559",
        extra: "(800) 786-0395",
        extraLabel: "Toll Free",
        icon: "📍",
    },
    {
        label: "Maryland",
        name: "Maryland Location",
        address: ["1 Research Ct Suite 450", "Rockville, MD 20850"],
        tel: "(301) 800-7774",
        extra: "(866) 428-5725",
        extraLabel: "Fax",
        icon: "📍",
    },
    {
        label: "Washington DC",
        name: "Washington DC Location",
        address: ["1725 I Street, NW; Suite 300", "Washington, DC 20006"],
        tel: "(202) 888-2727",
        extra: "(800) 981-3113",
        extraLabel: "Toll Free",
        icon: "📍",
    },
    {
        label: "Mailing",
        name: "Mailing Address",
        address: ["Po Box #1876", "Centreville, VA 20122"],
        tel: "(786) 540-0666",
        extra: "(800) 570-8290",
        extraLabel: "Fax",
        icon: "✉️",
    },
];

const FORM_FIELDS: FormField[] = [
    { id: "name", name: "name", label: "Name", placeholder: "Your full name", required: true },
    { id: "address", name: "address", label: "Address", placeholder: "Street address", required: true },
    { id: "citytown", name: "citytown", label: "City / Town", placeholder: "City or town", required: true },
    { id: "province", name: "province", label: "State", placeholder: "State", required: true },
    { id: "postalcode", name: "postalcode", label: "Zipcode", placeholder: "Zip code", required: true },
    { id: "email", name: "email", label: "Email Address", placeholder: "you@example.com", type: "email", required: true },
    { id: "phone", name: "phone", label: "Phone No", placeholder: "(000) 000-0000", type: "tel", required: true },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function ContactUs() {
    const [formData, setFormData] = useState<FormData>({
        name: "", address: "", citytown: "", province: "",
        postalcode: "", email: "", phone: "", comments: "", my_file: null,
    });
    const [submitted, setSubmitted] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((p) => ({ ...p, my_file: e.target.files?.[0] ?? null }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    const handleReset = () => {
        setFormData({ name: "", address: "", citytown: "", province: "", postalcode: "", email: "", phone: "", comments: "", my_file: null });
    };

    return (
        <>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');

        :root {
          --navy: #0b1120;
          --navy-mid: #131e35;
          --navy-light: #1a2845;
          --gold: #eab308;
          --gold-light: #e8c97a;
          --steel: #8898aa;
          --white: #f4f6f8;
          --success: #27ae60;
        }

        * {
          font-family: 'Barlow', sans-serif;
        }

        .ct-section-label, .loc-badge, .loc-name, .btn-submit, .btn-reset {
          font-family: 'Bebas Neue', sans-serif !important;
        }
      `}</style>

            <PageBanner title="Contact Us" />

            <div className="ct-page bg-[#0b1120] text-[#f4f6f8] min-h-screen overflow-x-hidden relative before:content-[''] before:fixed before:inset-0 before:pointer-events-none before:z-0 before:bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(201,168,76,0.025)_39px,rgba(201,168,76,0.025)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(201,168,76,0.025)_39px,rgba(201,168,76,0.025)_40px)]">
                <div className="ct-inner relative z-[1] max-w-[1160px] mx-auto px-7">

                    {/* ── CONTACT INFORMATION ───────────────────── */}
                    <section className="loc-section py-16 pb-12 border-b border-[rgba(201,168,76,0.12)]">
                        <FadeIn delay={0}>
                            <h3 className=" font-extrabold text-[clamp(1.6rem,3vw,2.4rem)] tracking-[2px] text-white mb-1.5">
                                Contact <span className="text-[#eab308]">Information</span>
                            </h3>
                            <div className="gold-bar w-11 h-[3px] bg-gradient-to-r from-[#eab308] to-[#eab308] rounded mb-7" />
                        </FadeIn>

                        <div className="loc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {LOCATIONS.map((loc, i) => (
                                <FadeIn key={loc.label} delay={i * 0.08}>
                                    <div className="loc-card bg-[#131e35] border border-[rgba(201,168,76,0.15)] rounded p-6 transition-all duration-300 hover:border-[rgba(201,168,76,0.5)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_20px_rgba(201,168,76,0.06)]">
                                        <div className="loc-badge inline-flex items-center gap-1.5 text-[16px] tracking-[2px] text-[#eab308] bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] rounded py-0.5 px-2.5 mb-3.5">
                                            {loc.icon} {loc.label}
                                        </div>
                                        <p className="loc-name text-base tracking-[1.5px] text-white mb-2.5">{loc.name}</p>
                                        <div className="loc-text text-[0.88rem] font-light text-[rgba(244,246,248,0.72)] leading-relaxed">
                                            {loc.address.map((line, j) => (
                                                <span key={j}>{line}<br /></span>
                                            ))}
                                            <hr className="loc-divider border-t border-[rgba(201,168,76,0.1)] my-2.5" />
                                            Tel: <span className="loc-tel text-[#e8c97a] font-normal">{loc.tel}</span><br />
                                            {loc.extraLabel}: <span className="loc-tel text-[#e8c97a] font-normal">{loc.extra}</span>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </section>

                    {/* ── CONTACT FORM + MAP ────────────────────── */}
                    <section className="form-map-section py-16 pb-24">
                        <FadeIn delay={0}>
                            <h3 className="text-[clamp(2rem,5vw,3rem)] tracking-[2px] font-extrabold text-white mb-1.5">
                                Fill The <span className="text-[#eab308]">Form</span>
                            </h3>
                            <div className="gold-bar w-11 h-[3px] bg-gradient-to-r from-[#eab308] to-[#e8c97a] rounded mb-7" />
                        </FadeIn>

                        <div className="form-map-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Form */}
                            <FadeIn delay={0.1} direction="left">
                                {submitted && (
                                    <div className="success-toast bg-[rgba(39,174,96,0.12)] border border-[#27ae60] rounded p-3.5 mb-5 text-[0.95rem] text-[#27ae60] font-normal flex items-center gap-2.5 animate-[fadeSlide_0.4s_ease]">
                                        ✓ Your message has been sent! We&apos;ll get back to you shortly.
                                    </div>
                                )}
                                <form className="ct-form flex flex-col" onSubmit={handleSubmit} onReset={handleReset} encType="multipart/form-data">
                                    {FORM_FIELDS.map((f) => (
                                        <div key={f.id} className="form-group flex flex-col gap-1.5 mb-4">
                                            <label htmlFor={f.id} className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                                {f.required && <span className="req text-[#eab308] text-[0.9rem]">*</span>} {f.label}
                                            </label>
                                            <input
                                                id={f.id}
                                                name={f.name}
                                                type={f.type ?? "text"}
                                                placeholder={f.placeholder}
                                                required={f.required}
                                                value={formData[f.name as keyof Omit<FormData, "my_file">] as string}
                                                onChange={handleChange}
                                                onFocus={() => setFocused(f.id)}
                                                onBlur={() => setFocused(null)}
                                                className="form-input w-full p-3 bg-[#131e35] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] font-['Barlow',sans-serif] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]"
                                            />
                                        </div>
                                    ))}

                                    {/* Comments */}
                                    <div className="form-group flex flex-col gap-1.5 mb-4">
                                        <label htmlFor="comments" className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                            <span className="req text-[#c9a84c] text-[0.9rem]">*</span> Comments
                                        </label>
                                        <textarea
                                            id="comments"
                                            name="comments"
                                            placeholder="Tell us how we can help you..."
                                            required
                                            value={formData.comments}
                                            onChange={handleChange}
                                            className="form-textarea w-full p-3 bg-[#131e35] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] font-['Barlow',sans-serif] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] resize-y min-h-[120px]"
                                        />
                                    </div>

                                    {/* File upload */}
                                    <div className="form-group flex flex-col gap-1.5 mb-4">
                                        <label className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa]">Attach File</label>
                                        <label className="file-input-wrap p-3 bg-[#131e35] border border-dashed border-[rgba(201,168,76,0.25)] rounded text-[0.88rem] font-light text-[#8898aa] cursor-pointer transition-all duration-250 hover:border-[#c9a84c] hover:bg-[#1a2845]">
                                            <input type="file" name="my_file" onChange={handleFile} className="hidden" />
                                            <span>
                                                {formData.my_file
                                                    ? `📎 ${formData.my_file.name}`
                                                    : "📎 Click to attach a file (optional)"}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="form-btns flex gap-3 mt-2">
                                        <button type="submit" className="btn-submit flex-1 py-3.5 px-7 bg-[#eab308] text-[#0b1120] text-base tracking-[2px] border-none rounded cursor-pointer transition-all duration-250 hover:bg-[#e8c97a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)]">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </FadeIn>

                            {/* Map */}
                            <FadeIn delay={0.2} direction="right">
                                <div className="map-wrap relative rounded overflow-hidden border border-[rgba(201,168,76,0.2)] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.06)] h-full min-h-[520px]">
                                    <div className="map-overlay-corner absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#eab308] pointer-events-none z-[2]" />
                                    <div className="map-overlay-corner br absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#eab308] pointer-events-none z-[2]" />
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3109.727595930272!2d-77.5174961!3d38.792878699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b65d1fc801045f%3A0xaea554fd16a825ad!2sVirginia%20Surveillance%20Force!5e0!3m2!1sen!2sus!4v1780595458924!5m2!1sen!2sus"
                                        title="Virginia Surveillance Force Locations"
                                        allowFullScreen
                                        className="block w-full h-full min-h-[520px] border-none"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </section>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}