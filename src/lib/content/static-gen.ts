import fs from 'fs';
import path from 'path';
import { ContentIndexEntry } from './schema';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const CONTENT_INDEX = path.join(CACHE_DIR, 'content-index.json');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lindener-ratsstuben.de';
const SITE_NAME = 'Lindener Ratsstuben';
const SITE_DESCRIPTION = 'Traditionelle deutsche Küche in Hannover-Linden';

export function getPublishedDocs(): ContentIndexEntry[] {
  if (!fs.existsSync(CONTENT_INDEX)) return [];
  const raw = fs.readFileSync(CONTENT_INDEX, 'utf-8');
  const docs: ContentIndexEntry[] = JSON.parse(raw);
  return docs.filter((d) => !d.draft && new Date(d.publishedAt) <= new Date());
}

export function generateSitemapXml(): string {
  const docs = getPublishedDocs();
  const urls = docs.map((doc) => {
    const loc = `${SITE_URL}/${doc.collectionType}/${doc.slug}`;
    const lastmod = doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : new Date(doc.publishedAt).toISOString();
    const changefreq = doc.collectionType === 'blog' ? 'weekly' : 'monthly';
    const priority = doc.collectionType === 'blog' ? '0.8' : doc.collectionType === 'case-study' ? '0.9' : '0.6';

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

export function generateRssFeed(): string {
  const docs = getPublishedDocs()
    .filter((d) => d.collectionType === 'blog')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 20);

  const items = docs.map((doc) => {
    const link = `${SITE_URL}/blog/${doc.slug}`;
    const pubDate = new Date(doc.publishedAt).toUTCString();

    return `    <item>
      <title><![CDATA[${doc.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${doc.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <author>${doc.author}</author>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>de</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>`;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}
