'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { companyData } from '@/data/company';

interface HeroInteractionHarnessProps {
    mainMenuPdfUrl?: string;
}

export const HeroInteractionHarness: React.FC<HeroInteractionHarnessProps> = ({ mainMenuPdfUrl }) => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-8 w-full justify-center items-center mt-8 cursor-pointer"
        >
            <Link 
                href="/reservation"
                className="group relative text-onyx hover:text-muted-gold font-medium uppercase tracking-[0.2em] text-sm flex items-center gap-3 transition-colors duration-500 pb-2"
            >
                {heroVariant === 'general' ? t('hero.cta_reservation') as string : hero.cta1}
                <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                {/* 1px Underline hover effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-muted-gold group-hover:w-full transition-all duration-500 ease-out" />
            </Link>

            <a
                href={mainMenuPdfUrl || companyData.menuLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-gray-500 hover:text-onyx font-medium uppercase tracking-[0.2em] text-sm flex items-center gap-3 transition-colors duration-500 pb-2"
            >
                {t('hero.cta_menu') as string}
                {/* 1px Underline hover effect */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-onyx group-hover:w-full transition-all duration-500 ease-out" />
            </a>
        </motion.div>
    );
};
