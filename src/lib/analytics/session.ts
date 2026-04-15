/**
 * Session-ID Management für Analytics.
 * Verwendet sessionStorage um eine konsistente Session-ID pro Tab/Session zu halten.
 */

let cachedSessionId: string | null = null;

export function getSessionId(): string {
    if (cachedSessionId) return cachedSessionId;

    if (typeof window === 'undefined') return 'ssr-session';

    try {
        const stored = sessionStorage.getItem('analytics_sessionId');
        if (stored) {
            cachedSessionId = stored;
            return stored;
        }

        const newId = crypto.randomUUID();
        sessionStorage.setItem('analytics_sessionId', newId);
        sessionStorage.setItem('session_start', new Date().toISOString());
        cachedSessionId = newId;
        return newId;
    } catch {
        // Private browsing or storage quota exceeded
        cachedSessionId = `fallback-${Date.now()}`;
        return cachedSessionId;
    }
}

export function captureUTMParameters(): void {
    if (typeof window === 'undefined') return;

    try {
        const params = new URLSearchParams(window.location.search);
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        const utmData: Record<string, string> = {};

        let hasUtm = false;
        for (const key of utmKeys) {
            const value = params.get(key);
            if (value) {
                utmData[key] = value;
                hasUtm = true;
            }
        }

        if (hasUtm) {
            utmData.capturedAt = new Date().toISOString();
            sessionStorage.setItem('utm_parameters', JSON.stringify(utmData));
        }
    } catch {
        // Silently fail in restricted environments
    }
}
