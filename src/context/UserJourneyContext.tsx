"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type PrimaryInterest = 'kultur' | 'natur' | 'kulinarik' | 'business' | 'romantik' | 'familie' | 'general';

export interface UserJourneyState {
  entryPoint: string | null;
  primaryInterest: PrimaryInterest;
  engagementScore: number; // 0 to 100
  regionalFocus: string | null; // e.g. "Linden", "Linden"
}

interface UserJourneyContextType {
  state: UserJourneyState;
  logInteraction: (interest: PrimaryInterest, intensity: number) => void;
  setRegionalFocus: (city: string) => void;
  setEntryPoint: (path: string) => void;
}

const defaultState: UserJourneyState = {
  entryPoint: null,
  primaryInterest: 'general',
  engagementScore: 0,
  regionalFocus: null,
};

const UserJourneyContext = createContext<UserJourneyContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'nexus_journey_state';

export const UserJourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UserJourneyState>(defaultState);

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      let initialState = defaultState;
      
      if (stored) {
        initialState = JSON.parse(stored);
      }

      // Check URL parameters for overrides
      const searchParams = new URLSearchParams(window.location.search);
      const urlSegment = searchParams.get('segment') as PrimaryInterest;
      const urlRegion = searchParams.get('region');
      
      const validSegments: PrimaryInterest[] = ['kultur', 'natur', 'kulinarik', 'business', 'romantik', 'familie', 'general'];
      
      if (urlSegment && validSegments.includes(urlSegment)) {
        initialState.primaryInterest = urlSegment;
        initialState.entryPoint = window.location.pathname + window.location.search;
      }
      if (urlRegion) {
        initialState.regionalFocus = urlRegion;
      }

      setState(initialState);
      
      // Look at referrer if no segment in URL and no heavy engagement yet
      if (!urlSegment && initialState.engagementScore < 10) {
        const referrer = document.referrer.toLowerCase();
        if (referrer.includes('business') || referrer.includes('linkedin') || referrer.includes('xing')) {
          initialState.primaryInterest = 'business';
        } else if (referrer.includes('urlaub') || referrer.includes('wander') || referrer.includes('komoot')) {
          initialState.primaryInterest = 'natur';
        } else if (referrer.includes('kultur') || referrer.includes('museum') || referrer.includes('theater')) {
          initialState.primaryInterest = 'kultur';
        } else if (referrer.includes('hochzeit') || referrer.includes('valentins') || referrer.includes('romantik')) {
          initialState.primaryInterest = 'romantik';
        }
        setState({...initialState});
      }
      
    } catch {
      console.warn('Could not access localStorage for journey tracking.');
    }
  }, []);

  // Sync state to local storage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore
    }
  }, [state]);

  const logInteraction = (interest: PrimaryInterest, intensity: number) => {
    setState(prev => {
      // Very simple heuristic: if they engage heavily, shift the primary interest
      const newScore = Math.min(100, prev.engagementScore + intensity);
      // If intensity > 10, assume they are actively reading about this topic
      const newInterest = intensity > 5 ? interest : prev.primaryInterest;
      
      return {
        ...prev,
        engagementScore: newScore,
        primaryInterest: newInterest !== 'general' ? newInterest : prev.primaryInterest
      };
    });
  };

  const setRegionalFocus = (city: string) => {
    setState(prev => ({ ...prev, regionalFocus: city }));
  };

  const setEntryPoint = (path: string) => {
    setState(prev => {
      if (prev.entryPoint) return prev; // Only set once
      return { ...prev, entryPoint: path };
    });
  };

  return (
    <UserJourneyContext.Provider value={{ state, logInteraction, setRegionalFocus, setEntryPoint }}>
      {children}
    </UserJourneyContext.Provider>
  );
};

export const useUserJourney = () => {
  const context = useContext(UserJourneyContext);
  if (context === undefined) {
    throw new Error('useUserJourney must be used within a UserJourneyProvider');
  }
  return context;
};
