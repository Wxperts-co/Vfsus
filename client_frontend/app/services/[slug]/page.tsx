"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/common-components/innerbanner";
import SERVICES, { getServiceBySlug } from "@/data/service";
import type { ServiceData, ServiceSection } from "@/data/service";

// ── Types ──────────────────────────────────────────────────────────────────
interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
    className?: string;
}

interface ServiceDetailPageProps {
    params: Promise<{ slug: string }>;
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

// ── Sidebar nav ────────────────────────────────────────────────────────────
interface ServicesSidebarProps {
    currentSlug: string;
    onServiceClick?: (slug: string) => void;
}

function ServicesSidebar({ currentSlug, onServiceClick }: ServicesSidebarProps) {
    return (
        <aside className="sidebar-wrap">
            <div className="sidebar-label">All Services</div>
            <nav className="sidebar-nav">
                {SERVICES.map((s: ServiceData) => {
                    const active = s.slug === currentSlug;
                    return (
                        <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className={`sidebar-link ${active ? "sidebar-link--active" : ""}`}
                            scroll={false}
                            onClick={(e) => {
                                if (onServiceClick) {
                                    onServiceClick(s.slug);
                                }
                            }}
                        >
                            <span className="sidebar-icon">{s.icon}</span>
                            <span className="sidebar-text">{s.title}</span>
                            {active && <span className="sidebar-active-dot" />}
                        </Link>
                    );
                })}
            </nav>

            {/* CTA box */}
            <div className="sidebar-cta">
                <Link href="/request-quote" className="sidebar-cta-btn">REQUEST A QUOTE</Link>
            </div>
        </aside>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
    const resolvedParams = use(params);
    const service = getServiceBySlug(resolvedParams.slug);
    if (!service) notFound();

    const contentRef = useRef<HTMLElement>(null);

    const scrollToContent = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleServiceClick = (slug: string) => {
        if (slug === resolvedParams.slug && window.innerWidth <= 960) {
            scrollToContent();
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= 960) {
                const timer = setTimeout(() => {
                    scrollToContent();
                }, 100);
                return () => clearTimeout(timer);
            } else {
                window.scrollTo({ top: 0 });
            }
        }
    }, [resolvedParams.slug]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&display=swap');

        :root {
          --navy:       #0b1120;
          --navy-mid:   #131e35;
          --navy-light: #1a2845;
          --gold:       #c9a84c;
          --gold-light: #e8c97a;
          --steel:      #8898aa;
          --white:      #f4f6f8;
        }

        .sd-page {
          background: var(--navy);
          color: var(--white);
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .sd-page::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px);
        }

        .sd-layout {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 56px 28px 96px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 960px)  { .sd-layout { grid-template-columns: 1fr; } .sidebar-wrap { order: -1; } }
        @media (max-width: 480px)  { .sd-layout { padding: 36px 16px 64px; } }

        /* ── MAIN CONTENT ── */
        .sd-content { min-width: 0; scroll-margin-top: 100px; }

