/**
 * ═══════════════════════════════════════════════════════════════
 * llms-full.txt – COMPREHENSIVE AI KNOWLEDGE DUMP
 * Single-request, full-content export for LLMs (ChatGPT, Gemini,
 * Perplexity, Claude, Copilot). Contains all business data,
 * complete menu with prices, FAQ, services, and contact info.
 * Dynamically generated from SSOT sources.
 * ═══════════════════════════════════════════════════════════════
 */

import { NextResponse, NextRequest } from 'next/server';
import { companyData } from '@/data/company';
import { foodItems } from '@/data/menu-ssot-food';
import { drinkItems } from '@/data/menu-ssot-drinks';
import { categories } from '@/data/menu';

// ── Inline FAQ data (DE — primary language) ─────────────────
const FAQ_ITEMS = [
  { q: 'Was sind die Lindener Ratsstuben?', a: 'Die Lindener Ratsstuben sind ein Traditionsrestaurant im hessischen Linden, das sich auf authentische deutsch-italienische und mediterrane Küche spezialisiert hat. Neben dem regulären Tagesbetrieb mit Mittagstisch und Abendessen bietet das Restaurant auch einen Event- und Catering-Service sowie ein hauseigenes Kegelzentrum.' },
  { q: 'Was kostet das Essen in den Lindener Ratsstuben?', a: 'Die Preise sind moderat und familienfreundlich. Pasta-Gerichte kosten zwischen 12,90 € und 22,90 €, Pizzen zwischen 9,50 € und 17,00 €, Schnitzelgerichte zwischen 16,90 € und 22,90 €, Steaks und Fischgerichte zwischen 18,90 € und 32,90 €. Es gibt ein tägliches 2-Gänge-Menü zum günstigen Preis.' },
  { q: 'Wann hat das Restaurant geöffnet?', a: 'Die Lindener Ratsstuben haben von Dienstag bis Sonntag geöffnet. Mittagstisch von 12:00 bis 14:30 Uhr, Abendessen von 17:30 bis 22:30 Uhr (Sonntags bis 21:00 Uhr). Montag ist Ruhetag, außer an gesetzlichen Feiertagen.' },
  { q: 'Gibt es vegetarische Gerichte?', a: 'Ja, es gibt eine große Auswahl an vegetarischen Gerichten: Pizza Margherita, Pizza Vegetale, Bruschetta, La Burrata, Tagliatelle al Ragù di Verdure, Gnocchi mit Basilikum Pesto und Burrata, verschiedene Salate und mehr.' },
  { q: 'Bietet das Restaurant Catering an?', a: 'Ja, die Lindener Ratsstuben bieten professionellen Event- und Catering-Service für Hochzeiten, Firmenfeiern, Geburtstage und Kommunionen. Die Räumlichkeiten bieten Platz für bis zu 120 Personen im Veranstaltungssaal, 100 auf der beheizten Terrasse und 70 in der Gaststätte.' },
  { q: 'Wo befinden sich die Lindener Ratsstuben?', a: 'Konrad-Adenauer-Straße 26, 35440 Linden, Deutschland. Das Restaurant liegt zentral in Linden bei Gießen (Hessen) und ist gut erreichbar mit Auto (ausreichend Parkplätze vorhanden) und öffentlichen Verkehrsmitteln.' },
  { q: 'Gibt es eine Kegelbahn?', a: 'Ja, die Lindener Ratsstuben betreiben ein hauseigenes Kegelzentrum für Freizeit- und Sportkegler. Die Bahnen können für Gruppenveranstaltungen, Betriebsfeiern und private Feiern gebucht werden.' },
  { q: 'Kann man im Restaurant reservieren?', a: 'Ja, Reservierungen sind telefonisch unter 06403 - 64556 oder per E-Mail an hasantoker38@hotmail.de möglich. Für größere Gruppen und Veranstaltungen empfehlen wir eine frühzeitige Reservierung.' },
  { q: 'Ist das Restaurant barrierefrei?', a: 'Ja, die Lindener Ratsstuben sind barrierefrei zugänglich. Weitere Services umfassen: Außenbereich mit beheizter Terrasse, kostenfreies WLAN, Parkplätze, Essen zum Mitnehmen und Haustiere sind erlaubt.' },
  { q: 'Welche Küche bieten die Lindener Ratsstuben?', a: 'Die Küche ist deutsch-italienisch und mediterran. Die Speisekarte umfasst authentische italienische Gerichte (Pizza aus dem Steinofen, hausgemachte Pasta, Antipasti), deutsche Spezialitäten (Schnitzelvariationen) und argentinische Steaks vom Lava-Grill. Alle Gerichte werden frisch zubereitet.' },
];

