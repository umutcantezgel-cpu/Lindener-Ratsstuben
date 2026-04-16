import re

path = '/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/data/menu.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# The mapping from old to new EU codes
mapping = {
    'A': 'O',
    'B': 'G',
    'C': 'H',
    'C1': 'H', 'C2': 'E', 'C3': 'H', 'C4': 'H',
    'D': 'N',
    'E1': 'A', 'E2': 'A', 'E3': 'A', 'E4': 'A', 'E5': 'A',
    'E': 'A',
    'F': 'L',
    'G': 'M',
    'H': 'B',
    'I': 'C',
    'K': 'D',
    'M': 'R',
    'O': 'P',
    'P': 'F',
}

def replace_allergens(match):
    arr_str = match.group(1)
    if not arr_str.strip():
        return match.group(0)
    
    # split by comma, clean quotes
    elements = [s.strip().replace("'", "").replace('"', "") for s in arr_str.split(',')]
    
    # map and deduplicate
    new_elements = sorted(list(set([mapping.get(e, e) for e in elements])))
    
    new_str = ", ".join([f"'{e}'" for e in new_elements])
    return f"allergens: [{new_str}]"

content = re.sub(r'allergens:\s*\[(.*?)\]', replace_allergens, content)

# Replace allergenLegend
content = re.sub(
    r'export const allergenLegend: Record<string, string> = \{[\s\S]*?\};',
    '''export const allergenLegend: Record<string, string> = {
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
};''',
    content
)

# Replace allergenHinweis
content = re.sub(
    r'export const allergenHinweis = ".*?";',
    '''export const legal_disclaimers = {
  allergens: "Lieber Gast! Informationen über Zutaten in unseren Speisen, die Allergien oder Unverträglichkeiten auslösen können, erhalten Sie auf Nachfrage bei unseren Servicemitarbeiter/innen.",
  cross_contamination: "Kreuzkontamination: Trotz größter Sorgfalt bei der Zubereitung können wir nicht zu 100% garantieren, dass Gerichte vollkommen frei von Spuren anderer Allergene sind. Wenn Sie an einer schweren lebensbedrohlichen Allergie leiden (z.B. Erdnussanaphylaxie, schwere Zöliakie), informieren Sie uns bitte zwingend VOR der Bestellung, damit wir entsprechende Schutzmaßnahmen (z.B. separater Pfannenwechsel) ergreifen können. Bei extremen Risiken behalten wir uns zu Ihrem eigenen Schutz vor, bestimmte Gerichte nicht zu servieren.",
  vegan_vegetarian: "Pflanzliche Gerichte: \\"Vegetarisch\\" oder \\"Vegan\\" gekennzeichnete Gerichte werden nach besten Gewissen fleisch-/tierproduktfrei zubereitet (z.B. pflanzliches Lab bei einigen Käsesorten, sofern deklariert). Jedoch kann auf denselben Grillflächen auch Fleisch zubereitet werden. Wenn Sie aus religiösen oder ethischen Gründen eine absolute, physische Trennung von Kochgeschirr verlangen, weisen Sie uns bitte darauf hin.",
  additives: "Bei den angegebenen Zusatzstoffen (z.B. \\"mit Farbstoff\\", \\"mit Konservierungsstoff\\") stützen wir uns auf die Deklarationen unserer Lieferanten. Änderungen der Rezepturen der Hersteller bleiben vorbehalten."
};''',
    content
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated menu.ts successfully")
