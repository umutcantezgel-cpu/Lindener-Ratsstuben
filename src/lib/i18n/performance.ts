/**
 * I18N Performance Measurement Utilities.
 * Tracks translation load times to detect regressions.
 */

/** Maximum acceptable load time for a single locale namespace (in ms). */
export const MAX_LOAD_TIME_MS = 200;

/**
 * Measures the wall-clock time to dynamically import a locale namespace.
 * Intended for use in CI/CD performance budgets or dev-mode diagnostics.
 *
 * @example
 * const ms = await measureTranslationLoadTime('de', 'common');
 * if (ms > MAX_LOAD_TIME_MS) console.warn('Regression detected!');
 */
export async function measureTranslationLoadTime(
  locale: string,
  namespace: string = 'common'
): Promise<number> {
  const start = performance.now();

  try {
    await import(`../../../locales/${locale}/${namespace}.json`);
  } catch {
    // Namespace missing — still record cost of the failed lookup
  }

  return performance.now() - start;
}

/**
 * Runs a full performance sweep across all provided locales
 * and returns a report mapping locale → load time in ms.
 */
export async function runPerformanceSweep(
  locales: string[],
  namespace: string = 'common'
): Promise<Record<string, number>> {
  const report: Record<string, number> = {};

  for (const locale of locales) {
    report[locale] = await measureTranslationLoadTime(locale, namespace);
  }

  return report;
}
