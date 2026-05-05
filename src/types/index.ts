/**
 * TypeScript Type Definitions for Lindener Ratsstuben
 * 
 * Zentrale Typdefinitionen fuer alle Datenstrukturen des Projekts.
 * Diese Datei ist die Single Source of Truth fuer alle Data-Shapes.
 */

// ═══════════════════════════════════════════════════════════════
// BASE PRIMITIVES & BRANDED TYPES (SEQ-12)
// ═══════════════════════════════════════════════════════════════

export type Id = string & { readonly __brand: unique symbol };
export type Slug = string & { readonly __brand: unique symbol };
export type ISODateTime = string;
export type ImagePath = string;

export function createId(id: string): Id {
  return id as Id;
}

export function createSlug(slug: string): Slug {
  return slug as Slug;
}

// ═══════════════════════════════════════════════════════════════
// COMPANY DATA TYPES
// ═══════════════════════════════════════════════════════════════

export interface Address {
  readonly street: string;
  readonly zip: string;
  readonly city: string;
  readonly country: string;
}

export interface TimeRange {
  readonly start: string;
  readonly end: string;
}

export interface OpeningHoursSlot {
  readonly tageKey: string;
  readonly mittags: TimeRange;
  readonly abends: TimeRange;
}

export interface Ruhetag {
  readonly tagKey: string;
  readonly ausnahmeKey: string;
}

export interface OpeningHours {
  readonly regulaer: OpeningHoursSlot;
  readonly sonntag: OpeningHoursSlot;
  readonly ruhetag: Ruhetag;
}

export interface Tagesangebot {
  readonly name: string;
  readonly beschreibung: string;
  readonly tage: string;
  readonly ausnahme: string;
}

export interface EventSitzplaetze {
  readonly terrasse: number;
  readonly gaststaette: number;
  readonly saal: number;
}

export interface EventCatering {
  readonly titel: string;
  readonly beschreibung: string;
  readonly sitzplaetze: EventSitzplaetze;
}

export interface CompanyData {
  readonly companyName: string;
  readonly zusatz: string;
  readonly tagline: string;
  readonly ownerName: string;
  readonly email: string;
  readonly phone: string;
  readonly displayPhone: string;
  readonly facebook: string;
  readonly instagram: string;
  readonly address: Address;
  readonly mapLink: string;
  readonly services: readonly string[];
  readonly paymentMethods: readonly string[];
  readonly openingHours: OpeningHours;
  readonly eventCatering: EventCatering;
  readonly tagesangebot: Tagesangebot;
}

// ═══════════════════════════════════════════════════════════════
// MENU DATA TYPES
// ═══════════════════════════════════════════════════════════════

/** Allergen codes according to EU regulation (A through P) */
export type AllergenCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P';

/** Zusatzstoff codes according to German law (1 through 11) */
export type ZusatzstoffCode = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11';

/** Menu item tags for filtering and display */
export type MenuItemTag = 'vegetarian' | 'vegan' | 'spicy' | 'bestseller' | 'chef-recommendation' | 'new';

/** Spice level from 0 (none) to 3 (very spicy) */
export type SpiceLevel = 0 | 1 | 2 | 3;

export interface MenuCategory {
  readonly id: Id;
  readonly name: string;
  readonly label: string;
}

export interface MenuItem {
  readonly id: Id;
  readonly nr: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly image: string;
  readonly tags: readonly MenuItemTag[];
  readonly allergens: readonly string[];
  readonly zusatzstoffe: readonly string[];
  readonly spiceLevel: SpiceLevel;
}

/** Record mapping allergen code to human-readable description */
export type AllergenLegend = Record<string, string>;

/** Record mapping zusatzstoff code to human-readable description */
export type ZusatzstoffLegend = Record<string, string>;

/** Record mapping category ID to special notes */
export type CategoryNotes = Record<string, string>;

// ═══════════════════════════════════════════════════════════════
// GALLERY TYPES
// ═══════════════════════════════════════════════════════════════

export interface GalleryImage {
  readonly id: Id;
  readonly src: string;
  readonly alt: string;
  readonly category?: 'interior' | 'food' | 'events' | 'exterior';
  readonly width?: number;
  readonly height?: number;
}

// ═══════════════════════════════════════════════════════════════
// FORM TYPES
// ═══════════════════════════════════════════════════════════════

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly datenschutz: boolean;
}

export interface ReservationFormData {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly date: string;
  readonly time: string;
  readonly guests: string;
  readonly message: string;
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION TYPES
// ═══════════════════════════════════════════════════════════════

export interface NavLink {
  readonly href: string;
  readonly label: string;
  readonly external?: boolean;
}

export interface FooterSection {
  readonly title: string;
  readonly links: readonly NavLink[];
}
