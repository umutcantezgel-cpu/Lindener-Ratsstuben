import React from 'react';
import PrintPage from './PrintPage';
import DishItem from './DishItem';
import Quote from './Quote';

export default function EditorialWines({ pageNum }: { pageNum: string }) {
  return (
    <PrintPage pageNum={pageNum}>
      <div style={{ maxWidth: '90%', margin: '0 auto', paddingTop: '30px', position: 'relative' }}>
        
        {/* Editorial Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--gold)', fontSize: '20px', letterSpacing: '8px', marginBottom: '10px', textTransform: 'uppercase' }}>Il Vino</h2>
          <h3 style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink)', fontSize: '48px', fontStyle: 'italic', margin: '0', lineHeight: '1.2' }}>Regionale Weine</h3>
          <div style={{ margin: '20px auto 0', width: '40px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
        </div>

        <p className="cv-intro" style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.7', marginBottom: '40px', padding: '0 20px' }}>
          Ein gutes Essen ohne Wein ist wie ein Tag ohne Sonnenschein. Entdecken Sie unsere handverlesene Selektion von regionalen Winzern Italiens, sorgfältig ausgewählt, um die Aromen unserer Küche perfekt zu ergänzen.
        </p>

        {/* Vini Bianchi */}
        <h4 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--ink)', fontSize: '18px', letterSpacing: '3px', marginBottom: '20px', borderBottom: '1px solid var(--ink-faint)', paddingBottom: '10px' }}>Vini Bianchi — Weißweine</h4>
        <div style={{ marginBottom: '30px' }}>
          <DishItem id="W1" name="PINOT GRIGIO DOC (Veneto)" price="5,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Trocken, feinfruchtig, mit einer eleganten Apfelnoten. Perfekt zu Salaten und Geflügel. (0,2l)" marginBottom="15px" />
          <DishItem id="W2" name="CHARDONNAY IGT (Puglia)" price="6,00 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Florales Bouquet, vollmundig und harmonisch. Ideal zu hellen Soßen und Edelfisch. (0,2l)" marginBottom="15px" />
          <DishItem id="W3" name="LUGANA DOC (Lombardia)" price="7,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Filigran, mineralisch und frisch mit Anklängen von Pfirsich und Mandel. (0,2l)" marginBottom="0" />
        </div>

        {/* Vini Rossi */}
        <h4 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--ink)', fontSize: '18px', letterSpacing: '3px', marginBottom: '20px', borderBottom: '1px solid var(--ink-faint)', paddingBottom: '10px' }}>Vini Rossi — Rotweine</h4>
        <div style={{ marginBottom: '30px' }}>
          <DishItem id="W4" name="MONTEPULCIANO D'ABRUZZO DOC" price="5,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Trocken, rubinrot, milde Tannine mit intensiven Noten von roter Kirsche. (0,2l)" marginBottom="15px" />
          <DishItem id="W5" name="PRIMITIVO DI MANDURIA DOC" price="7,00 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Samtig, üppig und warmkirschig. Ein kräftiger Begleiter zu gegrilltem Fleisch und Pasta al Forno. (0,2l)" marginBottom="15px" />
          <DishItem id="W6" name="CHIANTI DOCG (Toscana)" price="6,50 €" descStyle={{ fontSize: '14px', lineHeight: '1.5' }} desc="Klassisch trocken, gut strukturiert mit Noten von wilden Beeren. (0,2l)" marginBottom="0" />
        </div>

        <div style={{ textAlign: 'center' }}>
          <Quote text="Il vino è poesia imbottigliata" marginTop="20px" />
        </div>
        
      </div>
    </PrintPage>
  );
}
