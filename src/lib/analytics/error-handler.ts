/**
 * Global Error Handler — fängt unbehandelte JS-Fehler und sendet sie als ErrorEvents.
 * Kein Sentry oder externe SaaS — ausschließlich lokal.
 */

import { analyticsService } from './service';
import { getSessionId } from './session';
import type { ErrorEvent as AnalyticsErrorEvent } from './types';

export function initErrorHandler(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('error', (event) => {
        const errorEvent: AnalyticsErrorEvent = {
            type: 'error',
            errorCode: 'UNCAUGHT_ERROR',
            errorMessage: event.message || 'Unknown error',
            errorStack: event.error?.stack,
            severity: 'error',
            timestamp: new Date().toISOString(),
            sessionId: getSessionId(),
        };
        analyticsService.track(errorEvent);
    });

    window.addEventListener('unhandledrejection', (event) => {
        const errorEvent: AnalyticsErrorEvent = {
            type: 'error',
            errorCode: 'UNHANDLED_REJECTION',
            errorMessage: event.reason?.message || String(event.reason),
            errorStack: event.reason?.stack,
            severity: 'error',
            timestamp: new Date().toISOString(),
            sessionId: getSessionId(),
        };
        analyticsService.track(errorEvent);
    });
}
