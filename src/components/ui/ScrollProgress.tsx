"use client";
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 inset-x-0 h-1 bg-primary-600 origin-left rtl:origin-right z-[100]"
            style={{ scaleX }}
            aria-hidden="true"
        />
    );
};
