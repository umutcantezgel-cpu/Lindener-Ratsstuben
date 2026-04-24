/**
 * ═══════════════════════════════════════════════════════════════
 * SITEMAP GENERATOR
 * Driven by the central route registry + dynamic regional content.
 * IMPORTANT: .md mirror URLs are intentionally EXCLUDED because
 * they are served with X-Robots-Tag: noindex. Including noindex
 * URLs in the sitemap is an SEO anti-pattern.
 * ═══════════════════════════════════════════════════════════════
 */

import { MetadataRoute } from 'next';
import { ACTIVE_LOCALES } from '@/lib/locales';
import { CONTENT_ROUTES } from '@/lib/routes';
import { getAllRegionalArticles } from '@/utils/markdown-regional';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lindener-ratsstuben.de';
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // ─── Static routes from the central route registry ───
  // Only include routes marked as indexable to prevent SEO signal conflicts
  const indexableRoutes = CONTENT_ROUTES.filter(r => r.indexable !== false);
  for (const route of indexableRoutes) {
    const routePath = route.path === '/' ? '' : route.path;

    // Default (non-locale-prefixed) HTML route
    sitemapEntries.push({
      url: `${baseUrl}${routePath || '/'}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });

    // Locale-prefixed HTML routes (only ACTIVE locales)
    for (const locale of ACTIVE_LOCALES) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${routePath}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    // NOTE: .md variants are intentionally NOT included.
    // They serve X-Robots-Tag: noindex, noarchive – listing them
    // in the sitemap would create an SEO signal conflict.
  }

  // ─── Dynamic regional content pages (ausflug, freizeit, region, business) ───
  try {
    const regionalArticles = getAllRegionalArticles();
    for (const article of regionalArticles) {
      const articlePath = `/${article.category}/${article.slug}`;

      // Default route
      sitemapEntries.push({
        url: `${baseUrl}${articlePath}`,
        lastModified: article.lastUpdated ? new Date(article.lastUpdated) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });

      // Locale-prefixed routes
      for (const locale of ACTIVE_LOCALES) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${articlePath}`,
          lastModified: article.lastUpdated ? new Date(article.lastUpdated) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch {
    // Regional content directory may not exist in all environments
    // Silently continue with static routes only
  }

  return sitemapEntries;
}
