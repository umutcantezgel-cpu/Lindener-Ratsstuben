export type AllergenIdentifier = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'L' | 'M' | 'N' | 'O' | 'P' | 'R';

export interface AllergenData {
  id: AllergenIdentifier;
  name: string;
  description: string;
  hiddenRisks: string[];
}

export const LMIV_ALLERGENS: Record<AllergenIdentifier, AllergenData> = {
  'A': {
    id: 'A',
    name: 'Glutenhaltiges Getreide',
    description: 'Weizen, Roggen, Gerste, Hafer, Dinkel etc.',
    hiddenRisks: ['Paniermehl', 'Mehlschwitze', 'Convenience-Saucen'],
  },
  'B': {
    id: 'B',
    name: 'Krebstiere',
    description: 'Garnelen, Scampi, Hummer, etc.',
    hiddenRisks: ['Fischfonds', 'Gewürzpasten', 'Frutti di Mare Mische'],
  },
  'C': {
    id: 'C',
    name: 'Eier',
    description: 'Eier von Geflügel',
    hiddenRisks: ['Lysozym in Grana Padano/Hartkäse', 'Mayonnaise', 'Panaden', 'Hollandaise/Béarnaise'],
  },
  'D': {
    id: 'D',
    name: 'Fische',
    description: 'Alle Fischarten',
    hiddenRisks: ['Vitello Tonnato Sauce (Sardellen)', 'Saucen'],
  },
  'E': {
    id: 'E',
    name: 'Erdnüsse',
    description: 'Erdnüsse und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Ersatz für Pinienkerne in günstigem Pesto'],
  },
  'F': {
    id: 'F',
    name: 'Sojabohnen',
    description: 'Sojabohnen und daraus gewonnene Erzeugnisse',
    hiddenRisks: ['Wasserbinder in Formschinken / Salami', 'Saucenpulver'],
  },
  'G': {
    id: 'G',
    name: 'Milch (inkl. Laktose)',
    description: 'Milch von Saugetieren',
    hiddenRisks: ['Rahmsaucen', 'Kräuterbutter', 'Cordon-Bleu Füllung', 'Pesto'],
  },
  'H': {
    id: 'H',
    name: 'Schalenfrüchte',
    description: 'Mandeln, Haselnüsse, Walnüsse, Cashews, Pistazien, Macadamia',
    hiddenRisks: ['Pesto Genovese', 'Desserts'],
  },
  'L': {
    id: 'L',
    name: 'Sellerie',
    description: 'Stauden-, Knollen- und Blattsellerie',
    hiddenRisks: ['Soffritto (Basis von Ragù/Tomatensauce)', 'Gewürzmischungen', 'Vitello Tonnato (Pochierfond)', 'Braune Saucen'],
  },
  'M': {
    id: 'M',
    name: 'Senf',
    description: 'Senfkörner, Senfpulver',
    hiddenRisks: ['Emulgator in Saucen (Hollandaise, Mayonnaise)', 'Wurstwaren (Salami/Peperoniwurst)'],
  },
  'N': {
    id: 'N',
    name: 'Sesamsamen',
    description: 'Sesam',
    hiddenRisks: ['Brotsorten', 'Crossover-Gerichte'],
  },
  'O': {
    id: 'O',
    name: 'Sulfite (>10mg/kg)',
    description: 'Schwefeldioxid und Sulfite',
    hiddenRisks: ['Wein (Weißweinsauce)', 'Aceto Balsamico', 'Getrocknete Tomaten', 'Antioxidans in Speck/Schinken'],
  },
  'P': {
    id: 'P',
    name: 'Lupinen',
    description: 'Lupinenmehl, -protein',
    hiddenRisks: ['Glutenfreie Backwaren'],
  },
  'R': {
    id: 'R',
    name: 'Weichtiere',
    description: 'Schnecken, Muscheln (Cozze), Tintenfisch (Calamari)',
    hiddenRisks: ['Frutti di Mare Mische (oft nicht von Krebstieren getrennt)'],
  }
};
