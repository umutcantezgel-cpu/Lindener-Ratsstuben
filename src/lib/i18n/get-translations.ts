import { LocaleType } from '../locales';
import { loadTranslations, getTranslationString } from './translations';

/**
 * Server-side translation helper for Next.js Server Components.
 * Usage in page.tsx:
 *   const t = await getTranslations(locale, 'home');
 *   return <h1>{t('hero.headline')}</h1>;
 */
export async function getTranslations(
  locale: LocaleType,
  namespace: string
) {
  const dictionary = await loadTranslations(locale, namespace);

  const t = (key: string, fallback?: string): string => {
    const value = getTranslationString(dictionary, key);
    // If the key itself is returned (missing), use fallback
    if (value === key && fallback) return fallback;
    return value;
  };

  return t;
}

/**
 * Load multiple namespaces at once for pages that need several.
 * Usage:
 *   const { common, home, meta } = await getMultiTranslations(locale, ['common', 'home', 'meta']);
 */
export async function getMultiTranslations(
  locale: LocaleType,
  namespaces: string[]
) {
  const result: Record<string, (key: string, fallback?: string) => string> = {};

  for (const ns of namespaces) {
    result[ns] = await getTranslations(locale, ns);
  }

  return result;
}
