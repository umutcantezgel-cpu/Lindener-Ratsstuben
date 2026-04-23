export const ALLOWED_LOCALES = [
  'de', 'en', 'it', 'tr', 'fr', 'es', 'pt', 'ru', 'nl', 'pl',
  'ja', 'zh', 'ko', 'ar', 'hi', 'uk', 'cs', 'sv', 'da', 'fi',
  'no', 'el', 'hu', 'ro', 'hr'
] as const;

export type LocaleType = typeof ALLOWED_LOCALES[number];

export const ACTIVE_LOCALES: LocaleType[] = [
  'de', 'en', 'it', 'tr', 'fr', 'es', 'pt', 'ru', 'nl', 'pl',
  'ja', 'zh', 'ko', 'ar', 'hi', 'uk', 'cs', 'sv', 'da', 'fi',
  'no', 'el', 'hu', 'ro', 'hr'
];

export const DEFAULT_LOCALE: LocaleType = 'de';

/** Human-readable display names for each locale (in its own language) */
export const LOCALE_DISPLAY_NAMES: Record<LocaleType, string> = {
  de: 'Deutsch',
  en: 'English',
  it: 'Italiano',
  tr: 'Türkçe',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  ru: 'Русский',
  nl: 'Nederlands',
  pl: 'Polski',
  ja: '日本語',
  zh: '中文',
  ko: '한국어',
  ar: 'العربية',
  hi: 'हिन्दी',
  uk: 'Українська',
  cs: 'Čeština',
  sv: 'Svenska',
  da: 'Dansk',
  fi: 'Suomi',
  no: 'Norsk',
  el: 'Ελληνικά',
  hu: 'Magyar',
  ro: 'Română',
  hr: 'Hrvatski',
};

/** Locales that use right-to-left text direction */
export const RTL_LOCALES: LocaleType[] = ['ar'];

export const SUPPORTED_REGIONS: Record<LocaleType, string[]> = {
  de: ['de-DE', 'de-AT', 'de-CH'],
  en: ['en-US', 'en-GB', 'en-AU'],
  it: ['it-IT', 'it-CH'],
  tr: ['tr-TR'],
  fr: ['fr-FR', 'fr-CA', 'fr-CH'],
  es: ['es-ES', 'es-MX', 'es-AR'],
  pt: ['pt-PT', 'pt-BR'],
  ru: ['ru-RU'],
  nl: ['nl-NL', 'nl-BE'],
  pl: ['pl-PL'],
  ja: ['ja-JP'],
  zh: ['zh-CN', 'zh-TW', 'zh-HK'],
  ko: ['ko-KR'],
  ar: ['ar-SA', 'ar-AE', 'ar-EG'],
  hi: ['hi-IN'],
  uk: ['uk-UA'],
  cs: ['cs-CZ'],
  sv: ['sv-SE'],
  da: ['da-DK'],
  fi: ['fi-FI'],
  no: ['no-NO', 'nb-NO'],
  el: ['el-GR'],
  hu: ['hu-HU'],
  ro: ['ro-RO'],
  hr: ['hr-HR'],
};

export function isValidLocale(locale: string): locale is LocaleType {
  return ALLOWED_LOCALES.includes(locale as LocaleType);
}

export function getLocaleRegions(locale: LocaleType): string[] {
  return SUPPORTED_REGIONS[locale] || [];
}

export function isRTL(locale: LocaleType): boolean {
  return RTL_LOCALES.includes(locale);
}
