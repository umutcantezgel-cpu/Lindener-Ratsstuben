'use client';
import React, { useState } from 'react';
import { m as motion, MotionValue, useTransform } from "framer-motion";
import { Star, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { AdaptiveImage as Image } from '@/components/ui/AdaptiveImage';
import { useTranslation } from '@/lib/i18n/use-translation';
import { getCompanyData } from '@/data/company';

interface HeroAsymmetricGridProps {
    scrollYProgress: MotionValue<number>;
}

export const HeroAsymmetricGrid: React.FC<HeroAsymmetricGridProps> = ({ scrollYProgress }) => {
    const { t } = useTranslation('home');
    const { t: tCommon, locale } = useTranslation('common');
    const companyData = getCompanyData();
    const [isMobileExpanded, setIsMobileExpanded] = useState(false);

    const formatTime = (timeRange: { start: string, end: string }) => {
        const parseTime = (tStr: string) => {
            const [h, m] = tStr.split(':');
            const d = new Date();
            d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
            return d;
        };
        const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
        const startFmt = timeFmt.format(parseTime(timeRange.start));
        const endFmt = timeFmt.format(parseTime(timeRange.end));
        return tCommon('opening_hours.time_range', { start: startFmt, end: endFmt }) as string;
    };

    return (
        <motion.div 
            className="flex flex-col gap-4 xl:gap-8 justify-center relative w-full xl:px-10"
            initial={{ opacity: 0, x: 50, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]) }}
        >
            {/* Mobile "Quick Info" Toggle (Only visible on small screens) */}
            <div className="md:hidden w-full flex justify-center z-40">
                <button 
                    onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-border text-white px-6 py-2 rounded-full text-xs uppercase tracking-[0.2em] shadow-lg shadow-black/20 hover:bg-white/20 transition-colors"
                >
                    <span className="font-medium tracking-widest">{tCommon('quick_info')}</span>
                    {isMobileExpanded ? <ChevronUp className="w-4 h-4 text-muted-gold" /> : <ChevronDown className="w-4 h-4 text-muted-gold" />}
                </button>
            </div>

            {/* Responsive Container: 
                Mobile: Hidden if collapsed, Flex Col if expanded
                Tablet (md): Horizontal Snap Carousel
                Desktop (xl): Vertical Asymmetric Grid
            */}
            <div 
                className={`${isMobileExpanded ? 'flex' : 'hidden'} md:flex flex-col md:flex-row xl:flex-col gap-4 md:gap-6 xl:gap-8 w-full overflow-x-auto md:snap-x md:snap-mandatory pb-4 xl:pb-0 scrollbar-hide`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Bento Box 1: Rating (Top Panel) */}
                <div className="md:snap-center shrink-0 w-full md:w-[340px] xl:w-full self-center xl:self-end xl:me-0 bg-white/10 xl:bg-white/70 backdrop-blur-[24px] border border-border xl:border-stone-200/50 p-6 xl:p-7 rounded-[2rem] max-w-sm shadow-lg relative overflow-hidden group hover:bg-white/20 xl:hover:bg-white/90 xl:hover:border-stone-200 transition-all duration-700 cursor-default transform-gpu z-10">
                    <div className="absolute -top-24 -end-24 w-48 h-48 bg-muted-gold/20 rounded-full blur-[40px] group-hover:bg-muted-gold/30 transition-colors duration-1000 z-0"></div>
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 xl:via-onyx/5 to-transparent opacity-50 z-0"></div>

                    <div className="flex items-center gap-5 justify-between rtl:flex-row-reverse mb-4 relative z-10 w-full">
                        <div className="flex -space-x-3 rtl:space-x-reverse shrink-0">
                            {[20, 31, 42].map((imgId, i) => (
                                <div key={i} className="w-10 h-10 xl:w-12 xl:h-12 rounded-full border-[3px] border-border xl:border-border overflow-hidden bg-gray-800 relative shadow-md group-hover:scale-105 transition-transform duration-500" style={{ transitionDelay: `${i * 75}ms` }}>
                                    <Image src={`https://i.pravatar.cc/150?img=${imgId}`} alt={`${t('hero.glasspane.rating_alt')} ${i + 1}`} fill sizes="48px" className="object-cover" />
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 text-right rtl:text-left">
                            <div className="flex justify-end rtl:justify-start text-muted-gold gap-[2px]">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-[12px] h-[12px] xl:w-[14px] xl:h-[14px] ${i === 4 ? 'fill-muted-gold/30 text-transparent' : 'fill-current'}`} />)}
                            </div>
                            <p className="text-white xl:text-text-primary text-[10px] xl:text-xs font-bold mt-[6px] tracking-widest rtl:tracking-normal uppercase">{t('hero.glasspane.rating_stars') as string}</p>
                        </div>
                    </div>
                    <p className="text-gray-300 xl:text-gray-600 text-xs xl:text-sm font-light italic relative z-10 leading-[1.7] text-right rtl:text-left">&quot;{t('hero.glasspane.rating_quote') as string}&quot;</p>
                </div>

                {/* Bento Box 2: Open Hours (Bottom Panel) */}
                <div className="md:snap-center shrink-0 w-full md:w-[340px] xl:w-full self-center xl:self-start xl:-mt-12 xl:ms-8 bg-white/10 xl:bg-white/70 backdrop-blur-[24px] border border-border xl:border-stone-200/50 shadow-lg p-6 xl:p-7 rounded-[2rem] max-w-[340px] hover:bg-white/20 xl:hover:bg-white/90 xl:hover:border-stone-200 transition-all duration-700 relative overflow-hidden cursor-default group transform-gpu z-10">
                    <div className="absolute -bottom-24 -start-24 w-48 h-48 bg-primary/20 xl:bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/30 xl:group-hover:bg-primary/20 transition-colors duration-1000 z-0"></div>
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 xl:via-onyx/5 to-transparent opacity-50 z-0"></div>

                    <div className="flex items-start gap-4 xl:gap-5 relative z-10 rtl:flex-row-reverse">
                        <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-full bg-white/10 xl:bg-white border border-border xl:border-stone-100 text-muted-gold flex items-center justify-center shrink-0 shadow-sm group-hover:bg-white/20 xl:group-hover:bg-stone-50 transition-colors duration-700">
                            <Clock className="w-4 h-4 xl:w-5 xl:h-5 text-muted-gold group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="w-full pt-1">
                            <h3 className="text-[10px] xl:text-[11px] mb-3 uppercase tracking-[0.25em] rtl:tracking-normal text-muted-gold font-bold text-left rtl:text-right">{t('hero.glasspane.hours_title') as string}</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs xl:text-sm border-b border-border xl:border-stone-200 pb-2 rtl:flex-row-reverse">
                                    <span className="text-gray-300 xl:text-gray-500 font-light flex-none w-1/3">{t('hero.glasspane.hours_lunch') as string}</span>
                                    <span className="text-white xl:text-text-primary font-mono font-medium tracking-wide rtl:tracking-normal text-right">{formatTime(companyData.openingHours.regulaer.mittags)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs xl:text-sm pt-1 rtl:flex-row-reverse">
                                    <span className="text-gray-300 xl:text-gray-500 font-light flex-none w-1/3">{t('hero.glasspane.hours_dinner') as string}</span>
                                    <span className="text-white xl:text-text-primary font-mono font-medium tracking-wide rtl:tracking-normal text-right">{formatTime(companyData.openingHours.regulaer.abends)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* High-End Decorator Element (Desktop only) */}
            <div className="hidden xl:block absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-muted-gold/5 via-transparent to-primary/5 rounded-full blur-3xl -z-10 mix-blend-screen pointer-events-none" />
        </motion.div>
    );
};
