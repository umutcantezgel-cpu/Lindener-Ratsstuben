/**
 * Locale-aware Cookie Consent & Jurisdiction Configuration.
 * Maps locales/countries to their applicable privacy frameworks.
 */

export type ConsentLegalFramework = 'DSGVO' | 'CCPA' | 'LGPD' | 'PIPL' | 'POPIA';

export interface CookieBannerConfig {
  locale: string;
  country: string;
  framework: ConsentLegalFramework;
  /** 'opt-in' = user must explicitly consent (EU/DSGVO), 'opt-out' = pre-consented (US/CCPA) */
  defaultConsent: 'opt-in' | 'opt-out';
}

/**
 * Jurisdiction configurations.
 * Used by the cookie consent system to determine the correct legal framework
 * and default consent behavior based on the user's detected locale/country.
 */
export const JURISDICTION_CONFIG: Record<string, CookieBannerConfig> = {
  de: { locale: 'de', country: 'DE', framework: 'DSGVO', defaultConsent: 'opt-in' },
  en: { locale: 'en', country: 'GB', framework: 'DSGVO', defaultConsent: 'opt-in' },
  fr: { locale: 'fr', country: 'FR', framework: 'DSGVO', defaultConsent: 'opt-in' },
  es: { locale: 'es', country: 'ES', framework: 'DSGVO', defaultConsent: 'opt-in' },
  pt: { locale: 'pt', country: 'BR', framework: 'LGPD', defaultConsent: 'opt-in' },
  ja: { locale: 'ja', country: 'JP', framework: 'DSGVO', defaultConsent: 'opt-in' },
  zh: { locale: 'zh', country: 'CN', framework: 'PIPL', defaultConsent: 'opt-in' },
  ar: { locale: 'ar', country: 'SA', framework: 'DSGVO', defaultConsent: 'opt-in' },
};

/**
 * Resolves the applicable legal framework for a given locale.
 */
export function getJurisdiction(locale: string): CookieBannerConfig {
  const baseLang = locale.split('-')[0].toLowerCase();
  return JURISDICTION_CONFIG[baseLang] || JURISDICTION_CONFIG['de'];
}

/**
 * Determines whether explicit opt-in consent is required for a given locale.
 */
export function requiresExplicitConsent(locale: string): boolean {
  return getJurisdiction(locale).defaultConsent === 'opt-in';
}
