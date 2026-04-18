"use client";

import React, { useState, useEffect } from 'react';
import { useScrollDepth } from '@/hooks/useScrollDepth';
import { useConversionDistance } from '@/hooks/useConversionDistance';
import { Phone, X, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';

interface StickyCtaBarProps {
    ctaText?: string;
    ctaLink?: string;
    phone?: string;
    showAtPercentage?: number; // default 50%
}

export function StickyCtaBar({
    ctaText,
    ctaLink = "/reservation",
    phone = "+49 (0) 641 - 96 99 74 66",
    showAtPercentage = 50
}: StickyCtaBarProps) {
    const { scrollPercentage } = useScrollDepth();
    const { ctaInView } = useConversionDistance();
    const [isClosed, setIsClosed] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t } = useTranslation('common');
    const displayText = ctaText || (t('cta.sticky_reserve') as string);

    useEffect(() => {
        setMounted(true);
        // Check session storage if user closed it during this session
        if (sessionStorage.getItem('stickyCtaClosed') === 'true') {
            setIsClosed(true);
        }
    }, []);

    const handleClose = () => {
        setIsClosed(true);
        sessionStorage.setItem('stickyCtaClosed', 'true');
    };

    // Show if scroll > threshold, AND not closed, AND no other CTA is currently in view
    const isVisible = mounted && !isClosed && scrollPercentage > showAtPercentage && !ctaInView;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ y: 150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 150, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 start-4 end-4 md:start-auto md:end-8 z-toast pointer-events-none"
                    role="region"
                    aria-label={t('accessibility.quick_action') as string}
                >
                    <div className="bg-surface shadow-warm border border-border rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 max-w-lg mx-auto pointer-events-auto">
                        
                        <div className="flex-1 flex items-center justify-between gap-6">
                            <a 
                                href={ctaLink}
                                className="flex-1 interaction-bounce bg-primary text-surface font-bold py-3 px-6 rounded-xl text-center shadow-sm flex items-center justify-center gap-2"
                            >
                                <CalendarCheck className="w-5 h-5" />
                                {displayText}
                            </a>
                            
                            {phone && (
                                <a 
                                    href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                                    className="hidden md:flex interaction-bounce border border-border bg-surface text-text-primary p-3 rounded-xl shadow-sm hover:bg-bg-secondary flex-shrink-0"
                                    aria-label={t('accessibility.call') as string}
                                >
                                    <Phone className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        
                        <button 
                            onClick={handleClose}
                            className="absolute -top-2 -end-2 bg-surface text-text-tertiary rounded-full p-1 shadow-sm border border-border hover:text-text-primary"
                            aria-label={t('accessibility.close_menu') as string}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
