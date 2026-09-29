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
      "Find answers to some of the questions we receive most often about our security services. If you don’t see the information you’re looking for, contact us. Our team is ready to answer your questions and discuss your security needs. We look forward to serving you."
    ],
    faqItems: [
      {
        id: "faq-1",
        question: "What Areas Do You Cover?",
        answer: `
<p>Virginia Surveillance Force, Inc. (VSF) has been serving clients since 1987, with a strong regional presence throughout Virginia, Washington, DC, and Maryland. Through our affiliated company, American Surveillance Force (ASF), we also provide permanent, long-term security services nationwide.</p>

<h4 style="color:#eab308; margin-top: 1.25rem; font-size: 1.05rem; font-weight: 700; letter-spacing: 0.5px;">Virginia, Maryland &amp; Washington, DC</h4>
<p>Our primary regional service area includes Virginia, Maryland, and Washington, DC, with a strong local presence, experienced personnel, and responsive security capabilities throughout the region. See below for the specific cities and communities we serve.</p>

<h4 style="color:#eab308; margin-top: 1.25rem; font-size: 1.05rem; font-weight: 700; letter-spacing: 0.5px;">Nationwide Security Services</h4>
<p>For organizations with locations outside our primary regional service area, American Surveillance Force (ASF) provides permanent security services nationwide, allowing businesses and organizations to work with an established security partner across multiple states.</p>
<p>ASF nationwide permanent security assignments are typically structured with a 3–4 year service agreement, subject to applicable licensing, regulatory, staffing, and assignment requirements.</p>

<div style="background: rgba(19, 30, 53, 0.7); border: 1px solid rgba(201, 168, 76, 0.2); border-radius: 8px; padding: 1.25rem; margin-top: 1.25rem;">
  <h5 style="color: #eab308; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Virginia Service Area</h5>
  <p style="font-size: 0.9rem; line-height: 1.7; color: rgba(244, 246, 248, 0.85); margin: 0;">
    Arlington • Alexandria • Annandale • Ashburn • Arcola • Burke • Bristow • Centreville • Chantilly • Clifton • Culpeper • Dale City • Dumfries • Fairfax • Fairfax County • Fairfax City • Falls Church • Fredericksburg • Great Falls • Herndon • Leesburg • Loudoun County • Lorton • McLean • Manassas • Manassas Park • Merrifield • Oakton • Occoquan • Prince William County • Quantico • Reston • Springfield • Stafford • Sterling • Vienna • Woodbridge • Warrenton • Winchester • and surrounding communities.
  </p>
</div>

<div style="background: rgba(19, 30, 53, 0.7); border: 1px solid rgba(201, 168, 76, 0.2); border-radius: 8px; padding: 1.25rem; margin-top: 1rem;">
  <h5 style="color: #eab308; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Maryland Service Area</h5>
  <p style="font-size: 0.9rem; line-height: 1.7; color: rgba(244, 246, 248, 0.85); margin: 0;">
    Accokeek • Annapolis • Bethesda • Bowie • Brandywine • Bladensburg • Burtonsville • Capitol Heights • College Park • Chevy Chase • Clinton • Columbia • District Heights • Elkridge • Ellicott City • Fort Washington • Forest Heights • Gaithersburg • Glen Burnie • Hyattsville • Kensington • Lanham • Laurel • Montgomery County • Morningside • Mount Rainier • New Carrollton • Oxon Hill • Odenton • Potomac • Prince George’s County • Rockville • Silver Spring • Suitland • Takoma Park • Temple Hills • Upper Marlboro • and surrounding communities.
  </p>
</div>

<div style="background: rgba(19, 30, 53, 0.7); border: 1px solid rgba(201, 168, 76, 0.2); border-radius: 8px; padding: 1.25rem; margin-top: 1rem;">
  <h5 style="color: #eab308; font-weight: 700; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Washington, DC</h5>
  <p style="font-size: 0.9rem; line-height: 1.7; color: rgba(244, 246, 248, 0.85); margin: 0;">
    We provide security services throughout Washington, DC, with coverage tailored to the type of assignment, location, staffing requirements, and applicable regulations.
  </p>
</div>

<div style="background: rgba(201, 168, 76, 0.08); border: 1px dashed rgba(201, 168, 76, 0.35); border-radius: 8px; padding: 1rem; margin-top: 1.25rem;">
  <strong style="color: #eab308; display: block; font-size: 0.95rem; margin-bottom: 0.25rem;">Don’t See Your Location?</strong>
  <span style="font-size: 0.9rem; color: rgba(244, 246, 248, 0.85);">Contact us. Our service capabilities may extend beyond the locations listed above.</span>
</div>
`
      },
      {
        id: "faq-2",
        question: "Are you licensed, insured & bonded?",
        answer: [
          "Virginia Surveillance Force, Inc. (VSF) is a licensed, insured, and bonded private security services company serving Virginia, Washington, DC, and Maryland.",
          "We maintain the required licensing, commercial insurance, and bonding coverage applicable to our operations. Our coverage includes Commercial General Liability, Commercial Auto, Workers’ Compensation, Employers’ Liability, and Employee Dishonesty/Fidelity Bond coverage."
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
        question: "Clients We Have Served",
        answer: [
          "Our client portfolio reflects years of experience serving businesses, organizations, and communities across the region. We are proud of the clients we have served and the relationships we have built over the years."
        ],
        clientLogos: true
      },
      {
        id: "faq-4",
        question: "What is the Estimated Cost of Security Services?",
        answer: `
<p>Security is an investment in the protection of your property, people, and operations. Our pricing reflects the professional service, experience, personnel, supervision, and resources required to provide dependable security.</p>
<p>Costs vary based on the location, property type, coverage hours, staffing requirements, risk level, supervision, patrol requirements, and specific security needs. Assignments may involve low, moderate, or elevated risk levels.</p>
<p>Serving clients since 1987, VSF provides customized security solutions backed by experienced personnel, professional management, training, licensing, insurance, and bonding.</p>
<p>Our pricing reflects the quality, experience, and level of service provided by an established security company, rather than competing solely on price.</p>
<div style="background: rgba(201, 168, 76, 0.08); border: 1px dashed rgba(201, 168, 76, 0.35); border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
  <div>
    <strong style="color: #eab308; display: block; font-size: 0.95rem; margin-bottom: 0.25rem;">Request a Quote</strong>
    <span style="font-size: 0.9rem; color: rgba(244, 246, 248, 0.85);">Receive a personalized proposal based on your property and security requirements.</span>
  </div>
  <a href="/request-quote" style="background: #eab308; color: #0b1120; font-weight: 700; font-size: 0.85rem; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block;">Request Quote →</a>
</div>
`
      },
      {
        id: "faq-5",
        question: "What Kind of Uniform Options are Available?",
        answer: `
<p>Virginia Surveillance Force provides professional uniform options tailored to the assignment, security role, property environment, and client specifications. Our goal is to ensure every officer presents a professional, disciplined, and appropriate security presence while representing your organization.</p>
<p>Our uniform options include:</p>
<ul class="bullet-list" style="margin: 0.75rem 0 1rem;">
  <li>Traditional Military / Police Style</li>
  <li>Professional Blazer &amp; Tie</li>
  <li>Executive Blazer &amp; Dress Trousers</li>
  <li>Business Casual</li>
  <li>Plainclothes / Undercover</li>
  <li>Outdoor / Tactical Duty Wear</li>
  <li>Custom Configurations to Client Specifications</li>
</ul>
<p>From traditional security uniforms to executive and discreet assignments, VSF provides the professional appearance and security presence appropriate for your property and organization.</p>
`
      },
      {
        id: "faq-6",
        question: "How Do I Get a Quote & Service Contract?",
        answer: [
          "Getting started is simple. Contact VSF, submit our Service Quote Request Form, or email us at info@vsfus.com to discuss your security needs.",
          "When contacting us by email, please include your name, telephone number, property or business location, desired start date, and a brief description of your security requirements.",
          "We will review your property, location, coverage requirements, staffing needs, risk level, and security objectives and, when appropriate, conduct a site assessment before preparing a customized service proposal with transparent pricing.",
          "Once the proposal is accepted, we will provide a formal service agreement for review and signature. Security services begin after the agreement is executed by both parties.",
          "We believe every client deserves a professional security plan built around their specific needs."
        ]
      },
      {
        id: "faq-7",
        question: "How Much Experience Do You Have in the Industry?",
        answer: [
          "Virginia Surveillance Force, Inc. (VSF), established in 1987, has decades of experience providing professional security and specialized services. Our experience provides the professional personnel, resources, and management expertise required to handle a wide range of assignments.",
          "Our capabilities include armed and unarmed security, Special Police, Special Conservators of the Peace, investigations and intelligence, VIP and executive protection, bodyguard services, access control, vehicle patrols, event security, concierge and front desk services, parking attendants, fire watch, alarm response, and legal and medical courier services.",
          "We serve businesses, corporations, government agencies, embassies and diplomatic facilities, religious organizations, schools and universities, healthcare facilities, commercial and retail properties, hotels, residential communities, industrial facilities, and other organizations requiring professional security and specialized support.",
          "Our management team remains involved in planning, staffing, supervision, quality control, and ongoing client support to help ensure consistent and professional service.",
          "With decades of experience behind us, clients can choose VSF with confidence knowing they are working with an established security company with the professional personnel, expertise, and resources to handle a wide range of security and specialized assignments."
        ]
      },
      {
        id: "faq-8",
        question: "What Sets Virginia Surveillance Force Apart?",
        answer: [
          "Virginia Surveillance Force, Inc. (VSF), established in 1987, combines decades of security experience with professional personnel, responsive management, and disciplined field operations.",
          "We believe effective security requires more than simply placing an officer at a location. We focus on proper staffing, professional personnel, clear communication, active supervision, accountability, and responsive management.",
          "Our management team remains accessible and involved throughout each assignment, from planning and staffing to field supervision and ongoing client support. We work closely with our clients to understand their requirements and provide security solutions tailored to their property, operations, and specific needs.",
          "Whether you operate a small business, large corporation, government facility, embassy or diplomatic facility, residential community, religious organization, educational institution, healthcare facility, commercial property, or specialized facility, VSF provides professional security solutions tailored to the assignment.",
          "Our goal is to build long term client relationships through professionalism, reliability, communication, accountability, and consistent service."
        ]
      },
      {
        id: "faq-9",
        question: "How Do You Conduct Pre-Employment Screening?",
        answer: `
<p>Virginia Surveillance Force, Inc. (VSF) maintains a structured screening and selection process designed to identify qualified, reliable, and professional personnel for security assignments.</p>
<p>Depending on the position and applicable requirements, our screening process may include:</p>
<ul class="bullet-list" style="margin: 0.75rem 0 1rem;">
  <li>Application and Employment History Review</li>
  <li>Employment and Reference Verification</li>
  <li>Criminal History and Background Screening</li>
  <li>Required License, Registration, and Certification Verification</li>
  <li>Identity and Credential Verification</li>
  <li>Security Training and Qualification Review</li>
  <li>Assignment Specific Screening and Requirements</li>
</ul>
<p>Personnel are selected based on their qualifications, licensing requirements, experience, training, and suitability for the assignment.</p>
<p>Our screening process helps ensure that clients receive professional personnel who meet the requirements of their assigned security responsibilities.</p>
`
      },
      {
        id: "faq-10",
        question: "What Type of Supervision is Conducted in the Field?",
        answer: [
          "Professional supervision is a key part of effective security operations. VSF provides active management and field oversight to help maintain accountability, performance, and consistent service at every assignment.",
          "Our management and supervisory personnel conduct scheduled and unannounced site visits, officer inspections, post checks, performance reviews, and operational assessments. Supervisors also remain available to address concerns, coordinate with client management, and make adjustments when security requirements change.",
          "For assignments requiring additional on-site oversight, clients may request dedicated Site Supervisors or Shift Supervisors as part of their security program. Dedicated supervisory coverage can be tailored to the size of the assignment, number of officers, operating hours, risk level, and client requirements.",
          "From routine management oversight to dedicated on-site supervision, VSF provides the level of management involvement appropriate for each assignment.",
          "Established in 1987, VSF brings decades of experience, professional management, and field accountability to every security program we undertake."
        ]
      },
      {
        id: "faq-11",
        question: "How Do We Contact You If We Need You?",
        answer: `
<p>VSF provides clients with direct access to management and responsive communication throughout the assignment. Each client is assigned a designated management contact who remains available for service coordination, questions, concerns, security-related matters, and ongoing support.</p>
<p>Clients receive the assigned manager’s direct cell phone number and can call or text management directly when needed. Clients may also communicate with management by email for routine requests, documentation, scheduling, service coordination, and other business matters.</p>
<div style="background: rgba(19, 30, 53, 0.7); border: 1px solid rgba(201, 168, 76, 0.25); border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0;">
  <div style="color: #eab308; font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px;">Direct Office Contact:</div>
  <p style="margin: 0 0 0.25rem 0; font-size: 0.95rem; color: #fff;"><strong>Phone:</strong> <a href="tel:7036316559" style="color: #c9a84c; text-decoration: underline;">703-631-6559</a></p>
  <p style="margin: 0; font-size: 0.95rem; color: #fff;"><strong>Email:</strong> <a href="mailto:info@vsfus.com" style="color: #c9a84c; text-decoration: underline;">info@vsfus.com</a></p>
</div>
<p>Our management team remains accessible and involved because professional security requires more than personnel at the site. It requires dependable communication, responsive management, accountability, and ongoing support.</p>
<p>Established in 1987, VSF is committed to providing professional security backed by experienced management and responsive client service.</p>
`
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
