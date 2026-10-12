'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Security Career Opportunities',
    desc: 'Virginia Surveillance Force, Inc. offers employment opportunities for individuals seeking careers in professional security and protective services.',
  },
  {
    title: 'Available Security Positions',
    desc: 'Applicants can express interest in armed security, unarmed security, and concierge security roles based on their qualifications and experience.',
  },
  {
    title: 'Online Employment Application',
    desc: 'The official employment application form allows candidates to submit their information for consideration for available security positions.',
  },
  {
    title: 'Applicant Credentials',
    desc: 'Candidates can provide relevant personal details, professional qualifications, security licenses, and supporting employment documents.',
  },
  {
    title: 'Resume Submission',
    desc: 'Applicants can submit their resumes to help the recruitment team evaluate their work history, skills, and suitability for security assignments.',
  },
  {
    title: 'Licensing and Eligibility',
    desc: 'Security applicants may need to meet applicable state licensing requirements and position-specific eligibility criteria.',
  },
  {
    title: 'Regional Employment Opportunities',
    desc: 'VSF provides security services throughout Virginia, Maryland, and Washington, DC, supporting staffing needs across these regions.',
  },
  {
    title: 'Recruitment and Candidate Evaluation',
    desc: 'Submitted applications help the company assess candidates\' qualifications, experience, credentials, and suitability for available positions.',
  },
  {
    title: 'Professional Security Standards',
    desc: 'The recruitment process supports the selection of personnel expected to demonstrate professionalism, reliability, accountability, and responsible security practices.',
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
    label: 'FORM TYPE',
    value: 'Online Employment Application; Security Job Application Portal',
  },
  {
    label: 'JOB CATEGORIES',
    value: 'Armed Security Officers; Unarmed Security Officers; Concierge Security Personnel',
  },
  {
    label: 'APPLICANT DOCUMENTS',
    value: 'Resume; Professional Credentials; Security Licenses; Employment Information',
  },
  {
    label: 'RECRUITMENT PROCESS',
    value: 'Candidate Applications; Qualification Review; Employment Screening; Candidate Evaluation',
  },
  {
    label: 'ELIGIBILITY REQUIREMENTS',
    value: 'Applicable State Security Licensing; Position-Specific Qualifications; Relevant Work Experience',
  },
  {
    label: 'CAREER OPPORTUNITIES',
    value: 'Security Guard Careers; Protective Services Employment; Concierge Security Careers',
  },
  {
    label: 'PROFESSIONAL STANDARDS',
    value: 'Professionalism; Reliability; Accountability; Responsible Security Practices',
  },
  {
    label: 'SERVICE REGIONS',
    value: 'Virginia; Maryland; Washington, DC Metropolitan Area',
  },
];

export default function EmploymentApplicationSemanticKeynotes() {
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
