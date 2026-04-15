/**
 * Typsicheres Analytics-Event-System.
 * Union-Typ für alle trackbaren Events der Applikation.
 */

interface BaseEvent {
    timestamp: string;
    sessionId: string;
}

export interface PageViewEvent extends BaseEvent {
    type: 'pageView';
    url: string;
    title: string;
    referrer: string;
    viewportWidth: number;
    viewportCategory: 'mobile' | 'tablet' | 'desktop';
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
}

export interface ScrollDepthEvent extends BaseEvent {
    type: 'scrollDepth';
    depth: 25 | 50 | 75 | 100;
    engagementScore: number;
    sectionId?: string;
}

export interface FormFunnelEvent extends BaseEvent {
    type: 'formFunnel';
    step: 'view' | 'focus' | 'field' | 'attempt' | 'success' | 'error' | 'abandon';
    formId: string;
    fieldName?: string;
    errorCode?: string;
}

export interface ClickEvent extends BaseEvent {
    type: 'click';
    elementId: string;
    elementType: string;
    cta?: string;
    trackingId?: string;
    url?: string;
}

export interface WebVitalsEvent extends BaseEvent {
    type: 'webVitals';
    metric: 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP';
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
}

export interface ConversionEvent extends BaseEvent {
    type: 'conversion';
    conversionId: string;
    value: number;
    completionTime: number;
}

export interface ErrorEvent extends BaseEvent {
    type: 'error';
    errorCode: string;
    errorMessage: string;
    errorStack?: string;
    severity: 'info' | 'warning' | 'error';
}

export type AnalyticsEvent =
    | PageViewEvent
    | ScrollDepthEvent
    | FormFunnelEvent
    | ClickEvent
    | WebVitalsEvent
    | ConversionEvent
    | ErrorEvent;
