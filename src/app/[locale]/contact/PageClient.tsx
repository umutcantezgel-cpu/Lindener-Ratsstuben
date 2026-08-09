"use client";

import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { companyData } from '@/data/company';
import { ContactForm } from '@/components/forms/ContactForm';
import { useTranslation } from '@/lib/i18n/use-translation';
import { TranslationKey } from '@/lib/i18n/types';

export const Contact = () => {
    const { t } = useTranslation('pages');
    const { t: tCommon, locale } = useTranslation('common');

    const formatTime = (timeRange: { start: string, end: string }) => {
        const parseTime = (tStr: string) => {
            const [h, m] = tStr.split(':');
            const d = new Date();
            d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
            return d;
        };
        const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
        const startFmt = timeFmt.format(parseTime(timeRange.start));
        const endFmt = timeFmt.format(parseTime(timeRange.end));
        return tCommon('opening_hours.time_range', { start: startFmt, end: endFmt }) as string;
    };

    return (
        <PageTransition>
            
            <article className="pt-32 pb-20 min-h-screen bg-bg-beige" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <p className="text-3xl md:text-4xl font-display font-bold text-white bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('contact.title') as string}</p>
                        <div 
                            className="text-text-secondary max-w-2xl mx-auto space-y-4 [&>p]:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('contact.description') as string }}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Info & Map */}
                        <div className="space-y-8">
                            <h2 className="sr-only">{t('contact.info_title') as string}</h2>
                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">{t('contact.address') as string}</h3>
                                    <p className="text-text-secondary">{companyData.address.street}<br />{companyData.address.zip} {companyData.address.city}</p>
                                </div>
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">{t('contact.phone') as string}</h3>
                                    <p className="text-text-secondary">
                                        <a href={`tel:${companyData.phone}`} className="hover:text-primary transition-colors">{companyData.displayPhone}</a>
                                    </p>
                                </div>
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">{t('contact.email') as string}</h3>
                                    <p className="text-text-secondary">
                                        <a href={`mailto:${companyData.email}`} className="hover:text-primary transition-colors">{companyData.email}</a>
                                    </p>
                                </div>
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">{t('contact.hours') as string}</h3>
                                    <p className="text-text-secondary text-sm">
                                        {tCommon(companyData.openingHours.ruhetag.tagKey as TranslationKey)}: {tCommon('footer.closed') as string}<br />
                                        {tCommon(companyData.openingHours.regulaer.tageKey as TranslationKey)}:<br />
                                        {formatTime(companyData.openingHours.regulaer.mittags)}<br />
                                        {formatTime(companyData.openingHours.regulaer.abends)}
                                    </p>
                                </div>
                                {/* Facebook */}
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">Facebook</h3>
                                    <p className="text-text-secondary text-sm">
                                        <a href={companyData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('contact.visit_us') as string}</a>
                                    </p>
                                </div>
                                {/* Instagram */}
                                <div className="bg-bg-secondary p-6 rounded-xl shadow-sm flex flex-col items-center text-center hover:shadow-sm transition-shadow">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    </div>
                                    <h3 className="font-bold text-text-main mb-2">Instagram</h3>
                                    <p className="text-text-secondary text-sm">
                                        <a href={companyData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('contact.visit_us') as string}</a>
                                    </p>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="h-[400px] bg-gray-200 rounded-2xl overflow-hidden shadow-sm border-4 border-white">
                                <iframe
                                    src={`https://maps.google.com/maps?width=100%25&height=600&hl=de&q=${encodeURIComponent(companyData.address.street + ", " + companyData.address.zip + " " + companyData.address.city)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form Component */}
                        <div className="bg-bg-secondary p-8 md:p-12 rounded-2xl shadow-sm">
                            <h2 className="text-3xl font-display font-bold text-text-main mb-6">{t('contact.write_us') as string}</h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default Contact;
