import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';
import MenuCover from './components/MenuCover';
import ChefsLetter from './components/ChefsLetter';
import PhilosophyPage from './components/PhilosophyPage';
import TableOfContents from './components/TableOfContents';

import PrintPage from './components/PrintPage';
import DishCategory from './components/DishCategory';
import Quote from './components/Quote';
import AllergenLegend from './components/AllergenLegend';
import { CategoryMapper } from './components/CategoryMapper';

export default function PrintMenuPage() {
  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      <MenuCover />
      <ChefsLetter />
      <PhilosophyPage />
      <TableOfContents />

      <PrintPage pageNum="IV">
        <DishCategory dropcap="S" title="Suppen" marginTop="10px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="V" title="Vorspeisen" marginTop="10px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="Kochen ist ein Akt der Liebe" />
        </div>
        <div className="fn">Alle Suppen und Vorspeisen servieren wir mit hausgemachtem Brot. Auf Wunsch Pizzabrot.</div>
      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="S" title="Salate" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="salate" marginBottom="2px" />
        </div>

        <DishCategory dropcap="P" title="Pasta" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pasta" marginBottom="2px" />
        </div>
        <div className="fn" style={{ position: "relative", zIndex: 10, marginTop: "5px" }}>Pasta Gerichte werden auf Anfrage auch vegan serviert, bitte sprechen Sie dafür mit einer Servicekraft.</div>
      </PrintPage>

      {/* Page VI: Überbackenes + Hausgemachte Nudeln + Schnitzel (fusioniert) */}
      <PrintPage pageNum="VI">
        <DishCategory dropcap="Ü" title="Überbackenes" marginTop="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pasta-al-forno" />
        </div>

        <DishCategory dropcap="H" title="Hausgemachte Nudeln" marginTop="15px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="hausgemachte-pasta" />
        </div>

        <DishCategory dropcap="S" title="Schnitzel Variationen" marginTop="15px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="schnitzel" />
        </div>
        <div className="fn" style={{ marginTop: '5px' }}>Unsere Schnitzel sind frisch vom Schweinerücken. Alle Schnitzelgerichte servieren wir wahlweise mit Pommes Frites, Kroketten oder Nudeln.</div>
      </PrintPage>

      <PrintPage pageNum="VII">
        <DishCategory dropcap="F" title="Fleisch &amp; Fisch" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="fleisch-fisch" />
          <Quote text="Qualität ist niemals ein Zufall." />
        </div>
        <div className="fn" style={{ marginTop: '5px' }}>Alle Fleisch- und Fischgerichte servieren wir mit Gemüse der Saison und Gourmet-Kartoffeln (Rosmarin-Drillinge) als Beilage. Zu Calamari Fritti reichen wir einen Beilagensalat.</div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="P" title="Pizza" subtitle="(∅ 28cm)" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="pizza" marginBottom="2px" />
        </div>
        <div className="fn" style={{ marginTop: '5px' }}>Alle Pizzen werden mit Tomatensoße, Gewürzen &amp; Käse belegt. Jeder Extra Belag kostet 1,00 € / 4,00 € / 6,00 €.</div>
      </PrintPage>

      <PrintPage pageNum="IX">
        <DishCategory dropcap="F" title="Familienpizza" subtitle="ca. 40×60 cm" marginTop="5px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="familienpizza" marginBottom="2px" />
        </div>

        <DishCategory dropcap="K" title="Kindergerichte" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="kindergerichte" marginBottom="2px" />
        </div>

        <DishCategory dropcap="D" title="Desserts" marginTop="10px" marginBottom="5px" />
        <div className="cat-grid" style={{ columnGap: '8mm' }}>
          <CategoryMapper categoryId="dessert" marginBottom="2px" />
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '15px'}}>
          <span style={{fontSize: '24px'}}>VIELEN DANK ◆ GUTEN APPETIT</span>
        </div>
      </PrintPage>

      <PrintPage pageNum="X">
        <AllergenLegend style={{ marginTop: '20px', border: '1px solid var(--gold-primary)' }} />
      </PrintPage>
    </div>
  );
}
