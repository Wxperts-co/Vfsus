import clientPromise from "./mongodb";
import { SiteSettings, defaultSettings } from "./settings";
import { TestimonialsPageData, defaultTestimonialsData } from "./page-testimonials";
import { AboutUsPageData, defaultAboutUsData } from "./page-about-us";
import { ServicesPageData, defaultServicesPageData } from "./page-services";
import { MenuPageData, defaultMenuPageData } from "./page-menu";
import { HomePageData, defaultHomePageData } from "./page-home";

export async function getGlobalSettings(): Promise<SiteSettings> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const settings = await db.collection("settings").findOne({ _id: "global_settings" } as any);
    
    if (!settings) {
      return defaultSettings;
    }
    
    return { ...defaultSettings, ...settings, _id: settings._id.toString() } as unknown as SiteSettings;
  } catch (error) {
    console.error("Error fetching settings from MongoDB, falling back to defaults", error);
    return defaultSettings;
  }
}


export async function getTestimonialsPageData(): Promise<TestimonialsPageData> {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_testimonials" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      return { ...defaultTestimonialsData, ...rest };
    }
  } catch (error) {
    console.error("Failed to fetch testimonials page settings:", error);
  }
  
  return defaultTestimonialsData;
}

export async function getAboutUsPageData(): Promise<AboutUsPageData> {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_about_us" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      return { 
        ...defaultAboutUsData, 
        ...rest,
        video: {
          ...defaultAboutUsData.video,
          ...(rest.video || {})
        }
      };
    }
  } catch (error) {
    console.error("Failed to fetch about us page settings:", error);
  }
  
  return defaultAboutUsData;
}

export async function getServicesPageData(): Promise<ServicesPageData> {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_services" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      return { ...defaultServicesPageData, ...rest };
    }
  } catch (error) {
    console.error("Failed to fetch services page settings:", error);
  }
  
  return defaultServicesPageData;
}

export async function getMenuPageData(): Promise<MenuPageData> {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_menu" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      return { ...defaultMenuPageData, ...rest };
    }
  } catch (error) {
    console.error("Failed to fetch menu page settings:", error);
  }
  
  return defaultMenuPageData;
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_home" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      return { 
        ...defaultHomePageData, 
        ...rest,
        aboutSection: {
          ...defaultHomePageData.aboutSection,
          ...(rest.aboutSection || {})
        },
        whyChooseUsSection: {
          ...defaultHomePageData.whyChooseUsSection,
          ...(rest.whyChooseUsSection || {})
        },
        testimonialsSection: {
          ...defaultHomePageData.testimonialsSection,
          ...(rest.testimonialsSection || {})
        },
        seo: {
          ...defaultHomePageData.seo,
          ...(rest.seo || {})
        }
      };
    }
  } catch (error) {
    console.error("Failed to fetch home page settings:", error);
  }
  
  return defaultHomePageData;
}

