export interface GlossaryEntry {
  term: string;
  definition: string;
  translations?: Record<string, string>;
  domain: 'branded' | 'ui' | 'seo' | 'legal';
}

/**
 * The Central Project Glossary.
 * Ensures consistent translations across manual processes, TMS software, and automated workflows.
 */
export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Lindener Ratsstuben',
    definition: 'The official name of the restaurant. MUST NOT BE TRANSLATED.',
    domain: 'branded',
    translations: {
      de: 'Lindener Ratsstuben',
      en: 'Lindener Ratsstuben',
      fr: 'Lindener Ratsstuben', // Example of fixed terminology
    }
  },
  {
    term: 'Speisekarte',
    definition: 'The main restaurant menu.',
    domain: 'ui',
    translations: {
      de: 'Speisekarte',
      en: 'Menu',
      fr: 'Menu',
      es: 'Carta',
    }
  },
  {
    term: 'Tisch reservieren',
    definition: 'Call-to-Action for booking a table.',
    domain: 'ui',
    translations: {
      de: 'Tisch reservieren',
      en: 'Book a Table',
      fr: 'Réserver une Table',
    }
  }
];

/**
 * Validates a translation object to ensure it complies with strict glossary terms.
 * Used primarily in translation validation pipelines.
 */
export function validateAgainstGlossary(locale: string, translations: Record<string, string>): string[] {
  const errors: string[] = [];

  GLOSSARY.forEach(entry => {
    if (!entry.translations || !entry.translations[locale]) return;

    const expectedTerm = entry.translations[locale];

    // Simple brute-force check: Ensure that if the english term exists in the json value,
    // it was properly replaced by the glossary term in the given locale.
    Object.entries(translations).forEach(([key, value]) => {
      // In a real TMS workflow, logic is more sophisticated (regex matching text segments),
      // this serves as an architectural stub.
      if (typeof value === 'string' && value.includes(entry.term) && !value.includes(expectedTerm)) {
        errors.push(`[Glossary Violation] Key "${key}" in locale "${locale}" should likely use the approved term "${expectedTerm}".`);
      }
    });

  });

  return errors;
}
