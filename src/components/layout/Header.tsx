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
import { useFocusManagement } from '@/hooks/useFocusManagement';

interface HeaderProps {
    mainMenuPdfUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ mainMenuPdfUrl }) => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const pathname = usePathname();

    const { containerRef } = useFocusManagement(isMobileMenuOpen, () => setIsMobileMenuOpen(false));

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
        { name: t('nav.kegelbahn') as string, path: '/kegelbahn' },
        { name: t('nav.gallery') as string, path: '/gallery' },
        { name: t('nav.reservation') as string, path: '/reservation' },
        { name: t('nav.contact') as string, path: '/contact' },
    ];

    return (
        <header
            role="banner"
            className={clsx(
                "fixed top-0 w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isScrolled
                    ? "bg-onyx-deep/90 backdrop-blur-2xl border-b border-white/10 shadow-elevation-1 py-3 lg:py-4"
                    : "bg-gradient-to-b from-black/70 via-black/20 to-transparent py-6 lg:py-8"
            )}
        >
            <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-8 2xl:px-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center gap-3 group relative z-10" aria-label={`${companyData.companyName} – ${tCommon('accessibility.back_to_home') as string}`}>
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 group-hover:border-accent/40 transition-colors" aria-hidden="true">
                            <Flame className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-[0_0_8px_rgba(var(--color-accent),0.2)]" />
                        </div>
                        <span className={clsx(
                            "text-lg xl:text-xl font-display font-medium tracking-tight transition-colors duration-300 text-white drop-shadow-md"
                        )}>
                            {companyData.companyName.split(' ')[0]} <span className="font-light">{companyData.companyName.split(' ')[1] || ''}</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden xl:flex items-center justify-center flex-[2]" aria-label={tCommon('accessibility.main_navigation') as string}>
                    <ul className="flex items-center gap-0.5 m-0 p-1.5 bg-surface/80 rounded-full backdrop-blur-md border border-white/20 shadow-lg shadow-black/10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path || pathname === `/[locale]${link.path}`;
                            return (
                                <li key={link.name} className="relative">
                                    <Link href={link.path}
                                        prefetch={true}
                                        aria-current={isActive ? "page" : undefined}
                                        className={clsx(
                                            "relative z-10 block px-3.5 2xl:px-4 py-2 text-[14px] 2xl:text-[15px] font-medium transition-colors duration-300 shadow-none whitespace-nowrap",
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
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Actions */}
                <div className="hidden xl:flex items-center justify-end gap-5 flex-1 relative z-10">
                    <div className={clsx(
                        "transition-opacity duration-300 opacity-100"
                    )}>
                        <LanguageSwitcher variant="header" />
                    </div>
                    <Link href="/reservation"
                        prefetch={true}
                        className="group relative px-6 py-2 bg-primary text-surface font-medium rounded-full overflow-hidden transition-all shadow-[0_4px_20px_rgba(var(--color-primary),0.3)] hover:shadow-[0_6px_25px_rgba(var(--color-primary),0.5)] transform hover:-translate-y-0.5 whitespace-nowrap text-[14px] 2xl:text-[15px]"
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
                        "xl:hidden relative z-[110] p-2.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto touch-manipulation",
                        isMobileMenuOpen 
                            ? "bg-onyx-light text-white" 
                            : (isScrolled ? "bg-white/10 text-white shadow-sm" : "bg-white/10 text-white backdrop-blur-md border border-white/10")
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
                        ref={containerRef}
                        id="mobile-menu"
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="fixed inset-0 bg-onyx-deep/98 z-[105] flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-y-auto"
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
                                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                        >
                                            <Link href={link.path}
                                                prefetch={true}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                aria-current={isActive ? "page" : undefined}
                                                className={clsx(
                                                    "flex items-center justify-between p-4 rounded-2xl text-2xl font-display font-medium transition-all duration-300",
                                                    isActive 
                                                        ? "bg-accent/20 text-accent shadow-[0_8px_30px_rgba(var(--color-accent),0.2)]" 
                                                        : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                <span className="break-words max-w-full text-balance leading-tight">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                                <motion.li
                                    variants={{
                                        open: { opacity: 1, y: 0, scale: 1 },
                                        closed: { opacity: 0, y: 20, scale: 0.95 }
                                    }}
                                    transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                                >
                                    <a
                                        href={mainMenuPdfUrl || companyData.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl text-2xl font-display font-medium bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white transition-all duration-300 mt-2"
                                    >
                                        {t('nav.menu') as string} (PDF)
                                        <span className="text-sm font-sans font-normal text-white uppercase tracking-widest bg-white/10 py-1 px-3 rounded-full">PDF</span>
                                    </a>
                                </motion.li>
                            </motion.ul>
                            
                            <motion.div
                                variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: 20 }
                                }}
                                transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
                                className="flex flex-col gap-6 w-full"
                            >
                                <Link href="/reservation"
                                    prefetch={true}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-accent text-onyx-deep text-lg font-medium rounded-2xl text-center hover:bg-accent/90 transition-colors shadow-[0_8px_30px_rgba(var(--color-accent),0.3)]"
                                >
                                    {variant === 'general' ? t('nav.reservation') : navCta}
                                </Link>

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
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
