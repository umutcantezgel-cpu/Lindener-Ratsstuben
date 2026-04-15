/**
 * Zentrale Formspree-Konfiguration.
 * Alle Formular-IDs werden über Umgebungsvariablen verwaltet mit Fallback.
 */

export const FORMSPREE_FORMS = {
    contact: process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xjkvrwgq',
    quick: process.env.NEXT_PUBLIC_FORMSPREE_ID_QUICK || process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xjkvrwgq',
    reservation: process.env.NEXT_PUBLIC_FORMSPREE_ID_RESERVATION || process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xjkvrwgq',
} as const;

export type FormType = keyof typeof FORMSPREE_FORMS;

export function getFormId(type: FormType): string {
    return FORMSPREE_FORMS[type];
}

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/';
