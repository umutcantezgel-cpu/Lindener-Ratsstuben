"use client";

import { useEffect } from 'react';
import { useUserJourney, PrimaryInterest } from '@/context/UserJourneyContext';

interface RegionalJourneyTrackerProps {
  category: string;
  regionalFocus: string | undefined;
}

function mapCategoryToInterest(category: string): PrimaryInterest {
  const norm = category.toLowerCase();
  if (norm.includes('kultur') || norm.includes('museum') || norm.includes('sehensw')) return 'kultur';
  if (norm.includes('natur') || norm.includes('wandern') || norm.includes('ausflug') || norm.includes('see')) return 'natur';
  if (norm.includes('essen') || norm.includes('kulinarik') || norm.includes('genuss')) return 'kulinarik';
  if (norm.includes('business') || norm.includes('messe') || norm.includes('hotel')) return 'business';
  if (norm.includes('romantik') || norm.includes('liebe') || norm.includes('paar') || norm.includes('date')) return 'romantik';
  if (norm.includes('familie') || norm.includes('kinder') || norm.includes('spielplatz') || norm.includes('tierpark')) return 'familie';
  return 'general';
}

export function RegionalJourneyTracker({ category, regionalFocus }: RegionalJourneyTrackerProps) {
  const { logInteraction, setRegionalFocus, setEntryPoint } = useUserJourney();

  useEffect(() => {
    // Determine user interest segment based on category
    const interest = mapCategoryToInterest(category);

    // Give them a heavy intensity score because they opened a dedicated landing page
    logInteraction(interest, 20);

    if (regionalFocus) {
      setRegionalFocus(regionalFocus);
    }

    if (typeof window !== 'undefined') {
      setEntryPoint(window.location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, regionalFocus]);

  // It's a behavioral tracker, it renders nothing
  return null;
}
