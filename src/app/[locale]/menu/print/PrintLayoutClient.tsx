"use client";

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

export default function PrintLayoutClient() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  useEffect(() => {
    // Inject CSS to hide all layout elements
    const style = document.createElement('style');
    style.innerHTML = `
      header, footer, .floating-nav, .cookie-banner, .mobile-menu-drawer {
        display: none !important;
      }
      body {
        background: #111;
      }
    `;
    document.head.appendChild(style);

    // Ensure fonts are loaded
    document.fonts.ready.then(() => {
        setFontsLoaded(true);
    });

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    setIsPreparingPrint(true);
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
        <button onClick={handlePrint} disabled={!fontsLoaded || isPreparingPrint}>
          <Printer size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
          {fontsLoaded ? (isPreparingPrint ? 'Bereite Druck vor...' : 'Speisekarte drucken / PDF exportieren') : 'Lade Schriftarten...'}
        </button>
      </div>

      {isPreparingPrint && (
        <div style={{
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
