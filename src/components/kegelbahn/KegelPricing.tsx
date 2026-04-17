'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';

export const KegelPricing: React.FC = () => {
    const { t } = useTranslation('pages');

    const pricingPlans = [
        {
            title: t('kegelbahn.pricing.hourly') as string,
            price: t('kegelbahn.pricing.hourly_price') as string,
            description: t('kegelbahn.pricing.hourly_desc') as string,
        },
        {
            title: t('kegelbahn.pricing.shoes') as string,
            price: t('kegelbahn.pricing.shoes_price') as string,
            description: t('kegelbahn.pricing.shoes_desc') as string,
        },
        {
            title: t('kegelbahn.pricing.package') as string,
            price: t('kegelbahn.pricing.package_price') as string,
            description: t('kegelbahn.pricing.package_desc') as string,
            isPremium: true
        }
    ];

    return (
        <section className="py-24 bg-light-sand">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display text-onyx mb-4 uppercase tracking-widest">
                        {t('kegelbahn.pricing.title') as string}
                    </h2>
                    <div className="h-[1px] w-12 bg-muted-gold mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {pricingPlans.map((plan, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                            className={`flex flex-col items-center text-center p-10 border ${plan.isPremium ? 'border-muted-gold bg-white shadow-xl' : 'border-gray-200 bg-transparent'} transition-all duration-500 hover:-translate-y-2`}
                        >
                            <h3 className="text-xl font-display uppercase tracking-widest text-onyx mb-4">
                                {plan.title}
                            </h3>
                            <div className="text-4xl font-light text-muted-gold mb-6">
                                {plan.price}
                            </div>
                            <p className="text-gray-500 font-light leading-relaxed">
                                {plan.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
