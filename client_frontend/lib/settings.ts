export interface ContactCard {
  id: string;
  label: string;
  name: string;
  address: string[];
  tel: string;
  extra: string;
  extraLabel: string;
  icon: string;
}

export interface SiteSettings {
  _id?: string;
  logoUrl: string;
  location: string;
  contactNo: string;
  email: string;
  mapLink: string;
  socialUrls: {
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    googleSiteVerification: string;
  };
  contactCards: ContactCard[];
}

export const defaultSettings: SiteSettings = {
  logoUrl: "/images/logo2.png",
  location: "7544 Diplomat Dr #101, Manassas, VA 20109",
  contactNo: "(800) 786-0395",
  email: "info@vsfus.com",
  mapLink: "https://maps.app.goo.gl/uSR8odXD56PMeaNC7",
  socialUrls: {
    facebook: "https://www.facebook.com/pages/VSF/160758390617323",
    twitter: "https://twitter.com/vsfus",
    linkedin: "https://www.linkedin.com/company/virginia-surveillance-force",
    youtube: "https://www.youtube.com/channel/UCHi7o-he252fKlxkMGloQtw"
  },
  seo: {
    title: "Virginia Surveillance Force",
    description: "Get professional, licensed, and trained security services for businesses, events, and residences — with rapid response and 24/7 availability.",
    keywords: "security, surveillance, guard, patrol, virginia",
    googleSiteVerification: ""
  },
  contactCards: [
    {
        id: "loc_1",
        label: "Virginia",
        name: "Virginia Surveillance Force",
        address: ["7544 Diplomat Drive; Suite 101", "Manassas, VA 20109"],
        tel: "(703) 631-6559",
        extra: "(800) 786-0395",
        extraLabel: "Toll Free",
        icon: "📍",
    },
    {
        id: "loc_2",
        label: "Maryland",
        name: "Maryland Location",
        address: ["1 Research Ct Suite 450", "Rockville, MD 20850"],
        tel: "(301) 800-7774",
        extra: "(866) 428-5725",
        extraLabel: "Fax",
        icon: "📍",
    },
    {
        id: "loc_3",
        label: "Washington DC",
        name: "Washington DC Location",
        address: ["1725 I Street, NW; Suite 300", "Washington, DC 20006"],
        tel: "(202) 888-2727",
        extra: "(800) 981-3113",
        extraLabel: "Toll Free",
        icon: "📍",
    },
    {
        id: "loc_4",
        label: "Mailing",
        name: "Mailing Address",
        address: ["Po Box #1876", "Centreville, VA 20122"],
        tel: "(786) 540-0666",
        extra: "(800) 570-8290",
        extraLabel: "Fax",
        icon: "✉️",
    },
  ]
};
