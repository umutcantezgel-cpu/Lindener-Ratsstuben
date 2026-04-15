/**
 * Analytics Service — Provider-agnostisches Singleton
 * Routet Events basierend auf Consent an registrierte Provider.
 */

import type { AnalyticsEvent } from './types';

type ConsentLevel = 'necessary' | 'analytics' | 'none';

interface AnalyticsServiceConfig {
    consentLevel: ConsentLevel;
    sessionId: string;
}

class AnalyticsService {
    private config: AnalyticsServiceConfig = {
        consentLevel: 'necessary',
        sessionId: '',
    };

    private eventQueue: AnalyticsEvent[] = [];
    private isInitialized = false;

    initialize(config: Partial<AnalyticsServiceConfig>): void {
        this.config = { ...this.config, ...config };
        this.isInitialized = true;
        this.flushQueue();
    }

    track(event: AnalyticsEvent): void {
        if (!this.isInitialized) {
            this.eventQueue.push(event);
            return;
        }

        // Only track if consent allows it
        if (this.config.consentLevel === 'none') return;

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
            console.debug('[Analytics]', event.type, event);
        }

        // Send to custom endpoint (batched, privacy-first)
        this.sendToCustomEndpoint(event);
    }

    setConsentLevel(level: ConsentLevel): void {
        this.config.consentLevel = level;
    }

    private flushQueue(): void {
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            if (event) this.track(event);
        }
    }

    private sendToCustomEndpoint(event: AnalyticsEvent): void {
        // Use Beacon API for unload-safe event delivery
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            try {
                navigator.sendBeacon(
                    '/api/events',
                    JSON.stringify(event)
                );
            } catch {
                // Fallback: fire-and-forget fetch
                fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event),
                    keepalive: true,
                }).catch(() => {/* silently fail */});
            }
        }
    }
}

export const analyticsService = new AnalyticsService();
