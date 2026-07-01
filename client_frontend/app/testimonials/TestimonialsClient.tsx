"use client";

import { useEffect, useRef, useState } from "react";
import PageBanner from "@/components/common-components/innerbanner";

// ── Types ──────────────────────────────────────────────────────────────────
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface TestimonialVideo {
  id?: string;
  src: string;
  title: string;
}

interface TestimonialLetter {
  id: string;
  name: string;
  date: string;
  role: string;
  contentHtml: string;
}

import { TestimonialsPageData } from "@/lib/page-testimonials";

// ── Hook ───────────────────────────────────────────────────────────────────
function useInView(threshold: number = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
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

// ── Video card ─────────────────────────────────────────────────────────────
function VideoCard({ src, title, delay }: TestimonialVideo & { delay: number }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="video-card bg-[#131e35] border border-[rgba(201,168,76,0.18)] rounded-md overflow-hidden transition-all duration-300 hover:border-[#c9a84c] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_0_24px_rgba(201,168,76,0.1)] hover:-translate-y-1"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      <div className="video-inner relative w-full aspect-video bg-black">
        <iframe
          src={src}
          title={title}
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 w-full h-full border-none"
        />
      </div>
      <p className="video-label font-['Bebas_Neue',sans-serif] text-[0.95rem] tracking-[1.5px] text-[#8898aa] py-3 px-[18px] m-0 border-t border-[rgba(201,168,76,0.1)]">
        {title}
      </p>
    </div>
  );
}

