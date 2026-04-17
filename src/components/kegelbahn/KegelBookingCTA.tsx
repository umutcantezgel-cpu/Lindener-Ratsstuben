'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

export const KegelBookingCTA: React.FC = () => {
    const { t } = useTranslation('pages');

    return (
        <section className="py-24 bg-[#FAFAFA] border-t border-gray-100 flex justify-center items-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center"
            >
                <Link 
                    href="/reservation"
                    className="group relative text-onyx hover:text-muted-gold font-medium uppercase tracking-[0.2em] text-sm flex items-center gap-4 transition-colors duration-500 pb-2"
                >
                    {t('kegelbahn.cta.book') as string}
                    <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-3 rtl:group-hover:-translate-x-3 rtl:rotate-180" />
                    {/* 1px Underline hover effect */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-muted-gold group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
            </motion.div>
        </section>
    );
};
