'use client';

import React, { useState } from 'react';

const keynotes = [
  {
    title: 'Security Service Requests',
    desc: 'Virginia Surveillance Force provides a dedicated service request form for clients seeking professional security personnel and protective services.',
  },
  {
    title: 'Armed and Unarmed Security',
    desc: 'Clients can request armed or unarmed security officers according to their property requirements, operational needs, and desired level of protection.',
  },
  {
    title: 'Specialized Security Services',
    desc: 'Service requests may include fire watch, executive protection, and other customized security assignments.',
  },
  {
    title: 'Service Location and Scheduling',
    desc: 'Clients can provide the required service location, requested dates, timelines, and relevant assignment details to support deployment planning.',
  },
  {
    title: 'Customized Security Duties',
    desc: 'The request process allows clients to communicate specific duties, site requirements, and expectations for assigned security personnel.',
  },
  {
    title: 'Deployment Coordination',
    desc: 'Submitted service details help the company evaluate client requirements and coordinate appropriate security coverage.',
  },
  {
    title: 'Client Communication',
    desc: 'A centralized request form helps organize service information and facilitates communication between clients and the security provider.',
  },
  {
    title: 'Professional Security Management',
    desc: 'Virginia Surveillance Force focuses on providing security solutions tailored to client needs, property protection requirements, and applicable service terms.',
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
    value: 'Security Service Request Form; Client Service Request Portal',
  },
  {
    label: 'SECURITY SERVICES',
    value:
      'Armed Security; Unarmed Security; Fire Watch; Executive Protection; Customized Security Assignments',
  },
  {
    label: 'REQUEST DETAILS',
    value:
      'Service Location; Requested Dates; Deployment Timelines; Security Duties; Site Requirements',
  },
  {
    label: 'CLIENT TYPES',
    value:
      'Existing Clients; Commercial Businesses; Residential Property Managers; Institutional Organizations',
  },
  {
    label: 'SERVICE COORDINATION',
    value:
      'Security Staffing; Deployment Planning; Client Communication; Assignment Scheduling',
  },
  {
    label: 'SECURITY OBJECTIVES',
    value:
      'Property Protection; Personnel Safety; Asset Protection; Risk Mitigation',
  },
  {
    label: 'OPERATIONAL REQUIREMENTS',
    value:
      'Client Specifications; Service Terms; Site-Specific Instructions; Security Coverage Planning',
  },
  {
    label: 'SERVICE REGIONS',
    value: 'Virginia; Maryland; Washington, DC Metropolitan Area',
  },
];

export default function ServiceRequestSemanticKeynotes() {
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
