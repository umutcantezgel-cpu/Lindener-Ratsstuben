// ═══════════════════════════════════════════════════════════════
// Lindener Ratsstuben — SSOT Menü-Datenbank v1.0
// Einzige Wahrheitsquelle: SSOT-Artikelkatalog v1.0 (2026-04-17)
//
// SCHUTZREGELN (Nicht-Verhandelbar):
// • Keine Erfindung von Artikeln, Preisen, Allergenen oder Tags
// • Keine Entfernung bestehender Artikel
// • Preise zeichengenau (Komma, €-Zeichen)
// • Beschreibungen wortidentisch inkl. Tippfehler
// • Nummern exakt wie vergeben (auch bei Duplikaten)
// ═══════════════════════════════════════════════════════════════

export const SSOT_VERSION = '1.0';
export const SSOT_DATE = '2026-04-17';

// ─── SSOT MenuItem Type ───────────────────────────────────────
export interface SSOTMenuItem {
  nr: string;
  name: string;
  description: string;
  price: number | null; // null = {{PREIS FEHLT}}
  category: string;
}

// ─── Categories (SSOT §3 Reihenfolge) ─────────────────────────
export const categories = [
  { id: 'suppen', name: 'Suppen', label: 'Suppen' },
  { id: 'vorspeisen', name: 'Vorspeisen', label: 'Vorspeisen' },
  { id: 'salate', name: 'Salate', label: 'Salate' },
  { id: 'pasta', name: 'Nudelgerichte', label: 'Nudelgerichte' },
  { id: 'pasta-al-forno', name: 'Überbackene Nudelgerichte', label: 'Überbacken' },
  { id: 'hausgemachte-pasta', name: 'Hausgemachte Nudelgerichte', label: 'Hausgemacht' },
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
  suppen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  vorspeisen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  salate: 'Unsere Salate servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  pizza: 'alle Pizzen werden mit Tomaten soße mit Special würzen & Käse zubereitet.',
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

// ─── Allergen Legend (removed per request) ────────────────────
export const allergenLegend: Record<string, string> = {};

// ─── Zusatzstoff Legend (removed per request) ─────────────────
export const zusatzstoffLegend: Record<string, string> = {};

// ─── Legal Disclaimers (removed per request) ──────────────────
export const legal_disclaimers = {
  allergens: "",
  cross_contamination: "",
  additives: "",
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
