import { Metadata } from 'next';
import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';
import MenuCover from './components/MenuCover';
import LunchMenu from './components/LunchMenu';


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
      <LunchMenu />


      <PrintPage pageNum="III">
        <DishCategory dropcap="A" title="Aperitif" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="aperitif" />
        </div>

        <DishCategory dropcap="S" title="Suppen" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="V" title="Vorspeisen" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="Auch als stilvolle Antipasti-Platten für mehrere Personen erhältlich. Pro Person 13,90 €" />
        </div>
        {/* SSOT-Fußnote wörtlich */}
        <div className="fn">Unsere Suppen &amp; Vorspeisen servieren wir Kostenlos Hausgemachtes Brot - auf Wunsch Pizzabrot Tomaten Soße &amp; Knoblauch 6,50€</div>
      </PrintPage>

      <PrintPage pageNum="IV">
        <DishCategory dropcap="S" title="Salate" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="salate" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Unsere Salate servieren wir Kostenlos Hausgemachtes Brot - auf Wunsch Pizzabrot Tomaten Soße &amp; Knoblauch 6,50€</div>

        <DishCategory dropcap="P" title="Pasta" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pasta" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.</div>

      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="A" title="Aus dem Ofen - Überbackenes" marginTop="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pasta-al-forno" />
        </div>

        <DishCategory dropcap="H" title="Hausgemachte Pasta" marginTop="15px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="hausgemachte-pasta" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.</div>

        <DishCategory dropcap="S" title="Schnitzelvariation" marginTop="15px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="schnitzel" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Bei unseren Schnitzeln handelt es sich um frischen Schweinerücken.</div>
      </PrintPage>

      <PrintPage pageNum="VI">
        <DishCategory dropcap="F" title="Fleischgerichte" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="fleisch-fisch" itemIds={['80','81','82','83','84','85']} />
        </div>

        <DishCategory dropcap="F" title="Fischgerichte" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="fleisch-fisch" itemIds={['86','87','88']} />
          <Quote text="Qualität ist niemals ein Zufall." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VII">
        <DishCategory dropcap="P" title="Pizza" subtitle="(∅ 28cm)" marginTop="5px" marginBottom="5px" />
        {/* SSOT-Kopftext Pizza wörtlich */}
        <div className="fn" style={{ marginBottom: '5px', fontStyle: 'italic' }}>alle Pizzen werden mit Tomaten soße mit Special würzen &amp; Käse zubereitet.</div>
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pizza" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px", whiteSpace: "pre-wrap", lineHeight: 1.4, fontSize: "10pt" }}>
          Extrabelege: <strong>Jeder Extrabelag – 1,00 €</strong>{"\n"}
          <strong>Mozzarella – 4,00 €</strong>{"\n"}
          <strong>Thunfisch – 4,00 €</strong>{"\n"}
          <strong>Lachsfilet – 6,00 €</strong>{"\n"}
          <strong>Garnelen – 6,00 €</strong>{"\n"}
          <strong>Burrata – 6,00 €</strong>
        </div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="F" title="Familienpizza" subtitle="ca. 40×60 cm" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="familienpizza" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px", whiteSpace: "pre-wrap", lineHeight: 1.4, fontSize: "10pt" }}>
          Extrabelege: <strong>Jeder Extrabelag – 4,00 €</strong>{"\n"}
          <strong>Mozzarella – 12,00 €</strong>{"\n"}
          <strong>Thunfisch – 12,00 €</strong>{"\n"}
          <strong>Lachsfilet – 16,00 €</strong>{"\n"}
          <strong>Garnelen – 16,00 €</strong>{"\n"}
          <strong>Burrata – 16,00 €</strong>
        </div>

        <DishCategory dropcap="K" title="Kindergerichte" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="kindergerichte" marginBottom="2px" />
        </div>

        <DishCategory dropcap="D" title="Dessert" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="dessert" marginBottom="2px" />
        </div>
      </PrintPage>

      <PrintPage pageNum="IX">
        <DishCategory dropcap="E" title="Erfrischungsgetränke" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="alkoholfreie-getraenke" marginBottom="2px" />
          <CategoryMapper categoryId="saefte" marginBottom="2px" />
        </div>
        <Quote text="Erfrischung pur für jeden Geschmack." />
      </PrintPage>

      <PrintPage pageNum="X">
        <DishCategory dropcap="B" title="Biere" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="biere" marginBottom="2px" />
        </div>

        <DishCategory dropcap="R" title="Rotweine" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="rotweine" marginBottom="2px" />
        </div>

        <DishCategory dropcap="W" title="Weißweine" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="weissweine" marginBottom="2px" />
        </div>
        <Quote text="Ein gutes Glas Wein ist ein Gedicht." />
      </PrintPage>

      <PrintPage pageNum="XI">
        <DishCategory dropcap="W" title="Warme Getränke" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="warme-getraenke" marginBottom="2px" />
        </div>

        <DishCategory dropcap="S" title="Spirituosen & Liköre" marginTop="15px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="spirituosen" marginBottom="2px" />
          <CategoryMapper categoryId="likoere" marginBottom="2px" />
        </div>

        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '30px'}}>
          <span style={{fontSize: '24px'}}>VIELEN DANK ◆ GUTEN APPETIT</span>
        </div>

        {/* Marketing Partner Logos – DIN A4 unten */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          padding: '0 5mm',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 0 50px 25px white',
            padding: '4mm 6mm',
            display: 'inline-block',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/marketing-logos.svg"
              alt="Marketing Partner Logos"
              style={{ width: '100%', maxWidth: '170mm', height: 'auto' }}
            />
          </div>
        </div>
      </PrintPage>

      <PrintPage pageNum="XII">
        <AllergenLegend />
      </PrintPage>
    </div>
  );
}
