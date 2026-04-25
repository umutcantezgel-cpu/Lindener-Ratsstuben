'use client';

import React from 'react';
import { m as motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n/use-translation';

export const KegelFeatures: React.FC = () => {
    const { t } = useTranslation('pages');

    const features = [
        {
            title: t('kegelbahn.features.lanes.title') as string,
            description: t('kegelbahn.features.lanes.desc') as string,
            number: '01'
        },
        {
            title: t('kegelbahn.features.dining.title') as string,
            description: t('kegelbahn.features.dining.desc') as string,
            number: '02'
        }
    ];

    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {features.map((feature, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: idx * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="flex flex-col relative group"
                        >
                            {/* Number Accent */}
                            <span className="text-8xl font-display font-light text-gray-500 mb-8 select-none transition-colors duration-700 group-hover:text-muted-gold/10" aria-hidden="true">
                                {feature.number}
                            </span>
                            
                            <h2 className="text-3xl font-display text-onyx mb-6 uppercase tracking-wider relative">
                                {feature.title}
                                <span className="absolute -bottom-3 start-0 w-8 h-[2px] bg-muted-gold transition-all duration-500 group-hover:w-16"></span>
                            </h2>
                            
                            <p className="text-gray-500 leading-relaxed font-light text-lg">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
