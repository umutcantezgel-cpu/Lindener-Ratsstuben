/**
 * Web Vitals Tracking — native Implementation ohne @vercel/speed-insights.
 * Nutzt die web-vitals Bibliothek direkt für LCP, FID, CLS, TTFB, INP.
 */

import { analyticsService } from './service';
import { getSessionId } from './session';
import type { WebVitalsEvent } from './types';

type MetricRating = WebVitalsEvent['rating'];

function getRating(name: string, value: number): MetricRating {
    const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000],
        FID: [100, 300],
        CLS: [0.1, 0.25],
        TTFB: [800, 1800],
        INP: [200, 500],
    };

    const [good, poor] = thresholds[name] || [0, 0];
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
}

export async function reportWebVitals(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
        const { onLCP, onFID, onCLS, onTTFB, onINP } = await import('web-vitals');

        const sendMetric = (metric: { name: string; value: number }) => {
            const event: WebVitalsEvent = {
                type: 'webVitals',
                metric: metric.name as WebVitalsEvent['metric'],
                value: Math.round(metric.value * 100) / 100,
                rating: getRating(metric.name, metric.value),
                timestamp: new Date().toISOString(),
                sessionId: getSessionId(),
            };
            analyticsService.track(event);
        };

        onLCP(sendMetric);
        onFID(sendMetric);
        onCLS(sendMetric);
        onTTFB(sendMetric);
        onINP(sendMetric);
    } catch {
        // web-vitals not available — fail silently
    }
}
