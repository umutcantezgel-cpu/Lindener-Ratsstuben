import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';
import MenuCover from './components/MenuCover';
import LunchMenu from './components/LunchMenu';


import PrintPage from './components/PrintPage';
import DishCategory from './components/DishCategory';
import Quote from './components/Quote';
import { CategoryMapper } from './components/CategoryMapper';

export default function PrintMenuPage() {
  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      <MenuCover />
      <LunchMenu />


      <PrintPage pageNum="III">
        <h1 className="page-heading">Aperitif</h1>
        <DishCategory dropcap="S" title="Suppen" marginTop="10px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="V" title="Vorspeisen" marginTop="10px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="Kochen ist ein Akt der Liebe" />
        </div>
        {/* SSOT-Fußnote wörtlich */}
        <div className="fn">Unsere Suppen &amp; Vorspeisen servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße &amp; Knoblauch 6,50€</div>
      </PrintPage>

      <PrintPage pageNum="IV">
        <DishCategory dropcap="S" title="Salate" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="salate" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Unsere Salate servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße &amp; Knoblauch 6,50€</div>

        <DishCategory dropcap="P" title="Pasta" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pasta" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.</div>

      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="P" title="Pasta al Forno" marginTop="5px" />
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
          <CategoryMapper categoryId="fleisch-fisch" itemIds={['86','87']} />
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
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Jeder extra Belag kostet 1,00 / 4,00 / 6,00 €</div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="F" title="Familienpizza" subtitle="ca. 40×60 cm" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="familienpizza" marginBottom="2px" />
        </div>

        <DishCategory dropcap="K" title="Kindergerichte" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="kindergerichte" marginBottom="2px" />
        </div>

        <DishCategory dropcap="D" title="Dessert" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="dessert" marginBottom="2px" />
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '15px'}}>
          <span style={{fontSize: '24px'}}>VIELEN DANK ◆ GUTEN APPETIT</span>
        </div>
      </PrintPage>
    </div>
  );
}
