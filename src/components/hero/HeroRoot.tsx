'use client';
import React, { useRef } from 'react';
import { HeroCinematics } from './HeroCinematics';
import { HeroMessaging } from './HeroMessaging';
import { HeroInteractionHarness } from './HeroInteractionHarness';
import { HeroScrollIndicator } from './HeroScrollIndicator';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export const HeroRoot: React.FC = () => {
    const { hero } = useAdaptiveMessaging();
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section 
            ref={containerRef} 
            aria-labelledby="hero-title" 
            className="relative w-full min-h-[100svh] bg-neutral-950 flex flex-col items-center justify-center pt-32 pb-24 lg:pt-40 lg:pb-32"
        >
            {/* Layer 0: Cinematic Background & Vignette */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <HeroCinematics 
                    imageUrl={hero.imageUrl} 
                    blurDataURL={hero.blurDataURL}
                />
            </div>
            
            {/* Layer 1: Core Messaging & CTAs */}
            <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full flex flex-col items-center justify-center">
                <HeroMessaging />
                <HeroInteractionHarness />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-40">
                <HeroScrollIndicator />
            </div>
        </section>
    );
};
