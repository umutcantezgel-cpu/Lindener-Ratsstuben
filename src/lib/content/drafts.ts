import { readFileSync } from 'fs';
import { writeJsonCache, initCacheDirectory } from './cache';
import path from 'path';
import crypto from 'crypto';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const DRAFT_REGISTRY_FILE = path.join(CACHE_DIR, 'draft-registry.json');

export function getDraftRegistry(): Record<string, string> {
  initCacheDirectory();
  try {
    const raw = readFileSync(DRAFT_REGISTRY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function registerDraft(slug: string): string {
  const drafts = getDraftRegistry();
  
  if (drafts[slug]) return drafts[slug];

  const token = crypto.randomBytes(16).toString('hex');
  const previewUrl = `/api/draft?slug=${slug}&token=${token}`;
  
  drafts[slug] = previewUrl;
  writeJsonCache('draft-registry.json', drafts);
  
  return previewUrl;
}
