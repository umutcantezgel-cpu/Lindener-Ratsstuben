"use client";

import { useReportWebVitals as useNextReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useNextReportWebVitals((metric) => {
    // 1. Send native logs (production vercel natively handles Web Vitals, but we want granular local API tracking)
    // Only fetch if required, to avoid sending hundreds of requests.
    // Instead we can bulk send or directly to /api/monitoring/vitals
    
    const body = JSON.stringify({
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/monitoring/vitals', body);
    } else {
      fetch('/api/monitoring/vitals', { body, method: 'POST', keepalive: true }).catch(() => {});
    }

    // Performance Budgets Hardcoded Alerts
    if (metric.rating === 'poor') {
      console.warn(`[PERF_BUDGET_EXCEEDED] Metric ${metric.name} evaluated as POOR: ${metric.value}`);
    }
  });

  return null;
}
