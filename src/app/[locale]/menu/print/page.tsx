import { Metadata } from 'next';
import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';
import MenuCover from './components/MenuCover';


import PrintPage from './components/PrintPage';
import DishCategory from './components/DishCategory';
import Quote from './components/Quote';
import { CategoryMapper } from './components/CategoryMapper';
import AllergenLegend from './components/AllergenLegend';

export const metadata: Metadata = {
  title: 'Speisekarte Druckversion | Lindener Ratsstuben',
  description: 'Druckbare Speisekarte der Lindener Ratsstuben.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrintMenuPage() {
  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      <MenuCover />

      {/* ═══ SEITE III: Suppen & Vorspeisen ═══ */}
      <PrintPage pageNum="III">


        <DishCategory dropcap="S" title="Suppen" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="V" title="Vorspeisen" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="Auch als stilvolle Antipasti-Platten für mehrere Personen erhältlich. Pro Person 14,90 €." />
        </div>
      </PrintPage>

      {/* ═══ SEITE IV: Salate ═══ */}
      <PrintPage pageNum="IV">
        <DishCategory dropcap="S" title="Salate" marginTop="3px" marginBottom="3px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="salate" marginBottom="2px" />
          <Quote text="Knackig, frisch und gesund." />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "2px" }}>Zu unseren Suppen, Vorspeisen &amp; Salaten servieren wir kostenlos hausgemachtes Brot – auf Wunsch Pizzabrot mit Tomatensauce &amp; Knoblauch für 6,50 €.</div>
      </PrintPage>

      {/* ═══ SEITE V: Pasta ═══ */}
      <PrintPage pageNum="V">
        <DishCategory dropcap="P" title="Pasta" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta" itemIds={['40','41','42','43','44','45','46','47']} marginBottom="2px" />
        </div>
      </PrintPage>

      {/* ═══ SEITE VI: Aus dem Ofen + Hausgemachte Pasta ═══ */}
      <PrintPage pageNum="VI">
        <DishCategory dropcap="A" title="Aus dem Ofen - Überbackenes" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta-al-forno" marginBottom="2px" />
        </div>

        <DishCategory dropcap="H" title="Hausgemachte Pasta" marginTop="3px" marginBottom="3px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="hausgemachte-pasta" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "2px" }}>Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.</div>
      </PrintPage>

      {/* ═══ SEITE VII: Schnitzel ═══ */}
      <PrintPage pageNum="VII">
        <DishCategory dropcap="S" title="Schnitzelvariation" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="schnitzel" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "2px", marginBottom: "15px" }}>Bei unseren Schnitzeln handelt es sich um frischen Schweinerücken.</div>
      </PrintPage>

      {/* ═══ SEITE VIII: Fleisch- & Fischgerichte ═══ */}
      <PrintPage pageNum="VIII">
        <DishCategory dropcap="F" title="Fleischgerichte" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="fleisch-fisch" itemIds={['70','71','72','73','74','75']} />
        </div>

        <DishCategory dropcap="F" title="Fischgerichte" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="fleisch-fisch" itemIds={['80','81','82']} />
          <Quote text="Frischer Fisch – Qualität, die man schmeckt." />
        </div>
      </PrintPage>

      {/* ═══ SEITE IX: Pizza 1 ═══ */}
      <PrintPage pageNum="IX">
        <DishCategory dropcap="P" title="Pizza" subtitle="(∅ 28cm)" marginTop="5px" marginBottom="5px" />
        <div className="fn" style={{ marginBottom: '8px', fontStyle: 'italic', fontSize: '12pt', fontWeight: 600, color: 'var(--brand-red, #d32f2f)', textAlign: 'center' }}>Alle Pizzen werden mit Tomatensoße, Special-Würzen &amp; Käse zubereitet.</div>
        <div className="cat-grid">
          <CategoryMapper categoryId="pizza" itemIds={['90','91','92','93','94','95','96','97','98','99','100','101','102']} marginBottom="2px" />
        </div>
      </PrintPage>

      {/* ═══ SEITE X: Pizza 2 + Familienpizza ═══ */}
      <PrintPage pageNum="X">
        <DishCategory dropcap="P" title="Pizza" subtitle="(Fortsetzung)" marginTop="3px" marginBottom="3px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pizza" itemIds={['103','105','106']} marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px", whiteSpace: "pre-wrap", lineHeight: 1.4, fontSize: "10pt" }}>
          Extrabeläge: <strong>Jeder Extrabelag – 1,00 €</strong>{"\n"}
          <strong>Mozzarella – 4,00 €</strong>{"\n"}
          <strong>Thunfisch – 4,00 €</strong>{"\n"}
          <strong>Lachsfilet – 6,00 €</strong>{"\n"}
          <strong>Garnelen – 6,00 €</strong>{"\n"}
          <strong>Burrata – 6,00 €</strong>
        </div>

        <DishCategory dropcap="F" title="Familienpizza" subtitle="ca. 40×60 cm" marginTop="3px" marginBottom="3px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="familienpizza" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px", marginBottom: "15px", fontSize: "9pt", lineHeight: 1.3 }}>
          Extrabeläge Familienpizza: <strong>Jeder Extrabelag – 4,00 €</strong> · <strong>Mozzarella – 12,00 €</strong> · <strong>Thunfisch – 12,00 €</strong> · <strong>Lachsfilet – 16,00 €</strong> · <strong>Garnelen – 16,00 €</strong> · <strong>Burrata – 16,00 €</strong>
        </div>
      </PrintPage>

      {/* ═══ SEITE XI: Kindergerichte + Dessert ═══ */}
      <PrintPage pageNum="XI">
        <DishCategory dropcap="K" title="Kindergerichte" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="kindergerichte" marginBottom="2px" />
        </div>

        <DishCategory dropcap="D" title="Dessert" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="dessert" marginBottom="2px" />
        </div>
      </PrintPage>

      {/* ═══ SEITE XII: Allergenlegende + Marketing Logos ═══ */}
      <PrintPage pageNum="XII">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100%',
          textAlign: 'center',
          gap: '0',
        }}>
          {/* Abschluss-Banner */}
          <div style={{
            marginTop: '8px',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: '18px',
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '4px',
              color: 'var(--brand-red)',
              fontWeight: 700,
            }}>
              VIELEN DANK ◆ GUTEN APPETIT
            </span>
          </div>

          {/* Marketing Partner Logos */}
          <div style={{
            textAlign: 'center',
            padding: '0 10mm',
            marginBottom: '16px',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/marketing-logos.svg"
              alt="Marketing Partner Logos"
              style={{ width: '100%', maxWidth: '120mm', height: 'auto' }}
            />
          </div>

          {/* Dekorativer Trenner */}
          <div style={{
            width: '60%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--gold), var(--brand-red), var(--gold), transparent)',
            marginBottom: '16px',
          }} />

          {/* Allergenlegende */}
          <div style={{ width: '100%' }}>
            <AllergenLegend />
          </div>
        </div>
      </PrintPage>
    </div>
  );
}
