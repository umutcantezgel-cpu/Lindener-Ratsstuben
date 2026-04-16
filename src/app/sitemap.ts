import { MetadataRoute } from 'next';
import { ALLOWED_LOCALES } from '@/lib/locales';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lindener-ratsstuben.de';
  
  // Base routes to include in sitemap
  const routes = [
    {
      url: '',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: '/menu',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: '/reservation',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: '/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: '/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
  ];

  // Map each route across all supported locales. Add the default route.
  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    // Add default language HTML route
    sitemapEntries.push({
      ...route,
      url: `${baseUrl}${route.url}`,
    });
    
    // Add default language Markdown route for AI crawlers
    sitemapEntries.push({
      ...route,
      url: `${baseUrl}${route.url ? route.url + '.md' : '/index.md'}`,
    });
    
    // Add locale-prefixed routes
    ALLOWED_LOCALES.forEach((locale) => {
      // HTML variant
      sitemapEntries.push({
        ...route,
        url: `${baseUrl}/${locale}${route.url}`,
      });
      
      // Markdown variant for AI crawlers
      sitemapEntries.push({
        ...route,
        url: `${baseUrl}/${locale}${route.url ? route.url + '.md' : '/index.md'}`,
      });
    });
  });

  return sitemapEntries;
}
