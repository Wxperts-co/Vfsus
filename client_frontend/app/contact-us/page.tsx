"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import PageBanner from "@/components/common-components/innerbanner";
import { useSettings } from "@/components/common-components/SettingsProvider";
import { contactFormSchema, MAX_COMMENT_WORDS, countWords } from "@/lib/validations/contact";

// ── Types ──────────────────────────────────────────────────────────────────
interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
    className?: string;
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

type FieldErrors = Partial<Record<keyof FormData | "captchaAnswer", string>>;

interface CaptchaState {
    question: string;
    token: string;
    loading: boolean;
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
const FORM_FIELDS: FormField[] = [
    { id: "name", name: "name", label: "Name", placeholder: "Your full name", required: true },
    { id: "address", name: "address", label: "Address", placeholder: "Street address", required: true },
    { id: "citytown", name: "citytown", label: "City / Town", placeholder: "City or town", required: true },
    { id: "province", name: "province", label: "State", placeholder: "State", required: true },
    { id: "postalcode", name: "postalcode", label: "Zipcode", placeholder: "Zip code", required: true },
    { id: "email", name: "email", label: "Email Address", placeholder: "you@example.com", type: "email", required: true },
    { id: "phone", name: "phone", label: "Phone No", placeholder: "(000) 000-0000", type: "tel", required: true },
];

const EMPTY_FORM: FormData = {
    name: "", address: "", citytown: "", province: "",
    postalcode: "", email: "", phone: "", comments: "", my_file: null,
};

// ── Page ───────────────────────────────────────────────────────────────────
export default function ContactUs() {
    const settings = useSettings();
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captcha, setCaptcha] = useState<CaptchaState>({ question: "", token: "", loading: true });
    const [errors, setErrors] = useState<FieldErrors>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const commentWords = countWords(formData.comments);
    const overWordLimit = commentWords > MAX_COMMENT_WORDS;

