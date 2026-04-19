/**
 * ═══════════════════════════════════════════════════════════════
 * MARKDOWN MIRROR – DYNAMIC CONVERSION ENGINE
 * Converts rendered HTML pages into clean GitHub-Flavored Markdown
 * via Self-Fetch + Cheerio DOM extraction + Turndown conversion.
 *
 * Architecture: Self-Fetch is the only viable approach in Next.js
 * App Router since Server Components cannot be rendered programmatically.
 * Performance is mitigated via in-memory caching (1h TTL).
 * ═══════════════════════════════════════════════════════════════
 */

import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { sanitizeForMarkdown } from '@/lib/markdown/html-sanitizer';
import { createTurndownService } from '@/lib/markdown/turndown-config';
import { ACTIVE_LOCALES } from '@/lib/locales';

export const dynamic = 'force-dynamic';

// ═══════════════════════════════════════════════════════════════
// IN-MEMORY RESPONSE CACHE
// Avoids redundant Self-Fetch renders for the same page.
// TTL: 1 hour. Entries are lazily evicted on read.
// ═══════════════════════════════════════════════════════════════
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const responseCache = new Map<string, { content: string; timestamp: number }>();

function getCachedResponse(key: string): string | null {
  const entry = responseCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    responseCache.delete(key);
    return null;
  }
  return entry.content;
}

function setCachedResponse(key: string, content: string): void {
  // Cap cache size to prevent unbounded memory growth
  if (responseCache.size > 200) {
    // Evict oldest 50 entries
    const keys = Array.from(responseCache.keys()).slice(0, 50);
    keys.forEach((k) => responseCache.delete(k));
  }
  responseCache.set(key, { content, timestamp: Date.now() });
}

// ═══════════════════════════════════════════════════════════════
// FETCH TIMEOUT
// ═══════════════════════════════════════════════════════════════
const FETCH_TIMEOUT_MS = 10_000;

// ═══════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════
export async function GET(request: NextRequest) {
  // Primary: header set by middleware rewrite (reliable across Next.js versions)
  // Fallback: query param for direct /api/markdown?path=X calls
  const path = request.headers.get('x-markdown-target-path')
    || request.nextUrl.searchParams.get('path')
    || '/';

  // Self-fetch origin: ALWAYS use the actual request origin so the
  // loopback works regardless of which port the dev server is on.
  const fetchOrigin = request.nextUrl.origin;

  // Canonical/public base URL for headers and frontmatter output.
  // In production this resolves to the real domain via env var.
  const canonicalBase = process.env.NEXT_PUBLIC_BASE_URL || fetchOrigin;

  // The self-fetch URL uses the live origin; canonical URL uses public base
  const fetchUrl = new URL(path, fetchOrigin).toString();
  const htmlUrl = new URL(path, canonicalBase).toString();

  // ── Loop guard ────────────────────────────────────────────
  if (request.headers.get('x-internal-markdown-request') === 'true') {
    return new NextResponse('Infinite loop detected', { status: 508 });
  }

  // ── Check cache ───────────────────────────────────────────
  const cacheKey = htmlUrl;
  const cached = getCachedResponse(cacheKey);
  if (cached) {
    return buildResponse(cached, htmlUrl);
  }

  // ── Self-Fetch with timeout ───────────────────────────────
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(fetchUrl, {
      headers: {
        'x-internal-markdown-request': 'true',
        'Accept': 'text/html',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return new NextResponse(`Page not found: ${path}`, { status: res.status });
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // ── Sanitize DOM & extract metadata ─────────────────────
    const { mainHtml, pageTitle, pageDescription, entities } = sanitizeForMarkdown($, {
      sourceUrl: htmlUrl,
    });

    if (!mainHtml) {
      return new NextResponse('No semantic content found', { status: 404 });
    }

    // ── Convert to Markdown ─────────────────────────────────
    const turndownService = createTurndownService({
      baseUrl: canonicalBase,
      sourceUrl: htmlUrl,
    });

    const markdownBody = turndownService.turndown(mainHtml);

    // ── Detect locale from path ─────────────────────────────
    const pathSegments = path.split('/').filter(Boolean);
    const locale = ACTIVE_LOCALES.includes(pathSegments[0] as typeof ACTIVE_LOCALES[number])
      ? pathSegments[0]
      : 'de';

    // ── Build locale alternates ─────────────────────────────
    const routeSuffix = pathSegments.length > 1
      ? '/' + pathSegments.slice(1).join('/')
      : (pathSegments.length === 1 && !ACTIVE_LOCALES.includes(pathSegments[0] as typeof ACTIVE_LOCALES[number])
          ? '/' + pathSegments[0]
          : '');
    
    const alternates = ACTIVE_LOCALES.map((l) => {
      const altPath = `/${l}${routeSuffix}`;
      return `${canonicalBase}${altPath}.md`;
    });

    // ── Build YAML Frontmatter ──────────────────────────────
    const frontmatter = [
      '---',
      `title: "${escapeYaml(pageTitle)}"`,
      `description: "${escapeYaml(pageDescription)}"`,
      `source: "${htmlUrl}"`,
      `locale: "${locale}"`,
      `lastModified: "${new Date().toISOString()}"`,
      `entities: [${entities.map((e) => `"${e}"`).join(', ')}]`,
      `alternates:`,
      ...alternates.map((a) => `  - "${a}"`),
      '---',
      '',
      '',
    ].join('\n');

    const finalContent = frontmatter + markdownBody;

    // ── Cache and return ────────────────────────────────────
    setCachedResponse(cacheKey, finalContent);
    return buildResponse(finalContent, htmlUrl);

  } catch (error) {
    clearTimeout(timeout);

    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error(`[Markdown Engine] Timeout fetching: ${htmlUrl}`);
      return new NextResponse('Conversion timeout – page took too long to render', { status: 504 });
    }

    console.error('[Markdown Engine] Error:', error);
    return new NextResponse('Internal Markdown Generator Error', { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function escapeYaml(str: string): string {
  return str.replace(/"/g, '\\"').replace(/\n/g, ' ');
}

function buildResponse(content: string, htmlUrl: string): NextResponse {
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Link': `<${htmlUrl}>; rel="canonical"`,
      'X-Robots-Tag': 'noindex, noarchive',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
