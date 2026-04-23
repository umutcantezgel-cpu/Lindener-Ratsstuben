import React from 'react';
import PrintPage from './PrintPage';

export default function PhilosophyPage() {
  return (
    <PrintPage pageNum="I">
      <div style={{ maxWidth: '90%', margin: '0 auto', paddingTop: '40px' }}>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '24px', letterSpacing: '6px', marginBottom: '15px', textTransform: 'uppercase', textAlign: 'center' }}>Unsere Philosophie</h2>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '36px', fontStyle: 'italic', marginBottom: '40px', textAlign: 'center' }}>Tradition, Qualität & Handwerk</h3>
        


        <div style={{ padding: '40px 0', margin: '20px 0', textAlign: 'center', position: 'relative' }}>
          {/* Decorative Divider Top */}
          <svg style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L100 10L190 10" stroke="var(--gold)" strokeWidth="0.5"/>
            <rect x="95" y="5" width="10" height="10" transform="rotate(45 95 5)" fill="var(--gold)"/>
          </svg>

          <h4 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '32px', fontStyle: 'italic', marginBottom: '20px' }}>&quot;Man schmeckt, was man fühlt.&quot;</h4>
          <p className="cv-intro" style={{ fontSize: '15px', maxWidth: '80%', margin: '0 auto', lineHeight: '1.8', hyphens: 'none', wordBreak: 'normal' }}>
            Unser Anspruch ist es nicht bloß, den Hunger zu stillen. Wir möchten Erinnerungen kreieren. 
            Jedes Gericht auf dieser Karte ist das Resultat jahrelanger Perfektionierung, zahlloser Verkostungen 
            und der unerschütterlichen Überzeugung, dass wahre Gastronomie immer zuerst im Herzen stattfindet.
          </p>

          {/* Decorative Divider Bottom */}
          <svg style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L100 10L190 10" stroke="var(--gold)" strokeWidth="0.5"/>
            <rect x="95" y="5" width="10" height="10" transform="rotate(45 95 5)" fill="var(--gold)"/>
          </svg>
        </div>
      </div>
    </PrintPage>
  );
}
