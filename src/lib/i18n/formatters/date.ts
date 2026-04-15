/**
 * Locale-aware date formatting using native Intl.DateTimeFormat.
 * Zero external dependencies — leverages the browser/Node.js ICU runtime.
 */

type DateFormat = 'short' | 'long' | 'relative';

const FORMAT_OPTIONS: Record<Exclude<DateFormat, 'relative'>, Intl.DateTimeFormatOptions> = {
  short: { month: '2-digit', day: '2-digit', year: 'numeric' },
  long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
};

/**
 * Formats a Date object according to locale conventions.
 *
 * @example
 * formatDate(new Date('2025-12-25'), 'de-DE', 'long')
 * // → "Donnerstag, 25. Dezember 2025"
 *
 * formatDate(new Date('2025-12-25'), 'en-US', 'short')
 * // → "12/25/2025"
 */
export function formatDate(
  date: Date,
  locale: string,
  format: DateFormat = 'short'
): string {
  if (format === 'relative') {
    return formatRelativeDate(date, locale);
  }

  try {
    return new Intl.DateTimeFormat(locale, FORMAT_OPTIONS[format]).format(date);
  } catch {
    // Graceful fallback if locale is unsupported
    return new Intl.DateTimeFormat('en', FORMAT_OPTIONS[format]).format(date);
  }
}

/**
 * Formats a time value (hours + minutes).
 *
 * @example
 * formatTime(new Date('2025-12-25T14:30:00'), 'de-DE')
 * // → "14:30"
 */
export function formatTime(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaults: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaults).format(date);
  } catch {
    return new Intl.DateTimeFormat('en', defaults).format(date);
  }
}

/**
 * Relative date formatting (e.g. "3 days ago", "in 2 hours").
 * Uses Intl.RelativeTimeFormat where available.
 */
function formatRelativeDate(date: Date, locale: string): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (Math.abs(diffDay) >= 1) return rtf.format(diffDay, 'day');
    if (Math.abs(diffHour) >= 1) return rtf.format(diffHour, 'hour');
    if (Math.abs(diffMin) >= 1) return rtf.format(diffMin, 'minute');
    return rtf.format(diffSec, 'second');
  } catch {
    // Fallback for environments without RelativeTimeFormat
    return formatDate(date, locale, 'short');
  }
}
