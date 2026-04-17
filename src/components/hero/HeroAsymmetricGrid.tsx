'use client';
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { Star, Clock } from 'lucide-react';
import Image from '@/components/ui/ImagePlaceholder';
import { useTranslation } from '@/lib/i18n/use-translation';
import { companyData } from '@/data/company';

interface HeroAsymmetricGridProps {
    scrollYProgress: MotionValue<number>;
}

export const HeroAsymmetricGrid: React.FC<HeroAsymmetricGridProps> = ({ scrollYProgress }) => {
    const { t } = useTranslation('home');
    const { t: tCommon } = useTranslation('common');

    return (
        <motion.div 
            className="flex flex-col gap-8 justify-center relative w-full lg:px-10 mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]) }}
        >
            {/* Bento Box 1: Rating (Top Panel) */}
            <div className="self-end lg:ltr:mr-0 lg:rtl:ml-0 bg-white/70 backdrop-blur-[24px] border border-stone-200/50 p-7 rounded-[2rem] max-w-sm w-full shadow-lg relative overflow-hidden group hover:bg-white/90 hover:border-stone-200 transition-all duration-700 cursor-default transform-gpu">
                {/* Inner glow / specular highlight */}
                <div className="absolute -top-24 ltr:-right-24 rtl:-left-24 w-48 h-48 bg-muted-gold/20 rounded-full blur-[40px] group-hover:bg-muted-gold/30 transition-colors duration-1000 z-0"></div>
                {/* Top edge highlight */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-onyx/5 to-transparent opacity-50 z-0"></div>

                <div className="flex items-center gap-5 justify-between rtl:flex-row-reverse mb-4 relative z-10 w-full">
                    <div className="flex -space-x-3 rtl:space-x-reverse shrink-0">
                        {[20, 31, 42].map((imgId, i) => (
                            <div key={i} className="w-12 h-12 rounded-full border-[3px] border-onyx-dark overflow-hidden bg-gray-800 relative shadow-md group-hover:scale-105 transition-transform duration-500" style={{ transitionDelay: `${i * 75}ms` }}>
                                <Image src={`https://i.pravatar.cc/150?img=${imgId}`} alt={`${t('hero.glasspane.rating_alt')} ${i + 1}`} fill sizes="48px" className="object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 text-right rtl:text-left">
                        <div className="flex justify-end rtl:justify-start text-muted-gold gap-[2px]">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-[14px] h-[14px] ${i === 4 ? 'fill-muted-gold/30 text-transparent' : 'fill-current'}`} />)}
                        </div>
                        <p className="text-onyx-dark text-xs font-bold mt-[6px] tracking-widest rtl:tracking-normal uppercase">{t('hero.glasspane.rating_stars') as string}</p>
                    </div>
                </div>
                <p className="text-gray-600 text-sm font-light italic relative z-10 leading-[1.7] text-right rtl:text-left">&quot;{t('hero.glasspane.rating_quote') as string}&quot;</p>
            </div>

            {/* Bento Box 2: Open Hours (Bottom Panel, overlapping left) */}
            <div className="self-start lg:-mt-12 lg:ltr:ml-8 lg:rtl:mr-8 bg-white/70 backdrop-blur-[24px] border border-stone-200/50 shadow-lg p-7 rounded-[2rem] max-w-[320px] w-full hover:bg-white/90 hover:border-stone-200 transition-all duration-700 relative overflow-hidden cursor-default group transform-gpu z-10">
                <div className="absolute -bottom-24 ltr:-left-24 rtl:-right-24 w-48 h-48 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-1000 z-0"></div>
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-onyx/5 to-transparent opacity-50 z-0"></div>

                <div className="flex items-start gap-5 relative z-10 rtl:flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-white border border-stone-100 text-muted-gold flex items-center justify-center shrink-0 shadow-sm group-hover:bg-stone-50 transition-colors duration-700">
                        <Clock className="w-5 h-5 text-muted-gold group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="w-full pt-1">
                        <h3 className="text-[11px] mb-3 uppercase tracking-[0.25em] rtl:tracking-normal text-muted-gold font-bold text-left rtl:text-right">{t('hero.glasspane.hours_title') as string}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm border-b border-stone-200 pb-2 rtl:flex-row-reverse">
                                <span className="text-gray-500 font-light flex-none w-1/3">{t('hero.glasspane.hours_lunch') as string}</span>
                                <span className="text-onyx-dark font-mono font-medium tracking-wide rtl:tracking-normal text-right">{companyData.openingHours.regulaer.mittags.replace('Uhr', tCommon('company.time_suffix') as string).trim()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-1 rtl:flex-row-reverse">
                                <span className="text-gray-500 font-light flex-none w-1/3">{t('hero.glasspane.hours_dinner') as string}</span>
                                <span className="text-onyx-dark font-mono font-medium tracking-wide rtl:tracking-normal text-right">{companyData.openingHours.regulaer.abends.replace('Uhr', tCommon('company.time_suffix') as string).trim()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* High-End Decorator Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-muted-gold/5 via-transparent to-primary/5 rounded-full blur-3xl -z-10 mix-blend-screen pointer-events-none" />
        </motion.div>
    );
};
