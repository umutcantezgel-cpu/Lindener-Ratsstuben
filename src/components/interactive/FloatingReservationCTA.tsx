'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTranslation } from '@/lib/i18n/use-translation';

export function FloatingReservationCTA() {
  const { navCta, variant } = useAdaptiveMessaging();
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation('pages');
  
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
      


      if (scrollPosition > windowHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Clear previous timeout
      clearTimeout(scrollTimeout);
      
      // Psycho-Kinetic Trigger: Pulse when highly engaged (scroll speed drops to 0 while far down)
      setIsPulsing(false);
      setIsHovered(false); // We'll use isHovered for both actual hover and auto-show
      if (scrollPercentage > 30) {
        // Start pulsing after 1.5s of no scrolling (dwell time)
        scrollTimeout = setTimeout(() => {
          setIsPulsing(true);
          setIsHovered(true); // Auto-show FOMO text
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Liquid Transition configurations
  const liquidTransition = {
    duration: 0.8,
    ease: [0.25, 1, 0.5, 1] as [number, number, number, number]
  };

  const getFomoText = () => {
    switch (variant) {
      case 'kultur': return t('fomo.kultur') as string;
      case 'business': return t('fomo.business') as string;
      case 'kulinarik': return t('fomo.kulinarik') as string;
      case 'natur': return t('fomo.natur') as string;
      default: return t('fomo.default') as string;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          transition={liquidTransition}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none"
        >
          {/* FOMO / Social Proof Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mb-3 px-4 py-2 bg-surface/95 backdrop-blur-md text-text-secondary text-xs font-semibold rounded-lg shadow-warm border border-border"
              >
                {getFomoText()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating CTA Button */}
          <motion.a
            href="/reservation"
            className="pointer-events-auto group relative flex items-center gap-3 px-5 py-3.5 bg-accent text-neutral-950 rounded-full shadow-warm hover:bg-accent-hover transition-colors overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={isPulsing && !shouldReduceMotion ? {
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                "0 0 0 4px rgba(212, 168, 67, 0.2)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              ]
            } : {}}
            transition={isPulsing ? {
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
            } : {}}
          >
            {/* Liquid shine effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface/20 to-transparent group-hover:animate-[shine_1.5s_cubic-bezier(0.16,1,0.3,1)]" />
            
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-surface/20 backdrop-blur-sm">
              <CalendarDays className="w-4 h-4 text-neutral-950" />
            </div>
            
            <span className="relative z-10 font-bold text-sm tracking-wide pr-1">
              {navCta}
            </span>

            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
