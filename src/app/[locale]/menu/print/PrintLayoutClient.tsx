"use client";

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

export default function PrintLayoutClient() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Inject CSS to hide all layout elements
    const style = document.createElement('style');
    style.innerHTML = `
      header, footer, .floating-nav, .cookie-banner, .mobile-menu-drawer {
        display: none !important;
      }
      body {
        background: #888;
      }
    `;
    document.head.appendChild(style);

    // Ensure fonts are loaded before triggering any automatic print dialogs if we wanted to
    document.fonts.ready.then(() => {
        setFontsLoaded(true);
    });

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-action-bar">
      <p>
        <strong>Ansicht für Druck optimiert</strong><br />
        <span style={{ fontSize: '11px', opacity: 0.8 }}>Zweiseitigen Druck ohne Ränder empfehlen</span>
      </p>
      <button onClick={handlePrint} disabled={!fontsLoaded}>
        <Printer size={18} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} />
        {fontsLoaded ? 'Speisekarte drucken / PDF exportieren' : 'Lade Schriftarten...'}
      </button>
    </div>
  );
}
