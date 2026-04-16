'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define the different cookie categories required for 20X Compliance (GDPR/TDDDG)
export type CookiePreferences = {
  necessary: boolean; // Always true
  analytics: boolean;
  marketing: boolean;
};

interface CookieContextProps {
  preferences: CookiePreferences | null;
  hasConsented: boolean;
  acceptAll: () => void;
  declineAll: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}

const CookieContext = createContext<CookieContextProps | undefined>(undefined);

const COOKIE_PREFERENCES_KEY = 'lr-cookie-preferences';

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if the user has already saved preferences
    try {
      const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences(parsed);
        setHasConsented(true);
      } else {
        // Fallback or Initial state
        setShowBanner(true);
      }
    } catch {
      console.warn("Could not read cookie preferences from local storage.");
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferences(false);
    try {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
      
      // Zero-Script-Policy implementation
      // Here you could trigger GTM/Analytics script load if prefs.analytics === true
      if (prefs.analytics) {
        window.dispatchEvent(new Event('cookies:analytics:accepted'));
      }
      if (prefs.marketing) {
        window.dispatchEvent(new Event('cookies:marketing:accepted'));
      }
    } catch {
      console.error("Could not save cookie preferences.");
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true
    });
  };

  const declineAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false
    });
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        hasConsented,
        acceptAll,
        declineAll,
        savePreferences,
        showBanner,
        setShowBanner,
        showPreferences,
        setShowPreferences,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
