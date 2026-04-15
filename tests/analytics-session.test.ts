import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Analytics Session', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.resetModules();
    });

    it('generates a session ID on first call', async () => {
        const { getSessionId } = await import('@/lib/analytics/session');
        const id = getSessionId();
        expect(id).toBeTruthy();
        expect(typeof id).toBe('string');
    });

    it('returns same session ID on subsequent calls', async () => {
        const { getSessionId } = await import('@/lib/analytics/session');
        const id1 = getSessionId();
        const id2 = getSessionId();
        expect(id1).toBe(id2);
    });

    it('stores session start timestamp', async () => {
        const { getSessionId } = await import('@/lib/analytics/session');
        getSessionId();
        const start = sessionStorage.getItem('session_start');
        expect(start).toBeTruthy();
    });
});

describe('UTM Parameter Capture', () => {
    beforeEach(() => {
        sessionStorage.clear();
        vi.resetModules();
    });

    it('captures UTM params from URL', async () => {
        Object.defineProperty(window, 'location', {
            value: { search: '?utm_source=google&utm_medium=cpc' },
            writable: true,
        });

        const { captureUTMParameters } = await import('@/lib/analytics/session');
        captureUTMParameters();

        const stored = sessionStorage.getItem('utm_parameters');
        expect(stored).toBeTruthy();
        const parsed = JSON.parse(stored!);
        expect(parsed.utm_source).toBe('google');
        expect(parsed.utm_medium).toBe('cpc');
        expect(parsed.capturedAt).toBeTruthy();
    });

    it('does not store when no UTM params', async () => {
        Object.defineProperty(window, 'location', {
            value: { search: '' },
            writable: true,
        });

        const { captureUTMParameters } = await import('@/lib/analytics/session');
        captureUTMParameters();

        const stored = sessionStorage.getItem('utm_parameters');
        expect(stored).toBeNull();
    });
});
