import fs from 'fs';
import path from 'path';
import { ContentCollectionType } from './schema';
import { parseContentFile } from './parser';
import { persistContentCache } from './cache';
import { ContentDocument } from './schema';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export function scanDirectory(collectionType: ContentCollectionType): ContentDocument[] {
  const dirPath = path.join(CONTENT_ROOT, collectionType);
  
  if (!fs.existsSync(dirPath)) {
    console.warn(`[CW-01] WARN: Directory does not exist: ${dirPath}. Passing.`);
    return [];
  }

  const files = fs.readdirSync(dirPath);
  const docs: ContentDocument[] = [];

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

    const fullPath = path.join(dirPath, file);
    const doc = parseContentFile(fullPath, collectionType);
    if (doc && !doc.draft) {
      docs.push(doc);
    }
  }

  return docs;
}

export function buildContentIndex() {
  console.log('[CW-01] Starting Content Engine build process...');
  const collections: ContentCollectionType[] = ['blog', 'case-study', 'docs', 'changelog', 'ausflug', 'freizeit', 'region', 'business'];
  const allDocuments: ContentDocument[] = [];

  for (const col of collections) {
    const docs = scanDirectory(col);
    allDocuments.push(...docs);
    console.log(`[CW-01] Indexed ${docs.length} valid documents for collection: ${col}`);
  }

  persistContentCache(allDocuments);
  console.log(`[CW-01] Content Engine completed successfully. Total indexed: ${allDocuments.length}`);
}
