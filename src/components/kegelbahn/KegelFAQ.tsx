'use client';

import React, { useState } from 'react';
import { m as motion, AnimatePresence } from "framer-motion";
import { useTranslation } from '@/lib/i18n/use-translation';
import { ChevronDown } from 'lucide-react';

export const KegelFAQ: React.FC = () => {
    const { t } = useTranslation('pages');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: t('kegelbahn.faq.q1') as string,
            answer: t('kegelbahn.faq.a1') as string,
        },
        {
            question: t('kegelbahn.faq.q2') as string,
            answer: t('kegelbahn.faq.a2') as string,
        },
        {
            question: t('kegelbahn.faq.q3') as string,
            answer: t('kegelbahn.faq.a3') as string,
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-light-sand">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display text-onyx mb-4 uppercase tracking-widest">
                        {t('kegelbahn.faq.title') as string}
                    </h2>
                    <div className="h-[1px] w-12 bg-muted-gold mx-auto" />
                </motion.div>

                <motion.div layout className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <motion.div 
                            layout
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                            className="bg-white border border-gray-200"
                        >
                            <motion.button
                                layout="position"
                                onClick={() => toggleFAQ(idx)}
                                className="w-full text-left px-8 py-6 flex justify-between items-center group cursor-pointer"
                                aria-expanded={openIndex === idx}
                            >
                                <h3 className="text-lg font-display uppercase tracking-widest text-onyx pe-8 group-hover:text-muted-gold transition-colors duration-300">
                                    {faq.question}
                                </h3>
                                <ChevronDown 
                                    className={`w-5 h-5 text-muted-gold flex-shrink-0 transition-transform duration-500 ease-in-out ${openIndex === idx ? 'rotate-180' : ''}`} 
                                />
                            </motion.button>
                            
                            <AnimatePresence initial={false}>
                                {openIndex === idx && (
                                    <motion.div
                                        layout="position"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-6 text-gray-500 font-light leading-relaxed border-t border-gray-100 pt-6">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
