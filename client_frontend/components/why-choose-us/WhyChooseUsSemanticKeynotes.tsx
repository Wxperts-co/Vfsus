'use client';

import React, { useState } from 'react';

const keynotes = [
  'Virginia Surveillance Force helps businesses, organizations, and communities choose professional security solutions tailored to their properties, operational requirements, and safety concerns.',
  'The company provides customized security strategies designed to protect people, property, business assets, and daily operations.',
  'VSF emphasizes experienced security professionals, trained officers, professional supervision, and dependable security management.',
  'Security services include armed and unarmed security, vehicle patrol, executive protection, concierge security, fire watch, and specialized protective services.',
  'The company supports diverse sectors, including government and diplomatic facilities, corporate offices, healthcare facilities, hotels, warehouses, retail properties, and residential communities.',
  'Virginia Surveillance Force prioritizes professionalism, integrity, accountability, communication, and responsive client support.',
  'With security services available 24/7/365, VSF helps clients maintain a visible security presence, deter potential threats, and reduce operational risks.',
  'Established in 1987, the company serves clients throughout Virginia, Maryland, and Washington, DC, providing security solutions based on individual client needs.',
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
      'Armed Security; Unarmed Security; Vehicle Patrol; Executive Protection; Concierge Security; Fire Watch; Investigative Services',
  },
  {
    label: 'INDUSTRIES SERVED',
    value:
      'Government and Diplomatic Facilities; Corporate Offices; Healthcare Facilities; Hotels and Resorts; Warehouses and Industrial Facilities; Retail Properties; Residential Communities',
  },
  {
    label: 'CORE BENEFITS',
    value:
      'Customized Security Strategies; Risk Reduction; Property Protection; Threat Deterrence; Personnel Safety',
  },
  {
    label: 'SERVICE QUALITIES',
    value:
      'Professionalism; Integrity; Accountability; Responsive Client Support; Experienced Security Personnel; Professional Supervision',
  },
  {
    label: 'SERVICE AVAILABILITY',
    value: '24/7/365 Security Coverage; Customized Protection Plans',
  },
  {
    label: 'BUSINESS HISTORY',
    value: 'Established in 1987',
  },
  {
    label: 'REGISTRATION IDENTIFIERS',
    value:
      'Department of Criminal Justice Services PSS #11-2371; Metropolitan Police SOMB #SAB200504; Maryland State Police #106-3249',
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

export default function WhyChooseUsSemanticKeynotes() {
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
                        <span>{item}</span>
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
