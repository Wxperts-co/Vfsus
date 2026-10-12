'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Security Contractor Opportunities',
    desc: 'Virginia Surveillance Force, Inc. invites qualified security professionals and security companies to submit contracting opportunities for potential business partnerships.',
  },
  {
    title: 'Online Application Process',
    desc: 'Prospective contractors can use the online contracting opportunity form to provide business information and express interest in working with VSF.',
  },
  {
    title: 'Company Information',
    desc: 'Applicants may be required to submit company details, business contact information, and relevant organizational credentials for review.',
  },
  {
    title: 'Security Licensing Requirements',
    desc: 'Contractors must provide applicable state security licenses and demonstrate compliance with relevant licensing requirements.',
  },
  {
    title: 'Commercial Liability Insurance',
    desc: 'Applicants provide information about their commercial liability insurance coverage and policy limits as part of the contracting evaluation.',
  },
  {
    title: 'Service Coverage Areas',
    desc: 'Prospective partners can identify their operating regions and geographic coverage areas to help assess potential service opportunities.',
  },
  {
    title: 'Security Service Categories',
    desc: 'Contracting opportunities may include armed security, unarmed security, and vehicle patrol services.',
  },
  {
    title: 'Hourly Rate Submissions',
    desc: 'Applicants can specify requested hourly rates for different security service categories to support pricing and contract evaluation.',
  },
  {
    title: 'Contractor Qualification and Review',
    desc: 'Submitted business credentials, licensing details, insurance information, service capabilities, and rates help VSF evaluate potential contractors.',
  },
  {
    title: 'Professional Security Partnerships',
    desc: 'The contracting process supports potential partnerships with security providers capable of meeting client requirements and applicable operational standards.',
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force, Inc. (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC; United States',
  },
  {
    label: 'FORM TYPE',
    value: 'Contracting Opportunity Form; Security Contractor Application',
  },
  {
    label: 'APPLICANT TYPES',
    value: 'Licensed Security Professionals; Security Companies; Independent Security Contractors',
  },
  {
    label: 'LICENSING REQUIREMENTS',
    value: 'State Security Licenses; Applicable Security Credentials; Regulatory Compliance',
  },
  {
    label: 'INSURANCE REQUIREMENTS',
    value: 'Commercial Liability Insurance; Insurance Coverage Limits; Contractor Risk Coverage',
  },
  {
    label: 'SECURITY SERVICE CATEGORIES',
    value: 'Armed Security; Unarmed Security; Vehicle Patrol',
  },
  {
    label: 'BUSINESS INFORMATION',
    value: 'Company Details; Business Contact Information; Organizational Credentials',
  },
  {
    label: 'CONTRACTING DETAILS',
    value: 'Service Coverage Areas; Requested Hourly Rates; Contract Evaluation; Service Capabilities',
  },
  {
    label: 'PARTNERSHIP OBJECTIVES',
    value: 'Security Contractor Partnerships; Service Coverage Expansion; Qualified Security Staffing; Professional Security Operations',
  },
];

export default function ContractingOpportunitySemanticKeynotes() {
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
