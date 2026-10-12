'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Professional Security Services',
    desc: 'Virginia Surveillance Force (VSF) provides licensed, insured, and bonded security services for residential, commercial, financial, and institutional properties throughout Virginia, Maryland, and Washington, DC.',
  },
  {
    title: 'Armed and Unarmed Security',
    desc: 'The company offers armed and unarmed security officers to meet different property protection requirements, client preferences, and operational needs.',
  },
  {
    title: '24/7 Security Coverage',
    desc: 'Security services are available 24/7/365 to help protect facilities, employees, visitors, and business assets.',
  },
  {
    title: 'Officer Training and Supervision',
    desc: 'VSF emphasizes personnel screening, professional training, field supervision, and management oversight to maintain accountability and consistent service standards.',
  },
  {
    title: 'Comprehensive Protection Solutions',
    desc: 'Services include vehicle patrol, access control, executive protection, concierge security, fire watch, alarm response, investigations, and specialized protective services.',
  },
  {
    title: 'Customized Security Plans',
    desc: 'Security staffing and protection strategies can be tailored to property size, risk exposure, industry requirements, and individual client expectations.',
  },
  {
    title: 'Industries Served',
    desc: 'The company supports residential communities, corporate offices, retail properties, warehouses, healthcare facilities, hotels, and financial institutions.',
  },
  {
    title: 'Client-Focused Security Management',
    desc: "Professional conduct, reliable personnel, responsive management, and effective communication support VSF's approach to protecting clients and their properties.",
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force, Inc. (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC; Manassas, Virginia',
  },
  {
    label: 'SECURITY SERVICES',
    value:
      'Armed Security; Unarmed Security; Vehicle Patrol; Access Control; Executive Protection; Concierge Security; Fire Watch; Alarm Response',
  },
  {
    label: 'INDUSTRIES SERVED',
    value:
      'Residential Communities; Commercial Properties; Financial Institutions; Corporate Offices; Retail Centers; Warehouses; Healthcare Facilities; Hotels',
  },
  {
    label: 'LICENSING AND CREDENTIALS',
    value:
      'Department of Criminal Justice Services PSS #11-2371; Metropolitan Police SOMB #SAB200504; Maryland State Police #106-3249',
  },
  {
    label: 'PERSONNEL STANDARDS',
    value:
      'Officer Screening; Professional Training; Field Supervision; Management Oversight; Accountability',
  },
  {
    label: 'SERVICE AVAILABILITY',
    value: '24/7/365 Security Coverage; Customized Security Plans; Ongoing Security Support',
  },
  {
    label: 'SECURITY OBJECTIVES',
    value:
      'Property Protection; Asset Protection; Risk Mitigation; Access Management; Personnel and Visitor Safety',
  },
  {
    label: 'CLIENT REQUIREMENTS',
    value:
      'Residential Security; Commercial Security; Financial Property Security; Institutional Security; Site-Specific Protection',
  },
];

export default function FaqSemanticKeynotes() {
  // Kept closed by default
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section 
      aria-label="Semantic Keynotes & NER Tags" 
      className="bg-[#0b1120] py-8 sm:py-12 border-t border-white/10 relative z-10 w-full"
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
                  <ul className="space-y-3 sm:space-y-3.5 list-none p-0 m-0">
                    {keynotes.map((item, idx) => (
                      <li key={idx} className="text-sm sm:text-[15px] leading-relaxed text-slate-300 font-sans flex items-start gap-2.5">
                        <span className="text-slate-400 select-none leading-normal">&bull;</span>
                        <div>
                          <strong className="text-white font-semibold">{item.title}:</strong>
                          {' '}
                          <span>{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 2. NER TAGS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#eab308] font-bold text-xs sm:text-sm uppercase tracking-wider">
                  <span className="text-base select-none">🎯</span>
                  <span>(NER) TAGS</span>
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
