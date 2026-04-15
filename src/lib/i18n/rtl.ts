/**
 * RTL (Right-to-Left) detection module.
 * Provides utility functions for determining text direction based on locale.
 */

/** Locales that require Right-to-Left text direction */
export const RTL_LOCALES = ['ar', 'he', 'fa', 'ur'] as const;

/**
 * Checks whether a given locale uses Right-to-Left text direction.
 *
 * @example
 * isRTL('ar')     // → true
 * isRTL('de')     // → false
 * isRTL('ar-SA')  // → true
 */
export function isRTL(locale: string): boolean {
  const baseLang = locale.split('-')[0].toLowerCase();
  return (RTL_LOCALES as readonly string[]).includes(baseLang);
}

/**
 * Returns the text direction for a given locale.
 *
 * @example
 * getDirection('ar')  // → 'rtl'
 * getDirection('de')  // → 'ltr'
 */
export function getDirection(locale: string): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
