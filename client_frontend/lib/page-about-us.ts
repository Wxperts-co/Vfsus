export interface AboutUsPageData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  intro: {
    headlineLeft: string;
    headlineRight: string;
    contentLeftHtml: string;
    contentRightHtml: string;
  };
  video: {
    badgeText: string;
    wistiaUrl: string;
  };
  stats: Array<{
    id: string;
    icon: string;
    label: string;
  }>;
  promises: {
    headlineLeft: string;
    headlineRight: string;
    items: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  training: {
    headlineLeft: string;
    headlineRight: string;
    introHtml: string;
    items: Array<{
      id: string;
      text: string;
    }>;
  };
}

export const defaultAboutUsData: AboutUsPageData = {
  seo: {
    title: "About Us | Virginia Surveillance Force",
    description: "At Virginia Surveillance Force, Inc., we work 24/7/365 to provide business, investigative, and protective services that protect your interests.",
    keywords: "Virginia Surveillance Force, security, about us",
  },
  intro: {
    headlineLeft: "Protecting What",
    headlineRight: "Matters Most",
    contentLeftHtml: `
      <p>At <strong>Virginia Surveillance Force, Inc.</strong>, we work 24/7/365 to provide business, investigative, and protective services that protect your interests. VSF is a professional, licensed, insured, and bonded company serving business communities across Virginia.</p>
      <p>Virginia Surveillance Force strongly advocates honesty and fairness. Our entire team is committed to meeting your needs — which is why a high percentage of our business comes from repeat customers and referrals.</p>
    `,
    contentRightHtml: `
      <p>We are an equal opportunity company committed to serving you at the highest standard of professionalism and ethics. We do not believe in compromising services to maximize company profits.</p>
      <p>Our staff &amp; officers are fully insured and bonded beyond the limits required by Virginia — and that translates to more security and peace of mind for you. They are trained for success, serving as your eyes and ears around the clock.</p>
    `,
  },
  video: {
    badgeText: "Live Operations",
    wistiaUrl: "//fast.wistia.net/embed/iframe/6p58wy1zta",
  },
  stats: [
    { id: "s1", icon: "🕐", label: "24 / 7 / 365 Operations" },
    { id: "s2", icon: "🛡️", label: "Licensed & Bonded" },
    { id: "s3", icon: "🎖️", label: "Certified Officers" },
    { id: "s4", icon: "⭐", label: "High Repeat-Client Rate" },
  ],
  promises: {
    headlineLeft: "Our",
    headlineRight: "Commitments",
    items: [
      { id: "p1", title: "Ethics First", body: "We do not compromise services to maximize profits. Honesty and fairness drive every decision we make." },
      { id: "p2", title: "Premium Standards", body: "We put your mind at ease with top-notch, unsurpassed services — treating clients, vendors, and employees with utmost respect." },
      { id: "p3", title: "Reasonable Rates", body: "Industry-leading security at competitive pricing. Ongoing or emergency — we have a solution that fits your budget." },
    ],
  },
  training: {
    headlineLeft: "Academy-",
    headlineRight: "Certified Training",
    introHtml: "<p>All of our staff & officers are certified through training academies — meaning they already know how to handle emergencies of all kinds before they encounter them. They are trained to assess situations and involve police and emergency services when necessary.</p>",
    items: [
      { id: "t1", text: "Respond to emergencies of all kinds" },
      { id: "t2", text: "Assess situations and escalate to authorities" },
      { id: "t3", text: "Question and manage strangers on-site" },
      { id: "t4", text: "Maintain detailed incident reports" },
      { id: "t5", text: "Appear in court when required" },
      { id: "t6", text: "Respond to fire & break-in events" },
      { id: "t7", text: "Handle health emergency situations" },
      { id: "t8", text: "Manage drug & alcohol-related incidents" },
    ],
  },
};
