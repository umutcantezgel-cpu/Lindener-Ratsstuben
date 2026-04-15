import { MetadataRoute } from 'next';
import { ALLOWED_LOCALES } from '@/lib/locales';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lindener-ratsstuben.de';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          ...ALLOWED_LOCALES.map(locale => `/${locale}/`),
        ],
        disallow: ['/admin', '/api/internal', '/.ai-expansion-context.md'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

