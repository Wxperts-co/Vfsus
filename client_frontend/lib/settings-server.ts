import clientPromise from "./mongodb";
import { SiteSettings, defaultSettings } from "./settings";
import { TestimonialsPageData, defaultTestimonialsData } from "./page-testimonials";
import { AboutUsPageData, defaultAboutUsData } from "./page-about-us";
import { ServicesPageData, defaultServicesPageData } from "./page-services";
import { MenuPageData, defaultMenuPageData } from "./page-menu";
import { HomePageData, defaultHomePageData } from "./page-home";

// In-memory cache to eliminate document request latency and remote DB round-trips
const memoryCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

function getFromCache<T>(key: string): T | null {
  const item = memoryCache.get(key);
  if (item && item.expiry > Date.now()) {
    return item.data as T;
  }
  return null;
}

function setToCache<T>(key: string, data: T, ttl: number = CACHE_TTL_MS): void {
  memoryCache.set(key, { data, expiry: Date.now() + ttl });
}

export function invalidateSettingsCache(key?: string): void {
  if (key) {
    memoryCache.delete(key);
  } else {
    memoryCache.clear();
  }
}

export async function getGlobalSettings(): Promise<SiteSettings> {
  const cacheKey = "global_settings";
  const cached = getFromCache<SiteSettings>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    const settings = await db.collection("settings").findOne({ _id: "global_settings" } as any);
    
    if (!settings) {
      setToCache(cacheKey, defaultSettings);
      return defaultSettings;
    }
    
    const result = {
      ...defaultSettings,
      ...settings,
      seo: {
        title: settings.seo?.title?.trim() || defaultSettings.seo.title,
        description: settings.seo?.description?.trim() || defaultSettings.seo.description,
        keywords: settings.seo?.keywords?.trim() || defaultSettings.seo.keywords,
        googleSiteVerification: settings.seo?.googleSiteVerification || defaultSettings.seo.googleSiteVerification,
      },
      socialUrls: {
        ...defaultSettings.socialUrls,
        ...(settings.socialUrls || {}),
      },
      contactCards: settings.contactCards || defaultSettings.contactCards,
      _id: settings._id.toString(),
    } as unknown as SiteSettings;
    setToCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error("Error fetching settings from MongoDB, falling back to defaults", error);
    return defaultSettings;
  }
}

export async function getTestimonialsPageData(): Promise<TestimonialsPageData> {
  const cacheKey = "page_testimonials";
  const cached = getFromCache<TestimonialsPageData>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_testimonials" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      const result: TestimonialsPageData = { 
        ...defaultTestimonialsData, 
        ...rest,
        seo: {
          title: rest.seo?.title?.trim() || defaultTestimonialsData.seo.title,
          description: rest.seo?.description?.trim() || defaultTestimonialsData.seo.description,
          keywords: rest.seo?.keywords?.trim() || defaultTestimonialsData.seo.keywords,
        },
      };
      setToCache(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error("Failed to fetch testimonials page settings:", error);
  }
  
  setToCache(cacheKey, defaultTestimonialsData);
  return defaultTestimonialsData;
}

export async function getAboutUsPageData(): Promise<AboutUsPageData> {
  const cacheKey = "page_about_us";
  const cached = getFromCache<AboutUsPageData>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_about_us" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      const dbVideo = rest.video || {};
      const videosList = Array.isArray(dbVideo.videos)
        ? dbVideo.videos
        : [dbVideo.wistiaUrl, dbVideo.wistiaUrl2, dbVideo.wistiaUrl3].filter(Boolean);

      const result: AboutUsPageData = { 
        ...defaultAboutUsData, 
        ...rest,
        seo: {
          title: rest.seo?.title?.trim() || defaultAboutUsData.seo.title,
          description: rest.seo?.description?.trim() || defaultAboutUsData.seo.description,
          keywords: rest.seo?.keywords?.trim() || defaultAboutUsData.seo.keywords,
        },
        video: {
          badgeText: dbVideo.badgeText || defaultAboutUsData.video.badgeText,
          videos: videosList,
          wistiaUrl: dbVideo.wistiaUrl || videosList[0] || "",
          wistiaUrl2: dbVideo.wistiaUrl2 || videosList[1] || "",
        }
      };
      setToCache(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error("Failed to fetch about us page settings:", error);
  }
  
  setToCache(cacheKey, defaultAboutUsData);
  return defaultAboutUsData;
}