        /* Breadcrumb */
        .sd-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 300; color: var(--steel);
          margin-bottom: 28px; flex-wrap: wrap;
        }
        .sd-breadcrumb a { color: var(--steel); text-decoration: none; transition: color 0.2s; }
        .sd-breadcrumb a:hover { color: var(--gold); }
        .sd-breadcrumb span { color: var(--gold); }

        /* Hero image */
        .sd-hero {
          position: relative; width: 100%; aspect-ratio: 16/7;
          border-radius: 8px; overflow: hidden; margin-bottom: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.2);
        }
        .sd-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sd-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(160deg, rgba(11,17,32,0.2) 0%, rgba(11,17,32,0.2) 100%);
        }
        .sd-hero-title {
          position: absolute; bottom: 28px; left: 28px; right: 28px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.8rem);
          letter-spacing: 3px; line-height: 1; color: var(--white); margin: 0;
        }
        .sd-hero-title span { color: var(--gold); }
        .sd-hero-icon {
          position: absolute; top: 20px; right: 20px;
          font-size: 2.2rem;
          background: rgba(11,17,32,0.7); border: 1px solid rgba(201,168,76,0.3);
          border-radius: 6px; padding: 8px 12px;
          backdrop-filter: blur(6px);
        }
        .sd-hero-corner {
          position: absolute; width: 36px; height: 36px; pointer-events: none;
        }
        .sd-hero-corner.tl { top: 0; left: 0; border-top: 2px solid var(--gold); border-left: 2px solid var(--gold); }
        .sd-hero-corner.br { bottom: 0; right: 0; border-bottom: 2px solid var(--gold); border-right: 2px solid var(--gold); }

        /* Gold bar */
        .gold-bar { width: 52px; height: 3px; background: linear-gradient(90deg,var(--gold),var(--gold-light)); border-radius: 2px; margin-bottom: 24px; }

        /* Body text */
        .sd-body {
          font-size: 1.02rem; font-weight: 300; line-height: 1.85;
          color: rgba(244,246,248,0.8); margin: 0 0 18px;
        }

        /* Divider */
        .sd-divider { border: none; border-top: 1px solid rgba(201,168,76,0.12); margin: 36px 0; }

        /* Staffing heading */
        .sd-staffing-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          letter-spacing: 2px; color: var(--white); margin: 0 0 6px;
        }
        .sd-staffing-heading span { color: var(--gold); }

        /* Bullet list */
        .sd-list {
          list-style: none; margin: 20px 0 28px; padding: 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .sd-list li {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 18px;
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 4px;
          font-size: 0.96rem; font-weight: 400;
          color: var(--white);
          transition: border-color 0.25s, transform 0.25s;
        }
        .sd-list li:hover { border-color: rgba(201,168,76,0.45); transform: translateX(4px); }
        .sd-list li::before { content: '▸'; color: var(--gold); font-size: 0.75rem; margin-top: 2px; flex-shrink: 0; }

        /* Section cards */
        .sd-section-card {
          background: var(--navy-mid);
          border-left: 3px solid var(--gold);
          border-radius: 0 6px 6px 0;
          padding: 24px 24px 20px;
          margin-bottom: 16px;
          transition: background 0.3s, transform 0.3s;
        }
        .sd-section-card:hover { background: rgba(201,168,76,0.05); transform: translateX(4px); }
        .sd-section-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem; letter-spacing: 1.5px;
          color: var(--gold); margin: 0 0 10px;
        }
        .sd-section-card p {
          font-size: 0.97rem; font-weight: 300;
          color: rgba(244,246,248,0.78); line-height: 1.8; margin: 0;
        }

        /* Closing callout */
        .sd-closing {
          background: linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02));
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 6px; padding: 24px 28px; margin-top: 36px;
          font-size: 1rem; font-weight: 300;
          color: rgba(244,246,248,0.82); line-height: 1.8;
        }

        /* ── SIDEBAR ── */
        .sidebar-wrap {
          position: sticky; top: 24px;
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 8px; overflow: hidden;
        }
        .sidebar-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.85rem; letter-spacing: 2.5px;
          color: var(--gold); padding: 16px 20px 12px;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          background: rgba(201,168,76,0.06);
        }
        .sidebar-nav { max-height: 480px; overflow-y: auto; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        .sidebar-link {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 18px; text-decoration: none;
          color: rgba(244,246,248,0.65); font-size: 0.88rem; font-weight: 300;
          border-bottom: 1px solid rgba(201,168,76,0.06);
          transition: background 0.2s, color 0.2s;
          position: relative;
        }
        .sidebar-link:hover { background: rgba(201,168,76,0.07); color: var(--white); }
        .sidebar-link--active { background: rgba(201,168,76,0.12); color: var(--gold) !important; font-weight: 500; }
        .sidebar-icon { font-size: 1rem; flex-shrink: 0; width: 22px; text-align: center; }
        .sidebar-text { flex: 1; line-height: 1.3; }
        .sidebar-active-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        /* Sidebar CTA */
        .sidebar-cta {
          padding: 20px; border-top: 1px solid rgba(201,168,76,0.15);
          background: rgba(201,168,76,0.05);
        }
        .sidebar-cta-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem; letter-spacing: 1.5px;
          color: var(--white); margin: 0 0 6px;
        }
        .sidebar-cta-body {
          font-size: 0.83rem; font-weight: 300;
          color: var(--steel); line-height: 1.6; margin: 0 0 14px;
        }
        .sidebar-cta-btn {
          display: block; text-align: center;
          background: #eab308; color: var(--navy);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem; letter-spacing: 2px;
          padding: 10px 18px; border-radius: 3px;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s;
        }
        .sidebar-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px); }

        /* Prev / Next nav */
        .sd-page-nav {
          display: flex; gap: 12px; margin-top: 44px; flex-wrap: wrap;
        }
        .sd-page-nav a {
          flex: 1; min-width: 140px;
          display: flex; flex-direction: column; gap: 4px;
          padding: 16px 20px;
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 6px; text-decoration: none;
          transition: border-color 0.25s, transform 0.25s;
        }
        .sd-page-nav a:hover { border-color: var(--gold); transform: translateY(-2px); }
        .sd-page-nav .nav-dir { font-size: 0.75rem; color: var(--steel); letter-spacing: 1px; text-transform: uppercase; }
        .sd-page-nav .nav-title { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; letter-spacing: 1.5px; color: var(--gold); }
      `}</style>

            <PageBanner title={service.title} />

            <div className="sd-page">
                <div className="sd-layout">

                    {/* ── SIDEBAR ────────────────────────────────── */}
                    <FadeIn delay={0.2} direction="left">
                        <ServicesSidebar currentSlug={service.slug} onServiceClick={handleServiceClick} />
                    </FadeIn>

                    {/* ── MAIN ───────────────────────────────────── */}
                    <main ref={contentRef} className="sd-content">

                        {/* Breadcrumb */}
                        <FadeIn delay={0}>
                            <div className="sd-breadcrumb">
                                <Link href="/">Home</Link>
                                <span>›</span>
                                <Link href="/services">Services</Link>
                                <span>›</span>
                                <span style={{ color: "#c9a84c" }}>{service.title}</span>
                            </div>
                        </FadeIn>

                        {/* Hero image */}
                        <FadeIn delay={0.05}>
                            <div className="sd-hero">
                                <img src={service.image} alt={service.title} />
                                <div className="sd-hero-overlay" />
                                <div className="sd-hero-corner tl" />
                                <div className="sd-hero-corner br" />
                                {/* <div className="sd-hero-icon">{service.icon}</div> */}
                                {/* <h1 className="sd-hero-title">{service.title}</h1> */}
                            </div>
                        </FadeIn>


                        {/* Intro paragraphs */}
                        <FadeIn delay={0.1}>
                            <div className="gold-bar" />
                            {service.intro.map((para: string, i: number) => (
                                <p key={i} className="sd-body">{para}</p>
                            ))}
                        </FadeIn>

                        {/* Staffing options */}
                        {service.staffingHeading && (
                            <>
                                <hr className="sd-divider" />
                                <FadeIn delay={0.05}>
                                    <h2 className="sd-staffing-heading">
                                        {service.staffingHeading.split("!")[0]}
                                        <span>!</span>
                                    </h2>
                                    <div className="gold-bar" />
                                    {service.staffingIntro && <p className="sd-body">{service.staffingIntro}</p>}
                                    {service.staffingOptions && (
                                        <ul className="sd-list">
                                            {service.staffingOptions.map((opt: string) => (
                                                <li key={opt}>{opt}</li>
                                            ))}
                                        </ul>
                                    )}
                                </FadeIn>
                            </>
                        )}

                        {/* Section cards */}
                        {service.sections && service.sections.length > 0 && (
                            <>
                                <hr className="sd-divider" />
                                {service.sections.map((sec: ServiceSection, i: number) => (
                                    <FadeIn key={sec.heading} delay={i * 0.07}>
                                        <div className="sd-section-card">
                                            <h3>{sec.heading}</h3>
                                            <p>{sec.body}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </>
                        )}

                        {/* Closing */}
                        {service.closing && (
                            <FadeIn delay={0.1}>
                                <div className="sd-closing">{service.closing}</div>
                            </FadeIn>
                        )}

                        {/* Prev / Next navigation */}
                        <PrevNextNav currentSlug={service.slug} />
                    </main>

                </div>
            </div>
        </>
    );
}

// ── Prev / Next ────────────────────────────────────────────────────────────
function PrevNextNav({ currentSlug }: { currentSlug: string }) {
    const idx = SERVICES.findIndex((s: ServiceData) => s.slug === currentSlug);
    const prev = idx > 0 ? SERVICES[idx - 1] : null;
    const next = idx < SERVICES.length - 1 ? SERVICES[idx + 1] : null;

    if (!prev && !next) return null;

    return (
        <FadeIn delay={0.1}>
            <div className="sd-page-nav">
                {prev ? (
                    <Link href={`/services/${prev.slug}`} scroll={false}>
                        <span className="nav-dir">← Previous</span>
                        <span className="nav-title">{prev.title}</span>
                    </Link>
                ) : <div />}
                {next && (
                    <Link href={`/services/${next.slug}`} style={{ textAlign: "right" }} scroll={false}>
                        <span className="nav-dir">Next →</span>
                        <span className="nav-title">{next.title}</span>
                    </Link>
                )}
            </div>
        </FadeIn>
    );
}