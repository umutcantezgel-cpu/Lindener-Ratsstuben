'use client';

import React from 'react';
import { m as motion } from "framer-motion";
import { useTranslation } from '@/lib/i18n/use-translation';

export const KegelRules: React.FC = () => {
    const { t } = useTranslation('pages');

    const rules = [
        {
            title: t('kegelbahn.rules.r1_title') as string,
            description: t('kegelbahn.rules.r1_desc') as string,
        },
        {
            title: t('kegelbahn.rules.r2_title') as string,
            description: t('kegelbahn.rules.r2_desc') as string,
        },
        {
            title: t('kegelbahn.rules.r3_title') as string,
            description: t('kegelbahn.rules.r3_desc') as string,
        }
    ];

    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display text-muted-gold mb-6 uppercase tracking-widest">
                        {t('kegelbahn.rules.title') as string}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rules.map((rule, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                            className="bg-bg-secondary/50 border border-border-subtle p-8 flex flex-col items-center text-center group hover:border-muted-gold/50 transition-colors duration-500"
                        >
                            <span className="text-muted-gold font-display text-2xl mb-4 italic">{(idx + 1).toString().padStart(2, '0')}</span>
                            <h3 className="text-xl font-display uppercase tracking-widest text-text-primary mb-4">
                                {rule.title}
                            </h3>
                            <p className="text-text-secondary font-light leading-relaxed">
                                {rule.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
