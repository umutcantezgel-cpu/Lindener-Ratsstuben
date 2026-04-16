import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/sanity/'],
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
          'ImagesiftBot'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://lindener-ratsstuben.de/sitemap.xml',
  };
}
