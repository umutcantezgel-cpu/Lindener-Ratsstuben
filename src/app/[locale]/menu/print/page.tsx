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
        <DishCategory dropcap="S" title="Suppen" marginTop="20px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="V" title="Vorspeisen" marginTop="20px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="Kochen ist ein Akt der Liebe" />
        </div>
        <div className="fn">Alle Suppen und Vorspeisen servieren wir mit ofenfrischem Pizzabrot.</div>
      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="S" title="Salate" />
        <div className="cat-grid">
          <CategoryMapper categoryId="salate" />
        </div>
        <div className="fn" style={{marginBottom: "20px"}}>Alle großen Salate servieren wir mit ofenfrischem Pizzabrot und unserem Balsamico-Joghurt Dressing.</div>
        
        <div className="box">
          <div className="box-t">ALLERGEN-KENNZEICHNUNG (EU-VO 1169/2011)</div>
          <div className="box-c">
            A) Glutenhaltiges Getreide • B) Krebstiere • C) Eier • D) Fische • E) Erdnüsse • F) Sojabohnen • G) Milch (inkl. Laktose)<br/>
            H) Schalenfrüchte • L) Sellerie • M) Senf • N) Sesamsamen • O) Sulfite • P) Lupinen • R) Weichtiere
          </div>
          <div className="box-t" style={{marginTop: "8px"}}>ZUSATZSTOFFE</div>
          <div className="box-c">
            1) Farbstoff • 2) Konservierungsstoff • 3) Antioxidationsmittel • 4) Geschmacksverstärker • 5) Geschwefelt<br/>
            6) Geschwärzt • 7) Phosphat • 8) Süßungsmittel • 9) Phenylalaninquelle • 10) Koffeinhaltig
          </div>
        </div>
      </PrintPage>

      <PrintPage pageNum="VI">
        <DishCategory dropcap="T" title="Traditionell" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta" />
          <Quote text="Das Geheimnis einer guten Küche..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VII">
        <DishCategory dropcap="Ü" title="Überbackenes" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta-al-forno" />
        </div>

        <DishCategory dropcap="H" title="Hausgemacht" marginTop="30px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="hausgemachte-pasta" />
          <Quote text="Hausgemachte Pasta mit Liebe..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="S" title="Schnitzel (Schweinerücken)" />
        <div className="cat-grid">
          <CategoryMapper categoryId="schnitzel" />
          <div className="fn">Alle Schnitzelgerichte servieren wir wahlweise mit Pommes Frites, Kroketten oder Nudeln.</div>
        </div>
      </PrintPage>

      <PrintPage pageNum="IX">
        <DishCategory dropcap="F" title="Fleisch & Fisch" />
        <div className="cat-grid">
          <CategoryMapper categoryId="fleisch-fisch" />
          <Quote text="Qualität ist niemals ein Zufall." />
        </div>
        <div className="fn">Alle Fleisch- und Fischgerichte servieren wir mit Gemüse der Saison und Gourmet-Kartoffeln (Rosmarin-Drillinge) als Beilage. Zu Calamari Fritti reichen wir einen Beilagensalat.</div>
      </PrintPage>

      <PrintPage pageNum="X">
        <DishCategory dropcap="P" title="Pizza" subtitle="(∅ 28cm)" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pizza" marginBottom="8px" />
        </div>
        <div className="fn">Alle Pizzen (außer Pizzabrot) werden mit Tomatensoße, Gewürzen & Käse belegt. Jede weitere kleine Zutat berechnen wir mit + 1,00 €. Frischer Lachs, Garnelen, Parmaschinken berechnen wir mit + 2,00 €. Extrawünsche sind bei Calzone leider nicht möglich.</div>
      </PrintPage>

      <PrintPage pageNum="XI">
        <DishCategory dropcap="F" title="Familienpizza" subtitle="ca. 40×60 cm (ab 4 Pers.)" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="familienpizza" marginBottom="6px" />
        </div>

        <DishCategory dropcap="K" title="Kindergerichte" marginTop="10px" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="kindergerichte" marginBottom="6px" />
        </div>

        <DishCategory dropcap="D" title="Desserts" marginTop="10px" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="dessert" marginBottom="6px" />
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '15px'}}>
          <span style={{fontSize: '24px'}}>VIELEN DANK ◆ GUTEN APPETIT</span>
        </div>
      </PrintPage>

      <PrintPage pageNum="XII">
        <AllergenLegend style={{ marginTop: '20px', border: '1px solid var(--gold-primary)' }} />
      </PrintPage>
    </div>
  );
}
