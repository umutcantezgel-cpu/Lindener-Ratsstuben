/**
 * Matrix for Hub & Spoke internal linking strategy.
 * Helps automate contextual inbound/outbound links for SEO.
 */

export interface RelatedLink {
    title: string;
    href: string;
    description: string;
}

export const internalLinksMatrix: Record<string, RelatedLink[]> = {
    "/menu": [
        { title: "Reservieren Sie Ihren Tisch", href: "/reservation", description: "Sichern Sie sich einen Platz um unsere Gerichte zu genießen." },
        { title: "Galerie ansehen", href: "/gallery", description: "Ein visueller Vorgeschmack unserer Räumlichkeiten und Speisen." }
    ],
    "/about": [
        { title: "Unsere Speisekarte", href: "/menu", description: "Entdecken Sie, was unser Team täglich zaubert." },
        { title: "Galerie ansehen", href: "/gallery", description: "Bilder sagen mehr als tausend Worte." }
    ],
    "/gallery": [
        { title: "Tisch reservieren", href: "/reservation", description: "Sichern Sie sich den besten Tisch." },
        { title: "Unsere Speisekarte", href: "/menu", description: "Planen Sie bereits heute Ihr Dinner." }
    ],
    "/reservation": [
        { title: "Häufige Fragen (Kontakt)", href: "/contact", description: "Haben Sie spezielle Wünsche für Ihre Reservierung?" },
        { title: "Unsere Speisekarte", href: "/menu", description: "Werfen Sie vorab einen Blick auf unsere Auswahl." }
    ]
};

export function getRelatedLinks(pathname: string): RelatedLink[] {
    return internalLinksMatrix[pathname] || [];
}
