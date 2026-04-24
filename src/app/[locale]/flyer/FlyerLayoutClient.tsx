"use client";

import { useEffect } from 'react';

export default function FlyerLayoutClient() {
  useEffect(() => {
    // Inject CSS to hide ALL global layout & floating UI elements
    // This isolates the flyer route from the parent [locale]/layout.tsx
    const style = document.createElement('style');
    style.innerHTML = `
      /* === Global UI Isolation for Flyer === */
      /* Layout shells */
      header, footer, nav, .floating-nav, .cookie-banner, .mobile-menu-drawer { display: none !important; }
      /* FloatingReservationCTA */
      [aria-label="Zum Anfang springen"],
      div[class*="z-50"][class*="fixed"][class*="bottom-"] { display: none !important; }
      /* BackToTop */
      button[class*="z-40"][class*="fixed"][class*="bottom-"] { display: none !important; }
      /* ExitIntentOverlay (fixed inset-0 z-[100]) — KILLS THE MODAL */
      div[class*="z-"][class*="fixed"][class*="inset-0"] { display: none !important; }
      /* CookieConsentBanner, ToastContainer */
      div[class*="z-toast"], div[class*="cookie-consent"],
      div[class*="z-\\[9999\\]"][class*="fixed"] { display: none !important; }
      /* ScrollProgress bar */
      div[class*="ScrollProgress"] { display: none !important; }
      /* OfflineBanner, paper texture background */
      div[class*="bg-paper-texture"] { display: none !important; }
      /* Remove the flex-grow main wrapper padding */
      main#main-content { padding: 0 !important; margin: 0 !important; }
      /* Kill the parent antialiased wrapper's min-h-screen */
      .antialiased { min-height: auto !important; }

      /* === Body background for print preview === */
      body {
        background: #555 !important;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
