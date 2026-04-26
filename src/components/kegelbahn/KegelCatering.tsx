'use client';

import React from 'react';
import { m as motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n/use-translation';

export const KegelCatering: React.FC = () => {
    const { t } = useTranslation('pages');

    const cateringOptions = [
        {
            title: t('kegelbahn.catering.snacks') as string,
            description: t('kegelbahn.catering.snacks_desc') as string,
        },
        {
            title: t('kegelbahn.catering.drinks') as string,
            description: t('kegelbahn.catering.drinks_desc') as string,
        }
    ];

    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="w-full md:w-1/3"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary mb-6 uppercase tracking-widest leading-tight break-words hyphens-auto">
                            {t('kegelbahn.catering.title') as string}
                        </h2>
                        <div className="h-[2px] w-16 bg-muted-gold mb-8" />
                    </motion.div>

                    <div className="w-full md:w-2/3 flex flex-col gap-12">
                        {cateringOptions.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                                className="group relative ps-8 border-s border-border-subtle hover:border-muted-gold transition-colors duration-500"
                            >
                                <h3 className="text-2xl font-display text-text-primary mb-3 uppercase tracking-wider">
                                    {item.title}
                                </h3>
                                <p className="text-text-secondary font-light leading-relaxed text-lg">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
