'use client';

import React, { useState } from 'react';

const keynotes = [
  'Virginia Surveillance Force (VSF) provides security services for residential, commercial, and financial properties throughout Virginia, Maryland, and Washington, DC.',
  'Client testimonials highlight the professionalism, responsiveness, and reliability of VSF security personnel.',
  'The company offers armed and unarmed security guard services tailored to different property types and client requirements.',
  'Security solutions focus on site protection, risk mitigation, property safety, and dependable security coverage.',
  'Customer feedback reflects the importance of trained security officers, effective communication, and consistent service delivery.',
  'VSF serves businesses, property managers, residential communities, and financial facilities seeking professional security support.',
  'The testimonials page helps prospective clients evaluate service quality and customer experiences before choosing a security provider.',
  'The company has a long history in the security industry; verify the specific founding year against the official company information before publishing.',
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC',
  },
  {
    label: 'SECURITY SERVICES',
    value:
      'Armed Security Guards; Unarmed Security Guards; Commercial Security; Residential Security; Financial Property Security',
  },
  {
    label: 'SECURITY OBJECTIVES',
    value: 'Risk Mitigation; Site Protection; Property Safety; Threat Prevention',
  },
  {
    label: 'SERVICE QUALITIES',
    value:
      'Professionalism; Responsiveness; Reliability; Trained Security Personnel; Customer Satisfaction',
  },
  {
    label: 'TARGET CLIENTS',
    value:
      'Residential Property Owners; Commercial Businesses; Property Managers; Financial Institutions',
  },
  {
    label: 'PAGE TYPE',
    value: 'Client Testimonials; Customer Reviews; Security Service Feedback',
  },
  {
    label: 'INDUSTRY',
    value: 'Private Security; Protective Services; Security Guard Services',
  },
];

export default function TestimonialsSemanticKeynotes() {
  // Kept closed by default
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
