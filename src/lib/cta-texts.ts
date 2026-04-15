/**
 * Central registry for all Call-to-Action (CTA) texts.
 * Ensures we avoid generic words like "Submit", "Send" or "Click here".
 * Promotes benefit-driven micro-copy.
 */

export const CTATexts = {
    primary: {
        reserve: "Tisch sichern",
        contact: "Nachricht kostenfrei senden",
        call: "Jetzt anrufen",
    },
    secondary: {
        menu: "Speisekarte ansehen",
        gallery: "Unsere Räumlichkeiten",
        privacy: "Datenschutz lesen",
    },
    microTrust: {
        form: "Kostenlos & unverbindlich • Datenschutzkonform",
        booking: "Schnelle Bestätigung • Keine Vorauszahlung",
        default: "Sichtbar, sicher und transparent"
    }
} as const;

export type CTAPrimaryKey = keyof typeof CTATexts.primary;
export type CTASecondaryKey = keyof typeof CTATexts.secondary;
export type CTATrustKey = keyof typeof CTATexts.microTrust;
