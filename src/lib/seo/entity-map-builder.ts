import { categories, strictMenuItems } from '@/data/menu';
import { companyData } from '@/data/company';

/**
 * Automatically aggregates the entire inventory (src/data/menu.ts) 
 * into a schema.org/Menu with nested hasMenuSection and hasMenuItem schemas.
 * 
 * Phase 2 (KI-Dominanz): Extended with suitableForDiet inference based on
 * category and description analysis. This enables AI models to answer
 * dietary queries like "vegetarian restaurant in Linden" with precision.
 */

const BASE_URL = 'https://lindener-ratsstuben.de';

// ── Vegetarian detection heuristic ──────────────────────────
// Categories that are inherently non-meat
const VEGETARIAN_CATEGORIES = new Set([
  'dessert',
  'warme-getraenke',
  'alkoholfreie-getraenke',
  'saefte',
  'aperitif',
  'bier',
  'wein',
  'digestif',
  'spirituosen',
]);

// Items with these names/descriptions are explicitly vegetarian
const VEGETARIAN_KEYWORDS = [
  'vegetale', 'vegetaria', 'margherita', 'margarita',
  'bruschetta', 'burrata', 'burro e salvia',
  'ragù di verdure', 'ragu di verdure',
  'pesto genovese', 'basilikum pesto',
  'tiramisu', 'panna cotta', 'vanilleeis', 'affogato',
  'pizzapane', 'pizzabrot',
];

// Items explicitly containing meat/fish
const NON_VEGETARIAN_KEYWORDS = [
  'schinken', 'prosciutto', 'salami', 'guanciale', 'speck',
  'hackfleisch', 'bolognese', 'carbonara',
  'hähnchen', 'pollo', 'chicken', 'nuggets',
  'schweine', 'maiale', 'rind', 'manzo', 'bistecca', 'vitello', 'kalb',
  'lachs', 'salmone', 'gamber', 'frutti di mare', 'meeresfrücht',
  'thunfisch', 'tonno', 'fisch', 'pesce', 'dorade', 'orata', 'zander',
  'wurst', 'peperoni wurst',
];

function isVegetarianItem(item: { name: string; description: string; category: string }): boolean {
  // Drinks and desserts are generally vegetarian
  if (VEGETARIAN_CATEGORIES.has(item.category)) return true;
  
  const combined = `${item.name} ${item.description}`.toLowerCase();
  
  // Explicit non-vegetarian check first
  if (NON_VEGETARIAN_KEYWORDS.some(kw => combined.includes(kw))) return false;
  
  // Explicit vegetarian keywords
  if (VEGETARIAN_KEYWORDS.some(kw => combined.includes(kw))) return true;
  
  return false;
}

// ── Category → Schema menu type mapping ─────────────────────
function getCategoryMenuType(catId: string): string | undefined {
  const map: Record<string, string> = {
    'suppen': 'appetizer',
    'vorspeisen': 'appetizer',
    'salate': 'appetizer',
    'pasta': 'main course',
    'pasta-al-forno': 'main course',
    'hausgemachte-pasta': 'main course',
    'schnitzel': 'main course',
    'fleisch-fisch': 'main course',
    'pizza': 'main course',
    'familienpizza': 'main course',
    'kindergerichte': 'main course',
    'dessert': 'dessert',
  };
  return map[catId];
}

export function generateMenuSchema() {
  const restaurantId = `${BASE_URL}/#restaurant`;

  const hasMenuSection = categories.map((category) => {
    const categoryItems = strictMenuItems.filter(item => item.category === category.id);
    
    return {
      '@type': 'MenuSection',
      name: category.name,
      description: `Speisekarte Kategorie: ${category.name}`,
      hasMenuItem: categoryItems
        .filter(item => item.price !== null) // Skip items without prices
        .map(item => {
          const menuItem: Record<string, unknown> = {
            '@type': 'MenuItem',
            name: item.name,
            description: item.description || undefined,
            offers: {
              '@type': 'Offer',
              price: item.price!.toFixed(2),
              priceCurrency: 'EUR',
            },
          };

          // Dietary suitability
          if (isVegetarianItem(item)) {
            menuItem.suitableForDiet = 'https://schema.org/VegetarianDiet';
          }

          // Menu item type
          const menuType = getCategoryMenuType(item.category);
          if (menuType) {
            menuItem.menuItemType = menuType;
          }

          return menuItem;
        })
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Speisekarte — ${companyData.companyName}`,
    url: `${BASE_URL}/menu`,
    mainEntity: { '@id': restaurantId },
    hasMenuSection
  };
}