    const fetchCaptcha = async () => {
        setCaptcha((c) => ({ ...c, loading: true }));
        try {
            const res = await fetch("/api/captcha");
            const data = await res.json();
            setCaptcha({ question: data.question, token: data.token, loading: false });
        } catch {
            setCaptcha({ question: "", token: "", loading: false });
        }
        setCaptchaAnswer("");
    };

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        if (errors[name as keyof FieldErrors]) {
            setErrors((p) => ({ ...p, [name]: undefined }));
        }
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((p) => ({ ...p, my_file: e.target.files?.[0] ?? null }));
    };

    const handleReset = () => {
        setFormData(EMPTY_FORM);
        setErrors({});
        setSubmitError(null);
        fetchCaptcha();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        const validation = contactFormSchema.safeParse({
            ...formData,
            captchaAnswer,
            captchaToken: captcha.token,
        });

        if (!validation.success) {
            const fieldErrors: FieldErrors = {};
            for (const [key, messages] of Object.entries(validation.error.flatten().fieldErrors)) {
                if (messages?.[0]) fieldErrors[key as keyof FieldErrors] = messages[0];
            }
            setErrors(fieldErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("address", formData.address);
            payload.append("citytown", formData.citytown);
            payload.append("province", formData.province);
            payload.append("postalcode", formData.postalcode);
            payload.append("email", formData.email);
            payload.append("phone", formData.phone);
            payload.append("comments", formData.comments);
            payload.append("captchaAnswer", captchaAnswer);
            payload.append("captchaToken", captcha.token);
            if (formData.my_file) payload.append("file", formData.my_file);

            const response = await fetch("/api/contact", { method: "POST", body: payload });
            const result = await response.json();

            if (!response.ok) {
                if (result.issues) {
                    const fieldErrors: FieldErrors = {};
                    for (const [key, messages] of Object.entries(result.issues as Record<string, string[]>)) {
                        if (messages?.[0]) fieldErrors[key as keyof FieldErrors] = messages[0];
                    }
                    setErrors(fieldErrors);
                }
                throw new Error(result.error || "Failed to submit message");
            }

            setSubmitted(true);
            handleReset();
            setTimeout(() => setSubmitted(false), 4000);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitError(error instanceof Error ? error.message : "Failed to send message. Please try again.");
            fetchCaptcha();
        } finally {
            setIsSubmitting(false);
        }
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
          --error: #e25555;
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
                            {settings.contactCards?.map((loc, i) => (
                                <FadeIn key={loc.id || loc.label} delay={i * 0.08}>
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
                                {submitError && (
                                    <div className="error-toast bg-[rgba(226,85,85,0.12)] border border-[#e25555] rounded p-3.5 mb-5 text-[0.95rem] text-[#e25555] font-normal flex items-center gap-2.5">
                                        ✕ {submitError}
                                    </div>
                                )}
                                <form className="ct-form flex flex-col" onSubmit={handleSubmit} onReset={handleReset}>
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
                                                className={`form-input w-full p-3 bg-[#131e35] border rounded text-[#f4f6f8] font-['Barlow',sans-serif] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] ${errors[f.name as keyof FieldErrors] ? "border-[#e25555]" : "border-[rgba(201,168,76,0.18)]"}`}
                                            />
                                            {errors[f.name as keyof FieldErrors] && (
                                                <span className="text-[#e25555] text-[0.78rem]">{errors[f.name as keyof FieldErrors]}</span>
                                            )}
                                        </div>
                                    ))}

                                    {/* Comments */}
                                    <div className="form-group flex flex-col gap-1.5 mb-4">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="comments" className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                                <span className="req text-[#c9a84c] text-[0.9rem]">*</span> Comments
                                            </label>
                                            <span className={`text-[0.75rem] ${overWordLimit ? "text-[#e25555]" : "text-[#8898aa]"}`}>
                                                {commentWords} / {MAX_COMMENT_WORDS} words
                                            </span>
                                        </div>
                                        <textarea
                                            id="comments"
                                            name="comments"
                                            placeholder="Tell us how we can help you..."
                                            required
                                            value={formData.comments}
                                            onChange={handleChange}
                                            className={`form-textarea w-full p-3 bg-[#131e35] border rounded text-[#f4f6f8] font-['Barlow',sans-serif] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] resize-y min-h-[120px] ${errors.comments || overWordLimit ? "border-[#e25555]" : "border-[rgba(201,168,76,0.18)]"}`}
                                        />
                                        {errors.comments && (
                                            <span className="text-[#e25555] text-[0.78rem]">{errors.comments}</span>
                                        )}
                                    </div>

                                    {/* File upload */}
                                    <div className="form-group flex flex-col gap-1.5 mb-4">
                                        <label className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa]">Attach File</label>
                                        <label className="file-input-wrap p-3 bg-[#131e35] border border-dashed border-[rgba(201,168,76,0.25)] rounded text-[0.88rem] font-light text-[#8898aa] cursor-pointer transition-all duration-250 hover:border-[#c9a84c] hover:bg-[#1a2845]">
                                            <input type="file" name="my_file" onChange={handleFile} className="hidden" />
                                            <span>
                                                {formData.my_file
                                                    ? `📎 ${formData.my_file.name}`
                                                    : "📎 Click to attach a file (optional, max 5MB)"}
                                            </span>
                                        </label>
                                    </div>

                                    {/* Captcha */}
                                    <div className="form-group flex flex-col gap-1.5 mb-4">
                                        <label htmlFor="captcha" className="form-label text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                            <span className="req text-[#eab308] text-[0.9rem]">*</span> Verify You&apos;re Human
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <div className="captcha-question shrink-0 py-3 px-4 bg-[#1a2845] border border-[rgba(201,168,76,0.3)] rounded text-[#e8c97a] text-[0.95rem] tracking-[1px] min-w-[110px] text-center">
                                                {captcha.loading ? "…" : captcha.question || "—"}
                                            </div>
                                            <input
                                                id="captcha"
                                                name="captchaAnswer"
                                                type="number"
                                                placeholder="Answer"
                                                value={captchaAnswer}
                                                onChange={(e) => {
                                                    setCaptchaAnswer(e.target.value);
                                                    if (errors.captchaAnswer) setErrors((p) => ({ ...p, captchaAnswer: undefined }));
                                                }}
                                                className={`form-input w-full p-3 bg-[#131e35] border rounded text-[#f4f6f8] font-['Barlow',sans-serif] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] ${errors.captchaAnswer ? "border-[#e25555]" : "border-[rgba(201,168,76,0.18)]"}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={fetchCaptcha}
                                                title="Get a new question"
                                                className="shrink-0 py-3 px-3 bg-[#1a2845] border border-[rgba(201,168,76,0.25)] rounded text-[#8898aa] hover:text-[#eab308] hover:border-[#eab308] transition-all duration-250"
                                            >
                                                ↻
                                            </button>
                                        </div>
                                        {errors.captchaAnswer && (
                                            <span className="text-[#e25555] text-[0.78rem]">{errors.captchaAnswer}</span>
                                        )}
                                    </div>

                                    <div className="form-btns flex gap-3 mt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || captcha.loading || overWordLimit}
                                            className="btn-submit flex-1 py-3.5 px-7 bg-[#eab308] text-[#0b1120] text-base tracking-[2px] border-none rounded cursor-pointer transition-all duration-250 hover:bg-[#e8c97a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit"}
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn-reset py-3.5 px-7 bg-transparent text-[#8898aa] text-base tracking-[2px] border border-[rgba(201,168,76,0.3)] rounded cursor-pointer transition-all duration-250 hover:border-[#eab308] hover:text-[#eab308]"
                                        >
                                            Reset
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