// ── Card-style Accordion Item (for two-column layout) ─────────────────────
function AccordionCard({ item, index, column }: { item: TestimonialLetter; index: number; column: number }) {
  const [open, setOpen] = useState<boolean>(false);
  const [ref, inView] = useInView();
  const bodyRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="accordion-card bg-[#131e35] border border-[rgba(201,168,76,0.15)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${(index * 0.05) + (column * 0.1)}s, transform 0.5s ease ${(index * 0.05) + (column * 0.1)}s`,
      }}
    >
      <button
        className={`accordion-card-trigger w-full bg-transparent border-none cursor-pointer text-left p-5 transition-colors duration-250 hover:bg-[rgba(201,168,76,0.05)] ${open ? "bg-gradient-to-br from-[rgba(201,168,76,0.08)] to-transparent border-b border-[rgba(201,168,76,0.15)]" : ""}`}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <div className="accordion-card-header flex items-center justify-between gap-4 mb-2.5">
          <span className={`accordion-card-name font-['Bebas_Neue',sans-serif] text-xl tracking-[1.5px] text-white transition-colors duration-250 ${open ? "text-[#eab308]" : ""}`}>
            {item.name}
          </span>
          <span className="accordion-card-chevron text-[1.5rem] text-[#eab308] leading-none w-7 h-7 flex items-center justify-center rounded-full bg-[rgba(201,168,76,0.1)] transition-all duration-250">
            {open ? "−" : "+"}
          </span>
        </div>
        <div className="accordion-card-meta flex items-center gap-4 flex-wrap">
          <span className="accordion-card-date text-xs font-normal text-[#8898aa]">{item.date}</span>
          <span className="accordion-card-role text-xs font-medium text-[#eab308] uppercase tracking-[1px]">{item.role}</span>
        </div>
      </button>
      <div
        className={`accordion-card-body overflow-hidden transition-[max-height,opacity] duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        style={{ maxHeight: open ? (bodyRef.current?.scrollHeight ?? 800) + "px" : "0px" }}
      >
        <div className="accordion-card-body-inner p-6 border-t border-[rgba(201,168,76,0.12)] text-[0.95rem] font-light leading-[1.8] text-[rgba(244,246,248,0.85)]">
          <div dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
          <div className="accordion-card-sig mt-6 text-[0.9rem] text-[#8898aa] text-right border-t border-dashed border-[rgba(201,168,76,0.1)] pt-3">
            <span className="sig-quote text-[#c9a84c] font-serif text-[1.8rem] leading-[0.1] align-middle">“</span> {item.name}, <em>{item.role}</em>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function TestimonialsClient({ data }: { data: TestimonialsPageData }) {
  const VIDEOS = data.videos || [];
  const LETTERS = data.letters || [];

  // Split letters into two columns (alternating for balance)
  const halfLength = Math.ceil(LETTERS.length / 2);
  const leftColumnLetters = LETTERS.slice(0, halfLength);
  const rightColumnLetters = LETTERS.slice(halfLength);

  return (
    <>
      <PageBanner title="Testimonials" />

      <div className="testi-wrapper bg-[#0b1120] text-[#f4f6f8] overflow-x-hidden min-h-screen">
        {/* Intro */}
        <section className="testi-intro relative py-[72px] pb-16 text-center overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_70%),repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(201,168,76,0.03)_39px,rgba(201,168,76,0.03)_40px)] before:pointer-events-none">
          <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8 relative z-10">
            <AnimatedSection delay={0}>
              <div className="testi-eyebrow inline-flex items-center gap-2.5 font-['Bebas_Neue',sans-serif] text-xs tracking-[3px] text-[#eab308] mb-4 before:content-[''] before:w-8 before:h-px before:bg-[#c9a84c] before:opacity-50 after:content-[''] after:w-8 after:h-px after:bg-[#c9a84c] after:opacity-50">
                Client Feedback
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="testi-h2 font-['Bebas_Neue',sans-serif] font-extrabold text-[clamp(2.8rem,6vw,5rem)] tracking-[3px] leading-none mb-6 text-white">
                What They Say <span className=" testi-h2 text-[#eab308] heading-font">About Us</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="testi-lead max-w-[740px] mx-auto text-[1.05rem] font-light leading-[1.85] text-[rgba(244,246,248,0.75)]">
                Over the years, Virginia Surveillance Force has served a variety of businesses, residential communities, jewelry stores, and banking facilities. Read letters and watch video reviews from our clients.
              </p>
              <div className="gold-rule w-[60px] h-[3px] bg-gradient-to-r from-[#eab308] to-[#c9a84c] rounded mx-auto mt-7" />
            </AnimatedSection>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="video-section py-16 pb-14 border-t border-[rgba(201,168,76,0.12)]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
            <AnimatedSection delay={0}>
              <h3 className="video-section-label font-extrabold font-['Bebas_Neue',sans-serif] text-[clamp(1.6rem,3vw,2.4rem)] tracking-[2px] text-white mb-2">
                Video <span className="testi-h2 text-[#eab308] heading-font">Reviews</span>
              </h3>
              <div className="section-bar w-12 h-[3px] bg-gradient-to-r from-[#eab308] to-[#c9a84c] rounded mb-9" />
            </AnimatedSection>

            <div className="video-grid grid grid-cols-1 md:grid-cols-2 gap-7">
              {VIDEOS.map((video, idx) => (
                <VideoCard
                  key={video.title}
                  src={video.src}
                  title={video.title}
                  delay={idx * 0.08}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Letters/Accordion Section */}
        <section className="accordion-section py-16 pb-24 border-t border-[rgba(201,168,76,0.12)]">
          <div className="container mx-auto px-3 sm:px-4 lg:px-5 xl:px-6 2xl:px-8">
            <AnimatedSection delay={0}>
              <h3 className="video-section-label font-extrabold font-['Bebas_Neue',sans-serif] text-[clamp(1.6rem,3vw,2.4rem)] tracking-[2px] text-white mb-2">
                Client Recommendation <span className="testi-h2 text-[#eab308] heading-font">Letters</span>
              </h3>
              <div className="section-bar w-12 h-[3px] bg-gradient-to-r from-[#eab308] to-[#c9a84c] rounded mb-9" />
            </AnimatedSection>

            <div className="accordion-two-columns grid grid-cols-1 lg:grid-cols-2 gap-7">
              <div className="accordion-col flex flex-col gap-5">
                {leftColumnLetters.map((item, idx) => (
                  <AccordionCard key={item.id} item={item} index={idx} column={0} />
                ))}
              </div>
              <div className="accordion-col flex flex-col gap-5">
                {rightColumnLetters.map((item, idx) => (
                  <AccordionCard key={item.id} item={item} index={idx} column={1} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}