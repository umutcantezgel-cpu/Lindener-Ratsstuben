'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error System:', error);
  }, [error]);

  return (
    <html lang="de">
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#FCFAF8',
          color: '#1a1a1a'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#8B0000' }}>Kritischer Systemfehler</h1>
          <p style={{ maxWidth: '600px', lineHeight: '1.5', marginBottom: '2rem' }}>
            Die Applikation konnte nicht korrekt gestartet werden. Das Problem wurde protokolliert und wir arbeiten an einer Lösung.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => reset()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#8B0000',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Erneut versuchen
            </button>
            <a 
              href="mailto:kontakt@lindener-ratsstuben.de"
              style={{
                padding: '12px 24px',
                backgroundColor: '#eee',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Support kontaktieren
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
