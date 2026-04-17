'use client';
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
interface HeroCinematicsProps {
    scrollYProgress: MotionValue<number>;
    imageUrl?: string;
}

export const HeroCinematics: React.FC<HeroCinematicsProps> = ({ scrollYProgress }) => {
    // Opacity fade when scrolling down
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

    return (
        <motion.div 
            className="absolute inset-0 z-0 origin-bottom bg-[#FAFAFA]"
            style={{ opacity: opacityTransform }}
            aria-hidden="true"
        >
            {/* Extreme Minimalist Soft Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,_var(--tw-gradient-stops))] from-muted-gold/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,_var(--tw-gradient-stops))] from-stone-200/30 via-transparent to-transparent pointer-events-none" />
            
            {/* Soft Grain Overlay for texture (optional) */}
            <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] pointer-events-none" />
        </motion.div>
    );
};
