'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';

interface KegelHeroProps {
    locale?: string;
}

export const KegelHero: React.FC<KegelHeroProps> = () => {
    const { t } = useTranslation('pages');

    return (
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 bg-[#FAFAFA] overflow-hidden">
            {/* Minimalist Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("/images/noise.png")' }}></div>

            <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-4xl md:text-6xl font-display text-onyx mb-6 uppercase tracking-[0.05em] leading-tight">
                        {t('kegelbahn.hero.title') as string}
                    </h1>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-lg md:text-2xl text-gray-500 max-w-2xl font-light">
                        {t('kegelbahn.hero.subtitle') as string}
                    </p>
                </motion.div>
                
                {/* Minimalist Accent Line */}
                <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    className="w-24 h-[1px] bg-muted-gold mt-12 origin-left"
                />
            </div>
        </section>
    );
};
