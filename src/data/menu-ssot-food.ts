// ═══════════════════════════════════════════════════════════════
// SSOT Artikel-Katalog v1.0 — NUR SPEISEN (§3.1–§3.12)
// Jede Zeile ist zeichengenau aus dem SSOT übernommen.
// ═══════════════════════════════════════════════════════════════

import { SSOTMenuItem } from './menu';

export const foodItems: SSOTMenuItem[] = [
  // §3.1 Suppen
  { nr: '10', name: 'Tagessuppe', description: 'Frisch zubereitet nach saisonalem Angebot.', price: 6.90, category: 'suppen' },
  { nr: '11', name: 'Tomatencremesuppe', description: 'Fein abgestimmte, cremig verfeinerte Tomatensuppe.', price: 7.90, category: 'suppen' },
  // §3.2 Vorspeisen
  { nr: '20', name: 'Bruschetta Classico', description: 'Geröstete Weißbrotscheiben mit frischen Tomaten, Zwiebeln, Oliven und Knoblauch, veredelt mit extra nativem Olivenöl. Wahlweise mit überbackenem Mozzarella (+2,00 €).', price: 7.90, category: 'vorspeisen' },
  { nr: '21', name: 'Prosciutto di Parma e Melone', description: 'Edler luftgetrockneter Parmaschinken, serviert mit sonnengereifter Melone.', price: 12.90, category: 'vorspeisen' },
  { nr: '22', name: 'La Buratta', description: 'Cremige Burrata auf feinem Tomaten-Carpaccio, verfeinert mit einer Balsamico-Kräutervinaigrette und Genovese-Basilikum Pesto.', price: 13.90, category: 'vorspeisen' },
  { nr: '23', name: 'Vitello Tonnato', description: 'Zart rosa gegartes Kalbfleisch, fein aufgeschnitten, begleitet von einer cremigen Thunfischsauce mit Kapern, Sardellen & Ei.', price: 14.90, category: 'vorspeisen' },
  { nr: '24', name: 'Carpaccio di Manzo', description: 'Hauchdünn geschnittenes argentinisches Rinderfilet auf mariniertem Rucola, mit frischen Champignons und gehobeltem Grana Padano, verfeinert mit extra nativem Olivenöl.', price: 15.90, category: 'vorspeisen' },
  { nr: '25', name: 'Antipasti Misti della Casa', description: 'Eine erlesene Auswahl italienischer Vorspeisenspezialitäten nach Art des Hauses – warm und kalt serviert. Auch als stilvolle Antipasti-Platten für mehrere Personen erhältlich. Pro Person 13,90 €.', price: 16.90, category: 'vorspeisen' },
  // §3.3 Salate
  { nr: '30', name: 'Insalata Mista', description: 'Kleiner, bunter Salatteller – ideal als Beilage oder Vorspeise.', price: 7.90, category: 'salate' },
  { nr: '31', name: 'Insalata Italia', description: 'Bunter Salatteller mit Vorderschinken, saftigem Thunfisch, Mozzarella und Ei, serviert mit hausgemachtem Joghurtdressing.', price: 14.90, category: 'salate' },
  { nr: '32', name: 'Insalata Italia (klein)', description: 'Wahlweise als Vorspeise oder Beilage.', price: 10.90, category: 'salate' },
  { nr: '33', name: 'Insalata Frutti di Mare', description: 'Rucolasalat mit köstlich marinierten Meeresfrüchten, Cocktailtomaten und roten Zwiebeln in Balsamico-Kräuter-Vinaigrette.', price: 15.90, category: 'salate' },
  { nr: '34', name: 'Insalata di Pollo', description: 'Bunter Salatteller mit Hähnchenbrustfilet und frischen Champignons, serviert mit hausgemachtem Joghurtdressing.', price: 16.90, category: 'salate' },
  { nr: '35', name: 'Insalata Salmone e Gamberoni', description: 'Bunter Salatteller mit frischem Lachsfilet und Garnelen in Balsamico-Kräuter-Vinaigrette.', price: 17.90, category: 'salate' },
  { nr: '36', name: 'Insalata Don Capo', description: 'Bunter Salatteller mit argentinischem Rinderfleisch und gehobeltem Grana Padano, serviert mit hausgemachtem Joghurtdressing.', price: 18.90, category: 'salate' },
  // §3.4 Pasta
  { nr: '40', name: 'Spaghetti alla Bolognese', description: 'Mit geschmortem Rinderhackfleisch in würziger Tomatensauce, serviert mit frisch geriebenem Parmigiano.', price: 12.90, category: 'pasta' },
  { nr: '41', name: 'Original Spaghetti Carbonara', description: 'Mit knusprigem Guanciale (Schweinebacke), Ei, grob geschrotetem Pfeffer und frisch geriebenem Parmigiano.', price: 14.90, category: 'pasta' },
  { nr: '42', name: 'Rigatoni alla Puglia', description: 'Mit knusprigem Guanciale (Schweinebacke), Brokkoli, Zwiebeln und einem Hauch Knoblauch in aromatischer Tomatensauce, verfeinert mit geriebenem Parmigiano.', price: 16.90, category: 'pasta' },
  { nr: '43', name: 'Rigatoni „Ratsstube"', description: 'Mit gebratener Hähnchenbrust und frischen Champignons in cremiger Tomaten-Sahnesauce, serviert mit Parmigiano.', price: 16.90, category: 'pasta' },
  { nr: '44', name: 'Tagliatelle al Ragù di Verdure', description: 'Feine Bandnudeln mit frischem Marktgemüse-Ragout in aromatischer Tomatensauce, dazu geriebener Parmigiano.', price: 14.90, category: 'pasta' },
  { nr: '45', name: 'Tagliatelle Salmone e Gamberoni', description: 'Feine Bandnudeln mit gebratenem Lachsfilet und Garnelen, verfeinert mit einem Hauch Knoblauch in cremiger Sauce nach Art des Hauses.', price: 17.90, category: 'pasta' },
  { nr: '46', name: 'Linguine ai Frutti di Mare', description: 'Flache Pasta mit erlesenen Meeresfrüchten in aromatischer Tomatensauce mit feiner Knoblauchnote.', price: 18.90, category: 'pasta' },
  { nr: '47', name: 'Linguine Pesce Misto della Casa', description: 'Flache Pasta mit ausgewähltem Edelfisch in feiner Weißwein-Kräutersauce. Empfehlung des Küchenchefs.', price: 22.90, category: 'pasta' },
  // §3.5 Pasta al Forno (Quell-Nummern: 48, 49, 62 — NICHT 60-64)
  { nr: '48', name: 'Pasta Combinazione', description: 'Drei verschiedene Pasta in geschmortes Rinderhackfleisch in aromatische Tomaten Soße überbacken mit Mozzarella.', price: 13.90, category: 'pasta-al-forno' },
  { nr: '49', name: 'Rigatoni al Ragu e Verdure', description: 'Mit frischem Marktgemüse Ragout in Cremigen Sahne Soße überbacken mit Mozzarella.', price: 13.90, category: 'pasta-al-forno' },
  { nr: '62', name: 'Tortellini Prosciutto e Panna', description: 'Tortellini gefüllt mit Fleisch in Vorderschinken Sahne Soße überbacken mit Mozzarella.', price: 16.90, category: 'pasta-al-forno' },
  // §3.6 Hausgemachte Pasta
  { nr: '50', name: 'Tortellini alla Panna', description: 'Mit Vorderschinken, Ei in Cremigen Sahne Soße serviert geriebenen Parmigiano.', price: 14.90, category: 'hausgemachte-pasta' },
  { nr: '51', name: 'Tortelacci Burro e Salvia', description: 'Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Butter Salbei geschwenkt Kirsch-Tomaten auf Rucola Salat Bukket und Grana Padano.', price: 17.90, category: 'hausgemachte-pasta' },
  { nr: '52', name: 'Tortellacci con Salmone e Gamberoni', description: 'Hausgemachte Riesen Tortellacci gefüllt mit Ricotta, Spinat in Cremigen Soße nach Art des Hauses.', price: 19.90, category: 'hausgemachte-pasta' },
  { nr: '53', name: 'Gnocchi con Gamberoni', description: 'Gefüllte Kartoffeln Gnocchi Tomaten, Mozzarella mit gebratenen Garnelen cremiger Tomaten-Sahnesauce.', price: 17.90, category: 'hausgemachte-pasta' },
  { nr: '54', name: 'Gnocchi e Basilikum Pesto Genovese con La Buratta', description: 'Gefüllte Kartoffeln Gnocchi mit cremigen Buratta Basilikum Pesto aus Genovese.', price: 15.90, category: 'hausgemachte-pasta' },
  // §3.7 Schnitzelvariation
  { nr: '70', name: 'Schnitzel Wiener Art', description: 'Mit Zitronenscheiben. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 16.90, category: 'schnitzel' },
  { nr: '71', name: 'Rahm-Schnitzel', description: 'In Cremigen Rahm Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 17.90, category: 'schnitzel' },
  { nr: '72', name: 'Jäger-Schnitzel', description: 'Mit frischen Champignons in Brauner Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 18.90, category: 'schnitzel' },
  { nr: '73', name: 'Pfeffer-Schnitzel', description: 'Mit Grünen Madagaskar-Pfefferkörnern in cremige Rahmsoße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 18.90, category: 'schnitzel' },
  { nr: '74', name: 'Bauern-Schnitzel', description: 'Mit knusprig gebratenem Speck & Zwiebeln. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 19.90, category: 'schnitzel' },
  { nr: '75', name: 'Schlemmer-Schnitzel', description: 'Mit frischem Champignon in Cremige Bernaise Soße. Dazu servieren wir Pommes Frites & Salat der Saison.', price: 19.90, category: 'schnitzel' },
  { nr: '76', name: 'Lindener Rucksack', description: 'Gefüllt mit Vorder-Schinken & Mozzarella Käse in frischem Champignon Sahne Soße.', price: 21.90, category: 'schnitzel' },
  // §3.8 Fleischgerichte & Fischgerichte
  { nr: '80', name: 'Petto di Pollo alla Griglia', description: 'Hähnchenbrustfilet vom Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 19.90, category: 'fleisch-fisch' },
  { nr: '81', name: 'Petto di Pollo al Pepe Verde', description: 'Hähnchenbrustfilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 20.90, category: 'fleisch-fisch' },
  { nr: '82', name: 'Filetto di Maiale al Vino Bianco e Limone', description: 'Schweinefilet Medaillons vom Grill in Weißwein, Zitronen Kräuter Knoblauch Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 23.90, category: 'fleisch-fisch' },
  { nr: '83', name: 'Filetto di Maiale al Pepe Verde', description: 'Schweinefilet vom Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 24.90, category: 'fleisch-fisch' },
  { nr: '84', name: 'Bistecca alla Griglia', description: 'Argent. Rumpsteak vom Lava Grill mit hausgemachter Kräuter-Butter & Zitronen Scheibe. Dazu servieren wir frischem Marktgemüse & Gourmet Kartoffeln.', price: 29.90, category: 'fleisch-fisch' },
  { nr: '85', name: 'Bistecca al Pepe Verde', description: 'Argent. Rumpsteak vom Lava Grill mit grünen Madagaskar Pfefferkörner in cremigen Rahm Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 32.90, category: 'fleisch-fisch' },
  { nr: '86', name: 'Orata con Burro al Limone e Aglio', description: 'Frisches Doraden Filet, geschwenkt in einer feinen Zitronen-Kräuter-Knoblauch-Buttersauce. Dazu servieren wir knackiges Marktgemüse und goldbraune Gourmetkartoffeln.', price: 26.90, category: 'fleisch-fisch' },
  { nr: '87', name: 'Salmone alla Griglia salsa all`Arancia e Senape', description: 'Saftiges Lachsfilet aus Norwegen, frisch vom Grill in Cremigen Orangensenf Soße. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 27.90, category: 'fleisch-fisch' },
  { nr: '88', name: 'Seppia alla Griglia', description: 'Marinierten Tintenfisch nach Art des Hauses. Dazu servieren wir frisches Marktgemüse & Gourmet Kartoffeln.', price: 25.90, category: 'fleisch-fisch' },
  // §3.9 Pizza aus dem Steinofen / 28 cm
  { nr: '90', name: 'Pizza Margarita', description: 'Mozzarella Käse & Oregano.', price: 9.50, category: 'pizza' },
  { nr: '91', name: 'Pizza Salame e funghi', description: 'Salami & frischen Champignons.', price: 11.50, category: 'pizza' },
  { nr: '92', name: 'Pizza Regina', description: 'Salami, Vorder-Schinken & frischen Champignons.', price: 12.50, category: 'pizza' },
  { nr: '93', name: 'Pizza Toscana', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln & frischen Champignons.', price: 13.50, category: 'pizza' },
  { nr: '94', name: 'Pizza Ratsstuben', description: 'Salami, Vorder-Schinken, Peperoni Wurst, Zwiebeln, frischen Champignons & Ei.', price: 14.50, category: 'pizza' },
  { nr: '95', name: 'Pizza Hawaii', description: 'Vorder-Schinken & Ananas-Stücken.', price: 11.50, category: 'pizza' },
  { nr: '96', name: 'Pizza Diavolo', description: 'Peperoni Wurst, Peperoni (Scharf), frischen Champignons.', price: 12.50, category: 'pizza' },
  { nr: '97', name: 'Pizza Parma e Rucola', description: 'Luftgetrocknete Parma-Schinken, Mariniertem Rucola, gehobeltem Grana Padano.', price: 15.50, category: 'pizza' },
  { nr: '98', name: 'Pizza Amore Mio Talia', description: 'Mozzarella-Käse, frische Champignons, Kirsch-Tomaten & Basilikum.', price: 14.50, category: 'pizza' },
  { nr: '99', name: 'Pizza Tonno', description: 'Saftigem Thunfisch, frische Champignons, Rote-Zwiebeln.', price: 14.50, category: 'pizza' },
  { nr: '100', name: 'Pizza Burrata e Rucola', description: 'Cremige Burrata Käse, mariniertem Rucola Salat & Basilikum Pesto.', price: 16.50, category: 'pizza' },
  { nr: '101', name: 'Pizza Frutti di Mare', description: 'Köstlichem Meeresfrüchte, Kirsch-Tomaten & Knoblauch.', price: 16.50, category: 'pizza' },
  { nr: '102', name: 'Pizza Salmone e Gamberoni', description: 'Lachsfilet aus Norwegen, Garnelen, Kirsch-Tomaten & Knoblauch.', price: 17.50, category: 'pizza' },
  { nr: '103', name: 'Pizza Deluxe', description: 'Hauch dünn geschnittene Kalbsfleisch, Cremige Thunfisch Soße, mariniertem Rucola Salat gehobeltem Grana Padano.', price: 15.50, category: 'pizza' },
  // Nr. 104 fehlt in der Quelle — NICHT auffüllen (SSOT §4.1)
  { nr: '105', name: 'Pizza Vegetale', description: 'Gegrilltem frisches Marktgemüse.', price: 14.50, category: 'pizza' },
  { nr: '106', name: 'Pizzapane', description: 'Pizzabrot mit Tomaten Soße, Knoblauch & Oregano – Ohne Käse.', price: 6.50, category: 'pizza' },
  // §3.10 Familienpizza aus dem Steinofen / 40 × 60 cm
  { nr: '110', name: 'Pizza Margherita', description: 'Mozzarella und Oregano.', price: 25.00, category: 'familienpizza' },
  { nr: '111', name: 'Pizza Regina', description: 'Salami, Vorderschinken und frische Champignons.', price: 37.00, category: 'familienpizza' },
  { nr: '112', name: 'Pizza Toskana', description: 'Salami, Vorderschinken, Peperoniwurst, Zwiebeln und frische Champignons.', price: 45.00, category: 'familienpizza' },
  { nr: '113', name: 'Pizza Tonno', description: 'Saftiger Thunfisch, rote Zwiebeln und frische Champignons.', price: 43.00, category: 'familienpizza' },
  { nr: '114', name: 'Pizza Parma e Rucola', description: 'Luftgetrockneter Parmaschinken, marinierter Rucola und gehobelter Grana Padano.', price: 43.00, category: 'familienpizza' },
  { nr: '115', name: 'Pizza Vegetaria', description: 'Gegrilltes frisches Marktgemüse und Oregano.', price: 43.50, category: 'familienpizza' },
  // §3.11 Kindergerichte
  { nr: '120', name: 'Chicken Nuggets', description: '6 Stück Hähnchen-Nuggets mit Pommes frites.', price: 8.90, category: 'kindergerichte' },
  { nr: '121', name: 'Rigatoni burro', description: 'Nudeln in Butter geschwenkt.', price: 6.50, category: 'kindergerichte' },
  { nr: '122', name: 'Spaghetti alla Bolognese', description: 'Geschmortes Rinderhackfleisch in Tomatensoße.', price: 8.90, category: 'kindergerichte' },
  { nr: '123', name: 'Kleine Schnitzel Wiener Art', description: 'Mit Pommes frites.', price: 9.90, category: 'kindergerichte' },
  // §3.12 Dessert
  { nr: '130', name: 'Tiramisu', description: 'Hausgemachtes Tiramisu nach traditioneller Art.', price: 8.90, category: 'dessert' },
  { nr: '131', name: 'Panna Cotta', description: 'Cremige Panna Cotta mit fruchtiger Erdbeersauce.', price: 7.90, category: 'dessert' },
  { nr: '132', name: 'Tartufo Nero', description: 'Schokolade-Trüffeleis mit Cremige Kern & Sahne.', price: 8.90, category: 'dessert' },
  { nr: '133', name: 'Cassata Siciliana', description: 'Sizilianische Eisspezialität mit kandierten Früchten, serviert mit Erdbeersauce und Sahne.', price: 9.90, category: 'dessert' },
  { nr: '134', name: 'Bourbon-Vanilleeis (je Kugel)', description: 'Feines Bourbon-Vanilleeis mit intensivem Vanillearoma.', price: 3.00, category: 'dessert' },
];
