"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedCounterProps {
    target: number;
    label: string;
    suffix?: string;
    prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, label, suffix = "", prefix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            // Check for prefers-reduced-motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                setDisplayValue(target);
                return;
            }

            let startTimestamp: number | null = null;
            const duration = 2000; // 2 seconds

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                
                // easeOutExpo curve for nice deceleration
                const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                setDisplayValue(Math.floor(easeOut * target));

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    setDisplayValue(target);
                }
            };

            window.requestAnimationFrame(step);
        }
    }, [isIntersecting, target]);

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                {prefix}{displayValue}{suffix}
            </div>
            <p className="text-text-secondary font-medium">{label}</p>
        </div>
    );
};
