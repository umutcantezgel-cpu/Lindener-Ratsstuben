'use client';
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { companyData } from '@/data/company';
import { useTranslation } from '@/lib/i18n/use-translation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const Footer: React.FC = () => {
    const { t } = useTranslation('navigation');
    const { t: tCommon } = useTranslation('common');
    const { navCta, variant } = useAdaptiveMessaging();
    return (
        <footer role="contentinfo" className="bg-bg-primary text-text-primary pt-20 pb-10 border-t border-border">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-5 py-3 rounded-xl" style={{ backgroundColor: 'rgba(10, 10, 11, 0.92)' }} aria-hidden="true">
                            <Image
                                src="/images/logo.svg"
                                alt={companyData.companyName}
                                width={160}
                                height={58}
                                className="w-auto h-10 brightness-0 invert"
                            />
                        </div>
                        <p className="text-text-secondary leading-relaxed text-sm">
                            {tCommon('footer.brand_description') as string}
                        </p>
                        <ul className="flex gap-4 m-0 p-0 list-none" aria-label={t('footer.social_media_profile') as string}>
                            {[
                                { icon: Instagram, label: t('footer.instagram_profile') as string, href: "#" }, 
                                { icon: Facebook, label: t('footer.facebook_profile') as string, href: "#" }
                            ].map((social, i) => (
                                <li key={i}>
                                    <a 
                                        href={social.href} 
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-bg-secondary text-text-primary flex items-center justify-center hover:bg-primary transition-all duration-300 hover:-translate-y-1 hover:text-surface"
                                    >
                                        <social.icon className="w-5 h-5" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <nav aria-label={t('footer.navigation') as string}>
                        <h3 className="text-primary font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.quick_links') as string}</h3>
                        <ul className="space-y-3 m-0 p-0 list-none">
                            {[
                                { name: t('nav.home') as string, path: '/' },
                                { name: t('nav.about') as string, path: '/about' },
                                { name: t('nav.menu') as string, path: '/menu' },
                                { name: t('nav.kegelbahn') as string, path: '/kegelbahn' },
                                { name: variant === 'general' ? (t('nav.reservation') as string) : navCta, path: '/reservation' },
                                { name: t('nav.contact') as string, path: '/contact' }
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link href={item.path} className="text-text-secondary hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                        {item.name as React.ReactNode}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <address className="not-italic">
                        <h3 className="text-primary font-bold mb-6 uppercase tracking-wider text-sm">{t('nav.contact') as string}</h3>
                        <ul className="space-y-4 m-0 p-0 list-none">
                            <li className="flex items-start gap-3 text-text-secondary group">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1 group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                <span className="group-hover:text-text-primary transition-colors">{companyData.address.street},<br />{companyData.address.zip} {companyData.address.city}</span>
                            </li>
                            <li className="flex items-center gap-3 text-text-secondary group">
                                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                <a href={`tel:${companyData.phone}`} className="hover:text-text-primary transition-colors">{companyData.displayPhone}</a>
                            </li>
                            <li className="flex items-center gap-3 text-text-secondary group">
                                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:text-text-primary transition-colors" aria-hidden="true" />
                                <a href={`mailto:${companyData.email}`} className="hover:text-text-primary transition-colors">{companyData.email}</a>
                            </li>
                        </ul>
                        <div className="mt-8 flex flex-col gap-3">
                            <Link href="/reservation" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-surface text-sm font-bold uppercase tracking-wider rounded-md hover:bg-primary-hover transition-colors w-full sm:w-auto shadow-sm">
                                {variant === 'general' ? t('nav.reservation') as string : navCta}
                            </Link>
                            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-border text-text-primary text-sm font-medium rounded-md hover:bg-bg-secondary transition-colors w-full sm:w-auto shadow-sm">
                                {t('nav.contact') as string}
                            </Link>
                        </div>
                    </address>

                    {/* Hours */}
                    <section aria-label={t('footer.opening_hours') as string}>
                        <h3 className="text-primary font-bold mb-6 uppercase tracking-wider text-sm">{t('footer.opening_hours') as string}</h3>
                        <ul className="space-y-3 text-text-secondary text-sm m-0 p-0 list-none">
                            <li className="flex justify-between border-b border-border pb-2">
                                <span>{t('footer.monday') as string}</span>
                                <span className="text-text-primary font-mono">{t('footer.monday_status') as string}</span>
                            </li>
                            <li className="flex justify-between pb-2">
                                <span>{t('footer.tuesday_sunday') as string}</span>
                                <span className="text-text-primary font-mono">{t('footer.tuesday_sunday_status') as string}</span>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Marketing Partner Logos */}
                <section aria-label="Partner & Kooperationen" className="mb-12 flex justify-center">
                    <div
                        className="w-full max-w-3xl px-6 py-8 rounded-2xl"
                        style={{
                            backgroundColor: 'white',
                            boxShadow: '0 0 50px 25px white',
                        }}
                    >
                        <Image
                            src="/images/marketing-logos.svg"
                            alt="Marketing Partner Logos"
                            width={800}
                            height={293}
                            className="w-full h-auto"
                        />
                    </div>
                </section>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-text-secondary text-center md:text-left">
                    <p>© {new Date().getFullYear()} {companyData.companyName}. {tCommon('footer.rights') as string}</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <LanguageSwitcher variant="footer" />
                        <nav aria-label={t('footer.legal_links') as string} className="flex gap-6 w-full sm:w-auto mt-4 sm:mt-0">
                            <ul className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-3 m-0 p-0 list-none">
                                <li><Link href="/impressum" className="hover:text-primary transition-colors">{t('footer.imprint') as string}</Link></li>
                                <li><Link href="/datenschutz" className="hover:text-primary transition-colors">{t('footer.privacy') as string}</Link></li>
                                <li><Link href="/agb" className="hover:text-primary transition-colors">{t('footer.terms') as string}</Link></li>
                                <li><Link href="/widerruf" className="hover:text-primary transition-colors">{t('footer.revocation') as string}</Link></li>
                                <li><Link href="/cookies" className="hover:text-primary transition-colors">{(t('footer.cookies') || t('footer.cookie_policy') || 'Cookie-Richtlinie') as string}</Link></li>
                                <li>
                                    <button 
                                        onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                                        className="hover:text-primary transition-colors cursor-pointer"
                                    >
                                        {t('footer.privacy_settings') as string}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};
