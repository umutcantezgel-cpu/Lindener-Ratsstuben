"use client";

import { useCallback } from 'react';
import { analyticsService } from '../service';
import { getSessionId } from '../session';
import type { FormFunnelEvent } from '../types';

type FormStep = FormFunnelEvent['step'];

export function useFormTracking(formId: string) {
    const trackStep = useCallback((step: FormStep, fieldName?: string, errorCode?: string) => {
        const event: FormFunnelEvent = {
            type: 'formFunnel',
            step,
            formId,
            fieldName,
            errorCode,
            timestamp: new Date().toISOString(),
            sessionId: getSessionId(),
        };

        analyticsService.track(event);
    }, [formId]);

    return {
        trackView: () => trackStep('view'),
        trackFocus: (fieldName: string) => trackStep('focus', fieldName),
        trackField: (fieldName: string) => trackStep('field', fieldName),
        trackAttempt: () => trackStep('attempt'),
        trackSuccess: () => trackStep('success'),
        trackError: (errorCode: string) => trackStep('error', undefined, errorCode),
        trackAbandon: () => trackStep('abandon'),
    };
}