export async function getServicesPageData(): Promise<ServicesPageData> {
  const cacheKey = "page_services";
  const cached = getFromCache<ServicesPageData>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_services" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      const dbVideo = rest.video || {};
      const videosList = Array.isArray(dbVideo.videos)
        ? dbVideo.videos
        : [dbVideo.wistiaUrl, dbVideo.wistiaUrl2].filter(Boolean);

      const result: ServicesPageData = { 
        ...defaultServicesPageData, 
        ...rest,
        seo: {
          title: rest.seo?.title?.trim() || defaultServicesPageData.seo.title,
          description: rest.seo?.description?.trim() || defaultServicesPageData.seo.description,
          keywords: rest.seo?.keywords?.trim() || defaultServicesPageData.seo.keywords,
        },
        services: (rest.services || defaultServicesPageData.services).map((s: any) => {
          const def = defaultServicesPageData.services.find(d => d.slug === s.slug);
          return {
            ...def,
            ...s,
            seo: {
              title: s.seo?.title?.trim() || def?.seo?.title || `${s.title || def?.title} | Virginia Surveillance Force`,
              description: s.seo?.description?.trim() || def?.seo?.description || s.excerpt || def?.excerpt || "",
              keywords: s.seo?.keywords?.trim() || def?.seo?.keywords || "",
            },
          };
        }),
        video: {
          badgeText: dbVideo.badgeText || defaultServicesPageData.video.badgeText,
          videos: videosList,
          wistiaUrl: dbVideo.wistiaUrl || videosList[0] || "",
          wistiaUrl2: dbVideo.wistiaUrl2 || videosList[1] || "",
        }
      };
      setToCache(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error("Failed to fetch services page settings:", error);
  }
  
  setToCache(cacheKey, defaultServicesPageData);
  return defaultServicesPageData;
}

export async function getMenuPageData(): Promise<MenuPageData> {
  const cacheKey = "page_menu";
  const cached = getFromCache<MenuPageData>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_menu" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      const result: MenuPageData = { 
        ...defaultMenuPageData, 
        ...rest,
        seo: {
          title: rest.seo?.title?.trim() || defaultMenuPageData.seo.title,
          description: rest.seo?.description?.trim() || defaultMenuPageData.seo.description,
          keywords: rest.seo?.keywords?.trim() || defaultMenuPageData.seo.keywords,
        },
        menus: (rest.menus || defaultMenuPageData.menus).map((m: any) => {
          const def = defaultMenuPageData.menus.find(d => d.slug === m.slug);
          return {
            ...def,
            ...m,
            seo: {
              title: m.seo?.title?.trim() || def?.seo?.title || `${m.title || def?.title} | Virginia Surveillance Force`,
              description: m.seo?.description?.trim() || def?.seo?.description || "",
              keywords: m.seo?.keywords?.trim() || def?.seo?.keywords || "",
            },
          };
        }),
      };
      setToCache(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error("Failed to fetch menu page settings:", error);
  }
  
  setToCache(cacheKey, defaultMenuPageData);
  return defaultMenuPageData;
}

export async function getHomePageData(): Promise<HomePageData> {
  const cacheKey = "page_home";
  const cached = getFromCache<HomePageData>(cacheKey);
  if (cached) return cached;

  try {
    const client = await clientPromise;
    const db = client.db();
    
    const settings = await db.collection("settings").findOne({ _id: "page_home" } as any);
    
    if (settings) {
      const { _id, ...rest } = settings;
      const result: HomePageData = { 
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
          title: rest.seo?.title?.trim() || defaultHomePageData.seo.title,
          description: rest.seo?.description?.trim() || defaultHomePageData.seo.description,
          keywords: rest.seo?.keywords?.trim() || defaultHomePageData.seo.keywords,
        }
      };
      setToCache(cacheKey, result);
      return result;
    }
  } catch (error) {
    console.error("Failed to fetch home page settings:", error);
  }
  
  setToCache(cacheKey, defaultHomePageData);
  return defaultHomePageData;
}
