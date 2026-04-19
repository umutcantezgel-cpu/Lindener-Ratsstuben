/**
 * ═══════════════════════════════════════════════════════════════
 * HTML SANITIZER FOR MARKDOWN MIRROR
 * Pre-processes the cheerio DOM before Turndown conversion.
 * Strips non-semantic elements, replaces interactive components
 * with informational blockquotes, and extracts metadata.
 * ═══════════════════════════════════════════════════════════════
 */

import type { CheerioAPI } from 'cheerio';

/**
 * Selectors for elements that must be completely removed from the DOM
 * before markdown conversion (they have no textual value).
 */
const STRIP_SELECTORS = [
  'nav',
  'footer',
  'header',
  'style',
  'script',
  'noscript',
  'svg',
  'dialog',
  '[role="dialog"]',
  '[role="navigation"]',
  '[role="banner"]',
  '[role="contentinfo"]',
  '[aria-hidden="true"]',
  '[data-radix-portal]',
  '[data-radix-popper-content-wrapper]',
  '.cookie-banner',
  '.cookie-consent',
  '#cookie-consent',
  '.calendly-inline-widget',
  '.calendly-badge-widget',
].join(', ');

/**
 * Selectors for interactive elements that get replaced with
 * a blockquote pointing the user to the original page.
 */
const INTERACTIVE_SELECTORS = [
  'form',
  'iframe',
  'button[type="submit"]',
  '[data-interactive]',
  '.widget',
].join(', ');

interface SanitizeOptions {
  /** The canonical HTML URL of the page being converted */
  sourceUrl: string;
}

/**
 * Sanitize the DOM in-place for markdown conversion.
 * Returns extracted metadata (title, description, JSON-LD entities).
 */
export function sanitizeForMarkdown($: CheerioAPI, options: SanitizeOptions) {
  const { sourceUrl } = options;

  // ── 1. Extract metadata BEFORE stripping ──────────────────
  const pageTitle = $('title').first().text().trim() || 'Lindener Ratsstuben';
  const pageDescription = $('meta[name="description"]').attr('content')?.trim() || '';

  // Extract JSON-LD entities
  const entities: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const raw = $(el).text() || $(el).html() || '{}';
      const json = JSON.parse(raw);
      if (typeof json['@type'] === 'string') entities.push(json['@type']);
      if (Array.isArray(json['@graph'])) {
        json['@graph'].forEach((node: Record<string, unknown>) => {
          if (typeof node['@type'] === 'string') entities.push(node['@type']);
        });
      }
      if (Array.isArray(json)) {
        json.forEach((item) => {
          if (item && typeof item === 'object' && typeof item['@type'] === 'string') {
            entities.push(item['@type']);
          }
        });
      }
    } catch {
      // Malformed JSON-LD – skip silently
    }
  });
  const uniqueEntities = Array.from(new Set(entities));

  // ── 2. Strip non-semantic elements ────────────────────────
  $(STRIP_SELECTORS).remove();

  // ── 3. Replace interactive elements with blockquotes ──────
  $(INTERACTIVE_SELECTORS).each((_, el) => {
    $(el).replaceWith(
      `<blockquote><p><em>⚠ Interaktive Komponente – Diese Funktion ist im reinen Textformat nicht verfügbar. ` +
      `Bitte besuchen Sie die <a href="${sourceUrl}">Original-Webseite</a> für diese Interaktion.</em></p></blockquote>`
    );
  });

  // ── 4. Extract semantic content ───────────────────────────
  let mainHtml = $('main').html() || $('article').html() || $('body').html();

  // Append sr-only AI knowledge base if present outside <main>
  const knowledgeBase = $('aside.sr-only');
  if (knowledgeBase.length > 0 && mainHtml) {
    mainHtml += `\n<div class="ai-knowledge-base">${knowledgeBase.html()}</div>\n`;
  }

  return {
    mainHtml,
    pageTitle,
    pageDescription,
    entities: uniqueEntities,
  };
}
