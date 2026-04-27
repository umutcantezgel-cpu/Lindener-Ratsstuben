// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — Hauseigenes Allergen-Codierungssystem
// Basiert auf EU-VO 1169/2011 (LMIV), angepasst an das
// proprietäre Kennzeichnungssystem der Lindener Ratsstuben.
//
// ⚠️ ACHTUNG: Dieses Schema weicht bewusst vom EU-Standard ab!
//    Die Buchstabenzuordnung folgt dem Ratsstuben-Hausschema,
//    das auf allen gedruckten Speisekarten verwendet wird.
// ═══════════════════════════════════════════════════════════════

// Basis-Allergene (ohne Subklassen)
export type AllergenBase = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'K' | 'M' | 'O' | 'P';

// Nuss-Subklassen (C1–C4)
export type NussSubklasse = 'C1' | 'C2' | 'C3' | 'C4';

// Getreide-Subklassen (E1–E5)
export type GetreideSubklasse = 'E1' | 'E2' | 'E3' | 'E4' | 'E5';

// Vollständiger Allergen-Identifier inkl. Subklassen
export type AllergenIdentifier = AllergenBase | NussSubklasse | GetreideSubklasse;

export interface AllergenData {
  id: AllergenIdentifier;
  name: string;
  description: string;
  hiddenRisks: string[];
}

// ─── Ratsstuben-Hausschema (LMIV-konform) ─────────────────────
export const LMIV_ALLERGENS: Record<AllergenBase, AllergenData> = {
  'A': {
    id: 'A',
    name: 'Schwefeldioxid und Sulfite',
    description: 'Schwefeldioxid und Sulfite in Konzentrationen >10 mg/kg oder >10 mg/l',
    hiddenRisks: ['Wein (Weißweinsauce)', 'Aceto Balsamico', 'Getrocknete Tomaten', 'Antioxidans in Speck/Schinken', 'Pökelware'],
  },
  'B': {
    id: 'B',
    name: 'Milch / Laktose',
    description: 'Milch und daraus gewonnene Erzeugnisse (einschl. Laktose)',
    hiddenRisks: ['Rahmsaucen', 'Kräuterbutter', 'Mozzarella', 'Grana Padano', 'Sahne', 'Industriepanade'],
  },
  'C': {
    id: 'C',
    name: 'Nüsse',
    description: '1 Mandel, 2 Erdnuss, 3 Walnuss, 4 Haselnuss',
    hiddenRisks: ['Pesto Genovese (Pinienkern-Substitution)', 'Desserts', 'Amaretto'],
  },
  'D': {
    id: 'D',
    name: 'Sesam',
    description: 'Sesamsamen und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Burger-Buns', 'Brotsorten'],
  },
  'E': {
    id: 'E',
    name: 'Glutenhaltiges Getreide',
    description: '1 Weizen, 2 Hafer, 3 Roggen, 4 Gerste, 5 Dinkel',
    hiddenRisks: ['Paniermehl', 'Mehlschwitze', 'Pasta', 'Pizzateig', 'Convenience-Saucen'],
  },
  'F': {
    id: 'F',
    name: 'Sellerie',
    description: 'Stauden-, Knollen- und Blattsellerie',
    hiddenRisks: ['Soffritto (Basis von Ragù/Tomatensauce)', 'Gewürzmischungen', 'Vitello Tonnato (Pochierfond)', 'Braune Saucen'],
  },
  'G': {
    id: 'G',
    name: 'Senf',
    description: 'Senfkörner, Senfpulver, Senfmehl',
    hiddenRisks: ['Emulgator in Saucen (Hollandaise, Mayonnaise)', 'Wurstwaren (Salami/Peperoniwurst)', 'Joghurtdressing'],
  },
  'H': {
    id: 'H',
    name: 'Krebstiere',
    description: 'Garnelen, Scampi, Hummer, Krabben etc.',
    hiddenRisks: ['Frutti di Mare Mische', 'Gamberoni'],
  },
  'I': {
    id: 'I',
    name: 'Eier',
    description: 'Eier von Geflügel und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Lysozym in Grana Padano/Hartkäse (E1105)', 'Mayonnaise', 'Panaden', 'Frische Pasta (Tagliatelle)', 'Béarnaise'],
  },
  'K': {
    id: 'K',
    name: 'Fische',
    description: 'Alle Fischarten und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Vitello Tonnato Sauce (Thunfisch+Sardellen)', 'Fischfonds'],
  },
  'M': {
    id: 'M',
    name: 'Weichtiere',
    description: 'Schnecken, Muscheln (Cozze), Tintenfisch (Calamari)',
    hiddenRisks: ['Frutti di Mare Mische (oft nicht von Krebstieren getrennt)', 'Tintenfischtinte'],
  },
  'O': {
    id: 'O',
    name: 'Lupinen',
    description: 'Lupinenmehl, -protein und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Glutenfreie Backwaren'],
  },
  'P': {
    id: 'P',
    name: 'Sojabohnen',
    description: 'Sojabohnen und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Sojaprotein-Isolat in Formschinken/Salami', 'Sojalecithin in Schokolade', 'Saucenpulver'],
  },
};

// ─── Subklassen-Lookup ────────────────────────────────────────
export const NUSS_SUBKLASSEN: Record<NussSubklasse, string> = {
  'C1': 'Mandel',
  'C2': 'Erdnuss',
  'C3': 'Walnuss',
  'C4': 'Haselnuss',
};

export const GETREIDE_SUBKLASSEN: Record<GetreideSubklasse, string> = {
  'E1': 'Weizen',
  'E2': 'Hafer',
  'E3': 'Roggen',
  'E4': 'Gerste',
  'E5': 'Dinkel',
};
