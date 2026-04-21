/**
 * ═══════════════════════════════════════════════════════════════
 * ROBOTS.TXT GENERATOR
 * Defense-in-depth: Disallow *.md for regular crawlers in addition
 * to the X-Robots-Tag headers set on the markdown responses.
 * AI crawlers get full access including llms.txt.
 * ═══════════════════════════════════════════════════════════════
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sanity/', '/*.md', '/dev/', '/status/'],
      },
      {
        userAgent: [
          'GPTBot',
          'Google-Extended',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot-Extended',
          'OAI-SearchBot',
          'anthropic-ai',
          'CCBot',
          'Diffbot',
          'FacebookBot',
          'ImagesiftBot',
        ],
        allow: ['/', '/llms.txt'],
      },
    ],
    sitemap: 'https://lindener-ratsstuben.de/sitemap.xml',
  };
}
