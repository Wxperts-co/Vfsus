'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Professional Security & Protective Services',
    desc: 'Virginia Surveillance Force, Inc. (VSF) provides customized security and protective services to businesses, organizations, and communities throughout Virginia, Maryland, and Washington, DC.',
  },
  {
    title: '24/7 Security Operations',
    desc: 'The company emphasizes round-the-clock security coverage, rapid response, and continuous protection for people, properties, assets, and business operations.',
  },
  {
    title: 'Armed & Unarmed Security Officers',
    desc: 'VSF offers armed and unarmed security personnel to help deter threats, maintain a visible security presence, control access, and safeguard client locations.',
  },
  {
    title: 'Mobile Patrol & Specialized Protection',
    desc: 'Services include vehicle patrol, Special Police, Virginia Special Conservators of the Peace (SCOPs), fire watch, alarm response, executive protection, bodyguard services, investigations, and secure legal and medical courier services.',
  },
  {
    title: 'Corporate, Residential & Industrial Security',
    desc: 'The company serves corporate offices, residential communities, HOAs, gated communities, warehouses, industrial facilities, shopping centers, hotels, and retail properties.',
  },
  {
    title: 'Healthcare, Government & Diplomatic Security',
    desc: 'VSF provides security solutions for hospitals, healthcare facilities, government buildings, diplomatic locations, schools, and other environments requiring professional protection.',
  },
  {
    title: 'Licensed Personnel & Professional Management',
    desc: 'The company highlights trained, licensed, and background-verified officers, professional supervision, accountability, security management, and technology-supported protection.',
  },
  {
    title: 'Established Security Experience & Client Trust',
    desc: 'Founded in 1987 according to the website, VSF emphasizes long-term client relationships, dependable service, risk reduction, and peace of mind. The homepage reports 700+ certified and trained officers, 850+ clients protected, a 98% client retention rate, and 2,500+ completed security assignments.',
  },
];

const nerTags = [
  { label: 'ORGANISATION', value: 'Virginia Surveillance Force, Inc. (VSF)' },
  {
    label: 'BUSINESS TYPE',
    value: 'Private Security Company / Security Contractor / Protective Services Provider',
  },
  { label: 'LOCATION', value: 'Manassas, Virginia, USA' },
  { label: 'SERVICE AREA', value: 'Virginia / Maryland / Washington, DC' },
  {
    label: 'PRIMARY SERVICES',
    value:
      'Armed & Unarmed Security / Vehicle Patrol / Corporate Security / Residential Security / Concierge Services / Fire Watch / Alarm Response',
  },
  {
    label: 'SPECIALIZED SERVICES',
    value:
      'Special Police / Special Conservators of the Peace (SCOPs) / Executive Protection / Bodyguard Services / Investigations / Legal & Medical Courier',
  },
  {
    label: 'INDUSTRIES SERVED',
    value:
      'Government & Diplomatic Facilities / Healthcare / Corporate Offices / Hotels & Resorts / Warehouses / Industrial Facilities / Retail & Shopping Centers / Residential Communities',
  },
  {
    label: 'LICENSING & CONTACT',
    value: (
      <span>
        Virginia DCJS PSS #11-2371 / Metropolitan Police SOMB #SAB200504 / Maryland State Police #106-3249 / D-U-N-S #06-249-7602 /{' '}
        <a href="tel:7036316559" className="text-[#eab308] hover:underline">
          (703) 631-6559
        </a>{' '}
        /{' '}
        <a href="mailto:info@vsfus.com" className="text-[#eab308] hover:underline">
          info@vsfus.com
        </a>
      </span>
    ),
  },
];

export default function SemanticKeynotesSection() {
  // Kept closed by default as instructed
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
