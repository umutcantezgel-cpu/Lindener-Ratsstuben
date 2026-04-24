"use client";

import React, { useState, useEffect } from 'react';
import { hasConsentBeenGiven, setConsentState } from '@/lib/analytics/consent';
import { analyticsService } from '@/lib/analytics/service';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/use-translation';

/**
 * @deprecated Use `CookieConsentBanner` from `@/components/legal/CookieConsentBanner` instead.
 * This simplified banner lacks granular category toggles and Framer Motion animations.
 * Kept for backwards compatibility — do not use in new code.
 */
export function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation('common');

    useEffect(() => {
        if (!hasConsentBeenGiven()) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        setConsentState({ analytics: true, marketing: true });
        analyticsService.setConsentLevel('analytics');
        setVisible(false);
    };

    const handleEssentialsOnly = () => {
        setConsentState({ analytics: false, marketing: false });
        analyticsService.setConsentLevel('necessary');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label={t('cookie.settings') as string}
            className="fixed bottom-0 inset-x-0 z-toast p-4 md:p-6"
        >
            <div className="max-w-3xl mx-auto bg-bg-primary border border-border rounded-2xl shadow-elevation-high p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
                <div className="flex-1">
                    <p className="text-sm text-text-primary font-semibold mb-1">{t('cookie.title') as string}</p>
                    <p className="text-xs text-text-secondary">
                        {t('cookie.description') as string}{' '}
                        <Link href="/datenschutz" className="underline hover:text-primary transition-colors">
                            {t('cookie.privacy_link') as string}
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button
                        onClick={handleEssentialsOnly}
                        className="px-4 py-2 text-sm rounded-lg border border-border text-text-secondary hover:bg-bg-secondary transition-colors"
                    >
                        {t('cookie.reject') as string}
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="px-4 py-2 text-sm rounded-lg bg-primary text-surface font-semibold hover:bg-primary-hover transition-colors"
                    >
                        {t('cookie.accept') as string}
                    </button>
                </div>
            </div>
        </div>
    );
}
