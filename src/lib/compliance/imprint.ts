/**
 * Imprint (Impressum) requirements per jurisdiction.
 * German TMG/NetzDG has the strictest requirements.
 */

export interface ImprintConfig {
  country: string;
  requiredFields: string[];
}

/**
 * Defines legally required imprint fields per country.
 * Used to validate that the Impressum page contains all mandatory disclosures.
 */
export const IMPRINT_REQUIREMENTS: Record<string, ImprintConfig> = {
  DE: {
    country: 'DE',
    requiredFields: [
      'companyName',
      'legalRepresentative',
      'address',
      'contactPhone',
      'contactEmail',
      'registrationNumber',
      'taxId',
      'responsiblePerson',
    ],
  },
  AT: {
    country: 'AT',
    requiredFields: [
      'companyName',
      'address',
      'contactPhone',
      'contactEmail',
      'registrationNumber',
    ],
  },
  US: {
    country: 'US',
    requiredFields: [
      'companyName',
      'businessAddress',
      'contactEmail',
    ],
  },
  GB: {
    country: 'GB',
    requiredFields: [
      'companyName',
      'registeredAddress',
      'companyNumber',
      'contactEmail',
    ],
  },
};

/**
 * Validates that a company data object meets the legal imprint requirements
 * for the specified country code.
 */
export function validateImprint(
  countryCode: string,
  companyData: Record<string, string | undefined>
): { valid: boolean; missingFields: string[] } {
  const config = IMPRINT_REQUIREMENTS[countryCode.toUpperCase()];
  if (!config) {
    return { valid: true, missingFields: [] };
  }

  const missingFields = config.requiredFields.filter(
    (field) => !companyData[field] || companyData[field]!.trim() === ''
  );

  return {
    valid: missingFields.length === 0,
    missingFields,
  };
}
