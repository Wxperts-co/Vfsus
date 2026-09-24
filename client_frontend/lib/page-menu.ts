// lib/page-menu.ts
// Schema and default data for dynamic Menu List pages.

export interface MenuPageData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  menus: MenuListItem[];
}

export interface MenuSection {
  title: string;
  body: string | string[];
}

export interface FAQListItem {
  id: string;
  question: string;
  answer: string | string[];
  bullets?: string[];
  images?: string[];
  clientLogos?: boolean;
}

export interface ResourceArticle {
  id: string;
  title: string;
  body: string | string[];
  bullets?: string[];
}

export interface MenuListItem {
  slug: string;
  title: string;
  icon: string;
  isVisible?: boolean; // Controls if it shows up on the frontend
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
  type: 'standard' | 'faq' | 'resource';
  intro: string | string[];
  sections?: MenuSection[];
  faqItems?: FAQListItem[];
  resourceItems?: ResourceArticle[];
}

const COMMON_MENU_KEYWORDS = "Emergency Security Services Maryland, security company Maryland, security services Washington DC, private security services Maryland, professional security services, licensed security guards Virginia, armed security services Virginia, armed security guards Maryland, unarmed security services Virginia, security services DC Maryland Virginia , Commercial security services Virginia, Residential security services Virginia, Corporate security services Virginia, Executive protection Virginia , 24/7 security services Virginia , Security patrol services Virginia, Fire watch services Virginia, Security guards Northern Virginia, security guards for hotels, security guards for hospitals ,security guards for schools, security guards for retail stores, security guards Alexandria VA, security services Manassas VA";

