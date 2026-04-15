'use client';

import { TranslationKey } from './types';
import { TranslationValues, formatICUMessage } from './icu-formatter';
import { useI18nContext } from './I18nProvider';

/**
 * Synchronous client-side translation hook.
 * 
 * Consumes the I18nProvider context injected by the server layout.
 * All dictionaries are pre-loaded on the server and passed down as props,
 * so there is ZERO async fetching, ZERO flash-of-wrong-language, and 
 * ZERO dependency on useEffect/fetch timing.
 * 
 * The `namespace` parameter is kept for API compatibility but is ignored —
 * the layout merges all namespaces into a single flat dictionary.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTranslation(_namespace: string = 'common') {
  const { dictionary, locale } = useI18nContext();

  const t = (key: TranslationKey, values?: TranslationValues): React.ReactNode | string => {
    const rawString = dictionary[key];
    
    if (!rawString) {
      // Key is missing from the dictionary. Return empty string so `|| 'Fallback'` works.
      return "";
    }

    return formatICUMessage(rawString, locale, values);
  };

  return { t, locale };
}
