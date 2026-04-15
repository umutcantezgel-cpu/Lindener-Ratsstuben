/**
 * Local analytics events tracker. 
 * Stores nothing external, just console.logs or logs to local attributes.
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

    if (process.env.NODE_ENV === 'development') {
        console.log(`[Analytics Tracked] ${eventName}`, eventPayload);
    }
    
    window.lastConversionEvent = eventPayload;
};
