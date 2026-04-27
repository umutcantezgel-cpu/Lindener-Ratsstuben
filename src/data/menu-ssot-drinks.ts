// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v3.1 — GETRÄNKE (§3.13–§3.20, §3.22)
// Allergen-/Zusatzstoff-Codes: Ratsstuben-Hausschema (A–P / 1–11)
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const drinkItems: SSOTMenuItem[] = [
  // ─── §3.0 Aperitif ──────────────────────────────────────────
  { nr: '1', name: 'Prosecco DOCG', description: '', price: 6.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '2', name: 'Aperol Spritz', description: 'Prosecco | Aperol | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '3', name: 'Ratsstuben Hasko', description: 'Prosecco | Grenadine | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '4', name: 'Hugo', description: 'Prosecco | Holunderblüten | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '5', name: 'Sarti Spritz', description: 'Prosecco | Passionsfrucht | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '6', name: 'Limoncello Spritz', description: 'Prosecco | Limoncello | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '7', name: 'Campari', description: 'mit Orange oder Soda', price: 7.90, category: 'aperitif', allergens: [], zusatzstoffe: ['1'] },
  { nr: '8', name: 'San Bitterino (alkoholfrei)', description: 'mit Orange oder Soda', price: 6.90, category: 'aperitif', allergens: [], zusatzstoffe: ['1'] },
  { nr: '9', name: 'Martini Bianco', description: '', price: 6.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: [] },

  // ─── §3.13 Warme Getränke ───────────────────────────────────
  { nr: '140', name: 'Espresso', description: '', price: 2.70, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '141', name: 'Espresso Macchiato', description: '', price: 3.20, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '142', name: 'Espresso Coretto Grappa | Sambuca', description: '', price: 4.90, category: 'warme-getraenke', allergens: ['A'], zusatzstoffe: ['10'] },
  { nr: '143', name: 'Espresso Doppio', description: '', price: 4.70, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '144', name: 'Kaffee Crema', description: '', price: 3.20, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '145', name: 'Capuccino', description: '', price: 4.20, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '146', name: 'Milchkaffee', description: '', price: 4.70, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '147', name: 'Latte Macchiato', description: '', price: 4.70, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '148', name: 'Tee -Schwarz, Pfefferminz, Früchte, Kamille-', description: '', price: 3.50, category: 'warme-getraenke', allergens: [], zusatzstoffe: [] },

  // ─── §3.14 Alkoholfreie Getränke ────────────────────────────
  { nr: '150', name: 'Selters Medium 0,25 l', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '151', name: 'Selters Medium 0,75 l', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '152', name: 'Selters Naturell 0,25', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '153', name: 'Selters Naturell 0,75', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '154', name: 'Coca-Cola 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '155', name: 'Coca-Cola 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '156', name: 'Coca-Cola Zero 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10','11'] },
  { nr: '157', name: 'Coca-Cola Zero 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10','11'] },
  { nr: '158', name: 'Fanta 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '159', name: 'Fanta 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '160', name: 'Sprit 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] }, // "Sprit" — SSOT-Schreibweise, NICHT korrigieren
  { nr: '161', name: 'Sprit 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '162', name: 'Spezi 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '163', name: 'Spezi 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '164', name: 'Bitter Lemon 0,2', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '165', name: 'Ginger Ale', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '166', name: 'Trade Island Pfirsich', description: '', price: null, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] }, // {{PREIS FEHLT}}
  { nr: '167', name: 'Apfelsaftschorle 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '168', name: 'Apfelsaftschorle', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },

  // ─── §3.15 Säfte von Vaihinger ──────────────────────────────
  { nr: '170', name: 'Apfelsaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '171', name: 'Apfelsaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '172', name: 'Orangensaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '173', name: 'Orangensaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '174', name: 'Maracuja Saft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '175', name: 'Maracuja Saft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '176', name: 'Johannisbeersaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '177', name: 'Johannisbeersaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Alle Säfte auch als Schorle 0,2', description: '', price: 3.20, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Alle Säfte auch als Schorle 0,4', description: '', price: 5.70, category: 'saefte', allergens: [], zusatzstoffe: [] },

  // ─── §3.16 Biere ────────────────────────────────────────────
  { nr: '180', name: 'Krombacher Pils vom Fass 0,3', description: '', price: 4.00, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '181', name: 'Krombacher Pils vom Fass 0,4', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '182', name: 'Radler 0,3', description: '', price: 3.80, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '183', name: 'Radler 0,4', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '184', name: 'Cola-Bier 0,3', description: '', price: 3.80, category: 'biere', allergens: ['E4'], zusatzstoffe: ['1','10'] },
  { nr: '185', name: 'Cola-Bier 0,4', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: ['1','10'] },
  { nr: '186', name: 'Krombacher Alkoholfreiweizen 0,5', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] },
  { nr: '187', name: 'Starnberger Weizen vom Fass 0,5', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] },
  { nr: '188', name: 'Radler-Weizer 0,5', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] }, // SSOT: "Radler-Weizer" — NICHT korrigieren
  { nr: '189', name: 'Cola-Weizen 0,5', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: ['1','10'] },
  { nr: '188', name: 'Alkoholfrei Pils 0,33 l', description: '', price: 3.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] }, // SSOT: 188 (dupl.)
  { nr: '188', name: 'alkoholfrei Radler 0,4l', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] }, // SSOT: 188 (dupl.) — klein-a im SSOT

  // ─── §3.17 Offene Rotweine ──────────────────────────────────
  { nr: '200', name: 'Primitivo', description: '', price: 8.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '201', name: 'Spätburgunder Finkenauer', description: '', price: 7.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '202', name: 'Valpolicella', description: '', price: 6.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '203', name: 'Lambrusco Perlwein', description: '', price: 5.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },

  // ─── §3.18 Offene Weißweine ─────────────────────────────────
  { nr: '204', name: 'Lugana', description: '', price: 8.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '205', name: 'Pinot Grigio', description: '', price: 7.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '206', name: 'Weißburgender Finkenauer', description: '', price: 6.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] }, // SSOT: "Weißburgender" — NICHT korrigieren
  { nr: '207', name: 'Frizzantino', description: '', price: 5.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '208', name: 'Rose Spätburgunder Finkenauer', description: '', price: 6.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] }, // SSOT: "Rose" ohne Akzent — NICHT korrigieren
  { nr: '209', name: 'Weinschorle - Weiß/Rot/Rose 0,2', description: '', price: 4.40, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] }, // SSOT: Bindestrich, kein Gedankenstrich
  { nr: '210', name: 'Possman Apfelwein-Pur/ Cola/Sprit/Fanta 0,5€', description: '', price: null, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] }, // SSOT: "Possman", Preis in Name eingebettet, price=null

  // ─── §3.19 Spirituosen 0,2 cl ──────────────────────────────
  { nr: '220', name: 'Marsala', description: '', price: 3.70, category: 'spirituosen', allergens: ['A'], zusatzstoffe: [] },
  { nr: '221', name: 'Himbergeist', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '222', name: 'Obstler', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '223', name: 'Ouzo', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '224', name: 'Vecchia Romagne', description: '', price: 5.50, category: 'spirituosen', allergens: ['A'], zusatzstoffe: [] }, // SSOT: "Romagne" — NICHT korrigieren
  { nr: '225', name: 'Haus Grappa', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '226', name: 'Grappa di Prosecco', description: '', price: 6.50, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '227', name: 'Himbergeist', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] }, // Duplikat zu 221 — SSOT §4.5
  { nr: '228', name: 'Obstler', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] }, // Duplikat zu 222 — SSOT §4.5
  { nr: '229', name: 'Malteser', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },

  // ─── §3.20 Liköre 0,2 cl ───────────────────────────────────
  { nr: '230', name: 'Amaretto', description: '', price: 3.70, category: 'likoere', allergens: ['C1'], zusatzstoffe: [] },
  { nr: '231', name: 'Ramazotti', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] }, // SSOT: "Ramazotti", NICHT korrigieren
  { nr: '232', name: 'Averna', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '233', name: 'Fernet Branca', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '234', name: 'Jägermeister', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '235', name: 'Lockstedter', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '236', name: 'Sambuca', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '237', name: 'Bailys', description: '', price: 3.70, category: 'likoere', allergens: ['B'], zusatzstoffe: [] }, // SSOT: "Bailys" — NICHT korrigieren
  { nr: '238', name: 'Limoncello', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },

  // ─── §3.21 Saisonale Limonaden ────────────────────────────────
  { nr: '', name: 'Citrus Mint Limonade', description: 'Erfrischende Zitrusfrüchte treffen auf aromatische Minze – spritzig, belebend und angenehm kühl.', price: 6.90, category: 'saisonal-limonaden', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Grenadine Limonade', description: 'Fruchtig-süß mit einer feinen Note von Granatapfel – ein stilvoller Klassiker mit intensiver Farbe.', price: 6.90, category: 'saisonal-limonaden', allergens: [], zusatzstoffe: ['1'] },
  { nr: '', name: 'Erdbeer Limonade', description: 'Sonnengereifte Erdbeeren sorgen für einen natürlichen, fruchtigen Genuss – mild, süß und herrlich sommerlich.', price: 6.90, category: 'saisonal-limonaden', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Pfirsich Limonade', description: 'Zarter Pfirsichgeschmack, leicht und harmonisch – eine sanfte Erfrischung mit feiner Süße.', price: 6.90, category: 'saisonal-limonaden', allergens: [], zusatzstoffe: [] },
];
