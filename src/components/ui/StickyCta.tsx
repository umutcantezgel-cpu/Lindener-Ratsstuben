"use client";

import React, { useState, useEffect } from 'react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { useTranslation } from '@/lib/i18n/use-translation';

export function StickyCta() {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    if (sessionStorage.getItem('sticky_cta_dismissed') === 'true') {
      setIsDismissed(true);
      return;
    }
    
    // Check form or calendly existing tracking flags
    if (sessionStorage.getItem('visited_form') || sessionStorage.getItem('visited_calendly')) {
      setIsDismissed(true); // Don't show if they already converting
      return;
    }

    const handleScroll = () => {
      const percentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (percentage > 30) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-bg-secondary border-t border-border text-text-primary p-4 shadow-2xl z-toast flex items-center justify-between md:bottom-6 md:inset-x-auto md:end-6 md:w-96 md:rounded-xl md:border">
      <div>
        <p className="font-semibold text-sm">Bereit für Ihr Projekt?</p>
        <p className="text-xs text-text-secondary">Reservieren Sie ein kostenfreies Strategiegespräch.</p>
      </div>
      <div className="flex gap-4 items-center">
        <LocaleLink href="/reservation" className="bg-primary hover:bg-primary-hover text-surface text-sm font-medium px-4 py-2 rounded-md transition">
          Termin buchen
        </LocaleLink>
        <button 
          onClick={() => {
            sessionStorage.setItem('sticky_cta_dismissed', 'true');
            setIsDismissed(true);
          }}
          className="text-text-tertiary hover:text-text-primary"
          aria-label={t('aria.close') as string}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
