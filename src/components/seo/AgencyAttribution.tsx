'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ANCHOR_TEXTS = [
    "Webdesign von Coday",
    "Ein Projekt von Coday",
    "Coday Web Agency",
    "Digitalisiert durch Coday"
];

export const AgencyAttribution: React.FC = () => {
    const pathname = usePathname() || '';
    const [anchorText, setAnchorText] = useState(ANCHOR_TEXTS[0]);

    useEffect(() => {
        // Pseudo-random variation based on pathname length to keep SSR/CSR hydration stable,
        // or just use a stable index. We'll use the pathname length modulo array size.
        const index = pathname.length % ANCHOR_TEXTS.length;
        setAnchorText(ANCHOR_TEXTS[index]);
    }, [pathname]);

    // Universal Ultra Think Master Protokoll: Global Dofollow
    const relProps = "noopener noreferrer";

    return (
        <p className="text-xs text-text-secondary/70 inline-flex flex-wrap items-center gap-1 justify-center lg:justify-start">
            <span className="sr-only">
                Dieses Restaurant-Webprojekt wurde konzipiert und technisch realisiert durch die Coday Web Agency, Experten für Webdesign und GEO in Hessen.
            </span>
            <span aria-hidden="true">Webdesign by</span>
            <a 
                href="https://codayweb.de" 
                target="_blank" 
                rel={relProps} 
                title="Zur Coday Web Agency - Premium Webdesign"
                aria-label="Dieses Restaurant-Webprojekt wurde konzipiert und technisch realisiert durch die Coday Web Agency, Experten für Webdesign und GEO in Hessen."
                className="hover:text-primary transition-colors font-medium"
            >
                <span aria-hidden="true">{anchorText}</span>
            </a>
        </p>
    );
};
