"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { companyData } from '@/data/company';
import { useTranslation } from '@/lib/i18n/use-translation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { MobileMenu } from '@/components/layout/MobileMenu';

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

    const { t } = useTranslation('navigation');
    const { t: tCommon } = useTranslation('common');
    const { navCta, variant } = useAdaptiveMessaging();

    const isHomePage = pathname === '/' || /^\/[a-z]{2}$/.test(pathname);

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
                    : isHomePage
                        ? "bg-gradient-to-b from-black/70 via-black/20 to-transparent py-6 lg:py-8"
                        : "bg-onyx-deep/80 backdrop-blur-md border-b border-white/10 py-6 lg:py-8"
            )}
        >
            <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-8 xl:px-8 2xl:px-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center group relative z-10" aria-label={`${companyData.companyName} – ${tCommon('accessibility.back_to_home') as string}`}>
                        <Image
                            src="/images/logo.svg"
                            alt={companyData.companyName}
                            width={140}
                            height={50}
                            priority
                            className={clsx(
                                "w-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] brightness-0 invert drop-shadow-md",
                                isScrolled ? "h-8" : "h-10"
                            )}
                        />
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
                                                : link.path === '/menu' 
                                                    ? "text-accent drop-shadow-[0_0_8px_rgba(var(--color-accent),0.4)] hover:text-white" 
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
                        "xl:hidden relative z-[110] p-3 rounded-full transition-all duration-500 cursor-pointer pointer-events-auto touch-manipulation group",
                        isMobileMenuOpen 
                            ? "bg-white/10 text-white backdrop-blur-md" 
                            : (isScrolled ? "bg-white/10 text-white shadow-sm" : "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20")
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? tCommon('accessibility.menu_close') as string : tCommon('accessibility.menu_open') as string}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <motion.span 
                            className="absolute h-[2px] w-6 bg-current rounded-full"
                            animate={{ 
                                y: isMobileMenuOpen ? 0 : -6,
                                rotate: isMobileMenuOpen ? 45 : 0 
                            }}
                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        />
                        <motion.span 
                            className="absolute h-[2px] w-6 bg-current rounded-full"
                            animate={{ 
                                opacity: isMobileMenuOpen ? 0 : 1,
                                scaleX: isMobileMenuOpen ? 0 : 1
                            }}
                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        />
                        <motion.span 
                            className="absolute h-[2px] w-6 bg-current rounded-full"
                            animate={{ 
                                y: isMobileMenuOpen ? 0 : 6,
                                rotate: isMobileMenuOpen ? -45 : 0 
                            }}
                            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
    );
};
