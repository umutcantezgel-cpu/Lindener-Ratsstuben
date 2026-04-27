// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — SSOT Menü-Datenbank v3.0
// Einzige Wahrheitsquelle: Speisekarte.md (SSOT-Artikelkatalog)
//
// SCHUTZREGELN (Nicht-Verhandelbar):
// • Keine Erfindung von Artikeln, Preisen, Allergenen oder Tags
// • Keine Entfernung bestehender Artikel
// • Preise zeichengenau (Komma, €-Zeichen)
// • Beschreibungen wortidentisch inkl. Tippfehler
// • Nummern exakt wie vergeben (auch bei Duplikaten)
// • Keine Allergen-Anreicherung ohne SSOT-Grundlage (§1.9)
// ═══════════════════════════════════════════════════════════════

export const SSOT_VERSION = '3.0';
export const SSOT_DATE = '2026-04-22';

// ─── Allergen & Zusatzstoff Type Imports ──────────────────────
import type { AllergenIdentifier } from './allergens';
import type { ZusatzstoffIdentifier } from './zusatzstoffe';
export type { AllergenIdentifier, ZusatzstoffIdentifier };

// ─── SSOT MenuItem Type ───────────────────────────────────────
export interface SSOTMenuItem {
  nr: string;
  name: string;
  description: string;
  price: number | null; // null = {{PREIS FEHLT}}
  category: string;
  allergens: AllergenIdentifier[];
  zusatzstoffe: ZusatzstoffIdentifier[];
}

// ─── Categories (SSOT §3 Reihenfolge) ─────────────────────────
export const categories = [
  { id: 'aperitif', name: 'Aperitif', label: 'Aperitif' },
  { id: 'suppen', name: 'Zuppa', label: 'Zuppa' },
  { id: 'vorspeisen', name: 'Vorspeisen', label: 'Vorspeisen' },
  { id: 'salate', name: 'Salate', label: 'Salate' },
  { id: 'pasta', name: 'Pasta', label: 'Pasta' },
  { id: 'pasta-al-forno', name: 'Aus dem Ofen - Überbackenes', label: 'Aus dem Ofen - Überbackenes' },
  { id: 'hausgemachte-pasta', name: 'Hausgemachte Pasta', label: 'Hausgemachte Pasta' },
  { id: 'schnitzel', name: 'Schnitzelvariation', label: 'Schnitzel' },
  { id: 'fleisch-fisch', name: 'Fleischgerichte & Fischgerichte', label: 'Fleisch & Fisch' },
  { id: 'pizza', name: 'Pizza aus dem Steinofen / 28 cm', label: 'Pizza' },
  { id: 'familienpizza', name: 'Familienpizza aus dem Steinofen / 40 × 60 cm', label: 'Familienpizza' },
  { id: 'saisonal-burger', name: 'Hausgemachte Burger', label: 'Saisonale Burger' },
  { id: 'saisonal-limonaden', name: 'Hausgemachte Limonaden', label: 'Saisonale Limonaden' },
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
  suppen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachtes Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  vorspeisen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachtes Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  salate: 'Unsere Salate servieren wir Kostenlos Hausgemachtes Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  pasta: 'Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.',
  'pasta-al-forno': 'Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.',
  'hausgemachte-pasta': 'Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den nächsten Service-Mitarbeiter.',
  schnitzel: 'Bei unseren Schnitzeln handelt es sich um frischen Schweinerücken.',
  pizza: 'Extrabelege: **Jeder Extrabelag – 1,00 €**\n**Mozzarella – 4,00 €**\n**Thunfisch – 4,00 €**\n**Lachsfilet – 6,00 €**\n**Garnelen – 6,00 €**\n**Burrata – 6,00 €**',
  familienpizza: 'Extrabelege: **Jeder Extrabelag – 4,00 €**\n**Mozzarella – 12,00 €**\n**Thunfisch – 12,00 €**\n**Lachsfilet – 16,00 €**\n**Garnelen – 16,00 €**\n**Burrata – 16,00 €**',

};

// ─── Category Header Texts (wörtlich aus SSOT) ───────────────
export const categoryHeaderTexts: Record<string, string> = {
  pizza: 'alle Pizzen werden mit Tomaten soße mit Special würzen & Käse zubereitet.',
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

// ─── Allergen Legend (Ratsstuben-Hausschema, LMIV-konform) ────
export const allergenLegend: Record<string, string> = {
  'A': 'Schwefeldioxid und Sulfite',
  'B': 'Milch / Laktose',
  'C': 'Nüsse (1 Mandel - 2 Erdnuss - 3 Walnuss - 4 Haselnuss)',
  'D': 'Sesam',
  'E': 'glutenhaltiges Getreide (1 Weizen - 2 Hafer - 3 Roggen - 4 Gerste - 5 Dinkel)',
  'F': 'Sellerie',
  'G': 'Senf',
  'H': 'Krebstiere',
  'I': 'Eier',
  'K': 'Fische',
  'M': 'Weichtiere',
  'O': 'Lupinen',
  'P': 'Sojabohnen',
};

// ─── Zusatzstoff Legend (Ratsstuben-Hausschema) ───────────────
export const zusatzstoffLegend: Record<string, string> = {
  '1': 'mit Farbstoff',
  '2': 'mit Konservierungsstoffe',
  '3': 'mit Nitropökelsalz',
  '4': 'mit Antioxidationsmittel',
  '5': 'mit Geschmacksverstärker',
  '6': 'geschwefelt',
  '7': 'geschwärzt',
  '8': 'mit Phosphat',
  '9': 'mit Milcheiweiß',
  '10': 'koffeinhaltig',
  '11': 'mit Süßungsmittel',
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
