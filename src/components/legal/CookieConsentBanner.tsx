'use client';

import React, { useState } from 'react';
import { useCookieConsent } from '@/lib/context/CookieContext';
import { useTranslation } from '@/lib/i18n/use-translation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';


export const CookieConsentBanner = () => {
    const { showBanner, showPreferences, setShowPreferences, acceptAll, declineAll, savePreferences } = useCookieConsent();
    const { locale } = useTranslation('common');

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
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 pb-safe-bottom"
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="max-w-5xl mx-auto bg-surface/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    
                    {!showPreferences ? (
                        <>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-accent" />
                                    <h2 className="text-xl font-display font-semibold text-text-primary">
                                        Wir respektieren Ihre Privatsphäre
                                    </h2>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Wir (Lindener Ratsstuben) verwenden Cookies und ähnliche Technologien, um unsere Website für Sie optimal zu gestalten, kontinuierlich zu verbessern und anonyme Nutzungsstatistiken zu erheben. Durch Klicken auf <strong>&quot;Alle Akzeptieren&quot;</strong> stimmen Sie der Verwendung für <strong>Analytics und Marketing</strong> zu. Unter <strong>&quot;Anpassen&quot;</strong> können Sie eine detaillierte, DSGVO-konforme Auswahl treffen.
                                    <br />
                                    <span className="inline-flex gap-4 mt-2">
                                        <Link href={`/${locale}/datenschutz`} className="text-accent hover:underline decoration-accent/30 underline-offset-4">Datenschutzerklärung</Link>
                                        <Link href={`/${locale}/impressum`} className="text-accent hover:underline decoration-accent/30 underline-offset-4">Impressum</Link>
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="px-6 py-3 rounded-xl border border-border text-text-primary hover:bg-bg-secondary transition-colors font-medium text-sm text-center"
                                >
                                    Anpassen
                                </button>
                                <button
                                    onClick={declineAll}
                                    className="px-6 py-3 rounded-xl bg-bg-secondary text-text-primary hover:bg-border transition-colors font-medium text-sm text-center"
                                >
                                    Nur Notwendige
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-6 py-3 rounded-xl bg-primary text-surface hover:bg-primary-hover shadow-warm transition-all font-medium text-sm text-center whitespace-nowrap"
                                >
                                    Alle Akzeptieren
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full flex flex-col gap-6">
                            <div className="space-y-2">
                                <h2 className="text-xl font-display font-semibold text-text-primary flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-accent" /> Cookie Präferenzen
                                </h2>
                                <p className="text-sm text-text-secondary">
                                    Hier können Sie Ihre persönlichen Datenschutz-Einstellungen verwalten. Notwendige Cookies können nicht deaktiviert werden, da sie für den Betrieb der Seite unerlässlich sind.
                                </p>
                            </div>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {/* Necessary */}
                                <div className="p-4 rounded-xl border border-border/50 bg-bg-secondary/30 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
                                            Technisch Notwendig <Check className="w-4 h-4 text-green-500" />
                                        </h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            Diese Cookies sind zwingend erforderlich, um Basisfunktionen der Webseite wie Navigation, Formularübermittlung und das Speichern dieser Cookie-Einstellungen zu gewährleisten. Ohne diese Scripts kann die Website nicht funktionieren.
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider bg-surface px-3 py-1 rounded-full border border-border">Immer Aktiv</span>
                                    </div>
                                </div>

                                {/* Analytics */}
                                <div className="p-4 rounded-xl border border-border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                    <div>
                                        <h3 className="text-base font-semibold text-text-primary">Analytics & Statistik</h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            Erlaubt uns, anonymisierte Daten über das Nutzerverhalten zu sammeln (z.B. Seitenaufrufe, Verweildauer). Dies hilft uns, die Performance unserer Website kontinuierlich zu verbessern und Engpässe zu erkennen.
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-2 md:pt-0">
                                        <label className="relative inline-flex items-center cursor-pointer" aria-label="Analytics & Statistik">
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
                                        <h3 className="text-base font-semibold text-text-primary">Marketing & Externes</h3>
                                        <p className="text-xs text-text-secondary mt-1 max-w-2xl">
                                            Erlaubt uns, externe Medien (wie Google Maps, soziale Netzwerke) einzubinden und Retargeting-Funktionen bereitzustellen, um Ihnen relevantere Informationen anzeigen zu können.
                                        </p>
                                    </div>
                                    <div className="shrink-0 pt-2 md:pt-0">
                                        <label className="relative inline-flex items-center cursor-pointer" aria-label="Marketing & Externes">
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
                                    Zurück
                                </button>
                                <button
                                    onClick={handleSavePreferences}
                                    className="px-6 py-3 rounded-xl bg-primary text-surface hover:bg-primary-hover shadow-warm transition-all font-medium text-sm flex items-center justify-center gap-2"
                                >
                                    Auswahl Speichern <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
