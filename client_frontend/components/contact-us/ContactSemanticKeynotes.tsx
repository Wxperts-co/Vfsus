'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Professional Security Services',
    desc: 'Virginia Surveillance Force provides security guard and protective services for businesses, residential communities, and institutions throughout Virginia, Maryland, and Washington, DC.',
  },
  {
    title: 'Regional Office Locations',
    desc: 'Clients can contact the company through its regional offices in Manassas, Virginia; Rockville, Maryland; and Washington, DC, for security-related inquiries.',
  },
  {
    title: 'Customized Security Solutions',
    desc: 'The company helps clients identify security services suited to their facility requirements, property characteristics, operational risks, and protection goals.',
  },
  {
    title: 'Phone and Online Inquiries',
    desc: 'Prospective and existing clients can use available telephone contacts or the online inquiry form to communicate their security needs.',
  },
  {
    title: 'Commercial and Residential Protection',
    desc: 'Security services support office buildings, commercial properties, residential communities, and other facilities requiring professional protection.',
  },
  {
    title: 'Security Consultation',
    desc: 'Clients can inquire about appropriate security staffing, service options, site coverage, and customized protection plans for their properties.',
  },
  {
    title: 'Client Communication and Support',
    desc: 'The contact page provides a communication channel for service inquiries, security requirements, and requests for additional company information.',
  },
  {
    title: 'Regional Security Coverage',
    desc: 'Virginia Surveillance Force serves clients across Virginia, Maryland, and the Washington, DC metropolitan area.',
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force, Inc. (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Manassas, Virginia; Rockville, Maryland; Washington, DC',
  },
  {
    label: 'SERVICE REGIONS',
    value: 'Virginia; Maryland; Washington, DC Metropolitan Area',
  },
  {
    label: 'CONTACT CHANNELS',
    value: 'Telephone Inquiries; Online Contact Form; Regional Office Communication',
  },
  {
    label: 'SECURITY SERVICES',
    value: 'Security Guard Services; Armed Security; Unarmed Security; Customized Security Solutions',
  },
  {
    label: 'TARGET CLIENTS',
    value: 'Business Owners; Property Managers; Residential Communities; Commercial Facilities; Institutional Organizations',
  },
  {
    label: 'SECURITY OBJECTIVES',
    value: 'Property Protection; Facility Security; Asset Protection; Risk Mitigation',
  },
  {
    label: 'CLIENT SUPPORT',
    value: 'Security Service Inquiries; Security Consultation; Service Information Requests; Customized Protection Planning',
  },
  {
    label: 'BUSINESS ADDRESS',
    value: '7544 Diplomat Drive, Suite 101, Manassas, Virginia 20109',
  },
  {
    label: 'CONTACT INFORMATION',
    value: '703-631-6559; info@vsfus.com',
  },
];

export default function ContactSemanticKeynotes() {
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
