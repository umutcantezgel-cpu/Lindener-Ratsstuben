const fs = require('fs');

const path = '/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/data/menu.ts';
let content = fs.readFileSync(path, 'utf8');

// The mapping from old to new EU codes
const map = {
    'A': 'O', // Sulfite
    'B': 'G', // Milch
    'C': 'H', // Nüsse (if there is C1, C2 etc, we can just map to H. Wait, 1 Mandel, etc. If they have C1, replace with H)
    'C1': 'H', 'C2': 'E', 'C3': 'H', 'C4': 'H',
    'D': 'N', // Sesam
    'E1': 'A', 'E2': 'A', 'E3': 'A', 'E4': 'A', 'E5': 'A', // Glutenhaltiges Getreide -> A
    'E': 'A',
    'F': 'L', // Sellerie
    'G': 'M', // Senf
    'H': 'B', // Krebstiere
    'I': 'C', // Eier
    'K': 'D', // Fische
    'M': 'R', // Weichtiere
    'O': 'P', // Lupinen
    'P': 'F', // Soja
};

content = content.replace(/allergens:\s*\[(.*?)\]/g, (match, arrStr) => {
    if (!arrStr.trim()) return match;
    // split by comma, clean quotes, map, return new
    const elements = arrStr.split(',').map(s => s.trim().replace(/['"]/g, ''));
    
    // sort to keep them alphabetical
    const newElements = Array.from(new Set(elements.map(e => map[e] || e))).sort();
    
    return `allergens: [${newElements.map(e => `'${e}'`).join(', ')}]`;
});

// Update allergenLegend and allergenHinweis
content = content.replace(/export const allergenLegend: Record<string, string> = \{[\s\S]*?\};/, `export const allergenLegend: Record<string, string> = {
    A: "Glutenhaltiges Getreide",
    B: "Krebstiere",
    C: "Eier",
    D: "Fische",
    E: "Erdnüsse",
    F: "Sojabohnen",
    G: "Milch (inkl. Laktose)",
    H: "Schalenfrüchte (Nüsse)",
    L: "Sellerie",
    M: "Senf",
    N: "Sesamsamen",
    O: "Schwefeldioxid und Sulfite",
    P: "Lupinen",
    R: "Weichtiere",
};`);

// Remove old allergenHinweis and add legal_disclaimers
content = content.replace(/export const allergenHinweis = ".*?";/, `
export const legal_disclaimers = {
  allergens: "Lieber Gast! Informationen über Zutaten in unseren Speisen, die Allergien oder Unverträglichkeiten auslösen können, erhalten Sie auf Nachfrage bei unseren Servicemitarbeiter/innen.",
  cross_contamination: "Kreuzkontamination: Trotz größter Sorgfalt bei der Zubereitung können wir nicht zu 100% garantieren, dass Gerichte vollkommen frei von Spuren anderer Allergene sind. Wenn Sie an einer schweren lebensbedrohlichen Allergie leiden (z.B. Erdnussanaphylaxie, schwere Zöliakie), informieren Sie uns bitte zwingend VOR der Bestellung, damit wir entsprechende Schutzmaßnahmen (z.B. separater Pfannenwechsel) ergreifen können. Bei extremen Risiken behalten wir uns zu Ihrem eigenen Schutz vor, bestimmte Gerichte nicht zu servieren.",
  vegan_vegetarian: "Pflanzliche Gerichte: „Vegetarisch“ oder „Vegan“ gekennzeichnete Gerichte werden nach besten Gewissen fleisch-/tierproduktfrei zubereitet (z.B. pflanzliches Lab bei einigen Käsesorten, sofern deklariert). Jedoch kann auf denselben Grillflächen auch Fleisch zubereitet werden. Wenn Sie aus religiösen oder ethischen Gründen eine absolute, physische Trennung von Kochgeschirr verlangen, weisen Sie uns bitte darauf hin.",
  additives: "Bei den angegebenen Zusatzstoffen (z.B. „mit Farbstoff“, „mit Konservierungsstoff“) stützen wir uns auf die Deklarationen unserer Lieferanten. Änderungen der Rezepturen der Hersteller bleiben vorbehalten."
};`);

fs.writeFileSync(path, content, 'utf8');
console.log('updated menu.ts');
