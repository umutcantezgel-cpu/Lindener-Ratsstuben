// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — Authentic Menu Data
// Deutsch-Italienische Küche · H. Toker
// ═══════════════════════════════════════════════════════════════

export const categories = [
    { id: 'suppen', name: 'Suppen', label: 'Suppen' },
    { id: 'vorspeisen', name: 'Vorspeisen', label: 'Vorspeisen' },
    { id: 'salate', name: 'Salate', label: 'Salate' },
    { id: 'pasta', name: 'Pasta', label: 'Pasta' },
    { id: 'ueberbackenes', name: 'Aus dem Ofen – Überbackenes', label: 'Überbackenes' },
    { id: 'hausgemacht', name: 'Hausgemachte Nudeln', label: 'Hausgemacht' },
    { id: 'schnitzel', name: 'Schnitzelvariationen', label: 'Schnitzel' },
    { id: 'fleisch', name: 'Fleischgerichte', label: 'Fleisch' },
    { id: 'kinder', name: 'Kindergerichte', label: 'Kinder' },
    { id: 'pizza', name: 'Pizza', label: 'Pizza' },
    { id: 'familienpizza', name: 'Familienpizza', label: 'Familienpizza' },
    { id: 'hamburger', name: 'Hamburger', label: 'Hamburger' },
    { id: 'limonaden', name: 'Hausgemachte Limonaden', label: 'Limonaden' },
];

// ─── Allergen Legend ───────────────────────────────────────────
export const allergenLegend: Record<string, string> = {
    A: "Schwefeldioxid und Sulfite",
    B: "Milch / Laktose",
    C: "Nüsse (1 Mandel – 2 Erdnuss – 3 Walnuss – 4 Haselnuss)",
    D: "Sesam",
    E: "Glutenhaltiges Getreide (1 Weizen – 2 Hafer – 3 Roggen – 4 Gerste – 5 Dinkel)",
    F: "Sellerie",
    G: "Senf",
    H: "Krebstiere",
    I: "Eier",
    K: "Fische",
    M: "Weichtiere",
    O: "Lupinen",
    P: "Sojabohnen",
};

// ─── Additive Legend ──────────────────────────────────────────
export const zusatzstoffLegend: Record<string, string> = {
    "1": "mit Farbstoff",
    "2": "mit Konservierungsstoffe",
    "3": "mit Nitropökelsalz",
    "4": "mit Antioxidationsmittel",
    "5": "mit Geschmacksverstärker",
    "6": "geschwefelt",
    "7": "geschwärzt",
    "8": "mit Phosphat",
    "9": "mit Milcheiweiß",
    "10": "koffeinhaltig",
    "11": "mit Süßungsmittel",
};

export const allergenHinweis = "Aufgrund der Küchenabläufe kann der 100%ige Ausschluss bestimmter Allergene nicht gewährleistet werden.";

// ─── Category Notes ───────────────────────────────────────────
export const categoryNotes: Record<string, string> = {
    salate: "Alle Salate servieren wir mit hausgemachtem Weißbrot (E1) – auf Wunsch Pizzabrot E1 (3,00 €)",
    schnitzel: "Als Beilage servieren wir Pommes frites und Beilagensalat.",
    fleisch: "Als Beilage servieren wir Gourmet-Kartoffeln und frisches Marktgemüse.",
    pizza: "Gerne können Sie Ihre Pizza auch nach Wunsch zusammenstellen. Größe: 28 cm.",
    hamburger: "Alle Hamburger werden mit Pommes frites und Salat serviert.",
    limonaden: "Alle Limonaden werden frisch zubereitet. 0,4 l.",
};

