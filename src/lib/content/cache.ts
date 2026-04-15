import fs from 'fs';
import path from 'path';
import { ContentDocument, ContentIndexEntry } from './schema';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');

export function initCacheDirectory() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

export function writeJsonCache(filename: string, data: unknown) {
  initCacheDirectory();
  const filePath = path.join(CACHE_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function buildTaxonomyIndices(documents: ContentDocument[]) {
  const tagsMap: Record<string, string[]> = {};
  const categoriesMap: Record<string, string[]> = {};
  const seriesMap: Record<string, string[]> = {};

  for (const doc of documents) {
    if (!categoriesMap[doc.category]) {
      categoriesMap[doc.category] = [];
    }
    categoriesMap[doc.category].push(doc.slug);

    if (doc.series) {
      if (!seriesMap[doc.series]) seriesMap[doc.series] = [];
      seriesMap[doc.series].push(doc.slug);
    }

    for (const tag of doc.tags) {
      if (!tagsMap[tag]) tagsMap[tag] = [];
      tagsMap[tag].push(doc.slug);
    }
  }

  writeJsonCache('taxonomy-tags.json', tagsMap);
  writeJsonCache('taxonomy-categories.json', categoriesMap);
  writeJsonCache('taxonomy-series.json', seriesMap);
}

export function persistContentCache(documents: ContentDocument[]) {
  initCacheDirectory();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const indexEntries: ContentIndexEntry[] = documents.map(({ body: _body, ...rest }) => rest);
  writeJsonCache('content-index.json', indexEntries);

  const slugsIndex = documents.reduce((acc, doc) => {
    acc[doc.slug] = doc;
    return acc;
  }, {} as Record<string, ContentDocument>);
  
  writeJsonCache('slugs-index.json', slugsIndex);

  const collections = documents.reduce((acc, doc) => {
    if (!acc[doc.collectionType]) acc[doc.collectionType] = [];
    acc[doc.collectionType].push(doc);
    return acc;
  }, {} as Record<string, ContentDocument[]>);

  for (const [type, docs] of Object.entries(collections)) {
    writeJsonCache(`collections-${type}.json`, docs);
  }

  buildTaxonomyIndices(documents);
}
