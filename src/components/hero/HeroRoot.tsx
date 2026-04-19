'use client';
import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { HeroCinematics } from './HeroCinematics';
import { HeroMessaging } from './HeroMessaging';
import { HeroInteractionHarness } from './HeroInteractionHarness';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const HeroRoot: React.FC = () => {
    const { hero } = useAdaptiveMessaging();
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section 
            ref={containerRef} 
            aria-labelledby="hero-title" 
            className="relative w-full h-[100svh] overflow-hidden bg-neutral-950 flex flex-col items-center justify-center"
        >
            {/* Layer 0: Cinematic Background & Vignette */}
            <div className="absolute inset-0 z-0">
                <HeroCinematics 
                    scrollYProgress={scrollYProgress} 
                    imageUrl={hero.imageUrl} 
                    blurDataURL={hero.blurDataURL}
                />
            </div>
            
            {/* Layer 1: Core Messaging & CTAs */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full flex flex-col items-center justify-center">
                <HeroMessaging textY={textY} />
                <HeroInteractionHarness />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-40">
                <HeroScrollIndicator opacityTransform={opacityTransform} />
            </div>
        </section>
    );
};
