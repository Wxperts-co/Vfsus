'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Nationwide Security Coverage',
    desc: 'American Surveillance Force (ASF) provides centralized security services for organizations managing facilities across multiple states in the United States.',
  },
  {
    title: 'Centralized Security Management',
    desc: 'A single point of contact helps simplify communication, coordination, reporting, and security oversight across multiple locations.',
  },
  {
    title: 'Consistent Security Standards',
    desc: 'Site-specific security procedures help maintain consistent service quality while addressing the unique requirements of each facility.',
  },
  {
    title: 'Customized Protection Plans',
    desc: 'Security strategies can be tailored to individual properties, operational risks, industry requirements, and client expectations.',
  },
  {
    title: 'Multi-Location Coordination',
    desc: 'Centralized management supports organizations seeking to coordinate security personnel, operational procedures, and service requirements across different sites.',
  },
  {
    title: 'Regulatory Compliance',
    desc: 'Security operations can be structured around applicable legal requirements, licensing obligations, and site-specific compliance needs.',
  },
  {
    title: 'Accountability and Supervision',
    desc: 'Professional oversight and consistent reporting help organizations monitor security performance and maintain responsibility across locations.',
  },
  {
    title: 'Business and Asset Protection',
    desc: 'Nationwide security solutions help protect facilities, employees, visitors, equipment, and other business assets across geographically distributed operations.',
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'American Surveillance Force (ASF); Virginia Surveillance Force (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'United States; Virginia; Maryland; Washington, DC; Manassas, Virginia',
  },
  {
    label: 'SECURITY SERVICES',
    value:
      'Nationwide Security Services; Permanent Security Assignments; Multi-State Security Management; Commercial Security',
  },
  {
    label: 'CENTRALIZED MANAGEMENT',
    value:
      'Single Point of Contact; Centralized Security Coordination; Unified Reporting; Centralized Billing; Operational Oversight',
  },
  {
    label: 'SECURITY OPERATIONS',
    value:
      'Security Staffing; Site-Specific Procedures; Post Orders; Personnel Screening; Vetting and Training',
  },
  {
    label: 'COMPLIANCE AND LICENSING',
    value:
      'State-Specific Security Licensing; Regulatory Compliance; Security Standards; Quality Assurance',
  },
  {
    label: 'CLIENT TYPES',
    value:
      'Multi-Location Businesses; National Organizations; Commercial Facilities; Organizations Operating Across Multiple States',
  },
  {
    label: 'CORE BENEFITS',
    value:
      'Consistent Security Standards; Accountability; Simplified Security Management; Risk Mitigation; Reliable Protection',
  },
  {
    label: 'BUSINESS HISTORY',
    value:
      'Virginia Surveillance Force established in 1987; American Surveillance Force provides nationwide security services through its affiliated company structure.',
  },
  {
    label: 'BUSINESS ADDRESS',
    value: '7544 Diplomat Drive, Suite 101, Manassas, Virginia 20109',
  },
  {
    label: 'CONTACT INFORMATION',
    value: (
      <span>
        <a href="tel:7036316559" className="text-[#eab308] hover:underline font-semibold">
          703-631-6559
        </a>
        {'; '}
        <a href="mailto:info@vsfus.com" className="text-[#eab308] hover:underline font-semibold">
          info@vsfus.com
        </a>
      </span>
    ),
  },
];

export default function NationwideSemanticKeynotes() {
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
                  <span>NAMED ENTITY RECOGNITION (NER) TAGS</span>
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
