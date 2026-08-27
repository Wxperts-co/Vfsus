"use client";

import { useEffect, useRef, useState } from "react";
import PageBanner from "@/components/common-components/innerbanner";
import { AboutUsPageData } from "@/lib/page-about-us";
import { Video } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface StatCardProps {
  icon: string;
  label: string;
  delay: number;
}

// ── Hooks ──────────────────────────────────────────────────────────────────
function useInView(threshold: number = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
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

// ── Components ─────────────────────────────────────────────────────────────
function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ icon, label, delay }: StatCardProps) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="stat-card bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded px-5 py-7 text-center transition-all duration-300 cursor-default hover:border-[#c9a84c] hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.85)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div className="text-3xl mb-2.5">{icon}</div>
      <div className="stat-label font-['Bebas_Neue',sans-serif] text-sm tracking-[1.5px] text-[#8898aa]">{label}</div>
    </div>
  );
}

// ── Main Client Component ──────────────────────────────────────────────────
export default function AboutUsClient({ data }: { data: AboutUsPageData }) {
  return (
    <>
      <PageBanner title="About Us" />

      <div className="about-wrapper bg-[#0b1120] text-[#f4f6f8] overflow-x-hidden">
        {/* ── MAIN CONTENT ──────────────────────────── */}
        <section className="content-section pb-24 bg-[#0b1120]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
            
            {/* Intro two-col */}
            <div className="intro-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 py-16 border-b border-[rgba(201,168,76,0.15)]">
              <AnimatedSection delay={0}>
                <div className="section-headline text-4xl sm:text-5xl lg:text-[3.2rem] tracking-wide leading-tight font-extrabold mb-5">
                  {data.intro.headlineLeft}<br />
                  <span className="section-headline text-[#eab308]">{data.intro.headlineRight}</span>
                </div>
                <div className="gold-bar w-14 h-[3px] bg-gradient-to-r from-[#eab308] to-[#eab308] rounded-sm mb-7" />
                <div 
                  className="prose prose-invert max-w-none prose-p:font-light prose-p:text-[1.05rem] prose-p:leading-[1.85] prose-p:text-[rgba(244,246,248,0.8)] prose-p:mb-5"
                  dangerouslySetInnerHTML={{ __html: data.intro.contentLeftHtml }} 
                />
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div 
                  className="prose prose-invert max-w-none prose-p:font-light prose-p:text-[1.05rem] prose-p:leading-[1.85] prose-p:text-[rgba(244,246,248,0.8)] prose-p:mb-5"
                  dangerouslySetInnerHTML={{ __html: data.intro.contentRightHtml }} 
                />
              </AnimatedSection>
            </div>

            {/* ── VIDEO ─────────────────────────────────── */}
            <section className="video-section relative py-14 bg-[#0b1120] before:content-[''] before:absolute before:inset-0 before:bg-repeating-linear before:pointer-events-none">
              <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8 relative z-10">
                <AnimatedSection delay={0}>
                  <div className="video-badge inline-flex items-center gap-2 bg-[rgba(201,168,76,0.12)] border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[2px] py-1.5 px-4 rounded mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] animate-pulse" /> {data.video.badgeText}
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="video-frame-wrapper relative rounded overflow-hidden shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_24px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(201,168,76,0.07)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(201,168,76,0.08)] before:to-transparent before:pointer-events-none before:z-[1]">
                      {data.video.wistiaUrl && (data.video.wistiaUrl.startsWith('/uploads/') || data.video.wistiaUrl.split('?')[0].toLowerCase().endsWith('.mp4') || data.video.wistiaUrl.split('?')[0].toLowerCase().endsWith('.webm') || data.video.wistiaUrl.split('?')[0].toLowerCase().endsWith('.ogg')) ? (
                        <video
                          src={data.video.wistiaUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="block w-full h-[380px] border-none relative z-0 object-cover"
                        />
                      ) : (
                        <iframe
                          src={data.video.wistiaUrl}
                          scrolling="no"
                          allowFullScreen
                          title="VSF Live Operations 1"
                          className="block w-full h-[380px] border-none relative z-0"
                        />
                      )}
                    </div>
                    {data.video.wistiaUrl2 ? (
                      <div className="video-frame-wrapper relative rounded overflow-hidden shadow-[0_0_0_1px_rgba(201,168,76,0.3),0_24px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(201,168,76,0.07)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-[rgba(201,168,76,0.08)] before:to-transparent before:pointer-events-none before:z-[1]">
                        {data.video.wistiaUrl2.startsWith('/uploads/') || data.video.wistiaUrl2.split('?')[0].toLowerCase().endsWith('.mp4') || data.video.wistiaUrl2.split('?')[0].toLowerCase().endsWith('.webm') || data.video.wistiaUrl2.split('?')[0].toLowerCase().endsWith('.ogg') ? (
                          <video
                            src={data.video.wistiaUrl2}
                            controls
                            playsInline
                            preload="metadata"
                            className="block w-full h-[380px] border-none relative z-0 object-cover"
                          />
                        ) : (
                          <iframe
                            src={data.video.wistiaUrl2}
                            scrolling="no"
                            allowFullScreen
                            title="VSF Live Operations 2"
                            className="block w-full h-[380px] border-none relative z-0"
                          />
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center bg-[#131e35] border border-[rgba(201,168,76,0.18)] rounded-[20px] h-[380px] text-slate-400">
                        <Video className="w-12 h-12 text-[#c9a84c] mb-3 animate-pulse" />
                        <span className="font-['Bebas_Neue',sans-serif] tracking-[2px] text-lg text-white">Live Operations 2</span>
                        <span className="text-xs text-slate-500 mt-1">Configure this video in the admin panel</span>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </section>

            {/* Stats row */}
            {data.stats.length > 0 && (
              <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-4 py-14 border-b border-[rgba(201,168,76,0.15)]">
                {data.stats.map((s, i) => (
                  <StatCard key={s.id || i} icon={s.icon} label={s.label} delay={i * 0.1} />
                ))}
              </div>
            )}

            {/* Promise cards */}
            <div className="pt-14">
              <AnimatedSection delay={0}>
                <div className="section-headline text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold tracking-wide leading-tight mb-2">
                  {data.promises.headlineLeft} <span className="section-headline text-[#eab308]">{data.promises.headlineRight}</span>
                </div>
                <div className="gold-bar w-14 h-[3px] bg-gradient-to-r from-[#eab308] to-[#eab308] rounded-sm mb-7" />
              </AnimatedSection>
            </div>
            
            {data.promises.items.length > 0 && (
              <div className="promise-grid grid grid-cols-1 md:grid-cols-3 gap-6 py-14 border-b border-[rgba(201,168,76,0.15)]">
                {data.promises.items.map((c, i) => (
                  <AnimatedSection key={c.id || i} delay={i * 0.1}>
                    <div className="promise-card bg-[#131e35] border-l-3 border-l-[#eab308] p-7 rounded-r transition-all duration-300 hover:bg-[rgba(201,168,76,0.07)] hover:translate-x-1 h-full">
                      <h4 className="text-xl tracking-[1.5px] text-[#eab308] mb-2.5">{c.title}</h4>
                      <p className="text-[0.95rem] font-light text-[rgba(244,246,248,0.75)] leading-relaxed m-0">{c.body}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}

            {/* Training section */}
            <div className="training-section pt-14">
              <AnimatedSection delay={0}>
                <div className="section-headline text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold tracking-wide leading-tight">
                  {data.training.headlineLeft}<span className="section-headline text-[#eab308]">{data.training.headlineRight}</span>
                </div>
                <div className="gold-bar w-14 h-[3px] bg-gradient-to-r from-[#eab308] to-[#eab308] rounded-sm mb-7" />
                <div 
                  className="prose prose-invert max-w-none prose-p:font-light prose-p:text-[1.05rem] prose-p:leading-[1.85] prose-p:text-[rgba(244,246,248,0.8)] prose-p:mb-5"
                  dangerouslySetInnerHTML={{ __html: data.training.introHtml }}
                />
              </AnimatedSection>

              {data.training.items.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <div className="training-list grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-7">
                    {data.training.items.map((item, i) => (
                      <div
                        key={item.id || i}
                        className="training-item flex items-start gap-3 bg-[#131e35] border border-[rgba(201,168,76,0.12)] rounded p-4 text-[0.93rem] text-[rgba(244,246,248,0.8)] font-light transition-colors duration-250 hover:border-[rgba(201,168,76,0.4)] before:content-['▸'] before:text-[#eab308] before:text-sm before:mt-0.5 before:flex-shrink-0"
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

          </div>
        </section>
      </div>

      <style jsx>{`
        .border-l-3 {
          border-left-width: 3px;
        }
        .bg-repeating-linear {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(201, 168, 76, 0.04) 39px,
            rgba(201, 168, 76, 0.04) 40px
          );
        }
      `}</style>
    </>
  );
}
