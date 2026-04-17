"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';
import { Accessibility, UtensilsCrossed, ChefHat, Sun, Car, PartyPopper, ShoppingBag, Flame, Heart, Wifi, Dog } from 'lucide-react';

export const ServiceMarquee = () => {
    const { t } = useTranslation('home');

    const services = [
        { key: "services.accessibility", icon: Accessibility },
        { key: "services.buffet", icon: UtensilsCrossed },
        { key: "services.catering", icon: ChefHat },
        { key: "services.outdoor", icon: Sun },
        { key: "services.parking", icon: Car },
        { key: "services.private_events", icon: PartyPopper },
        { key: "services.takeaway", icon: ShoppingBag },
        { key: "services.heated_terrace", icon: Flame },
        { key: "services.weddings", icon: Heart },
        { key: "services.free_wifi", icon: Wifi },
        { key: "services.pets_allowed", icon: Dog },
    ];

    // Duplicate for infinite scroll without gap
    const marqueeServices = [...services, ...services, ...services];

    return (
        <div className="w-full overflow-hidden bg-bg-secondary py-12 border-y border-border">
            <div className="container mx-auto px-4 mb-4 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    {t('services.label') as string}
                </span>
            </div>
            
            <div className="relative flex max-w-[100vw] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-secondary to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-secondary to-transparent pointer-events-none" />
                
                <motion.div 
                    className="flex gap-12 md:gap-20 items-center whitespace-nowrap pl-4 pr-16"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        ease: "linear",
                        duration: 35,
                        repeat: Infinity,
                    }}
                >
                    {marqueeServices.map((service, idx) => (
                        <div 
                            key={idx} 
                            className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-all duration-300 group cursor-default"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <service.icon className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                            <span className="text-base md:text-lg font-bold text-text-primary tracking-wide">
                                {t(service.key) as string}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
