import type { MetadataRoute } from 'next';
import { getServicesPageData, getMenuPageData } from '@/lib/settings-server';
import { formsList } from '@/data/formsdetails';

export const revalidate = 3600; // 1 hour dynamic revalidation

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vsfus.com';

  // 1. Static & Core Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request-quote`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pay-now`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. Dynamic Service Detail Routes (16+ services)
  let serviceRoutes: MetadataRoute.Sitemap = [];
  try {
    const servicesData = await getServicesPageData();
    if (servicesData?.services?.length > 0) {
      serviceRoutes = servicesData.services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap services:', error);
  }

  // 3. Dynamic Menu Detail Routes (7+ menu pages)
  let menuRoutes: MetadataRoute.Sitemap = [];
  try {
    const menuData = await getMenuPageData();
    if (menuData?.menus?.length > 0) {
      menuRoutes = menuData.menus.map((menu) => ({
        url: `${baseUrl}/menu/${menu.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap menu items:', error);
  }

  // 4. Dynamic Form Pages Routes
  const formRoutes: MetadataRoute.Sitemap = formsList.map((form) => ({
    url: `${baseUrl}/forms/${form.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...menuRoutes,
    ...formRoutes,
  ];
}
