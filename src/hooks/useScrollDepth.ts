import { useState, useEffect } from 'react';

/**
 * Tracks the scroll depth as a percentage of the total scrollable height.
 * Enables triggering elements (like StickyCtaBar) when reaching certain depths.
 */
export function useScrollDepth() {
    const [scrollPercentage, setScrollPercentage] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const percentage = (scrollTop / docHeight) * 100;
                setScrollPercentage(percentage);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollPercentage };
}
