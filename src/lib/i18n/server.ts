import { headers } from 'next/headers';
import { LocaleType } from '../locales';
import { loadTranslations, getTranslationString } from './translations';
import { formatICUMessage, TranslationValues } from './icu-formatter';
import { TranslationKey } from './types';

/**
 * Hook-like function for React Server Components to load translations strings.
 * It automatically extracts the 'x-locale' header injected by the middleware.
 * 
 * @param namespace The namespace file (e.g. "common", "navigation")
 */
export async function getTranslations(namespace: string = 'common') {
  const headersList = await headers();
  const locale = (headersList.get('x-locale') as LocaleType) || 'en';

  const dictionary = await loadTranslations(locale, namespace);

  return function t(
    key: TranslationKey,
    values?: TranslationValues
  ): React.ReactNode | string {
    const rawString = getTranslationString(dictionary, key);
    // Parse formatting natively
    return formatICUMessage(rawString, locale, values);
  };
}
