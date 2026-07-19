'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const HeroInteractionHarness: React.FC = () => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    const criticalStyles = `
        .animate-hero-harness {
            opacity: 0;
            transform: translateY(30px);
            animation: harnessFadeIn 1.2s cubic-bezier(0.21, 0.47, 0.32, 0.98) 1.0s forwards;
            will-change: transform, opacity;
        }
        @keyframes harnessFadeIn {
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    return (
        <div className="flex flex-row flex-wrap gap-5 sm:gap-6 xl:gap-8 w-full justify-center items-center mt-16 z-20 animate-hero-harness px-4 sm:px-0">
            <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
            <Link
                href="/menu"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 w-full sm:w-auto rounded-2xl bg-accent text-neutral-950 font-bold uppercase tracking-[0.15em] text-sm sm:text-base transition-all duration-500 shadow-[0_0_30px_rgba(var(--color-accent),0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(var(--color-accent),0.6),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-accent/50 hover:-translate-y-1 active:translate-y-0"
            >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine overflow-hidden rounded-2xl" />
                <BookOpen className="w-5 h-5 xl:hidden z-10 flex-shrink-0" />
                <span className="z-10 text-center">{t('hero.cta_menu') as string}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-mirror hidden xl:block z-10 flex-shrink-0" />
            </Link>

            <Link 
                href="/reservation"
                className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 w-full sm:w-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-neutral-200 hover:text-white font-bold uppercase tracking-[0.15em] text-sm sm:text-base transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 active:translate-y-0"
            >
                <div className="absolute inset-0 overflow-hidden rounded-2xl" />
                <CalendarDays className="w-5 h-5 xl:hidden z-10 flex-shrink-0" />
                <span className="z-10 text-center">{heroVariant === 'general' ? t('hero.cta_reservation') as string : hero.cta1}</span>
            </Link>
        </div>
    );
};
