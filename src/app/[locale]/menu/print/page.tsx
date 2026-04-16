import React from 'react';
import PrintLayoutClient from './PrintLayoutClient';
import './print.css';

export default function PrintMenuPage() {
  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      {/* SEITE I: DECKBLATT */}
      <div className="page-cover">
        <div className="cv-bg1"></div>
        <div className="cv-bg2"></div>
        <div className="cv-bg3"></div>
        <div className="cv-corner cv-tl"></div>
        <div className="cv-corner cv-tr"></div>
        <div className="cv-corner cv-bl"></div>
        <div className="cv-corner cv-br"></div>
        
        <div className="cv-content">
          <div className="cv-tag"><span>◆</span>RISTORANTE<span>◆</span></div>
          <div className="cv-trad">— Tradizione Italiana —</div>
          <h1 className="cv-title">RATSSTUBEN</h1>
          <div className="cv-line"></div>
          <div className="cv-sub">Kulinarische Meisterwerke<br/>mit Leidenschaft kreiert</div>
          <p className="cv-intro">
            Unsere Küche ehrt die reiche Tradition Italiens,<br/>
            wobei nur sorgfältig ausgewählte, frische Zutaten<br/>
            ihren Weg auf Ihren Teller finden.
          </p>
        </div>
        
        <div className="cv-est">
          Konrad-Adenauer-Straße 26, 35440 Linden<br />
          06403 - 64556<br />
          www.lindener-ratsstuben.de
        </div>
      </div>

      {/* SEITE II: APERITIVI, ZUPPE, ANTIPASTI */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">A</span>
            <h2 className="cat-title">Aperitivi</h2>
            <span className="cat-it">Presto</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">01</span><span className="it-n">MARTINI BIANCO/ROSSO</span><span className="it-dots"></span><span className="it-p">4,50 €</span></div><div className="it-d">5cl</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">02</span><span className="it-n">CAMPARI SODA / ORANGE</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">4cl</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">03</span><span className="it-n">PROSECCO VALDOBBIADENE</span><span className="it-dots"></span><span className="it-p">4,50 €</span></div><div className="it-d">0,1l</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">04</span><span className="it-n">APEROL SPRITZ</span><span className="it-dots"></span><span className="it-p">6,50 €</span></div><div className="it-d">0,2l</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">05</span><span className="it-n">HUGO</span><span className="it-dots"></span><span className="it-p">6,50 €</span></div><div className="it-d">0,2l</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "20px"}}>
            <span className="cat-dropcap">Z</span>
            <h2 className="cat-title">Zuppe</h2>
            <span className="cat-it">Suppen</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">10</span><span className="it-n">CREMA DI POMODORO</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Hausgemachte Tomaten-Basilikum-Suppe</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">11</span><span className="it-n">MINESTRONE</span><span className="it-dots"></span><span className="it-p">6,00 €</span></div><div className="it-d">Italienische Gemüsesuppe der Saison</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "20px"}}>
            <span className="cat-dropcap">A</span>
            <h2 className="cat-title">Antipasti</h2>
            <span className="cat-it">Vorspeisen</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">20</span><span className="it-n">BRUSCHETTA</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Vier geröstete Brotscheiben mit frischen Tomaten, Knoblauch und Basilikum</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">21</span><span className="it-n">CAPRESE</span><span className="it-dots"></span><span className="it-p">9,00 €</span></div><div className="it-d">Mozzarella mit frischen Tomaten und Basilikum</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">22</span><span className="it-n">CARPACCIO DI MANZO</span><span className="it-dots"></span><span className="it-p">12,50 €</span></div><div className="it-d">Hauchdünnes Rinderfilet mit Rucola und Parmesanraspeln</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">23</span><span className="it-n">VITELLO TONNATO</span><span className="it-dots"></span><span className="it-p">11,50 €</span></div><div className="it-d">Dünn aufgeschnittenes Kalbfleisch mit Thunfisch-Kaperncreme</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">24</span><span className="it-n">ANTIPASTO MISTO</span><span className="it-dots"></span><span className="it-p">13,50 €</span></div><div className="it-d">Variation von italienischen Vorspeisen</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">25</span><span className="it-n">FETA AL FORNO</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Gebackener Schafskäse mit Oliven, Peperoni und Knoblauch</div></div>
            
            <div className="qt">
              <div className="qt-txt">&quot;La cucina è un atto d&apos;amore&quot;</div>
            </div>
          </div>
          
          <div className="fn">Alle Suppen und Vorspeisen servieren wir mit ofenfrischem Pizzabrot.</div>
          
        </div>
        <div className="pg-num">— II —</div>
      </div>

      {/* SEITE III: INSALATE + ALLERGEN BOX */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">I</span>
            <h2 className="cat-title">Insalate</h2>
            <span className="cat-it">Salate</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">30</span><span className="it-n">INSALATA MISTA (KLEIN)</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Gemischter Beilagensalat mit Hausdressing</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">31</span><span className="it-n">INSALATA POMODORO</span><span className="it-dots"></span><span className="it-p">6,50 €</span></div><div className="it-d">Tomatensalat mit Zwiebeln und Essig/Öl</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">32</span><span className="it-n">INSALATA ITALIA</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Gemischter Salat mit Schinken, Käse, Ei, Oliven und Peperoni</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">33</span><span className="it-n">INSALATA TONNO</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Gemischter Salat mit Thunfisch, Zwiebeln, Ei und Oliven</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">34</span><span className="it-n">INSALATA PECORINO</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Gemischter Salat mit Feta, milden Peperoni, Oliven und Ei</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">35</span><span className="it-n">INSALATA POLLO</span><span className="it-dots"></span><span className="it-p">12,50 €</span></div><div className="it-d">Großer bunter Salat mit gebratenen Hähnchenbruststreifen</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">36</span><span className="it-n">INSALATA RATSSTUBEN</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Großer bunter Salat mit Lachsstreifen, Rucola und Parmesan</div></div>
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
          
        </div>
        <div className="pg-num">— III —</div>
      </div>

      {/* SEITE IV: PASTA */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">P</span>
            <h2 className="cat-title">Pasta</h2>
            <span className="cat-it">Traditionell</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">40</span><span className="it-n">SPAGHETTI NAPOLI</span><span className="it-dots"></span><span className="it-p">8,00 €</span></div><div className="it-d">mit hausgemachterfruchtiger Tomatensoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">41</span><span className="it-n">SPAGHETTI BOLOGNESE</span><span className="it-dots"></span><span className="it-p">9,00 €</span></div><div className="it-d">mit herzhafter Fleischsoße vom Rind</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">42</span><span className="it-n">SPAGHETTI AGLIO E OLIO</span><span className="it-dots"></span><span className="it-p">8,50 €</span></div><div className="it-d">mit nativem Olivenöl, Knoblauch, Peperoni (scharf)</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">43</span><span className="it-n">SPAGHETTI CARBONARA</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">mit Speck, Ei, Sahne und Parmesan</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">44</span><span className="it-n">PENNE ALL&apos; ARRABBIATA</span><span className="it-dots"></span><span className="it-p">9,00 €</span></div><div className="it-d">mit Knoblauch, Oliven und Peperoni in Tomatensoße (pikant)</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">45</span><span className="it-n">PENNE GORGONZOLA</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">mit herzhafter Gorgonzolakäse-Sahnesoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">46</span><span className="it-n">TORTELLINI PANNA</span><span className="it-dots"></span><span className="it-p">10,00 €</span></div><div className="it-d">Fleischteigtaschen mit Hinterschinken und Sahnesoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">47</span><span className="it-n">TAGLIATELLE SALMONE</span><span className="it-dots"></span><span className="it-p">13,50 €</span></div><div className="it-d">Bandnudeln mit Lachs in Hummersoße mit Rosa Pfeffer</div></div>
            
            <div className="qt">
              <div className="qt-txt">&quot;Il segreto di una buona cucina...&quot;</div>
            </div>
          </div>
        </div>
        <div className="pg-num">— IV —</div>
      </div>

      {/* SEITE V: PASTA AL FORNO + FATTO IN CASA */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">A</span>
            <h2 className="cat-title">Al Forno</h2>
            <span className="cat-it">Überbackenes</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">48</span><span className="it-n">LASAGNE AL FORNO</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Geschichtete Nudelblätter mit Fleischsoße (100% Rind) und Käse überbacken</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">49</span><span className="it-n">PASTA MISTA FORNO</span><span className="it-dots"></span><span className="it-p">11,00 €</span></div><div className="it-d">3 Nudelsorten mit Fleischsoße, Béchamel und Käse überbacken</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">62</span><span className="it-n">CANNELLONI RICOTTA</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Teigrollen gefüllt mit Spinat-Ricotta in Tomaten-Sahnesoße überbacken</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "30px"}}>
            <span className="cat-dropcap">F</span>
            <h2 className="cat-title">Fatto In Casa</h2>
            <span className="cat-it">Hausgemacht</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">50</span><span className="it-n">GNOCCHI POMODORO</span><span className="it-dots"></span><span className="it-p">10,00 €</span></div><div className="it-d">Hausgemachte Kartoffelklößchen mit Rucola und Parmesan in Tomatensoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">51</span><span className="it-n">GNOCCHI AL GORGONZOLA</span><span className="it-dots"></span><span className="it-p">11,00 €</span></div><div className="it-d">Kartoffelklößchen in fein-würziger Gorgonzolasoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">52</span><span className="it-n">RAVIOLI BURRO E SALVIA</span><span className="it-dots"></span><span className="it-p">12,50 €</span></div><div className="it-d">Frische Teigtaschen gefüllt mit Ricotta & Spinat in Buttersoße mit frischem Salbei</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">53</span><span className="it-n">RAVIOLI TARTUFO</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Trüffel-Teigtaschen in leichter Trüffel-Sahnesoße mit Parmesan</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">54</span><span className="it-n">PANZEROTTI FUNGHI</span><span className="it-dots"></span><span className="it-p">13,50 €</span></div><div className="it-d">Halbmond-Teigtaschen gefüllt mit Steinpilzen in Crème Fraîche Soße</div></div>
            
            <div className="qt">
              <div className="qt-txt">&quot;La pasta fatta in casa...&quot;</div>
            </div>
          </div>
        </div>
        <div className="pg-num">— V —</div>
      </div>

      {/* SEITE VI: SCALOPPINE + HAMBURGER */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">S</span>
            <h2 className="cat-title">Scaloppine</h2>
            <span className="cat-it">Schnitzel (Schweinerücken)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">70</span><span className="it-n">SCHNITZEL &quot;WIENER ART&quot;</span><span className="it-dots"></span><span className="it-p">12,50 €</span></div><div className="it-d">Paniertes Schweineschnitzel mit Zitronenecke</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">71</span><span className="it-n">JÄGERSCHNITZEL</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Paniertes Schweineschnitzel mit aromatischer Pilz-Sahnesoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">72</span><span className="it-n">ZIGEUNERSCHNITZEL</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Paniertes Schnitzel mit rauchiger Paprika-Tomatensoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">73</span><span className="it-n">RAHMSCHNITZEL</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Paniertes Schweineschnitzel in delikater Sahnesoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">74</span><span className="it-n">HAWAII SCHNITZEL</span><span className="it-dots"></span><span className="it-p">15,00 €</span></div><div className="it-d">Paniertes Schnitzel mit Ananas und Käse überbacken</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">75</span><span className="it-n">PARMIGIANA SCHNITZEL</span><span className="it-dots"></span><span className="it-p">15,50 €</span></div><div className="it-d">Schnitzel paniert, Parmaschinken, Ruccola & Parmesanraspeln, Essig & Öl</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">76</span><span className="it-n">RATSSTUBEN SCHNITZEL</span><span className="it-dots"></span><span className="it-p">15,50 €</span></div><div className="it-d">Paniertes Schnitzel in Tomaten-Sahnesoße, Speck, Paprika & Käse überbacken</div></div>
            
            <div className="fn">Alle Schnitzelgerichte servieren wir wahlweise mit Pommes Frites, Kroketten oder Nudeln.</div>
          </div>

          <div className="cat-hdr" style={{marginTop: "20px"}}>
            <span className="cat-dropcap">B</span>
            <h2 className="cat-title">Burger</h2>
            <span className="cat-it">100% Rind (180g)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">60</span><span className="it-n">CLASSIC CHEESEBURGER</span><span className="it-dots"></span><span className="it-p">14,00 €</span></div><div className="it-d">Cheddar-Käse, Burger-Sauce, Tomate, Gurke, Röstzwiebeln und Salat</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">61</span><span className="it-n">BBQ BACON BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">BBQ-Sauce, knuspriger Bacon, Cheddar-Käse, Röstzwiebeln und Rucola</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">63</span><span className="it-n">CHILLI CHEESE BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Jalapeños, Cheddar, Nachos, feurige Chili-Cheese-Sauce, Salat</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">64</span><span className="it-n">GORGONZOLA BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div><div className="it-d">Würziger Gorgonzola-Käse, hausgemachte Joghurtsauce, Rucola</div></div>
            
            <div className="fn">Alle Burger servieren wir mit einer Portion Pommes Frites. Details zu den Burgern auf Seite 10.</div>
          </div>
        </div>
        <div className="pg-num">— VI —</div>
      </div>

      {/* SEITE VII: CARNE E PESCE */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">C</span>
            <h2 className="cat-title">Carne</h2>
            <span className="cat-it">Fleisch</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">80</span><span className="it-n">BISTECCA ALLA GRIGLIA</span><span className="it-dots"></span><span className="it-p">24,50 €</span></div><div className="it-d">Gegrilltes Rumpsteak (ca. 250g) mit Kräuterbutter</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">81</span><span className="it-n">BISTECCA AL GORGONZOLA</span><span className="it-dots"></span><span className="it-p">26,50 €</span></div><div className="it-d">Gegrilltes Rumpsteak in würziger Gorgonzolasoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">82</span><span className="it-n">BISTECCA AL PEPE VERDE</span><span className="it-dots"></span><span className="it-p">26,50 €</span></div><div className="it-d">Rumpsteak in cremiger Cognac-Grüner-Pfeffer-Soße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">83</span><span className="it-n">MEDAGLIONI FUNGHI</span><span className="it-dots"></span><span className="it-p">17,50 €</span></div><div className="it-d">Schweinemedaillons in frischer Champignon-Rahmsoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">84</span><span className="it-n">MEDAGLIONI PEPE VERDE</span><span className="it-dots"></span><span className="it-p">17,50 €</span></div><div className="it-d">Schweinemedaillons in delikater Pfeffersoße</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "30px"}}>
            <span className="cat-dropcap">P</span>
            <h2 className="cat-title">Pesce</h2>
            <span className="cat-it">Fisch</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">85</span><span className="it-n">CALAMARI FRITTI</span><span className="it-dots"></span><span className="it-p">15,50 €</span></div><div className="it-d">Frittierte Tintenfischringe mit pikanter Remouladensoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">86</span><span className="it-n">SALMONE ALLA GRIGLIA</span><span className="it-dots"></span><span className="it-p">18,50 €</span></div><div className="it-d">Lachsfilet vom Grill, verfeinert mit Knoblauch-Kräuter-Marinade</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">87</span><span className="it-n">SCAMPI ALLA GRIGLIA</span><span className="it-dots"></span><span className="it-p">23,50 €</span></div><div className="it-d">Großgarnelen vom Grill mit Knoblauch und feinen Kräutern</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">88</span><span className="it-n">SCAMPI LIVORNESE</span><span className="it-dots"></span><span className="it-p">24,50 €</span></div><div className="it-d">Großgarnelen in feuriger Tomatensoße mit Oliven, Kapern, Knoblauch, Peperoni</div></div>
            
            <div className="qt">
              <div className="qt-txt">&quot;La qualità non è mai un caso.&quot;</div>
            </div>
          </div>
          
          <div className="fn">Alle Fleisch- und Fischgerichte servieren wir mit Gemüse der Saison und Gourmet-Kartoffeln (Rosmarin-Drillinge) als Beilage. Zu Calamari Fritti reichen wir einen Beilagensalat.</div>
        </div>
        <div className="pg-num">— VII —</div>
      </div>

      {/* SEITE VIII: PIZZA */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">P</span>
            <h2 className="cat-title">Pizza</h2>
            <span className="cat-it">Forno a Legna (∅ 28cm)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">90</span><span className="it-n">PIZZABROT</span><span className="it-dots"></span><span className="it-p">4,00 €</span></div><div className="it-d">Knoblauch oder Olivenöl, Origano</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">91</span><span className="it-n">PIZZA MARGHERITA</span><span className="it-dots"></span><span className="it-p">7,50 €</span></div><div className="it-d">Tomatensoße und Käse</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">92</span><span className="it-n">PIZZA SALAMI</span><span className="it-dots"></span><span className="it-p">8,50 €</span></div><div className="it-d">Mailänder Salami</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">93</span><span className="it-n">PIZZA PROSCIUTTO</span><span className="it-dots"></span><span className="it-p">8,50 €</span></div><div className="it-d">Vorderschinken</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">94</span><span className="it-n">PIZZA FUNGHI</span><span className="it-dots"></span><span className="it-p">8,50 €</span></div><div className="it-d">Frische Champignons</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">95</span><span className="it-n">PIZZA TONNO</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">Thunfisch und Zwiebeln</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">96</span><span className="it-n">PIZZA HAWAII</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">Schinken und Ananas</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">97</span><span className="it-n">PIZZA ITALIA</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">Zwiebeln, frischen Tomaten, Peperoni, Mozzarella und Oregano</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">98</span><span className="it-n">PIZZA CAPRICCIOSA</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">Salami, Schinken und frische Champignons</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">99</span><span className="it-n">PIZZA MILANO</span><span className="it-dots"></span><span className="it-p">9,50 €</span></div><div className="it-d">Salami, Schinken, Champignons und Peperoni</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">100</span><span className="it-n">PIZZA QUATTRO STAGIONI</span><span className="it-dots"></span><span className="it-p">10,00 €</span></div><div className="it-d">Salami, Schinken, Champignons, Paprika</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">101</span><span className="it-n">PIZZA VEGETARIANA</span><span className="it-dots"></span><span className="it-p">10,00 €</span></div><div className="it-d">Verschiedene frische Gemüsesorten der Saison</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">102</span><span className="it-n">PIZZA GYROS</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Zwiebeln, Tzatziki, Gyros</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">103</span><span className="it-n">PIZZA DIAVOLO (scharf!)</span><span className="it-dots"></span><span className="it-p">10,50 €</span></div><div className="it-d">Peperoniwurst, Paprika, Zwiebeln, Knoblauch, Peperoni</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">104</span><span className="it-n">PIZZA PARMA</span><span className="it-dots"></span><span className="it-p">11,50 €</span></div><div className="it-d">Parmaschinken, Rucola, Parmesan</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">105</span><span className="it-n">CALZONE (Gefüllte Pizza)</span><span className="it-dots"></span><span className="it-p">10,00 €</span></div><div className="it-d">Salami, Schinken, frische Champignons, Paprika</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">106</span><span className="it-n">PIZZA SALMONE</span><span className="it-dots"></span><span className="it-p">12,50 €</span></div><div className="it-d">Frischer Lachs, Spinat, Knoblauch, Mozzarella</div></div>
          </div>
          
          <div className="fn">Alle Pizzen (außer Pizzabrot) werden mit Tomatensoße, Gewürzen & Käse belegt. Jede weitere kleine Zutat berechnen wir mit + 1,00 €. Frischer Lachs, Garnelen, Parmaschinken berechnen wir mit + 2,00 €. Extrawünsche sind bei Calzone leider nicht möglich.</div>
          
        </div>
        <div className="pg-num">— VIII —</div>
      </div>

      {/* SEITE IX: FAMIGLIA, LIMONATE, BAMBINI, DOLCI */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr">
            <span className="cat-dropcap">F</span>
            <h2 className="cat-title">Famiglia</h2>
            <span className="cat-it">Familienpizza ca. 40×60 cm (ab 4 Pers.)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">110</span><span className="it-n">FAMILIENPIZZA MARGHERITA</span><span className="it-dots"></span><span className="it-p">20,00 €</span></div><div className="it-d">Tomatensoße, Käse und Kräuter</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">111</span><span className="it-n">MIT EINER ZUTAT</span><span className="it-dots"></span><span className="it-p">23,00 €</span></div><div className="it-d">Salami oder Schinken oder Champignons oder Peperoniwurst</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">112</span><span className="it-n">MIT ZWEI ZUTATEN</span><span className="it-dots"></span><span className="it-p">25,50 €</span></div><div className="it-d">Zwei Zutaten nach Wahl (Standard)</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">113</span><span className="it-n">MIT DREI ZUTATEN</span><span className="it-dots"></span><span className="it-p">28,00 €</span></div><div className="it-d">Drei Zutaten nach Wahl (Standard)</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">114</span><span className="it-n">MIT VIER ZUTATEN</span><span className="it-dots"></span><span className="it-p">30,50 €</span></div><div className="it-d">Vier Zutaten nach Wahl (Standard)</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">115</span><span className="it-n">PIZZA RATSSTUBEN</span><span className="it-dots"></span><span className="it-p">32,50 €</span></div><div className="it-d">Belag nach Art des Hauses</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "15px"}}>
            <span className="cat-dropcap">L</span>
            <h2 className="cat-title">Limonate</h2>
            <span className="cat-it">Limonate Della Casa (Hausgemacht, 0,4L)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">L1</span><span className="it-n">CLASSIC LEMON MINT</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Frischer Zitronensaft, Minze, Sprite, Soda</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">L2</span><span className="it-n">STRAWBERRY BASIL</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div><div className="it-d">Erdbeer-Sirup, frischer Basilikum, Limette, Soda</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">L3</span><span className="it-n">PASSION FRUIT BREEZE</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div><div className="it-d">Maracuja, Limettensaft, Minze, Soda</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">L4</span><span className="it-n">RASPBERRY PEACH</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div><div className="it-d">Pfirsich, Himbeere, Limette, Soda</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "15px"}}>
            <span className="cat-dropcap">B</span>
            <h2 className="cat-title">Bambini</h2>
            <span className="cat-it">Kindergerichte</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">120</span><span className="it-n">PUMUCKL</span><span className="it-dots"></span><span className="it-p">6,00 €</span></div><div className="it-d">Spaghetti in Napoli oder Bolognese</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">121</span><span className="it-n">DUMBO</span><span className="it-dots"></span><span className="it-p">7,50 €</span></div><div className="it-d">Kleines Schnitzel &quot;Wiener Art&quot; mit Pommes</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">122</span><span className="it-n">NEMO</span><span className="it-dots"></span><span className="it-p">7,50 €</span></div><div className="it-d">Fischstäbchen (6 Stück) mit Pommes</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">123</span><span className="it-n">MICKY MAUS</span><span className="it-dots"></span><span className="it-p">7,00 €</span></div><div className="it-d">Kleine Pizza Margherita mit Salami</div></div>
          </div>

          <div className="cat-hdr" style={{marginTop: "15px"}}>
            <span className="cat-dropcap">D</span>
            <h2 className="cat-title">Dolci</h2>
            <span className="cat-it">Desserts</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div className="cat-grid">
            <div className="it"><div className="it-hdr"><span className="it-id">130</span><span className="it-n">TIRAMISU (HAUSGEMACHT)</span><span className="it-dots"></span><span className="it-p">6,00 €</span></div><div className="it-d">Klassisches italienisches Dessert mit Mascarpone</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">131</span><span className="it-n">PANNA COTTA</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Sahnedessert mit Erdbeersoße</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">132</span><span className="it-n">WARMER APFELSTRUDEL</span><span className="it-dots"></span><span className="it-p">6,50 €</span></div><div className="it-d">Mit Vanilleeis und Sahne</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">133</span><span className="it-n">TARTUFO EIS</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div><div className="it-d">Italienische Eisspezialität mit Schokoladenkern</div></div>
            <div className="it"><div className="it-hdr"><span className="it-id">134</span><span className="it-n">GEMISCHTES EIS</span><span className="it-dots"></span><span className="it-p">5,00 €</span></div><div className="it-d">Drei Kugeln Eis nach Wahl (Schoko, Vanille, Erdbeer)</div></div>
          </div>
          
          <div className="cv-est" style={{position: 'relative', bottom: 'auto', marginTop: '20px'}}>
            <span style={{fontSize: '24px'}}>GRAZIE ◆ BUON APPETITO</span>
          </div>

        </div>
        <div className="pg-num">— IX —</div>
      </div>

      {/* SEITE X: BURGER EXPERT */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr" style={{marginTop: "40px", marginBottom: "40px"}}>
            <span className="cat-dropcap">B</span>
            <h2 className="cat-title">Hamburger</h2>
            <span className="cat-it">Della Casa</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          {/* Extended layout, not two columns for expert pages */}
          <div style={{maxWidth: "80%", margin: "0 auto"}}>
            <p className="cv-intro" style={{textAlign: "center", marginBottom: "40px", maxWidth: "100%"}}>
              Unsere Premium Burger werden mit 180g saftigem 100% Rindfleisch zubereitet<br/>und frisch im rustikalen Brioche Bun serviert.<br/>Zu jedem Burger servieren wir knackige Pommes Frites.
            </p>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">60</span><span className="it-n">CLASSIC CHEESEBURGER</span><span className="it-dots"></span><span className="it-p">14,00 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Der zeitlose Klassiker: Saftiges Rindfleisch-Patty überbacken mit irischem Cheddar-Käse, belegt mit frischen Tomatenscheiben, knackigen Gewürzgurken, Lollo Bionda Salat und gerösteten Zwiebeln. Vollendet mit unserer raffinierten hausgemachten Burger-Sauce.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">61</span><span className="it-n">BBQ BACON BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Für Liebhaber rauchiger Aromen: Herzhaftes 100% Rindfleisch-Patty, knusprig gebratene Bacon-Streifen, geschmolzener Cheddar-Käse, Röstzwiebeln und würziger Rucola-Salat. Kräftig abgerundet mit Original amerikanischer BBQ-Sauce.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">63</span><span className="it-n">CHILLI CHEESE BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Temperamentvoll und scharf: Saftiges Rindfleisch mit feurigen Jalapeños, knusprigen Tortilla-Nachos für den extra Crunch und frischem Salat. Gekrönt von einer reichhaltigen, scharfen Chili-Cheese-Sauce und geschmolzenem Cheddar.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">64</span><span className="it-n">GORGONZOLA BURGER</span><span className="it-dots"></span><span className="it-p">14,50 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Italienische Raffinesse trifft auf Burger-Kultur: Unser 180g Rindfleisch-Patty umhüllt von cremig-würzigem Gorgonzola-Blauschimmelkäse dolce. Dazu aromatischer Rucola und eine erfrischende, hausgemachte Joghurt-Mayonnaise.
              </div>
            </div>

            <div className="qt" style={{marginTop: "50px"}}>
              <div className="qt-txt">&quot;Tutti i sapori, una sola passione.&quot;</div>
            </div>
          </div>
        </div>
        <div className="pg-num">— X —</div>
      </div>

      {/* SEITE XI: LIMONATE EXPERT */}
      <div className="page">
        <div className="pg-frame"></div>
        <div className="page-content">
          <div className="cat-hdr" style={{marginTop: "40px", marginBottom: "40px"}}>
            <span className="cat-dropcap">L</span>
            <h2 className="cat-title">Limonate</h2>
            <span className="cat-it">Della Casa (0,4L)</span>
            <div className="cat-sep"><span></span><i>◆</i><span></span></div>
          </div>
          
          <div style={{maxWidth: "80%", margin: "0 auto"}}>
            <p className="cv-intro" style={{textAlign: "center", marginBottom: "40px", maxWidth: "100%"}}>
              Erfrischend anders: Entdecken Sie unsere hausgemachten Limonadenkreationen.<br/>Jedes Glas (0,4L) wird à la minute mit frischen Früchten, Kräutern<br/>und ausgewählten Sirup-Spezialitäten für Sie zubereitet. Ohne Alkohol.
            </p>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">L1</span><span className="it-n">CLASSIC LEMON MINT</span><span className="it-dots"></span><span className="it-p">5,50 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Die traditionelle, erfrischende Symphonie: Frisch gepresster Zitronensaft, milde Rohrzuckersüße und reichlich frische marokkanische Nanaminze, aufbereitet mit Sprite und serviert auf Eis. Der Inbegriff von Erfrischung.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">L2</span><span className="it-n">STRAWBERRY BASIL</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Italienischer Sommer im Glas: Süßer Premium-Erdbeersirup gepaart mit den ätherischen Ölen von frisch gezupftem Basilikum. Abgerundet durch einen Schuss frischer Limette und aufgefüllt mit sprudelndem Sodawasser.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">L3</span><span className="it-n">PASSION FRUIT BREEZE</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Tropische Leichtigkeit: Intensiv-fruchtiges Maracuja-Püree umspielt von säuerlichem Limettensaft und kühlender Minze, leicht gesüßt und herrlich prickelnd. Ein exotischer Urlaub für die Sinne.
              </div>
            </div>

            <div className="it" style={{marginBottom: "30px"}}>
              <div className="it-hdr"><span className="it-id">L4</span><span className="it-n">RASPBERRY PEACH</span><span className="it-dots"></span><span className="it-p">5,90 €</span></div>
              <div className="it-d" style={{marginLeft: "24px", marginRight: "0", fontSize: "15px", lineHeight: "1.6"}}>
                Samtig und beerig: Die feine Süße des Weinbergpfirsichs harmoniert perfekt mit kräftigem Himbeersirup. Ausbalanciert mit frisch gepresster Limette und spritzigem Wasser, garniert mit frischer Minze.
              </div>
            </div>

            <div className="qt" style={{marginTop: "50px", marginBottom: "30px"}}>
              <div className="qt-txt">&quot;La freschezza è un&apos;arte.&quot;</div>
            </div>

            <div className="box" style={{marginTop: "40px", backgroundColor: "transparent", border: "none"}}>
              <div className="box-t">ZUSATZSTOFF-HINWEISE LIMONADEN</div>
              <div className="box-c">
                L1 enthält: Aroma, Säuerungsmittel. L2 enthält: Farbstoff (Carmin), Säuerungsmittel. <br/>
                L3 enthält: Antioxidationsmittel, Aroma. L4 enthält: Farbstoff, Antioxidationsmittel, Aroma.
              </div>
            </div>

          </div>
        </div>
        <div className="pg-num">— XI —</div>
      </div>
      
    </div>
  );
}
