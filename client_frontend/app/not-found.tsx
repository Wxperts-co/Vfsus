"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] relative overflow-hidden font-[family-name:var(--font-barlow)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.15)_0%,transparent_70%)] blur-[40px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(239,68,68,0.1)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

      {/* Grid pattern overlay (optional styling fallback if image not present) */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
        {/* Animated Badge */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse" />
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(239,68,68,0.3)]">
            <ShieldAlert className="h-12 w-12 text-red-400" />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="font-[family-name:var(--font-bebas)] text-[120px] leading-none tracking-[4px] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 drop-shadow-2xl">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide uppercase">
          Perimeter Breach
        </h2>
        <p className="text-[#94a3b8] text-[16px] md:text-[18px] leading-relaxed mb-10 max-w-[480px]">
          The sector you are attempting to access does not exist or has been
          restricted. Please return to a secured zone.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)]"
          >
            <Home className="h-[18px] w-[18px]" /> Return to Base
          </Link>
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl transition-all duration-300 hover:bg-white/20 hover:-translate-y-1"
          >
            <ArrowLeft className="h-[18px] w-[18px]" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
