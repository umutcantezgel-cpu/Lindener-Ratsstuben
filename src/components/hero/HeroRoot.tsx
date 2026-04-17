'use client';
import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { HeroCinematics } from './HeroCinematics';
import { HeroMessaging } from './HeroMessaging';
import { HeroInteractionHarness } from './HeroInteractionHarness';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

interface HeroRootProps {
    mainMenuPdfUrl?: string;
}

export const HeroRoot: React.FC<HeroRootProps> = ({ mainMenuPdfUrl }) => {
    const { hero } = useAdaptiveMessaging();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section 
            ref={containerRef} 
            aria-labelledby="hero-title" 
            className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA] pt-32 pb-24"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-[#FAFAFA] pointer-events-none z-0" />
            
            <HeroCinematics scrollYProgress={scrollYProgress} imageUrl={hero.imageUrl} />

            <div className="container relative z-10 mx-auto px-6 sm:px-8 max-w-4xl flex flex-col items-center justify-center text-center">
                <div className="w-full flex flex-col items-center">
                    <HeroMessaging textY={textY} />
                    <HeroInteractionHarness mainMenuPdfUrl={mainMenuPdfUrl} />
                </div>
            </div>

            <HeroScrollIndicator opacityTransform={opacityTransform} />
        </section>
    );
};
