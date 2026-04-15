import { ContentDocument } from './schema';
import crypto from 'crypto';

export type ErrorType =
  | 'BROKEN_LINK'
  | 'MISSING_ALT'
  | 'INSUFFICIENT_WORDS'
  | 'INVALID_FRONTMATTER'
  | 'DUPLICATE_CONTENT';

export interface ValidationError {
  type: ErrorType;
  message: string;
  location?: { line: number; column?: number };
  suggestion?: string;
}

export interface ValidationWarning {
  type: string;
  message: string;
}

export interface ValidationReport {
  slug: string;
  status: 'PASS' | 'PASS_WITH_WARNINGS' | 'FAIL';
  errors: ValidationError[];
  warnings: ValidationWarning[];
  readabilityScores: {
    fleschKincaid: number;
    gunningFog: number;
    assessment: 'Easy' | 'Normal' | 'Difficult' | 'Very Difficult';
  };
  wordCount: number;
  linkCount: { internal: number; external: number };
  imageCount: number;
  generatedAt: string;
}

// ── Word Count Gate ──
const WORD_COUNT_MINIMUMS: Record<string, { error: number; warn: number }> = {
  blog: { error: 200, warn: 300 },
  'case-study': { error: 500, warn: 700 },
  docs: { error: 100, warn: 200 },
  changelog: { error: 30, warn: 50 },
};

function countWords(text: string): number {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')     // remove code blocks
    .replace(/`[^`]+`/g, '')            // remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // extract link text
    .replace(/[#*_>\-|]/g, '');         // remove md syntax
  return cleaned.split(/\s+/).filter((w) => w.length > 0).length;
}

// ── Readability ──
function countSentences(text: string): number {
  return (text.match(/[.!?]+/g) || []).length || 1;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-zäöü]/g, '');
  if (word.length <= 3) return 1;
  // Simple German/English heuristic
  const vowelGroups = word.match(/[aeiouyäöü]+/gi);
  return vowelGroups ? vowelGroups.length : 1;
}

function fleschKincaid(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const sentences = countSentences(text);
  const syllables = words.reduce((s, w) => s + countSyllables(w), 0);
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}

function gunningFog(text: string): number {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const sentences = countSentences(text);
  const complexWords = words.filter((w) => countSyllables(w) >= 3).length;
  return 0.4 * (words.length / sentences + 100 * (complexWords / words.length));
}

function assessReadability(fk: number): 'Easy' | 'Normal' | 'Difficult' | 'Very Difficult' {
  if (fk <= 6) return 'Easy';
  if (fk <= 10) return 'Normal';
  if (fk <= 14) return 'Difficult';
  return 'Very Difficult';
}

// ── Link Checking ──
function extractLinks(body: string): { internal: string[]; external: string[] } {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const internal: string[] = [];
  const external: string[] = [];
  let match;

  while ((match = linkRegex.exec(body)) !== null) {
    const url = match[2];
    if (url.startsWith('http://') || url.startsWith('https://')) {
      external.push(url);
    } else if (url.startsWith('/')) {
      internal.push(url);
    }
  }

  return { internal, external };
}

// ── Image Counting ──
function countImages(body: string): number {
  return (body.match(/!\[.*?\]\(.*?\)/g) || []).length;
}

// ── Duplicate Detection (simple hash) ──
function simpleHash(text: string): string {
  const normalized = text
    .toLowerCase()
    .replace(/[^a-z0-9äöüß\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return crypto.createHash('md5').update(normalized).digest('hex');
}

// ── Main Validation ──
export function validateDocument(
  doc: ContentDocument,
  allDocs: ContentDocument[]
): ValidationReport {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. Word Count Gate
  const wc = countWords(doc.body);
  const limits = WORD_COUNT_MINIMUMS[doc.collectionType] || WORD_COUNT_MINIMUMS.blog;
  if (wc < limits.error) {
    errors.push({
      type: 'INSUFFICIENT_WORDS',
      message: `Word count ${wc} is below minimum ${limits.error} for ${doc.collectionType}`,
    });
  } else if (wc < limits.warn) {
    warnings.push({
      type: 'LOW_WORD_COUNT',
      message: `Word count ${wc} is below recommended ${limits.warn} for ${doc.collectionType}`,
    });
  }

  // 2. Readability
  const fk = fleschKincaid(doc.body);
  const gf = gunningFog(doc.body);
  if (fk > 12) {
    warnings.push({ type: 'HIGH_READABILITY', message: `Flesch-Kincaid grade ${fk.toFixed(1)} is above target (12)` });
  }

  // 3. Link Checks (internal only — external requires network)
  const links = extractLinks(doc.body);

  // 4. Alt-Text Check
  const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(doc.body)) !== null) {
    const alt = imgMatch[1].trim();
    if (!alt) {
      errors.push({ type: 'MISSING_ALT', message: `Missing alt text for image: ${imgMatch[2]}` });
    }
  }

  // 5. Duplicate Detection
  const docHash = simpleHash(doc.body);
  for (const other of allDocs) {
    if (other.slug === doc.slug) continue;
    const otherHash = simpleHash(other.body);
    if (docHash === otherHash) {
      errors.push({
        type: 'DUPLICATE_CONTENT',
        message: `Content is identical to document: ${other.slug}`,
      });
    }
  }

  // 6. Determine status
  let status: 'PASS' | 'PASS_WITH_WARNINGS' | 'FAIL' = 'PASS';
  if (errors.length > 0) status = 'FAIL';
  else if (warnings.length > 0) status = 'PASS_WITH_WARNINGS';

  return {
    slug: doc.slug,
    status,
    errors,
    warnings,
    readabilityScores: {
      fleschKincaid: Math.round(fk * 10) / 10,
      gunningFog: Math.round(gf * 10) / 10,
      assessment: assessReadability(fk),
    },
    wordCount: wc,
    linkCount: { internal: links.internal.length, external: links.external.length },
    imageCount: countImages(doc.body),
    generatedAt: new Date().toISOString(),
  };
}
