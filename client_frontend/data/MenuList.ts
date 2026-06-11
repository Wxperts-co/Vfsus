// data/MenuList.ts
// Single source of truth for all Menu List pages.

export interface MenuSection {
  title: string;
  body: string | string[];
}

export interface FAQListItem {
  id: string;
  question: string;
  answer: string[];
  bullets?: string[];
  images?: string[];
  clientLogos?: boolean;
}

export interface ResourceArticle {
  id: string;
  title: string;
  body: string[];
  bullets?: string[];
}

export interface MenuListItem {
  slug: string;
  title: string;
  icon: string;
  type: 'standard' | 'faq' | 'resource';
  intro: string[];
  sections?: MenuSection[];
  faqItems?: FAQListItem[];
  resourceItems?: ResourceArticle[];
}

const MENU_LIST_ITEMS: MenuListItem[] = [
  // 1 ── WHY CHOOSE US ────────────────────────────────────────────────────────
  {
    slug: "why-choose-us",
    title: "Why Choose Us?",
    icon: "❓",
    type: "standard",
    intro: [
      "Dear Business Owners, Executives & Management Staff",
      "When selecting a security contractor, you're looking for a company that knows its business, has an established reputation and plays on your team. At Virginia Surveillance Force, we work closely with our clients to develop the correct security strategy for their organizations since 1994."
    ],
    sections: [
      {
        title: "Quality People & Professional Standards",
        body: [
          "No operation can succeed without quality people. That's why Virginia Surveillance Force provides highly trained, professional officers who can help make your facility safer, more secure, and less vulnerable. We select state-certified or registered personnel to meet your protective needs.",
          "Our insured officers are your eyes and ears, and they act in your organization's best interest. We provide an authoritative presence and offer a variety of uniform choices that reflect respect and professionalism: from 'hard look' uniforms (police/military style) to 'soft look' uniforms (executive blazers) or business casual wear, bringing ultimate security and peace of mind."
        ]
      },
      {
        title: "A Partnership Focused on Your Satisfaction",
        body: [
          "We would appreciate the opportunity to submit a proposal. Virginia Surveillance Force values your business and the confidence and goodwill you place in us. Customers like you are the foundation of our success, and we want you to know that we value your partnership.",
          "We are always eager to serve you, and your satisfaction is our top priority. We will do everything possible to ensure your expectations are exceeded. If you are interested in a trusted name in security, protective, and business services, it will be our pleasure serving you. We look forward to being your security partner. We will work with you to secure a safer tomorrow, today."
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
    intro: [
      "Employment Background Screening Hiring The Best; Partner For Success!! Virginia Surveillance Force is An Equal Employment Opportunity Employer.",
      "You can entrust your safety to our staff who often come from either police or military backgrounds. Background screening and employment verification are done on all applicants."
    ],
    sections: [
      {
        title: "Vetting & Screening Protocols",
        body: [
          "It is our responsibility for every aspect of the security function, which includes hiring, screening, placing, and managing personnel, as well as ensuring site coverage and accountability. As a service provider, we make sure that applicants meet all regulatory hiring and licensing requirements.",
          "We verify educational backgrounds, work history, employment references, criminal records, Social Security numbers, driver's license validity, and ensure that applicable state licensing procedures are met. Our staff go through criminal history background checks through the Department of Criminal Justice Services (DCJS) and the Federal Bureau of Investigation (FBI). All staff submit fingerprints and register or certify themselves, ensuring safety and peace of mind.",
          "Virginia Surveillance Force absolutely minimizes the level of exposure to liability. We are dedicated to recruiting and retaining individuals with characteristics of trustworthiness, motivation, and reliability. All prospective employees are screened for alcohol and illegal drugs. Our clients can also request drug screening on an annual or random basis. All candidates are interviewed in person to determine their suitability."
        ]
      },
      {
        title: "How We Train Our Staff?",
        body: [
          "At Virginia Surveillance Force, we take great pride in our team of capable and extensively trained professionals. Before an assignment is given, all of our staff and officers attend a comprehensive training program. Training is provided to our staff through the Virginia Surveillance Force Academy, State-certified training academies, and through the Department of Criminal Justice Services (DCJS).",
          "Our staff get trained, pass licensing exams, and possess state-issued registration or certification ID cards. Training is provided for new staff, officers, and new supervisors. Our training programs meet or exceed state-mandated training requirements.",
          "Management and officers are also given ongoing training, which reduces turnover, improves productivity and morale, and helps minimize liability exposure. Whenever our staff is assigned to a new location, they undergo an On-the-Job Training Program that includes site orientation, site-specific functions, emergency procedures, and public relations. Our staff is also encouraged to continue their education via In-Service Training."
        ]
      },
      {
        title: "Peace Of Mind?",
        body: [
          "We provide the peace of mind you are looking for. We have empowered management teams close to all our clients to assure personal attention from an experienced management team that is familiar with your needs, trends, and labor market. It is our goal to deliver value to our clients by commitment and quality to ensure 100% satisfaction. We identify your needs and perform duties to your specifications.",
          "Virginia Surveillance Force is a stable, American-owned presence with consistent management and a long-term focus that is unmatched in our market. If you want dedication, honor, and focus, you can depend on Virginia Surveillance Force to take the utmost care of you, your business, and its safety."
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

  // 4 ── VSF RESOURCE LIBRARY ─────────────────────────────────────────────────
  {
    slug: "vsf-resource-library",
    title: "VSF Resource Library",
    icon: "📚",
    type: "resource",
    intro: [
      "Click on the articles below to access our library of free resources. These articles will help you select the right business, investigative, and protective services firm for your needs."
    ],
    resourceItems: [
      {
        id: "art-1",
        title: "How to evaluate Security Officers & Surveillance Cameras",
        body: [
          "A common question asked by organizations during security planning is whether to use physical security officers, a CCTV surveillance camera system, or both. The answer depends heavily on the nature of the business.",
          "Washington DC and its surrounding suburbs in Virginia and Maryland are some of the most watched areas in the country — cameras are everywhere. Emerging developments in camera technology, combined with inexpensive high-speed internet, make CCTV coverage better and less expensive than ever before, while wages for guard services have risen.",
          "Cameras provide a reliable recording that can be used as evidence later. They are a valuable resource for documenting criminal acts and identifying perpetrators. With modern artificial intelligence, systems can interpret motion, sound alarms, alert remote monitoring stations, play messages, or turn on lights.",
          "However, there is a major downside. If nobody is monitoring the cameras in real time, you cannot respond effectively to a crime in progress. Security is about reacting to threats in real time. Video recording documents a crime, but it does not stop it from happening or protect people from harm.",
          "Cameras also lack human intuition. They cannot sense when someone or something 'just isn't right.' A camera cannot escort or ban unauthorized parties, take statements from witnesses, or call law enforcement in real time. A criminal with their face covered will go ahead with their misdeed without concern.",
          "Importantly, a camera cannot stop a violent act before people are harmed. It does not provide the liability reduction of a uniformed officer. Financial institutions, airports, and major facilities have cameras, yet they still use uniformed officers. Why? Because they need a live person who can respond immediately to protect assets, interest, and life.",
          "An onsite officer is a game-changer. They observe safety concerns, report risks, and take steps to prevent slip-and-fall liability. Cameras are a valuable tool and serve as an extension of the officer's eyes and ears, but they are not a satisfactory replacement. For complete protection, a live officer on site is indispensable."
        ]
      },
      {
        id: "art-2",
        title: "How to Evaluate and Select Companies That Provide Armed Security Guards in Virginia",
        body: [
          "Situations that warrant an armed security presence are inherently dangerous. The individuals providing this security must be capable of preventing and quelling breaches of security.",
          "However, this presence often takes place in professional environments where a 'police state' atmosphere is unacceptable. Armed personnel must provide a powerful yet polite presence. They must appear alert and ready, without interfering with normal business operations.",
          "When you evaluate firms that provide armed security guards/personnel in Virginia, keep these key criteria in mind:"
        ],
        bullets: [
          "Verify state licensing: Ensure the firm is licensed by the Virginia Department of Criminal Justice Services (DCJS) and that officers carry current registration cards.",
          "Check training standards: Armed officers should undergo advanced tactical training, firearms qualification, and de-escalation training beyond state minimums.",
          "Inspect insurance and bonding: Confirm they hold liability insurance and employee dishonesty bonds that protect you from claims and theft.",
          "Assess supervision: Ask how the firm monitors guards in the field and how they handle supervisor check-ins and client communications.",
          "Request client references: Speak with other commercial or corporate property managers who have used their armed services on similar sites."
        ]
      }
    ]
  },

  // 5 ── VSF THREE DIVISIONS ──────────────────────────────────────────────────
  {
    slug: "vsf-three-divisions",
    title: "VSF Three Divisions",
    icon: "🛡️",
    type: "standard",
    intro: [
      "To provide a complete range of security and business support, Virginia Surveillance Force operates under three specialized divisions.",
      "Each division is staffed by dedicated professionals who bring expertise, reliability, and precision to their roles, guaranteeing comprehensive protection and outstanding service."
    ],
    sections: [
      {
        title: "1. Commercial & Corporate Security Division",
        body: [
          "Our largest division focuses on protecting businesses, corporate offices, malls, retail centers, warehouses, and industrial facilities. We provide armed and unarmed uniformed officers, concierge services, and frontdesk lobby attendants.",
          "Our personnel are trained in access control, visitor management, loss prevention, and customer relations, presenting a first-class professional image while maintaining a secure, welcoming environment."
        ]
      },
      {
        title: "2. Investigative & Intelligence Division",
        body: [
          "Licensed and highly confidential, our investigations division serves law firms, corporate entities, and private individuals. We conduct thorough pre-employment screening, background verification, criminal record checks, and covert surveillance for insurance fraud or domestic matters.",
          "Using advanced tools and seasoned investigators, we deliver actionable intelligence and legally admissible evidence."
        ]
      },
      {
        title: "3. Protective Services & Special Operations Division",
        body: [
          "This division handles high-risk and specialized security needs, including VIP and executive close protection, bodyguards, rapid alarm response, fire watch services, and marked vehicle patrols.",
          "Staffed largely by former law enforcement and military personnel, this division is equipped to respond swiftly to emergencies and protect high-value assets."
        ]
      }
    ]
  },

  // 6 ── VSF GOES NATIONWIDE ──────────────────────────────────────────────────
  {
    slug: "vsf-goes-nationwide",
    title: "VSF Goes Nationwide!",
    icon: "🇺🇸",
    type: "standard",
    intro: [
      "Since 1994, Virginia Surveillance Force has been a trusted regional leader in security.",
      "Today, we are proud to offer nationwide coverage for permanent services, allowing companies with multi-state operations to secure their assets through a single, dependable partner."
    ],
    sections: [
      {
        title: "National Reach, Local Expertise",
        body: [
          "While our specialized, rapid-response services are focused in the Virginia, Washington DC, and Maryland metro areas, our permanent security operations extend nationwide.",
          "We coordinate national security staffing, licensing, and compliance, ensuring that your facilities across the United States receive the same high level of protection and management oversight."
        ]
      },
      {
        title: "Single Source of Accountability",
        body: [
          "Managing multiple security contractors across different states can be inefficient and inconsistent. VSF acts as a single point of contact for your national operations.",
          "We standardize reporting, billing, and post orders, providing a cohesive security posture and a dedicated account manager who is always available."
        ]
      },
      {
        title: "Consistent Quality Assurance",
        body: [
          "Every guard hired under a VSF national contract undergoes our rigorous screening, vetting, and training guidelines, adapted to meet individual state regulations.",
          "This ensures consistent quality, reduced liability, and total peace of mind for your business, regardless of where your offices are located."
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

export default MENU_LIST_ITEMS;

/** Find menu item by slug */
export function getMenuItemBySlug(slug: string): MenuListItem | undefined {
  return MENU_LIST_ITEMS.find((item) => item.slug === slug);
}

/** Get all slugs */
export function getAllMenuSlugs(): string[] {
  return MENU_LIST_ITEMS.map((item) => item.slug);
}
