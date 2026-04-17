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
            className="flex flex-col items-center text-center w-full"
            style={{ y: textY }}
        >
            {/* Premium Accent line & Subtitle */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-4 mb-8 overflow-hidden"
            >
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="text-muted-gold font-bold uppercase tracking-[0.4em] text-xs sm:text-sm"
                >
                    {t('hero.tagline') as string}
                </motion.span>
                <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                    className="h-[1px] w-12 bg-gradient-to-r from-transparent via-muted-gold to-transparent origin-center"
                />
            </motion.div>

            {/* Fluid Typography Clamping for extreme visual impact without overflowing */}
            <motion.h1 
                id="hero-title" 
                className="text-[clamp(2.25rem,5vw,4.5rem)] lg:text-[clamp(3rem,6vw,5.5rem)] font-display font-extralight leading-[1.05] tracking-tight rtl:tracking-normal text-onyx mb-6 text-balance drop-shadow-none"
            >
                {heroVariant === 'general' ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        <motion.span 
                            variants={{
                                hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                            }}
                            className="block"
                        >
                            {t('hero.headline_1')}
                        </motion.span>
                        <motion.span 
                            variants={{
                                hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                            }}
                            className="block font-medium text-transparent bg-clip-text bg-gradient-to-r from-muted-gold-dark via-muted-gold to-yellow-700 mt-2 pb-3"
                        >
                            {t('hero.headline_2')}
                        </motion.span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <span className="block">{hero.headline}</span>
                    </motion.div>
                )}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl md:text-[1.25rem] font-light tracking-wide rtl:tracking-normal text-gray-500 max-w-xl text-pretty leading-[1.8] drop-shadow-none mx-auto"
            >
                {heroVariant === 'general' ? t('hero.description') : hero.subheadline}
            </motion.p>
        </motion.div>
    );
};
