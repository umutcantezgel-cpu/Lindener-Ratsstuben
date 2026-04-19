/**
 * ═══════════════════════════════════════════════════════════════
 * SITEMAP GENERATOR
 * Driven by the central route registry.
 * IMPORTANT: .md mirror URLs are intentionally EXCLUDED because
 * they are served with X-Robots-Tag: noindex. Including noindex
 * URLs in the sitemap is an SEO anti-pattern.
 * ═══════════════════════════════════════════════════════════════
 */

import { MetadataRoute } from 'next';
import { ACTIVE_LOCALES } from '@/lib/locales';
import { CONTENT_ROUTES } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lindener-ratsstuben.de';
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of CONTENT_ROUTES) {
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

  return sitemapEntries;
}
