import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hasConsentBeenGiven, getConsentState, setConsentState } from '@/lib/analytics/consent';

describe('Consent Management', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('returns false when no consent given', () => {
        expect(hasConsentBeenGiven()).toBe(false);
    });

    it('returns default state (analytics=false)', () => {
        const state = getConsentState();
        expect(state.essential).toBe(true);
        expect(state.analytics).toBe(false);
        expect(state.marketing).toBe(false);
    });

    it('stores consent state and marks as given', () => {
        setConsentState({ analytics: true, marketing: false });
        expect(hasConsentBeenGiven()).toBe(true);

        const state = getConsentState();
        expect(state.essential).toBe(true);
        expect(state.analytics).toBe(true);
        expect(state.marketing).toBe(false);
        expect(state.timestamp).toBeTruthy();
    });

    it('always keeps essential=true even if false provided', () => {
        const state = setConsentState({ analytics: false, marketing: false });
        expect(state.essential).toBe(true);
    });
});
