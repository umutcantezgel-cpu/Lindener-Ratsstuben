/**
 * Locale-aware number and currency formatting using native Intl.NumberFormat.
 * Zero external dependencies.
 */

/**
 * Formats a number according to locale conventions.
 *
 * @example
 * formatNumber(1234.56, 'de-DE')  // → "1.234,56"
 * formatNumber(1234.56, 'en-US')  // → "1,234.56"
 * formatNumber(1234.56, 'fr-FR')  // → "1 234,56"
 */
export function formatNumber(
  value: number,
  locale: string,
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return new Intl.NumberFormat('en', options).format(value);
  }
}

/**
 * Formats a value as currency according to locale conventions.
 *
 * @example
 * formatCurrency(99.99, 'de-DE', 'EUR')  // → "99,99 €"
 * formatCurrency(99.99, 'en-US', 'USD')  // → "$99.99"
 * formatCurrency(99.99, 'ja-JP', 'JPY')  // → "￥100"
 */
export function formatCurrency(
  value: number,
  locale: string,
  currency: string = 'EUR'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value);
  } catch {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency,
    }).format(value);
  }
}

/**
 * Formats a number as a percentage.
 *
 * @example
 * formatPercent(0.75, 'de-DE')  // → "75 %"
 * formatPercent(0.75, 'en-US')  // → "75%"
 */
export function formatPercent(
  value: number,
  locale: string,
  fractionDigits: number = 0
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  } catch {
    return new Intl.NumberFormat('en', {
      style: 'percent',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  }
}
