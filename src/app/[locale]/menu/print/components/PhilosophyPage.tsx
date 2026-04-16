import React from 'react';
import PrintPage from './PrintPage';

export default function PhilosophyPage() {
  return (
    <PrintPage pageNum="II">
      <div style={{ maxWidth: '85%', margin: '0 auto', paddingTop: '60px' }}>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '24px', letterSpacing: '6px', marginBottom: '20px', textTransform: 'uppercase', textAlign: 'center' }}>Unsere Philosophie</h2>
        <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '36px', fontStyle: 'italic', marginBottom: '70px', textAlign: 'center' }}>Tradition, Qualität & Handwerk</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '60px' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--ink)', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>Echtes Handwerk</h4>
            <p className="cv-intro" style={{ fontSize: '15px', lineHeight: '1.7', textAlign: 'justify' }}>
              Jeder Tag in unserer Küche beginnt lange bevor der erste Gast Platz nimmt. Unsere Teige ruhen über 48 Stunden, um jene einzigartige Leichtigkeit und Bekömmlichkeit zu entfalten, die den Unterschied zwischen gut und exzellent ausmacht. Industrielle Abkürzungen existieren in unserer Welt nicht. Wir setzen auf Geduld und handwerkliche Präzision.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--ink)', fontSize: '18px', letterSpacing: '2px', marginBottom: '20px' }}>Die Zutaten</h4>
            <p className="cv-intro" style={{ fontSize: '15px', lineHeight: '1.7', textAlign: 'justify' }}>
              Ein Gericht ist immer nur so herausragend wie seine einfachste Zutat. Wir importieren unser natives Olivenöl extra aus den sonnenverwöhnten Hainen Italiens, beziehen unser Fleisch von regionalen Meisterbetrieben und ernten Kräuter, deren ätherische Öle unsere Saucen nicht nur würzen, sondern lebendig machen.
            </p>
          </div>
        </div>

        <div style={{ padding: '60px 0', margin: '40px 0', textAlign: 'center', position: 'relative' }}>
          {/* Decorative Divider Top */}
          <svg style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L100 10L190 10" stroke="var(--gold)" strokeWidth="0.5"/>
            <rect x="95" y="5" width="10" height="10" transform="rotate(45 95 5)" fill="var(--gold)"/>
          </svg>

          <h4 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '32px', fontStyle: 'italic', marginBottom: '20px' }}>"Man schmeckt, was man fühlt."</h4>
          <p className="cv-intro" style={{ fontSize: '15px', maxWidth: '80%', margin: '0 auto', lineHeight: '1.8' }}>
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
