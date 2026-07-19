'use client';
import React from 'react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const HeroMessaging: React.FC = () => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    const criticalStyles = `
        .animate-hero-headline {
            transform: translateY(20px);
            animation: slideUp 1.2s cubic-bezier(0.21, 0.47, 0.32, 0.98) forwards;
            will-change: transform;
        }
        .animate-hero-headline-2 {
            transform: translateY(20px);
            animation: slideUp 1.2s cubic-bezier(0.21, 0.47, 0.32, 0.98) 0.1s forwards;
            will-change: transform;
        }
        .animate-hero-subheadline {
            transform: translateY(10px);
            animation: slideUp 1.4s cubic-bezier(0.21, 0.47, 0.32, 0.98) 0.2s forwards;
            will-change: transform;
        }
        @keyframes slideUp {
            to { transform: translateY(0); }
        }
    `;

    return (
        <div className="flex flex-col items-center text-center w-full z-20">
            <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
            <h1 
                id="hero-title" 
                className="text-[clamp(3rem,8vw,6rem)] font-display font-light leading-[1.05] tracking-tight text-white mb-6 max-w-5xl"
            >
                {heroVariant === 'general' ? (
                    <div>
                        <span className="block animate-hero-headline">
                            {t('hero.headline_1')}
                        </span>
                        <span className="block text-accent font-medium mt-2 animate-hero-headline-2">
                            {t('hero.headline_2')}
                        </span>
                    </div>
                ) : (
                    <div>
                        <span className="block animate-hero-headline">{hero.headline}</span>
                    </div>
                )}
            </h1>

            <div 
                className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-light tracking-wide text-neutral-300 max-w-2xl leading-relaxed mx-auto animate-hero-subheadline space-y-4 [&>p]:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: (heroVariant === 'general' ? t('hero.description') : hero.subheadline) as string }}
            />
        </div>
    );
};
