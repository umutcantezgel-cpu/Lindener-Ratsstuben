/**
 * Formspree Type Definitions.
 */

export interface FormspreeSubmission {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    _gotcha?: string; // Honeypot
}

export interface FormspreeResult {
    success: boolean;
    submissionId?: string;
    timestamp: string;
    error?: string;
    retryable?: boolean;
}

export type FormspreeErrorType =
    | 'NETWORK_TIMEOUT'
    | 'SPAM_DETECTED'
    | 'RATE_LIMIT'
    | 'VALIDATION_FAILED'
    | 'UNKNOWN';
