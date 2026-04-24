"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { useFocusManagement } from '@/hooks/useFocusManagement';
import Image from 'next/image';
import { companyData } from '@/data/company';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const pathname = usePathname();
    const { t } = useTranslation('navigation');
    const { t: tCommon } = useTranslation('common');
    const { navCta, variant } = useAdaptiveMessaging();
    const { containerRef } = useFocusManagement(isOpen, onClose);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const navLinks = [
        { name: t('nav.home') as string, path: '/' },
        { name: t('nav.about') as string, path: '/about' },
        { name: t('nav.menu') as string, path: '/menu' },
        { name: t('nav.kegelbahn') as string, path: '/kegelbahn' },
        { name: t('nav.gallery') as string, path: '/gallery' },
        { name: t('nav.reservation') as string, path: '/reservation' },
        { name: t('nav.contact') as string, path: '/contact' },
    ];

    // Glow Orb Animation Variants
    const orbVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    id="mobile-menu"
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="fixed inset-0 bg-onyx-deep/80 z-[105] flex flex-col pt-28 pb-10 px-6 overflow-y-auto overflow-x-hidden"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Ambient Glow Orbs */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div 
                            variants={orbVariants}
                            animate="animate"
                            className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[80px]"
                        />
                        <motion.div 
                            variants={orbVariants}
                            animate="animate"
                            style={{ animationDelay: '2s' }}
                            className="absolute bottom-[10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[100px]"
                        />
                    </div>

                    <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col flex-grow justify-between gap-12">
                        {/* Mobile Menu Logo */}
                        <motion.div 
                            className="flex justify-center pb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            <Link href="/" onClick={onClose} aria-label={`${companyData.companyName} – ${tCommon('accessibility.back_to_home') as string}`}>
                                <Image
                                    src="/images/logo.svg"
                                    alt={companyData.companyName}
                                    width={160}
                                    height={55}
                                    priority
                                    className="w-auto h-12 brightness-0 invert opacity-90 drop-shadow-md"
                                />
                            </Link>
                        </motion.div>

                        <nav aria-label={tCommon('accessibility.mobile_navigation') as string}>
                            <motion.ul 
                                className="flex flex-col gap-7 m-0 p-0 list-none perspective-[1000px]"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={{
                                    open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                                    closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
                                }}
                            >
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.path || pathname === `/[locale]${link.path}`;
                                    const number = String(index + 1).padStart(2, '0');
                                    
                                    return (
                                        <motion.li 
                                            key={link.name}
                                            variants={{
                                                open: { opacity: 1, y: 0, rotateX: 0, transformOrigin: 'top' },
                                                closed: { opacity: 0, y: 40, rotateX: 25, transformOrigin: 'top' }
                                            }}
                                            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                                        >
                                            <Link href={link.path}
                                                prefetch={true}
                                                onClick={onClose}
                                                aria-current={isActive ? "page" : undefined}
                                                className={clsx(
                                                    "group flex items-center gap-6 text-[32px] font-display font-light tracking-tight transition-all duration-500",
                                                    isActive 
                                                        ? "text-accent" 
                                                        : "text-white/80 hover:text-white"
                                                )}
                                            >
                                                <span className={clsx(
                                                    "text-sm font-mono font-medium tracking-widest transition-colors duration-500 pt-1",
                                                    isActive ? "text-accent/60" : "text-white/30 group-hover:text-white/50"
                                                )}>
                                                    {number}
                                                </span>
                                                <span className="relative">
                                                    {link.name}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="mobile-active-indicator"
                                                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full shadow-[0_0_10px_rgba(var(--color-accent),0.5)]"
                                                            initial={false}
                                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                        />
                                                    )}
                                                </span>
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        </nav>
                        
                        {/* Footer Elements (Delayed) */}
                        <motion.div
                            variants={{
                                open: { opacity: 1, y: 0 },
                                closed: { opacity: 0, y: 30 }
                            }}
                            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.5 }}
                            className="flex flex-col gap-6 w-full pb-4"
                        >
                            <div className="flex flex-col items-center text-center gap-1.5 mb-2 text-white/60 text-[15px] font-light">
                                <a href="tel:+49640364556" className="hover:text-accent transition-colors">06403 64556</a>
                                <a href="mailto:info@lindener-ratsstuben.de" className="hover:text-accent transition-colors">info@lindener-ratsstuben.de</a>
                            </div>

                            <Link href="/reservation"
                                prefetch={true}
                                onClick={onClose}
                                className="w-full py-4 bg-accent/90 backdrop-blur-sm border border-accent/20 text-onyx-deep text-lg font-medium rounded-2xl text-center hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(var(--color-accent),0.2)]"
                            >
                                {variant === 'general' ? t('nav.reservation') : navCta}
                            </Link>

                            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex justify-center">
                                <LanguageSwitcher variant="mobile" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
