// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v2.0 — NUR SPEISEN (§3.1–§3.12)
// Jede Zeile ist zeichengenau aus dem SSOT übernommen.
// Allergen-Codes: Heuristisch gemappt (NLP) — VERIFIED: false
// Finale Verifizierung durch Küchenchef erforderlich.
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const foodItems: SSOTMenuItem[] = [
  // §3.1 Suppen
  { nr: '10', name: 'Tagessuppe', description: 'Frisch zubereitet nach saisonalem Angebot.', price: 6.90, category: 'suppen', allergens: ['A', 'L'] },
  { nr: '11', name: 'Tomatencremesuppe', description: 'Fein abgestimmte, cremig verfeinerte Tomatensuppe.', price: 7.90, category: 'suppen', allergens: ['A', 'G', 'L'] },
  // §3.2 Vorspeisen
  { nr: '20', name: 'Bruschetta classico', description: '4 Geröstete Weißbrotscheiben mit frischen Tomatenwürfeln, Zwiebeln, Oliven und Knoblauch, veredelt mit extra nativem Olivenöl. Wahlweise mit überbackenem Mozzarella (+2,00 €).', price: 7.90, category: 'vorspeisen', allergens: ['A'] },
  { nr: '21', name: 'Parmaschinken mit Melone', description: 'Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone u. Butter.', price: 12.90, category: 'vorspeisen', allergens: ['O'] },
  { nr: '22', name: 'La Burrata', description: 'Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Basilikum-Pesto.', price: 13.90, category: 'vorspeisen', allergens: ['G', 'H', 'O'] },
  { nr: '23', name: 'Vitello Tonnato', description: 'Zart rosa gegartes Kalbfleisch mit Thunfischsauce, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen & Ei.', price: 14.90, category: 'vorspeisen', allergens: ['C', 'D', 'G', 'L', 'O'] },
  { nr: '24', name: 'Rindercarpaccio', description: 'Hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.', price: 15.90, category: 'vorspeisen', allergens: ['C', 'G'] },
  { nr: '25', name: 'Gemischte Vorspeisen nach Art des Hauses', description: 'Auch als stilvolle Antipasti Platten für mehrere Personen erhältlich. Pro Person 13,90 €.', price: 16.90, category: 'vorspeisen', allergens: ['A', 'C', 'D', 'G', 'O'] },
  // §3.3 Salate
  { nr: '30', name: 'Gemischter Salat', description: 'Kleiner, bunter Salatteller – ideal als Beilage oder Vorspeise.', price: 7.90, category: 'salate', allergens: ['M', 'O'] },
  { nr: '31', name: 'Italienischer Salat', description: 'Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.', price: 14.90, category: 'salate', allergens: ['C', 'D', 'G', 'M', 'O'] },
  { nr: '32', name: 'Italienischer Salat (klein)', description: 'Wahlweise als Vorspeise oder Beilage.', price: 10.90, category: 'salate', allergens: ['C', 'D', 'G', 'M', 'O'] },
  { nr: '33', name: 'Meeresfrüchtesalat', description: 'Rucolasalat mit köstlich marinierten Meeresfrüchten, Cocktailtomaten und roten Zwiebeln in Balsamico-Kräuter-Vinaigrette.', price: 16.90, category: 'salate', allergens: ['B', 'M', 'O', 'R'] },
  { nr: '34', name: 'Hähnchensalat', description: 'Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, serviert mit hausgemachtem Joghurtdressing.', price: 16.90, category: 'salate', allergens: ['G', 'M', 'O'] },
  { nr: '35', name: 'Lachs- und Garnelensalat', description: 'Bunter Salatteller mit frischem Lachsfilet und Garnelen in Balsamico-Kräuter-Vinaigrette.', price: 17.90, category: 'salate', allergens: ['B', 'D', 'M', 'O'] },
  { nr: '36', name: 'Don Cape', description: 'Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.', price: 19.90, category: 'salate', allergens: ['C', 'G', 'M', 'O'] },
  // §3.4 Pasta
  { nr: '40', name: 'Spaghetti Bolognese', description: 'Mit geschmortem Rinderhackfleisch in würziger Tomatensauce, serviert mit frisch geriebenem Parmigiano.', price: 12.90, category: 'pasta', allergens: ['A', 'C', 'G', 'L'] },
  { nr: '41', name: 'Spaghetti Carbonara', description: 'Mit knusprigem Guanciale (Schweinebacke), Ei, grob geschrotetem Pfeffer und frisch geriebenem Parmigiano.', price: 14.90, category: 'pasta', allergens: ['A', 'C', 'G'] },
  { nr: '42', name: 'Rigatoni alla Puylia', description: 'Mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, frisch mit geriebenem Parmigiano.', price: 16.90, category: 'pasta', allergens: ['A', 'G'] },
  { nr: '43', name: 'Rigatoni „Ratsstube"', description: 'Mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten Sahnesauce, serviert Parmigiano. u. frisch geriebenem Parmigine.', price: 16.90, category: 'pasta', allergens: ['A', 'G'] },
  { nr: '44', name: 'Bandnudeln mit Gemüse Ragout', description: 'Feine Bandnudeln mit frischem Marktgemüse Ragout in aromatischer Tomatensauce, dazu frisch geriebener Parmigiano.', price: 14.90, category: 'pasta', allergens: ['A', 'G', 'L'] },
  { nr: '45', name: 'Bandnudeln mit Lachs und Garnelen', description: 'Feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses.', price: 17.90, category: 'pasta', allergens: ['A', 'B', 'D', 'G'] },
  { nr: '46', name: 'Linguine mit Meeresfrüchten', description: 'Flache Pasta mit erlesenen Meeresfrüchten in aromatischer Tomatensauce mit feiner Knoblauchnote.', price: 18.90, category: 'pasta', allergens: ['A', 'B', 'G', 'R'] },
  { nr: '47', name: 'Linguine mit Edelfisch nach Art des Hauses', description: 'Flache Pasta mit ausgewähltem Edelfisch in feiner Weißwein-Kräutersauce. Empfehlung des Küchenchefs.', price: 22.90, category: 'pasta', allergens: ['A', 'D', 'G', 'O'] },
  // §3.5 Pasta al Forno (Quell-Nummern: 48, 49, 62 — NICHT 60-64)
  { nr: '48', name: 'Nudel-Kombination', description: 'Drei verschiedene Pasta in geschmortes Rinderhackfleisch in aromatische Tomaten Soße überbacken mit Mozzarella.', price: 14.90, category: 'pasta-al-forno', allergens: ['A', 'G', 'L'] },
  { nr: '49', name: 'Rigatoni mit Gemüse-Ragout', description: 'Mit frischem Marktgemüse Ragout in Cremigen Sahne Soße überbacken mit Mozzarella.', price: 15.90, category: 'pasta-al-forno', allergens: ['A', 'G', 'L'] },

  // §3.6 Hausgemachte Pasta

  { nr: '51', name: 'Tortellacci mit Butter und Salbei', description: 'Hausgemachte Riesen-Tortellacci gefüllt mit Ricotta und Spinat, in Butter-Salbei geschwenkt mit Kirschtomaten auf Rucolasalat und Grana Padano.', price: 17.90, category: 'hausgemachte-pasta', allergens: ['A', 'C', 'G'] },
  { nr: '52', name: 'Tortellacci mit Lachs und Garnelen', description: 'Hausgemachte Riesen-Tortellacci gefüllt mit Ricotta und Spinat in cremiger Sauce nach Art des Hauses.', price: 19.90, category: 'hausgemachte-pasta', allergens: ['A', 'B', 'C', 'D', 'G'] },
  { nr: '53', name: 'Gnocchi mit Garnelen', description: 'Gefüllte Kartoffel-Gnocchi mit Tomaten und Mozzarella, gebratenen Garnelen in würziger Tomatensoße.', price: 17.90, category: 'hausgemachte-pasta', allergens: ['A', 'B', 'G'] },
  { nr: '54', name: 'Gnocchi mit Basilikumpesto und Burrata', description: 'Gefüllte Kartoffel Gnocchi mit cremiger Burrata und Basilikum Pestosoße.', price: 15.90, category: 'hausgemachte-pasta', allergens: ['A', 'G', 'H'] },
  // §3.7 Schnitzelvariation
  { nr: '70', name: 'Schnitzel Wiener Art', description: 'Mit Zitronenscheiben. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 16.90, category: 'schnitzel', allergens: ['A', 'C'] },
  { nr: '71', name: 'Rahm-Schnitzel', description: 'In Cremigen Rahm Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 18.90, category: 'schnitzel', allergens: ['A', 'C', 'G'] },
  { nr: '72', name: 'Jäger-Schnitzel', description: 'Mit frischen Champignons in Brauner Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 19.90, category: 'schnitzel', allergens: ['A', 'C', 'L'] },
  { nr: '73', name: 'Pfeffer-Schnitzel', description: 'Mit Grünen Madagaskar-Pfefferkörnern in cremige Rahmsoße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 19.90, category: 'schnitzel', allergens: ['A', 'C', 'G'] },
  { nr: '74', name: 'Bauern-Schnitzel', description: 'Mit knusprig gebratenem Speck & Zwiebeln. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 20.90, category: 'schnitzel', allergens: ['A', 'C'] },
  { nr: '75', name: 'Schlemmer Schnitzel', description: 'Mit frischem Champignon in Cremige Bernaise Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 21.90, category: 'schnitzel', allergens: ['A', 'C', 'G', 'M'] },
  { nr: '76', name: 'Lindener Rucksack', description: 'Gefüllt mit Vorder-Schinken & Mozzarella Käse in frischem Champignon Sahne Soße.', price: 22.90, category: 'schnitzel', allergens: ['A', 'C', 'G'] },
  // §3.8 Fleischgerichte & Fischgerichte
  { nr: '80', name: 'Gegrilltes Hähnchenbrustfilet', description: 'Hähnchenbrustfilet vom Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 18.90, category: 'fleisch-fisch', allergens: ['G'] },
  { nr: '81', name: 'Hähnchenbrustfilet in grüner Pfeffersauce', description: 'Hähnchenbrustfilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 20.90, category: 'fleisch-fisch', allergens: ['G'] },
  { nr: '82', name: 'Schweinefilet in grüner Pfeffersauce', description: 'Schweinefilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 24.90, category: 'fleisch-fisch', allergens: ['G'] },
  { nr: '83', name: 'Schweinefilet in Weißwein-Zitronensauce', description: 'Schweinefilet Medaillons vom Grill in Weißwein, Zitronen Kräuter Knoblauch Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 25.90, category: 'fleisch-fisch', allergens: ['G', 'O'] },
  { nr: '84', name: 'Gegrilltes Rumpsteak', description: 'Argent. Rumpsteak vom Lava Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frischem Marktgemüse & Gourmet Kartoffeln.', price: 29.90, category: 'fleisch-fisch', allergens: ['G'] },
  { nr: '85', name: 'Rumpsteak in grüner Pfeffersauce', description: 'Argent. Rumpsteak vom Lava Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 32.90, category: 'fleisch-fisch', allergens: ['G'] },
  { nr: '86', name: 'Doradenfilet in Zitronen-Knoblauchbutter', description: 'Frisches Doraden Filet, geschwenkt in einer feinen Zitronen-Kräuter-Knoblauch-Buttersauce. Dazu servieren wir knackiges Marktgemüse und goldbraune Gourmetkartoffeln.', price: 26.90, category: 'fleisch-fisch', allergens: ['D', 'G'] },
  { nr: '87', name: 'Gegrilltes Lachsfilet in Orangen-Senfsauce', description: 'Saftiges Lachsfilet aus Norwegen, frisch vom Grill in Cremigen Orangensenf Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 27.90, category: 'fleisch-fisch', allergens: ['D', 'G', 'M'] },
  // §3.9 Pizza aus dem Steinofen / 28 cm
  { nr: '90', name: 'Pizza Margherita', description: 'Mozzarella Käse & Oregano.', price: 9.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '91', name: 'Pizza Salami und Champignons', description: 'Salami & frischen Champignons.', price: 11.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '92', name: 'Pizza Regina', description: 'Salami, Vorder-Schinken & frischen Champignons.', price: 12.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '93', name: 'Pizza Toscana', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln & frischen Champignons.', price: 13.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '94', name: 'Pizza Ratsstuben', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln, frischen Champignons & Ei.', price: 14.50, category: 'pizza', allergens: ['A', 'C', 'G'] },
  { nr: '95', name: 'Pizza Hawaii', description: 'Vorder-Schinken & Ananas-Stücken.', price: 11.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '96', name: 'Pizza Diavolo (Scharf)', description: 'Peperoni Wurst, Peperoni (Scharf), frischen Champignons.', price: 12.50, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '97', name: 'Pizza Parmaschinken und Rucola', description: 'Luftgetrocknete Parma-Schinken, Mariniertem Rucola, gehobeltem Grana Padano.', price: 15.50, category: 'pizza', allergens: ['A', 'C', 'G'] },
  { nr: '98', name: 'Pizza Amore Mio', description: 'Mozzarella-Käse, frische Champignons, Kirsch-Tomaten & Basilikum.', price: 14.00, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '99', name: 'Pizza Thunfisch', description: 'Saftigem Thunfisch, frische Champignons, Rote-Zwiebeln.', price: 14.00, category: 'pizza', allergens: ['A', 'D', 'G'] },
  { nr: '100', name: 'Pizza Burrata und Rucola', description: 'Cremige Burrata Käse, mariniertem Rucola Salat & Basilikum Pesto.', price: 16.50, category: 'pizza', allergens: ['A', 'G', 'H'] },
  { nr: '101', name: 'Pizza Meeresfrüchte', description: 'Köstlichem Meeresfrüchte, Kirsch-Tomaten & Knoblauch.', price: 16.50, category: 'pizza', allergens: ['A', 'B', 'G', 'R'] },
  { nr: '102', name: 'Pizza Lachs und Garnelen', description: 'Lachsfilet aus Norwegen, Garnelen, Kirsch-Tomaten & Knoblauch.', price: 17.00, category: 'pizza', allergens: ['A', 'B', 'D', 'G'] },
  { nr: '103', name: 'Pizza Deluxe', description: 'Hauch dünn geschnittene Kalbsfleisch, Cremige Thunfisch Soße, mariniertem Rucola Salat gehobeltem Grana Padano.', price: 17.00, category: 'pizza', allergens: ['A', 'C', 'D', 'G'] },
  // Nr. 104 fehlt in der Quelle — NICHT auffüllen (SSOT §4.1)
  { nr: '105', name: 'Pizza Vegetarisch', description: 'Gegrilltem frisches Marktgemüse.', price: 14.00, category: 'pizza', allergens: ['A', 'G'] },
  { nr: '106', name: 'Pizzabrot', description: 'Pizzabrot mit Tomaten Soße, Knoblauch & Oregano – Ohne Käse.', price: 6.50, category: 'pizza', allergens: ['A'] },
  // §3.10 Familienpizza aus dem Steinofen / 40 × 60 cm
  { nr: '110', name: 'Pizza Margherita', description: 'Mozzarella und Oregano.', price: 25.00, category: 'familienpizza', allergens: ['A', 'G'] },
  { nr: '111', name: 'Pizza Regina', description: 'Salami, Vorderschinken und frische Champignons.', price: 37.00, category: 'familienpizza', allergens: ['A', 'G'] },
  { nr: '112', name: 'Pizza Toscana', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons.', price: 45.00, category: 'familienpizza', allergens: ['A', 'G'] },
  { nr: '113', name: 'Pizza Thunfisch', description: 'Saftiger Thunfisch, rote Zwiebeln und frische Champignons.', price: 45.00, category: 'familienpizza', allergens: ['A', 'D', 'G'] },
  { nr: '114', name: 'Pizza Parmaschinken und Rucola', description: 'Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano.', price: 43.00, category: 'familienpizza', allergens: ['A', 'C', 'G'] },
  { nr: '115', name: 'Pizza Vegetarisch', description: 'Gegrilltes frisches Marktgemüse und Oregano.', price: 43.50, category: 'familienpizza', allergens: ['A', 'G'] },
  // §3.11 Kindergerichte
  { nr: '120', name: 'Chicken Nuggets', description: '6 Stück Hähnchen-Nuggets mit Pommes frites.', price: 8.90, category: 'kindergerichte', allergens: ['A', 'C'] },
  { nr: '121', name: 'Rigatoni mit Butter', description: 'Nudeln in Butter geschwenkt.', price: 6.50, category: 'kindergerichte', allergens: ['A', 'G'] },
  { nr: '122', name: 'Spaghetti Bolognese', description: 'Geschmortes Rinderhackfleisch in Tomatensoße.', price: 8.90, category: 'kindergerichte', allergens: ['A', 'L'] },
  { nr: '123', name: 'Kleine Schnitzel Wiener Art', description: 'Mit Pommes frites.', price: 9.90, category: 'kindergerichte', allergens: ['A', 'C'] },
  // §3.12 Dessert
  { nr: '130', name: 'Tiramisu', description: 'Hausgemachtes Tiramisu nach traditioneller Art.', price: 8.90, category: 'dessert', allergens: ['A', 'C', 'G'] },
  { nr: '131', name: 'Panna Cotta', description: 'Cremige Panna Cotta mit fruchtiger Erdbeersauce.', price: 7.90, category: 'dessert', allergens: ['G'] },
  { nr: '132', name: 'Schokoladen-Trüffeleis', description: 'Schokolade-Trüffeleis mit Cremige Kern & Sahne.', price: 8.90, category: 'dessert', allergens: ['G', 'F'] },
  { nr: '133', name: 'Sizilianische Eisspezialität', description: 'Sizilianische Eisspezialität mit kandierten Früchten, serviert mit Erdbeersauce und Sahne.', price: 9.90, category: 'dessert', allergens: ['C', 'G', 'H'] },
  { nr: '134', name: 'Bourbon-Vanilleeis (je Kugel)', description: 'Feines Bourbon-Vanilleeis mit intensivem Vanillearoma. Extra Soße: Schokolade oder Erdbeer Soße.', price: 2.50, category: 'dessert', allergens: ['G'] },
  { nr: '135', name: 'Affogato Espresso', description: 'Bourbon-Vanilleeis übergossen mit heißem Espresso.', price: 5.90, category: 'dessert', allergens: ['G'] },
];
