"use client";

import { useEffect } from 'react';

type TriggerConfig = {
    onTrigger: () => void;
};

/**
 * Custom hook to monitor deep engagement metrics for behavioral targeting.
 */
export function useBehavioralTrigger() {
    
    // 1. Exit-Intent Trigger
    const useExitIntent = ({ onTrigger }: TriggerConfig) => {
        useEffect(() => {
            const handleMouseLeave = (e: MouseEvent) => {
                // Determine if user is moving mouse out of the top of the window
                if (e.clientY <= 20) {
                    const hasTriggered = sessionStorage.getItem('exit_intent_triggered');
                    if (!hasTriggered) {
                        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                        if (!prefersReducedMotion) {
                            sessionStorage.setItem('exit_intent_triggered', 'true');
                            onTrigger();
                        }
                    }
                }
            };
            document.addEventListener('mouseleave', handleMouseLeave);
            return () => document.removeEventListener('mouseleave', handleMouseLeave);
        }, [onTrigger]);
    };

    // 2. Scroll Depth Trigger
    const useScrollDepth = (thresholdPercentage: number = 75, { onTrigger }: TriggerConfig) => {
        useEffect(() => {
            const handleScroll = () => {
                const scrollPosition = window.scrollY + window.innerHeight;
                const totalHeight = document.documentElement.scrollHeight;
                const percentage = (scrollPosition / totalHeight) * 100;

                if (percentage >= thresholdPercentage) {
                    const hasTriggered = sessionStorage.getItem(`scroll_depth_${thresholdPercentage}`);
                    if (!hasTriggered) {
                        sessionStorage.setItem(`scroll_depth_${thresholdPercentage}`, 'true');
                        onTrigger();
                    }
                }
            };
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [thresholdPercentage, onTrigger]);
    };

    // 3. Time based Trigger
    const useTimeBased = (seconds: number = 60, { onTrigger }: TriggerConfig) => {
        useEffect(() => {
            let activeTime = 0;
            let idleTime = 0;

            const updateActivity = () => { idleTime = 0; };

            window.addEventListener('mousemove', updateActivity);
            window.addEventListener('keydown', updateActivity);
            window.addEventListener('scroll', updateActivity);
            window.addEventListener('click', updateActivity);

            const timer = setInterval(() => {
                idleTime++;
                if (idleTime < 10) { // user is active (has interacted in last 10s)
                    activeTime++;
                }

                if (activeTime >= seconds) {
                    const hasTriggered = sessionStorage.getItem(`time_based_${seconds}`);
                    if (!hasTriggered) {
                        sessionStorage.setItem(`time_based_${seconds}`, 'true');
                        onTrigger();
                        clearInterval(timer);
                    }
                }
            }, 1000);

            return () => {
                clearInterval(timer);
                window.removeEventListener('mousemove', updateActivity);
                window.removeEventListener('keydown', updateActivity);
                window.removeEventListener('scroll', updateActivity);
                window.removeEventListener('click', updateActivity);
            };
        }, [seconds, onTrigger]);
    };

    return { useExitIntent, useScrollDepth, useTimeBased };
}