const MENU_LIST_ITEMS: MenuListItem[] = [
  // 1 ── WHY CHOOSE US ────────────────────────────────────────────────────────
  {
    slug: "why-choose-us",
    title: "Why Choose Us?",
    icon: "❓",
    type: "standard",
    seo: {
      title: "Why Choose Us Virginia Surveillance Force",
      description: "Virginia Surveillance Force delivers trusted, professional security solutions across Maryland and Washington DC. Protect your property—request a quote today!",
      keywords: COMMON_MENU_KEYWORDS,
    },
    intro: [
      "Experience. Professionalism. Accountability. Protection.",
      "Since 1987, Virginia Surveillance Force, Inc. has provided professional security solutions tailored to the needs of our clients, their properties, and their organizations.",
      "When you choose a security company, you need more than someone simply providing personnel. You need a security partner you can rely on.",
      "That is what VSF is committed to providing."
    ],
    sections: [
      {
        title: "Established Since 1987",
        body: [
          "Decades of experience providing professional security and protective services."
        ]
      },
      {
        title: "Professional Personnel",
        body: [
          "Qualified and properly trained security professionals held to high standards of conduct, appearance, vigilance, and customer service."
        ]
      },
      {
        title: "Custom Security Solutions",
        body: [
          "Security solutions designed around the client’s property, environment, concerns, and specific needs."
        ]
      },
      {
        title: "Accountability & Communication",
        body: [
          "Communication, reporting, supervision, responsiveness, and consistent performance."
        ]
      },
      {
        title: "Professional Presence",
        body: [
          "A visible, professional security presence representing both VSF and the client organization."
        ]
      },
      {
        title: "A Security Partner — Not Just A Contractor",
        body: [
          "Our goal is to build a professional relationship with our clients and provide security they can confidently rely on."
        ]
      },
      {
        title: "The VSF Difference",
        body: [
          "The right people. The right approach. The right level of protection.",
          "We bring professional personnel, proper procedures, accountability, supervision, and customized security solutions together to provide protection built around each assignment.",
          "Your Security Matters. Your Trust Matters. Your Peace of Mind Matters.",
          "Virginia Surveillance Force, Inc. — Professional Security. Trusted Protection. Protecting What Matters Most."
        ]
      },
      {
        title: "Quality People & Professional Standards",
        body: [
          "Effective security starts with the right people.",
          "At Virginia Surveillance Force, we understand that the officer assigned to your property represents more than our company — they represent your organization in the eyes of your employees, customers, residents, guests, and visitors.",
          "That’s why we place a strong emphasis on selecting qualified, professional, and properly trained security personnel. Our officers are expected to meet applicable licensing, registration, certification, and assignment requirements and maintain high standards of professionalism, appearance, discipline, vigilance, communication, reliability, and customer service.",
          "Our security professionals serve as an extension of your organization, providing a visible, professional, and dependable presence while helping protect your people, property, assets, and interests.",
          "When appropriate for the assignment, we can provide personnel in traditional uniformed security, business-professional, or executive-style attire to match the environment and level of service required.",
          "Our goal is simple: put the right people in the right environment, represent your organization professionally, and provide the level of security and service you expect.",
          "Professional People. Professional Standards. Professional Security."
        ]
      },
      {
        title: "A Security Partnership Built Around You",
        body: [
          "We don’t want to be just another security contractor. We want to be the security partner you can rely on.",
          "We understand that when you hire a security company, you are trusting us with your people, property, assets, operations, and reputation. We take that responsibility seriously.",
          "From the beginning of an assignment through ongoing service, we believe in clear communication, accountability, responsiveness, and consistent performance.",
          "We take the time to understand your expectations, listen to your concerns, and work with you to provide a security solution designed around your needs.",
          "As your needs change, our approach can adapt with you.",
          "Our goal is to earn your trust, build a lasting professional relationship, and become the security company you can confidently rely on.",
          "YOUR SECURITY MATTERS.",
          "YOUR TRUST MATTERS. YOUR PEACE OF MIND MATTERS."
        ]
      }
    ]
  },

  // 2 ── HOW WE RECRUIT ───────────────────────────────────────────────────────
  {
    slug: "how-we-recruit",
    title: "How We Recruit?",
    icon: "🤝",
    type: "standard",
    seo: {
      title: "How We Recruit Virginia Surveillance Force",
      description: "Virginia Surveillance Force rigorously recruits top security talent across Maryland and Washington DC. Partner with the best—request a quote today!",
      keywords: COMMON_MENU_KEYWORDS,
    },
    intro: [
      "The quality of our security service begins with the quality of our people.",
      "At Virginia Surveillance Force, we take the selection, screening, training, and preparation of our security professionals seriously. We look for individuals who demonstrate professionalism, reliability, responsibility, strong communication, sound judgment, and the ability to meet the demands of the assignment.",
      "Our goal is to place the right people in the right positions and provide our clients with security professionals who are prepared to represent both VSF and your organization with professionalism and accountability.",
      "The people we place on your property matter."
    ],
    sections: [
      {
        title: "Employment Background Screening",
        body: [
          "Selecting Professionals You Can Trust",
          "At Virginia Surveillance Force, we believe the quality of our security service begins with the quality of our hiring process. Before an officer is assigned to a client location, we carefully evaluate qualifications, experience, licensing, reliability, and suitability for the position.",
          "Our screening process is designed to help ensure that the professionals entrusted with protecting your property, employees, visitors, and assets meet our standards for professionalism and responsibility.",
          "Many of our security professionals bring valuable experience from law enforcement, military, security, customer service, and other professional backgrounds. Applicants are subject to appropriate employment verification and background screening procedures, consistent with the position and applicable requirements.",
          "Our goal is simple: carefully select the right people to represent VSF and our clients professionally."
        ]
      },
      {
        title: "Vetting & Screening Protocols",
        body: [
          "Security is a position of trust. That is why Virginia Surveillance Force takes the selection and vetting of our personnel seriously.",
          "Our hiring process includes verification of employment history, references, qualifications, licensing or registration requirements, and other information applicable to the position and jurisdiction.",
          "Where required or appropriate, personnel may undergo criminal history and fingerprint-based background screening through applicable state and federal processes.",
          "We also evaluate each candidate’s professionalism, communication skills, judgment, reliability, and ability to represent VSF and our clients appropriately.",
          "Our goal is simple: put the right person in the right position and give our clients confidence in the professionals entrusted with their security."
        ]
      },
      {
        title: "How We Train Our Staff",
        body: [
          "Hiring the right people is only the beginning.",
          "At Virginia Surveillance Force, we believe professional security personnel must be properly prepared for the responsibilities of their assignment.",
          "Before assignment, our officers receive training appropriate to their duties and applicable licensing requirements. Training may include security procedures, access control, patrol operations, emergency response, report writing, communication, customer service, de-escalation, and other assignment-specific responsibilities.",
          "Officers assigned to a new location also receive site-specific orientation and on-the-job training covering the property’s procedures, post orders, emergency protocols, and client expectations.",
          "Training does not stop after the first day. We emphasize continuing education, in-service training, supervision, and ongoing performance development so our personnel remain prepared to meet the changing needs of our clients.",
          "A well-trained officer doesn’t simply stand at a post. They understand the assignment, recognize potential problems, communicate effectively, follow established procedures, and know when to take appropriate action."
        ]
      },
      {
        title: "Peace of Mind",
        body: [
          "MANAGEMENT THAT STAYS INVOLVED",
          "When you hire a security company, you should not have to wonder who is managing your account, who is responsible for your service, or whether your concerns will be addressed.",
          "At Virginia Surveillance Force, management and supervisors remain actively involved in our security operations and client relationships. We work to understand your property, your expectations, your concerns, and the specific requirements of your environment.",
          "Our goal is to provide more than a uniform at a post. We provide management oversight, supervision, accountability, communication, and a professional security presence designed around your needs.",
          "We work with our clients to establish clear expectations, appropriate procedures, effective communication, and a security program that fits their operation.",
          "When concerns arise, we believe they should be heard, addressed, and followed through.",
          "Your security is our responsibility. Your confidence in us is something we work to earn every day."
        ]
      }
    ]
  },

  // 3 ── FAQS ─────────────────────────────────────────────────────────────────
  {
    slug: "faqs",
    title: "FAQs",
    icon: "💬",
    type: "faq",
    seo: {
      title: "Virginia Surveillance Force FAQs-",
      description: "Virginia Surveillance Force answers your top security questions across Maryland and Washington DC. Get expert answers—request a quote today!",
      keywords: COMMON_MENU_KEYWORDS,
    },
    intro: [
      "This page covers the most frequently asked questions. Please click on the questions below. If you cannot find what you are looking for, please feel free to contact us — we shall be more than willing to answer any query. We look forward to working with you. Thank you."
    ],
    faqItems: [
      {
        id: "faq-1",
        question: "What areas do you cover?",
        answer: [
          "We serve nationwide with permanent services. However, rapid-response specialized services are primarily provided in Virginia, Washington DC, and Maryland.",
          "VIRGINIA: Arlington, Alexandria, Annandale, Ashburn, Arcola, Burke, Bristow, Centreville, Clifton, Chantilly, Catharpin, Culpeper, Dunn Loring, Dulles, Dale City, Dumfries, Fairfax County, Fairfax City, Falls Church, Fredericksburg, Great Falls, Fort Belvoir, Gainesville, Herndon, Hamilton, Hillsboro, Loudoun County, Leesburg, Lorton, Lake Ridge, Oakton, Occoquan, Mclean, Merrifield, Manassas, Manassas park, Middleburg, Nokesville, Prince William County, Purceville, Paeonian Springs, Quantico, Reston, Round Hill, Sterling, Springfield, Stafford, Spotsylvania, Triangle, Vienna, Woodbridge, Warrenton, Winchester, Washington DC.",
          "MARYLAND: Accokeek, Annapolis, Bethesda, Bowie, Brandywine, Bladensburg, Burtonsville, Capitol Heights, College Park, Chevy Chase, Clinton, Columbia, Cheverly, Catonsville, Cheltenham, Cabin John, Clarksville, District Heights, Derwood, Elkridge, Ellicott City, Fort washington, Forest Heights, Fairmount Heights, Fulton, Gaithersburg, Glenarden, Glen Echo, Glenn Dale, Glen burnie, Howard County, Hanover, Hyattsville, Harmans, Halethorpe, Jessup, Kensington, Laurel, Lanham, Montgomery County, Morning Side, Mt. Rainner, New Carrolton, Oxon Hill, Odenton, Potomac, Prince George's County, Rockville, Silver Spring, Suitland, Seat Pleasant, Takoma park, Temple Hills, University Park, Upper Marlboro, Woodlawn."
        ]
      },
      {
        id: "faq-2",
        question: "Are you licensed, Insured & bonded?",
        answer: [
          "Virginia Surveillance Force is a fully licensed, insured, and bonded agency. We are insured in millions, well beyond the limits required by DCJS.",
          "VSF carries Commercial General Liability, Commercial Auto, Employee Dishonesty Bond, Workers' Compensation, and Employers' Liability. Regardless of the service you need, we deliver the safety and peace of mind you are looking for."
        ],
        images: [
          "VSF-Insurance",
          "VSF-Virginia",
          "VSF-Licence",
          "VSF-Maryland"
        ]
      },
      {
        id: "faq-3",
        question: "Whom you served? (Gallery)",
        answer: [
          "Our client list is extensive. We are proud of our valuable clients' past and present and their businesses. They are the foundation of our success!"
        ],
        clientLogos: true
      },
      {
        id: "faq-4",
        question: "What is the estimated cost of service?",
        answer: [
          "We provide assistance in protecting your investments and serve as a deterrent to people who would act illegally. Rates differ from area to area depending on threat levels; it costs more if the business or event is located in a high-crime area, or requires high-tech/high-security capabilities.",
          "Please fill out our Service Quote Request Form to get an accurate estimate tailored to your requirements."
        ]
      },
      {
        id: "faq-5",
        question: "What kind of uniform options are available?",
        answer: [
          "Uniforms are determined by site duties and client preference. We can also provide special health and safety work wear for personnel who perform duties in hazardous areas or warehouses.",
          "Our most popular styles are the 'Hard Approach' (police/military style uniform) and the 'Soft Approach' (executive blazer style uniform). Our staff wear the uniform you feel is most appropriate for your company and assignment."
        ],
        bullets: [
          "Military/Police look ('Hard Approach')",
          "Soft look blazer & tie ('Soft Approach')",
          "Executive blazer & slacks",
          "Business Casual (polo and khakis)",
          "Plain Clothed / Undercover",
          "Outdoor Wear / Tactical",
          "Custom configurations to client specifications"
        ]
      },
      {
        id: "faq-6",
        question: "How do I get a quote & service contract?",
        answer: [
          "Our rates vary based on location and the nature of the assignment, but they are highly competitive. To get a quote, please fill out the Service Quote Request Form. Upon receipt, we will provide you with an estimate or proposal.",
          "Once you accept the rate, we provide you with a service contract, which must be signed by both parties. VSF does not provide services without a signed contract.",
          "PLEASE NOTE: The Service Request Form is for existing clients who need additional or emergency coverage and already have a master contract on file."
        ]
      },
      {
        id: "faq-7",
        question: "How much experience do you have in the industry?",
        answer: [
          "Members of our management team have over 15 to 20 years of security industry experience. We are large enough to provide the resources needed to satisfy your requirements, yet small enough to provide the personalized attention you deserve.",
          "We have serviced just about every industry and have successfully provided access control, foot patrols, vehicle patrols, event security, investigations, executive protection, concierge, courier, fire watch, alarm response, bank ATM protection, and more."
        ]
      },
      {
        id: "faq-8",
        question: "What sets Virginia Surveillance apart from its competitors?",
        answer: [
          "Many clients have switched from other companies to Virginia Surveillance Force. Their main reason for changing is usually a lack of responsiveness from management in their previous agency — customers were often left to deal with issues on their own.",
          "At VSF, we appreciate our clients and actively support them. We keep employee turnover low to ensure compliance with client directives, and we pass as much of the billing rate to our guards as is economically possible. We work hard to ensure 100% satisfaction.",
          "VSF management is never far, and we will always respond to your call. Whether you are a small business or a large corporation, VSF's presence brings ultimate security and peace of mind. We are flexible, and our goal is to build a long-lasting relationship."
        ]
      },
      {
        id: "faq-9",
        question: "How do you conduct pre-employment screening?",
        answer: [
          "To provide the highest level of service, we have developed a strict screening process that meets the specific requirements of each assignment. We carefully select personnel, screening them for:",
        ],
        bullets: [
          "Application review & work history verification",
          "Comprehensive employment background checks",
          "FBI fingerprint and criminal history background checks",
          "State registration and certification validation (DCJS)",
          "In-house security training and testing exams",
          "Pre-employment and random drug and alcohol testing"
        ]
      },
      {
        id: "faq-10",
        question: "What type of supervision is conducted in the field?",
        answer: [
          "Supervision is the key to a successful operation. At VSF, our managers, field inspectors, and mobile supervisors make unannounced site visits to troubleshoot issues and inspect personnel. This ensures compliance with client objectives, maintains guard alertness, and evaluates service quality.",
          "Our managers also coordinate closely with your management staff to make adjustments to your security program as needed. They have the experience to respond to any situation, protecting client interests and safety."
        ]
      },
      {
        id: "faq-11",
        question: "How do we contact you if we need you?",
        answer: [
          "One of our managers will serve as your direct liaison and contact person. Your contact person will provide their cell phone number as well as their assistant's cell phone number. You may call them directly at any time of the day or night.",
          "Alternatively, you can call toll-free (800) 981-3113 to reach our dispatcher who will deliver the message to on-duty personnel in charge. VSF's main office control center and dispatchers answer phone calls 24/7/365, ensuring immediate availability.",
          "Existing clients can always call, email, or fill out the service request form online for emergency, temporary, or extra coverage."
        ]
      }
    ]
  },

  // 4 ── NATIONWIDE SECURITY SERVICES — ASF ───────────────────────────────────
  {
    slug: "nationwide-security-services-asf",
    title: "Nationwide Security Services — ASF",
    icon: "🇺🇸",
    type: "standard",
    seo: {
      title: "Nationwide Security Services — ASF | American Surveillance Force",
      description: "American Surveillance Force (ASF) extends nationwide permanent security services with centralized management and single-source accountability. Request a quote today!",
      keywords: COMMON_MENU_KEYWORDS,
    },
    intro: [
      "American Surveillance Force (ASF) — Nationwide Security Services",
      "Established in 1987, Virginia Surveillance Force (VSF) has built decades of experience providing professional security services throughout Virginia, Maryland, and Washington, DC. Through our affiliated company, American Surveillance Force (ASF), we extend our capabilities nationwide to serve organizations with multi-state security requirements.",
      "ASF is built for permanent security assignments and long-term partnerships, with service agreements typically structured for a minimum of 3–4 years. Our approach provides clients with consistent personnel, centralized management, clear accountability, site-specific security procedures, and dependable coverage across multiple locations.",
      "Whether you require security for one location or a multi-state operation, ASF provides a centralized approach designed to make managing your security program simpler and more consistent.",
      "One Partner. One Point of Accountability. Nationwide Security."
    ],
    sections: [
      {
        title: "National Reach. Local Expertise.",
        body: [
          "While our specialized security and rapid-response services are focused in Virginia, Maryland, and Washington, DC, American Surveillance Force (ASF) provides permanent security services nationwide.",
          "For organizations with facilities across multiple states, ASF provides a single point of contact and centralized management for their security program. We coordinate security staffing, site requirements, licensing, compliance, and operational oversight to help provide consistent standards and dependable protection across every location.",
          "Whether you need security at one facility or multiple locations nationwide, ASF is built to provide a professional, consistent, and accountable security partnership.",
          "One Partner. Multiple Locations. Nationwide Security."
        ]
      },
      {
        title: "Single Source of Accountability",
        body: [
          "Managing multiple security contractors across different states can create unnecessary complexity, inconsistent procedures, and multiple points of contact. American Surveillance Force (ASF) provides a centralized approach for organizations with multi-state security needs.",
          "We coordinate security operations, reporting, billing, post orders, staffing, and management oversight through one accountable partner. Clients have a dedicated point of contact to help maintain consistent standards and communication across their locations.",
          "One Account. One Point of Contact. One Nationwide Security Partner."
        ]
      },
      {
        title: "Consistent Quality Assurance",
        body: [
          "Every security professional assigned through an ASF nationwide security program is subject to our established screening, vetting, and training standards, along with the applicable licensing and regulatory requirements of the state where services are provided.",
          "We maintain consistent security procedures, reporting standards, supervision, and management oversight across locations—helping clients maintain a reliable level of service throughout their organization.",
          "Consistent Standards. Professional Personnel. Nationwide Accountability."
        ]
      }
    ]
  },

  // 7 ── EMPLOYMENT ───────────────────────────────────────────────────────────
  {
    slug: "employment",
    title: "Employment",
    icon: "💼",
    type: "standard",
    seo: {
      title: " Employment| Virginia Surveillance Force ",
      description: "Virginia Surveillance Force hires dedicated security professionals across Maryland and Washington DC. Build your career with us—apply today!",
      keywords: COMMON_MENU_KEYWORDS,
    },
    intro: [
      "Build a career in security with a company that values professionalism, integrity, and dedication. Virginia Surveillance Force is An Equal Employment Opportunity Employer and a premier place to build your career.",
      "If you are ready to join a premier security team and secure a safer tomorrow, we invite you to apply. We look forward to welcoming you to the VSF family."
    ],
    sections: [
      {
        title: "Why Work With VSF?",
        body: [
          "At Virginia Surveillance Force, our employees are the foundation of our success. We offer competitive pay, ongoing professional training through certified academies, and clear paths for career advancement into supervisory and management roles.",
          "We are committed to fostering a supportive, respectful work environment that values the unique contributions of every team member."
        ]
      },
      {
        title: "Who We Hire & Requirements",
        body: [
          "We recruit motivated, reliable individuals who exhibit a high degree of integrity and professionalism. Candidates with background experience in the military or law enforcement are highly encouraged to apply.",
          "All applicants must meet state licensing criteria, pass criminal history background checks (including DCJS and FBI fingerprinting), and pass pre-employment drug and alcohol screening."
        ]
      },
      {
        title: "Apply Today",
        body: [
          "To apply for a position with Virginia Surveillance Force, please complete our Employment Application form.",
          "You can fill out the application securely online by clicking the link in the navbar under 'Forms > Employment Application' or click below to open the application in a new window."
        ]
      }
    ]
  }
];

export const defaultMenuPageData: MenuPageData = {
  seo: {
    title: "Emergency Security Services Maryland | Virginia Surveillance Force",
    description: "Virginia Surveillance Force delivers trusted, professional security solutions across Maryland and Washington DC. Protect your property—request a quote today!",
    keywords: COMMON_MENU_KEYWORDS,
  },
  menus: MENU_LIST_ITEMS,
};

/** Find menu item by slug (now redundant since data is dynamic, but kept for backward compat temporarily) */
export function getMenuItemBySlug(slug: string): MenuListItem | undefined {
  return MENU_LIST_ITEMS.find((item) => item.slug === slug);
}

/** Get all slugs */
export function getAllMenuSlugs(): string[] {
  return MENU_LIST_ITEMS.map((item) => item.slug);
}
