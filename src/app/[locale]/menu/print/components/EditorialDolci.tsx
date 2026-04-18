import React from 'react';
import PrintPage from './PrintPage';
import DishItem from './DishItem';

export default function EditorialDolci({ pageNum }: { pageNum: string }) {
  return (
    <PrintPage pageNum={pageNum}>
      <div style={{ maxWidth: '90%', margin: '0 auto', paddingTop: '20px', position: 'relative' }}>
        
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '20px', letterSpacing: '8px', marginBottom: '10px', textTransform: 'uppercase' }}>Il Finale</h2>
          <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '48px', fontStyle: 'italic', margin: '0', lineHeight: '1.2' }}>Dolci e Caffè</h3>
          <div style={{ margin: '20px auto 0', width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
        </div>

        <p className="cv-intro" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.7', marginBottom: '30px', padding: '0 20px' }}>
          Jedes großartige Menü verdient einen krönenden Abschluss. Von klassischem Tiramisu nach Familienrezeptur bis hin zum authentischen italienischen Espresso – lassen Sie sich verführen.
        </p>

        {/* Dolci Items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '30px' }}>
          <DishItem id="130" name="TIRAMISU (HAUSGEMACHT)" price="6,00 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Das ikonische Dessert Italiens. Löffelbiskuit, umhüllt von edlem Espresso, geschichtet mit einer samtigen Mascarpone-Creme und fein bestäubt mit dunklem Kakao." marginBottom="0" />
          
          <DishItem id="131" name="PANNA COTTA" price="5,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Ein zartschmelzender Traum aus Sahne und echter Vanille, abgerundet mit einer fruchtigen, hausgemachten Erdbeer-Coulis." marginBottom="0" />

          <DishItem id="132" name="WARMER APFELSTRUDEL" price="6,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Ofenwarmer Strudel, reichhaltig gefüllt mit Äpfeln, Zimt und Rosinen, serviert mit Bourbon-Vanilleeis und frischer Sahne." marginBottom="0" />

          <DishItem id="133" name="TARTUFO EIS" price="5,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.6' }} desc="Authentische italienische Eisspezialität. Feines Zabaione- und Schokoladeneis, veredelt mit einem aromatischen Schokoladenkern." marginBottom="0" />
        </div>

        {/* Caffè & Digestif Highlight */}
        <div style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--gold)', padding: '30px', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--paper)', padding: '0 10px', fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', letterSpacing: '4px', fontSize: '14px' }}>CAFFÈ & DIGESTIF</div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', marginBottom: '5px' }}>ESPRESSO</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', color: 'var(--gold)' }}>2,50 €</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', marginBottom: '5px' }}>CAPPUCCINO</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', color: 'var(--gold)' }}>3,50 €</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', marginBottom: '5px' }}>LATTE MACCHIATO</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', color: 'var(--gold)' }}>4,00 €</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', marginBottom: '5px' }}>GRAPPA BIANCA/SCURA</div>
              <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: '18px', color: 'var(--gold)' }}>4,50 €</div>
            </div>
          </div>
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '20px'}}>
          <span style={{fontSize: '24px'}}>GRAZIE ◆ BUON APPETITO</span>
        </div>
        
      </div>
    </PrintPage>
  );
}
