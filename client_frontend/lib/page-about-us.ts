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
    videos?: string[];
    wistiaUrl?: string;
    wistiaUrl2?: string;
    wistiaUrl3?: string;
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

export function extractVideoList(video?: {
  badgeText?: string;
  videos?: string[];
  wistiaUrl?: string;
  wistiaUrl2?: string;
  wistiaUrl3?: string;
}): string[] {
  if (!video) return [];
  if (Array.isArray(video.videos)) {
    return video.videos.filter((v) => typeof v === "string" && v.trim() !== "");
  }
  return [video.wistiaUrl, video.wistiaUrl2, video.wistiaUrl3].filter(
    (v): v is string => Boolean(v && typeof v === "string" && v.trim() !== "")
  );
}

export const defaultAboutUsData: AboutUsPageData = {
  seo: {
    title: "Security Company in Maryland, Washington | Virginia Surveillance Force",
    description: "Virginia Surveillance Force provides professional armed, unarmed, and patrol security services across Maryland, Washington, D.C., and Virginia",
    keywords: "Security Company Virginia, Security Guard Company Virginia, Security Services Virginia, Private Security Company Virginia, Private Security Services Virginia, Security Guards Virginia, Security Officers Virginia, Professional Security Services Virginia, Security Company Northern Virginia, Security Guard Company Northern Virginia, Security Services Northern Virginia, Security Guards Northern Virginia, Private Security Northern Virginia, Professional Security Services Northern Virginia, Security Company Maryland, Security Guard Company Maryland, Security Services Maryland, Private Security Company Maryland, Private Security Services Maryland, Security Guards Maryland, Security Officers Maryland, Professional Security Services Maryland, Security Company Washington DC, Security Guard Company Washington DC, Security Services Washington DC, Private Security Company Washington DC, Private Security Services Washington DC, Security Guards Washington DC, Security Officers Washington DC, Professional Security Services Washington DC, Security Company DMV, Security Guard Company DMV, Security Services DMV, Private Security Services DMV, Professional Security Services DMV",
  },
  intro: {
    headlineLeft: "Protecting What",
    headlineRight: "Matters Most",
    contentLeftHtml: `
      <p>At <strong>Virginia Surveillance Force, Inc. (VSF)</strong>, Established Since 1987, we provide professional security, investigative, protective, and specialized support services <strong>24 hours a day, 7 days a week</strong>, <strong>365 days a year</strong>. We proudly serve businesses, organizations, and communities throughout Virginia, Maryland, and Washington, DC, with integrity, professionalism, and dependable service.</p>
      <p>We are a licensed, insured, and bonded security company committed to providing reliable protection while maintaining the highest standards of professionalism, ethics, and accountability.</p>
      <p>We understand that every client, property, and organization has unique needs. We take the time to understand your objectives, identify potential risks, and develop customized security solutions designed specifically for your environment.</p>
      <p>At VSF, we believe honesty, fairness, and trust are the foundation of every successful client relationship. We believe security should never be compromised, and we are committed to doing the job right while maintaining the highest standards of quality and service.</p>
    `,
    contentRightHtml: `
      <p>Our commitment to excellence has helped us build lasting relationships with clients through repeat business, long-term contracts, and referrals. We take pride in earning our clients’ trust and becoming a security partner they can depend on.</p>
      <p>Our highly trained professionals provide a disciplined, visible, and dependable security presence designed to help deter threats, reduce risk, and protect the people and property entrusted to us.</p>
      <p>Our goal is not simply to provide security personnel. It is to provide confidence, safety, and peace of mind while protecting what matters most.</p>
      <ul>
        <li><p><strong>Virginia Surveillance Force, Inc.</strong></p></li>
        <li><p><strong>Established Since 1987</strong></p></li>
        <li><p><strong>Professional Security. Trusted Protection.</strong></p></li>
        <li><p><strong>Protecting What Matters Most.</strong></p></li>
      </ul>
    `,
  },
  video: {
    badgeText: "Live Operations",
    videos: [
      "//fast.wistia.net/embed/iframe/6p58wy1zta",
    ],
    wistiaUrl: "//fast.wistia.net/embed/iframe/6p58wy1zta",
    wistiaUrl2: "",
  },
  stats: [
    { id: "s1", icon: "🕐", label: "24 / 7 / 365 Operations" },
    { id: "s2", icon: "🛡️", label: "Licensed, Insured & Bonded" },
    { id: "s3", icon: "🎖️", label: "Licensed & Certified Officers" },
    { id: "s4", icon: "⭐", label: "High Client Retention" },
  ],
  promises: {
    headlineLeft: "Our",
    headlineRight: "Commitments",
    items: [
      { id: "p1", title: "Ethics First", body: "We do not compromise services to maximize profits. Honesty and fairness drive every decision we make." },
      { id: "p2", title: "Premium Standards", body: "We put your mind at ease with exceptional security services, treating clients, vendors, and employees with the utmost respect." },
      { id: "p3", title: "Reasonable Rates", body: "Professional security at competitive pricing, with practical solutions that fit your needs and budget." },
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
