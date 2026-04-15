import fs from 'fs';
import path from 'path';
import { ContentIndexEntry } from '../src/lib/content/schema';
import { calculateSeo, SeoMeta } from '../src/lib/content/seo';
import { writeJsonCache } from '../src/lib/content/cache';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const CONTENT_INDEX = path.join(CACHE_DIR, 'content-index.json');

async function main() {
  console.log('[CW-04] Starting SEO Content Optimierung Pipeline...');

  if (!fs.existsSync(CONTENT_INDEX)) {
    console.error('[CW-04] ERROR: content-index.json not found. Run content:build first.');
    process.exit(1);
  }

  const allDocs: ContentIndexEntry[] = JSON.parse(
    fs.readFileSync(CONTENT_INDEX, 'utf-8')
  );

  const seoIndex: Record<string, SeoMeta> = {};

  for (const doc of allDocs) {
    const seo = calculateSeo(doc, allDocs);
    seoIndex[doc.slug] = seo;
    console.log(`[CW-04] SEO generated for: ${doc.slug} (${seo.og.type}, ${seo.relatedSlugs.length} related)`);
  }

  writeJsonCache('seo-index.json', seoIndex);
  console.log(`[CW-04] SEO index persisted for ${Object.keys(seoIndex).length} documents.`);
  console.log('[CW-04] Pipeline CW-04 successfully completed.');
}

main().catch((err) => {
  console.error('[CW-04] Fatal error', err);
  process.exit(1);
});
