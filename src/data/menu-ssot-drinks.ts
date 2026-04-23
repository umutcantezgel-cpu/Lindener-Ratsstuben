// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v3.0 — GETRÄNKE (§3.13–§3.20, §3.22)
// Allergen-Codes: NICHT im SSOT enthalten → leere Arrays (§1.9)
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const drinkItems: SSOTMenuItem[] = [
  // ─── §3.13 Warme Getränke ───────────────────────────────────
  { nr: '140', name: 'Espresso', description: '', price: 2.70, category: 'warme-getraenke', allergens: [] },
  { nr: '141', name: 'Espresso Macchiato', description: '', price: 3.20, category: 'warme-getraenke', allergens: [] },
  { nr: '142', name: 'Espresso Coretto Grappa | Sambuca', description: '', price: 4.90, category: 'warme-getraenke', allergens: [] },
  { nr: '143', name: 'Espresso Doppio', description: '', price: 4.70, category: 'warme-getraenke', allergens: [] },
  { nr: '144', name: 'Kaffee Crema', description: '', price: 3.20, category: 'warme-getraenke', allergens: [] },
  { nr: '145', name: 'Capuccino', description: '', price: 4.20, category: 'warme-getraenke', allergens: [] },
  { nr: '146', name: 'Milchkaffee', description: '', price: 4.70, category: 'warme-getraenke', allergens: [] },
  { nr: '147', name: 'Latte Macchiato', description: '', price: 4.70, category: 'warme-getraenke', allergens: [] },
  { nr: '148', name: 'Tee -Schwarz, Pfefferminz, Früchte, Kamille-', description: '', price: 3.50, category: 'warme-getraenke', allergens: [] },

  // ─── §3.14 Alkoholfreie Getränke ────────────────────────────
  { nr: '150', name: 'Selters Medium 0,25 l', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '151', name: 'Selters Medium 0,75 l', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '152', name: 'Selters Naturell 0,25', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '153', name: 'Selters Naturell 0,75', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '154', name: 'Coca-Cola 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '155', name: 'Coca-Cola 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '156', name: 'Coca-Cola Zero 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '157', name: 'Coca-Cola Zero 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '158', name: 'Fanta 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '159', name: 'Fanta 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '160', name: 'Sprit 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] }, // "Sprit" — SSOT-Schreibweise, NICHT korrigieren
  { nr: '161', name: 'Sprit 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '162', name: 'Spezi 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '163', name: 'Spezi 0,4', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '164', name: 'Bitter Lemon 0,2', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '165', name: 'Ginger Ale', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '166', name: 'Trade Island Pfirsich', description: '', price: null, category: 'alkoholfreie-getraenke', allergens: [] }, // {{PREIS FEHLT}}
  { nr: '167', name: 'Apfelsaftschorle 0,3', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [] },
  { nr: '168', name: 'Apfelsaftschorle', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [] },

  // ─── §3.15 Säfte von Vaihinger ──────────────────────────────
  { nr: '170', name: 'Apfelsaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [] },
  { nr: '171', name: 'Apfelsaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [] },
  { nr: '172', name: 'Orangensaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [] },
  { nr: '173', name: 'Orangensaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [] },
  { nr: '174', name: 'Maracuja Saft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [] },
  { nr: '175', name: 'Maracuja Saft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [] },
  { nr: '176', name: 'Johannisbeersaft 0,2', description: '', price: 3.40, category: 'saefte', allergens: [] },
  { nr: '177', name: 'Johannisbeersaft 0,4', description: '', price: 5.90, category: 'saefte', allergens: [] },

  // ─── §3.16 Biere ────────────────────────────────────────────
  { nr: '180', name: 'Krombacher Pils vom Fass 0,3', description: '', price: 4.00, category: 'biere', allergens: [] },
  { nr: '181', name: 'Krombacher Pils vom Fass 0,4', description: '', price: 4.90, category: 'biere', allergens: [] },
  { nr: '182', name: 'Radler 0,3', description: '', price: 3.80, category: 'biere', allergens: [] },
  { nr: '183', name: 'Radler 0,4', description: '', price: 4.90, category: 'biere', allergens: [] },
  { nr: '184', name: 'Cola-Bier 0,3', description: '', price: 3.80, category: 'biere', allergens: [] },
  { nr: '185', name: 'Cola-Bier 0,4', description: '', price: 4.90, category: 'biere', allergens: [] },
  { nr: '186', name: 'Krombacher Alkoholfreiweizen 0,5', description: '', price: 5.40, category: 'biere', allergens: [] },
  { nr: '187', name: 'Starnberger Weizen vom Fass 0,5', description: '', price: 5.40, category: 'biere', allergens: [] },
  { nr: '188', name: 'Radler-Weizer 0,5', description: '', price: 5.40, category: 'biere', allergens: [] }, // SSOT: "Radler-Weizer" — NICHT korrigieren
  { nr: '189', name: 'Cola-Weizen 0,5', description: '', price: 5.40, category: 'biere', allergens: [] },
  { nr: '188', name: 'Alkoholfrei Pils 0,33 l', description: '', price: 3.90, category: 'biere', allergens: [] }, // SSOT: 188 (dupl.)
  { nr: '188', name: 'alkoholfrei Radler 0,4l', description: '', price: 4.90, category: 'biere', allergens: [] }, // SSOT: 188 (dupl.) — klein-a im SSOT

  // ─── §3.17 Offene Rotweine ──────────────────────────────────
  { nr: '200', name: 'Primitivo', description: '', price: 8.90, category: 'rotweine', allergens: [] },
  { nr: '201', name: 'Spätburgunder Finkenauer', description: '', price: 7.90, category: 'rotweine', allergens: [] },
  { nr: '202', name: 'Valpolicella', description: '', price: 6.90, category: 'rotweine', allergens: [] },
  { nr: '203', name: 'Lambrusco Perlwein', description: '', price: 5.90, category: 'rotweine', allergens: [] },

  // ─── §3.18 Offene Weißweine ─────────────────────────────────
  { nr: '204', name: 'Lugana', description: '', price: 8.90, category: 'weissweine', allergens: [] },
  { nr: '205', name: 'Pinot Grigio', description: '', price: 7.90, category: 'weissweine', allergens: [] },
  { nr: '206', name: 'Weißburgender Finkenauer', description: '', price: 6.90, category: 'weissweine', allergens: [] }, // SSOT: "Weißburgender" — NICHT korrigieren
  { nr: '207', name: 'Frizzantino', description: '', price: 5.90, category: 'weissweine', allergens: [] },
  { nr: '208', name: 'Rose Spätburgunder Finkenauer', description: '', price: 6.90, category: 'weissweine', allergens: [] }, // SSOT: "Rose" ohne Akzent — NICHT korrigieren
  { nr: '209', name: 'Weinschorle - Weiß/Rot/Rose 0,2', description: '', price: 4.40, category: 'weissweine', allergens: [] }, // SSOT: Bindestrich, kein Gedankenstrich
  { nr: '210', name: 'Possman Apfelwein-Pur/ Cola/Sprit/Fanta 0,5€', description: '', price: null, category: 'weissweine', allergens: [] }, // SSOT: "Possman", Preis in Name eingebettet, price=null

  // ─── §3.19 Spirituosen 0,2 cl ──────────────────────────────
  { nr: '220', name: 'Marsala', description: '', price: 3.70, category: 'spirituosen', allergens: [] },
  { nr: '221', name: 'Himbergeist', description: '', price: 3.70, category: 'spirituosen', allergens: [] },
  { nr: '222', name: 'Obstler', description: '', price: 3.70, category: 'spirituosen', allergens: [] },
  { nr: '223', name: 'Ouzo', description: '', price: 3.70, category: 'spirituosen', allergens: [] },
  { nr: '224', name: 'Vecchia Romagne', description: '', price: 5.50, category: 'spirituosen', allergens: [] }, // SSOT: "Romagne" — NICHT korrigieren
  { nr: '225', name: 'Haus Grappa', description: '', price: 3.70, category: 'spirituosen', allergens: [] },
  { nr: '226', name: 'Grappa di Prosecco', description: '', price: 6.50, category: 'spirituosen', allergens: [] },
  { nr: '227', name: 'Himbergeist', description: '', price: 3.70, category: 'spirituosen', allergens: [] }, // Duplikat zu 221 — SSOT §4.5
  { nr: '228', name: 'Obstler', description: '', price: 3.70, category: 'spirituosen', allergens: [] }, // Duplikat zu 222 — SSOT §4.5
  { nr: '229', name: 'Malteser', description: '', price: 3.70, category: 'spirituosen', allergens: [] },

  // ─── §3.20 Liköre 0,2 cl ───────────────────────────────────
  { nr: '230', name: 'Amaretto', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '231', name: 'Ramazotti', description: '', price: 3.70, category: 'likoere', allergens: [] }, // SSOT: "Ramazotti", NICHT korrigieren
  { nr: '232', name: 'Averna', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '233', name: 'Fernet Branca', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '234', name: 'Jägermeister', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '235', name: 'Lockstedter', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '236', name: 'Sambuca', description: '', price: 3.70, category: 'likoere', allergens: [] },
  { nr: '237', name: 'Bailys', description: '', price: 3.70, category: 'likoere', allergens: [] }, // SSOT: "Bailys" — NICHT korrigieren
  { nr: '238', name: 'Limoncello', description: '', price: 3.70, category: 'likoere', allergens: [] },

];
