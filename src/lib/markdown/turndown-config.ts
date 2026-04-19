/**
 * ═══════════════════════════════════════════════════════════════
 * TURNDOWN CONFIGURATION – MARKDOWN MIRROR
 * Creates a fully configured TurndownService instance with
 * custom rules for absolute URLs, Next.js Image handling,
 * GFM tables, and button/link semantics.
 * ═══════════════════════════════════════════════════════════════
 */

import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

interface TurndownOptions {
  /** Base URL for resolving relative paths (e.g. https://lindener-ratsstuben.de) */
  baseUrl: string;
  /** The full canonical URL of the source page */
  sourceUrl: string;
}

/**
 * Creates and returns a configured TurndownService instance.
 */
export function createTurndownService(options: TurndownOptions): TurndownService {
  const { baseUrl, sourceUrl } = options;

  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '*',
  });

  // ── GFM Plugin (tables, strikethrough, task lists) ────────
  service.use(gfm);

  // ── Rule: Absolute Image URLs ─────────────────────────────
  // Handles standard <img> AND Next.js <img> with srcSet/data-nimg
  service.addRule('absoluteImageUrls', {
    filter: 'img',
    replacement: (_content: string, node: HTMLElement) => {
      // Next.js Image uses srcSet; prefer the src attribute
      let src = node.getAttribute('src');
      if (!src) {
        // Fallback: try to extract from srcSet
        const srcSet = node.getAttribute('srcset');
        if (srcSet) {
          const firstEntry = srcSet.split(',')[0]?.trim().split(' ')[0];
          if (firstEntry) src = firstEntry;
        }
      }
      if (!src) return '';

      try {
        const absoluteUrl = new URL(src, baseUrl).toString();
        const alt = node.getAttribute('alt') || '';
        return `![${alt}](${absoluteUrl})`;
      } catch {
        return '';
      }
    },
  });

  // ── Rule: Absolute Link URLs ──────────────────────────────
  service.addRule('absoluteLinkUrls', {
    filter: 'a',
    replacement: (content: string, node: HTMLElement) => {
      const href = node.getAttribute('href');
      if (!href) return content;

      // Skip empty content (icon-only links etc.)
      const trimmed = content.trim();
      if (!trimmed) return '';

      // Anchor links → point to source page
      if (href.startsWith('#')) {
        return `[${trimmed}](${sourceUrl}${href})`;
      }

      // mailto / tel – keep as-is
      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return `[${trimmed}](${href})`;
      }

      try {
        const absoluteUrl = new URL(href, baseUrl).toString();
        return `[${trimmed}](${absoluteUrl})`;
      } catch {
        return `[${trimmed}](${href})`;
      }
    },
  });

  // ── Rule: Buttons → inline text ───────────────────────────
  service.addRule('stripButtons', {
    filter: ['button'],
    replacement: (content: string) => {
      const trimmed = content.trim();
      return trimmed ? `**[${trimmed}]**` : '';
    },
  });

  // ── Rule: Picture elements → extract img ──────────────────
  service.addRule('pictureElements', {
    filter: 'picture',
    replacement: (_content: string, node: HTMLElement) => {
      const img = node.querySelector('img');
      if (!img) return '';
      const src = img.getAttribute('src');
      if (!src) return '';
      try {
        const absoluteUrl = new URL(src, baseUrl).toString();
        const alt = img.getAttribute('alt') || '';
        return `![${alt}](${absoluteUrl})`;
      } catch {
        return '';
      }
    },
  });

  return service;
}