// ─── Menu Items ───────────────────────────────────────────────
export const menuItems = [
    // ═══ SUPPEN ═══
    {
        id: '10', nr: '10', name: 'Tomaten-Creme-Suppe',
        description: 'Cremige Tomatensuppe nach Hausrezept',
        price: 6.90, category: 'suppen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '11', nr: '11', name: 'Minestrone Gemüsesuppe',
        description: 'Italienische Gemüsesuppe mit frischem Marktgemüse',
        price: 6.90, category: 'suppen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['F'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ VORSPEISEN ═══
    {
        id: '20', nr: '20', name: 'Bruschetta Classica',
        description: '4 Scheiben geröstetes Weißbrot | Tomaten | Zwiebeln | Oliven | Knoblauch | Basilikum',
        price: 6.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '21', nr: '21', name: 'Insalata Mista',
        description: 'Kleiner gemischter Salat der Saison',
        price: 5.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '22', nr: '22', name: 'La Caprese',
        description: 'Strauchtomaten | Mozzarella | Balsamico Kräuter Sauce',
        price: 9.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '23', nr: '23', name: 'Saganaki',
        description: 'Panierter Weichkäse | Salatbouquet | Balsamico Kräuter Sauce',
        price: 10.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '24', nr: '24', name: 'Carpaccio di Manzo',
        description: 'Argentinisches Rinderfilet-Carpaccio | Rucola | Tomaten | Champignons | Parmesan | Zitronen Vinaigrette',
        price: 13.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '25', nr: '25', name: 'Antipasti Misti della Casa',
        description: 'Verschiedene Italienische Vorspeisen-Teller – warm und kalt',
        price: 14.90, category: 'vorspeisen',
        image: "/images/placeholder.svg",
        tags: [], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ SALATE ═══
    {
        id: '30', nr: '30', name: 'Insalata Italia',
        description: 'Bunter Salatteller mit Vorderschinken | Käse | Thunfisch | Ei | Joghurtdressing',
        price: 12.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'I', 'K'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '31', nr: '31', name: 'Insalata Vegetale',
        description: 'Marktgemüse auf bunten Salatteller | Joghurtdressing',
        price: 12.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '32', nr: '32', name: 'Insalata con Pollo',
        description: 'Bunter Salatteller | Hähnchenbrustfilet | Champignons | Joghurtdressing',
        price: 14.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '33', nr: '33', name: 'Insalata con Salmone e Gamberoni',
        description: 'Bunter Salatteller | Lachsfilet | Garnelen | Balsamico Kräuter Dressing',
        price: 15.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['H', 'K'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '34', nr: '34', name: 'Insalata con Carne',
        description: 'Bunter Salatteller mit argentinischen Rinderstreifen | Austernpilze | Joghurtdressing',
        price: 17.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '35', nr: '35', name: 'Insalata di Pesce Misto',
        description: 'Bunter Salatteller mit verschiedenen Fischfilets | Balsamico Kräuter Dressing',
        price: 19.90, category: 'salate',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['K'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ PASTA ═══
    {
        id: '40', nr: '40', name: 'Spaghetti Napoli',
        description: 'Mit Tomatensauce',
        price: 7.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '41', nr: '41', name: 'Spaghetti Bolognese',
        description: 'Mit Rinderhackfleischsauce',
        price: 8.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '42', nr: '42', name: 'Spaghetti Aglio Olio e Peperoncino',
        description: 'Olivenöl | Knoblauch | Tomaten | Rucola | Parmigiano – scharf',
        price: 9.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: ['vegetarian', 'spicy'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 2,
    },
    {
        id: '43', nr: '43', name: 'Spaghetti con Gamberoni e Rucola',
        description: 'Garnelen | Tomaten | Rucola | Knoblauch | Olivenöl',
        price: 15.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1', 'H'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '44', nr: '44', name: "Rigatoni all' Arrabiata",
        description: 'Knoblauch | Peperoncino (scharf) | Parmigiano | würzige Tomatensauce',
        price: 9.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: ['vegetarian', 'spicy'], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 3,
    },
    {
        id: '45', nr: '45', name: 'Rigatoni con Pollo e Funghi',
        description: 'Hähnchenbrustfilet | Champignons | Kräutern | Tomaten Sahne Rahm',
        price: 13.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '46', nr: '46', name: 'Rigatoni con Carne',
        description: 'Argentinisches Rindfleischragout | Austernpilze | Rucola | Knoblauch | Kräutern | Tomatensauce',
        price: 15.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '47', nr: '47', name: 'Tagliatelle di Verdure',
        description: 'Feine Bandnudeln | Gemüseragout | Kräutern | Tomatensauce',
        price: 12.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '48', nr: '48', name: 'Tagliatelle con Gorgonzola',
        description: 'Feine Bandnudeln | Blauschimmelkäse',
        price: 12.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '49', nr: '49', name: 'Tagliatelle con Salmone e Gamberetti',
        description: 'Feine Bandnudeln | Lachsfilet | Garnelen | Knoblauch | Hummer Butter Sahnesauce',
        price: 15.90, category: 'pasta',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'H', 'K'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ AUS DEM OFEN – ÜBERBACKENES ═══
    {
        id: '50', nr: '50', name: 'Lasagne al Forno',
        description: 'Schichtnudeln | Rinder-Hackfleisch-Sauce | Käse überbacken',
        price: 11.90, category: 'ueberbackenes',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '51', nr: '51', name: 'Pasta Combinazione',
        description: 'Drei verschiedene Nudelsorten | Rinder-Hackfleisch-Sauce | Käse überbacken',
        price: 12.90, category: 'ueberbackenes',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ HAUSGEMACHTE NUDELN ═══
    {
        id: '52', nr: '52', name: 'Tortellini alla Panna',
        description: 'Fleischfüllung | Vorderschinken | Sahne Cream',
        price: 10.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '53', nr: '53', name: 'Tortellaci burro salvia',
        description: 'Nudeln gefüllt mit Ricottaspinat | Buttersalbei | Parmigiano',
        price: 15.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '54', nr: '54', name: 'Tortellaci con Salmone e Gamberetti',
        description: 'Nudeln gefüllt mit Ricottaspinat | Lachsfilet | Garnelen | Hummer Butter | Sahnesauce',
        price: 17.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F', 'H', 'K'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '55', nr: '55', name: 'Tortellaci con Carne',
        description: 'Nudeln gefüllt mit Ricottaspinat | argentinisches Rindfleischragout | Austernpilze | Rucola | Parmigiano',
        price: 18.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '56', nr: '56', name: 'Tris di Pasta della Casa',
        description: '3 verschiedene gefüllte Nudeln | 3 verschiedene Saucen',
        price: 23.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '57', nr: '57', name: 'Fagotini al Tartufo e Proschiutto',
        description: 'Teigsäckchen gefüllt mit Trüffel | Parmoschinken | Dill-Sahne-Sauce | Parmigiano',
        price: 18.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '58', nr: '58', name: 'Gnocchi con Gorgonzola',
        description: 'Gefüllt mit Tomaten Mozzarella | Rucola | Blauschimmelkäse',
        price: 14.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '59', nr: '59', name: 'Gnocchi con Scampi e Rucola',
        description: 'Gefüllt mit Tomaten Mozzarella | Garnelen | Rucola | Knoblauch | würzige Tomatensauce',
        price: 16.90, category: 'hausgemacht',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'H'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ SCHNITZELVARIATIONEN ═══
    {
        id: '60', nr: '60', name: 'Schnitzel „Wiener Art"',
        description: 'Zitrone',
        price: 14.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '61', nr: '61', name: 'Rahmschnitzel',
        description: 'Rahmsauce',
        price: 16.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '62', nr: '62', name: 'Jägerschnitzel',
        description: 'Pilze | brauner Sauce',
        price: 17.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '63', nr: '63', name: 'Pfefferschnitzel',
        description: 'Madagaskar-grüner-Pfeffersauce',
        price: 17.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '64', nr: '64', name: 'Zwiebelschnitzel',
        description: 'Gebratene Zwiebeln',
        price: 17.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '65', nr: '65', name: 'Austernpilzschnitzel',
        description: 'Austernpilze | Sahne-Rahm-Sauce',
        price: 18.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '66', nr: '66', name: 'Gorgonzolaschnitzel',
        description: 'Blauschimmelkäse',
        price: 18.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '67', nr: '67', name: 'Schnitzel Bolognese',
        description: 'Rinder-Hackfleisch-Sauce | Vorderschinken | Mozzarella überbacken',
        price: 18.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F', 'I'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '68', nr: '68', name: 'Schlemmer Schnitzel',
        description: 'Champignons | Sauce Bernaise',
        price: 19.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '69', nr: '69', name: 'Lindener Rucksack',
        description: 'Gefüllt mit Vorderschinken und Käse | Champignon-Rahm-Sauce',
        price: 20.90, category: 'schnitzel',
        image: "/images/placeholder.svg",
        tags: ['bestseller'], allergens: ['B', 'F', 'I'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },

    // ═══ FLEISCHGERICHTE ═══
    {
        id: '70', nr: '70', name: 'Pollo alla Griglia',
        description: 'Hähnchenbrustfilet vom Grill | Kräuterbutter',
        price: 16.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '71', nr: '71', name: 'Pollo ai Funghi',
        description: 'Hähnchenbrustfilet vom Grill | Champignon-Rahm-Sauce',
        price: 18.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '72', nr: '72', name: 'Pollo al Pepe verde',
        description: 'Hähnchenbrustfilet vom Grill | Madagaskar-grüner-Pfeffersauce',
        price: 18.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '73', nr: '73', name: 'Saltimbocca alla Romana',
        description: 'Schweinefilet vom Grill | Parmoschinken | Butter-Salbei | Weißwein-Sauce',
        price: 20.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['A', 'B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '74', nr: '74', name: 'Filetto di Maile ai Funghi',
        description: 'Schweinefiletmedaillons vom Grill | Champignon-Rahm-Sauce',
        price: 20.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '75', nr: '75', name: 'Filetto di Maile al Pepe Verde',
        description: 'Schweinefiletmedaillons vom Grill | Madagaskar-grüner-Pfeffersauce',
        price: 20.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '76', nr: '76', name: 'Filetto di Maile al Gorgonzola',
        description: 'Schweinefiletmedaillons vom Grill | Gorgonzolasauce',
        price: 20.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '77', nr: '77', name: 'Fegato al Veneziano',
        description: 'Kalbsleberragout mit Zwiebeln | Butter-Salbei | Weißwein-Sauce',
        price: 21.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['A', 'B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '78', nr: '78', name: 'Bistecca alla Griglia',
        description: 'Argentinisches Rumpsteak vom Grill | Kräuterbutter',
        price: 26.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: ['bestseller'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '79', nr: '79', name: 'Bistecca con Cipolla',
        description: 'Argentinisches Rumpsteak vom Grill | gebratene Zwiebeln | Kräuterbutter',
        price: 27.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '80', nr: '80', name: 'Bistecca al Pepe Verde',
        description: 'Argentinisches Rumpsteak vom Grill | Madagaskar-grüner-Pfeffersauce',
        price: 28.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '81', nr: '81', name: 'Bistecca con Funghi',
        description: 'Argentinisches Rumpsteak vom Grill | Austernpilze | Sahne-Rahm-Sauce',
        price: 29.90, category: 'fleisch',
        image: "/images/placeholder.svg",
        tags: ['chef-recommendation'], allergens: ['B'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ KINDERGERICHTE ═══
    {
        id: '90', nr: '90', name: 'Chicken Nuggets',
        description: 'Pommes frites',
        price: 7.90, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: [], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '91', nr: '91', name: 'Kinderpizza Margarita',
        description: 'Kleine Pizza mit Tomatensauce und Käse',
        price: 7.00, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '92', nr: '92', name: 'Spaghetti Napoli',
        description: 'Mit Tomatensauce',
        price: 6.50, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '93', nr: '93', name: 'Spaghetti Bolognese',
        description: 'Mit Rinderhackfleischsauce',
        price: 6.90, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '94', nr: '94', name: 'Spaghetti Carbonara',
        description: 'Schinken-Sahne-Sauce',
        price: 7.50, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'F'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '95', nr: '95', name: 'Schnitzel „Wiener Art"',
        description: 'Pommes frites',
        price: 8.50, category: 'kinder',
        image: "/images/placeholder.svg",
        tags: [], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ PIZZA (28 cm) ═══
    {
        id: '100', nr: '100', name: 'Pizza Margarita',
        description: 'Tomatensauce | Mozzarella',
        price: 8.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '101', nr: '101', name: 'Pizza Salami',
        description: 'Salami',
        price: 9.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '102', nr: '102', name: 'Pizza Salami-Schinken',
        description: 'Salami | Vorderschinken',
        price: 9.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '103', nr: '103', name: 'Pizza Extra',
        description: 'Salami | Vorderschinken | Champignons',
        price: 10.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '104', nr: '104', name: 'Pizza Ciao Ciao',
        description: 'Salami | Peperoniwurst | Vorderschinken | Champignons',
        price: 10.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '105', nr: '105', name: 'Pizza Toscana',
        description: 'Salami | Peperoniwurst | Vorderschinken | Champignons | Zwiebeln',
        price: 11.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '106', nr: '106', name: 'Pizza Ratsstubbe',
        description: 'Salami | Peperoniwurst | Vorderschinken | Ei | Champignons | Zwiebeln',
        price: 11.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['bestseller'], allergens: ['B', 'E1', 'I'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '107', nr: '107', name: 'Pizza Tonno',
        description: 'Thunfisch | Champignons | Zwiebeln',
        price: 12.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'K'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '108', nr: '108', name: 'Pizza Vegetaria',
        description: 'Mit frischen Marktgemüse',
        price: 12.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '109', nr: '109', name: 'Pizza Amore',
        description: 'Mozzarella | Champignons | Tomaten | Basilikum',
        price: 12.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '110', nr: '110', name: 'Pizza Hawaii',
        description: 'Vorderschinken | Ananas',
        price: 10.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '111', nr: '111', name: 'Pizza Salmone e Gamberetti',
        description: 'Lachs | Garnelen | Knoblauch | Tomaten',
        price: 15.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'H', 'K'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '112', nr: '112', name: 'Pizza Parma',
        description: 'Parmaschinken | Rucola | Parmesan',
        price: 13.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '113', nr: '113', name: 'Pizza Quattro Formaggie',
        description: 'Vier verschiedene Käsesorten',
        price: 11.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '114', nr: '114', name: 'Pizza Quattro Stagione',
        description: 'Salami | Vorderschinken | Peperoniwurst | Pilze',
        price: 11.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '115', nr: '115', name: 'Pizza Sizilia',
        description: 'Peperoniwurst | Artischocken | Kapern | Paprika | Tomaten',
        price: 11.50, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '116', nr: '116', name: 'Pizza Diavolo',
        description: 'Peperoniwurst | Champignons | scharfen Peperoncino',
        price: 10.00, category: 'pizza',
        image: "/images/placeholder.svg",
        tags: ['spicy'], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 3,
    },

    // ═══ FAMILIENPIZZA (60x40 cm) ═══
    {
        id: '120', nr: '120', name: 'Familienpizza Margarita',
        description: 'Tomatensauce | Mozzarella (60×40 cm)',
        price: 20.50, category: 'familienpizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '121', nr: '121', name: 'Familienpizza Ciao Ciao',
        description: 'Salami | Peperoniwurst | Vorderschinken | Champignons (60×40 cm)',
        price: 32.50, category: 'familienpizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '122', nr: '122', name: 'Familienpizza Toscana',
        description: 'Salami | Peperoniwurst | Vorderschinken | Champignons | Zwiebeln (60×40 cm)',
        price: 35.50, category: 'familienpizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: ['1', '2', '5'], spiceLevel: 0,
    },
    {
        id: '123', nr: '123', name: 'Familienpizza Vegetaria',
        description: 'Frisches Marktgemüse (60×40 cm)',
        price: 35.50, category: 'familienpizza',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '124', nr: '124', name: 'Familienpizza Parma',
        description: 'Parmaschinken | Rucola | Parmesan (60×40 cm)',
        price: 37.50, category: 'familienpizza',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ HAMBURGER ═══
    {
        id: '130', nr: '130', name: 'Classic Burger',
        description: 'Rindfleisch-Patty | Salat | Tomaten | Zwiebeln | Gurken | Hausburger-Sauce',
        price: 11.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['E1', 'G', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '131', nr: '131', name: 'Cheeseburger',
        description: 'Rindfleisch-Patty | Cheddar | Salat | Tomaten | Zwiebeln | Gurken | Hausburger-Sauce',
        price: 12.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: ['bestseller'], allergens: ['B', 'E1', 'G', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '132', nr: '132', name: 'Bacon Cheeseburger',
        description: 'Rindfleisch-Patty | Cheddar | knuspriger Bacon | Salat | Tomaten | Zwiebeln | Hausburger-Sauce',
        price: 14.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'G', 'I'], zusatzstoffe: ['1', '2', '3'], spiceLevel: 0,
    },
    {
        id: '133', nr: '133', name: 'BBQ Burger',
        description: 'Rindfleisch-Patty | Cheddar | Röstzwiebeln | Jalapeños | BBQ-Sauce',
        price: 14.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: ['spicy'], allergens: ['B', 'E1', 'G', 'I'], zusatzstoffe: ['1', '5'], spiceLevel: 2,
    },
    {
        id: '134', nr: '134', name: 'Chicken Burger',
        description: 'Knuspriges Hähnchenbrustfilet | Salat | Tomaten | Zwiebeln | Joghurt-Dressing',
        price: 13.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: [], allergens: ['B', 'E1', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '135', nr: '135', name: 'Burger Italia',
        description: 'Rindfleisch-Patty | Mozzarella | Rucola | getrocknete Tomaten | Balsamico-Creme',
        price: 15.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: ['chef-recommendation'], allergens: ['B', 'E1', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '136', nr: '136', name: 'Veggie Burger',
        description: 'Hausgemachter Gemüse-Patty | Salat | Tomaten | Zwiebeln | Joghurt-Kräuter-Sauce',
        price: 12.90, category: 'hamburger',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: ['B', 'E1', 'F', 'I'], zusatzstoffe: [], spiceLevel: 0,
    },

    // ═══ HAUSGEMACHTE LIMONADEN (0,4 l) ═══
    {
        id: '200', nr: '200', name: 'Klassische Zitronenlimonade',
        description: 'Frisch gepresste Zitronen | Rohrzucker | Minze',
        price: 4.50, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '201', nr: '201', name: 'Ingwer-Zitronen-Limonade',
        description: 'Frischer Ingwer | Zitrone | Honig | Minze',
        price: 5.50, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: [], zusatzstoffe: [], spiceLevel: 1,
    },
    {
        id: '202', nr: '202', name: 'Erdbeer-Basilikum-Limonade',
        description: 'Frische Erdbeeren | Basilikum | Zitrone | Rohrzucker',
        price: 5.90, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '203', nr: '203', name: 'Hugo Limonade',
        description: 'Holunderblütensirup | Limette | Minze | Sprudel',
        price: 4.90, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian', 'bestseller'], allergens: [], zusatzstoffe: ['11'], spiceLevel: 0,
    },
    {
        id: '204', nr: '204', name: 'Himbeer-Rosmarin-Limonade',
        description: 'Frische Himbeeren | Rosmarin | Zitrone | Rohrzucker',
        price: 5.90, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },
    {
        id: '205', nr: '205', name: 'Maracuja-Minze-Limonade',
        description: 'Maracuja-Nektar | frische Minze | Limette | Sprudel',
        price: 5.50, category: 'limonaden',
        image: "/images/placeholder.svg",
        tags: ['vegetarian'], allergens: [], zusatzstoffe: [], spiceLevel: 0,
    },
];

// ═══ GETTER FUNKTIONEN (STRICT TYPED ARCHITECTURE) ═══
import { MenuItem, MenuCategory, Id, createId } from '@/types';

// Map raw data to strictly typed branded objects
export const strictCategories: MenuCategory[] = categories.map(c => ({
    ...c,
    id: createId(c.id)
}));

export const strictMenuItems: MenuItem[] = menuItems.map(m => ({
    ...m,
    id: createId(m.id),
} as unknown as MenuItem));

/**
 * Returns all menu items. O(1) static array mapping.
 * @returns {MenuItem[]} Array of strictly typed MenuItems
 */
export function getAllMenuItems(): MenuItem[] { 
    return [...strictMenuItems]; 
}

/**
 * Returns a menu item by its exact ID. Performance O(n).
 * @param {Id | string} id 
 * @returns {MenuItem | undefined}
 */
export function getMenuItemById(id: Id | string): MenuItem | undefined {
    if (!id || typeof id !== 'string') {
        console.warn('[Data Layer] getMenuItemById called with invalid or null ID.');
        return undefined;
    }
    
    // Fallback for equality checks against the branded type at runtime
    const targetId = id as string;
    const item = strictMenuItems.find(i => (i.id as unknown as string) === targetId);
    
    if (!item) {
        console.debug(`[Data Layer] Menu item with ID ${id} not found.`);
    }
    return item;
}

/**
 * Returns all menu items for a specific category. Performance O(n).
 * @param {string} categoryId 
 * @returns {MenuItem[]}
 */
export function getMenuItemsByCategory(categoryId: string): MenuItem[] { 
    if (!categoryId) return [];
    return strictMenuItems.filter(item => item.category === categoryId); 
}

/**
 * Returns all Categories.
 * @returns {MenuCategory[]}
 */
export function getAllCategories(): MenuCategory[] { 
    return [...strictCategories]; 
}

// ═══ DEVELOPMENT-MODE ASSERTIONS ═══
// Ausführung zur Build-Time / Local Dev, verhindert korrupte Deployments.
if (process.env.NODE_ENV === 'development') {
    // 1. Check for Duplicate Menu item IDs
    const menuIds = new Set<string>();
    for (const item of menuItems) {
        if (menuIds.has(item.id)) {
            console.error(`[Data Layer] ERROR: Duplicate MenuItem ID detected: ${item.id} (${item.name})`);
        }
        menuIds.add(item.id);
    }
    
    // 2. Check for Duplicate Category IDs
    const catIds = new Set<string>();
    for (const cat of categories) {
        if (catIds.has(cat.id)) {
            console.error(`[Data Layer] ERROR: Duplicate Category ID detected: ${cat.id} (${cat.name})`);
        }
        catIds.add(cat.id);
    }
    
    // 3. Referential Integrity Check
    for (const item of menuItems) {
        if (!catIds.has(item.category)) {
            console.warn(`[Data Layer] WARN: MenuItem ${item.id} (${item.name}) references unknown category '${item.category}'.`);
        }
        if (!item.name || !item.id) {
            console.warn(`[Data Layer] WARN: MenuItem misses required strict fields (name, id). Check item: ${item.id}`);
        }
    }
}
