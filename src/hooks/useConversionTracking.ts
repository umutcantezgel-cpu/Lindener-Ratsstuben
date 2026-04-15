import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { useScrollDepth } from './useScrollDepth';

/**
 * Hook to automatically track standard conversion events like tracking 50% scroll depth.
 * Place this once in a layout or root page component.
 */
export function useConversionTracking() {
    const { scrollPercentage } = useScrollDepth();

    // Track scroll depth milestones
    useEffect(() => {
        const milestones = [25, 50, 75, 100];
        
        // Find the highest milestone reached
        const reached = milestones.filter(m => scrollPercentage >= m);
        if (reached.length === 0) return;

        const maxReached = Math.max(...reached);
        
        // Track milestone in sessionStorage to avoid duplicate fires per visit
        const sessionKey = `scroll_tracked_${maxReached}`;
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, 'true');
            trackEvent('scroll_depth', { depth: maxReached });
        }
    }, [scrollPercentage]);

    // Track CTA clicks dynamically using event delegation
    useEffect(() => {
        const handleCtaClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Find closest parent with data-cta attribute
            const ctaElement = target.closest('[data-cta="true"]');
            
            if (ctaElement) {
                const text = ctaElement.textContent?.trim() || '';
                const href = (ctaElement as HTMLAnchorElement).href || '';
                trackEvent('cta_click', { text, href });
            }
        };

        document.addEventListener('click', handleCtaClick);
        return () => document.removeEventListener('click', handleCtaClick);
    }, []);
}
