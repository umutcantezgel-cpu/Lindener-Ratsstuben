import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';
import MenuCover from './components/MenuCover';
import ChefsLetter from './components/ChefsLetter';
import PhilosophyPage from './components/PhilosophyPage';
import TableOfContents from './components/TableOfContents';
import EditorialSignaturePasta from './components/EditorialSignaturePasta';
import EditorialWines from './components/EditorialWines';
import EditorialDolci from './components/EditorialDolci';
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
        <DishCategory dropcap="Z" title="Zuppe" subtitle="Suppen" marginTop="20px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="suppen" />
        </div>

        <DishCategory dropcap="A" title="Antipasti" subtitle="Vorspeisen" marginTop="20px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="vorspeisen" />
          <Quote text="La cucina è un atto d'amore" />
        </div>
        <div className="fn">Alle Suppen und Vorspeisen servieren wir mit ofenfrischem Pizzabrot.</div>
      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="I" title="Insalate" subtitle="Salate" />
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
        <DishCategory dropcap="P" title="Pasta" subtitle="Traditionell" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta" />
          <Quote text="Il segreto di una buona cucina..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VII">
        <DishCategory dropcap="A" title="Al Forno" subtitle="Überbackenes" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pasta-al-forno" />
        </div>

        <DishCategory dropcap="F" title="Fatto In Casa" subtitle="Hausgemacht" marginTop="30px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="hausgemachte-pasta" />
          <Quote text="La pasta fatta in casa..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="S" title="Scaloppine" subtitle="Schnitzel (Schweinerücken)" />
        <div className="cat-grid">
          <CategoryMapper categoryId="schnitzel" />
          <div className="fn">Alle Schnitzelgerichte servieren wir wahlweise mit Pommes Frites, Kroketten oder Nudeln.</div>
        </div>
      </PrintPage>

      <PrintPage pageNum="IX">
        <DishCategory dropcap="C" title="Carne e Pesce" subtitle="Fleisch & Fisch" />
        <div className="cat-grid">
          <CategoryMapper categoryId="fleisch-fisch" />
          <Quote text="La qualità non è mai un caso." />
        </div>
        <div className="fn">Alle Fleisch- und Fischgerichte servieren wir mit Gemüse der Saison und Gourmet-Kartoffeln (Rosmarin-Drillinge) als Beilage. Zu Calamari Fritti reichen wir einen Beilagensalat.</div>
      </PrintPage>

      <PrintPage pageNum="X">
        <DishCategory dropcap="P" title="Pizza" subtitle="Forno a Legna (∅ 28cm)" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="pizza" marginBottom="8px" />
        </div>
        <div className="fn">Alle Pizzen (außer Pizzabrot) werden mit Tomatensoße, Gewürzen & Käse belegt. Jede weitere kleine Zutat berechnen wir mit + 1,00 €. Frischer Lachs, Garnelen, Parmaschinken berechnen wir mit + 2,00 €. Extrawünsche sind bei Calzone leider nicht möglich.</div>
      </PrintPage>

      <PrintPage pageNum="XI">
        <DishCategory dropcap="F" title="Famiglia" subtitle="Familienpizza ca. 40×60 cm (ab 4 Pers.)" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="familienpizza" marginBottom="6px" />
        </div>

        <DishCategory dropcap="B" title="Bambini" subtitle="Kindergerichte" marginTop="10px" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="kindergerichte" marginBottom="6px" />
        </div>

        <DishCategory dropcap="D" title="Dolci" subtitle="Desserts" marginTop="10px" marginBottom="10px" />
        <div className="cat-grid">
          <CategoryMapper categoryId="dessert" marginBottom="6px" />
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '15px'}}>
          <span style={{fontSize: '24px'}}>GRAZIE ◆ BUON APPETITO</span>
        </div>
      </PrintPage>

      <PrintPage pageNum="XII">
        <DishCategory dropcap="B" title="Hamburger" subtitle="Della Casa" marginTop="20px" marginBottom="20px" />
        <div style={{maxWidth: "90%", margin: "0 auto"}}>
          <p className="cv-intro" style={{textAlign: "center", marginBottom: "20px", maxWidth: "100%", fontSize: "14px"}}>
            Unsere Premium Burger werden mit 180g saftigem 100% Rindfleisch zubereitet<br/>und frisch im rustikalen Brioche Bun serviert.<br/>Zu jedem Burger servieren wir knackige Pommes Frites.
          </p>
          <CategoryMapper 
            categoryId="burger" 
            marginBottom="16px" 
            descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} 
          />
          <Quote text="Tutti i sapori, una sola passione." marginTop="25px" />
        </div>
      </PrintPage>

      <PrintPage pageNum="XIII">
        <DishCategory dropcap="L" title="Limonate" subtitle="Della Casa (0,4L)" marginTop="20px" marginBottom="20px" />
        <div style={{maxWidth: "90%", margin: "0 auto"}}>
          <p className="cv-intro" style={{textAlign: "center", marginBottom: "20px", maxWidth: "100%", fontSize: "14px"}}>
            Erfrischend anders: Entdecken Sie unsere hausgemachten Limonadenkreationen.<br/>Jedes Glas (0,4L) wird à la minute mit frischen Früchten, Kräutern<br/>und ausgewählten Sirup-Spezialitäten für Sie zubereitet. Ohne Alkohol.
          </p>
          <CategoryMapper 
            categoryId="limonaden" 
            marginBottom="16px" 
            descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} 
          />
          <Quote text="La freschezza è un'arte." marginTop="20px" marginBottom="15px" />

          <div className="box" style={{marginTop: "15px", backgroundColor: "transparent", border: "none"}}>
            <div className="box-t">ZUSATZSTOFF-HINWEISE LIMONADEN</div>
            <div className="box-c">
              Unsere hausgemachten Limonaden werden stets mit frischen Zutaten zubereitet. Etwaige Zusatzstoffe entnehmen Sie bitte der aktuellen Auszeichnung im Restaurant.
            </div>
          </div>
        </div>
      </PrintPage>

      <EditorialSignaturePasta pageNum="XIV" />
      <EditorialWines pageNum="XV" />
      <EditorialDolci pageNum="XVI" />
      
      <PrintPage pageNum="XVII">
        <AllergenLegend style={{ marginTop: '20px', border: '1px solid var(--gold-primary)' }} />
      </PrintPage>
    </div>
  );
}