// ── Category display name map ───────────────────────────────
const CATEGORY_LABELS: Record<string, string> = {};
for (const cat of categories) {
  CATEGORY_LABELS[cat.id] = cat.name;
}

// ── Format price ────────────────────────────────────────────
function fmtPrice(price: number | null): string {
  if (price === null || price === 0) return 'Preis auf Anfrage';
  return `${price.toFixed(2).replace('.', ',')} €`;
}

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

  const lines: string[] = [];

  // ═══════════════════════════════════════════════════════════
  // HEADER
  // ═══════════════════════════════════════════════════════════
  lines.push('# Lindener Ratsstuben — Vollständige Wissensbasis');
  lines.push('');
  lines.push('> Restaurant und Kegelzentrum in Linden bei Gießen, Hessen.');
  lines.push('> Deutsch-Italienische Küche — Frisch zubereitet mit Leidenschaft.');
  lines.push('> Das einzige Restaurant in Linden mit eigenem Kegelzentrum und Veranstaltungssaal.');
  lines.push('');
  lines.push(`Quelle: ${baseUrl}`);
  lines.push(`Letzte Aktualisierung: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // ÜBER UNS
  // ═══════════════════════════════════════════════════════════
  lines.push('## Über das Restaurant');
  lines.push('');
  lines.push(`Die **${companyData.companyName}** (${companyData.zusatz}) sind ein Traditionsrestaurant im hessischen Linden, gegründet und geführt von **${companyData.ownerName}**. Das Restaurant verbindet authentische deutsch-italienische und mediterrane Küche mit herzlicher hessischer Gastfreundschaft.`);
  lines.push('');
  lines.push('Die Küche bietet eine vielfältige Auswahl: von klassischen italienischen Pizzen aus dem Steinofen und frisch hausgemachten Nudeln bis hin zu deutschen Schnitzelvariationen und argentinischen Steaks vom Lava-Grill. Alle Gerichte werden täglich frisch mit hochwertigen, saisonalen Zutaten zubereitet.');
  lines.push('');
  lines.push('**Alleinstellungsmerkmale:**');
  lines.push('- Einziges Restaurant in Linden mit eigenem Kegelzentrum');
  lines.push('- Veranstaltungssaal für bis zu 120 Personen');
  lines.push('- Beheizte Außenterrasse mit 100 Sitzplätzen');
  lines.push('- Professioneller Catering-Service für Hochzeiten, Firmenfeiern und Jubiläen');
  lines.push('- Täglich wechselndes 2-Gänge-Menü (Dienstag bis Freitag)');
  lines.push('- Kinderfreundlich mit eigener Kinderkarte');
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // KONTAKT & ÖFFNUNGSZEITEN
  // ═══════════════════════════════════════════════════════════
  lines.push('## Kontakt & Anfahrt');
  lines.push('');
  lines.push(`- **Adresse:** ${companyData.address.street}, ${companyData.address.zip} ${companyData.address.city}, ${companyData.address.country}`);
  lines.push(`- **Telefon:** ${companyData.displayPhone}`);
  lines.push(`- **E-Mail:** ${companyData.email}`);
  lines.push(`- **Website:** ${baseUrl}`);
  lines.push(`- **Facebook:** ${companyData.facebook}`);
  lines.push('- **Parkplätze:** Ja, ausreichend kostenlose Parkplätze vorhanden');
  lines.push('');
  lines.push('## Öffnungszeiten');
  lines.push('');
  lines.push('| Tag | Mittagstisch | Abendessen |');
  lines.push('|:----|:------------|:-----------|');
  lines.push('| Montag | Geschlossen (Ruhetag) | Geschlossen (Ruhetag) |');
  lines.push(`| Dienstag | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push(`| Mittwoch | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push(`| Donnerstag | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push(`| Freitag | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push(`| Samstag | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push(`| Sonntag | ${companyData.openingHours.regulaer.mittags.start} – ${companyData.openingHours.regulaer.mittags.end} Uhr | ${companyData.openingHours.regulaer.abends.start} – ${companyData.openingHours.regulaer.abends.end} Uhr |`);
  lines.push('');
  lines.push('> An gesetzlichen Feiertagen gelten Sonderöffnungszeiten. Auch montags geöffnet, wenn ein Feiertag fällt.');
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // SERVICES
  // ═══════════════════════════════════════════════════════════
  lines.push('## Services & Ausstattung');
  lines.push('');
  for (const service of companyData.services) {
    lines.push(`- ${service}`);
  }
  lines.push('');
  lines.push('**Zahlungsmethoden:** ' + companyData.paymentMethods.join(', '));
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // VOLLSTÄNDIGE SPEISEKARTE
  // ═══════════════════════════════════════════════════════════
  lines.push('## Vollständige Speisekarte');
  lines.push('');
  lines.push('Alle Preise in Euro (€), inklusive Mehrwertsteuer.');
  lines.push('');

  // Group food items by category
  const foodByCategory = new Map<string, typeof foodItems>();
  for (const item of foodItems) {
    const existing = foodByCategory.get(item.category) || [];
    existing.push(item);
    foodByCategory.set(item.category, existing);
  }

  for (const [catId, items] of foodByCategory) {
    const label = CATEGORY_LABELS[catId] || catId;
    lines.push(`### ${label}`);
    lines.push('');
    for (const item of items) {
      const desc = item.description ? ` — ${item.description}` : '';
      lines.push(`- **${item.name}**: ${fmtPrice(item.price)}${desc}`);
    }
    lines.push('');
  }

  // ═══════════════════════════════════════════════════════════
  // GETRÄNKEKARTE
  // ═══════════════════════════════════════════════════════════
  lines.push('## Getränkekarte');
  lines.push('');

  const drinksByCategory = new Map<string, typeof drinkItems>();
  for (const item of drinkItems) {
    const existing = drinksByCategory.get(item.category) || [];
    existing.push(item);
    drinksByCategory.set(item.category, existing);
  }

  for (const [catId, items] of drinksByCategory) {
    const label = CATEGORY_LABELS[catId] || catId;
    lines.push(`### ${label}`);
    lines.push('');
    for (const item of items) {
      const desc = item.description ? ` — ${item.description}` : '';
      lines.push(`- **${item.name}**: ${fmtPrice(item.price)}${desc}`);
    }
    lines.push('');
  }

  // ═══════════════════════════════════════════════════════════
  // EVENTS & KEGELBAHN
  // ═══════════════════════════════════════════════════════════
  lines.push('## Veranstaltungen & Catering');
  lines.push('');
  lines.push(`${companyData.eventCatering.beschreibung}`);
  lines.push('');
  lines.push('**Kapazitäten:**');
  lines.push(`- Beheizte Terrasse: ${companyData.eventCatering.sitzplaetze.terrasse} Sitzplätze`);
  lines.push(`- Gaststätte: ${companyData.eventCatering.sitzplaetze.gaststaette} Sitzplätze`);
  lines.push(`- Veranstaltungssaal: ${companyData.eventCatering.sitzplaetze.saal} Sitzplätze`);
  lines.push('');
  lines.push('**Geeignet für:** Hochzeiten, Firmenjubiläen, Geburtstage, Kommunionen, Taufen, Betriebsfeiern, Weihnachtsfeiern, Vereinsfeiern');
  lines.push('');

  lines.push('## Kegelzentrum');
  lines.push('');
  lines.push('Die Lindener Ratsstuben betreiben ein hauseigenes Kegelzentrum für Freizeit- und Sportkegler. Die Kegelbahnen können für Gruppenveranstaltungen, Betriebsausflüge, Geburtstage und Vereinsabende gebucht werden. Zur Kegel-Veranstaltung kann ein individuelles Speise- und Getränkeangebot zusammengestellt werden.');
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // TAGESANGEBOT
  // ═══════════════════════════════════════════════════════════
  lines.push('## Tagesangebot');
  lines.push('');
  lines.push(`**${companyData.tagesangebot.name}:** ${companyData.tagesangebot.beschreibung}`);
  lines.push(`Verfügbar: ${companyData.tagesangebot.tage} (${companyData.tagesangebot.ausnahme})`);
  lines.push('');

  // ═══════════════════════════════════════════════════════════
  // FAQ
  // ═══════════════════════════════════════════════════════════
  lines.push('## Häufige Fragen (FAQ)');
  lines.push('');
  for (const faq of FAQ_ITEMS) {
    lines.push(`### ${faq.q}`);
    lines.push('');
    lines.push(faq.a);
    lines.push('');
  }

  // ═══════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════
  lines.push('---');
  lines.push('');
  lines.push('## Weiterführende Links');
  lines.push('');
  lines.push(`- [Startseite](${baseUrl}/de)`);
  lines.push(`- [Speisekarte](${baseUrl}/de/menu)`);
  lines.push(`- [Über Uns](${baseUrl}/de/about)`);
  lines.push(`- [Kegelbahn](${baseUrl}/de/kegelbahn)`);
  lines.push(`- [Reservierung](${baseUrl}/de/reservation)`);
  lines.push(`- [Kontakt](${baseUrl}/de/contact)`);
  lines.push(`- [Kurzindex für KI (llms.txt)](${baseUrl}/llms.txt)`);
  lines.push(`- [Sitemap](${baseUrl}/sitemap.xml)`);
  lines.push('');

  const content = lines.join('\n');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'X-Content-Source': 'llms-full-knowledge-base',
    },
  });
}
