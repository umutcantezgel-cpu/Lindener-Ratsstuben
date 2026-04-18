import { categories, strictMenuItems } from '@/data/menu';
import { companyData } from '@/data/company';

/**
 * Automatically aggregates the entire inventory (src/data/menu.ts) 
 * into a schema.org/Menu with nested hasMenuSection and hasMenuItem schemas.
 * SSOT-konform: Keine angereicherten Felder (tags, allergens, suitableForDiet).
 */
export function generateMenuSchema() {
  const BASE_URL = 'https://lindener-ratsstuben.de';
  const restaurantId = `${BASE_URL}/#restaurant`;

  const hasMenuSection = categories.map((category) => {
    const categoryItems = strictMenuItems.filter(item => item.category === category.id);
    
    return {
      '@type': 'MenuSection',
      name: category.name,
      description: `Speisekarte Kategorie: ${category.name}`,
      hasMenuItem: categoryItems
        .filter(item => item.price !== null) // Skip items without prices
        .map(item => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description || undefined,
          offers: {
            '@type': 'Offer',
            price: item.price!.toFixed(2),
            priceCurrency: 'EUR',
          },
        }))
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
