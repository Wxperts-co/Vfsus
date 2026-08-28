// lib/page-home.ts

export interface HomeAboutCounter {
  number: number;
  label: string;
  symbol: string; // e.g., "+", "%"
}

export interface HomeAboutSection {
  videoUrl: string;
  description: string;
  counters: HomeAboutCounter[];
  titleLine1: string;
  titleLine2: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface HomeWhyChooseIndustry {
  id: number;
  icon: string;
  title: string;
  description: string;
  delay: string;
  column: 1 | 2 | 3;
}

export interface HomeWhyChooseSection {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  backgroundImage: string;
  rightImage: string;
  industries: HomeWhyChooseIndustry[];
}

export interface HomeTestimonial {
  id: number;
  description: string;
  rating: number;
  name: string;
}

export interface HomeClientLogo {
  id: number;
  image: string;
  alt: string;
}

export interface HomeTestimonialsSection {
  titlePart1: string;
  titlePart2: string;
  backgroundImage: string;
  googleReviewLogo: string;
  testimonials: HomeTestimonial[];
  logoSlides: HomeClientLogo[];
}

export interface HomePageData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  aboutSection: HomeAboutSection;
  whyChooseUsSection: HomeWhyChooseSection;
  testimonialsSection: HomeTestimonialsSection;
}

export const defaultHomePageData: HomePageData = {
  seo: {
    title: "Home | Virginia Surveillance Force",
    description: "Virginia Surveillance Force is a premier security and investigative firm.",
    keywords: "security, investigation, protection",
  },
  aboutSection: {
    videoUrl: "https://fast.wistia.net/embed/iframe/bukr8v224n",
    description: "Welcome to the American based firm working throughout the Washington DC DMV area. We provide Special Police, Concierge, Courier, Fire Watch, Armed & Unarmed officers, Vehicle Patrol, Investigative and Protective Services. Regardless of the type of service you need, you're looking for peace of mind. You want an authoritative presence that provides you with ultimate security. We believe in investing in our people, so they, in turn, invest in you. Whether you are a small or large business or government entity, whether your needs are immediate or long-term, we have the solutions to your security & business problems. We provide the peace of mind you are looking for.",
    counters: [
      { number: 700, symbol: "+", label: "Certified & Trained Officers" },
      { number: 98, symbol: "%", label: "Client Retention Rate" },
      { number: 2500, symbol: "+", label: "Security Assignments Completed" }
    ],
    titleLine1: "Delivering Protection",
    titleLine2: "That Builds Trust & Peace of Mind",
    image: "/images/about-section-2.jpg",
    buttonText: "Read More",
    buttonLink: "/about-us"
  },
  whyChooseUsSection: {
    subtitle: "WHY CHOOSE US",
    titleLine1: "Protecting",
    titleLine2: "Diverse Sectors",
    description: "When selecting a security contractor, you're looking for a company that knows its business, has an established reputation and plays on your team. At Virginia Surveillance Force, we work closely with our clients to develop the correct security strategy for their organizations since 1987.",
    backgroundImage: "/images/about-bg-section.webp",
    rightImage: "/images/choose-section.jpg",
    industries: [
      { id: 1, icon: "/images/industry-icon1.svg", title: "Corporate Offices", description: "Executive protection and facility security", delay: "100", column: 1 },
      { id: 2, icon: "/images/industry-icon2.svg", title: "Shopping Malls", description: "Retail security and loss prevention", delay: "200", column: 1 },
      { id: 3, icon: "/images/industry-icon3.svg", title: "Construction Sites", description: "Asset protection and site monitoring", delay: "300", column: 2 },
      { id: 4, icon: "/images/industry-icon4.svg", title: "Hotels & Resorts", description: "Guest safety and property protection", delay: "400", column: 2 },
      { id: 5, icon: "/images/industry-icon5.svg", title: "Hospitals", description: "Healthcare facility security services", delay: "500", column: 3 },
      { id: 6, icon: "/images/industry-icon6.svg", title: "Government Facilities", description: "High-security government installations", delay: "600", column: 3 }
    ]
  },
  testimonialsSection: {
    titlePart1: "Our",
    titlePart2: "Happy Customers",
    backgroundImage: "/images/about-bg-section.webp",
    googleReviewLogo: "/images/google-review-logo.png",
    testimonials: [
      { id: 1, description: "I initially hired VA. Surveillance Force during thanksgiving on a temporary basis, but the level of service quickly exceeded our expectations...", rating: 5, name: "Lily Z." },
      { id: 2, description: "We switched to Virginia Surveillance company after ongoing issues with our previous provider. The difference was immediate...", rating: 5, name: "Henry Anatsui" },
      { id: 3, description: "On July 4th, after residents had finished fireworks and gone to sleep, Virginia Surveillance Force officer noticed smoke on the rooftop around 1:40 AM...", rating: 5, name: "Della Paul" },
      { id: 4, description: "The security team at the entrance struck an ideal balance between ensuring safety and providing warm hospitality...", rating: 5, name: "Omid Karimi" },
      { id: 5, description: "I have witnessed the security officers at the private school consistently professional, approachable, and welcoming...", rating: 5, name: "Hermann E" }
    ],
    logoSlides: [
      { id: 1, image: "/images/client-1111.jpg", alt: "Client Logo 1" },
      { id: 4, image: "/images/client-4.jpg", alt: "Client Logo 4" },
      { id: 5, image: "/images/client-5.jpg", alt: "Client Logo 5" },
      { id: 6, image: "/images/client-6.jpg", alt: "Client Logo 6" }
    ]
  }
};
