"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsService } from '../service';
import { getSessionId } from '../session';
import type { PageViewEvent } from '../types';

export function usePageTracking(): void {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lastUrlRef = useRef<string>('');

    useEffect(() => {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        if (url === lastUrlRef.current) return;
        lastUrlRef.current = url;

        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
        const viewportCategory: PageViewEvent['viewportCategory'] =
            viewportWidth < 768 ? 'mobile' : viewportWidth < 1024 ? 'tablet' : 'desktop';

        const event: PageViewEvent = {
            type: 'pageView',
            url,
            title: typeof document !== 'undefined' ? document.title : '',
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            viewportWidth,
            viewportCategory,
            utm_source: searchParams?.get('utm_source') || undefined,
            utm_medium: searchParams?.get('utm_medium') || undefined,
            utm_campaign: searchParams?.get('utm_campaign') || undefined,
            timestamp: new Date().toISOString(),
            sessionId: getSessionId(),
        };

        analyticsService.track(event);
    }, [pathname, searchParams]);
}
