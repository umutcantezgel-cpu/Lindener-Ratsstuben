"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface AppContextType {
  isMobileNavOpen: boolean;
  toggleMobileNav: () => void;
  viewport: "mobile" | "tablet" | "desktop";
  scrollY: number;
  isScrolledPast: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [scrollY, setScrollY] = useState(0);
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewport("mobile");
      } else if (width < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
        // Auto-close mobile nav on desktop
        setIsMobileNavOpen(false);
      }
    };

    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let throttleTimer: ReturnType<typeof setTimeout> | null = null;
    
    const handleScroll = () => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        const y = window.scrollY;
        setScrollY(y);
        setIsScrolledPast(y > 100);
        throttleTimer = null;
      }, 50);
    };

    // Run once on mount
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen((prev) => !prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isMobileNavOpen,
        toggleMobileNav,
        viewport,
        scrollY,
        isScrolledPast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
