export interface ServiceSection {
  heading: string;
  body: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  icon: string;
  image: string;
  excerpt: string;               // Short blurb for listing cards
  intro: string[];               // Opening paragraphs
  staffingHeading?: string;      // e.g. "CONCIERGE STAFFING OPTIONS!"
  staffingIntro?: string;
  staffingOptions?: string[];    // Bullet list
  sections?: ServiceSection[];   // h3 + body pairs
  closing?: string;              // Final paragraph
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ServicesPageData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  intro: {
    headline: string;
    contentHtml: string;
  };
  video: {
    badgeText: string;
    videos?: string[];
    wistiaUrl: string;
    wistiaUrl2?: string;
  };
  services: ServiceData[];
}

export function extractServicesVideoList(video?: {
  badgeText?: string;
  videos?: string[];
  wistiaUrl?: string;
  wistiaUrl2?: string;
}): string[] {
  if (!video) return [];
  if (Array.isArray(video.videos)) {
    return video.videos.filter((v) => typeof v === "string" && v.trim() !== "");
  }
  return [video.wistiaUrl, video.wistiaUrl2].filter(
    (v): v is string => Boolean(v && typeof v === "string" && v.trim() !== "")
  );
}

export const defaultServicesPageData: ServicesPageData = {
  seo: {
    title: "Services | Virginia Surveillance Force",
    description: "Virginia Surveillance Force provides premium security, concierge, fire watch, and private investigation services across Virginia, Maryland, and Washington DC.",
    keywords: "security services, concierge, fire watch, vehicle patrol, security guards, DC, Maryland, Virginia",
  },
  intro: {
    headline: "Our professionals are available to you<br/> 24 hours a day, 7 days a week.",
    contentHtml: `<p><strong class="text-white font-semibold">VIRGINIA SURVEILLANCE FORCE</strong> has become the trusted name in Business, Security and Protective Services. We provide only the best personnel to meet your needs. We have extensive experience in all facets of security & business services and we possess the resources and manpower required to meet the demands of our customers. We would welcome the opportunity to earn your trust and deliver you the best service in the industry. Wherever you have security or business needs...we've got the peace of mind you're looking for.</p>`
  },
  video: {
    badgeText: "Live Operations",
    videos: [
      "https://fast.wistia.net/embed/iframe/zpq664bxly",
      "/images/about-3.mp4",
    ],
    wistiaUrl: "https://fast.wistia.net/embed/iframe/zpq664bxly",
    wistiaUrl2: "/images/about-3.mp4",
  },
  services: [
    // 1 ── CONCIERGE & FRONTDESK ─────────────────────────────────────────────
    {
      slug: "concierge-and-frontdesk",
      title: "Concierge & Frontdesk",
      icon: "🏢",
      image: "/images/services/services-1.jpg",
      excerpt: "Premium lobby and frontdesk staffing that elevates your property's image and keeps tenants satisfied 24/7.",
      intro: [
        "Virginia Surveillance Force Concierge understands the challenges that it's not enough, just to maintain an appealing building. Building owners and property managers are looking to attract and retain high lease tenants to ensure maximum occupancy and bottom line profitability. Tenants are looking to property managers for personal and professional services that can make their life less hectic.",
        "VSF Concierge Service is the best investment a property manager can make. Whether for a premier hotel, luxury apartments or exclusive corporate office buildings, the concierge will add value and service to your environment.",
        "We at VSF Concierge answer questions, solve problems, build community, give corporate tenants and residents additional time and control over hectic days and much more.",
        "Your employees will appreciate your desire to provide a service that helps free up precious time, therefore increasing everyone's productivity. You are providing service that increases overall quality of life. Virginia Surveillance Force Concierge Service project a professional, first class image in your lobby.",
        "We will be the 1st point of contact for your building providing communication between your tenants and building management or engineering for security and general operations. We strive to be the masters at customer service by educating your tenants and visitors about the service and activities you provide through VSF Concierge. We offer extensive event planning, assistance for your building or your building's tenants. We help you build you business by listing and recruiting for leads on leasing to help you maintain building occupancy.",
        "Enjoy the benefits of our service by satisfying your current tenants and attracting sophisticated new business.",
      ],
      staffingHeading: "CONCIERGE STAFFING OPTIONS!",
      staffingIntro: "Virginia Surveillance Force Concierge Service never goes out of style. We provide top notch quality service and offer:",
      staffingOptions: [
        "Traditional Lobby Concierge",
        "Administrative Assistant",
        "Lobby Attendant",
        "Parking Attendant",
      ],
      sections: [
        {
          heading: "Traditional Lobby Concierge Duties",
          body: "Include process of all concierge requests from tenants, such as catering, gifts, dry cleaning etc. We act as liaison between your tenant and property management. We plan all lobby events. We act as community resource. We assist property manager with building operation and a lot more.",
        },
        {
          heading: "Administrative Assistant",
          body: "Position is offered by VSF Concierge for corporations and businesses as a dependable task master. Your coordinator can work from a lobby desk, reception desk or cubicle. Duties include read, sort and prioritize daily mail, code incoming invoices, draft memos for review and distribution.",
        },
        {
          heading: "Lobby Attendant",
          body: "Service is offered for the building clientele who simply need a professional presence in the lobby without additional services. Duties of lobby attendant is to welcome all tenants and visitors entering the building, provide a welcoming, secure presence in the lobby and loading dock or other areas when needed, represents building with a professional image and additional duties as assigned by property management.",
        },
        {
          heading: "Parking Attendant",
          body: "Service is offered for the building clientele or tool facilities who simply need a professional presence in the parking areas, covered garage or tool booth. Duties of Parking attendant is to welcome all tenants and visitors entering the building or area, provide a welcoming, secure presence in the Parking area, booth or loading dock and assisting others when needed, represents building or area with a professional image and additional duties as assigned by property management.",
        },
      ],
      closing: "Virginia Surveillance Force provides concierge services throughout Virginia, Washington DC & Maryland areas. When it comes to concierge services, Virginia Surveillance Force Concierge are at the top of their class.",
    },

    // 2 ── FIRE WATCH ─────────────────────────────────────────────────────────
    {
      slug: "fire-watch",
      title: "Fire Watch",
      icon: "🔥",
      image: "/images/services/services-2.jpg",
      excerpt: "Licensed fire watch officers available around the clock to keep your property compliant and safe during system outages.",
      intro: [
        "Virginia Surveillance Force provides certified Fire Watch services to commercial, residential, and industrial properties throughout Virginia, Maryland, and Washington DC.",
        "When a fire alarm or sprinkler system is offline for maintenance, repair, or failure, local fire codes require an immediate fire watch to be posted. Our officers respond quickly, ensuring continuous monitoring and full compliance with local fire department requirements.",
        "Our fire watch personnel are trained to inspect premises at regular intervals, maintain all required logs and records, and notify emergency services immediately upon detecting smoke, fire, or any hazardous condition.",
      ],
      sections: [
        {
          heading: "When Is Fire Watch Required?",
          body: "Fire watch is required whenever a building's fire suppression or alarm system is impaired — during planned maintenance windows, emergency repairs, construction phases, or equipment failure. Local fire codes mandate a trained attendant on-site until the system is restored.",
        },
        {
          heading: "Our Fire Watch Services Include",
          body: "Continuous patrol of all designated areas, documented inspection logs accepted by local fire marshals, immediate notification of fire department and building management upon any discovery, and coordination with your facilities team throughout the watch period.",
        },
        {
          heading: "Response Time",
          body: "VSF Fire Watch officers are available 24/7/365 and can be deployed rapidly to your site. We understand that fire watch situations are time-sensitive and we are committed to fast, reliable response.",
        },
      ],
      closing: "Virginia Surveillance Force is the trusted name for fire watch services across Virginia, Maryland, and Washington DC. Contact us today to arrange immediate coverage.",
    },

    // 3 ── VEHICLE PATROL ─────────────────────────────────────────────────────
    {
      slug: "vehicle-patrol",
      title: "Vehicle Patrol",
      icon: "🚔",
      image: "/images/services/services-3.jpg",
      excerpt: "Marked and unmarked vehicle patrols providing visible deterrence and rapid response across large or multi-site properties.",
      intro: [
        "Virginia Surveillance Force Vehicle Patrol service provides a highly visible, mobile security presence that deters criminal activity and ensures rapid response across large campuses, parking facilities, retail centers, and multi-building complexes.",
        "Our patrol officers conduct regular, randomized route checks — making it difficult for potential criminals to predict patrol schedules. Each patrol is documented with detailed logs and incident reports delivered directly to property management.",
      ],
      sections: [
        {
          heading: "Marked & Unmarked Vehicles",
          body: "We operate both clearly marked security vehicles for high-visibility deterrence and unmarked vehicles for covert observation. The combination creates a comprehensive security environment tailored to your property's needs.",
        },
        {
          heading: "Patrol Services Include",
          body: "Exterior building checks, parking lot and garage inspections, perimeter gate and access point verification, lighting and lock checks, suspicious activity reporting, emergency response, and coordination with local law enforcement when required.",
        },
        {
          heading: "Coverage Areas",
          body: "VSF Vehicle Patrol covers properties throughout Northern Virginia, Maryland, and the Washington DC Metro area, including multi-site contracts for property management companies.",
        },
      ],
      closing: "Contact Virginia Surveillance Force today to discuss a customized vehicle patrol plan for your property.",
    },

    // 4 ── ARMED & UNARMED SECURITY ───────────────────────────────────────────
    {
      slug: "permanent-or-temporary-security",
      title: "Armed & Unarmed Security",
      icon: "🛡️",
      image: "/images/services/services-4.jpg",
      excerpt: "Flexible uniformed security staffing for both long-term contracts and short-notice temporary assignments.",
      intro: [
        "Virginia Surveillance Force offers both permanent and temporary security staffing solutions to meet the ever-changing needs of businesses, property managers, and event organizers throughout Virginia, Maryland, and Washington DC.",
        "Whether you require a dedicated full-time security team or need rapid deployment for a short-term event or emergency coverage, VSF can provide professionally trained, licensed officers on your schedule.",
      ],
      sections: [
        {
          heading: "Permanent Security Contracts",
          body: "Our permanent security officers become an integral part of your operation — learning your facility, staff, procedures, and specific security requirements. Long-term placement ensures consistency, familiarity, and a higher standard of protection.",
        },
        {
          heading: "Temporary & Emergency Staffing",
          body: "Need coverage on short notice? VSF maintains a deep roster of available, fully vetted officers ready for immediate deployment. Ideal for special events, seasonal increases, emergency call-outs, or filling gaps during illness or transition.",
        },
        {
          heading: "Armed & Unarmed Options",
          body: "We offer both armed and unarmed security officers depending on your threat level and risk assessment. All armed officers are licensed, regularly trained, and compliant with Virginia and Maryland state regulations.",
        },
      ],
      closing: "Virginia Surveillance Force is your trusted partner for flexible, professional security staffing across the DC Metro region.",
    },

    // 5 ── OFFICE & CORPORATE SECURITY ────────────────────────────────────────
    {
      slug: "office-and-corporate-security",
      title: "Office & Corporate Security",
      icon: "💼",
      image: "/images/services/services-5.jpg",
      excerpt: "Discreet, professional security solutions tailored to corporate environments, protecting people, assets, and information.",
      intro: [
        "Virginia Surveillance Force provides comprehensive Office and Corporate Security services designed to protect your employees, visitors, assets, and proprietary information in today's dynamic business environment.",
        "Our corporate security officers are trained to maintain a professional, discreet presence that aligns with your company culture while providing maximum protection. We understand that security in a corporate setting must balance access control with a welcoming atmosphere.",
      ],
      sections: [
        {
          heading: "Access Control & Visitor Management",
          body: "Our officers manage entry points, verify credentials, maintain visitor logs, and ensure only authorized personnel access sensitive areas. We integrate seamlessly with electronic access control systems.",
        },
        {
          heading: "Executive & Employee Protection",
          body: "From lobby security to executive floor protection, VSF provides layered security coverage throughout your corporate facility. We conduct regular floor checks, respond to workplace threats, and coordinate with HR and management on security policies.",
        },
        {
          heading: "After-Hours Security",
          body: "Corporate buildings are vulnerable after business hours. VSF provides overnight security, lock-up procedures, alarm response, and regular patrol to protect your property and assets around the clock.",
        },
      ],
      closing: "Protect your people and your business with Virginia Surveillance Force corporate security services across Virginia, Maryland, and Washington DC.",
    },

    // 6 ── MALLS / RETAIL / INDUSTRIAL ────────────────────────────────────────
    {
      slug: "malls-retail-shopping-centers-ware-houses-and-industrial-security",
      title: "Malls Retail Shopping Centers Ware Houses & Industrial Security",
      icon: "🏬",
      image: "/images/services/services-6.jpg",
      excerpt: "High-traffic retail and industrial security solutions covering loss prevention, crowd control, and perimeter protection.",
      intro: [
        "Virginia Surveillance Force specializes in security for high-traffic retail environments, shopping centers, warehouses, and industrial facilities. These environments present unique security challenges — from shoplifting and organized retail crime to warehouse theft and industrial safety incidents.",
        "Our officers are trained in loss prevention techniques, crowd management, emergency response, and the specific operational needs of retail and industrial settings.",
      ],
      sections: [
        {
          heading: "Retail & Mall Security",
          body: "VSF uniformed and plainclothes officers provide deterrence and active loss prevention in retail environments. Services include floor patrol, fitting room monitoring, customer dispute resolution, and coordination with local law enforcement for shoplifting incidents.",
        },
        {
          heading: "Warehouse & Industrial Security",
          body: "We protect inventory, equipment, and personnel at warehouses and industrial sites with perimeter security, access control, vehicle inspections, and around-the-clock patrol. Our officers are trained to identify and respond to workplace safety incidents as well as criminal activity.",
        },
        {
          heading: "Parking Lot & Perimeter Control",
          body: "Large retail sites require active parking lot security to deter vehicle theft, assaults, and trespassing. VSF provides vehicle patrol and foot patrol coverage for parking areas and loading docks.",
        },
      ],
      closing: "Trust Virginia Surveillance Force to keep your retail, warehouse, or industrial facility secure across the Virginia, Maryland, and DC metro region.",
    },

    // 7 ── HOTEL / MOTEL / RESORTS ─────────────────────────────────────────────
    {
      slug: "hotel-motel-and-resorts",
      title: "Hotel Motel & Resorts",
      icon: "🏨",
      image: "/images/services/services-7.jpg",
      excerpt: "Hospitality-focused security officers who protect guests and staff while preserving the welcoming atmosphere of your property.",
      intro: [
        "Virginia Surveillance Force understands that security in a hospitality setting must be both effective and unobtrusive. Our hotel security officers are trained to protect guests, staff, and property while maintaining the welcoming, professional atmosphere your guests expect.",
        "From resort properties to budget motels, VSF provides customized security programs that address the specific challenges of hospitality security — including unauthorized access, disturbances, theft, and emergency response.",
      ],
      sections: [
        {
          heading: "Guest & Staff Safety",
          body: "Our officers conduct regular patrols of guest corridors, lobbies, pool areas, parking lots, and common spaces. We respond to disturbances professionally and discreetly, ensuring minimal disruption to other guests.",
        },
        {
          heading: "Access Control",
          body: "VSF monitors entries and exits, verifies guest credentials when required, and manages after-hours door security to prevent unauthorized access to guest floors and restricted areas.",
        },
        {
          heading: "Emergency Response",
          body: "Our officers are trained to handle medical emergencies, fire evacuations, disturbances, and criminal incidents — coordinating with local emergency services and protecting your guests and reputation.",
        },
      ],
      closing: "Virginia Surveillance Force provides hospitality security services throughout Virginia, Maryland, and the Washington DC area.",
    },

    // 8 ── RESIDENTIAL & GATED COMMUNITIES ────────────────────────────────────
    {
      slug: "residential-and-gated-communities",
      title: "Residential & Gated Communities",
      icon: "🏘️",
      image: "/images/services/services-8.jpg",
      excerpt: "Community-focused security for apartment complexes and gated neighborhoods that residents can rely on every day.",
      intro: [
        "Virginia Surveillance Force has extensive experience providing security services for residential communities, apartment complexes, condominiums, and gated neighborhoods throughout Northern Virginia, Maryland, and Washington DC.",
        "Our residential security officers are trained to balance enforcement with community relations — building trust with residents while maintaining a secure environment for all. We understand that your residents' sense of safety is paramount.",
      ],
      sections: [
        {
          heading: "Gate & Access Control",
          body: "VSF officers manage gatehouse operations, verify visitor identities, maintain access logs, and enforce community entry policies around the clock. We coordinate with management to handle resident and visitor access efficiently.",
        },
        {
          heading: "Patrol & Incident Response",
          body: "Regular foot and vehicle patrols of parking areas, common spaces, amenities, and building perimeters. Officers document all incidents, respond to resident complaints, and coordinate with police when necessary.",
        },
        {
          heading: "Community Partnership",
          body: "Our officers are taught to be community resources — greeting residents by name, reporting maintenance issues, assisting with lockouts, and being a visible, reassuring presence that enhances quality of life.",
        },
      ],
      closing: "Contact Virginia Surveillance Force to build a customized security program for your residential community.",
    },

    // 9 ── HOSPITAL & HEALTH CARE ──────────────────────────────────────────────
    {
      slug: "hospital-and-health-care-facilities",
      title: "Hospital & Health Care Facilities",
      icon: "🏥",
      image: "/images/services/services-9.jpg",
      excerpt: "Specialized healthcare security officers trained to handle the unique and sensitive environment of hospitals and clinics.",
      intro: [
        "Virginia Surveillance Force provides specialized security services for hospitals, medical centers, clinics, and long-term care facilities. Healthcare environments require officers with a unique combination of sensitivity, patience, and decisive action capability.",
        "Our healthcare security officers receive specialized training in de-escalation techniques, patient handling, HIPAA awareness, and the specific emergency response protocols required in medical settings.",
      ],
      sections: [
        {
          heading: "Patient & Staff Safety",
          body: "VSF officers protect patients, staff, and visitors from workplace violence, unauthorized entry, and disruptive behavior. We work closely with hospital administration and nursing staff to maintain a safe, therapeutic environment.",
        },
        {
          heading: "Access Control & Visitor Management",
          body: "We manage entry points, enforce visitor policies during restricted hours, and protect sensitive areas such as maternity wards, pharmacies, and administrative offices from unauthorized access.",
        },
        {
          heading: "Emergency Response",
          body: "Our officers are trained to respond to Code situations, assist with patient elopement prevention, coordinate medical emergency response, and work seamlessly with hospital security teams and local law enforcement.",
        },
      ],
      closing: "Virginia Surveillance Force delivers compassionate, professional healthcare security throughout Virginia, Maryland, and Washington DC.",
    },

    // 10 ── SCHOOLS / COLLEGES / UNIVERSITIES ──────────────────────────────────
    {
      slug: "schools-colleges-and-universities",
      title: "Schools Colleges & Universities",
      icon: "🎓",
      image: "/images/services/services-10.jpg",
      excerpt: "Campus security solutions that create safe learning environments while fostering a positive community atmosphere.",
      intro: [
        "Virginia Surveillance Force provides professional campus security services for K-12 schools, colleges, and universities. Creating a safe educational environment is one of the most important responsibilities any institution carries.",
        "Our education security officers are trained to build positive relationships with students and faculty while maintaining firm, consistent enforcement of campus security policies. We understand that the tone of a campus security program directly impacts the learning environment.",
      ],
      sections: [
        {
          heading: "Campus Access Control",
          body: "VSF officers manage main entrances, monitor visitor sign-in procedures, conduct ID checks, and patrol campus perimeters to prevent unauthorized access to school grounds and buildings.",
        },
        {
          heading: "Emergency & Lockdown Procedures",
          body: "Our officers are trained in active threat response, lockdown procedures, evacuation coordination, and communication with local law enforcement. We conduct regular drills and maintain up-to-date emergency response plans for each campus.",
        },
        {
          heading: "Student & Faculty Safety",
          body: "Beyond enforcement, VSF education officers serve as a positive, visible presence — monitoring common areas, parking lots, and after-school activities, and serving as a resource for students and staff.",
        },
      ],
      closing: "Protect your educational community with Virginia Surveillance Force campus security services across the DC Metro region.",
    },

    // 11 ── GOVERNMENT & DIPLOMAT FACILITIES ───────────────────────────────────
    {
      slug: "government-and-diplomat-facilities",
      title: "Government & Diplomat Facilities",
      icon: "🏛️",
      image: "/images/services/services-11.jpg",
      excerpt: "Cleared, professional security personnel meeting the elevated standards required for government and diplomatic sites.",
      intro: [
        "Virginia Surveillance Force provides security services for government buildings, diplomatic facilities, embassies, and federal offices throughout Virginia, Maryland, and Washington DC.",
        "Our government and diplomatic security officers meet the highest standards of professionalism, background screening, and specialized training required for these sensitive environments. VSF understands the unique protocols, clearance requirements, and heightened security posture these facilities demand.",
      ],
      sections: [
        {
          heading: "Security Clearance & Vetting",
          body: "All VSF officers assigned to government and diplomatic facilities undergo comprehensive background investigations, thorough drug screening, and any required security clearance processes to meet facility specifications.",
        },
        {
          heading: "Access Control & Credentialing",
          body: "We enforce strict access control protocols, manage visitor credentialing processes, operate CCTV and electronic security systems, and ensure full compliance with facility-specific security directives.",
        },
        {
          heading: "Diplomatic Protection",
          body: "VSF provides discreet, professional security presence for diplomatic facilities, coordinating with federal law enforcement agencies and following established diplomatic security protocols.",
        },
      ],
      closing: "Virginia Surveillance Force is a trusted partner for government and diplomatic security throughout the National Capital Region.",
    },

    // 12 ── ALARM RESPONSE ─────────────────────────────────────────────────────
    {
      slug: "alarm-response",
      title: "Alarm Response",
      icon: "🚨",
      image: "/images/services/services-12.jpg",
      excerpt: "Rapid alarm response officers dispatched immediately to verify and secure your property when an alarm activates.",
      intro: [
        "Virginia Surveillance Force provides rapid alarm response services for commercial and residential properties throughout the DC Metro area. When your alarm activates, VSF officers are dispatched immediately to investigate and secure your property.",
        "False alarms are costly and over-reliance on police response is inefficient. VSF alarm response bridges the gap — providing a trained, professional first responder who can assess the situation, secure the property, and coordinate with law enforcement only when truly necessary.",
      ],
      sections: [
        {
          heading: "Rapid Dispatch",
          body: "VSF alarm response officers are strategically stationed throughout Northern Virginia and Maryland to minimize response times. We prioritize speed and maintain constant communication with your monitoring center.",
        },
        {
          heading: "On-Site Assessment",
          body: "Upon arrival, our officers conduct a thorough perimeter and interior inspection, identify the cause of the alarm, secure any compromised entry points, and document their findings in a detailed report delivered to the property owner.",
        },
        {
          heading: "Police & Emergency Coordination",
          body: "When a genuine intrusion or emergency is confirmed, VSF officers immediately contact law enforcement, remain on scene to assist, and provide police with a detailed first-hand account of conditions upon arrival.",
        },
      ],
      closing: "Trust Virginia Surveillance Force for reliable, rapid alarm response across Virginia, Maryland, and Washington DC.",
    },

    // 13 ── BANK SECURITY & ATM ────────────────────────────────────────────────
    {
      slug: "bank-security-and-atm-service",
      title: "Bank Security & ATM Service",
      icon: "🏦",
      image: "/images/services/services-13.jpg",
      excerpt: "Armed and unarmed bank security officers and ATM monitoring protecting financial institutions and their customers.",
      intro: [
        "Virginia Surveillance Force provides specialized security services for banks, credit unions, financial centers, and ATM locations throughout Virginia, Maryland, and Washington DC.",
        "Financial institutions face a unique set of security risks requiring officers with specific training in robbery deterrence, customer safety, cash handling observation, and emergency response protocols specific to banking environments.",
      ],
      sections: [
        {
          heading: "Armed Bank Security",
          body: "VSF armed security officers provide a visible deterrent to robbery and fraud at bank branches. Our officers are trained in bank robbery response protocols, hostage situation awareness, and coordination with federal and local law enforcement.",
        },
        {
          heading: "ATM Monitoring & Protection",
          body: "We provide security patrols for ATM vestibules and outdoor ATM locations, deterring skimmer installation, robberies, and vandalism. Officers conduct regular inspection checks and report suspicious activity immediately.",
        },
        {
          heading: "Opening & Closing Procedures",
          body: "VSF officers assist with secure opening and closing procedures, escorting staff to and from their vehicles, monitoring the facility during vulnerable transition periods, and ensuring all security protocols are followed.",
        },
      ],
      closing: "Virginia Surveillance Force is the trusted security partner for financial institutions across the DC Metro region.",
    },

    // 14 ── INVESTIGATIONS & INTELLIGENCE ─────────────────────────────────────
    {
      slug: "investigations-and-intelligence",
      title: "Investigations & Intelligence",
      icon: "🔍",
      image: "/images/services/services-14.jpg",
      excerpt: "Licensed private investigation services covering surveillance, background checks, and corporate intelligence gathering.",
      intro: [
        "Virginia Surveillance Force offers licensed private investigation and intelligence services for businesses, legal professionals, and individuals throughout Virginia, Maryland, and Washington DC.",
        "Our investigators combine years of law enforcement and security experience with advanced surveillance technology to deliver accurate, legally admissible findings. We operate with the utmost discretion, professionalism, and strict adherence to applicable laws.",
      ],
      sections: [
        {
          heading: "Surveillance Investigations",
          body: "VSF investigators conduct covert surveillance operations for workers' compensation cases, insurance fraud investigations, domestic matters, and corporate misconduct. We utilize video documentation that meets evidentiary standards.",
        },
        {
          heading: "Background Investigations",
          body: "Our comprehensive background checks go beyond standard database searches — we conduct physical records verification, interview-based reference checks, and thorough asset and identity verification for pre-employment and due diligence purposes.",
        },
        {
          heading: "Corporate Intelligence",
          body: "VSF provides competitive intelligence, internal theft investigations, employee misconduct investigations, and threat assessments for corporate clients. Our findings are delivered in detailed, professional reports.",
        },
      ],
      closing: "Contact Virginia Surveillance Force for confidential, professional investigation services across the DC Metro region.",
    },

    // 15 ── VIP EXECUTIVE PROTECTION & BODYGUARD ───────────────────────────────
    {
      slug: "vip-executive-protection-and-body-guard-service",
      title: "VIP Executive Protection & Body Guard Service",
      icon: "🕴️",
      image: "/images/services/services-15.jpg",
      excerpt: "Discreet, highly trained executive protection specialists securing VIPs, executives, and dignitaries.",
      intro: [
        "Virginia Surveillance Force provides elite executive protection and bodyguard services for corporate executives, dignitaries, celebrities, and high-net-worth individuals throughout Virginia, Maryland, and Washington DC.",
        "Our executive protection specialists are drawn from military, law enforcement, and intelligence backgrounds. They combine advanced threat assessment skills with the discretion and professional polish required in high-profile environments.",
      ],
      sections: [
        {
          heading: "Advance Planning & Threat Assessment",
          body: "Before any movement, VSF protection specialists conduct thorough advance work — assessing venues, travel routes, lodging, and event security to identify and mitigate potential threats before they materialize.",
        },
        {
          heading: "Close Protection Details",
          body: "Our close protection officers provide a discreet but impenetrable personal security presence. Whether in a boardroom, at a public event, or in transit, your principal's safety is our absolute priority.",
        },
        {
          heading: "Motorcade & Travel Security",
          body: "VSF coordinates secure transportation, motorcade operations, airport arrivals and departures, and hotel security for executives traveling throughout the DC Metro area and beyond.",
        },
      ],
      closing: "Virginia Surveillance Force delivers world-class executive protection with the discretion your principal deserves.",
    },

    // 16 ── MEDICAL & LEGAL COURIER AND DELIVERY ───────────────────────────────
    {
      slug: "courier-and-delivery",
      title: "Medical & Legal Courier and Delivery",
      icon: "📦",
      image: "/images/services/services-16.jpg",
      excerpt: "Secure, time-sensitive courier and document delivery services handled with chain-of-custody integrity.",
      intro: [
        "Virginia Surveillance Force provides secure courier and delivery services for businesses, law firms, government agencies, and financial institutions throughout Virginia, Maryland, and Washington DC.",
        "When the security and timely delivery of your documents, packages, or sensitive materials is non-negotiable, VSF couriers provide full chain-of-custody documentation and real-time tracking.",
      ],
      sections: [
        {
          heading: "Legal & Document Courier",
          body: "VSF is a trusted partner for law firms and court systems requiring secure, time-sensitive delivery of legal documents, filings, evidence, and contracts with documented proof of delivery.",
        },
        {
          heading: "Secure Package Delivery",
          body: "For sensitive business materials, medical specimens, financial documents, or valuable items, VSF couriers provide door-to-door secure delivery with full signature and documentation protocols.",
        },
        {
          heading: "Same-Day & Rush Service",
          body: "We offer same-day and rush delivery options for urgent requirements throughout the DC Metro area. Our dispatch team coordinates routing to ensure on-time delivery even under the tightest deadlines.",
        },
      ],
      closing: "Trust Virginia Surveillance Force for secure, reliable courier services throughout Virginia, Maryland, and Washington DC.",
    },
  ]
};
