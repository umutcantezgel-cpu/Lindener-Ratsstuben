'use client';
import React from 'react';
import Link from 'next/link';
import { m as motion } from "framer-motion";
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

const MotionLink = motion.create(Link);

export const HeroInteractionHarness: React.FC = () => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 xl:gap-8 w-full justify-center items-center mt-10 z-20"
        >
            <MotionLink
                href="/menu"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:py-5 w-full sm:w-auto overflow-hidden rounded-xl bg-accent text-neutral-950 font-medium uppercase tracking-[0.15em] text-sm sm:text-base transition-all duration-500 shadow-[0_0_30px_rgba(var(--color-accent),0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(var(--color-accent),0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-accent/50"
            >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
                <BookOpen className="w-5 h-5 xl:hidden z-10" />
                <span className="z-10">{t('hero.cta_menu') as string}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-mirror hidden xl:block z-10" />
            </MotionLink>

            <MotionLink 
                href="/reservation"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:py-5 w-full sm:w-auto overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-200 hover:text-white font-medium uppercase tracking-[0.15em] text-sm sm:text-base transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20"
            >
                <CalendarDays className="w-5 h-5 xl:hidden z-10" />
                <span className="z-10">{heroVariant === 'general' ? t('hero.cta_reservation') as string : hero.cta1}</span>
            </MotionLink>
        </motion.div>
    );
};
