"use client";

import { useEffect, useRef } from 'react';
import { analyticsService } from '../service';
import { getSessionId } from '../session';
import type { ScrollDepthEvent } from '../types';

export function useScrollDepth(): void {
    const trackedDepths = useRef<Set<number>>(new Set());
    const startTime = useRef<number>(Date.now());

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const markers = [25, 50, 75, 100] as const;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (scrollHeight <= 0) return;

            const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

            for (const marker of markers) {
                if (scrollPercent >= marker && !trackedDepths.current.has(marker)) {
                    trackedDepths.current.add(marker);

                    const elapsedSeconds = (Date.now() - startTime.current) / 1000;
                    const engagementScore = Math.min(100, Math.round((marker * 0.6) + (Math.min(elapsedSeconds, 120) * 0.33)));

                    const event: ScrollDepthEvent = {
                        type: 'scrollDepth',
                        depth: marker,
                        engagementScore,
                        timestamp: new Date().toISOString(),
                        sessionId: getSessionId(),
                    };

                    analyticsService.track(event);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
}
