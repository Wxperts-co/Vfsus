'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Security Insights and Guidance',
    desc: 'Virginia Surveillance Force provides security-related information and practical guidance to help property managers and business owners make informed protection decisions.',
  },
  {
    title: 'Physical Security and CCTV Integration',
    desc: 'Educational resources explore how security personnel and CCTV surveillance systems can work together to improve property monitoring and incident prevention.',
  },
  {
    title: 'Commercial Liability Reduction',
    desc: 'Security guidance helps businesses identify potential vulnerabilities, strengthen security procedures, and reduce exposure to preventable incidents and liability risks.',
  },
  {
    title: 'Regulatory Compliance',
    desc: 'Security insights address the importance of understanding applicable regulations, industry requirements, and relevant security responsibilities.',
  },
  {
    title: 'Property Protection Strategies',
    desc: 'Resources discuss practical approaches to protecting commercial properties, business assets, employees, visitors, and facilities.',
  },
  {
    title: 'Security Risk Management',
    desc: 'Businesses and property managers can use security guidance to evaluate potential threats, identify coverage gaps, and develop appropriate protection strategies.',
  },
  {
    title: 'Regional Security Expertise',
    desc: 'Virginia Surveillance Force serves clients throughout Virginia, Maryland, and the Washington, DC metropolitan area.',
  },
  {
    title: 'Informed Security Decisions',
    desc: 'The insights section helps organizations understand security options, assess operational needs, and make informed decisions about personnel, surveillance technology, and property protection.',
  },
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force, Inc. (VSF)',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC Metropolitan Area',
  },
  {
    label: 'CONTENT CATEGORY',
    value:
      'Security Insights; Security Guidance; Educational Resources; Commercial Security Information',
  },
  {
    label: 'SECURITY TECHNOLOGY',
    value:
      'CCTV Surveillance Systems; Video Monitoring; Security Surveillance Equipment',
  },
  {
    label: 'PHYSICAL SECURITY',
    value:
      'Security Officers; On-Site Security Personnel; Commercial Property Security',
  },
  {
    label: 'RISK MANAGEMENT',
    value:
      'Commercial Liability Reduction; Security Risk Assessment; Threat Prevention; Vulnerability Identification',
  },
  {
    label: 'COMPLIANCE',
    value:
      'Regulatory Compliance; Security Requirements; Industry Standards; Property Safety Procedures',
  },
  {
    label: 'TARGET AUDIENCE',
    value:
      'Property Managers; Business Owners; Commercial Property Operators; Facility Managers',
  },
  {
    label: 'SECURITY OBJECTIVES',
    value:
      'Asset Protection; Incident Prevention; Employee and Visitor Safety; Property Monitoring',
  },
  {
    label: 'PROTECTION STRATEGIES',
    value:
      'Integrated Security Solutions; CCTV and Guard Coordination; Customized Security Planning; Security Coverage Evaluation',
  },
];

export default function InsightsSemanticKeynotes() {
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
