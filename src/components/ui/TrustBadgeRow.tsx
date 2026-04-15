'use client';

import React from 'react';
import { ShieldCheck, Star, Clock, Leaf } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

export const TrustBadgeRow = () => {
    const { t } = useTranslation('common');
    const badges = [
        { icon: Star, text: t('trust.google_stars') as string, color: "text-accent" },
        { icon: ShieldCheck, text: t('trust.gdpr') as string, color: "text-primary" },
        { icon: Leaf, text: t('trust.fresh') as string, color: "text-accent" },
        { icon: Clock, text: t('trust.fast_response') as string, color: "text-primary" }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 my-8">
            {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface shadow-sm">
                    <badge.icon className={`w-4 h-4 ${badge.color}`} aria-hidden="true" />
                    <span className="text-sm font-semibold text-text-secondary">{badge.text}</span>
                </div>
            ))}
        </div>
    );
};

