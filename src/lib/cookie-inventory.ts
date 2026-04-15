/**
 * Cookie-Inventar — Single Source of Truth für Datenschutzerklärung.
 * Wird automatisch in der Datenschutz-Seite gerendert.
 */

export interface CookieEntry {
    name: string;
    category: 'essential' | 'analytics' | 'marketing';
    duration: string;
    purpose: string;
    provider: string;
}

export const COOKIE_INVENTORY: CookieEntry[] = [
    {
        name: 'consent_status',
        category: 'essential',
        duration: '365 Tage',
        purpose: 'Speichert die Cookie-Einwilligung des Nutzers.',
        provider: 'Eigen',
    },
    {
        name: 'visitor_type',
        category: 'essential',
        duration: 'Session',
        purpose: 'Unterscheidet Erst- und wiederkehrende Besucher für UX-Anpassung.',
        provider: 'Eigen',
    },
    {
        name: 'experiment_*',
        category: 'essential',
        duration: '30 Tage',
        purpose: 'Speichert A/B-Test-Varianten zur UX-Optimierung.',
        provider: 'Eigen',
    },
    {
        name: 'analytics_sessionId',
        category: 'essential',
        duration: 'Session',
        purpose: 'Anonyme Session-ID für interne Analysezwecke.',
        provider: 'Eigen',
    },
    {
        name: '_ga / _ga_*',
        category: 'analytics',
        duration: '2 Jahre',
        purpose: 'Google Analytics 4 — Nutzungsanalyse und Seitenstatistiken.',
        provider: 'Google Ireland Limited',
    },
    {
        name: 'Calendly Cookies',
        category: 'marketing',
        duration: 'Variabel',
        purpose: 'Ermöglichen die eingebettete Terminbuchung via Calendly.',
        provider: 'Calendly LLC',
    },
];
