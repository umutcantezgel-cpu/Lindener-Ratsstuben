import { IntlMessageFormat, FormatXMLElementFn } from 'intl-messageformat';

type Primitive = string | number | boolean | null | undefined | Date;

export type TranslationValues = Record<
  string,
  Primitive | FormatXMLElementFn<React.ReactNode> | React.ReactNode
>;

/**
 * Formats an ICU message string with the provided values.
 * Uses intl-messageformat to support plurals, dates, and rich text.
 * 
 * @param message The ICU message string (e.g. "Hello, {name}!")
 * @param locale The target locale for formatting rules (e.g. "de")
 * @param values Dictionary of values to interpolate
 * @returns The formatted string or ReactNode array (if rich text is used)
 */
export function formatICUMessage(
  message: string,
  locale: string,
  values?: TranslationValues
): string | React.ReactNode[] | React.ReactNode {
  if (!values || Object.keys(values).length === 0) {
    return message;
  }

  try {
    const formatter = new IntlMessageFormat(message, locale, undefined, {
      ignoreTag: false, // We want to support rich text tags
    });
    
    return formatter.format(values) as string | React.ReactNode[] | React.ReactNode;
  } catch (error) {
    console.error(`[ICU Formatter Error] Failed to format message: "${message}"`, error);
    // Graceful degradation: return original message instead of crashing
    return message;
  }
}
