// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — SSOT Menü-Datenbank v2.0
// Einzige Wahrheitsquelle: SSOT-Artikelkatalog v2.0 (2026-04-20)
//
// SCHUTZREGELN (Nicht-Verhandelbar):
// • Keine Erfindung von Artikeln, Preisen, Allergenen oder Tags
// • Keine Entfernung bestehender Artikel
// • Preise zeichengenau (Komma, €-Zeichen)
// • Beschreibungen wortidentisch inkl. Tippfehler
// • Nummern exakt wie vergeben (auch bei Duplikaten)
// ═══════════════════════════════════════════════════════════════

export const SSOT_VERSION = '2.0';
export const SSOT_DATE = '2026-04-20';

// ─── Allergen Type Import ──────────────────────────────────────
import type { AllergenIdentifier } from './allergens';
export type { AllergenIdentifier };

// ─── SSOT MenuItem Type ───────────────────────────────────────
export interface SSOTMenuItem {
  nr: string;
  name: string;
  description: string;
  price: number | null; // null = {{PREIS FEHLT}}
  category: string;
  allergens: AllergenIdentifier[]; // LMIV EU-VO 1169/2011 Allergen-Codes
}

// ─── Categories (SSOT §3 Reihenfolge) ─────────────────────────
export const categories = [
  { id: 'suppen', name: 'Suppen', label: 'Suppen' },
  { id: 'vorspeisen', name: 'Vorspeisen', label: 'Vorspeisen' },
  { id: 'salate', name: 'Salate', label: 'Salate' },
  { id: 'pasta', name: 'Pasta', label: 'Pasta' },
  { id: 'pasta-al-forno', name: 'Überbackene Nudelgerichte', label: 'Überbacken' },
  { id: 'hausgemachte-pasta', name: 'Hausgemachte Nudelgerichte', label: 'Hausgemachte Nudeln' },
  { id: 'schnitzel', name: 'Schnitzelvariation', label: 'Schnitzel' },
  { id: 'fleisch-fisch', name: 'Fleischgerichte & Fischgerichte', label: 'Fleisch & Fisch' },
  { id: 'pizza', name: 'Pizza aus dem Steinofen / 28 cm', label: 'Pizza' },
  { id: 'familienpizza', name: 'Familienpizza aus dem Steinofen / 40 × 60 cm', label: 'Familienpizza' },
  { id: 'kindergerichte', name: 'Kindergerichte', label: 'Kindergerichte' },
  { id: 'dessert', name: 'Dessert', label: 'Dessert' },
  { id: 'warme-getraenke', name: 'Warme Getränke', label: 'Kaffee & Tee' },
  { id: 'alkoholfreie-getraenke', name: 'Alkoholfreie Getränke', label: 'Alkoholfrei' },
  { id: 'saefte', name: 'Säfte von Vaihinger', label: 'Säfte' },
  { id: 'biere', name: 'Biere', label: 'Biere' },
  { id: 'rotweine', name: 'Offene Rotweine', label: 'Rotweine' },
  { id: 'weissweine', name: 'Offene Weißweine', label: 'Weißweine' },
  { id: 'spirituosen', name: 'Spirituosen 0,2 cl', label: 'Spirituosen' },
  { id: 'likoere', name: 'Liköre 0,2 cl', label: 'Liköre' },
];

// ─── Category Footnotes (wörtlich aus SSOT) ───────────────────
export const categoryFootnotes: Record<string, string> = {
  suppen: 'Unsere Suppen & Vorspeisen servieren wir mit hausgemachtem Brot. Auf Wunsch Pizzabrot, Tomatensauce & Knoblauch (6,50 €).',
  vorspeisen: 'Unsere Suppen & Vorspeisen servieren wir mit hausgemachtem Brot. Auf Wunsch Pizzabrot, Tomatensauce & Knoblauch (6,50 €).',
  salate: 'Unsere Salate servieren wir mit hausgemachtem Brot. Auf Wunsch Pizzabrot, Tomatensauce & Knoblauch (6,50 €).',
  pasta: 'Pasta Gerichte werden auf Anfrage auch vegan serviert, bitte sprechen Sie dafür mit einer Servicekraft.',
  pizza: 'Alle Pizzen werden mit speziell gewürzter Tomatensauce und Käse zubereitet.',
};

// ─── Category Header Texts (wörtlich aus SSOT) ───────────────
export const categoryHeaderTexts: Record<string, string> = {
};

// ─── Category Extras (SSOT-Preise) ────────────────────────────
export interface ExtraItem { name: string; price: number | null; }
export const categoryExtras: Record<string, ExtraItem[]> = {
  familienpizza: [
    { name: 'Jeder Extrabelag', price: 4.00 },
    { name: 'Mozzarella', price: 12.00 },
    { name: 'Thunfisch', price: 12.00 },
    { name: 'Lachsfilet', price: 16.00 },
    { name: 'Garnelen', price: 16.00 },
    { name: 'Burrata', price: 16.00 },
  ],
  dessert: [
    { name: 'Extrasahne', price: 1.50 },
    { name: 'Extrasoße (Erdbeer oder Schokosoße)', price: 1.50 },
  ],
  saefte: [
    { name: 'Alle Säfte auch als Schorle 0,2', price: 3.20 },
    { name: 'Alle Säfte auch als Schorle 0,4', price: 5.70 },
  ],
};

