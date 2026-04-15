"use client";

import { useState, useEffect } from 'react';

/**
 * Valid Visitor Segments
 */
export type VisitorSegment = 
  | 'new-visitor'
  | 'returning-explorer'
  | 'service-interested'
  | 'high-intent'
  | 'converted'
  | 'blog-reader';

/**
 * Hook for client-side access to the visitor segment.
 * Includes fallback logic if the cookie is missing or SSR mismatch prevention.
 */
export function useVisitorSegment(): VisitorSegment {
  const [segment, setSegment] = useState<VisitorSegment>('new-visitor');

  useEffect(() => {
    // Attempt to read the segment from cookies. The middleware writes 'visitor_segment'.
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    };

    const cookieSegment = getCookie('visitor_segment') as VisitorSegment;
    if (cookieSegment) {
      setSegment(cookieSegment);
    }
  }, []);

  return segment;
}

/**
 * Client-side utility to set entry types for higher priority segments.
 * Usage: logEntryType('service_click') on service card click.
 */
export function logEntryType(type: 'service_click' | 'conversion_funnel' | 'blog' | 'contacted') {
  if (typeof window === 'undefined') return;
  
  if (type === 'contacted') {
    document.cookie = `conversion_status=contacted; path=/; max-age=${60 * 60 * 24 * 365}`;
  } else {
    document.cookie = `entry_type=${type}; path=/; max-age=${60 * 60 * 24 * 30}`;
  }
}
