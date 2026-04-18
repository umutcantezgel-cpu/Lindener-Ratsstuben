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
            style={{ willChange: "transform, opacity", y: textY }}
            className="flex flex-col items-center text-center w-full z-20"
        >
            <motion.h1 
                id="hero-title" 
                className="text-[clamp(3rem,8vw,6rem)] font-display font-light leading-[1.05] tracking-tight text-white mb-6 max-w-5xl"
            >
                {heroVariant === 'general' ? (
                    <motion.div style={{ willChange: "transform, opacity" }}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <motion.span 
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 } }
                            }}
                            className="block"
                        >
                            {t('hero.headline_1')}
                        </motion.span>
                        <motion.span 
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.4 } }
                            }}
                            className="block text-accent font-medium mt-2"
                        >
                            {t('hero.headline_2')}
                        </motion.span>
                    </motion.div>
                ) : (
                    <motion.div style={{ willChange: "transform, opacity" }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
                    >
                        <span className="block">{hero.headline}</span>
                    </motion.div>
                )}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-[clamp(1.1rem,1.8vw,1.35rem)] font-light tracking-wide text-neutral-300 max-w-2xl leading-relaxed mx-auto"
            >
                {heroVariant === 'general' ? t('hero.description') : hero.subheadline}
            </motion.p>
        </motion.div>
    );
};
