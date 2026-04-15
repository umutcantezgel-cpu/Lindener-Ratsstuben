"use client";

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
    { name: "Tripadvisor", label: "Exzellenz 2023" },
    { name: "Lieferando", label: "Top Restaurant" },
    { name: "Slow Food", label: "Regionale Partner" },
    { name: "Michelin", label: "Empfohlen" },
    { name: "Falstaff", label: "Guide 2024" },
    { name: "Gault&Millau", label: "1 Haube" },
];

export const ClientLogoMarquee = () => {
    // Duplicate for infinite scroll without gap
    const marqueeLogos = [...logos, ...logos, ...logos];

    return (
        <div className="w-full overflow-hidden bg-bg-secondary py-12 border-y border-border">
            <div className="container mx-auto px-4 mb-8 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Bekannt aus & Zertifizierungen
                </span>
            </div>
            
            <div className="relative flex max-w-[100vw] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-secondary to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-secondary to-transparent pointer-events-none" />
                
                <motion.div 
                    className="flex gap-16 md:gap-24 items-center whitespace-nowrap pl-4 pr-16"
                    animate={{ x: ["0%", "-33.33%"] }}
                    transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity,
                    }}
                >
                    {marqueeLogos.map((logo, idx) => (
                        <div 
                            key={idx} 
                            className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        >
                            <span className="text-2xl font-display font-bold text-text-primary tracking-wide">
                                {logo.name}
                            </span>
                            {logo.label && (
                                <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider mt-1">
                                    {logo.label}
                                </span>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};
