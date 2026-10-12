import React from 'react';

export default function WhyChooseUsAnswerSnippet() {
  return (
    <section className="bg-[#0b1120] py-6 sm:py-8 border-b border-white/10 relative z-10">
      <div className="container max-w-[1320px] mx-auto px-4 sm:px-6 text-center">
        {/* Centered Heading with wider max-width */}
        <h2 
          className="text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-bold text-white tracking-tight leading-snug mx-auto max-w-5xl"
          style={{ fontFamily: 'var(--font-barlow), system-ui, -apple-system, sans-serif' }}
        >
          Why Choose Virginia Surveillance Force for Professional Security Services
        </h2>

        {/* Compact Decorative Golden Line with Dot */}
        <div className="flex items-center justify-center gap-2.5 my-2.5 sm:my-3" aria-hidden="true">
          <div className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#eab308]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
          <div className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#eab308]" />
        </div>

        {/* Centered Description with wider max-width */}
        <p className="text-slate-300 text-sm sm:text-base md:text-[16.5px] leading-relaxed max-w-5xl mx-auto font-sans m-0">
          <strong className="text-white font-semibold">Virginia Surveillance Force, Inc.</strong> has provided professional security solutions and trained protective personnel since 1987. Serving as a reliable security partner rather than a simple contractor, the company delivers custom protection plans, strict accountability, and versatile officer attire tailored to each client environment.
        </p>
      </div>
    </section>
  );
}
