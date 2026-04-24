'use client';

/**
 * ConsentGatedAnalytics — DSGVO Art. 6(1)(a) Prior Blocking
 *
 * Rendert Vercel Analytics & Speed Insights NUR wenn der Nutzer
 * explizit der Analytics-Kategorie zugestimmt hat.
 *
 * Rechtsgrundlage: Einwilligung gemäß Art. 6(1)(a) DSGVO
 * Ohne Einwilligung werden KEINE Tracking-Skripte geladen.
 */

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from '@/lib/context/CookieContext';

export function ConsentGatedAnalytics() {
    const { preferences } = useCookieConsent();

    // DSGVO Prior Blocking: Render analytics components ONLY after explicit opt-in
    if (!preferences?.analytics) {
        return null;
    }

    return (
        <>
            <Analytics />
            <SpeedInsights />
        </>
    );
}
