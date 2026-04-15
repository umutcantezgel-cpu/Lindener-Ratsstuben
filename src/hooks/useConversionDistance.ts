import { useEffect, useState } from 'react';

/**
 * Tracks the "distance" in view height to the nearest Call to Action (CTA).
 * Returns true if a CTA is currently in view or very close (e.g., < 500px).
 * Requires CTAs to have the data-cta="true" attribute.
 */
export function useConversionDistance() {
    const [ctaInView, setCtaInView] = useState(false);

    useEffect(() => {
        // Query all CTAs
        const ctas = document.querySelectorAll('[data-cta="true"]');
        if (ctas.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const isAnyVisible = entries.some(entry => entry.isIntersecting);
                setCtaInView(isAnyVisible);
            },
            {
                // Trigger when CTA is within 500px of the viewport (roughly 1 scroll)
                rootMargin: '500px 0px',
                threshold: 0
            }
        );

        ctas.forEach(cta => observer.observe(cta));

        return () => {
            ctas.forEach(cta => observer.unobserve(cta));
        };
    }, []);

    return { ctaInView };
}
