import fs from 'fs';
import path from 'path';
import { generateSitemapXml, generateRssFeed, generateRobotsTxt } from '../src/lib/content/static-gen';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function main() {
  console.log('[CW-06] Starting Static Generation Pipeline...');

  // 1. Sitemap
  const sitemap = generateSitemapXml();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'content-sitemap.xml'), sitemap, 'utf-8');
  console.log('[CW-06] Generated content-sitemap.xml');

  // 2. RSS Feed
  const rss = generateRssFeed();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), rss, 'utf-8');
  console.log('[CW-06] Generated feed.xml');

  // 3. Robots.txt (content-specific addendum)
  const robots = generateRobotsTxt();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'content-robots.txt'), robots, 'utf-8');
  console.log('[CW-06] Generated content-robots.txt');

  console.log('[CW-06] Pipeline CW-06 successfully completed.');
}

main().catch((err) => {
  console.error('[CW-06] Fatal error', err);
  process.exit(1);
});
