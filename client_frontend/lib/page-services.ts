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

const COMMON_SERVICES_KEYWORDS = "security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia, Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia, 24/7 security services Virginia, Security patrol services Virginia, Fire watch services Virginia, Special police officers DC, Security guards Northern Virginia, security guards for hotels, security guards for hospitals, security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA";

export const defaultServicesPageData: ServicesPageData = {
  seo: {
    title: "Professional Security Services Maryland, Washington | Virginia Surveillance Force",
    description: "Virginia Surveillance Force delivers professional armed, unarmed, vehicle patrol, corporate, and special police security services tailored to protect clients across Maryland, Washington, and Virginia.",
    keywords: COMMON_SERVICES_KEYWORDS,
  },
  intro: {
    headline: "Professional Security Services — Available 24/7",
    contentHtml: `<p>Since 1987, <strong class="text-white font-semibold">Virginia Surveillance Force</strong> has provided professional security and protective services to businesses and organizations throughout Virginia, Maryland, and Washington, DC. Our experienced professionals deliver reliable, responsive protection tailored to your needs. From security officers and vehicle patrol to concierge and specialized protection, we are ready to help. Let us earn your trust and provide the peace of mind you deserve.</p>`
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
    // 1 ── ARMED & UNARMED SECURITY ──────────────────────────────────────────
    {
      slug: "armed-and-unarmed-security",
      title: "Armed & Unarmed Security",
      icon: "🛡️",
      image: "/uploads/services/service-permanent-or-temporary-security-1787851469646.jpg",
      excerpt: "Licensed, rigorously trained armed and unarmed security officers providing dependable, 24/7 protection tailored to your property and personnel.",
      seo: {
        title: "Armed & Unarmed Security Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides licensed armed and unarmed security guards across Virginia, Maryland, and Washington, DC. 24/7 professional protection—get a quote today!",
        keywords: "armed security guards Virginia, unarmed security services Maryland, licensed security officers Washington DC, private security guards DMV, 24/7 security protection",
      },
      intro: [
        "Virginia Surveillance Force provides top-tier armed and unarmed security guard services for businesses, residential communities, corporate facilities, and events across Virginia, Maryland, and Washington, DC.",
        "Whether you require a permanent full-time security presence or rapid deployment for temporary and short-notice assignments, VSF deploys certified, background-checked, and highly trained security officers tailored to your specific risk environment.",
        "Our security personnel are trained in threat assessment, conflict de-escalation, emergency response, and proactive property protection, giving you total peace of mind around the clock.",
      ],
      staffingHeading: "ARMED & UNARMED SECURITY OPTIONS",
      staffingIntro: "We offer flexible security guard solutions customized to match your facility's operational requirements:",
      staffingOptions: [
        "Armed Security Officers (Licensed & DCJS / State Certified)",
        "Unarmed Uniformed Security Guards",
        "Plainclothes & Discreet Security Personnel",
        "Temporary, Event & Emergency Response Guard Coverage",
      ],
      sections: [
        {
          heading: "Permanent Security Coverage",
          body: "Our permanent security officers become familiar with your property, personnel, procedures, and specific security requirements. This familiarity creates consistency, accountability, and a dependable security presence you can count on every day.",
        },
        {
          heading: "Temporary & Short-Term Security",
          body: "Need security coverage on short notice? VSF provides temporary and short-term security for special events, seasonal needs, unexpected staffing gaps, and other short-term assignments. We provide dependable security personnel when you need them most.",
        },
        {
          heading: "Armed & Unarmed Security",
          body: "We provide both armed and unarmed security officers based on your property’s needs, assignment requirements, and applicable regulations. Our security professionals are trained, licensed as required, and expected to maintain a professional, alert, and service-focused presence.",
        },
      ],
      closing: "Partner with Virginia Surveillance Force for reliable, licensed armed and unarmed security officers across Virginia, Maryland, and Washington, DC. Contact our team today for a customized security proposal.",
    },

    // 2 ── VEHICLE PATROL SERVICES ───────────────────────────────────────────
    {
      slug: "vehicle-patrol-services",
      title: "Vehicle Patrol Services",
      icon: "🚔",
      image: "/uploads/services/service-vehicle-patrol-1787851469644.jpg",
      excerpt: "High-visibility marked and unmarked mobile security patrols offering rapid incident response, random inspections, and multi-site coverage.",
      seo: {
        title: "Vehicle Patrol Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional vehicle patrol services designed to deter criminal activity, protect property, and provide a visible security presence across Northern Virginia, Suburban Maryland, and Washington, DC.",
        keywords: "vehicle patrol service Virginia, mobile security patrols Maryland, security patrol cars Washington DC, parking lot patrol DMV, commercial security patrols",
      },
      intro: [
        "Virginia Surveillance Force provides professional vehicle patrol services designed to deter criminal activity, protect property, and provide a visible security presence.",
        "What Is Vehicle Patrol? Security officers use marked or unmarked patrol vehicles to regularly check your property, parking areas, buildings, entrances, and surrounding areas.",
        "How Does It Work? Patrols can be scheduled or randomized, or a dedicated patrol vehicle and officer can be assigned to your property based on your security needs.",
        "Why Choose Vehicle Patrol? Vehicle patrol provides visible deterrence, early detection of problems, property protection, accountability, and peace of mind.",
      ],
      staffingHeading: "VEHICLE PATROL HIGHLIGHTS",
      staffingIntro: "Key benefits of our vehicle patrol programs include:",
      staffingOptions: [
        "Scheduled & Randomized Patrols",
        "Marked & Unmarked Vehicles",
        "Detailed Reporting",
        "24/7/365 Coverage",
      ],
      sections: [
        {
          heading: "Marked & Unmarked Vehicles",
          body: "We use marked vehicles for a strong, visible security presence and unmarked vehicles for discreet patrol and observation, based on your property’s security needs.",
        },
        {
          heading: "Patrol Services Include",
          body: "Our patrol officers conduct thorough property checks of buildings, parking areas, garages, perimeters, gates, lighting, and access points. We look for suspicious activity, safety concerns, damage, and signs of unauthorized access, helping identify potential problems early and keep your property protected.",
        },
        {
          heading: "Patrol Coverage Areas",
          body: "VSF Vehicle Patrol provides reliable security patrol coverage throughout Northern Virginia, Suburban Maryland, and Washington, DC, serving businesses, commercial properties, parking facilities, and multi-site locations.",
        },
      ],
      closing: "Virginia Surveillance Force is your trusted partner for professional vehicle patrol services across Virginia, Maryland, and Washington, DC. Contact us today to request a quote.",
    },

    // 3 ── OFFICE & CORPORATE SECURITY ───────────────────────────────────────
    {
      slug: "office-and-corporate-security",
      title: "Office & Corporate Security",
      icon: "💼",
      image: "/uploads/services/service-office-and-corporate-security-1787851469648.jpg",
      excerpt: "Virginia Surveillance Force provides professional security services designed to protect employees, visitors, facilities, assets, and business operations while maintaining a safe and professional environment.",
      seo: {
        title: "Office & Corporate Security Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional security services designed to protect employees, visitors, facilities, assets, and business operations across Virginia, Maryland, and Washington, DC.",
        keywords: "corporate security services Virginia, office building security Maryland, corporate headquarters security Washington DC, business security guard DMV",
      },
      intro: [
        "Virginia Surveillance Force provides professional security services designed to protect employees, visitors, facilities, assets, and business operations while maintaining a safe and professional environment.",
        "What Is Office & Corporate Security? Our trained security officers provide a professional and discreet security presence at offices and corporate facilities, helping control access, monitor the property, identify security concerns, and respond to incidents.",
        "How Does It Work? Security coverage can be customized to your facility, including scheduled shifts, lobby coverage, access control, patrols, and after-hours protection.",
        "Why Choose Office & Corporate Security? Our services help provide deterrence, employee and visitor safety, access control, property protection, accountability, and peace of mind.",
      ],
      staffingHeading: "OFFICE & CORPORATE SECURITY HIGHLIGHTS",
      staffingIntro: "Key features and capabilities of our corporate security services include:",
      staffingOptions: [
        "Professional Officers",
        "Access Control",
        "Visitor Management",
        "Building Patrols",
        "Incident Response",
        "Detailed Reporting",
      ],
      sections: [
        {
          heading: "Access Control & Visitor Management",
          body: "Our officers manage entry points, verify credentials, maintain visitor logs, and help ensure that only authorized individuals enter your facility.",
        },
        {
          heading: "Executive & Employee Protection",
          body: "VSF provides a professional security presence throughout your facility, helping protect employees, executives, visitors, and business operations through lobby security, floor checks, and security response.",
        },
        {
          heading: "After-Hours Security",
          body: "Protect your facility when your employees are gone. VSF provides overnight security, lock-up checks, alarm response, and regular patrols to help protect your property and assets around the clock.",
        },
      ],
      closing: "Virginia Surveillance Force delivers professional corporate security solutions tailored to your organization across Virginia, Maryland, and Washington, DC. Contact us today to request a quote.",
    },

    // 4 ── CONCIERGE & FRONT DESK SERVICES ───────────────────────────────────
    {
      slug: "concierge-and-front-desk-services",
      title: "Concierge & Front Desk Services",
      icon: "🏢",
      image: "/uploads/services/service-concierge-and-frontdesk-1787851469640.jpg",
      excerpt: "Exceptional front-desk concierge and lobby staffing combining high-end customer service with vigilant property security.",
      seo: {
        title: "Concierge & Front Desk Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides premium concierge and front desk staffing solutions across Washington DC, Maryland, and Virginia. Elevate your property today.",
        keywords: "front desk security DC, concierge security services Virginia, lobby concierge Maryland, apartment concierge security DMV",
      },
      intro: [
        "Virginia Surveillance Force Concierge & Front Desk Services provide residential communities, commercial office buildings, and corporate facilities with a polished combination of first-class hospitality and front-of-house operations.",
        "A property's front desk is the initial touchpoint for residents, tenants, and visitors. Our concierge staff present an immaculate, professional image while providing attentive assistance and maintaining building order.",
        "With VSF concierge and administrative personnel handling front-of-house operations, property managers experience higher tenant satisfaction, enhanced safety, and smooth daily operations.",
      ],
      staffingHeading: "CONCIERGE & FRONT DESK STAFFING OPTIONS",
      staffingIntro: "We provide specialized front-of-house and administrative professionals tailored to your building:",
      staffingOptions: [
        "Traditional Lobby Concierge",
        "Administrative Assistant",
        "Front Desk & Lobby Attendant",
        "Parking Attendant",
      ],
      sections: [
        {
          heading: "Traditional Lobby Concierge",
          body: "Our concierge professionals provide a welcoming and professional presence in your lobby while assisting tenants and visitors, handling concierge requests, coordinating with property management, and supporting daily building operations.",
        },
        {
          heading: "Administrative Assistant",
          body: "Our administrative support professionals assist businesses and property management teams with front desk and office support, scheduling, correspondence, document handling, and other administrative tasks as needed.",
        },
        {
          heading: "Front Desk & Lobby Attendant",
          body: "Our attendants provide a professional first point of contact for tenants, visitors, and guests. They assist with general inquiries, monitor the lobby, support building operations, and help maintain a welcoming environment.",
        },
        {
          heading: "Parking Attendant",
          body: "Our parking attendants provide a professional presence in parking areas and garages, assist tenants and visitors, help direct vehicles, maintain orderly parking operations, and collect parking fees when assigned by the client.",
        },
      ],
      closing: "Enhance your building's atmosphere and security with Virginia Surveillance Force concierge and front desk professionals across Virginia, Maryland, and Washington, DC. Contact us today.",
    },

    // 5 ── RESIDENTIAL & GATED COMMUNITY SECURITY ────────────────────────────
    {
      slug: "residential-and-gated-community-security",
      title: "Residential & Gated Community Security",
      icon: "🏘️",
      image: "/uploads/services/service-residential-and-gated-communities-1787851469653.jpg",
      excerpt: "Virginia Surveillance Force provides professional security services for residential communities, homeowners associations, apartment complexes, condominiums, and gated communities, helping protect residents, visitors, and property.",
      seo: {
        title: "Residential & Gated Community Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional security services for residential communities, HOAs, apartments, condominiums, and gated communities across Virginia, Maryland, and Washington, DC.",
        keywords: "residential security Virginia, gated community security Maryland, HOA security guards Washington DC, apartment security patrol DMV",
      },
      intro: [
        "Virginia Surveillance Force provides professional security services for residential communities, homeowners associations, apartment complexes, condominiums, and gated communities, helping protect residents, visitors, and property.",
        "Our security officers provide a visible and professional presence, monitor access points, conduct property patrols, identify security concerns, and respond to incidents while maintaining a respectful relationship with residents.",
        "Why Choose VSF for Your Residential Community? Our residential security services help provide crime deterrence, access control, property protection, resident safety, and peace of mind. We also provide vehicle patrol services and dedicated on-site patrol vehicles for larger properties, providing a strong visible presence and helping deter unauthorized activity and intruders.",
      ],
      staffingHeading: "RESIDENTIAL SECURITY HIGHLIGHTS",
      staffingIntro: "Key components of our residential community protection programs include:",
      staffingOptions: [
        "Gate & Access Control",
        "Foot & Vehicle Patrols",
        "Incident & Complaint Response",
        "Dedicated On-Site Patrol Vehicles",
        "Community Partnership & Support",
        "24/7/365 Coverage",
      ],
      sections: [
        {
          heading: "Gate & Access Control",
          body: "VSF officers manage gatehouse operations, verify resident and visitor access, maintain access logs, and help ensure that only authorized individuals enter the community. We work with management to maintain secure and efficient access around the clock.",
        },
        {
          heading: "Patrol & Incident Response",
          body: "Our officers conduct regular foot and vehicle patrols of parking areas, common spaces, amenities, and building perimeters. We document incidents, respond to security concerns, and coordinate with law enforcement when necessary.",
        },
        {
          heading: "Community Partnership",
          body: "Our officers provide a professional, visible, and approachable presence within the community. They assist residents, report maintenance and safety concerns, and help create a safe and welcoming environment for residents and visitors.",
        },
      ],
      closing: "Provide your community with the peace of mind and protection it deserves. Contact Virginia Surveillance Force today to create a tailored residential security plan.",
    },

    // 6 ── RETAIL, SHOPPING CENTERS, MALL & COMMERCIAL SECURITY ──────────────
    {
      slug: "retail-shopping-centers-mall-commercial-security",
      title: "Retail, Shopping Centers, Mall & Commercial Security",
      icon: "🏬",
      image: "/images/services/services-6.jpg",
      excerpt: "Virginia Surveillance Force provides professional security services for retail stores, shopping centers, malls, and commercial properties, helping protect customers, employees, visitors, property, inventory, and business operations.",
      seo: {
        title: "Retail, Shopping Centers, Mall & Commercial Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional security services for retail stores, shopping centers, malls, and commercial properties across Virginia, Maryland, and Washington, DC.",
        keywords: "retail security guards Virginia, shopping mall security Maryland, commercial center security Washington DC, loss prevention officers DMV",
      },
      intro: [
        "Virginia Surveillance Force provides professional security services for retail stores, shopping centers, malls, and commercial properties, helping protect customers, employees, visitors, property, inventory, and business operations.",
        "Our trained security officers provide a visible and professional security presence, monitor entrances and access points, conduct foot and vehicle patrols, identify suspicious activity, assist with loss prevention, monitor loading docks and service areas, and respond to security concerns.",
        "Why Choose VSF for Your Retail, Commercial, Mall, or Shopping Center Property? Our services help provide crime deterrence, loss prevention, access control, property protection, incident response, and peace of mind.",
      ],
      staffingHeading: "RETAIL & COMMERCIAL SECURITY HIGHLIGHTS",
      staffingIntro: "Key protection capabilities for retail and commercial properties:",
      staffingOptions: [
        "Crime Deterrence & Loss Prevention",
        "Store & Common Area Monitoring",
        "Loading Dock & Service Area Security",
        "Foot & Vehicle Patrols",
        "Parking Lot & Perimeter Coverage",
        "Incident Response & Detailed Reporting",
      ],
      sections: [
        {
          heading: "Retail, Mall & Shopping Center Security",
          body: "VSF provides uniformed and plainclothes security officers for retail stores, malls, and shopping centers. Our officers help deter theft, trespassing, unauthorized activity, and disturbances, monitor stores and common areas, secure loading docks and service areas, conduct foot and vehicle patrols, assist with loss prevention, and respond to security concerns throughout your property.",
        },
        {
          heading: "Commercial Property & Facility Security",
          body: "We help protect commercial properties, facilities, employees, and visitors through access control, perimeter security, loading dock monitoring, and scheduled or around-the-clock patrols. Officers monitor employee and contractor access, track personnel entering and leaving, control delivery access, and identify unauthorized activity, trespassing, security concerns, and safety issues.",
        },
        {
          heading: "Parking Lot & Perimeter Security",
          body: "VSF provides vehicle and foot patrols for parking lots, garages, loading docks, and property perimeters, helping deter theft, trespassing, vandalism, unauthorized activity, and other security concerns.",
        },
      ],
      closing: "Keep your retail, mall, or commercial center secure, compliant, and inviting for customers. Contact Virginia Surveillance Force today for a comprehensive commercial retail security assessment.",
    },

    // 7 ── WAREHOUSE & INDUSTRIAL SECURITY ───────────────────────────────────
    {
      slug: "warehouse-and-industrial-security",
      title: "Warehouse & Industrial Security",
      icon: "🏭",
      image: "/images/services/services-6.jpg",
      excerpt: "Virginia Surveillance Force provides professional security services for retail stores, shopping centers, malls, commercial properties, warehouses, and industrial facilities, helping protect customers, employees, visitors, property, inventory, and business operations.",
      seo: {
        title: "Warehouse & Industrial Security Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional security services for warehouses, industrial facilities, and distribution centers across Virginia, Maryland, and DC.",
        keywords: "warehouse security Virginia, industrial security Maryland, distribution center security DC, logistics facility guard services",
      },
      intro: [
        "Virginia Surveillance Force provides professional security services for retail stores, shopping centers, malls, commercial properties, warehouses, and industrial facilities, helping protect customers, employees, visitors, property, inventory, and business operations.",
        "Our trained security officers provide a visible and professional security presence, monitor entrances and access points, conduct foot and vehicle patrols, identify suspicious activity, assist with loss prevention, monitor loading docks and entrances, and respond to security concerns.",
        "Why Choose VSF for Your Retail, Commercial, Industrial, Mall, Shopping Center, or Warehouse Property? Our services help provide crime deterrence, loss prevention, access control, property protection, incident response, and peace of mind.",
      ],
      staffingHeading: "INDUSTRIAL & WAREHOUSE SECURITY HIGHLIGHTS",
      staffingIntro: "Specialized protection capabilities for industrial and warehouse environments:",
      staffingOptions: [
        "Access Control & Personnel Tracking",
        "Perimeter & Yard Security",
        "Loading Dock & Entrance Monitoring",
        "Inventory & Equipment Protection",
        "Foot & Vehicle Patrols",
        "Safety & Incident Reporting",
      ],
      sections: [
        {
          heading: "Retail, Mall & Shopping Center Security",
          body: "VSF provides uniformed and plainclothes security officers for retail stores, malls, and shopping centers. Our officers help deter theft, trespassing, unauthorized activity, and disturbances, monitor stores and common areas, secure loading docks and service areas, conduct foot and vehicle patrols, assist with loss prevention, and respond to security concerns throughout your property.",
        },
        {
          heading: "Warehouse, Industrial & Commercial Security",
          body: "We help protect inventory, equipment, employees, visitors, and facilities through access control, perimeter security, loading dock monitoring, and scheduled or around-the-clock patrols. Officers monitor employee and contractor access, track personnel entering and leaving, control loading dock access, and identify unauthorized activity, trespassing, security concerns, and safety issues.",
        },
        {
          heading: "Parking Lot & Perimeter Security",
          body: "VSF provides vehicle and foot patrols for parking lots, garages, loading docks, and property perimeters, helping deter theft, trespassing, vandalism, unauthorized activity, and other security concerns.",
        },
      ],
      closing: "Secure your warehouse, distribution center, or industrial facility with Virginia Surveillance Force. Contact our industrial security team today to discuss your facility's requirements.",
    },

    // 8 ── HOTEL, MOTEL & RESORT SECURITY ────────────────────────────────────
    {
      slug: "hotel-motel-and-resort-security",
      title: "Hotel, Motel & Resort Security",
      icon: "🏨",
      image: "/uploads/services/service-hotel-motel-and-resorts-1787851469649.jpg",
      excerpt: "Virginia Surveillance Force provides professional security services for hotels, motels, and resorts, helping protect guests, employees, visitors, property, and business operations while maintaining a welcoming environment.",
      seo: {
        title: "Hotel, Motel & Resort Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides professional security services for hotels, motels, and resorts across Virginia, Maryland, and Washington, DC.",
        keywords: "hotel security guards Virginia, resort security Maryland, motel security Washington DC, hospitality security officers DMV",
      },
      intro: [
        "Virginia Surveillance Force provides professional security services for hotels, motels, and resorts, helping protect guests, employees, visitors, property, and business operations while maintaining a welcoming environment.",
        "Our trained security officers provide a visible and professional presence, monitor entrances and common areas, conduct interior and exterior patrols, address unauthorized access and disturbances, monitor parking areas, respond to security concerns, and assist with emergency situations.",
        "Why Choose VSF for Your Hotel, Motel, or Resort? Our hospitality security services help provide guest safety, crime deterrence, access control, property protection, incident response, and peace of mind.",
      ],
      staffingHeading: "HOTEL & RESORT SECURITY HIGHLIGHTS",
      staffingIntro: "Key capabilities of our hotel, motel, and resort security programs include:",
      staffingOptions: [
        "Hotel & Guest Security",
        "Parking & Property Patrol",
        "Guest Corridor & Common Area Checks",
        "Access Control & Keycard Verification",
        "Discreet Disturbance De-Escalation",
        "Emergency & Medical Response",
      ],
      sections: [
        {
          heading: "Guest & Staff Safety",
          body: "Our officers conduct regular patrols of guest corridors, lobbies, pool areas, parking lots, and common spaces. We respond to disturbances professionally and discreetly, helping maintain a safe and welcoming environment for guests and staff.",
        },
        {
          heading: "Access Control",
          body: "VSF monitors entrances and exits, verifies guest credentials when required, and manages after-hours door security to help prevent unauthorized access to guest floors and restricted areas.",
        },
        {
          heading: "Emergency Response",
          body: "Our officers are trained to respond to medical emergencies, fire evacuations, disturbances, and criminal incidents, coordinating with local emergency services and helping protect your guests, staff, property, and reputation.",
        },
      ],
      closing: "Protect your guests, staff, and reputation with Virginia Surveillance Force. Contact us today for a hospitality security proposal tailored to your hotel or resort.",
    },

    // 9 ── GOVERNMENT & DIPLOMATIC SECURITY ──────────────────────────────────
    {
      slug: "government-and-diplomatic-security",
      title: "Government & Diplomatic Security",
      icon: "🏛️",
      image: "/uploads/services/service-government-and-diplomat-facilities-1787851469658.jpg",
      excerpt: "Virginia Surveillance Force provides security services for government buildings, diplomatic facilities, embassies, federal offices, and diplomatic residences throughout Virginia, Maryland, and Washington, DC.",
      seo: {
        title: "Government & Diplomatic Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides security services for government buildings, diplomatic facilities, embassies, federal offices, and diplomatic residences across Virginia, Maryland, and Washington, DC.",
        keywords: "government security contractors DC, embassy security guards Maryland, diplomatic security Virginia, federal facility protection DMV",
      },
      intro: [
        "Virginia Surveillance Force provides security services for government buildings, diplomatic facilities, embassies, federal offices, and diplomatic residences throughout Virginia, Maryland, and Washington, DC.",
        "Our government and diplomatic security officers meet high standards of professionalism, background screening, and specialized training required for these sensitive environments. VSF understands the unique protocols, clearance requirements, and heightened security posture these facilities demand.",
      ],
      staffingHeading: "GOVERNMENT & DIPLOMATIC SECURITY SERVICES",
      staffingIntro: "Specialized capabilities for diplomatic and government environments:",
      staffingOptions: [
        "Access & Visitor Management",
        "Perimeter & Facility Security",
        "Diplomatic Residence Security",
        "Executive & Personal Protection",
        "Emergency Response",
      ],
      sections: [
        {
          heading: "Security Clearance & Vetting",
          body: "VSF officers assigned to government and diplomatic facilities undergo comprehensive background screening, drug screening, and any required security clearance processes in accordance with client and facility requirements. Our personnel are selected and prepared to meet the security standards of sensitive assignments.",
        },
        {
          heading: "Access Control & Credentialing",
          body: "We provide strict access and visitor management, including entrance and exit monitoring, visitor screening, credential verification, access logs, and control of restricted areas. Officers may also monitor CCTV and electronic security systems in accordance with facility-specific security requirements.",
        },
        {
          heading: "Diplomatic & Protective Security",
          body: "VSF provides discreet, professional security for diplomatic facilities, embassies, and diplomatic residences, including perimeter and property security. We also provide executive and personal protection specialists for ambassadors, government officials, diplomatic personnel, and their families. Our personnel respond to security incidents and emergencies while coordinating with appropriate law enforcement and emergency services when required.",
        },
      ],
      closing: "Virginia Surveillance Force provides trusted security solutions for diplomatic and government facilities across Virginia, Maryland, and Washington, DC. Contact our team to discuss your mission requirements.",
    },

    // 10 ── HEALTHCARE & HOSPITAL SECURITY ───────────────────────────────────
    {
      slug: "healthcare-and-hospital-security",
      title: "Healthcare & Hospital Security",
      icon: "🏥",
      image: "/uploads/services/service-hospital-and-health-care-facilities-1787851469655.jpg",
      excerpt: "Virginia Surveillance Force delivers specialized security services for hospitals, medical centers, emergency departments, outpatient clinics, and senior care facilities throughout Virginia, Maryland, and Washington, DC.",
      seo: {
        title: "Healthcare & Hospital Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force delivers specialized security services for hospitals, medical centers, emergency departments, and clinics across Virginia, Maryland, and DC.",
        keywords: "hospital security guards Virginia, healthcare security Maryland, emergency room security DC, clinic security officers DMV",
      },
      intro: [
        "Virginia Surveillance Force delivers specialized security services for hospitals, medical centers, emergency departments, outpatient clinics, and senior care facilities throughout Virginia, Maryland, and Washington, DC.",
        "Healthcare facilities require security that protects patients, staff, visitors, and property while maintaining a safe, respectful, and professional environment. Our trained security officers provide a visible presence, respond to security concerns, and help maintain a secure environment without disrupting patient care.",
        "Our healthcare security personnel are trained in crisis intervention, de-escalation, patient elopement prevention, HIPAA privacy protocols, and emergency department safety management.",
      ],
      staffingHeading: "HEALTHCARE SECURITY SOLUTIONS",
      staffingIntro: "Specialized security solutions for hospitals and healthcare facilities:",
      staffingOptions: [
        "Emergency Department (ED / ER) Dedicated Security Officers",
        "Hospital Floor, Pharmacy & Maternity Ward Access Control Guards",
        "Patient Standby / 1-on-1 Safety Watch Attendants",
        "Campus Parking Deck & Ambulance Bay Traffic Control Officers",
      ],
      sections: [
        {
          heading: "Workplace Violence Prevention & De-Escalation",
          body: "Our officers are trained in verbal de-escalation and crisis-response techniques designed to help defuse aggressive behavior and support a safe environment for patients, doctors, nurses, staff, and visitors.",
        },
        {
          heading: "Sensitive Area Access Control & Pharmacy Protection",
          body: "We help protect pharmaceuticals, maternity and pediatric areas, psychiatric units, and medical records areas through controlled access, credentialing, security monitoring, and professional security presence.",
        },
        {
          heading: "Patient Elopement & Code Response",
          body: "Our officers are trained to respond to hospital emergency codes and support clinical staff during psychiatric emergencies, patient elopement incidents, and other facility-wide security events.",
        },
      ],
      closing: "Ensure your healthcare facility remains a secure, therapeutic healing environment. Contact Virginia Surveillance Force today for hospital security solutions.",
    },

    // 11 ── SCHOOL, COLLEGE & UNIVERSITY SECURITY ────────────────────────────
    {
      slug: "school-college-and-university-security",
      title: "School, College & University Security",
      icon: "🎓",
      image: "/uploads/services/service-schools-colleges-and-universities-1787851469657.jpg",
      excerpt: "Virginia Surveillance Force provides comprehensive campus security services for private schools, K–12 academies, colleges, universities, and trade schools throughout Virginia, Maryland, and Washington, DC.",
      seo: {
        title: "School, College & University Security | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides comprehensive campus security services for private schools, K-12 academies, colleges, and universities across Virginia, Maryland, and DC.",
        keywords: "school security guards Virginia, college campus security Maryland, university security officers DC, private school safety DMV",
      },
      intro: [
        "Virginia Surveillance Force provides comprehensive campus security services for private schools, K–12 academies, colleges, universities, and trade schools throughout Virginia, Maryland, and Washington, DC.",
        "We help create a safe, secure learning environment where students can learn and educators can focus on teaching. Our trained and professional officers provide a visible security presence while working respectfully with students, staff, parents, visitors, and campus personnel.",
        "Our campus security personnel are trained to support access control, visitor management, emergency response, student de-escalation, campus patrols, and athletic event security, helping schools address security concerns while maintaining a welcoming environment.",
      ],
      staffingHeading: "ACADEMIC & CAMPUS STAFFING",
      staffingIntro: "Security solutions tailored to school campuses and higher education facilities:",
      staffingOptions: [
        "Campus Safety & Gatehouse Access Officers",
        "Dormitory, Residence Hall & Library Security Officers",
        "Athletic Event, Graduation & Campus Event Security",
        "School Morning Drop-Off & Afternoon Dismissal Traffic Safety",
      ],
      sections: [
        {
          heading: "Proactive Campus Perimeter & Visitor Screening",
          body: "VSF helps schools maintain controlled campus access by monitoring entrances, verifying student and visitor credentials, deterring unauthorized entry, and maintaining a visible security presence throughout school grounds and perimeter areas.",
        },
        {
          heading: "Emergency Preparedness & Response",
          body: "Our officers support school emergency procedures, including lockdowns, evacuations, emergency drills, and critical incident response, working closely with school administrators and emergency responders when needed.",
        },
        {
          heading: "Student Safety & Conflict De-Escalation",
          body: "Our officers provide a professional, approachable presence while helping identify conflicts, disruptive behavior, and potential safety concerns early. Using appropriate de-escalation techniques, they help maintain a safe and orderly learning environment for students and staff.",
        },
      ],
      closing: "Safeguard your school community with Virginia Surveillance Force campus security. Contact our education security team today for a tailored security consultation.",
    },

    // 12 ── VIP EXECUTIVE PROTECTION & BODYGUARD SERVICES ────────────────────
    {
      slug: "vip-executive-protection-and-bodyguard-services",
      title: "VIP Executive Protection & Bodyguard Services",
      icon: "🕴️",
      image: "/images/services/services-15.jpg",
      excerpt: "Virginia Surveillance Force provides discreet, professional executive protection and bodyguard services for C-suite executives, foreign dignitaries, public figures, high-profile individuals, and high-net-worth families.",
      seo: {
        title: "Executive Protection & Bodyguard Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides discreet, professional executive protection and bodyguard services across Virginia, Maryland, Washington, DC, and beyond.",
        keywords: "executive protection Washington DC, bodyguard services Virginia, VIP protection Maryland, close protection officers DMV",
      },
      intro: [
        "Virginia Surveillance Force provides discreet, professional executive protection and bodyguard services for C-suite executives, foreign dignitaries, public figures, high-profile individuals, and high-net-worth families throughout Virginia, Maryland, Washington, DC, and beyond.",
        "Our protection specialists provide personal security, advance planning, threat awareness, secure transportation support, and close protection tailored to each client’s schedule, lifestyle, and security requirements.",
        "We emphasize discretion, professionalism, and careful planning, allowing clients and their families to conduct business, travel, and daily activities with confidence while maintaining privacy and minimizing disruption.",
      ],
      staffingHeading: "EXECUTIVE PROTECTION SERVICES",
      staffingIntro: "Customized protection solutions designed for executives, dignitaries, high-profile individuals, and their families:",
      staffingOptions: [
        "Dedicated Executive Protection Specialists",
        "Advance Planning, Route & Venue Security Assessments",
        "Secure Executive Transportation & Motorcade Support",
        "Residential Estate & Family Protection",
      ],
      sections: [
        {
          heading: "Advance Planning & Venue Reconnaissance",
          body: "Before each assignment, our protection specialists assess travel routes, venues, entrances, exits, emergency medical facilities, and other key security considerations to help ensure a well-planned protective operation.",
        },
        {
          heading: "Discreet Close Protection",
          body: "Our protection specialists provide professional, low-profile protection designed to keep principals safe while minimizing disruption to their business, travel, and personal activities.",
        },
        {
          heading: "Secure Transportation & Motorcade Support",
          body: "VSF provides secure executive transportation, professional protective driving, motorcade support, and airport transfers, with services tailored to the principal’s schedule, destination, and security requirements.",
        },
      ],
      closing: "Protect your life, family, and executive team with Virginia Surveillance Force elite protection services. Contact our executive security director for confidential consultations.",
    },

    // 13 ── SPECIAL POLICE SERVICES ──────────────────────────────────────────
    {
      slug: "special-police-services",
      title: "Special Police Services",
      icon: "⭐",
      image: "/images/services/services-4.jpg",
      excerpt: "Virginia Surveillance Force provides professionally trained Special Police Officers (SPOs) and Special Conservators of the Peace (SCOPs) delivering authorized enforcement and enhanced protection.",
      seo: {
        title: "Special Police & SCOP Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides commissioned Special Police Officers (SPOs) and Special Conservators of the Peace (SCOPs) across DC, Maryland, and Virginia.",
        keywords: "Special Police Officers DC, SPO security Maryland, SCOP Virginia, Special Conservator of the Peace, commissioned police DMV",
      },
      intro: [
        "Virginia Surveillance Force provides professionally trained Special Police Officers (SPOs) for clients who require enhanced security, authorized enforcement authority, and a stronger on-site security presence. Our officers serve commercial properties, government facilities, healthcare facilities, diplomatic locations, and other high-security environments throughout Maryland and Washington, DC. In Virginia, VSF provides Special Conservators of the Peace (SCOPs) as authorized by applicable Virginia law.",
        "Special Police Officers provide more than a visible security presence. Where authorized by law and their specific commission or appointment, they may exercise applicable arrest and law-enforcement powers on designated client property.",
        "Our officers receive specialized training in defensive tactics, emergency response, de-escalation, firearms, applicable laws, incident response, and professional security procedures, as required for their assignments.",
      ],
      staffingHeading: "SPECIAL POLICE & SPECIAL CONSERVATOR OF THE PEACE CAPABILITIES",
      staffingIntro: "Commissioned Special Police and Special Conservator of the Peace (SCOP) services for commercial, institutional, government, and other qualified clients:",
      staffingOptions: [
        "Armed Special Police & SCOP Officers with Authorized Enforcement Powers",
        "Marked Cruiser & Patrol Units for Large Facilities",
        "Critical Infrastructure & High-Value Asset Protection",
        "Specialized Security & Incident Response",
      ],
      sections: [
        {
          heading: "Statutory Law Enforcement Authority",
          body: "Our Special Police Officers and Special Conservators of the Peace (SCOPs) hold legal commissions or appointments that provide authorized enforcement powers within the scope of their authority and applicable law.",
        },
        {
          heading: "Strong Visible Security Presence",
          body: "Our Special Police Officers and SCOPs maintain a professional, highly visible security presence with authorized uniforms and equipment designed to deter criminal activity and enhance safety on protected premises.",
        },
        {
          heading: "Law Enforcement Coordination",
          body: "Our Special Police Officers and SCOPs coordinate with local law enforcement and emergency services when required, supporting incident reporting, evidence preservation, and appropriate follow-up.",
        },
      ],
      closing: "When your property requires more than traditional security, VSF provides commissioned Special Police Officers and Special Conservators of the Peace with authorized enforcement capabilities tailored to your security needs.",
    },

    // 14 ── ALARM RESPONSE SERVICES ──────────────────────────────────────────
    {
      slug: "alarm-response-services",
      title: "Alarm Response Services",
      icon: "🚨",
      image: "/uploads/services/service-alarm-response-1787851469660.jpg",
      excerpt: "Rapid-dispatch mobile security responders verifying triggered alarms, inspecting premises, and securing properties 24/7/365.",
      seo: {
        title: "Alarm Response Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides 24/7 rapid alarm response services across Virginia, Maryland, and Washington DC. Protect your property—request a quote today!",
        keywords: "alarm response services Virginia, commercial alarm responder Maryland, 24/7 alarm dispatch DC, emergency security response DMV",
      },
      intro: [
        "Virginia Surveillance Force provides rapid, 24/7 Alarm Response Services for commercial, industrial, and residential properties across Virginia, Maryland, and Washington, DC.",
        "When an alarm triggers in the middle of the night, dispatching a trained, armed security professional prevents property owners and employees from placing themselves in harm's way.",
        "Our mobile response officers are strategically positioned across the region to provide rapid on-site arrival, investigate the alarm source, secure breached entry points, and coordinate with police.",
      ],
      staffingHeading: "ALARM RESPONSE CAPABILITIES",
      staffingIntro: "Comprehensive rapid-dispatch alarm protection services:",
      staffingOptions: [
        "24/7 Priority Emergency Alarm Dispatch",
        "Commercial & Industrial Intrusion / Motion Alarm Response",
        "False Alarm Mitigation & Police Fine Prevention",
        "Post-Break-In Property Board-Up & Standing Guard Relief",
      ],
      sections: [
        {
          heading: "Rapid Physical Site Inspection",
          body: "Upon arrival, our responders inspect all doors, windows, roof access points, and loading docks for signs of forced entry, vandalism, or trespassing.",
        },
        {
          heading: "Eliminate Costly False Alarm Fines",
          body: "Municipalities charge steep penalties for false police dispatches. VSF verifies the situation on-site, only summoning law enforcement when an actual crime or emergency occurs.",
        },
        {
          heading: "Complete Property Securing & Reporting",
          body: "If damage is discovered, our officers remain on-site, secure the perimeter, coordinate emergency boarding services, and deliver a detailed photo report to ownership.",
        },
      ],
      closing: "Never send an untrained employee to inspect a late-night alarm again. Trust Virginia Surveillance Force for dependable 24/7 alarm response services. Contact us today.",
    },

    // 15 ── INVESTIGATIONS & INTELLIGENCE ────────────────────────────────────
    {
      slug: "investigations-and-intelligence",
      title: "Investigations & Intelligence",
      icon: "🔍",
      image: "/images/services/services-14.jpg",
      excerpt: "Licensed private investigators delivering covert surveillance, comprehensive background checks, and actionable corporate intelligence.",
      seo: {
        title: "Investigations & Intelligence Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides licensed private investigation and corporate intelligence services across MD, DC, and VA. Inquire confidentially today.",
        keywords: "private investigator Virginia, corporate intelligence Maryland, private detective Washington DC, background checks DMV, fraud investigation",
      },
      intro: [
        "Virginia Surveillance Force provides licensed, confidential Private Investigation and Corporate Intelligence services for law firms, corporations, insurance carriers, and individuals across Virginia, Maryland, and Washington, DC.",
        "Our investigative division is staffed by former federal agents, law enforcement detectives, and forensic intelligence specialists who uncover critical facts with discretion and legal precision.",
        "We deliver legally admissible evidence, comprehensive written dossiers, and high-definition video documentation suitable for courtroom litigation and corporate decision-making.",
      ],
      staffingHeading: "INVESTIGATIVE CAPABILITIES",
      staffingIntro: "Licensed private investigative services tailored to your legal and corporate needs:",
      staffingOptions: [
        "Covert Physical & Mobile Video Surveillance",
        "Comprehensive Pre-Employment & Executive Background Checks",
        "Corporate Fraud, Embezzlement & Internal Theft Investigations",
        "Litigation Support, Witness Interviews & Due Diligence Research",
      ],
      sections: [
        {
          heading: "High-Definition Covert Surveillance",
          body: "Our investigators utilize cutting-edge surveillance technology, covert vehicles, and long-range optics to document insurance fraud, infidelity, and corporate misconduct.",
        },
        {
          heading: "Deep Background & Asset Searches",
          body: "We access proprietary databases and conduct boots-on-the-ground verification of criminal histories, financial holdings, undisclosed assets, and reputational backgrounds.",
        },
        {
          heading: "Corporate Intelligence & Risk Mitigation",
          body: "We help corporations detect intellectual property theft, investigate internal vendor kickback schemes, and perform deep due diligence on potential business partners.",
        },
      ],
      closing: "Obtain the concrete facts and admissible evidence you need. Contact Virginia Surveillance Force for confidential, licensed investigative services across the DC Metro area.",
    },

    // 16 ── MEDICAL & LEGAL COURIER & DELIVERY ───────────────────────────────
    {
      slug: "medical-and-legal-courier-delivery",
      title: "Medical & Legal Courier & Delivery",
      icon: "📦",
      image: "/images/services/services-16.jpg",
      excerpt: "Armed and bonded couriers providing secure, time-critical transport of sensitive legal documents, medical specimens, and valuable assets.",
      seo: {
        title: "Medical & Legal Courier & Delivery | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides secure medical, legal, and high-value courier transport across Maryland, DC, and Virginia. Schedule a delivery today!",
        keywords: "legal courier service DC, medical courier Virginia, secure document delivery Maryland, armed courier service DMV",
      },
      intro: [
        "Virginia Surveillance Force provides secure, chain-of-custody Courier & Delivery Services for law firms, hospitals, biomedical laboratories, government agencies, and financial institutions across Virginia, Maryland, and Washington, DC.",
        "When standard delivery services cannot guarantee strict confidentiality, rapid transit times, or armed physical security, VSF provides dedicated courier vehicles and bonded personnel.",
        "Every transport is tracked via real-time GPS with signature-verified handoffs, tamper-evident security packaging, and complete chain-of-custody logs.",
      ],
      staffingHeading: "SECURE COURIER OPTIONS",
      staffingIntro: "Time-sensitive and high-security courier solutions:",
      staffingOptions: [
        "Same-Day Rush & Expedited Courier Deliveries",
        "Armed High-Value Asset & Document Transport",
        "Medical Specimen, Blood, Lab Sample & Pharmaceutical Delivery",
        "Legal Filings, Court Documents & Evidence Transport",
      ],
      sections: [
        {
          heading: "Legal Filings & Courtroom Evidence Transport",
          body: "We deliver sensitive court filings, sealed affidavits, case contracts, and physical evidence directly to court clerks and law offices with proof-of-delivery receipts.",
        },
        {
          heading: "Medical & Diagnostic Lab Courier",
          body: "Our drivers are trained in OSHA and HIPAA transport guidelines, ensuring climate-controlled, safe transport of medical records, biopsies, and lab specimens.",
        },
        {
          heading: "Armed High-Value Escort",
          body: "For precious metals, jewelry, cashier checks, and confidential prototypes, VSF deploys armed security couriers in dedicated secure transport vehicles.",
        },
      ],
      closing: "Guarantee the prompt, secure delivery of your organization's most critical assets. Contact Virginia Surveillance Force for secure medical and legal courier solutions.",
    },

    // 17 ── BANK & ATM SECURITY ──────────────────────────────────────────────
    {
      slug: "bank-and-atm-security",
      title: "Bank & ATM Security",
      icon: "🏦",
      image: "/uploads/services/service-bank-security-and-atm-service-1787851469662.jpg",
      excerpt: "Armed security guards, ATM vestibule monitoring, opening/closing escorts, and cash-in-transit protection for financial institutions.",
      seo: {
        title: "Bank & ATM Security Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides armed bank security officers and ATM protection across Maryland, DC, and Virginia. Request financial security coverage.",
        keywords: "bank security guards Virginia, ATM security patrol Maryland, financial institution security DC, armed bank guards DMV",
      },
      intro: [
        "Virginia Surveillance Force provides specialized Bank & ATM Security services for retail banks, credit unions, wealth management offices, and automated teller networks across Virginia, Maryland, and Washington, DC.",
        "Financial institutions face elevated robbery, fraud, and skimming risks that demand highly visible, rigorously armed security personnel trained specifically in financial institution defense.",
        "Our bank security officers project authoritative deterrence while ensuring bank tellers, managers, and banking customers conduct daily transactions in a safe, secure environment.",
      ],
      staffingHeading: "FINANCIAL SECURITY SERVICES",
      staffingIntro: "Custom security staffing designed for banking and financial institutions:",
      staffingOptions: [
        "Armed Bank Lobby Security Officers",
        "ATM Vestibule & Drive-Thru Patrol Units",
        "Branch Morning Opening & Night Closing Security Escorts",
        "Cash Replenishment & Technician Standby Protection",
      ],
      sections: [
        {
          heading: "Armed Bank Lobby Deterrence",
          body: "VSF armed officers maintain active vigilance in banking lobbies, deterring robbery attempts, identifying suspicious loitering, and managing customer disputes calmly.",
        },
        {
          heading: "ATM Patrols & Anti-Skimming Inspection",
          body: "We conduct continuous randomized patrols of outdoor and vestibule ATMs, inspecting card readers for skimming hardware and safeguarding customers making cash withdrawals.",
        },
        {
          heading: "Safe Opening & Closing Protocols",
          body: "Our officers conduct exterior and interior safety sweeps before staff enter the branch each morning and provide secure parking lot escorts at closing time.",
        },
      ],
      closing: "Safeguard your financial branch, employees, and depositors with Virginia Surveillance Force. Contact our financial security team today for a tailored security proposal.",
    },

    // 18 ── FIRE WATCH SERVICES ──────────────────────────────────────────────
    {
      slug: "fire-watch-services",
      title: "Fire Watch Services",
      icon: "🔥",
      image: "/uploads/services/service-fire-watch-1787851469642.jpg",
      excerpt: "Certified 24/7 fire watch officers maintaining NFPA code compliance, continuous patrols, and safety logs during sprinkler or alarm outages.",
      seo: {
        title: "Fire Watch Services | Virginia Surveillance Force",
        description: "Virginia Surveillance Force provides 24/7 certified fire watch services in Virginia, Maryland, and Washington, DC. Fast emergency response—call now!",
        keywords: "fire watch services Virginia, emergency fire watch Maryland, certified fire watch guards DC, NFPA fire watch DMV",
      },
      intro: [
        "Virginia Surveillance Force provides emergency, certified Fire Watch Services for commercial buildings, residential complexes, hotels, hospitals, and construction sites throughout Virginia, Maryland, and Washington, DC.",
        "When a building's fire alarm, sprinkler system, or water riser is offline for maintenance, malfunction, or construction, local fire marshals require an immediate certified fire watch.",
        "VSF fire watch officers are on call 24 hours a day, 7 days a week, deploying within hours to keep your facility compliant, open for business, and protected against fire hazards.",
      ],
      staffingHeading: "FIRE WATCH CAPABILITIES",
      staffingIntro: "Certified fire safety monitoring meeting all local fire department regulations:",
      staffingOptions: [
        "24/7 Emergency Fire Watch Deployment (Same-Day Response)",
        "Continuous Patrol & Hazard Inspection of All Designated Zones",
        "State-Approved Fire Log Maintenance for Fire Marshal Inspection",
        "Hot Work Standby for Welding & Construction Projects",
      ],
      sections: [
        {
          heading: "When Is Fire Watch Required?",
          body: "Fire watch is legally required whenever fire suppression or alarm systems are impaired during repairs, power outages, winter freeze pipe bursts, or active construction.",
        },
        {
          heading: "Rigorous Patrols & NFPA Compliance",
          body: "Our officers continuously patrol every floor, electrical room, and exit corridor, checking for smoke, combustible hazards, obstructed exits, and sprinkler leaks.",
        },
        {
          heading: "Accredited Fire Logs & Immediate Marshall Notification",
          body: "VSF personnel maintain accurate, hourly patrol logs compliant with NFPA guidelines and local fire codes, preventing municipal fines and shutdown orders.",
        },
      ],
      closing: "Keep your property open and compliant during fire system outages. Contact Virginia Surveillance Force 24/7 for immediate fire watch officer deployment.",
    },
  ],
};
