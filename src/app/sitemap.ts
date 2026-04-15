import { MetadataRoute } from 'next';
import { ALLOWED_LOCALES } from '@/lib/locales';
import { getAllRegionalArticles } from '@/utils/markdown-regional';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface PageEntry {
  path: string;
  changeFrequency: ChangeFreq;
  priority: number;
}

const PAGES: PageEntry[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/menu', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gallery', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/reservation', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/impressum', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/datenschutz', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/cookie-richtlinie', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lindener-ratsstuben.de';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ALLOWED_LOCALES) {
    for (const page of PAGES) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }

    // Add regional SEO hub
    entries.push({
      url: `${baseUrl}/${locale}/entdecken`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
    
    // Add all regional SEO articles
    const regionalArticles = getAllRegionalArticles();
    for (const article of regionalArticles) {
      entries.push({
        url: `${baseUrl}/${locale}/${article.category}/${article.slug}`,
        lastModified: article.lastUpdated ? new Date(article.lastUpdated) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}

