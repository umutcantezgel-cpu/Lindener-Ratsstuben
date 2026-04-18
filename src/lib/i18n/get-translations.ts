import { LocaleType } from '../locales';
import { loadTranslations, getTranslationString } from './translations';

import { TranslationValues, formatICUMessage } from './icu-formatter';

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

  const t = (key: string, valuesOrFallback?: TranslationValues | string, fallback?: string): string => {
    const value = getTranslationString(dictionary, key);
    let values: TranslationValues | undefined = undefined;
    let fallbackStr: string | undefined = fallback;

    if (typeof valuesOrFallback === 'string') {
        fallbackStr = valuesOrFallback;
    } else if (valuesOrFallback) {
        values = valuesOrFallback;
    }

    if (value === key) {
        if (fallbackStr) return fallbackStr;
        return ""; // Match useTranslation behavior of returning empty string so `|| 'Fallback'` works
    }

    const formatted = formatICUMessage(value, locale, values);
    return typeof formatted === 'string' ? formatted : String(formatted);
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
  const result: Record<string, (key: string, valuesOrFallback?: TranslationValues | string, fallback?: string) => string> = {};

  for (const ns of namespaces) {
    result[ns] = await getTranslations(locale, ns);
  }

  return result;
}
