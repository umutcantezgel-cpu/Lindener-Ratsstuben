/**
 * Consent Event Logger — DSGVO-konforme Einwilligungsprotokollierung
 *
 * Speichert einen Audit-Trail aller Consent-Entscheidungen im localStorage.
 * Keine personenbezogenen Daten — nur anonymisierter User-Agent-Hash,
 * Zeitstempel und gewählte Kategorien.
 *
 * Rechtsgrundlage: DSGVO Art. 7(1) — Nachweis der Einwilligung
 */

const CONSENT_LOG_KEY = 'lr_consent_log';
const MAX_LOG_ENTRIES = 50;

/** Current consent configuration revision. Bump when policy changes to trigger re-consent. */
export const CONSENT_REVISION = 1;

export interface ConsentEvent {
    /** ISO 8601 timestamp of the consent action */
    timestamp: string;
    /** Chosen category states */
    categories: {
        necessary: boolean;
        analytics: boolean;
        marketing: boolean;
    };
    /** Consent configuration revision at time of consent */
    revision: number;
    /** Anonymized User-Agent hash (non-PII) */
    uaHash: string;
    /** Type of consent action */
    action: 'accept_all' | 'reject_all' | 'custom' | 'revoke';
}

/**
 * Generates a non-reversible hash of the User-Agent string.
 * Uses a simple DJB2 hash — NOT cryptographic, purely for anonymized fingerprinting.
 * No PII is stored; the original UA cannot be reconstructed.
 */
function hashUserAgent(): string {
    if (typeof navigator === 'undefined') return 'ssr';

    const ua = navigator.userAgent;
    let hash = 5381;
    for (let i = 0; i < ua.length; i++) {
        hash = ((hash << 5) + hash + ua.charCodeAt(i)) & 0xffffffff;
    }
    return hash.toString(36);
}

/**
 * Determines the consent action type based on category selections.
 */
function determineAction(categories: ConsentEvent['categories']): ConsentEvent['action'] {
    const { analytics, marketing } = categories;

    if (analytics && marketing) return 'accept_all';
    if (!analytics && !marketing) return 'reject_all';
    return 'custom';
}

/**
 * Logs a consent event to localStorage.
 * Maintains a rolling window of MAX_LOG_ENTRIES events.
 */
export function logConsentEvent(categories: ConsentEvent['categories']): void {
    if (typeof window === 'undefined') return;

    const event: ConsentEvent = {
        timestamp: new Date().toISOString(),
        categories,
        revision: CONSENT_REVISION,
        uaHash: hashUserAgent(),
        action: determineAction(categories),
    };

    try {
        const existing = localStorage.getItem(CONSENT_LOG_KEY);
        const log: ConsentEvent[] = existing ? JSON.parse(existing) : [];

        log.push(event);

        // Keep only the latest MAX_LOG_ENTRIES events
        while (log.length > MAX_LOG_ENTRIES) {
            log.shift();
        }

        localStorage.setItem(CONSENT_LOG_KEY, JSON.stringify(log));
    } catch {
        // localStorage may be full or unavailable — fail silently
    }
}

/**
 * Retrieves the full consent log for audit purposes.
 */
export function getConsentLog(): ConsentEvent[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(CONSENT_LOG_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Returns the latest consent event, or null if none exists.
 */
export function getLatestConsentEvent(): ConsentEvent | null {
    const log = getConsentLog();
    return log.length > 0 ? log[log.length - 1] : null;
}

/**
 * Checks whether the consent revision has changed since the user last consented.
 * If true, re-consent should be requested.
 */
export function requiresReConsent(): boolean {
    const latest = getLatestConsentEvent();
    if (!latest) return true; // No consent given yet
    return latest.revision < CONSENT_REVISION;
}
