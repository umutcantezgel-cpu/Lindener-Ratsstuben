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
  { id: 'pasta', name: 'Pasta', label: 'Pasta' },
  { id: 'pasta-al-forno', name: 'Pasta al Forno', label: 'Überbacken' },
  { id: 'hausgemachte-pasta', name: 'Hausgemachte Pasta', label: 'Hausgemacht' },
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
  { id: 'burger', name: 'Hausgemachte Burger', label: 'Burger' },
  { id: 'limonaden', name: 'Hausgemachte Limonaden', label: 'Limonaden' },
];

// ─── Category Footnotes (wörtlich aus SSOT) ───────────────────
export const categoryFootnotes: Record<string, string> = {
  suppen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  vorspeisen: 'Unsere Suppen & Vorspeisen servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  salate: 'Unsere Salate servieren wir Kostenlos Hausgemachte Brot - auf Wunsch Pizzabrot Tomaten Soße & Knoblauch 6,50€',
  pizza: 'alle Pizzen werden mit Tomaten soße mit Special würzen & Käse zubereitet.',
  burger: 'Alle Burger werden frisch zubereitet und mit knusprigen Pommes Frites serviert.',
  limonaden: 'Alle Limonaden werden frisch zubereitet und mit ausgewählten Zutaten verfeinert.',
};

// ─── Category Header Texts (wörtlich aus SSOT) ───────────────
export const categoryHeaderTexts: Record<string, string> = {
  burger: 'Unsere Burger werden mit 100 % hochwertigem Rindfleisch, frischen Zutaten und unserer hausgemachten Sauce zubereitet – serviert mit knusprigen Pommes Frites.',
  limonaden: 'Genießen Sie unsere liebevoll zubereiteten, hausgemachten Limonaden – aus besten Zutaten, mit ausgewogenen Aromen und perfekt abgestimmt für ein besonderes Geschmackserlebnis.',
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

// ─── Allergen Legend (kept for UI — NOT linked to items per SSOT Rule 9) ─
export const allergenLegend: Record<string, string> = {
  A: "Glutenhaltiges Getreide", B: "Krebstiere", C: "Eier", D: "Fische",
  E: "Erdnüsse", F: "Sojabohnen", G: "Milch (inkl. Laktose)",
  H: "Schalenfrüchte (Nüsse)", L: "Sellerie", M: "Senf",
  N: "Sesamsamen", O: "Schwefeldioxid und Sulfite", P: "Lupinen", R: "Weichtiere",
};

// ─── Zusatzstoff Legend ───────────────────────────────────────
export const zusatzstoffLegend: Record<string, string> = {
  "1": "mit Farbstoff", "2": "mit Konservierungsstoffe", "3": "mit Nitropökelsalz",
  "4": "mit Antioxidationsmittel", "5": "mit Geschmacksverstärker", "6": "geschwefelt",
  "7": "geschwärzt", "8": "mit Phosphat", "9": "mit Milcheiweiß",
  "10": "koffeinhaltig", "11": "mit Süßungsmittel",
};

// ─── Legal Disclaimers ────────────────────────────────────────
export const legal_disclaimers = {
  allergens: "Lieber Gast! Informationen über Zutaten in unseren Speisen, die Allergien oder Unverträglichkeiten auslösen können, erhalten Sie auf Nachfrage bei unseren Servicemitarbeiter/innen.",
  cross_contamination: "Kreuzkontamination: Trotz größter Sorgfalt bei der Zubereitung können wir nicht zu 100% garantieren, dass Gerichte vollkommen frei von Spuren anderer Allergene sind.",
  additives: "Bei den angegebenen Zusatzstoffen stützen wir uns auf die Deklarationen unserer Lieferanten. Änderungen der Rezepturen der Hersteller bleiben vorbehalten.",
};

// ─── Known Data Gaps (SSOT §4) ────────────────────────────────
export const knownDataGaps = [
  { issue: 'Nr. 104 fehlt zwischen Pizza 103 und 105', severity: 'info' },
  { issue: 'Nr. 166 Trade Island Pfirsich — Preis fehlt', severity: 'blocker' },
  { issue: 'Nr. 210 Possmann Apfelwein — Preis fehlt', severity: 'blocker' },
  { issue: 'Nr. 188 dreifach vergeben', severity: 'warning' },
  { issue: 'Nr. 221/227 Himbergeist sowie 222/228 Obstler doppelt', severity: 'warning' },
  { issue: 'Spirituosen & Liköre "0,2 cl" — Mengeneinheit ungewöhnlich', severity: 'info' },
  { issue: 'Alle 4 Burger — keine Preise', severity: 'blocker' },
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
