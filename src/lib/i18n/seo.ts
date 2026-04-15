/**
 * Generates hreflang alternate link metadata for Next.js generateMetadata.
 * Ensures search engines correctly identify locale variants of every page.
 */
import { ALLOWED_LOCALES } from '../locales';

const BASE_URL = 'https://lindener-ratsstuben.de';

/**
 * Returns an alternates.languages object for Next.js Metadata API.
 *
 * @example
 * // In generateMetadata():
 * return { alternates: getHrefLangAlternates('/menu') }
 */
export function getHrefLangAlternates(path: string) {
  const languages: Record<string, string> = {};

  for (const locale of ALLOWED_LOCALES) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }

  // x-default points to the default locale version
  languages['x-default'] = `${BASE_URL}${path}`;

  return {
    canonical: `${BASE_URL}${path}`,
    languages,
  };
}

/**
 * Returns the canonical URL for a given path and locale.
 */
export function getCanonicalUrl(path: string, locale: string): string {
  return `${BASE_URL}/${locale}${path}`;
}
