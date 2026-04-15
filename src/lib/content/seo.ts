import { ContentIndexEntry } from './schema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lindener-ratsstuben.de';
const SITE_NAME = 'Lindener Ratsstuben';
const SITE_LOGO = `${SITE_URL}/placeholder.svg`;

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  og: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
  jsonLd: Record<string, unknown>;
  relatedSlugs: string[];
}

export function generateJsonLd(doc: ContentIndexEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: doc.title.slice(0, 110),
    description: doc.description,
    image: doc.seo?.ogImage || `${SITE_URL}/placeholder.svg`,
    datePublished: new Date(doc.publishedAt).toISOString(),
    dateModified: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date(doc.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: doc.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${doc.collectionType}/${doc.slug}`,
    },
    wordCount: doc.wordCount,
    timeRequired: `PT${doc.readingTime}M`,
  };
}

export function generateInternalLinks(
  doc: ContentIndexEntry,
  allDocs: ContentIndexEntry[]
): string[] {
  const candidates = allDocs.filter((d) => d.slug !== doc.slug);

  const scored = candidates.map((candidate) => {
    let score = 0;

    // Tag overlap scoring
    for (const tag of doc.tags) {
      if (candidate.tags.includes(tag)) score += 3;
    }

    // Same category bonus
    if (candidate.category === doc.category) score += 2;

    // Same series bonus
    if (doc.series && candidate.series === doc.series) score += 5;

    // Recency bonus (newer = higher)
    const daysDiff =
      (Date.now() - new Date(candidate.publishedAt).getTime()) /
      (1000 * 60 * 60 * 24);
    if (daysDiff < 30) score += 2;
    else if (daysDiff < 90) score += 1;

    return { slug: candidate.slug, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.slug);
}

export function calculateSeo(
  doc: ContentIndexEntry,
  allDocs: ContentIndexEntry[]
): SeoMeta {
  const canonical = `${SITE_URL}/${doc.collectionType}/${doc.slug}`;
  const ogImage = doc.seo?.ogImage || `${SITE_URL}/placeholder.svg`;
  const keywords = doc.seo?.keywords || doc.tags;

  return {
    title: doc.title.slice(0, 60),
    description: doc.description.slice(0, 160),
    keywords,
    canonical,
    og: {
      title: doc.title.slice(0, 60),
      description: doc.description.slice(0, 160),
      image: ogImage,
      url: canonical,
      type: doc.category === 'blog' || doc.category === 'case-study' ? 'article' : 'website',
      publishedTime: new Date(doc.publishedAt).toISOString(),
      modifiedTime: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
      author: doc.author,
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title.slice(0, 70),
      description: doc.description.slice(0, 200),
      image: ogImage,
    },
    jsonLd: generateJsonLd(doc),
    relatedSlugs: generateInternalLinks(doc, allDocs),
  };
}
