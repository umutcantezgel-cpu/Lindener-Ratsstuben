'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { logConsentEvent, requiresReConsent } from '@/lib/consent-logger';
import { setConsentState as setLegacyConsentState } from '@/lib/analytics/consent';

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

        // DSGVO: Re-consent check when consent revision changes
        if (requiresReConsent()) {
          setShowBanner(true);
        }
      } else {
        // No prior consent — show banner (Privacy by Default)
        setShowBanner(true);
      }
    } catch {
      console.warn("Could not read cookie preferences from local storage.");
      setShowBanner(true);
    }
  }, []);

  // DSGVO Art. 7(3): Enable footer "Cookie-Einstellungen" button
  // Listens for 'open-cookie-preferences' event dispatched from Footer.tsx
  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowBanner(true);
      setShowPreferences(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
    };
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    setPreferences(prefs);
    setHasConsented(true);
    setShowBanner(false);
    setShowPreferences(false);
    try {
      // Primary store
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));

      // DSGVO: Synchronize legacy consent store for AnalyticsService compatibility
      setLegacyConsentState({
        analytics: prefs.analytics,
        marketing: prefs.marketing,
      });

      // DSGVO Art. 7(1): Log consent event for audit trail
      logConsentEvent({
        necessary: true,
        analytics: prefs.analytics,
        marketing: prefs.marketing,
      });

      // Event dispatch for dynamically loaded scripts
      if (prefs.analytics) {
        window.dispatchEvent(new Event('cookies:analytics:accepted'));
      }
      if (prefs.marketing) {
        window.dispatchEvent(new Event('cookies:marketing:accepted'));
      }
    } catch {
      console.error("Could not save cookie preferences.");
    }
  }, []);

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
