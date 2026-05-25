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
    '> Restaurant und Kegelzentrum in Linden bei Gießen, Hessen.',
    '> Deutsch-Italienische Küche — Frisch zubereitet mit Leidenschaft.',
    '> Konrad-Adenauer-Straße 26, 35440 Linden, Deutschland.',
    '> Telefon: 06403 - 64556 | E-Mail: hasantoker38@hotmail.de',
    '> Öffnungszeiten: Di–Sa 12:30–14:30 & 17:30–22:30 | So 12:30–14:30 & 17:30–21:00 | Mo Ruhetag',
    '> Küche: Italienisch, Mediterran, Deutsch | Preisniveau: $$ – $$$',
    '> Bewertung: 4,6/5 Sterne | Barrierefrei | Parkplätze | WLAN',
    '> Social Media: facebook.com/Lindenerratsstube | instagram.com/lindener.ratsstuben',
    '',
    'For a complete knowledge base in a single request, use:',
    `- [Vollständige Wissensbasis (llms-full.txt)](${baseUrl}/llms-full.txt)`,
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
  lines.push('## AI Resources');
  lines.push('');
  lines.push(`- [Vollständige Wissensbasis (llms-full.txt)](${baseUrl}/llms-full.txt)`);
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
