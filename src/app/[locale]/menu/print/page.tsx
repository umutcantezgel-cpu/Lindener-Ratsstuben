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
import DishItem from './components/DishItem';
import Quote from './components/Quote';
import AllergenLegend from './components/AllergenLegend';

export default function PrintMenuPage() {
  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      <MenuCover />
      <ChefsLetter />
      <PhilosophyPage />
      <TableOfContents />

      <PrintPage pageNum="IV">
        <DishCategory dropcap="A" title="Aperitivi" subtitle="Presto" />
        <div className="cat-grid">
          <DishItem id="01" name="MARTINI BIANCO/ROSSO" price="4,50 €" desc="5cl" />
          <DishItem id="02" name="CAMPARI SODA / ORANGE" price="5,50 €" desc="4cl" />
          <DishItem id="03" name="PROSECCO VALDOBBIADENE" price="4,50 €" desc="0,1l" />
          <DishItem id="04" name="APEROL SPRITZ" price="6,50 €" desc="0,2l" />
          <DishItem id="05" name="HUGO" price="6,50 €" desc="0,2l" />
        </div>

        <DishCategory dropcap="Z" title="Zuppe" subtitle="Suppen" marginTop="20px" />
        <div className="cat-grid">
          <DishItem id="10" name="CREMA DI POMODORO" price="5,50 €" desc="Hausgemachte Tomaten-Basilikum-Suppe" />
          <DishItem id="11" name="MINESTRONE" price="6,00 €" desc="Italienische Gemüsesuppe der Saison" />
        </div>

        <DishCategory dropcap="A" title="Antipasti" subtitle="Vorspeisen" marginTop="20px" />
        <div className="cat-grid">
          <DishItem id="20" name="BRUSCHETTA" price="5,50 €" desc="Vier geröstete Brotscheiben mit frischen Tomaten, Knoblauch und Basilikum" />
          <DishItem id="21" name="CAPRESE" price="9,00 €" desc="Mozzarella mit frischen Tomaten und Basilikum" />
          <DishItem id="22" name="CARPACCIO DI MANZO" price="12,50 €" desc="Hauchdünnes Rinderfilet mit Rucola und Parmesanraspeln" />
          <DishItem id="23" name="VITELLO TONNATO" price="11,50 €" desc="Dünn aufgeschnittenes Kalbfleisch mit Thunfisch-Kaperncreme" />
          <DishItem id="24" name="ANTIPASTO MISTO" price="13,50 €" desc="Variation von italienischen Vorspeisen" />
          <DishItem id="25" name="FETA AL FORNO" price="10,50 €" desc="Gebackener Schafskäse mit Oliven, Peperoni und Knoblauch" />
          <Quote text="La cucina è un atto d'amore" />
        </div>
        <div className="fn">Alle Suppen und Vorspeisen servieren wir mit ofenfrischem Pizzabrot.</div>
      </PrintPage>

      <PrintPage pageNum="V">
        <DishCategory dropcap="I" title="Insalate" subtitle="Salate" />
        <div className="cat-grid">
          <DishItem id="30" name="INSALATA MISTA (KLEIN)" price="5,50 €" desc="Gemischter Beilagensalat mit Hausdressing" />
          <DishItem id="31" name="INSALATA POMODORO" price="6,50 €" desc="Tomatensalat mit Zwiebeln und Essig/Öl" />
          <DishItem id="32" name="INSALATA ITALIA" price="10,50 €" desc="Gemischter Salat mit Schinken, Käse, Ei, Oliven und Peperoni" />
          <DishItem id="33" name="INSALATA TONNO" price="10,50 €" desc="Gemischter Salat mit Thunfisch, Zwiebeln, Ei und Oliven" />
          <DishItem id="34" name="INSALATA PECORINO" price="10,50 €" desc="Gemischter Salat mit Feta, milden Peperoni, Oliven und Ei" />
          <DishItem id="35" name="INSALATA POLLO" price="12,50 €" desc="Großer bunter Salat mit gebratenen Hähnchenbruststreifen" />
          <DishItem id="36" name="INSALATA RATSSTUBEN" price="14,50 €" desc="Großer bunter Salat mit Lachsstreifen, Rucola und Parmesan" />
        </div>
        <div className="fn" style={{marginBottom: "30px"}}>Alle großen Salate servieren wir mit ofenfrischem Pizzabrot und unserem Balsamico-Joghurt Dressing.</div>
        
        <div className="box">
          <div className="box-t">ALLERGEN-KENNZEICHNUNG (EU-VO 1169/2011)</div>
          <div className="box-c">
            A) Glutenhaltiges Getreide • B) Krebstiere • C) Eier • D) Fisch • E) Erdnüsse • F) Soja • G) Milch & Laktose<br/>
            H) Schalenfrüchte / Nüsse • I) Sellerie • J) Senf • K) Sesamsamen • L) Sulfite • M) Lupinen • N) Weichtiere
          </div>
          <div className="box-t" style={{marginTop: "8px"}}>ZUSATZSTOFFE</div>
          <div className="box-c">
            1) Farbstoff • 2) Konservierungsstoff • 3) Antioxidationsmittel • 4) Geschmacksverstärker<br/>
            5) Geschwefelt • 6) Geschwärzt • 7) Phosphat • 8) Süßungsmittel
          </div>
        </div>
      </PrintPage>

      <PrintPage pageNum="VI">
        <DishCategory dropcap="P" title="Pasta" subtitle="Traditionell" />
        <div className="cat-grid">
          <DishItem id="40" name="SPAGHETTI NAPOLI" price="8,00 €" desc="mit hausgemachterfruchtiger Tomatensoße" />
          <DishItem id="41" name="SPAGHETTI BOLOGNESE" price="9,00 €" desc="mit herzhafter Fleischsoße vom Rind" />
          <DishItem id="42" name="SPAGHETTI AGLIO E OLIO" price="8,50 €" desc="mit nativem Olivenöl, Knoblauch, Peperoni (scharf)" />
          <DishItem id="43" name="SPAGHETTI CARBONARA" price="9,50 €" desc="mit Speck, Ei, Sahne und Parmesan" />
          <DishItem id="44" name="PENNE ALL' ARRABBIATA" price="9,00 €" desc="mit Knoblauch, Oliven und Peperoni in Tomatensoße (pikant)" />
          <DishItem id="45" name="PENNE GORGONZOLA" price="10,50 €" desc="mit herzhafter Gorgonzolakäse-Sahnesoße" />
          <DishItem id="46" name="TORTELLINI PANNA" price="10,00 €" desc="Fleischteigtaschen mit Hinterschinken und Sahnesoße" />
          <DishItem id="47" name="TAGLIATELLE SALMONE" price="13,50 €" desc="Bandnudeln mit Lachs in Hummersoße mit Rosa Pfeffer" />
          <Quote text="Il segreto di una buona cucina..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VII">
        <DishCategory dropcap="A" title="Al Forno" subtitle="Überbackenes" />
        <div className="cat-grid">
          <DishItem id="48" name="LASAGNE AL FORNO" price="10,50 €" desc="Geschichtete Nudelblätter mit Fleischsoße (100% Rind) und Käse überbacken" />
          <DishItem id="49" name="PASTA MISTA FORNO" price="11,00 €" desc="3 Nudelsorten mit Fleischsoße, Béchamel und Käse überbacken" />
          <DishItem id="62" name="CANNELLONI RICOTTA" price="10,50 €" desc="Teigrollen gefüllt mit Spinat-Ricotta in Tomaten-Sahnesoße überbacken" />
        </div>

        <DishCategory dropcap="F" title="Fatto In Casa" subtitle="Hausgemacht" marginTop="30px" />
        <div className="cat-grid">
          <DishItem id="50" name="GNOCCHI POMODORO" price="10,00 €" desc="Hausgemachte Kartoffelklößchen mit Rucola und Parmesan in Tomatensoße" />
          <DishItem id="51" name="GNOCCHI AL GORGONZOLA" price="11,00 €" desc="Kartoffelklößchen in fein-würziger Gorgonzolasoße" />
          <DishItem id="52" name="RAVIOLI BURRO E SALVIA" price="12,50 €" desc="Frische Teigtaschen gefüllt mit Ricotta & Spinat in Buttersoße mit frischem Salbei" />
          <DishItem id="53" name="RAVIOLI TARTUFO" price="14,50 €" desc="Trüffel-Teigtaschen in leichter Trüffel-Sahnesoße mit Parmesan" />
          <DishItem id="54" name="PANZEROTTI FUNGHI" price="13,50 €" desc="Halbmond-Teigtaschen gefüllt mit Steinpilzen in Crème Fraîche Soße" />
          <Quote text="La pasta fatta in casa..." />
        </div>
      </PrintPage>

      <PrintPage pageNum="VIII">
        <DishCategory dropcap="S" title="Scaloppine" subtitle="Schnitzel (Schweinerücken)" />
        <div className="cat-grid">
          <DishItem id="70" name="SCHNITZEL &quot;WIENER ART&quot;" price="12,50 €" desc="Paniertes Schweineschnitzel mit Zitronenecke" />
          <DishItem id="71" name="JÄGERSCHNITZEL" price="14,50 €" desc="Paniertes Schweineschnitzel mit aromatischer Pilz-Sahnesoße" />
          <DishItem id="72" name="ZIGEUNERSCHNITZEL" price="14,50 €" desc="Paniertes Schnitzel mit rauchiger Paprika-Tomatensoße" />
          <DishItem id="73" name="RAHMSCHNITZEL" price="14,50 €" desc="Paniertes Schweineschnitzel in delikater Sahnesoße" />
          <DishItem id="74" name="HAWAII SCHNITZEL" price="15,00 €" desc="Paniertes Schnitzel mit Ananas und Käse überbacken" />
          <DishItem id="75" name="PARMIGIANA SCHNITZEL" price="15,50 €" desc="Schnitzel paniert, Parmaschinken, Ruccola & Parmesanraspeln, Essig & Öl" />
          <DishItem id="76" name="RATSSTUBEN SCHNITZEL" price="15,50 €" desc="Paniertes Schnitzel in Tomaten-Sahnesoße, Speck, Paprika & Käse überbacken" />
          <div className="fn">Alle Schnitzelgerichte servieren wir wahlweise mit Pommes Frites, Kroketten oder Nudeln.</div>
        </div>

        <DishCategory dropcap="B" title="Burger" subtitle="100% Rind (180g)" marginTop="20px" />
        <div className="cat-grid">
          <DishItem id="60" name="CLASSIC CHEESEBURGER" price="14,00 €" desc="Cheddar-Käse, Burger-Sauce, Tomate, Gurke, Röstzwiebeln und Salat" />
          <DishItem id="61" name="BBQ BACON BURGER" price="14,50 €" desc="BBQ-Sauce, knuspriger Bacon, Cheddar-Käse, Röstzwiebeln und Rucola" />
          <DishItem id="63" name="CHILLI CHEESE BURGER" price="14,50 €" desc="Jalapeños, Cheddar, Nachos, feurige Chili-Cheese-Sauce, Salat" />
          <DishItem id="64" name="GORGONZOLA BURGER" price="14,50 €" desc="Würziger Gorgonzola-Käse, hausgemachte Joghurtsauce, Rucola" />
          <div className="fn">Alle Burger servieren wir mit einer Portion Pommes Frites. Details zu den Burgern auf Seite X.</div>
        </div>
      </PrintPage>

      <PrintPage pageNum="IX">
        <DishCategory dropcap="C" title="Carne" subtitle="Fleisch" />
        <div className="cat-grid">
          <DishItem id="80" name="BISTECCA ALLA GRIGLIA" price="24,50 €" desc="Gegrilltes Rumpsteak (ca. 250g) mit Kräuterbutter" />
          <DishItem id="81" name="BISTECCA AL GORGONZOLA" price="26,50 €" desc="Gegrilltes Rumpsteak in würziger Gorgonzolasoße" />
          <DishItem id="82" name="BISTECCA AL PEPE VERDE" price="26,50 €" desc="Rumpsteak in cremiger Cognac-Grüner-Pfeffer-Soße" />
          <DishItem id="83" name="MEDAGLIONI FUNGHI" price="17,50 €" desc="Schweinemedaillons in frischer Champignon-Rahmsoße" />
          <DishItem id="84" name="MEDAGLIONI PEPE VERDE" price="17,50 €" desc="Schweinemedaillons in delikater Pfeffersoße" />
        </div>

        <DishCategory dropcap="P" title="Pesce" subtitle="Fisch" marginTop="30px" />
        <div className="cat-grid">
          <DishItem id="85" name="CALAMARI FRITTI" price="15,50 €" desc="Frittierte Tintenfischringe mit pikanter Remouladensoße" />
          <DishItem id="86" name="SALMONE ALLA GRIGLIA" price="18,50 €" desc="Lachsfilet vom Grill, verfeinert mit Knoblauch-Kräuter-Marinade" />
          <DishItem id="87" name="SCAMPI ALLA GRIGLIA" price="23,50 €" desc="Großgarnelen vom Grill mit Knoblauch und feinen Kräutern" />
          <DishItem id="88" name="SCAMPI LIVORNESE" price="24,50 €" desc="Großgarnelen in feuriger Tomatensoße mit Oliven, Kapern, Knoblauch, Peperoni" />
          <Quote text="La qualità non è mai un caso." />
        </div>
        <div className="fn">Alle Fleisch- und Fischgerichte servieren wir mit Gemüse der Saison und Gourmet-Kartoffeln (Rosmarin-Drillinge) als Beilage. Zu Calamari Fritti reichen wir einen Beilagensalat.</div>
      </PrintPage>

      <PrintPage pageNum="X">
        <DishCategory dropcap="P" title="Pizza" subtitle="Forno a Legna (∅ 28cm)" />
        <div className="cat-grid">
          <DishItem id="90" name="PIZZABROT" price="4,00 €" desc="Knoblauch oder Olivenöl, Origano" />
          <DishItem id="91" name="PIZZA MARGHERITA" price="7,50 €" desc="Tomatensoße und Käse" />
          <DishItem id="92" name="PIZZA SALAMI" price="8,50 €" desc="Mailänder Salami" />
          <DishItem id="93" name="PIZZA PROSCIUTTO" price="8,50 €" desc="Vorderschinken" />
          <DishItem id="94" name="PIZZA FUNGHI" price="8,50 €" desc="Frische Champignons" />
          <DishItem id="95" name="PIZZA TONNO" price="9,50 €" desc="Thunfisch und Zwiebeln" />
          <DishItem id="96" name="PIZZA HAWAII" price="9,50 €" desc="Schinken und Ananas" />
          <DishItem id="97" name="PIZZA ITALIA" price="9,50 €" desc="Zwiebeln, frischen Tomaten, Peperoni, Mozzarella und Oregano" />
          <DishItem id="98" name="PIZZA CAPRICCIOSA" price="9,50 €" desc="Salami, Schinken und frische Champignons" />
          <DishItem id="99" name="PIZZA MILANO" price="9,50 €" desc="Salami, Schinken, Champignons und Peperoni" />
          <DishItem id="100" name="PIZZA QUATTRO STAGIONI" price="10,00 €" desc="Salami, Schinken, Champignons, Paprika" />
          <DishItem id="101" name="PIZZA VEGETARIANA" price="10,00 €" desc="Verschiedene frische Gemüsesorten der Saison" />
          <DishItem id="102" name="PIZZA GYROS" price="10,50 €" desc="Zwiebeln, Tzatziki, Gyros" />
          <DishItem id="103" name="PIZZA DIAVOLO (scharf!)" price="10,50 €" desc="Peperoniwurst, Paprika, Zwiebeln, Knoblauch, Peperoni" />
          <DishItem id="104" name="PIZZA PARMA" price="11,50 €" desc="Parmaschinken, Rucola, Parmesan" />
          <DishItem id="105" name="CALZONE (Gefüllte Pizza)" price="10,00 €" desc="Salami, Schinken, frische Champignons, Paprika" />
          <DishItem id="106" name="PIZZA SALMONE" price="12,50 €" desc="Frischer Lachs, Spinat, Knoblauch, Mozzarella" />
        </div>
        <div className="fn">Alle Pizzen (außer Pizzabrot) werden mit Tomatensoße, Gewürzen & Käse belegt. Jede weitere kleine Zutat berechnen wir mit + 1,00 €. Frischer Lachs, Garnelen, Parmaschinken berechnen wir mit + 2,00 €. Extrawünsche sind bei Calzone leider nicht möglich.</div>
      </PrintPage>

      <PrintPage pageNum="XI">
        <DishCategory dropcap="F" title="Famiglia" subtitle="Familienpizza ca. 40×60 cm (ab 4 Pers.)" />
        <div className="cat-grid">
          <DishItem id="110" name="FAMILIENPIZZA MARGHERITA" price="20,00 €" desc="Tomatensoße, Käse und Kräuter" />
          <DishItem id="111" name="MIT EINER ZUTAT" price="23,00 €" desc="Salami oder Schinken oder Champignons oder Peperoniwurst" />
          <DishItem id="112" name="MIT ZWEI ZUTATEN" price="25,50 €" desc="Zwei Zutaten nach Wahl (Standard)" />
          <DishItem id="113" name="MIT DREI ZUTATEN" price="28,00 €" desc="Drei Zutaten nach Wahl (Standard)" />
          <DishItem id="114" name="MIT VIER ZUTATEN" price="30,50 €" desc="Vier Zutaten nach Wahl (Standard)" />
          <DishItem id="115" name="PIZZA RATSSTUBEN" price="32,50 €" desc="Belag nach Art des Hauses" />
        </div>

        <DishCategory dropcap="L" title="Limonate" subtitle="Limonate Della Casa (Hausgemacht, 0,4L)" marginTop="15px" />
        <div className="cat-grid">
          <DishItem id="L1" name="CLASSIC LEMON MINT" price="5,50 €" desc="Frischer Zitronensaft, Minze, Sprite, Soda" />
          <DishItem id="L2" name="STRAWBERRY BASIL" price="5,90 €" desc="Erdbeer-Sirup, frischer Basilikum, Limette, Soda" />
          <DishItem id="L3" name="PASSION FRUIT BREEZE" price="5,90 €" desc="Maracuja, Limettensaft, Minze, Soda" />
          <DishItem id="L4" name="RASPBERRY PEACH" price="5,90 €" desc="Pfirsich, Himbeere, Limette, Soda" />
        </div>

        <DishCategory dropcap="B" title="Bambini" subtitle="Kindergerichte" marginTop="15px" />
        <div className="cat-grid">
          <DishItem id="120" name="PUMUCKL" price="6,00 €" desc="Spaghetti in Napoli oder Bolognese" />
          <DishItem id="121" name="DUMBO" price="7,50 €" desc="Kleines Schnitzel &quot;Wiener Art&quot; mit Pommes" />
          <DishItem id="122" name="NEMO" price="7,50 €" desc="Fischstäbchen (6 Stück) mit Pommes" />
          <DishItem id="123" name="MICKY MAUS" price="7,00 €" desc="Kleine Pizza Margherita mit Salami" />
        </div>

        <DishCategory dropcap="D" title="Dolci" subtitle="Desserts" marginTop="15px" />
        <div className="cat-grid">
          <DishItem id="130" name="TIRAMISU (HAUSGEMACHT)" price="6,00 €" desc="Klassisches italienisches Dessert mit Mascarpone" />
          <DishItem id="131" name="PANNA COTTA" price="5,50 €" desc="Sahnedessert mit Erdbeersoße" />
          <DishItem id="132" name="WARMER APFELSTRUDEL" price="6,50 €" desc="Mit Vanilleeis und Sahne" />
          <DishItem id="133" name="TARTUFO EIS" price="5,50 €" desc="Italienische Eisspezialität mit Schokoladenkern" />
          <DishItem id="134" name="GEMISCHTES EIS" price="5,00 €" desc="Drei Kugeln Eis nach Wahl (Schoko, Vanille, Erdbeer)" />
        </div>
        
        <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '20px'}}>
          <span style={{fontSize: '24px'}}>GRAZIE ◆ BUON APPETITO</span>
        </div>
      </PrintPage>

      <PrintPage pageNum="XII">
        <DishCategory dropcap="B" title="Hamburger" subtitle="Della Casa" marginTop="40px" marginBottom="40px" />
        <div style={{maxWidth: "90%", margin: "0 auto"}}>
          <p className="cv-intro" style={{textAlign: "center", marginBottom: "40px", maxWidth: "100%", fontSize: "14px"}}>
            Unsere Premium Burger werden mit 180g saftigem 100% Rindfleisch zubereitet<br/>und frisch im rustikalen Brioche Bun serviert.<br/>Zu jedem Burger servieren wir knackige Pommes Frites.
          </p>
          <DishItem id="60" name="CLASSIC CHEESEBURGER" price="14,00 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Der zeitlose Klassiker: Saftiges Rindfleisch-Patty überbacken mit irischem Cheddar-Käse, belegt mit frischen Tomatenscheiben, knackigen Gewürzgurken, Lollo Bionda Salat und gerösteten Zwiebeln. Vollendet mit unserer raffinierten hausgemachten Burger-Sauce." />
          <DishItem id="61" name="BBQ BACON BURGER" price="14,50 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Für Liebhaber rauchiger Aromen: Herzhaftes 100% Rindfleisch-Patty, knusprig gebratene Bacon-Streifen, geschmolzener Cheddar-Käse, Röstzwiebeln und würziger Rucola-Salat. Kräftig abgerundet mit Original amerikanischer BBQ-Sauce." />
          <DishItem id="63" name="CHILLI CHEESE BURGER" price="14,50 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Temperamentvoll und scharf: Saftiges Rindfleisch mit feurigen Jalapeños, knusprigen Tortilla-Nachos für den extra Crunch und frischem Salat. Gekrönt von einer reichhaltigen, scharfen Chili-Cheese-Sauce und geschmolzenem Cheddar." />
          <DishItem id="64" name="GORGONZOLA BURGER" price="14,50 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Italienische Raffinesse trifft auf Burger-Kultur: Unser 180g Rindfleisch-Patty umhüllt von cremig-würzigem Gorgonzola-Blauschimmelkäse dolce. Dazu aromatischer Rucola und eine erfrischende, hausgemachte Joghurt-Mayonnaise." />
          <Quote text="Tutti i sapori, una sola passione." marginTop="50px" />
        </div>
      </PrintPage>

      <PrintPage pageNum="XIII">
        <DishCategory dropcap="L" title="Limonate" subtitle="Della Casa (0,4L)" marginTop="40px" marginBottom="40px" />
        <div style={{maxWidth: "90%", margin: "0 auto"}}>
          <p className="cv-intro" style={{textAlign: "center", marginBottom: "40px", maxWidth: "100%", fontSize: "14px"}}>
            Erfrischend anders: Entdecken Sie unsere hausgemachten Limonadenkreationen.<br/>Jedes Glas (0,4L) wird à la minute mit frischen Früchten, Kräutern<br/>und ausgewählten Sirup-Spezialitäten für Sie zubereitet. Ohne Alkohol.
          </p>
          <DishItem id="L1" name="CLASSIC LEMON MINT" price="5,50 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Die traditionelle, erfrischende Symphonie: Frisch gepresster Zitronensaft, milde Rohrzuckersüße und reichlich frische marokkanische Nanaminze, aufbereitet mit Sprite und serviert auf Eis. Der Inbegriff von Erfrischung." />
          <DishItem id="L2" name="STRAWBERRY BASIL" price="5,90 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Italienischer Sommer im Glas: Süßer Premium-Erdbeersirup gepaart mit den ätherischen Ölen von frisch gezupftem Basilikum. Abgerundet durch einen Schuss frischer Limette und aufgefüllt mit sprudelndem Sodawasser." />
          <DishItem id="L3" name="PASSION FRUIT BREEZE" price="5,90 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Tropische Leichtigkeit: Intensiv-fruchtiges Maracuja-Püree umspielt von säuerlichem Limettensaft und kühlender Minze, leicht gesüßt und herrlich prickelnd. Ein exotischer Urlaub für die Sinne." />
          <DishItem id="L4" name="RASPBERRY PEACH" price="5,90 €" marginBottom="24px" descStyle={{marginLeft: "24px", marginRight: "0", fontSize: "14px", lineHeight: "1.6"}} desc="Samtig und beerig: Die feine Süße des Weinbergpfirsichs harmoniert perfekt mit kräftigem Himbeersirup. Ausbalanciert mit frisch gepresster Limette und spritzigem Wasser, garniert mit frischer Minze." />
          <Quote text="La freschezza è un'arte." marginTop="50px" marginBottom="30px" />

          <div className="box" style={{marginTop: "40px", backgroundColor: "transparent", border: "none"}}>
            <div className="box-t">ZUSATZSTOFF-HINWEISE LIMONADEN</div>
            <div className="box-c">
              L1 enthält: Aroma, Säuerungsmittel. L2 enthält: Farbstoff (Carmin), Säuerungsmittel. <br/>
              L3 enthält: Antioxidationsmittel, Aroma. L4 enthält: Farbstoff, Antioxidationsmittel, Aroma.
            </div>
          </div>
        </div>
      </PrintPage>


      <EditorialSignaturePasta pageNum="XIV" />
      <EditorialWines pageNum="XV" />
      <EditorialDolci pageNum="XVI" />
      
      <PrintPage pageNum="XVII">
        <AllergenLegend style={{ marginTop: '40px', border: '1px solid var(--gold-primary)' }} />
      </PrintPage>
    </div>
  );
}
