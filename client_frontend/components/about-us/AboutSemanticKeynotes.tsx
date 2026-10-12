'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Integrity-Driven Security Philosophy',
    desc: 'Virginia Surveillance Force, Inc. (VSF) builds its security approach around honesty, fairness, ethical decision-making, and accountability, emphasizing that security standards should not be compromised to maximize profits.',
  },
  {
    title: 'Customized Client Security Planning',
    desc: "The company takes time to understand each client's objectives, property requirements, operating environment, and potential risks before developing an appropriate security solution.",
  },
  {
    title: 'Long-Term Client Relationships',
    desc: 'VSF emphasizes trust, repeat business, long-term contracts, referrals, and dependable partnerships as indicators of its commitment to consistent service quality.',
  },
  {
    title: 'Academy-Certified Officer Training',
    desc: 'The company states that its staff and officers receive training through security training academies to prepare them for the responsibilities and challenges of their assignments.',
  },
  {
    title: 'Emergency Assessment & Incident Management',
    desc: 'Training covers assessing incidents, responding to fires and break-ins, handling medical emergencies, managing drug- and alcohol-related situations, documenting incidents, and contacting appropriate authorities when necessary.',
  },
  {
    title: 'Professional Conduct & Accountability',
    desc: 'VSF emphasizes respectful treatment of clients, vendors, employees, and the public, supported by professional standards, responsible conduct, and detailed incident reporting.',
  },
  {
    title: 'Quality Standards & Reasonable Pricing',
    desc: "The company's stated commitments combine premium service standards with fair pricing and practical security arrangements designed around individual client needs and budgets.",
  },
  {
    title: 'Confidence, Safety & Peace of Mind',
    desc: "VSF's About Us philosophy extends beyond supplying security personnel: its stated goal is to help clients feel confident that their people, property, and responsibilities are being handled professionally.",
  },
];

const nerTags = [
  { label: 'ORGANISATION', value: 'Virginia Surveillance Force, Inc. (VSF)' },
  {
    label: 'BUSINESS HISTORY',
    value: "Established in 1987, according to the company's published website.",
  },
  {
    label: 'CORE VALUES',
    value: 'Integrity / Honesty / Fairness / Ethics / Accountability / Client Trust',
  },
  {
    label: 'TRAINING STANDARD',
    value:
      'Academy-Certified Security Training / Assignment-Specific Preparation / Continuing Professional Development',
  },
  {
    label: 'INCIDENT MANAGEMENT',
    value:
      'Emergency Assessment / Fire & Break-In Response / Medical Emergencies / Incident Reporting / Authority Escalation',
  },
  {
    label: 'CLIENT RELATIONSHIPS',
    value: 'Repeat Business / Long-Term Contracts / Referrals / Customized Security Planning',
  },
  {
    label: 'SERVICE STANDARDS',
    value: 'Professional Conduct / Quality Assurance / Reasonable Rates / Responsible Security Practices',
  },
  {
    label: 'BUSINESS LOCATION & CONTACT',
    value: (
      <span>
        7544 Diplomat Dr #101, Manassas, VA 20109 /{' '}
        <a href="tel:7036316559" className="text-[#eab308] hover:underline font-semibold">
          (703) 631-6559
        </a>{' '}
        /{' '}
        <a href="mailto:info@vsfus.com" className="text-[#eab308] hover:underline font-semibold">
          info@vsfus.com
        </a>
      </span>
    ),
  },
];

export default function AboutSemanticKeynotes() {
  // By default closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section 
      aria-label="Semantic Keynotes & NER Tags" 
      className="bg-[#0b1120] py-8 sm:py-12 border-t border-white/10 relative z-10"
    >
      <div className="container max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="bg-[#131e35]/85 border border-white/10 hover:border-yellow-500/30 rounded-2xl shadow-xl transition-all duration-300 overflow-hidden">
          
          {/* Collapsible Accordion Header */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 bg-[#131e35] hover:bg-[#182643] transition-colors duration-200 cursor-pointer select-none"
          >
            <div className="flex items-center gap-3">
              <span 
                className="text-[#eab308] text-sm sm:text-base font-bold select-none inline-block transition-transform duration-200"
                aria-hidden="true"
              >
                {isOpen ? '▼' : '▶'}
              </span>

              <span className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide font-sans">
                Semantic Keynotes &amp; Named Entity Recognition (NER) Tags
              </span>
            </div>

            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
              {isOpen ? 'Hide' : 'Show'}
            </span>
          </button>

          {/* Accordion Content Panel */}
          {isOpen && (
            <div className="p-5 sm:p-7 md:p-8 space-y-7 border-t border-white/10 bg-[#0d1627]/60">
              
              {/* 1. SEMANTIC KEYNOTES */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#eab308] font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <span className="text-base select-none">🏷️</span>
                  <span>SEMANTIC KEYNOTES</span>
                </div>

                <div className="bg-[#0b1120]/80 border border-white/10 rounded-xl p-5 sm:p-6">
                  <ol className="space-y-3.5 sm:space-y-4 list-none p-0 m-0">
                    {keynotes.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-[15px] leading-relaxed text-slate-300 font-sans">
                        <span className="text-slate-400 font-medium mr-2">{idx + 1}.</span>
                        <strong className="text-white font-semibold">{item.title}</strong>
                        {' '}&ndash;{' '}
                        <span>{item.desc}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* 2. NER TAGS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#eab308] font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <span className="text-base select-none">🎯</span>
                  <span>NER TAGS</span>
                </div>

                <div className="bg-[#0b1120]/80 border border-white/10 rounded-xl p-5 sm:p-6">
                  <ul className="space-y-3 sm:space-y-3.5 list-none p-0 m-0">
                    {nerTags.map((tag, idx) => (
                      <li key={idx} className="text-sm sm:text-[15px] leading-relaxed text-slate-300 font-sans flex items-start gap-2.5">
                        <span className="text-slate-400 select-none leading-normal">&bull;</span>
                        <div>
                          <strong className="text-white font-bold uppercase tracking-wide mr-1.5">
                            {tag.label}:
                          </strong>
                          <span className="text-slate-300">{tag.value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
