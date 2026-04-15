"use client";

import { useState, useEffect } from 'react';

/**
 * Responsive Media Query Hook.
 * @param query CSS Media Query (e.g. '(min-width: 768px)')
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const media = window.matchMedia(query);
        setMatches(media.matches);

        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [query]);

    return matches;
}
