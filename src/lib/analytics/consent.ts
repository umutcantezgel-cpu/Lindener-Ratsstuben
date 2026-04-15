/**
 * Cookie-Consent-Management
 * 3 Kategorien: essential (immer aktiv), analytics (optional), marketing (optional).
 */

export type ConsentCategory = 'essential' | 'analytics' | 'marketing';

export interface ConsentState {
    essential: boolean;  // Always true
    analytics: boolean;
    marketing: boolean;
    timestamp: string;
}

const CONSENT_KEY = 'consent_state';

export function getConsentState(): ConsentState {
    if (typeof window === 'undefined') {
        return { essential: true, analytics: false, marketing: false, timestamp: '' };
    }

    try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (stored) return JSON.parse(stored);
    } catch {
        // Fail silently
    }

    return { essential: true, analytics: false, marketing: false, timestamp: '' };
}

export function setConsentState(state: Partial<ConsentState>): ConsentState {
    const newState: ConsentState = {
        essential: true, // Always true — cannot be opted out
        analytics: state.analytics ?? false,
        marketing: state.marketing ?? false,
        timestamp: new Date().toISOString(),
    };

    try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify(newState));
    } catch {
        // Fail silently
    }

    return newState;
}

export function hasConsentBeenGiven(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        return localStorage.getItem(CONSENT_KEY) !== null;
    } catch {
        return false;
    }
}
