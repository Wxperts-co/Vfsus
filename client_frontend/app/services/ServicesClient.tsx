"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PageBanner from "@/components/common-components/innerbanner";
import type { ServiceData, ServicesPageData } from "@/lib/page-services";

// ── Types ──────────────────────────────────────────────────────────────────
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ── Hook ───────────────────────────────────────────────────────────────────
function useInView(threshold: number = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ── Animated wrapper ───────────────────────────────────────────────────────
function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(36px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Service card ───────────────────────────────────────────────────────────
function ServiceCard({ item, index }: { item: ServiceData; index: number }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const col = index % 4;
  const row = Math.floor(index / 4);
  const delay = col * 0.08 + row * 0.04;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      <Link
        href={`/services/${item.slug}`}
        className="group block relative rounded-md overflow-hidden bg-[#131e35] border border-[rgba(201,168,76,0.15)] transition-all duration-300 hover:border-[rgba(201,168,76,0.55)] hover:shadow-[0_16px_56px_rgba(0,0,0,0.55),0_0_28px_rgba(201,168,76,0.08)] hover:-translate-y-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: "none" }}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1a2845]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[rgba(11,17,32,0.3)] to-[rgba(11,17,32,0.85)] transition-opacity duration-300"
            style={{ opacity: hovered ? 0.72 : 0.45 }}
          />
        </div>

        {/* Icon badge */}
        <div
          className="absolute top-3 right-3 w-9 h-9 bg-[rgba(11,17,32,0.75)] border border-[rgba(201,168,76,0.3)] rounded flex items-center justify-center text-lg backdrop-blur-sm transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
        >
          {item.icon}
        </div>

        {/* Caption */}
        <div className="p-4 pb-[18px] min-h-[72px] flex flex-col justify-center gap-1.5">
          <h3
            className="font-['Bebas_Neue',sans-serif] text-[1.05rem] tracking-[1.5px] leading-tight m-0 transition-colors duration-300"
            style={{ color: hovered ? "#c9a84c" : "#f4f6f8" }}
          >
            {item.title}
          </h3>
          <span
            className="text-[0.78rem] text-[#c9a84c] tracking-[1px] transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-8px)" }}
          >
            View Details →
          </span>
        </div>

        {/* Gold bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] origin-left transition-transform duration-300"
          style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
        />
      </Link>
    </div>
  );
}

// ── Client Component ───────────────────────────────────────────────────────
export default function ServicesClient({ data }: { data: ServicesPageData }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');
        :root { --navy:#0b1120; --navy-mid:#131e35; --navy-light:#1a2845; --gold:#c9a84c; --gold-light:#e8c97a; --steel:#8898aa; --white:#f4f6f8; }
      `}</style>

      <PageBanner title="Services" />

      <div className="bg-[#0b1120] text-[#f4f6f8] overflow-x-hidden min-h-screen font-['Barlow',sans-serif]">
        <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
          {/* Intro + Video */}
          <section className="relative py-16 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)] before:pointer-events-none">
            <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
              <AnimatedSection delay={0} className="flex flex-col items-center text-center">

                <h3 
                  className="section-headline text-4xl sm:text-5xl lg:text-[3.2rem] tracking-wide leading-tight font-extrabold mb-5"
                  dangerouslySetInnerHTML={{ __html: data.intro.headline }}
                />
                
                <div className="w-14 h-[3px] bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] rounded mb-7" />
                
                <div 
                  className="mx-auto text-[1.05rem] font-light leading-[1.85] text-[rgba(244,246,248,0.78)] mb-10 tiptap-content"
                  dangerouslySetInnerHTML={{ __html: data.intro.contentHtml }}
                />
              </AnimatedSection>

              <section className="video-section relative py-14 bg-[#0b1120] before:content-[''] before:absolute before:inset-0 before:bg-repeating-linear before:pointer-events-none">
                <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8 relative z-10">
                  <AnimatedSection delay={0}>
                    <div className="video-badge inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[2px] py-1.5 px-4 rounded mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] animate-pulse" /> {data.video.badgeText}
                    </div>
                  </AnimatedSection>
                  <AnimatedSection delay={0.1}>
                    <div className="video-frame-wrapper relative rounded overflow-hidden shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_24px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(201,168,76,0.07)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(201,168,76,0.08)] before:to-transparent before:pointer-events-none before:z-[1]">
                      <iframe
                        src={data.video.wistiaUrl}
                        scrolling="no"
                        allowFullScreen
                        title="VSF Introduction"
                        className="block w-full h-[380px] border-none relative z-0"
                      />
                    </div>
                  </AnimatedSection>
                </div>
              </section>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 pb-24 border-t border-[rgba(201,168,76,0.12)]">
            <div className="max-w-6xl mx-auto px-7">
              <AnimatedSection delay={0}>
                <h2 className="font-['Bebas_Neue',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] tracking-[2px] text-white mb-2">
                  Our <span className="text-[#c9a84c]">Services</span>
                </h2>
                <div className="w-12 h-[3px] bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] rounded mb-10" />
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.services.map((item: ServiceData, i: number) => (
                  <ServiceCard key={item.slug} item={item} index={i} />
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
