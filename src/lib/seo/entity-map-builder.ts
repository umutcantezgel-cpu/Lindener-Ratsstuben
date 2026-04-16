import { categories, strictMenuItems } from '@/data/menu';
import { companyData } from '@/data/company';

/**
 * Automatically aggregates the entire inventory (src/data/menu.ts) 
 * into a schema.org/Menu with nested hasMenuSection and hasMenuItem schemas.
 * SEQ-62: 10X SEO AI Discoverability.
 */
export function generateMenuSchema() {
  const BASE_URL = 'https://lindener-ratsstuben.de';
  const restaurantId = `${BASE_URL}/#restaurant`;

  const hasMenuSection = categories.map((category) => {
    // Filter items belonging to this category
    const categoryItems = strictMenuItems.filter(item => item.category === category.id);
    
    return {
      '@type': 'MenuSection',
      name: category.name,
      description: `Speisekarte Kategorie: ${category.name}`,
      hasMenuItem: categoryItems.map(item => {
        // Construct detailed MenuItem schema
        const menuItemSchema: Record<string, string | Record<string, string>> = {
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: item.price.toFixed(2),
            priceCurrency: 'EUR',
          },
        };

        if (item.tags.includes('vegetarian')) {
          menuItemSchema.suitableForDiet = 'https://schema.org/VegetarianDiet';
        }

        if (item.tags.includes('spicy')) {
          menuItemSchema.additionalType = 'https://schema.org/SpicyFood';
        }

        return menuItemSchema;
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
