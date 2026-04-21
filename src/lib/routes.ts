/**
 * ═══════════════════════════════════════════════════════════════
 * CENTRAL ROUTE REGISTRY (SSOT)
 * Single source of truth for all content routes.
 * Consumed by: sitemap.ts, llms.txt, and future route-dependent systems.
 * ═══════════════════════════════════════════════════════════════
 */

export interface ContentRoute {
  /** Route path relative to locale prefix, e.g. '/menu' or '/' for homepage */
  path: string;
  /** Human-readable label (German default) */
  label: string;
  /** Sitemap priority 0.0 – 1.0 */
  priority: number;
  /** Sitemap change frequency */
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Whether this route should appear in llms.txt index */
  indexable: boolean;
}

export const CONTENT_ROUTES: ContentRoute[] = [
  { path: '/',              label: 'Startseite',            priority: 1.0,  changeFrequency: 'monthly',  indexable: true },
  { path: '/menu',          label: 'Speisekarte',           priority: 0.9,  changeFrequency: 'weekly',   indexable: true },
  { path: '/reservation',   label: 'Reservierung',          priority: 0.9,  changeFrequency: 'monthly',  indexable: true },
  { path: '/about',         label: 'Über uns',              priority: 0.8,  changeFrequency: 'monthly',  indexable: true },
  { path: '/contact',       label: 'Kontakt',               priority: 0.8,  changeFrequency: 'yearly',   indexable: true },
  { path: '/gallery',       label: 'Galerie',               priority: 0.7,  changeFrequency: 'monthly',  indexable: true },
  { path: '/kegelbahn',     label: 'Kegelbahn',             priority: 0.7,  changeFrequency: 'monthly',  indexable: true },
  { path: '/entdecken',     label: 'Mittelhessen Entdecken', priority: 0.6,  changeFrequency: 'weekly',   indexable: true },
  { path: '/impressum',     label: 'Impressum',             priority: 0.2,  changeFrequency: 'yearly',   indexable: true },
  { path: '/datenschutz',   label: 'Datenschutz',           priority: 0.2,  changeFrequency: 'yearly',   indexable: true },
  { path: '/agb',           label: 'AGB',                   priority: 0.2,  changeFrequency: 'yearly',   indexable: true },
  { path: '/widerruf',      label: 'Widerrufsbelehrung',    priority: 0.2,  changeFrequency: 'yearly',   indexable: true },
  { path: '/cookies',       label: 'Cookie-Richtlinie',     priority: 0.2,  changeFrequency: 'yearly',   indexable: false },
] as const;

/**
 * Returns only routes marked as indexable for LLM consumption.
 */
export function getIndexableRoutes(): ContentRoute[] {
  return CONTENT_ROUTES.filter((r) => r.indexable);
}
