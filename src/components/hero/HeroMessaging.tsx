'use client';
import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

interface HeroMessagingProps {
    textY: MotionValue<string>;
}

export const HeroMessaging: React.FC<HeroMessagingProps> = ({ textY }) => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    return (
        <motion.div 
            style={{ y: textY }}
            className="flex flex-col items-center text-center w-full z-20"
        >
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

            <p className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-light tracking-wide text-neutral-300 max-w-2xl leading-relaxed mx-auto animate-hero-subheadline">
                {heroVariant === 'general' ? t('hero.description') : hero.subheadline}
            </p>
        </motion.div>
    );
};
