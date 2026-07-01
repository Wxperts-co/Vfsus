"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import PageBanner from "@/components/common-components/innerbanner";

export default function PayNowPage() {
    const paypalFormRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        amount: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // First, save the intent to our database
            const res = await fetch("/api/process-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to initialize payment");
            }

            // If successful, programmatically submit the hidden PayPal form
            if (paypalFormRef.current) {
                paypalFormRef.current.submit();
            } else {
                throw new Error("PayPal form could not be initialized");
            }
        } catch (error: any) {
            console.error("Payment initialization error:", error);
            setSubmitError(error.message || "An unexpected error occurred. Please try again.");
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
                }

                * {
                  font-family: 'Barlow', sans-serif;
                }

                .pay-btn {
                  font-family: 'Bebas Neue', sans-serif !important;
                }
            `}</style>

            <PageBanner title="Pay Now" />

            <div className="bg-[#0b1120] text-[#f4f6f8] min-h-[70vh] flex items-center justify-center py-16 px-4 relative before:content-[''] before:fixed before:inset-0 before:pointer-events-none before:z-0 before:bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(201,168,76,0.025)_39px,rgba(201,168,76,0.025)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(201,168,76,0.025)_39px,rgba(201,168,76,0.025)_40px)]">
                <div className="relative z-[1] w-full max-w-lg bg-[#131e35] p-8 md:p-10 rounded-lg border border-[rgba(201,168,76,0.15)] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.06)]">
                    
                    <div className="text-center mb-10">
                        <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] tracking-[2px] font-extrabold text-white mb-2 font-['Bebas_Neue',sans-serif]">
                            Secure <span className="text-[#eab308]">Payment</span>
                        </h2>
                        <div className="w-12 h-[3px] bg-gradient-to-r from-[#eab308] to-[#e8c97a] rounded mx-auto mb-4" />
                        <p className="text-[#8898aa] text-[0.95rem]">
                            Enter your payment details below to proceed securely via PayPal.
                        </p>
                    </div>

                    {submitError && (
                        <div className="bg-[rgba(226,85,85,0.12)] border border-[#e25555] rounded p-3.5 mb-5 text-[0.95rem] text-[#e25555] font-normal flex items-center gap-2.5">
                            ✕ {submitError}
                        </div>
                    )}

                    {/* Visible Form that captures intent */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                    <span className="text-[#eab308] text-[0.9rem]">*</span> First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Jane"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-[#0b1120] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] disabled:opacity-50"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                    <span className="text-[#eab308] text-[0.9rem]">*</span> Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Doe"
                                    required
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-3 bg-[#0b1120] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                <span className="text-[#eab308] text-[0.9rem]">*</span> Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                                className="w-full p-3 bg-[#0b1120] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] disabled:opacity-50"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[0.82rem] font-medium tracking-[1px] uppercase text-[#8898aa] flex items-center gap-1">
                                <span className="text-[#eab308] text-[0.9rem]">*</span> Amount (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8898aa] font-medium">$</span>
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="0.00"
                                    min="1"
                                    step="0.01"
                                    required
                                    value={formData.amount}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    className="w-full p-3 pl-8 bg-[#0b1120] border border-[rgba(201,168,76,0.18)] rounded text-[#f4f6f8] text-[0.95rem] font-light outline-none transition-all duration-250 focus:border-[#c9a84c] focus:bg-[#1a2845] disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="pay-btn mt-4 w-full py-4 bg-[#eab308] text-[#0b1120] text-xl tracking-[2px] border-none rounded cursor-pointer transition-all duration-300 hover:bg-[#e8c97a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            {isSubmitting ? "Processing..." : "Proceed to PayPal"}
                        </button>
                    </form>

                    {/* Hidden Form for Actual PayPal Redirect */}
                    <form ref={paypalFormRef} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" style={{ display: "none" }}>
                        <input type="hidden" name="cmd" value="_xclick" />
                        <input type="hidden" name="business" value={process.env.NEXT_PUBLIC_PAYPAL_EMAIL || "info@vfsus.com"} />
                        <input type="hidden" name="item_name" value="Payment to Virginia Surveillance Force" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="hidden" name="first_name" value={formData.first_name} />
                        <input type="hidden" name="last_name" value={formData.last_name} />
                        <input type="hidden" name="email" value={formData.email} />
                        <input type="hidden" name="amount" value={formData.amount} />
                        <input type="hidden" name="return" value="https://vfsus.com/pay-now?success=true" />
                        <input type="hidden" name="cancel_return" value="https://vfsus.com/pay-now?cancel=true" />
                    </form>
                </div>
            </div>
        </>
    );
}
