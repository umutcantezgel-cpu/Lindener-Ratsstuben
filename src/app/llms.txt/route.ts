/**
 * ═══════════════════════════════════════════════════════════════
 * llms.txt – DYNAMIC LLM KNOWLEDGE INDEX
 * Conforms to the llms.txt standard (https://llmstxt.org/).
 * Dynamically generated from the central route registry.
 * ═══════════════════════════════════════════════════════════════
 */

import { NextResponse, NextRequest } from 'next/server';
import { ACTIVE_LOCALES } from '@/lib/locales';
import { getIndexableRoutes } from '@/lib/routes';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
  const routes = getIndexableRoutes();

  // ── Header block (llms.txt standard) ──────────────────────
  const lines: string[] = [
    '# Lindener Ratsstuben',
    '',
    '> Restaurant und Kegelzentrum in Linden bei Gießen.',
    '> Deutsch-Italienische Küche – Frisch zubereitet mit Leidenschaft.',
    '> Konrad-Adenauer-Straße 26, 35440 Linden, Deutschland.',
    '',
    'This index provides structured Markdown versions of all content pages.',
    'Append `.md` to any URL or send `Accept: text/markdown` to receive Markdown.',
    '',
  ];

  // ── Per-locale sections ───────────────────────────────────
  for (const locale of ACTIVE_LOCALES) {
    lines.push(`## ${locale.toUpperCase()}`);
    lines.push('');

    for (const route of routes) {
      const routeSuffix = route.path === '/' ? '' : route.path;
      const mdUrl = `${baseUrl}/${locale}${routeSuffix}.md`;
      lines.push(`- [${route.label}](${mdUrl})`);
    }

    lines.push('');
  }

  // ── Footer ────────────────────────────────────────────────
  lines.push('## Meta');
  lines.push('');
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml)`);
  lines.push(`- [Robots](${baseUrl}/robots.txt)`);
  lines.push('');

  const content = lines.join('\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
