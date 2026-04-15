import fs from 'fs';
import path from 'path';
import { ContentIndexEntry } from './schema';
import { writeJsonCache } from './cache';

const CACHE_DIR = path.join(process.cwd(), '.content-cache');
const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');
const CONTENT_INDEX = path.join(CACHE_DIR, 'content-index.json');

export interface AuthorProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
  specializations: string[];
  joinedAt: string;
  isActive: boolean;
}

export interface ContentAttribution {
  slug: string;
  author: string;
  coAuthors: string[];
  publishedAt: string;
}

export function ensureAuthorsDir() {
  if (!fs.existsSync(AUTHORS_DIR)) {
    fs.mkdirSync(AUTHORS_DIR, { recursive: true });
  }
}

export function getAuthorProfile(authorName: string): AuthorProfile {
  ensureAuthorsDir();
  const id = authorName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const filePath = path.join(AUTHORS_DIR, `${id}.json`);

  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // Auto-create minimal profile
  const profile: AuthorProfile = {
    id,
    name: authorName,
    email: '',
    bio: `Autor bei Lindener Ratsstuben`,
    avatar: '/images/placeholder.svg',
    socialLinks: {},
    specializations: [],
    joinedAt: new Date().toISOString(),
    isActive: true,
  };

  fs.writeFileSync(filePath, JSON.stringify(profile, null, 2), 'utf-8');
  return profile;
}

export function buildAuthorIndex() {
  console.log('[CW-07] Building Author Index...');

  if (!fs.existsSync(CONTENT_INDEX)) {
    console.warn('[CW-07] No content-index.json found. Run content:build first.');
    return;
  }

  const docs: ContentIndexEntry[] = JSON.parse(fs.readFileSync(CONTENT_INDEX, 'utf-8'));
  const authorIndex: Record<string, AuthorProfile & { articleCount: number; articles: string[] }> = {};
  const attributions: Record<string, ContentAttribution> = {};

  for (const doc of docs) {
    const profile = getAuthorProfile(doc.author);

    if (!authorIndex[profile.id]) {
      authorIndex[profile.id] = { ...profile, articleCount: 0, articles: [] };
    }
    authorIndex[profile.id].articleCount++;
    authorIndex[profile.id].articles.push(doc.slug);

    attributions[doc.slug] = {
      slug: doc.slug,
      author: profile.id,
      coAuthors: [],
      publishedAt: doc.publishedAt.toString(),
    };
  }

  writeJsonCache('author-index.json', authorIndex);
  writeJsonCache('attributions.json', attributions);

  console.log(`[CW-07] Author index built: ${Object.keys(authorIndex).length} authors, ${docs.length} attributions.`);
}
