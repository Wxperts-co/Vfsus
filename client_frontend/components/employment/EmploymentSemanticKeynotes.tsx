'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Security Career Opportunities',
    desc: 'Virginia Surveillance Force provides employment opportunities for individuals interested in professional security and protective services.',
  },
  {
    title: 'Security Officer Positions',
    desc: 'Career opportunities may include security guard and protective personnel roles supporting commercial, residential, and institutional clients.',
  },
  {
    title: 'Candidate Qualifications',
    desc: 'Applicants may need to meet position-specific eligibility requirements, background screening standards, and applicable security licensing requirements.',
  },
  {
    title: 'Recruitment and Screening',
    desc: 'The hiring process may involve reviewing employment history, verifying references, conducting background checks, and assessing candidates for suitability.',
  },
  {
    title: 'Professional Training',
    desc: 'Security personnel are expected to follow established procedures, maintain professional conduct, and perform assigned security responsibilities effectively.',
  },
  {
    title: 'Security Responsibilities',
    desc: 'Employment roles may involve property protection, access control, incident reporting, patrol duties, and maintaining a safe environment for clients and visitors.',
  },
  {
    title: 'Professional Standards',
    desc: 'The company emphasizes accountability, reliability, integrity, and professionalism when delivering security services.',
  },
  {
    title: 'Regional Employment',
    desc: 'Virginia Surveillance Force operates across Virginia, Maryland, and Washington, DC, offering security services in multiple locations.',
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force, Inc. (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC',
  },
  {
    label: 'EMPLOYMENT CATEGORY',
    value: 'Security Careers; Employment Opportunities; Security Personnel Recruitment',
  },
  {
    label: 'JOB ROLES',
    value: 'Security Guards; Security Officers; Protective Personnel',
  },
  {
    label: 'RECRUITMENT PROCESS',
    value:
      'Candidate Screening; Background Checks; Employment History Verification; Reference Checks',
  },
  {
    label: 'QUALIFICATIONS',
    value:
      'Applicable Security Licensing; Position-Specific Eligibility; Professional Conduct; Reliability',
  },
  {
    label: 'TRAINING AND STANDARDS',
    value:
      'Security Procedures; Access Control; Incident Reporting; Patrol Operations; Accountability',
  },
  {
    label: 'JOB RESPONSIBILITIES',
    value:
      'Property Protection; Facility Security; Visitor Safety; Security Monitoring',
  },
  {
    label: 'PROFESSIONAL VALUES',
    value: 'Integrity; Professionalism; Dependability; Responsibility',
  },
  {
    label: 'SERVICE REGIONS',
    value: 'Virginia; Maryland; Washington, DC Metropolitan Area',
  },
];

export default function EmploymentSemanticKeynotes() {
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
