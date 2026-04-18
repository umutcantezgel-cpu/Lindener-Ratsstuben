'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { CTATexts, CTATrustKey, CTAPrimaryKey, CTASecondaryKey } from '@/lib/cta-texts';
import { useTranslation } from '@/lib/i18n/use-translation';

interface CtaWithTrustProps {
    href?: string;
    onClick?: () => void;
    actionKey?: CTAPrimaryKey | CTASecondaryKey;
    customText?: string;
    trustKey?: CTATrustKey;
    variant?: 'primary' | 'secondary';
    isSubmit?: boolean;
}

export function CtaWithTrust({
    href,
    onClick,
    actionKey,
    customText,
    trustKey = 'form',
    variant = 'primary',
    isSubmit = false
}: CtaWithTrustProps) {
    const { t } = useTranslation('common');

    // i18n-aware CTA text resolution: translation key > custom text > CTA registry > fallback
    // We explicitly map 'reserve' to 'reserve_table' which exists in the master translation JSON
    const mappedActionKey = actionKey === 'reserve' ? 'reserve_table' : actionKey;
    const ctaTranslationKey = actionKey ? `cta.${mappedActionKey}` : null;
    const translatedText = ctaTranslationKey ? (t(ctaTranslationKey) as string) : null;
    const registryText = actionKey && (CTATexts.primary[actionKey as CTAPrimaryKey] || CTATexts.secondary[actionKey as CTASecondaryKey]);
    const text = customText || translatedText || registryText || t('cta.default_action') as string;

    // i18n-aware trust text
    const trustTranslationKey = `cta.trust_${trustKey}`;
    const isPrimary = variant === 'primary';
    const baseClasses = "group relative inline-flex items-center justify-center gap-2 px-10 py-4 font-bold rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]";
    const variantClasses = isPrimary 
        ? "bg-primary text-surface shadow-[0_4px_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_8px_30px_rgba(var(--color-primary),0.5)] hover:-translate-y-1" 
        : "bg-surface text-text-primary border border-border shadow-soft hover:shadow-elevation-1 hover:-translate-y-1 hover:bg-bg-secondary";
    
    // We combine the base classes with the variant-specific ones. RTL arrows rotate-180 natively!
    const buttonClass = `${baseClasses} ${variantClasses} w-full md:w-auto`;

    const renderButtonContent = () => (
        <>
            <span className="relative z-10 flex items-center justify-center text-center text-balance gap-2 max-w-full">
                <span className="break-words line-clamp-2">{text}</span>
                {isPrimary && <ArrowRight className="w-5 h-5 flex-shrink-0 transition-transform rtl-mirror group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />}
            </span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-surface/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
        </>
    );

    return (
        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            {isSubmit ? (
                <button type="submit" onClick={onClick} className={buttonClass}>
                    {renderButtonContent()}
                </button>
            ) : (
                <Link href={href || '#'} className={buttonClass} onClick={onClick}>
                    {renderButtonContent()}
                </Link>
            )}
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
                <ShieldCheck className="w-3.5 h-3.5 text-status-success" aria-hidden="true" />
                <span>{t(trustTranslationKey) as string}</span>
            </div>
        </div>
    );
}
