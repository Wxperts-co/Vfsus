"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ShieldAlert,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Access denied. Invalid credentials.");
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[980px] overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]">
      {/* Left Panel — Image with gradient overlay */}
      <div className="relative hidden w-[46%] min-h-[580px] overflow-hidden md:block">
        <img
          src="/images/about-section-2.jpg"
          alt="VSF Security Patrol"
          className="h-full w-full object-cover block"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(30,27,75,0.85)] via-[rgba(49,46,129,0.6)] to-[rgba(30,27,75,0.9)]" />

        {/* Floating decorative circles */}
        <div className="absolute top-[15%] left-[10%] w-[120px] h-[120px] rounded-full bg-[rgba(129,140,248,0.12)] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-[80px] h-[80px] rounded-full bg-[rgba(244,114,182,0.1)] animate-float-delayed pointer-events-none" />

        {/* Content on image */}
        <div className="absolute inset-0 flex flex-col justify-between p-9">
          {/* Top logo */}
          <div>
            <img
              src="/images/logo2.png"
              alt="VSF Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Bottom text */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-4">
              <Shield className="h-3 w-3 text-[#a5b4fc]" />
              <span className="text-[10px] font-semibold tracking-[1.5px] uppercase text-[#c7d2fe]">
                Secure Portal
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-bebas)] text-[32px] tracking-[3px] text-white leading-[1.1] mb-2.5">
              VIRGINIA
              <br />
              SURVEILLANCE
              <br />
              FORCE
            </h3>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-12 py-13 bg-white">
        <div className="max-w-[360px] w-full mx-auto">
          {/* Mobile logo */}
          <div className="md:hidden mb-7">
            <img
              src="/images/logo2.png"
              alt="VSF Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Header */}
          <div className="mb-9">
            <h2 className="font-[family-name:var(--font-bebas)] text-[38px] tracking-[2px] text-[#1e1b4b] leading-none mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 mb-6">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <span className="text-[13px] text-red-600 font-medium">
                {error}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-[22px]">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[13px] font-semibold text-[#334155]"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Mail className="h-[17px] w-[17px] text-[#cbd5e1] transition-colors" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] py-3 pl-11 pr-3.5 text-sm font-[family-name:var(--font-barlow)] text-[#1e293b] outline-none transition-all duration-200 focus:border-[#818cf8] focus:shadow-[0_0_0_3px_rgba(129,140,248,0.12)] focus:bg-[#fafaff] box-border"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[13px] font-semibold text-[#334155]"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Lock className="h-[17px] w-[17px] text-[#cbd5e1] transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] py-3 pl-11 pr-11 text-sm font-[family-name:var(--font-barlow)] text-[#1e293b] outline-none transition-all duration-200 focus:border-[#818cf8] focus:shadow-[0_0_0_3px_rgba(129,140,248,0.12)] focus:bg-[#fafaff] box-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 bg-transparent border-none cursor-pointer text-[#94a3b8] hover:text-[#475569] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-[17px] w-[17px]" />
                  ) : (
                    <Eye className="h-[17px] w-[17px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-none bg-gradient-to-br from-[#667eea] to-[#764ba2] py-3.5 px-5 font-[family-name:var(--font-bebas)] text-[17px] tracking-[3px] text-white font-bold cursor-pointer transition-all duration-300 shadow-[0_6px_20px_rgba(102,126,234,0.3)] mt-1 hover:translate-y-[-2px] hover:shadow-[0_12px_28px_rgba(102,126,234,0.4)] active:translate-y-0 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-[18px] w-[18px] animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  SIGN IN
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-[11px] text-[#cbd5e1] text-center mt-8">
            Protected by VSF Security Systems
          </p>
        </div>
      </div>
    </div>
  );
}
