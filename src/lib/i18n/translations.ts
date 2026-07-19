import { LocaleType } from '../locales';

/** Locale fallback resolution chain */
export const LOCALE_FALLBACK_CHAIN: Record<string, LocaleType[]> = {
  // Germanic
  'de-AT': ['de', 'en'],
  'de-CH': ['de', 'en'],
  'en-GB': ['en', 'de'],
  'en-AU': ['en', 'de'],
  'nl-BE': ['nl', 'en'],
  'no-NO': ['no', 'en'],
  'nb-NO': ['no', 'en'],
  // Romance
  'it-CH': ['it', 'de', 'en'],
  'fr-CA': ['fr', 'en'],
  'fr-CH': ['fr', 'de', 'en'],
  'pt-BR': ['pt', 'en'],
  'es-MX': ['es', 'en'],
  // CJK
  'zh-Hans': ['zh', 'en'],
  'zh-Hant': ['zh', 'en'],
  'ja-JP': ['ja', 'en'],
  'ko-KR': ['ko', 'en'],
  // All other locales fall back via generic logic to base + en
};

// Define the shape of our dictionary cache to avoid repetitive fs reads in same execution
const namespaceCache = new Map<string, Record<string, string>>();

/**
 * Gets the configured fallback locales for a given locale.
 */
export function getFallbackLocales(locale: string): LocaleType[] {
  if (LOCALE_FALLBACK_CHAIN[locale]) {
    return LOCALE_FALLBACK_CHAIN[locale];
  }
  // Generic fallback logic
  const baseLang = locale.split('-')[0] as LocaleType;
  if (baseLang !== locale && baseLang !== 'en' && baseLang !== 'de') {
    return [baseLang, 'en', 'de'];
  }
  
  if (locale !== 'en' && locale !== 'de') return ['en', 'de'];
  if (locale === 'en') return ['de']; // English falls back to German
  
  return []; // German (de) is the root, no further fallback
}

/**
 * Loads a JSON namespace securely, resolving fallbacks dynamically
 * This is primarily intended for Server Components.
 */
export async function loadTranslations(
  locale: LocaleType,
  namespace: string
): Promise<Record<string, string>> {
  const cacheKey = `${locale}:${namespace}`;
  if (namespaceCache.has(cacheKey)) {
    return namespaceCache.get(cacheKey)!;
  }

  // Define the ordered array of locales to try loading
  const localesToTry = [locale, ...getFallbackLocales(locale)];
  
  const mergedDict: Record<string, string> = {};

  // Load from bottom to top so that the most specific locale overrides the general fallbacks
  for (let i = localesToTry.length - 1; i >= 0; i--) {
    const l = localesToTry[i];
    try {
      // In Next.js App Router (Server context), we can just import the json
      const nsDict = (await import(`../../../locales/${l}/${namespace}.json`)).default;
      Object.assign(mergedDict, nsDict);
    } catch {
      // Missing file is expected for some stubs or secondary namespaces
      // We just continue to the next fallback logic
    }
  }

  // --- GLOBALES SEO & BRANDING INTERCEPT (Dynamic Sanitization) ---
  for (const key in mergedDict) {
    if (typeof mergedDict[key] === 'string') {
        let val = mergedDict[key];
        
        // 1. Branding: "Deutsch-Italienisch" -> "Internationale" (in various forms)
        val = val.replace(/deutsch-italienisch(e|er|es|en)?/gi, 'international$1');
        val = val.replace(/italo-tedesc(a|o|he|hi)?/gi, 'internazional$1');
        val = val.replace(/german-italian/gi, 'international');
        val = val.replace(/italienisch-deutsch(e|er|es|en)?/gi, 'international$1');
        
        // 2. Remove all hyphens in visible text, but preserve HTML tags (e.g. <span class="abc-def">)
        val = val.split(/(<[^>]*>)/).map(part => {
            if (part.startsWith('<')) return part;
            return part.replace(/-/g, ' ');
        }).join('');
        
        // 3. Optimize Meta Title/Description length strictly
        // NOTE: Dynamic SEO padding has been removed per user request for manual optimization.

        // 4. Optimize H-Tags in SEO JSON (Ensuring strict SEO keyword density)
        if (namespace === 'seo' && val.includes('<h2>')) {
             val = val.replace(/<h2>/g, '<h2>Restaurant Lindener Ratsstuben: ');
        }
        
        mergedDict[key] = val;
    }
  }

  namespaceCache.set(cacheKey, mergedDict);
  return mergedDict;
}

/**
 * Gets a specific raw translation string by key using dot-notation.
 */
export function getTranslationString(
  dictionary: Record<string, string>,
  key: string
): string {
  // Our system enforces flat JSON (e.g. { "button.submit": "Submit" }), 
  // so we can just grab it directly!
  const translated = dictionary[key];
  
  if (typeof translated !== 'string') {
    console.warn(`[I18N Warning] Missing translation key: "${key}"`);
    return key;
  }
  
  return translated;
}
