// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v3.0 — NUR SPEISEN (§3.1–§3.12, §3.21)
// Jede Zeile ist zeichengenau aus dem SSOT übernommen.
// Allergen-Codes: NICHT im SSOT enthalten → leere Arrays (§1.9)
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const foodItems: SSOTMenuItem[] = [
  // ─── §3.1 Suppen ────────────────────────────────────────────
  { nr: '10', name: 'Zuppa del Giorno', description: 'Frisch zubereite Tages Suppe nach saisonalem Angebot.', price: 6.90, category: 'suppen', allergens: [] },
  { nr: '11', name: 'Zuppa di Pomodoro', description: 'Fein abgestimmte, cremig verfeinerte Tomatensuppe.', price: 7.90, category: 'suppen', allergens: [] },

  // ─── §3.2 Vorspeisen ───────────────────────────────────────
  { nr: '20', name: 'Bruschetta Classico', description: '4 Geröstete Weißbrotscheiben mit frischen Tomatenwürfel, Zwiebeln, Oliven und Knoblauch, veredelt mit extra nativem Olivenöl. Wahlweise mit überbackenem Mozzarella (+2,00 €).', price: 7.90, category: 'vorspeisen', allergens: [] },
  { nr: '21', name: 'Prosciutto di Parma e Melone', description: 'Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone u. Butter.', price: 12.90, category: 'vorspeisen', allergens: [] },
  { nr: '22', name: 'La Buratta', description: 'Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Genovese-Basilikum Pesto', price: 13.90, category: 'vorspeisen', allergens: [] },
  { nr: '23', name: 'Vitello Tonnato', description: 'Zart rosa gegartes Kalbfleisch, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen & Ei.', price: 14.90, category: 'vorspeisen', allergens: [] },
  { nr: '24', name: 'Carpaccio di Manzo', description: 'hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.', price: 15.90, category: 'vorspeisen', allergens: [] },
  { nr: '25', name: 'Antipasti Misti della Casa', description: 'Eine erlesene Auswahl italienischer Vorspeisenspezialitäten nach Art des Hauses – warm und kalt serviert.', price: 16.90, category: 'vorspeisen', allergens: [] },

  // ─── §3.3 Salate ────────────────────────────────────────────
  { nr: '30', name: 'Insalata Mista', description: 'Kleiner, bunter Salatteller – ideal als Beilage oder Vorspeise.', price: 7.90, category: 'salate', allergens: [] },
  { nr: '31', name: 'Insalata Italia', description: 'Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.', price: 14.90, category: 'salate', allergens: [] },
  { nr: '32', name: 'Insalata di Pollo', description: 'Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, dazu hausgemachtes Joghurtdressing.', price: 16.90, category: 'salate', allergens: [] },
  { nr: '33', name: 'Insalata Salmone e Gamberoni', description: 'Bunter Salatteller mit frischem Lachsfilet und Garnelen serviert mit Balsamico-Kräuter-Vinaigrette.', price: 17.90, category: 'salate', allergens: [] },
  { nr: '34', name: 'Insalata Don Capo', description: 'Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.', price: 19.90, category: 'salate', allergens: [] },
  { nr: '35', name: 'Insalata Frutti di Mare', description: 'Rucolasalat mit köstlich marinierten Meeresfrüchten, Cocktailtomaten und roten Zwiebeln serviert mit Balsamico-Kräuter-Vinaigrette.', price: 16.90, category: 'salate', allergens: [] },

  // ─── §3.4 Pasta ─────────────────────────────────────────────
  { nr: '40', name: 'Spaghetti alla Bolognese', description: 'mit geschmortem Rinderhackfleisch in würziger Tomatensauce, serviert mit frisch geriebenem Parmigiano', price: 12.90, category: 'pasta', allergens: [] },
  { nr: '41', name: 'Original Spaghetti Carbonara', description: 'mit knusprigem Guanciale (Schweinebacke), Ei, grob geschrotetem Pfeffer serviert mit frisch geriebenem Parmigiano', price: 14.90, category: 'pasta', allergens: [] },
  { nr: '42', name: 'Rigatoni alla Puglia', description: 'mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, serviert mit frisch geriebenem Parmigiano', price: 16.90, category: 'pasta', allergens: [] },
  { nr: '43', name: 'Rigatoni \u201ERatsstube\u201C', description: 'mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten-Sahnesauce, serviert mit frisch geriebenem Parmigiano', price: 16.90, category: 'pasta', allergens: [] },
  { nr: '44', name: 'Tagliatelle al Ragù di Verdure', description: 'feine Bandnudeln mit frischem Marktgemüse Ragout in aromatischer Tomatensauce, serviert mit frisch geriebener Parmigiano', price: 14.90, category: 'pasta', allergens: [] },
  { nr: '45', name: 'Tagliatelle Salmone e Gamberoni', description: 'feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses', price: 17.90, category: 'pasta', allergens: [] },
  { nr: '46', name: 'Fettuccine Nero di Seppia con Frutti di Mare', description: 'Feine schwarze Bandnudeln, veredelt mit Tintenfischtinte, serviert mit einer erlesenen Auswahl an Meeresfrüchten in einer aromatischen Tomatensauce, fein abgestimmt mit einem Hauch von Knoblauch.', price: 19.90, category: 'pasta', allergens: [] },
  { nr: '47', name: 'Spaghetti con Pesce Misto e Vino Bianco', description: 'Spaghetti mit einer Auswahl an Edelfischen, sanft gegart in einer Weißwein-Kräutersauce. Empfehlung des Küchenchefs', price: 23.90, category: 'pasta', allergens: [] },

  // ─── §3.5 Aus dem Ofen - Überbackenes (Quell-Nummern: 48, 49, 62) ──────
  { nr: '48', name: 'Pasta Combinazione', description: 'Drei verschiedene Pasta in geschmortes Rinderhackfleisch in aromatische Tomaten Soße überbacken mit Mozzarella.', price: 13.90, category: 'pasta-al-forno', allergens: [] },
  { nr: '49', name: 'Rigatoni al Ragu e Verdure', description: 'mit frischem Marktgemüse Ragout in Cremigen Sahne Soße überbacken mit Mozzarella', price: 15.90, category: 'pasta-al-forno', allergens: [] },


  // ─── §3.6 Hausgemachte Pasta ────────────────────────────────

  { nr: '51', name: 'Tortelacci Burro e Salvia', description: 'Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Butter Salbei geschwenkt Kirsch-Tomaten auf Rucola Salat Bukket und Grana Padano', price: 17.90, category: 'hausgemachte-pasta', allergens: [] },
  { nr: '52', name: 'Tortellacci con Salmone e Gamberoni', description: 'Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Cremigen Soße nach Art des Hauses.', price: 19.90, category: 'hausgemachte-pasta', allergens: [] },
  { nr: '53', name: 'Gnocchi con Gamberoni', description: 'gefüllte Kartoffeln Gnocchi Tomaten, Mozzarella mit gebratenen Garnelen würziger Tomatensoße.', price: 17.90, category: 'hausgemachte-pasta', allergens: [] },
  { nr: '54', name: 'Gnocchi e Basilikum Pesto Genovese con La Buratta', description: 'gefüllte Kartoffeln Gnocchi mit cremigen Buratta Basilikum Pesto Soße.', price: 15.90, category: 'hausgemachte-pasta', allergens: [] },

  // ─── §3.7 Schnitzelvariation ────────────────────────────────
  { nr: '70', name: 'Schnitzel Wiener Art', description: 'mit Zitronenscheiben. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 16.90, category: 'schnitzel', allergens: [] },
  { nr: '71', name: 'Rahm-Schnitzel', description: 'in Cremigen Rahm Soße. Dazu servieren wir Pommes Frites & Salat der Saison', price: 18.90, category: 'schnitzel', allergens: [] },
  { nr: '72', name: 'Jäger-Schnitzel', description: 'mit frischen Champignons in Brauner Soße. Dazu servieren wir Pommes Frites & Salat der Saison', price: 19.90, category: 'schnitzel', allergens: [] },
  { nr: '73', name: 'Pfeffer-Schnitzel', description: 'Mit Grünen Madagaskar-Pfefferkörnern in cremige Rahmsoße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 19.90, category: 'schnitzel', allergens: [] },
  { nr: '74', name: 'Schnitzel Bolognese', description: 'überbacken mit Vorder Schinken u. Käse in geschmorter Rinderhackfleischsoße & Salat der Saison', price: 20.90, category: 'schnitzel', allergens: [] },
  { nr: '74', name: 'Bauern-Schnitzel', description: 'mit knusprig gebratenem Speck & Zwiebeln. Dazu servieren wir Pommes Frites & Salat der Saison', price: 20.90, category: 'schnitzel', allergens: [] },
  { nr: '75', name: 'Schlemmer-Schnitzel', description: 'mit frischem Champignon in Cremige Bernaise Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 21.90, category: 'schnitzel', allergens: [] },
  { nr: '76', name: 'Lindener Rucksack', description: 'gefüllt mit Vorder-Schinken & Mozzarella Käse in frischem Champignon Sahne Soße', price: 22.90, category: 'schnitzel', allergens: [] },

  // ─── §3.8 Fleischgerichte & Fischgerichte ───────────────────
  { nr: '80', name: 'Petto di Pollo alla Griglia', description: 'Hähnchenbrustfilet vom Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 18.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '81', name: 'Petto di Pollo al Pepe Verde', description: 'Hähnchenbrustfilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 20.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '82', name: 'Filetto di Maiale al Pepe Verde', description: 'Schweinefilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 24.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '83', name: 'Filetto di Maiale al Vino Bianco e Limone', description: 'Schweinefilet Medaillons vom Grill in Weißwein, Zitronen Kräuter Knoblauch Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 25.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '84', name: 'Bistecca alla Griglia', description: 'Argent. Rumpsteak vom Lava Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frischem Marktgemüse & Gourmet Kartoffeln.', price: 29.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '85', name: 'Bistecca al Pepe Verde', description: 'Argent. Rumpsteak vom Lava Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln', price: 32.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '86', name: 'Orata con Burro al Limone e Aglio', description: 'Frisches Doraden Filet, geschwenkt in einer feinen Zitronen-Kräuter-Knoblauch-Buttersauce. Dazu servieren wir frisches Marktgemüse u. Gourmet Kartoffeln.', price: 26.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '87', name: 'Salmone alla Griglia salsa all\u0060Arancia e Senape', description: 'Saftiges Lachsfilet aus Norwegen, frisch vom Grill in Cremigen Orangensenf Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 27.90, category: 'fleisch-fisch', allergens: [] },
  { nr: '88', name: 'Filetto di Lucioperca con Guanciale', description: 'Gebratenes Zanderfilet mit Guanciale (Schweinebacke) in Weißwein-Kräutersauce. Dazu servieren wir frisches Marktgemüse u. Gourmet Kartoffeln.', price: 25.90, category: 'fleisch-fisch', allergens: [] },


  // ─── §3.9 Pizza aus dem Steinofen / 28 cm ───────────────────
  { nr: '90', name: 'Pizza Margarita', description: 'Mozzarella Käse & Oregano.', price: 9.50, category: 'pizza', allergens: [] },
  { nr: '91', name: 'Pizza Salame e funghi', description: 'Salami & frischen Champignons.', price: 11.50, category: 'pizza', allergens: [] },
  { nr: '92', name: 'Pizza Regina', description: 'Salami, Vorder-Schinken & frischen Champignons.', price: 12.50, category: 'pizza', allergens: [] },
  { nr: '93', name: 'Pizza Toscana', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln & frischen Champignons.', price: 13.50, category: 'pizza', allergens: [] },
  { nr: '94', name: 'Pizza Ratsstuben', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln, frischen Champignons & Ei.', price: 14.50, category: 'pizza', allergens: [] },
  { nr: '95', name: 'Pizza Hawaii', description: 'Vorder-Schinken & Ananas-Stücken.', price: 11.50, category: 'pizza', allergens: [] },
  { nr: '96', name: 'Pizza Diavolo', description: 'Peperoni Wurst, Peperoni (Scharf), frischen Champignons', price: 12.50, category: 'pizza', allergens: [] },
  { nr: '97', name: 'Pizza Parma e Rucola', description: 'Luftgetrocknete Parma-Schinken, Mariniertem Rucola, gehobeltem Grana Padano.', price: 15.50, category: 'pizza', allergens: [] },
  { nr: '98', name: 'Pizza Amore Mio Talia', description: 'Mozzarella-Käse, frische Champignons, Kirsch-Tomaten & Basilikum.', price: 14.00, category: 'pizza', allergens: [] },
  { nr: '99', name: 'Pizza Tonno', description: 'Saftigem Thunfisch, frische Champignons, Rote-Zwiebeln.', price: 14.00, category: 'pizza', allergens: [] },
  { nr: '100', name: 'Pizza Burrata e Rucola', description: 'Cremige Burrata Käse, mariniertem Rucola Salat & Basilikum Pesto.', price: 16.50, category: 'pizza', allergens: [] },
  { nr: '101', name: 'Pizza Frutti di Mare', description: 'Köstlichem Meeresfrüchte, Kirsch-Tomaten & Knoblauch.', price: 16.50, category: 'pizza', allergens: [] },
  { nr: '102', name: 'Pizza Salmone e Gamberoni', description: 'Lachsfilet aus Norwegen, Garnelen, Kirsch-Tomaten & Knoblauch.', price: 17.00, category: 'pizza', allergens: [] },
  { nr: '103', name: 'Pizza Deluxe', description: 'Hauch dünn geschnittene Kalbsfleisch, Cremige Thunfisch Soße, mariniertem Rucola Salat gehobeltem Grana Padano.', price: 17.00, category: 'pizza', allergens: [] },
  // Nr. 104 fehlt in der Quelle — NICHT auffüllen (SSOT §4.1)
  { nr: '105', name: 'Pizza Vegetale', description: 'Frisch gehobeltem Parmesan mit gegrilltem frisches Marktgemüse.', price: 14.00, category: 'pizza', allergens: [] },
  { nr: '106', name: 'Pizzapane', description: 'Pizzabrot mit Tomaten Soße, Knoblauch & Oregano – Ohne Käse.', price: 6.50, category: 'pizza', allergens: [] },

  // ─── §3.10 Familienpizza aus dem Steinofen / 40 × 60 cm ────
  { nr: '110', name: 'Pizza Margherita', description: 'Mozzarella und Oregano', price: 25.00, category: 'familienpizza', allergens: [] },
  { nr: '111', name: 'Pizza Regina', description: 'Salami, Vorderschinken und frische Champignons', price: 37.00, category: 'familienpizza', allergens: [] },
  { nr: '112', name: 'Pizza Toskana', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons', price: 45.00, category: 'familienpizza', allergens: [] },
  { nr: '113', name: 'Pizza Tonno', description: 'Saftiger Thunfisch, rote Zwiebeln und frische Champignons', price: 45.00, category: 'familienpizza', allergens: [] },
  { nr: '114', name: 'Pizza Parma e Rucola', description: 'Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano', price: 43.00, category: 'familienpizza', allergens: [] },
  { nr: '115', name: 'Pizza Vegetaria', description: 'Gegrilltes frisches Marktgemüse und Oregano', price: 43.50, category: 'familienpizza', allergens: [] },

  // ─── §3.11 Kindergerichte ───────────────────────────────────
  { nr: '120', name: 'Chicken Nuggets', description: '6 Stück Hähnchen-Nuggets mit Pommes frites', price: 8.90, category: 'kindergerichte', allergens: [] },
  { nr: '121', name: 'Rigatoni burro', description: 'Nudeln in Butter geschwenkt.', price: 6.50, category: 'kindergerichte', allergens: [] },
  { nr: '122', name: 'Spaghetti alla Bolognese', description: 'Geschmortes Rinderhackfleisch in Tomatensoße.', price: 8.90, category: 'kindergerichte', allergens: [] },
  { nr: '123', name: 'Kleine Schnitzel Wiener Art', description: 'mit Pommes frites.', price: 9.90, category: 'kindergerichte', allergens: [] },

  // ─── §3.12 Dessert ──────────────────────────────────────────
  { nr: '130', name: 'Tiramisu', description: 'Hausgemachtes Tiramisu nach traditioneller Art.', price: 8.90, category: 'dessert', allergens: [] },
  { nr: '131', name: 'Panna Cotta', description: 'Cremige Panna Cotta mit fruchtiger Erdbeersauce.', price: 7.90, category: 'dessert', allergens: [] },
  { nr: '132', name: 'Tartufo Nero', description: 'Schokolade-Trüffeleis mit Cremige Kern & Sahne.', price: 8.90, category: 'dessert', allergens: [] },
  { nr: '133', name: 'Cassata Siciliana', description: 'Sizilianische Eisspezialität mit kandierten Früchten, serviert mit Erdbeersauce und Sahne.', price: 9.90, category: 'dessert', allergens: [] },
  { nr: '134', name: 'Bourbon-Vanilleeis (je Kugel)', description: 'Feines Bourbon-Vanilleeis mit intensivem Vanillearoma sowie extra Schoko oder Erdbeer Soße', price: 2.50, category: 'dessert', allergens: [] },
  { nr: '135', name: 'Affogato Espresso', description: 'Vanilleeis übergossen mit heißem Espresso.', price: 5.90, category: 'dessert', allergens: [] },

  // ─── §3.13 Saisonale Burger ───────────────────────────────────
  { nr: '1', name: 'Classic Burger', description: 'Saftiges Rindfleisch mit knackigem Salat, eingelegten Gurken, frischen Tomatenscheiben und roten Zwiebeln, verfeinert mit unserer hauseigenen Sauce.', price: 13.90, category: 'saisonal-burger', allergens: [] },
  { nr: '2', name: 'Cheeseburger', description: 'Saftiges Rindfleisch mit geschmolzenem Käse, knackigem Salat, eingelegten Gurken, Tomaten und roten Zwiebeln, abgerundet mit unserer hausgemachten Sauce.', price: 14.90, category: 'saisonal-burger', allergens: [] },
  { nr: '3', name: 'Chili Cheeseburger', description: 'Kräftiges Rindfleisch mit geschmolzenem Mozzarella, pikanten Jalapeños, knackigem Salat, Gurken, Tomaten und roten Zwiebeln, verfeinert mit unserer würzigen Haussauce.', price: 15.90, category: 'saisonal-burger', allergens: [] },
  { nr: '4', name: 'Deluxe Burger', description: 'Saftiges Rindfleisch mit luftgetrocknetem Schinken, frischem Salat, eingelegten Gurken, Tomaten und roten Zwiebeln, veredelt mit unserer exklusiven Haussauce.', price: 16.90, category: 'saisonal-burger', allergens: [] },
];
