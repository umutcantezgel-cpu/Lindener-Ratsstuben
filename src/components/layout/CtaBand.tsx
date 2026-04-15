"use client";

import React from 'react';
import { CtaWithTrust } from '../ui/CtaWithTrust';
import { AnimateIn } from '../animations/animate-in';

interface CtaBandProps {
    headline: string;
    subheadline: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({ headline, subheadline }) => {
    return (
        <section aria-label={headline} className="py-24 bg-primary text-surface relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-primary-700 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-400 via-primary-700 to-primary-900" />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                <AnimateIn direction="up">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-surface/10 backdrop-blur-md border border-surface/20 p-10 md:p-16 rounded-3xl shadow-elevation-2">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
                                {headline}
                            </h2>
                            <p className="text-primary-100 text-lg md:text-xl font-medium max-w-2xl">
                                {subheadline}
                            </p>
                        </div>
                        
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <CtaWithTrust 
                                href="/reservation"
                                actionKey="reserve"
                                trustKey="booking"
                                variant="secondary" 
                            />
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
};
