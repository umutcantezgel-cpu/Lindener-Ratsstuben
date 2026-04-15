import fs from 'fs';
import path from 'path';
import { processImage, enforceAltTextInMdx } from '../src/lib/content/media';
import { writeJsonCache } from '../src/lib/content/cache';

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images');
const CONTENT_DIR = path.join(process.cwd(), 'content');

async function main() {
  console.log('[CW-03] Starting Media Asset Management Pipeline...');
  
  // 1. Process public images
  const files = fs.readdirSync(PUBLIC_DIR);
  const mediaCache: Record<string, any> = {};
  
  for (const file of files) {
    const fullPath = path.join(PUBLIC_DIR, file);
    if (fs.statSync(fullPath).isFile() && !file.startsWith('.')) {
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())) {
         try {
           const relativeSrc = `/images/${file}`;
           console.log(`[CW-03] Optimizing image: ${relativeSrc}`);
           const data = await processImage(fullPath, relativeSrc);
           mediaCache[relativeSrc] = data;
         } catch (e) {
           console.error(`[CW-03] ERROR: Failed optimizing ${file}`, e);
         }
      }
    }
  }

  // Persist combined SRCSETS and PLACEHOLDERS
  writeJsonCache('placeholders.json', mediaCache);
  console.log(`[CW-03] Persisted image cache for ${Object.keys(mediaCache).length} assets.`);

  // 2. Alt-text verification in MDX files
  console.log('[CW-03] Running Alt-Text compliance check in MDX...');
  const walkMdx = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
         walkMdx(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
         const file = path.join(dir, entry.name);
         const content = fs.readFileSync(file, 'utf-8');
         enforceAltTextInMdx(content, file);
      }
    }
  };

  walkMdx(CONTENT_DIR);
  console.log('[CW-03] Pipeline CW-03 successfully completed.');
}

main().catch(err => {
  console.error('[CW-03] Fatal error', err);
  process.exit(1);
});
