"use client";

import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';

export default function SaisonalClient() {
    const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  useEffect(() => {
    // Warm up/preload fonts in the background if browser supports it
    if (document.fonts) {
      document.fonts.ready.catch(() => {});
    }

    const handleBeforePrint = () => {
      document.body.classList.add('is-printing');
    };

    const handleAfterPrint = () => {
      document.body.classList.remove('is-printing');
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('is-printing');
    };
  }, []);

  const handlePrint = () => {
    setIsPreparingPrint(true);

    // Give browser time to load high-resolution styles/layouts before printing
    setTimeout(() => {
      window.print();
      setIsPreparingPrint(false);
    }, 800);
  };

  return (
    <>
      <div className="print-action-bar">
        <p style={{ margin: 0, padding: 0 }}>
          <strong style={{ fontSize: '14px', color: 'var(--gold)' }}>Saisonkarte – Vorschau & Druck</strong><br />
          <span style={{ fontSize: '11px', opacity: 0.7 }}>DIN A4 Querformat (2x DIN A5 nebeneinander)</span>
        </p>
        <button 
          onClick={handlePrint} 
          disabled={isPreparingPrint}
        >
          <Printer size={16} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }} />
          {isPreparingPrint ? 'Druck wird vorbereitet...' : 'Drucken / PDF exportieren'}
        </button>
      </div>

      {isPreparingPrint && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-cinzel), serif',
          color: 'var(--gold, #c5a880)'
        }}>
          <div className="print-spinner" style={{
            width: '40px', height: '40px',
            border: '2px solid rgba(197, 168, 128, 0.2)',
            borderTop: '2px solid var(--gold, #c5a880)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '20px'
          }}></div>
          <h2 style={{
            fontSize: '18px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            margin: 0,
            color: 'var(--gold, #c5a880)'
          }}>
            Druck-Dialog wird geladen...
          </h2>
          <p style={{
            fontFamily: 'var(--font-montserrat), sans-serif',
            fontSize: '10px',
            letterSpacing: '1px',
            color: '#888',
            marginTop: '8px',
            textTransform: 'uppercase'
          }}>
            Bitte wählen Sie im Browser &quot;Als PDF speichern&quot;, Papierformat A4 und Ausrichtung Querformat aus.
          </p>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}} />
        </div>
      )}
    </>
  );
}

