'use client';

import React, { useState } from 'react';

const keynotes = [
  'Virginia Surveillance Force provides professional security and protective services to businesses and organizations throughout Virginia, Maryland, and Washington, DC.',
  'The company offers armed and unarmed security officers, vehicle patrols, office and corporate security, and concierge and front desk services.',
  'Residential security solutions include gated communities, apartment complexes, condominiums, homeowners associations, and residential properties.',
  'Commercial security services protect retail stores, shopping centers, malls, warehouses, industrial facilities, hotels, and resorts.',
  'Specialized protection includes government and diplomatic security, healthcare and hospital security, school and university security, and VIP executive protection.',
  'Additional services include Special Police services, alarm response, private investigations, intelligence gathering, fire watch, and secure medical and legal courier delivery.',
  'Financial security solutions include bank and ATM protection, financial facility security, and security for cash-handling operations.',
  'Since 1987, the company has provided customized security solutions with 24/7 availability, focusing on protecting people, property, assets, and business operations.',
];

const nerTags = [
  {
    label: 'ORGANIZATION',
    value: 'Virginia Surveillance Force',
  },
  {
    label: 'LOCATION',
    value: 'Virginia; Maryland; Washington, DC; Manassas, Virginia',
  },
  {
    label: 'SECURITY SERVICES',
    value:
      'Armed Security; Unarmed Security; Vehicle Patrol; Office and Corporate Security; Concierge and Front Desk Security',
  },
  {
    label: 'PROPERTY SECURITY',
    value:
      'Residential Communities; Gated Communities; Retail Stores; Shopping Centers; Malls; Warehouses; Industrial Facilities; Hotels and Resorts',
  },
  {
    label: 'SPECIALIZED PROTECTION',
    value:
      'Government and Diplomatic Security; Healthcare and Hospital Security; School and University Security; VIP Executive Protection; Bodyguard Services; Special Police Services',
  },
  {
    label: 'INVESTIGATIVE SERVICES',
    value:
      'Alarm Response; Private Investigations; Intelligence Gathering; Surveillance; Background Investigations',
  },
  {
    label: 'ADDITIONAL SERVICES',
    value:
      'Fire Watch; Medical Courier Delivery; Legal Courier Delivery; Bank and ATM Security',
  },
  {
    label: 'SERVICE AVAILABILITY',
    value: '24/7 Security Services; Customized Security Solutions; Emergency Response',
  },
  {
    label: 'REGISTRATION IDENTIFIERS',
    value:
      'Department of Criminal Justice PSS #11-2371; Metropolitan Police SOMB #SAB200504; Maryland State Police #106-3249; D-U-N-S Identification #06-249-7602',
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

export default function ServicesSemanticKeynotes() {
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
