/**
 * Local analytics events tracker.
 * Privacy-first: stores events to window attributes only.
 */

export type ConversionEventName = 
    | 'form_start'
    | 'form_progress'
    | 'form_submit'
    | 'form_success'
    | 'cta_click'
    | 'calendly_open'
    | 'scroll_depth';

export interface TrackingProperties {
    [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    lastConversionEvent?: { event: ConversionEventName; timestamp: string; [key: string]: string | number | boolean | undefined };
  }
}

export const trackEvent = (eventName: ConversionEventName, properties?: TrackingProperties) => {
    // Only track in browser
    if (typeof window === 'undefined') return;

    const eventPayload = {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...properties
    };

    window.lastConversionEvent = eventPayload;
};
