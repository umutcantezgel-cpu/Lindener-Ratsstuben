"use client";

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

export default function PrintLayoutClient() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  useEffect(() => {
    // Inject CSS to hide ALL global layout & floating UI elements
    // This isolates the print route from the parent [locale]/layout.tsx
    const style = document.createElement('style');
    style.innerHTML = `
      /* === PHASE 1: Global UI Isolation === */
      /* Layout shells */
      header, footer, .floating-nav, .cookie-banner, .mobile-menu-drawer { display: none !important; }
      /* FloatingReservationCTA (fixed bottom-6 right-6 z-50) */
      [aria-label="Zum Anfang springen"],
      div[class*="z-50"][class*="fixed"][class*="bottom-"] { display: none !important; }
      /* BackToTop (fixed bottom-6 left-6 z-40) */
      button[class*="z-40"][class*="fixed"][class*="bottom-"] { display: none !important; }
      /* ExitIntentOverlay (fixed inset-0 z-[100]) — PRIMARY BLACK SCREEN CAUSE */
      div[class*="z-"][class*="fixed"][class*="inset-0"] { display: none !important; }
      /* CookieConsentBanner, ToastContainer, StickyCtaBar */
      div[class*="z-toast"], div[class*="cookie-consent"],
      div[class*="z-\\[9999\\]"][class*="fixed"] { display: none !important; }
      /* ScrollProgress bar */
      div[class*="ScrollProgress"] { display: none !important; }
      /* OfflineBanner, RouteChangeIndicator */
      div[class*="bg-paper-texture"] { display: none !important; }

      /* === Body background for elegant preview === */
      body {
        background: #555 !important;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);

    // Ensure fonts are loaded
    document.fonts.ready.then(() => {
        setFontsLoaded(true);
    });

    // Intersection Observer for Entrance Animations (Awwwards-Level Polish)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    });

    // Timeout ensures DOM is fully painted statically before querying
    setTimeout(() => {
      const pages = document.querySelectorAll('.page, .page-cover');
      pages.forEach(page => observer.observe(page));
    }, 100);

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  const handlePrint = () => {
    setIsPreparingPrint(true);

    // PHASE 2: Force ALL pages visible before printing
    // Pages not yet scrolled into view have opacity: 0 via IntersectionObserver
    // This guarantees no blank/black pages in the print output
    const allPages = document.querySelectorAll('.page, .page-cover');
    allPages.forEach(page => page.classList.add('is-visible'));

    setTimeout(() => {
      window.print();
      setIsPreparingPrint(false);
    }, 1500);
  };

  return (
    <>
      <div className="print-action-bar">
        <p>
          <strong>Ansicht für Druck optimiert</strong><br />
          <span style={{ fontSize: '11px', opacity: 0.8 }}>Zweiseitigen Druck ohne Ränder empfehlen</span>
        </p>
        <button id="auto-print-btn" onClick={handlePrint} disabled={!fontsLoaded || isPreparingPrint}>
          <Printer size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
          {fontsLoaded ? (isPreparingPrint ? 'Bereite Druck vor...' : 'Speisekarte drucken / PDF exportieren') : 'Lade Schriftarten...'}
        </button>
      </div>

      {isPreparingPrint && (
        <div className="print-loader-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: '#111',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-cinzel), serif',
          color: 'var(--gold)'
        }}>
          <div className="loader-spinner" style={{
            width: '50px', height: '50px',
            border: '2px solid rgba(197, 168, 128, 0.2)',
            borderTop: '2px solid var(--gold)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '30px'
          }}></div>
          <h2 style={{ fontSize: '24px', letterSpacing: '4px', textTransform: 'uppercase', background: 'linear-gradient(110deg, var(--gold-deep) 0%, var(--gold) 40%, #fffda0 50%, var(--gold) 60%, var(--gold-deep) 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', animation: 'shimmerGold 3s infinite linear' }}>
            Preparing Exclusive Menu
          </h2>
          <p style={{ fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '12px', letterSpacing: '2px', color: 'var(--ink-faint)', marginTop: '10px', textTransform: 'uppercase' }}>
            For High-Resolution Print
          </p>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}} />
        </div>
      )}
    </>
  );
}
