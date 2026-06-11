"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/common-components/innerbanner";
import MENU_LIST_ITEMS, { getMenuItemBySlug, MenuListItem, FAQListItem, ResourceArticle, MenuSection } from "@/data/MenuList";
import { 
  ChevronDown, 
  ChevronRight, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  HelpCircle,
  BookOpen,
  ArrowRight
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

interface MenuSidebarProps {
  currentSlug: string;
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

// ── Sidebar Navigation ──────────────────────────────────────────────────────
function MenuSidebar({ currentSlug }: MenuSidebarProps) {
  return (
    <aside className="sidebar-wrap">
      <div className="sidebar-label">Menu List Tabs</div>
      <nav className="sidebar-nav">
        {MENU_LIST_ITEMS.map((item: MenuListItem) => {
          const active = item.slug === currentSlug;
          return (
            <Link
              key={item.slug}
              href={`/menu/${item.slug}`}
              className={`sidebar-link ${active ? "sidebar-link--active" : ""}`}
              scroll={false}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-text">{item.title}</span>
              {active && <span className="sidebar-active-dot" />}
            </Link>
          );
        })}
      </nav>
      {/* CTA Box */}
      <div className="sidebar-cta">
        <Link href="/request-quote" className="sidebar-cta-btn">
          REQUEST A QUOTE
        </Link>
      </div>
    </aside>
  );
}

// ── Document Mockups Component (For missing files) ───────────────────────────
function DocumentMockupsGrid() {
  const documents = [
    {
      title: "Liability Insurance Certificate",
      desc: "Commercial General Liability coverage protecting clients up to millions.",
      tag: "ACTIVE & VERIFIED",
      icon: <ShieldCheck className="doc-icon text-[#c9a84c] w-10 h-10" />
    },
    {
      title: "Virginia DCJS Licensing",
      desc: "Fully registered and compliant private security services contractor license.",
      tag: "DCJS REG #11-4122",
      icon: <FileCheck className="doc-icon text-[#c9a84c] w-10 h-10" />
    },
    {
      title: "Maryland State Security License",
      desc: "Licensed and authorized to provide armed and unarmed security guards in Maryland.",
      tag: "MD LICENSED",
      icon: <FileCheck className="doc-icon text-[#c9a84c] w-10 h-10" />
    },
    {
      title: "Employee Dishonesty Bond",
      desc: "Fidelity bond protection guaranteeing ultimate integrity and peace of mind.",
      tag: "FULLY BONDED",
      icon: <ShieldCheck className="doc-icon text-[#c9a84c] w-10 h-10" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {documents.map((doc, idx) => (
        <div key={idx} className="doc-mockup-card">
          <div className="flex items-start gap-4">
            <div className="doc-icon-container">{doc.icon}</div>
            <div className="flex-1">
              <span className="doc-tag">{doc.tag}</span>
              <h4 className="doc-title">{doc.title}</h4>
              <p className="doc-desc">{doc.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Client Logo Gallery ───────────────────────────────────────────────────────
function ClientGalleryGrid() {
  // Loop client images client-1.jpg to client-16.jpg
  const clientIndices = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {clientIndices.map((idx) => (
        <div key={idx} className="client-logo-card">
          <img 
            src={`/images/client-${idx}.jpg`} 
            alt={`VSF Valued Client ${idx}`} 
            className="client-logo-img"
          />
        </div>
      ))}
    </div>
  );
}

// ── Dynamic Menu Page ─────────────────────────────────────────────────────────
export default function MenuDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const menuItem = getMenuItemBySlug(resolvedParams.slug);
  if (!menuItem) notFound();

  // Accordion active state trackers
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const contentRef = useRef<HTMLElement>(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap');

        :root {
          --navy:       #0b1120;
          --navy-mid:   #131e35;
          --navy-light: #1a2845;
          --gold:       #c9a84c;
          --gold-light: #e8c97a;
          --steel:      #8898aa;
          --white:      #f4f6f8;
        }

        .menu-page {
          background: var(--navy);
          color: var(--white);
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .menu-page::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px);
        }

        .menu-layout {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 56px 28px 96px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 960px)  { .menu-layout { grid-template-columns: 1fr; } .sidebar-wrap { order: -1; } }
        @media (max-width: 480px)  { .menu-layout { padding: 36px 16px 64px; } }

        /* ── MAIN CONTENT ── */
        .menu-content { min-width: 0; scroll-margin-top: 100px; }

        /* Breadcrumb */
        .menu-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 300; color: var(--steel);
          margin-bottom: 28px; flex-wrap: wrap;
        }
        .menu-breadcrumb a { color: var(--steel); text-decoration: none; transition: color 0.2s; }
        .menu-breadcrumb a:hover { color: var(--gold); }
        .menu-breadcrumb span { color: #eab308; }

        /* Gold bar */
        .gold-bar { width: 52px; height: 3px; background: linear-gradient(90deg,#eab308,#eab308); border-radius: 2px; margin-bottom: 24px; }

        /* Body text */
        .menu-body {
          font-size: 1.05rem; font-weight: 300; line-height: 1.85;
          color: rgba(244,246,248,0.85); margin: 0 0 18px;
        }
        .menu-body strong {
          color: var(--gold-light);
          font-weight: 500;
        }

        /* Divider */
        .menu-divider { border: none; border-top: 1px solid rgba(201,168,76,0.12); margin: 36px 0; }

        /* Standard Section Card */
        .menu-section-card {
          background: var(--navy-mid);
          border-left: 3px solid #eab308;
          border-radius: 0 6px 6px 0;
          padding: 24px 24px 20px;
          margin-bottom: 20px;
          transition: background 0.3s, transform 0.3s, border-color 0.3s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .menu-section-card:hover { 
          background: rgba(201,168,76,0.04); 
          transform: translateX(4px);
          border-left-color: var(--gold-light);
        }
        .menu-section-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem; letter-spacing: 1.5px;
          color: #eab308; margin: 0 0 12px;
        }
        .menu-section-card p {
          font-size: 0.98rem; font-weight: 300;
          color: rgba(244,246,248,0.8); line-height: 1.8; margin: 0 0 12px;
        }
        .menu-section-card p:last-child { margin-bottom: 0; }

        /* Interactive Accordions */
        .accordion-item {
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 6px;
          margin-bottom: 12px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .accordion-item:hover {
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
        }
        .accordion-item--active {
          border-color: var(--gold);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .accordion-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          background: none;
          border: none;
          color: var(--white);
          font-size: 1.05rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: color 0.2s;
        }
        .accordion-btn:hover {
          color: var(--gold-light);
        }
        .accordion-btn--active {
          color: var(--gold);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .accordion-icon {
          color: var(--gold);
          transition: transform 0.25s ease;
          flex-shrink: 0;
          margin-left: 10px;
        }
        .accordion-icon--active {
          transform: rotate(180deg);
        }
        .accordion-content {
          padding: 24px;
          background: rgba(11, 17, 32, 0.4);
          animation: slideDown 0.3s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Lists */
        .bullet-list {
          list-style: none; margin: 16px 0; padding: 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .bullet-list li {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.95rem; font-weight: 300;
          color: rgba(244,246,248,0.8);
          line-height: 1.6;
        }
        .bullet-list li::before {
          content: '▸'; color: var(--gold); font-size: 0.75rem; margin-top: 3px; flex-shrink: 0;
        }

        /* Document Mockups */
        .doc-mockup-card {
          background: rgba(19, 30, 53, 0.6);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 6px;
          padding: 18px;
          transition: transform 0.2s, border-color 0.2s;
        }
        .doc-mockup-card:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
        }
        .doc-icon-container {
          background: rgba(201, 168, 76, 0.1);
          padding: 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .doc-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 1.2px;
          color: var(--gold);
          display: inline-block;
          margin-bottom: 4px;
          background: rgba(201, 168, 76, 0.1);
          padding: 2px 6px;
          border-radius: 3px;
        }
        .doc-title {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--white);
          margin: 0 0 6px;
        }
        .doc-desc {
          font-size: 0.85rem;
          font-weight: 300;
          color: var(--steel);
          line-height: 1.5;
          margin: 0;
        }

        /* Client Logos */
        .client-logo-card {
          background: #fff;
          padding: 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70px;
          border: 1px solid rgba(201,168,76,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .client-logo-card:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 15px rgba(201,168,76,0.2);
        }
        .client-logo-img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }

        /* Employment Apply Section */
        .apply-cta-box {
          background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.03));
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px;
          padding: 28px;
          margin-top: 24px;
          text-align: center;
        }
        .apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eab308;
          color: var(--navy);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 1.5px;
          padding: 12px 28px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.2s, transform 0.2s;
          box-shadow: 0 4px 15px rgba(234,179,8,0.2);
          cursor: pointer;
        }
        .apply-btn:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
        }

        /* ── SIDEBAR ── */
        .sidebar-wrap {
          position: sticky; top: 120px;
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 8px; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .sidebar-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.9rem; letter-spacing: 2.5px;
          color: #eab308; padding: 18px 20px 14px;
          border-bottom: 1px solid rgba(201,168,76,0.12);
          background: rgba(201,168,76,0.05);
        }
        .sidebar-nav { max-height: 480px; overflow-y: auto; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
        .sidebar-link {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px; text-decoration: none;
          color: rgba(244,246,248,0.65); font-size: 0.92rem; font-weight: 300;
          border-bottom: 1px solid rgba(201,168,76,0.05);
          transition: background 0.2s, color 0.2s;
          position: relative;
        }
        .sidebar-link:hover { background: rgba(201,168,76,0.06); color: var(--white); }
        .sidebar-link--active { background: rgba(201,168,76,0.12); color: #eab308 !important; font-weight: 500; }
        .sidebar-icon { font-size: 1.1rem; flex-shrink: 0; width: 22px; text-align: center; }
        .sidebar-text { flex: 1; line-height: 1.3; }
        .sidebar-active-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        /* Sidebar CTA */
        .sidebar-cta {
          padding: 20px; border-top: 1px solid rgba(201,168,76,0.15);
          background: rgba(201,168,76,0.03);
        }
        .sidebar-cta-btn {
          display: block; text-align: center;
          background: #eab308; color: var(--navy);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.25rem; letter-spacing: 2px;
          padding: 11px 18px; border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          transition: background 0.25s, transform 0.2s;
        }
        .sidebar-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px); }

        /* Prev / Next nav */
        .menu-page-nav {
          display: flex; gap: 12px; margin-top: 44px; flex-wrap: wrap;
        }
        .menu-page-nav a {
          flex: 1; min-width: 140px;
          display: flex; flex-direction: column; gap: 4px;
          padding: 16px 20px;
          background: var(--navy-mid);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 6px; text-decoration: none;
          transition: border-color 0.25s, transform 0.25s;
        }
        .menu-page-nav a:hover { border-color: var(--gold); transform: translateY(-2px); }
        .menu-page-nav .nav-dir { font-size: 0.75rem; color: var(--steel); letter-spacing: 1px; text-transform: uppercase; }
        .menu-page-nav .nav-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.05rem; letter-spacing: 1.5px; color: var(--gold); }
      `}</style>

      <PageBanner title={menuItem.title} breadcrumb="Menu" />

      <div className="menu-page">
        <div className="menu-layout">

          {/* ── SIDEBAR ────────────────────────────────── */}
          <FadeIn delay={0.15} direction="left">
            <MenuSidebar currentSlug={menuItem.slug} />
          </FadeIn>

          {/* ── MAIN CONTENT ───────────────────────────── */}
          <main ref={contentRef} className="menu-content">

            {/* Breadcrumb */}
            <FadeIn delay={0}>
              <div className="menu-breadcrumb">
                <Link href="/">Home</Link>
                <span>›</span>
                <span>Menu List</span>
                <span>›</span>
                <span style={{ color: "#c9a84c" }}>{menuItem.title}</span>
              </div>
            </FadeIn>

            {/* Intro paragraph */}
            <FadeIn delay={0.05}>
              <div className="gold-bar" />
              {menuItem.intro.map((para: string, idx: number) => (
                <p key={idx} className="menu-body">{para}</p>
              ))}
            </FadeIn>

            {/* Render Section Standard Layout */}
            {menuItem.type === "standard" && menuItem.sections && (
              <div className="mt-8">
                {menuItem.sections.map((section: MenuSection, idx: number) => (
                  <FadeIn key={idx} delay={idx * 0.08}>
                    <div className="menu-section-card">
                      <h3>{section.title}</h3>
                      {Array.isArray(section.body) ? (
                        section.body.map((pText: string, pIdx: number) => (
                          <p key={pIdx}>{pText}</p>
                        ))
                      ) : (
                        <p>{section.body}</p>
                      )}
                    </div>
                  </FadeIn>
                ))}

                {/* Additional apply card for Employment */}
                {menuItem.slug === "employment" && (
                  <FadeIn delay={0.25}>
                    <div className="apply-cta-box">
                      <p className="menu-body">
                        Start your security career journey with VSF today. Fill out our online application secure form.
                      </p>
                      <a 
                        href="https://jetsign.com/f/u3s6PFUR" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="apply-btn"
                      >
                        Employment Application <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </FadeIn>
                )}
              </div>
            )}

            {/* Render FAQ Layout */}
            {menuItem.type === "faq" && menuItem.faqItems && (
              <div className="mt-8">
                {menuItem.faqItems.map((faq: FAQListItem, idx: number) => {
                  const isOpen = openAccordionId === faq.id;
                  return (
                    <FadeIn key={faq.id} delay={idx * 0.05}>
                      <div className={`accordion-item ${isOpen ? "accordion-item--active" : ""}`}>
                        <button 
                          onClick={() => toggleAccordion(faq.id)} 
                          className={`accordion-btn ${isOpen ? "accordion-btn--active" : ""}`}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                            {faq.question}
                          </span>
                          <ChevronDown className={`accordion-icon ${isOpen ? "accordion-icon--active" : ""}`} size={18} />
                        </button>
                        {isOpen && (
                          <div className="accordion-content">
                            {faq.answer.map((para: string, pIdx: number) => (
                              <p key={pIdx} className="menu-body" style={{ fontSize: "0.96rem" }}>{para}</p>
                            ))}

                            {/* Bullet points if any */}
                            {faq.bullets && (
                              <ul className="bullet-list">
                                {faq.bullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx}>{bullet}</li>
                                ))}
                              </ul>
                            )}

                            {/* Images (Documents) Grid if any */}
                            {faq.images && <DocumentMockupsGrid />}

                            {/* Client Logos Gallery if any */}
                            {faq.clientLogos && <ClientGalleryGrid />}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            )}

            {/* Render Resource Library Layout */}
            {menuItem.type === "resource" && menuItem.resourceItems && (
              <div className="mt-8">
                {menuItem.resourceItems.map((art: ResourceArticle, idx: number) => {
                  const isOpen = openAccordionId === art.id;
                  return (
                    <FadeIn key={art.id} delay={idx * 0.08}>
                      <div className={`accordion-item ${isOpen ? "accordion-item--active" : ""}`}>
                        <button 
                          onClick={() => toggleAccordion(art.id)} 
                          className={`accordion-btn ${isOpen ? "accordion-btn--active" : ""}`}
                          aria-expanded={isOpen}
                        >
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                            {art.title}
                          </span>
                          <ChevronDown className={`accordion-icon ${isOpen ? "accordion-icon--active" : ""}`} size={18} />
                        </button>
                        {isOpen && (
                          <div className="accordion-content">
                            {art.body.map((para: string, pIdx: number) => (
                              <p key={pIdx} className="menu-body" style={{ fontSize: "0.96rem" }}>{para}</p>
                            ))}

                            {/* Bullet points if any */}
                            {art.bullets && (
                              <ul className="bullet-list">
                                {art.bullets.map((bullet: string, bIdx: number) => (
                                  <li key={bIdx}>{bullet}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            )}

            {/* Prev / Next tab navigation */}
            <PrevNextMenuNav currentSlug={menuItem.slug} />

          </main>

        </div>
      </div>
    </>
  );
}

// ── Prev / Next Navigation Helper ──────────────────────────────────────────
function PrevNextMenuNav({ currentSlug }: { currentSlug: string }) {
  const idx = MENU_LIST_ITEMS.findIndex((item) => item.slug === currentSlug);
  const prev = idx > 0 ? MENU_LIST_ITEMS[idx - 1] : null;
  const next = idx < MENU_LIST_ITEMS.length - 1 ? MENU_LIST_ITEMS[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <FadeIn delay={0.1}>
      <div className="menu-page-nav">
        {prev ? (
          <Link href={`/menu/${prev.slug}`} scroll={false}>
            <span className="nav-dir">← Previous Tab</span>
            <span className="nav-title">{prev.title}</span>
          </Link>
        ) : <div />}
        {next && (
          <Link href={`/menu/${next.slug}`} style={{ textAlign: "right" }} scroll={false}>
            <span className="nav-dir">Next Tab →</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </FadeIn>
  );
}
