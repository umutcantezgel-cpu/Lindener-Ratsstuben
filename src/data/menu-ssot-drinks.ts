// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v3.1 — GETRÄNKE (§3.13–§3.20, §3.22)
// Allergen-/Zusatzstoff-Codes: Ratsstuben-Hausschema (A–P / 1–11)
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const drinkItems: SSOTMenuItem[] = [
  // ─── §3.0 Aperitif ──────────────────────────────────────────
  { nr: '1', name: 'Prosecco DOCG 0,1 l', description: '', price: 6.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '2', name: 'Aperol Spritz 0,2 l', description: 'Prosecco | Aperol | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '3', name: 'Ratsstuben Hasko 0,2 l', description: 'Prosecco | Grenadine | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '4', name: 'Hugo 0,2 l', description: 'Prosecco | Holunderblüten | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '5', name: 'Sarti Spritz 0,2 l', description: 'Prosecco | Passionsfrucht | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['1','6'] },
  { nr: '6', name: 'Limoncello Spritz 0,2 l', description: 'Prosecco | Limoncello | Sprudel', price: 7.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '7', name: 'Campari 0,2 l', description: 'mit Orange oder Soda', price: 7.90, category: 'aperitif', allergens: [], zusatzstoffe: ['1'] },
  { nr: '8', name: 'San Bitterino (alkoholfrei) 0,2 l', description: 'mit Orange oder Soda', price: 6.90, category: 'aperitif', allergens: [], zusatzstoffe: ['1'] },
  { nr: '9', name: 'Martini Bianco 0,1 l', description: '', price: 6.90, category: 'aperitif', allergens: ['A'], zusatzstoffe: [] },

  // ─── §3.13 Warme Getränke ───────────────────────────────────
  { nr: '140', name: 'Espresso', description: '', price: 2.70, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '141', name: 'Espresso Macchiato', description: '', price: 3.20, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '142', name: 'Espresso Corretto Grappa | Sambuca', description: '', price: 4.90, category: 'warme-getraenke', allergens: ['A'], zusatzstoffe: ['10'] },
  { nr: '143', name: 'Espresso Doppio', description: '', price: 4.70, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '144', name: 'Kaffee Crema', description: '', price: 3.20, category: 'warme-getraenke', allergens: [], zusatzstoffe: ['10'] },
  { nr: '145', name: 'Cappuccino', description: '', price: 4.20, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '146', name: 'Milchkaffee', description: '', price: 4.70, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '147', name: 'Latte Macchiato', description: '', price: 5.00, category: 'warme-getraenke', allergens: ['B'], zusatzstoffe: ['10'] },
  { nr: '148', name: 'Tee (Schwarz, Pfefferminz, Früchte, Kamille)', description: '', price: 3.50, category: 'warme-getraenke', allergens: [], zusatzstoffe: [] },

  // ─── §3.14 Alkoholfreie Getränke ────────────────────────────
  { nr: '150', name: 'Selters Classic 0,25 l', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '151', name: 'Selters Classic 0,75 l', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '152', name: 'Selters Naturell 0,25 l', description: '', price: 3.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '153', name: 'Selters Naturell 0,75 l', description: '', price: 7.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '154', name: 'Coca-Cola 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '155', name: 'Coca-Cola 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '156', name: 'Coca-Cola Zero 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10','11'] },
  { nr: '157', name: 'Coca-Cola Zero 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10','11'] },
  { nr: '158', name: 'Fanta 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '159', name: 'Fanta 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '160', name: 'Sprite 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '161', name: 'Sprite 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '162', name: 'Spezi 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '163', name: 'Spezi 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1','10'] },
  { nr: '164', name: 'Bitter Lemon 0,2 l', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: ['1'] },
  { nr: '165', name: 'Ginger Ale 0,2 l', description: '', price: 3.90, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '166', name: 'Richard\'s Sun Peach 0,33 l', description: '', price: 4.20, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '167', name: 'Apfelsaftschorle 0,3 l', description: '', price: 3.70, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },
  { nr: '168', name: 'Apfelsaftschorle 0,4 l', description: '', price: 4.50, category: 'alkoholfreie-getraenke', allergens: [], zusatzstoffe: [] },

  // ─── §3.15 Säfte von Vaihinger ──────────────────────────────
  { nr: '170', name: 'Apfelsaft 0,2 l', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '171', name: 'Apfelsaft 0,4 l', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '172', name: 'Orangensaft 0,2 l', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '173', name: 'Orangensaft 0,4 l', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '174', name: 'Maracujasaft 0,2 l', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '175', name: 'Maracujasaft 0,4 l', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '176', name: 'Johannisbeersaft 0,2 l', description: '', price: 3.40, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '177', name: 'Johannisbeersaft 0,4 l', description: '', price: 5.90, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Alle Säfte auch als Schorle 0,2 l', description: '', price: 3.20, category: 'saefte', allergens: [], zusatzstoffe: [] },
  { nr: '', name: 'Alle Säfte auch als Schorle 0,4 l', description: '', price: 5.70, category: 'saefte', allergens: [], zusatzstoffe: [] },

  // ─── §3.16 Biere ────────────────────────────────────────────
  { nr: '180', name: 'Krombacher Pils vom Fass 0,3 l', description: '', price: 3.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '181', name: 'Krombacher Pils vom Fass 0,4 l', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '182', name: 'Radler 0,3 l', description: '', price: 3.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '183', name: 'Radler 0,4 l', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '184', name: 'Cola-Bier 0,3 l', description: '', price: 3.90, category: 'biere', allergens: ['E4'], zusatzstoffe: ['1','10'] },
  { nr: '185', name: 'Cola-Bier 0,4 l', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: ['1','10'] },
  { nr: '186', name: 'Krombacher Alkoholfreiweizen 0,5 l', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] },
  { nr: '187', name: 'Starnberger Weizen vom Fass 0,5 l', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] },
  { nr: '188', name: 'Radler-Weizen 0,5 l', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: [] },
  { nr: '189', name: 'Cola-Weizen 0,5 l', description: '', price: 5.40, category: 'biere', allergens: ['E1','E4'], zusatzstoffe: ['1','10'] },
  { nr: '190', name: 'Alkoholfrei Pils 0,33 l', description: '', price: 3.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '191', name: 'Alkoholfrei Radler 0,4 l', description: '', price: 4.90, category: 'biere', allergens: ['E4'], zusatzstoffe: [] },
  { nr: '192', name: 'Possmann Apfelwein (Pur, Cola, Sprite, Fanta) 0,5 l', description: '', price: 5.20, category: 'biere', allergens: ['A'], zusatzstoffe: ['6'] },

  // ─── §3.17 Offene Rotweine ──────────────────────────────────
  { nr: '200', name: 'Primitivo trocken 0,2 l', description: '', price: 8.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '201', name: 'Spätburgunder Finkenauer trocken 0,2 l Nahewein', description: '', price: 7.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '202', name: 'Valpolicella halbtrocken 0,2 l', description: '', price: 6.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '203', name: 'Lambrusco Perlwein Süß 0,2 l', description: '', price: 5.90, category: 'rotweine', allergens: ['A'], zusatzstoffe: ['6'] },

  // ─── §3.18 Offene Weißweine ─────────────────────────────────
  { nr: '204', name: 'Lugana trocken 0,2 l', description: '', price: 8.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '205', name: 'Pinot Grigio halbtrocken 0,2 l', description: '', price: 7.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '206', name: 'Weißburgunder Finkenauer trocken 0,2 l Nahewein', description: '', price: 6.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '207', name: 'Frizzantino Süß 0,2 l', description: '', price: 5.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '208', name: 'Rosé Spätburgunder Finkenauer 0,2 l Nahewein', description: '', price: 6.90, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },
  { nr: '209', name: 'Weinschorle – Weiß/Rot/Rosé 0,2 l', description: '', price: 4.50, category: 'weissweine', allergens: ['A'], zusatzstoffe: ['6'] },


  // ─── §3.19 Spirituosen 2 cl ────────────────────────────────
  { nr: '220', name: 'Marsala 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: ['A'], zusatzstoffe: [] },
  { nr: '221', name: 'Himbeergeist 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '222', name: 'Obstler 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '223', name: 'Ouzo 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '224', name: 'Vecchia Romagna 2 cl', description: '', price: 5.50, category: 'spirituosen', allergens: ['A'], zusatzstoffe: [] },
  { nr: '225', name: 'Hausgrappa 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },
  { nr: '226', name: 'Grappa di Prosecco 2 cl', description: '', price: 6.50, category: 'spirituosen', allergens: [], zusatzstoffe: [] },

  { nr: '229', name: 'Malteser 2 cl', description: '', price: 3.70, category: 'spirituosen', allergens: [], zusatzstoffe: [] },

  // ─── §3.20 Liköre 2 cl ─────────────────────────────────────
  { nr: '230', name: 'Amaretto 2 cl', description: '', price: 3.70, category: 'likoere', allergens: ['C1'], zusatzstoffe: [] },
  { nr: '231', name: 'Ramazzotti 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '232', name: 'Averna 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '233', name: 'Fernet Branca 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '234', name: 'Jägermeister 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '235', name: 'Lockstedter 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '236', name: 'Sambuca 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },
  { nr: '237', name: 'Baileys 2 cl', description: '', price: 3.70, category: 'likoere', allergens: ['B'], zusatzstoffe: [] },
  { nr: '238', name: 'Limoncello 2 cl', description: '', price: 3.70, category: 'likoere', allergens: [], zusatzstoffe: [] },

];
