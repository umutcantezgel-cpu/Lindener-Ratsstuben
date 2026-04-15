"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/use-translation';


export const ExitIntentOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { t } = useTranslation('pages');

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If the mouse leaves from the top of the window (indicating they are going for tabs/url bar)
      // and we haven't triggered it yet in this session
      if (e.clientY <= 5 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true); // Ensure it only fires once
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-text-primary/40"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="bg-surface p-10 md:p-14 rounded-2xl shadow-luxury max-w-lg w-full mx-4 text-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-display font-medium text-text-primary mb-4">
              {t('exit_intent.title') as string}
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              {t('exit_intent.description') as string}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/reservation"
                className="px-6 py-3 bg-accent text-surface rounded-full font-medium hover:bg-accent-hover transition-colors shadow-warm"
              >
                {t('exit_intent.cta_reserve') as string}
              </a>
              <button 
                onClick={() => setIsVisible(false)}
                className="px-6 py-3 bg-surface text-text-primary border border-border rounded-full font-medium hover:bg-bg-secondary transition-colors"
              >
                {t('exit_intent.cta_continue') as string}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentOverlay;
