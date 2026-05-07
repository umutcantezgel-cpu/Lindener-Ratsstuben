// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v3.0 — NUR SPEISEN (§3.1–§3.12, §3.21)
// Jede Zeile ist zeichengenau aus dem SSOT übernommen.
// Allergen-Codes: NICHT im SSOT enthalten → leere Arrays (§1.9)
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const foodItems: SSOTMenuItem[] = [
  // ─── §3.1 Suppen ────────────────────────────────────────────
  { nr: '10', name: 'Suppe del Giorno', description: 'Frisch zubereitete Tagessuppe nach saisonalem Angebot.', price: 6.90, category: 'suppen', allergens: ['B','E1','F'], zusatzstoffe: [] },
  { nr: '11', name: 'Suppe di Pomodoro', description: 'Fein abgestimmte, cremig verfeinerte Tomatensuppe.', price: 7.90, category: 'suppen', allergens: ['B','F'], zusatzstoffe: [] },

  // ─── §3.2 Vorspeisen ───────────────────────────────────────
  { nr: '20', name: 'Bruschetta Classico', description: '4 geröstete Weißbrotscheiben mit frischen Tomatenwürfeln, Zwiebeln, Oliven und Knoblauch, veredelt mit extra nativem Olivenöl. Wahlweise mit überbackenem Mozzarella (+2,00 €).', price: 7.90, category: 'vorspeisen', allergens: ['E1'], zusatzstoffe: [] },
  { nr: '21', name: 'Prosciutto di Parma e Melone', description: 'Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone und Butter.', price: 14.90, category: 'vorspeisen', allergens: ['A','B','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '22', name: 'La Burrata', description: 'Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Genovese-Basilikum-Pesto.', price: 13.90, category: 'vorspeisen', allergens: ['A','B','C1','G'], zusatzstoffe: [] },
  { nr: '23', name: 'Vitello Tonnato', description: 'Zart rosa gegartes Kalbfleisch, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen und Ei.', price: 14.90, category: 'vorspeisen', allergens: ['A','B','F','G','I','K'], zusatzstoffe: [] },
  { nr: '24', name: 'Carpaccio di Manzo', description: 'Hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.', price: 15.90, category: 'vorspeisen', allergens: ['A','B','I'], zusatzstoffe: [] },
  { nr: '25', name: 'Antipasti Misti della Casa', description: 'Eine erlesene Auswahl italienischer Vorspeisenspezialitäten nach Art des Hauses – warm und kalt serviert.', price: 17.90, category: 'vorspeisen', allergens: ['A','B','E1','F','G','I','P'], zusatzstoffe: ['1','2','5'] },

  // ─── §3.3 Salate ────────────────────────────────────────────
  { nr: '30', name: 'Insalata Mista', description: 'Kleiner, bunter Salatteller – ideal als Beilage oder Vorspeise. Serviert mit hausgemachtem Joghurtdressing.', price: 7.90, category: 'salate', allergens: ['B','G','I'], zusatzstoffe: [] },
  { nr: '31', name: 'Insalata Italia', description: 'Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.', price: 14.90, category: 'salate', allergens: ['A','B','G','I','K','P'], zusatzstoffe: ['1','2','5'] },
  { nr: '32', name: 'Insalata di Pollo', description: 'Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, dazu hausgemachtes Joghurtdressing.', price: 16.90, category: 'salate', allergens: ['B','G','I'], zusatzstoffe: [] },
  { nr: '33', name: 'Insalata Salmone e Gamberoni', description: 'Bunter Salatteller mit frischem Lachsfilet und Garnelen, serviert mit Balsamico-Kräutervinaigrette.', price: 17.90, category: 'salate', allergens: ['A','G','H','K'], zusatzstoffe: [] },
  { nr: '34', name: 'Insalata Don Capo', description: 'Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.', price: 19.90, category: 'salate', allergens: ['B','G','I'], zusatzstoffe: [] },
  { nr: '35', name: 'Insalata Frutti di Mare', description: 'Rucolasalat mit köstlich marinierten Meeresfrüchten, Kirschtomaten und roten Zwiebeln, serviert mit Balsamico-Kräutervinaigrette.', price: 16.90, category: 'salate', allergens: ['A','G','H','M'], zusatzstoffe: [] },

  // ─── §3.4 Pasta ─────────────────────────────────────────────
  { nr: '40', name: 'Spaghetti\u00A0alla\u00A0Bolognese', description: 'Mit geschmortem Rinderhackfleisch in würziger Tomatensauce, serviert mit frisch geriebenem Parmigiano.', price: 12.90, category: 'pasta', allergens: ['B','E1','F','I'], zusatzstoffe: [] },
  { nr: '41', name: 'Original Spaghetti Carbonara', description: 'Mit knusprigem Guanciale (Schweinebacke), Ei und grob geschrotetem Pfeffer, serviert mit frisch geriebenem Parmigiano.', price: 14.90, category: 'pasta', allergens: ['A','B','E1','I'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '42', name: 'Rigatoni alla Puglia', description: 'Mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, serviert mit frisch geriebenem Parmigiano.', price: 16.90, category: 'pasta', allergens: ['A','B','E1','F','I'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '43', name: 'Rigatoni \u201ERatsstube\u201C', description: 'Mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten-Sahnesauce, serviert mit frisch geriebenem Parmigiano. Empfehlung des Küchenchefs.', price: 17.90, category: 'pasta', allergens: ['B','E1','F','I'], zusatzstoffe: [] },
  { nr: '44', name: 'Tagliatelle al Ragù di Verdure', description: 'Feine Bandnudeln mit frischem Marktgemüse-Ragout in aromatischer Tomatensauce, serviert mit frisch geriebenem Parmigiano.', price: 14.90, category: 'pasta', allergens: ['B','E1','F','I'], zusatzstoffe: [] },
  { nr: '45', name: 'Tagliatelle Salmone e Gamberoni', description: 'Feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses.', price: 17.90, category: 'pasta', allergens: ['B','E1','H','I','K'], zusatzstoffe: [] },
  { nr: '46', name: 'Fettuccine Nero di Seppia con Frutti di Mare', description: 'Feine schwarze Bandnudeln, veredelt mit Tintenfischtinte, serviert mit einer erlesenen Auswahl an Meeresfrüchten in einer aromatischen Tomatensauce, fein abgestimmt mit einem Hauch von Knoblauch.', price: 19.90, category: 'pasta', allergens: ['E1','F','H','I','M'], zusatzstoffe: ['7'] },
  { nr: '47', name: 'Spaghetti con Pesce Misto e Vino Bianco', description: 'Spaghetti mit einer Auswahl an Edelfischen, sanft gegart in einer Weißwein-Kräutersauce. Empfehlung des Küchenchefs.', price: 23.90, category: 'pasta', allergens: ['A','B','E1','K'], zusatzstoffe: [] },

  // ─── §3.5 Aus dem Ofen - Überbackenes (Quell-Nummern: 48, 49, 62) ──────
  { nr: '48', name: 'Pasta Combinazione', description: 'Drei verschiedene Pasta-Sorten mit geschmortem Rinderhackfleisch in aromatischer Tomatensauce, überbacken mit Mozzarella.', price: 16.90, category: 'pasta-al-forno', allergens: ['B','E1','F','I'], zusatzstoffe: [] },
  { nr: '49', name: 'Rigatoni al Ragù e Verdure', description: 'Mit frischem Marktgemüse-Ragout in cremiger Sahnesauce, überbacken mit Mozzarella.', price: 15.90, category: 'pasta-al-forno', allergens: ['B','E1','F'], zusatzstoffe: [] },


  // ─── §3.6 Hausgemachte Pasta ────────────────────────────────

  { nr: '50', name: 'Tortelacci Burro e Salvia', description: 'Hausgemachte Riesen-Tortellacci, gefüllt mit Ricotta und Spinat, in Butter-Salbei geschwenkt, mit Kirschtomaten auf Rucola-Salat-Bouquet und Grana Padano.', price: 17.90, category: 'hausgemachte-pasta', allergens: ['B','E1','I'], zusatzstoffe: [] },
  { nr: '51', name: 'Tortellacci con Salmone e Gamberoni', description: 'Hausgemachte Riesen-Tortellacci, gefüllt mit Ricotta und Spinat, in cremiger Sauce nach Art des Hauses.', price: 19.90, category: 'hausgemachte-pasta', allergens: ['B','E1','H','I','K'], zusatzstoffe: [] },
  { nr: '52', name: 'Gnocchi\u00A0con\u00A0Gamberoni', description: 'Gnocchi, gefüllt mit Tomaten und Mozzarella, mit gebratenen Garnelen in würziger Tomatensauce.', price: 18.90, category: 'hausgemachte-pasta', allergens: ['B','E1','F','H','I'], zusatzstoffe: [] },
  { nr: '53', name: 'Gnocchi e Basilikum Pesto Genovese con La Burrata', description: 'Gnocchi, gefüllt mit Tomaten und Mozzarella, in cremiger Burrata-Basilikum-Pesto-Sauce.', price: 17.90, category: 'hausgemachte-pasta', allergens: ['B','C1','E1','I'], zusatzstoffe: [] },

  // ─── §3.7 Schnitzelvariation ────────────────────────────────
  { nr: '60', name: 'Schnitzel Wiener Art', description: 'Mit Zitronenscheiben. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 16.90, category: 'schnitzel', allergens: ['B','E1','G','I'], zusatzstoffe: [] },
  { nr: '61', name: 'Rahm-Schnitzel', description: 'In cremiger Rahmsauce. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 18.90, category: 'schnitzel', allergens: ['B','E1','F','G','I'], zusatzstoffe: [] },
  { nr: '62', name: 'Jäger-Schnitzel', description: 'Mit frischen Champignons in brauner Sauce. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 19.90, category: 'schnitzel', allergens: ['B','E1','F','G','I'], zusatzstoffe: [] },
  { nr: '63', name: 'Pfeffer-Schnitzel', description: 'Mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsauce. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 19.90, category: 'schnitzel', allergens: ['B','E1','F','G','I'], zusatzstoffe: [] },
  { nr: '64', name: 'Schnitzel Bolognese', description: 'Überbacken mit Vorderschinken und Käse in geschmorter Rinderhackfleischsauce. Dazu servieren wir einen Salat der Saison.', price: 20.90, category: 'schnitzel', allergens: ['A','B','E1','F','G','I','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '65', name: 'Bauern\u2011Schnitzel', description: 'Mit knusprig gebratenem Speck und Zwiebeln. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 20.90, category: 'schnitzel', allergens: ['A','B','E1','G','I'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '66', name: 'Schlemmer-Schnitzel', description: 'Mit frischen Champignons in cremiger Béarnaise-Sauce. Dazu servieren wir Pommes frites und einen Salat der Saison.', price: 21.90, category: 'schnitzel', allergens: ['B','E1','G','I'], zusatzstoffe: [] },
  { nr: '67', name: 'Lindener Rucksack', description: 'Gefüllt mit Vorderschinken und Mozzarella in frischer Champignon-Sahnesauce.', price: 22.90, category: 'schnitzel', allergens: ['A','B','E1','G','I','P'], zusatzstoffe: ['1','2','3','5'] },

  // ─── §3.8 Fleischgerichte & Fischgerichte ───────────────────
  { nr: '70', name: 'Petto di Pollo alla Griglia', description: 'Hähnchenbrustfilet vom Grill mit hausgemachter Kräuterbutter und Zitronenscheibe. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 18.90, category: 'fleisch-fisch', allergens: ['B'], zusatzstoffe: [] },
  { nr: '71', name: 'Petto di Pollo al Pepe Verde', description: 'Hähnchenbrustfilet vom Grill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 20.90, category: 'fleisch-fisch', allergens: ['A','B','F'], zusatzstoffe: [] },
  { nr: '72', name: 'Filetto di Maiale al Pepe Verde', description: 'Schweinefilet-Medaillons vom Grill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 24.90, category: 'fleisch-fisch', allergens: ['A','B','F'], zusatzstoffe: [] },
  { nr: '73', name: 'Filetto di Maiale al Vino Bianco e Limone', description: 'Schweinefilet-Medaillons vom Grill in Weißwein-Zitronen-Kräuter-Knoblauch-Sauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 25.90, category: 'fleisch-fisch', allergens: ['A','B'], zusatzstoffe: [] },
  { nr: '74', name: 'Bistecca alla Griglia', description: 'Argentinisches Rumpsteak vom Lavagrill mit hausgemachter Kräuterbutter und Zitronenscheibe. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 29.90, category: 'fleisch-fisch', allergens: ['B'], zusatzstoffe: [] },
  { nr: '75', name: 'Bistecca al Pepe Verde', description: 'Argentinisches Rumpsteak vom Lavagrill mit grünen Madagaskar-Pfefferkörnern in cremiger Rahmsauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 32.90, category: 'fleisch-fisch', allergens: ['A','B','F'], zusatzstoffe: [] },
  { nr: '80', name: 'Orata con Burro al Limone e Aglio', description: 'Frisches Doradenfilet, geschwenkt in einer feinen Zitronen-Kräuter-Knoblauch-Buttersauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 26.90, category: 'fleisch-fisch', allergens: ['B','K'], zusatzstoffe: [] },
  { nr: '81', name: 'Salmone alla Griglia salsa all\u2019Arancia e Senape', description: 'Saftiges Lachsfilet aus Norwegen, frisch vom Grill in cremiger Orangensenfsauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 27.90, category: 'fleisch-fisch', allergens: ['B','G','K'], zusatzstoffe: [] },
  { nr: '82', name: 'Filetto di Lucioperca con Guanciale', description: 'Gebratenes Zanderfilet mit Guanciale (Schweinebacke) in Weißwein-Kräutersauce. Dazu servieren wir frisches Marktgemüse und Gourmet-Kartoffeln.', price: 25.90, category: 'fleisch-fisch', allergens: ['A','B','K'], zusatzstoffe: ['1','2','3','5'] },


  // ─── §3.9 Pizza aus dem Steinofen / 28 cm ───────────────────
  { nr: '90', name: 'Pizza Margherita', description: 'Mozzarella und Oregano.', price: 9.50, category: 'pizza', allergens: ['B','E1','F'], zusatzstoffe: [] },
  { nr: '91', name: 'Pizza\u00A0Salame\u00A0e\u00A0Funghi', description: 'Salami und frische Champignons.', price: 11.50, category: 'pizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','5'] },
  { nr: '92', name: 'Pizza Regina', description: 'Salami, Vorderschinken und frische Champignons.', price: 12.50, category: 'pizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '93', name: 'Pizza Toscana', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons.', price: 13.50, category: 'pizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '94', name: 'Pizza\u00A0Ratsstuben', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln, frische Champignons und Ei.', price: 14.50, category: 'pizza', allergens: ['A','B','E1','F','G','I','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '95', name: 'Pizza Hawaii', description: 'Vorderschinken und Ananasstücke.', price: 11.50, category: 'pizza', allergens: ['A','B','E1','F','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '96', name: 'Pizza Diavolo', description: 'Peperoniwurst, scharfe Peperoni und frische Champignons.', price: 12.50, category: 'pizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','5'] },
  { nr: '97', name: 'Pizza\u00A0Parma\u00A0e\u00A0Rucola', description: 'Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano.', price: 15.50, category: 'pizza', allergens: ['A','B','E1','F','I','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '98', name: 'Pizza Amore Mio Italia', description: 'Mozzarella, frische Champignons, Kirschtomaten und Basilikum.', price: 14.00, category: 'pizza', allergens: ['B','E1','F'], zusatzstoffe: [] },
  { nr: '99', name: 'Pizza Tonno', description: 'Saftiger Thunfisch, frische Champignons und rote Zwiebeln.', price: 14.00, category: 'pizza', allergens: ['B','E1','F','K'], zusatzstoffe: [] },
  { nr: '100', name: 'Pizza\u00A0Burrata\u00A0e\u00A0Rucola', description: 'Cremige Burrata, marinierter Rucola und Basilikum-Pesto.', price: 16.50, category: 'pizza', allergens: ['B','C1','E1','F'], zusatzstoffe: [] },
  { nr: '101', name: 'Pizza Frutti di Mare', description: 'Köstliche Meeresfrüchte, Kirschtomaten und Knoblauch.', price: 16.50, category: 'pizza', allergens: ['B','E1','F','H','M'], zusatzstoffe: [] },
  { nr: '102', name: 'Pizza\u00A0Salmone\u00A0e\u00A0Gamberoni', description: 'Lachsfilet aus Norwegen, Garnelen, Kirschtomaten und Knoblauch.', price: 17.00, category: 'pizza', allergens: ['B','E1','F','H','K'], zusatzstoffe: [] },
  { nr: '103', name: 'Pizza Deluxe', description: 'Hauchdünn geschnittenes Kalbfleisch, cremige Thunfischsauce, marinierter Rucola und gehobelter Grana Padano.', price: 17.00, category: 'pizza', allergens: ['A','B','E1','F','G','I','K'], zusatzstoffe: [] },
  // Nr. 104 fehlt in der Quelle — NICHT auffüllen (SSOT §4.1)
  { nr: '105', name: 'Pizza Vegetale', description: 'Frisch gehobelter Parmesan mit gegrilltem, frischem Marktgemüse.', price: 14.00, category: 'pizza', allergens: ['B','E1','F'], zusatzstoffe: [] },
  { nr: '106', name: 'Pizzapane', description: 'Pizzabrot mit Tomatensauce, Knoblauch und Oregano – ohne Käse.', price: 6.50, category: 'pizza', allergens: ['E1','F'], zusatzstoffe: [] },

  // ─── §3.10 Familienpizza aus dem Steinofen / 40 × 60 cm ────
  { nr: '110', name: 'Pizza Margherita', description: 'Mozzarella und Oregano.', price: 25.00, category: 'familienpizza', allergens: ['B','E1','F'], zusatzstoffe: [] },
  { nr: '111', name: 'Pizza Regina', description: 'Salami, Vorderschinken und frische Champignons.', price: 37.00, category: 'familienpizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '112', name: 'Pizza Toskana', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons.', price: 45.00, category: 'familienpizza', allergens: ['A','B','E1','F','G','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '113', name: 'Pizza Tonno', description: 'Saftiger Thunfisch, rote Zwiebeln und frische Champignons.', price: 45.00, category: 'familienpizza', allergens: ['B','E1','F','K'], zusatzstoffe: [] },
  { nr: '114', name: 'Pizza\u00A0Parma\u00A0e\u00A0Rucola', description: 'Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano.', price: 43.00, category: 'familienpizza', allergens: ['A','B','E1','F','I','P'], zusatzstoffe: ['1','2','3','5'] },
  { nr: '115', name: 'Pizza Vegetaria', description: 'Gegrilltes, frisches Marktgemüse und Oregano.', price: 43.50, category: 'familienpizza', allergens: ['B','E1','F'], zusatzstoffe: [] },

  // ─── §3.11 Kindergerichte ───────────────────────────────────
  { nr: '120', name: 'Chicken Nuggets', description: '6 Stück Hähnchen-Nuggets mit Pommes frites.', price: 8.90, category: 'kindergerichte', allergens: ['B','E1','I'], zusatzstoffe: [] },
  { nr: '121', name: 'Rigatoni burro', description: 'Nudeln, in Butter geschwenkt.', price: 6.50, category: 'kindergerichte', allergens: ['B','E1'], zusatzstoffe: [] },
  { nr: '122', name: 'Spaghetti\u00A0alla\u00A0Bolognese', description: 'Geschmortes Rinderhackfleisch in Tomatensauce.', price: 8.90, category: 'kindergerichte', allergens: ['B','E1','F','I'], zusatzstoffe: [] },
  { nr: '123', name: 'Kleines Schnitzel Wiener Art', description: 'Mit Pommes frites.', price: 9.90, category: 'kindergerichte', allergens: ['B','E1','G','I'], zusatzstoffe: [] },
  { nr: '124', name: 'Kinder Margherita', description: 'Kleine Pizza mit Tomatensoße und Käse.', price: 8.50, category: 'kindergerichte', allergens: ['B','E1'], zusatzstoffe: [] },

  // ─── §3.12 Dessert ──────────────────────────────────────────
  { nr: '130', name: 'Tiramisu', description: 'Hausgemachtes Tiramisu nach traditioneller Art.', price: 8.90, category: 'dessert', allergens: ['A','B','E1','I'], zusatzstoffe: ['10'] },
  { nr: '131', name: 'Panna Cotta', description: 'Cremige Panna Cotta mit fruchtiger Erdbeersauce.', price: 7.90, category: 'dessert', allergens: ['B'], zusatzstoffe: [] },
  { nr: '132', name: 'Tartufo Nero', description: 'Schokoladen-Trüffeleis mit cremigem Kern und Sahne.', price: 8.90, category: 'dessert', allergens: ['B','C4','I','P'], zusatzstoffe: [] },
  { nr: '133', name: 'Cassata Siciliana', description: 'Sizilianische Eisspezialität mit kandierten Früchten, serviert mit Erdbeersauce und Sahne.', price: 9.90, category: 'dessert', allergens: ['A','B','C1','E1','I','P'], zusatzstoffe: ['2','6'] },
  { nr: '134', name: 'Bourbon-Vanilleeis (je Kugel)', description: 'Feines Bourbon-Vanilleeis mit intensivem Vanillearoma, wahlweise mit Schoko- oder Erdbeersauce.', price: 2.50, category: 'dessert', allergens: ['B','I','P'], zusatzstoffe: [] },
  { nr: '135', name: 'Affogato Espresso', description: 'Vanilleeis, übergossen mit heißem Espresso.', price: 5.90, category: 'dessert', allergens: ['B','I'], zusatzstoffe: ['10'] },

];
