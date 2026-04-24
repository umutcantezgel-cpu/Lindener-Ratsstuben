"use client";

import { useState, useEffect } from 'react';

/**
 * Feature Flags Configuration Structure
 */
export type FeatureFlags = {
    [key: string]: {
        enabled: boolean;
        percentage: number;
        description: string;
    };
};

/**
 * Feature Flags Definitions
 */
export const featureFlags: FeatureFlags = {
    betaContactForm: {
        enabled: process.env.NEXT_PUBLIC_FF_BETA_CONTACT_FORM !== 'false',
        percentage: 100,
        description: "New contact form with enhanced validation",
    },
    newHomepageDesign: {
        enabled: process.env.NEXT_PUBLIC_FF_NEW_HOMEPAGE_DESIGN === 'true',
        percentage: 0,
        description: "Redesigned homepage (WIP)",
    },
    showTestimonials: {
        enabled: process.env.NEXT_PUBLIC_FF_TESTIMONIALS !== 'false',
        percentage: 100,
        description: "Testimonials-Sektion auf der Startseite",
    },
    enableAnimations: {
        enabled: process.env.NEXT_PUBLIC_FF_ANIMATIONS !== 'false',
        percentage: 100,
        description: "Animationen systemweit",
    },
    showReservation: {
        enabled: process.env.NEXT_PUBLIC_FF_RESERVATION !== 'false',
        percentage: 100,
        description: "Reservierungs-Widget anzeigen",
    },
    showGallery: {
        enabled: process.env.NEXT_PUBLIC_FF_GALLERY !== 'false',
        percentage: 100,
        description: "Galerie-Seite aktivieren",
    },


};

/**
 * Helper: simple deterministic hash based on a string
 */
function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

/**
 * Hook to check if a feature flag is active for the current user
 */
export function useFeatureFlag(flag: keyof typeof featureFlags): boolean {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const config = featureFlags[flag];
        
        // 1. Check enabled kill switch
        if (!config || !config.enabled) {
            setIsActive(false);
            return;
        }

        // 2. Check percentage 100% rollout
        if (config.percentage >= 100) {
            setIsActive(true);
            return;
        }

        // 3. Check percentage limits
        if (config.percentage <= 0) {
            setIsActive(false);
            return;
        }

        // 4. Calculate deterministic rollout based on unique user session/id
        let userId = localStorage.getItem('ff_user_id');
        if (!userId) {
            userId = Math.random().toString(36).substring(2, 15);
            localStorage.setItem('ff_user_id', userId);
        }

        const passThreshold = (hashString(`${flag}-${userId}`) % 100) < config.percentage;
        setIsActive(passThreshold);
    }, [flag]);

    return isActive;
}