// ─── Combined Menu Items ──────────────────────────────────────
import { foodItems } from './menu-ssot-food';
import { drinkItems } from './menu-ssot-drinks';

export const menuItems: SSOTMenuItem[] = [...foodItems, ...drinkItems];

// ─── Allergen Legend (LMIV EU-VO 1169/2011 — 14 deklarationspflichtige Allergene) ─
export const allergenLegend: Record<string, string> = {
  'A': 'Glutenhaltiges Getreide',
  'B': 'Krebstiere',
  'C': 'Eier',
  'D': 'Fische',
  'E': 'Erdnüsse',
  'F': 'Sojabohnen',
  'G': 'Milch (inkl. Laktose)',
  'H': 'Schalenfrüchte',
  'L': 'Sellerie',
  'M': 'Senf',
  'N': 'Sesamsamen',
  'O': 'Sulfite (>10mg/kg)',
  'P': 'Lupinen',
  'R': 'Weichtiere',
};

// ─── Zusatzstoff Legend ───────────────────────────────────────
export const zusatzstoffLegend: Record<string, string> = {
  '1': 'mit Farbstoff',
  '2': 'mit Konservierungsstoff',
  '3': 'mit Antioxidationsmittel',
  '4': 'mit Geschmacksverstärker',
  '5': 'geschwefelt',
  '6': 'geschwärzt',
  '7': 'mit Phosphat',
  '8': 'mit Süßungsmitteln',
  '9': 'enthält eine Phenylalaninquelle',
  '10': 'koffeinhaltig',
};

// ─── Legal Disclaimers (LMIV-konform) ─────────────────────────
export const legal_disclaimers = {
  allergens: 'Die Kennzeichnung der Allergene erfolgt gemäß EU-Verordnung Nr. 1169/2011 (LMIV). Die aufgeführten Allergene basieren auf den uns bekannten Rezepturen und Zutatenlisten unserer Lieferanten.',
  cross_contamination: 'Liebe Gäste, in unserer Küche verarbeiten wir täglich alle 14 deklarationspflichtigen Hauptallergene. Trotz sorgfältiger Arbeitsweise und getrennter Zubereitung können wir Kreuzkontaminationen nicht mit absoluter Sicherheit ausschließen. Bitte informieren Sie unser Servicepersonal vor Ihrer Bestellung über bestehende Allergien oder Unverträglichkeiten — wir beraten Sie gerne persönlich und passen Gerichte nach Möglichkeit individuell an.',
  additives: 'Zusatzstoffe gemäß LMIV. Änderungen vorbehalten. Verbindliche Auskunft erteilt unser Servicepersonal.',
};

// ─── Known Data Gaps (SSOT §4) ────────────────────────────────
export const knownDataGaps = [
  { issue: 'Nr. 104 fehlt zwischen Pizza 103 und 105', severity: 'info' },
  { issue: 'Nr. 166 Trade Island Pfirsich — Preis fehlt', severity: 'blocker' },
  { issue: 'Nr. 210 Possmann Apfelwein — Preis fehlt', severity: 'blocker' },
  { issue: 'Nr. 188 dreifach vergeben', severity: 'warning' },
  { issue: 'Nr. 221/227 Himbergeist sowie 222/228 Obstler doppelt', severity: 'warning' },
  { issue: 'Spirituosen & Liköre "0,2 cl" — Mengeneinheit ungewöhnlich', severity: 'info' },
  { issue: '"Sprit" (160/161) — Schreibweise so übernommen', severity: 'info' },
];

// ─── Category Notes (legacy compat) ──────────────────────────
export const categoryNotes: Record<string, string> = categoryFootnotes;

// ─── Getter Functions ─────────────────────────────────────────
export function getAllMenuItems(): SSOTMenuItem[] {
  return [...menuItems];
}

export function getMenuItemsByCategory(categoryId: string): SSOTMenuItem[] {
  if (!categoryId) return [];
  return menuItems.filter(item => item.category === categoryId);
}

export function getAllCategories() {
  return [...categories];
}

// Legacy compat exports
export const strictMenuItems = menuItems;
export const strictCategories = categories;

// ─── Price Formatting (SSOT: Komma, €-Zeichen) ───────────────
// Legacy formatPrice was removed, use formatCurrency from @/lib/i18n/formatters/number instead.

// ─── Dev Assertions ───────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  const catIds = new Set(categories.map(c => c.id));
  for (const item of menuItems) {
    if (!catIds.has(item.category)) {
      console.warn(`[SSOT] MenuItem "${item.name}" references unknown category "${item.category}"`);
    }
  }
  const nullPriceItems = menuItems.filter(i => i.price === null);
  if (nullPriceItems.length > 0) {
    console.info(`[SSOT] ${nullPriceItems.length} Artikel ohne Preis ({{PREIS FEHLT}}):`, nullPriceItems.map(i => `${i.nr || '—'} ${i.name}`));
  }
  console.info(`[SSOT] Menu loaded: ${menuItems.length} Artikel in ${categories.length} Kategorien (v${SSOT_VERSION})`);
}
