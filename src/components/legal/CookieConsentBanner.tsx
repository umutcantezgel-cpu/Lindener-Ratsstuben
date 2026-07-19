'use client';

import React, { useState } from 'react';
import { useCookieConsent } from '@/lib/context/CookieContext';
import { useTranslation } from '@/lib/i18n/use-translation';
import { m as motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';


export const CookieConsentBanner = () => {
    const { showBanner, showPreferences, setShowPreferences, acceptAll, declineAll, savePreferences } = useCookieConsent();
    const { t, locale } = useTranslation('common');

    const [localPrefs, setLocalPrefs] = useState({
        necessary: true, // Always locked to true
        analytics: false,
        marketing: false,
    });

    if (!showBanner && !showPreferences) return null;

    const handleSavePreferences = () => {
        savePreferences(localPrefs);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed bottom-0 inset-x-0 z-[9999] p-4 md:p-6 pb-safe-bottom"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="max-w-5xl mx-auto bg-surface/95 backdrop-blur-3xl border border-border shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center max-h-[85vh] overflow-y-auto custom-scrollbar">
                    
                    {!showPreferences ? (
                        <>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-accent" />
                                    <h2 className="text-xl font-display font-semibold text-text-primary">
                                        {t('cookie.title')}
                                    </h2>
                                </div>
                                <div className="text-sm text-text-secondary leading-relaxed space-y-3">
                                    {((t('cookie.description') as string) || '').split('. ').map((sentence: string, sIndex: number, sArray: string[]) => {
                                        const text = sentence + (sIndex < sArray.length - 1 ? '.' : '');
                                        return (
                                            <span key={sIndex} className="block">
                                                {text.split('"Alle Akzeptieren"').map((part: string, index: number, array: string[]) => (
                                                  <React.Fragment key={index}>
                                                    {part}
                                                    {index < array.length - 1 && <strong>&quot;{t('cookie.accept')}&quot;</strong>}
                                                  </React.Fragment>
                                                )).reduce((prev: React.ReactNode[], curr: React.ReactNode) => [prev, curr].flat().flatMap((x, i) => 
                                                  typeof x === 'string' ? x.split('"Anpassen"').map((p, pIndex, pArr) => (
                                                    <React.Fragment key={`${i}-${pIndex}`}>
                                                      {p}
                                                      {pIndex < pArr.length - 1 && <strong>&quot;{t('cookie.customize')}&quot;</strong>}
                                                    </React.Fragment>
                                                  )) : x
                                                ) as React.ReactNode[], [])}
                                            </span>
                                        );
                                    })}
                                    <span className="flex gap-4 mt-1">
                                        <Link href={`/${locale}/datenschutz`} className="text-accent hover:underline decoration-accent/30 underline-offset-4">{t('cookie.privacy_link')}</Link>
                                        <Link href={`/${locale}/impressum`} className="text-accent hover:underline decoration-accent/30 underline-offset-4">{t('cookie.imprint_link')}</Link>
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="px-6 py-3 rounded-xl border border-border text-text-primary hover:bg-bg-secondary transition-colors font-medium text-sm text-center"
                                >
                                    {t('cookie.customize')}
                                </button>
                                <button
                                    onClick={declineAll}
                                    className="px-6 py-3 rounded-xl bg-bg-secondary text-text-primary hover:bg-border transition-colors font-medium text-sm text-center"
                                >
                                    {t('cookie.reject')}
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-6 py-3 rounded-xl bg-primary text-surface hover:bg-primary-hover shadow-warm transition-all font-medium text-sm text-center whitespace-nowrap"
                                >
                                    {t('cookie.accept')}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col gap-4 md:gap-6">
                            <div className="space-y-2">
                                <h2 className="text-xl font-display font-semibold text-text-primary flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-accent" /> {t('cookie.preferences_title')}
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    {t('cookie.preferences_desc')}
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pe-2 custom-scrollbar">
                                {/* Necessary */}
                                <div className="p-4 rounded-xl border border-border bg-bg-secondary flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
                                            {t('cookie.necessary_title')} <Check className="w-4 h-4 text-green-500" />
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            {t('cookie.necessary_desc')}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider bg-surface px-3 py-1 rounded-full border border-border">{t('cookie.always_active')}</span>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-base font-semibold text-text-primary">{t('cookie.analytics_title')}</h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            {t('cookie.analytics_desc')}
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-2 md:pt-0">
                                        <label className="relative inline-flex items-center cursor-pointer" aria-label={t('cookie.analytics_title') as string}>
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={localPrefs.analytics}
                                                onChange={(e) => setLocalPrefs(p => ({ ...p, analytics: e.target.checked }))}
                                            />
                                            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Marketing */}
                                <div className="p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-base font-semibold text-text-primary">{t('cookie.marketing_title')}</h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            {t('cookie.marketing_desc')}
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-2 md:pt-0">
                                        <label className="relative inline-flex items-center cursor-pointer" aria-label={t('cookie.marketing_title') as string}>
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={localPrefs.marketing}
                                                onChange={(e) => setLocalPrefs(p => ({ ...p, marketing: e.target.checked }))}
                                            />
                                            <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border mt-2">
                                <button
                                    onClick={() => setShowPreferences(false)}
                                    className="px-6 py-3 rounded-xl border border-border text-text-primary hover:bg-bg-secondary transition-colors font-medium text-sm text-center"
                                >
                                    {t('cookie.back')}
                                </button>
                                <button
                                    onClick={handleSavePreferences}
                                    className="px-6 py-3 rounded-xl bg-primary text-surface hover:bg-primary-hover shadow-warm transition-all font-medium text-sm flex items-center justify-center gap-2"
                                >
                                    {t('cookie.save_selection')} <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
