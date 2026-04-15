import { companyData } from '@/data/company';

// ═══ TYPES ═══

export interface NavigationLink {
  /** Display label */
  label: string;
  /** Route path (internal) or full URL (external) */
  href: string;
  /** Active state matching strategy */
  activeMatch?: 'exact' | 'prefix';
  /** Whether this link opens in a new tab */
  external?: boolean;
  /** Optional aria-label override */
  ariaLabel?: string;
}

export interface NavigationConfig {
  /** Primary nav links (Header + Mobile) */
  main: NavigationLink[];
  /** Legal/compliance links (Footer bottom) */
  legal: NavigationLink[];
  /** Social media links (Footer) */
  social: NavigationLink[];
  /** External links (e.g. PDF menu) */
  external: NavigationLink[];
}

// ═══ NAVIGATION DATA (SSOT — derived from existing routes) ═══

const navigationConfig: NavigationConfig = {
  main: [
    { label: 'Startseite', href: '/', activeMatch: 'exact' },
    { label: 'Über uns', href: '/about', activeMatch: 'prefix' },
    { label: 'Speisekarte', href: '/menu', activeMatch: 'prefix' },
    { label: 'Galerie', href: '/gallery', activeMatch: 'prefix' },
    { label: 'Reservierung', href: '/reservation', activeMatch: 'prefix' },
    { label: 'Kontakt', href: '/contact', activeMatch: 'prefix' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum', activeMatch: 'exact' },
    { label: 'Datenschutz', href: '/datenschutz', activeMatch: 'exact' },
    { label: 'AGB', href: '/agb', activeMatch: 'exact' },
    { label: 'Barrierefreiheit', href: '/barrierefreiheit', activeMatch: 'exact' },
    { label: 'Cookie-Richtlinie', href: '/cookie-richtlinie', activeMatch: 'exact' },
  ],
  social: [
    {
      label: 'Facebook',
      href: companyData.facebook,
      external: true,
      ariaLabel: 'Besuchen Sie uns auf Facebook',
    },
  ],
  external: [
    {
      label: 'Speisekarte (PDF)',
      href: companyData.menuLink,
      external: true,
      ariaLabel: 'Speisekarte als PDF herunterladen',
    },
  ],
};

// ═══ GETTER FUNCTIONS ═══

/**
 * Returns the full navigation configuration object.
 */
export function getNavigationConfig(): NavigationConfig {
  return navigationConfig;
}

/**
 * Returns main navigation links (for Header/Mobile Nav).
 */
export function getMainNavLinks(): NavigationLink[] {
  return navigationConfig.main;
}

/**
 * Returns legal footer links.
 */
export function getLegalLinks(): NavigationLink[] {
  return navigationConfig.legal;
}

/**
 * Returns all social media links.
 */
export function getSocialLinks(): NavigationLink[] {
  return navigationConfig.social;
}

/**
 * Returns all external links (PDF menu, etc.).
 */
export function getExternalLinks(): NavigationLink[] {
  return navigationConfig.external;
}

/**
 * Flattens the entire navigation config into a single array.
 * Useful for sitemap generation and link audits.
 */
export function getAllNavigationLinks(): NavigationLink[] {
  return [
    ...navigationConfig.main,
    ...navigationConfig.legal,
    ...navigationConfig.social,
    ...navigationConfig.external,
  ];
}

/**
 * Finds a navigation link by its href.
 * Supports both exact and prefix matching strategies.
 */
export function findNavigationLink(href: string): NavigationLink | undefined {
  return getAllNavigationLinks().find((link) => {
    if (link.activeMatch === 'exact') return link.href === href;
    if (link.activeMatch === 'prefix') return href.startsWith(link.href);
    return link.href === href;
  });
}

// ═══ BREADCRUMB LABEL MAP ═══
// Maps route segments to human-readable German labels

export const breadcrumbLabelMap: Record<string, string> = {
  about: 'Über uns',
  menu: 'Speisekarte',
  gallery: 'Galerie',
  reservation: 'Reservierung',
  contact: 'Kontakt',
  impressum: 'Impressum',
  datenschutz: 'Datenschutz',
  agb: 'AGB',
  barrierefreiheit: 'Barrierefreiheit',
  'cookie-richtlinie': 'Cookie-Richtlinie',
  status: 'Status',
  dev: 'Entwicklung',
};
