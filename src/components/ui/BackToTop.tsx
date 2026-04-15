"use client";
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const BackToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        let animationFrameId: number;
        const toggleVisibility = () => {
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className={clsx(
                        "fixed bottom-6 right-6 z-40 p-3 rounded-full",
                        "bg-primary text-surface shadow-elevation-2",
                        "hover:bg-primary-hover hover:shadow-elevation-3 hover:-translate-y-1 transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    )}
                    aria-label="Zum Anfang springen"
                >
                    <ChevronUp className="w-6 h-6" aria-hidden="true" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
