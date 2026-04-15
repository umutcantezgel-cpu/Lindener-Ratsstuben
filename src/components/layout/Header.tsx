"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { companyData } from '@/data/company';
import { useTranslation } from '@/lib/i18n/use-translation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        let animationFrameId: number;
        const handleScroll = () => {
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(() => {
                setIsScrolled(window.scrollY > 20);
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
             document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const { t } = useTranslation('navigation');
    const { t: tCommon } = useTranslation('common');
    const { navCta, variant } = useAdaptiveMessaging();

    const navLinks = [
        { name: t('nav.home') as string, path: '/' },
        { name: t('nav.about') as string, path: '/about' },
        { name: t('nav.menu') as string, path: '/menu' },
        { name: t('nav.gallery') as string, path: '/gallery' },
        { name: t('nav.reservation') as string, path: '/reservation' },
        { name: t('nav.contact') as string, path: '/contact' },
    ];

    return (
        <header
            className={clsx(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isScrolled
                    ? "bg-bg-primary/90 backdrop-blur-2xl border-b border-border shadow-elevation-1 py-3 lg:py-4"
                    : "bg-gradient-to-b from-surface/80 via-surface/40 to-transparent py-6 lg:py-8"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group relative z-10" aria-label={`${companyData.companyName} – ${tCommon('accessibility.back_to_home') as string}`}>
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 group-hover:border-primary/40 transition-colors" aria-hidden="true">
                        <Flame className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-[0_0_8px_rgba(var(--color-primary),0.2)]" />
                    </div>
                    <span className={clsx(
                        "text-base lg:text-lg font-display font-medium tracking-tight transition-colors duration-300",
                        isScrolled ? "text-text-primary" : "text-text-primary drop-shadow-sm"
                    )}>
                        {companyData.companyName.split(' ')[0]} <span className="font-light">{companyData.companyName.split(' ')[1] || ''}</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" aria-label={tCommon('accessibility.main_navigation') as string}>
                    <ul className="flex items-center gap-1 m-0 p-1 bg-surface/50 rounded-full backdrop-blur-md border border-border shadow-inner">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path || pathname === `/[locale]${link.path}`;
                            return (
                                <li key={link.name} className="relative">
                                    <Link href={link.path}
                                        aria-current={isActive ? "page" : undefined}
                                        className={clsx(
                                            "relative z-10 block px-5 py-2 text-sm font-medium transition-colors duration-300",
                                            isActive
                                                ? "text-surface"
                                                : "text-text-secondary hover:text-text-primary"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-pill"
                                            className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary),0.4)]"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Actions */}
                <div className="hidden lg:flex items-center gap-5 relative z-10">
                    <div className={clsx(
                        "transition-opacity duration-300", 
                        isScrolled ? "opacity-100" : "opacity-90 hover:opacity-100"
                    )}>
                        <LanguageSwitcher variant="header" />
                    </div>
                    <Link href="/reservation"
                        className="group relative px-6 py-2.5 bg-primary text-surface font-medium rounded-full overflow-hidden transition-all shadow-[0_4px_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_6px_25px_rgba(var(--color-primary),0.5)] transform hover:-translate-y-0.5"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {variant === 'general' ? t('nav.reservation') : navCta}
                        </span>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-surface/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={clsx(
                        "lg:hidden relative z-50 p-2.5 rounded-full backdrop-blur-md transition-all duration-300",
                        isMobileMenuOpen 
                            ? "bg-bg-secondary text-text-primary" 
                            : (isScrolled ? "bg-bg-secondary text-text-primary" : "bg-surface/50 text-text-primary")
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? tCommon('accessibility.menu_close') as string : tCommon('accessibility.menu_open') as string}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: "backInOut" }}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
                    </motion.div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-bg-primary/90 z-40 flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-y-auto"
                        role="dialog"
                        aria-modal="true"
                    >
                        <nav aria-label={tCommon('accessibility.mobile_navigation') as string} className="w-full max-w-sm mx-auto flex flex-col gap-10">
                            <motion.ul 
                                className="flex flex-col gap-2 m-0 p-0 list-none"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                                }}
                            >
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.path || pathname === `/[locale]${link.path}`;
                                    return (
                                        <motion.li 
                                            key={link.name}
                                            variants={{
                                                open: { opacity: 1, y: 0, scale: 1 },
                                                closed: { opacity: 0, y: 20, scale: 0.95 }
                                            }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <Link href={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                                aria-current={isActive ? "page" : undefined}
                                                className={clsx(
                                                    "flex items-center justify-between p-4 rounded-2xl text-2xl font-display font-medium transition-all duration-300",
                                                    isActive 
                                                        ? "bg-primary text-surface shadow-[0_8px_30px_rgba(var(--color-primary),0.3)]" 
                                                        : "bg-surface/50 text-text-primary hover:bg-surface"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                                <motion.li
                                    variants={{
                                        open: { opacity: 1, y: 0, scale: 1 },
                                        closed: { opacity: 0, y: 20, scale: 0.95 }
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <a
                                        href={companyData.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl text-2xl font-display font-medium bg-surface/50 text-text-primary hover:bg-surface transition-all duration-300 mt-2"
                                    >
                                        {t('nav.menu') as string} (PDF)
                                        <span className="text-sm font-sans font-normal text-text-tertiary uppercase tracking-widest bg-bg-secondary py-1 px-3 rounded-full">PDF</span>
                                    </a>
                                </motion.li>
                            </motion.ul>
                            
                            <motion.div
                                variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: 20 }
                                }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                className="flex flex-col gap-6 w-full"
                            >
                                <Link href="/reservation"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-primary text-surface text-lg font-medium rounded-2xl text-center hover:bg-primary-hover transition-colors shadow-[0_8px_30px_rgba(var(--color-primary),0.3)]"
                                >
                                    {variant === 'general' ? t('nav.reservation') : navCta}
                                </Link>

                                <div className="p-4 bg-surface rounded-2xl border border-border">
                                    <LanguageSwitcher variant="mobile" />
                                </div>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
