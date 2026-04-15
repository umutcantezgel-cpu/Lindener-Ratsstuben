/**
 * Standalone Validation Utilities.
 * Framework-agnostic validators that return string | null.
 * null = valid, string = German error message.
 *
 * These complement the Zod-based validation in ContactForm
 * and can be used in any component without Zod dependency.
 */

// ═══ CORE VALIDATORS ═══

/**
 * Validates that a value is present and not empty/whitespace-only.
 */
export function validateRequired(
  value: unknown,
  message = 'Dieses Feld ist erforderlich'
): string | null {
  if (value === null || value === undefined) return message;
  if (typeof value === 'string' && value.trim() === '') return message;
  if (typeof value === 'boolean' && !value) return message;
  return null;
}

/**
 * Validates email format using a standard regex pattern.
 */
export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') return 'Dieses Feld ist erforderlich';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
  return null;
}

/**
 * Validates phone number format.
 * Allows digits, spaces, +, -, (, ) with minimum 10 characters.
 */
export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim() === '') return null; // Phone is typically optional
  const re = /^[\d\s+\-()]+$/;
  if (!re.test(phone)) return 'Bitte geben Sie eine gültige Telefonnummer ein';
  if (phone.replace(/\D/g, '').length < 6)
    return 'Telefonnummer ist zu kurz';
  return null;
}

/**
 * Validates minimum string length.
 */
export function validateMinLength(
  value: string,
  minLength: number,
  message?: string
): string | null {
  if (!value || value.length < minLength) {
    return message || `Mindestens ${minLength} Zeichen erforderlich`;
  }
  return null;
}

/**
 * Validates maximum string length.
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  message?: string
): string | null {
  if (value && value.length > maxLength) {
    return message || `Maximal ${maxLength} Zeichen erlaubt`;
  }
  return null;
}

/**
 * Validates that a checkbox is checked (for DSGVO consent etc.).
 */
export function validateCheckbox(
  checked: boolean,
  message = 'Bitte akzeptieren Sie diese Bedingung'
): string | null {
  return checked ? null : message;
}

// ═══ TYPES ═══

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export type FormErrors = Record<string, string>;

// ═══ BATCH VALIDATION ═══

/**
 * Runs multiple field validators and collects errors.
 * Returns an object mapping field names to error messages.
 * Empty object = all valid.
 */
export function validateForm(
  fieldValidators: Record<string, () => string | null>
): FormErrors {
  const errors: FormErrors = {};

  for (const [fieldName, validator] of Object.entries(fieldValidators)) {
    const error = validator();
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
}

/**
 * Checks if a FormErrors object contains any errors.
 */
export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}
