import { SSOTMenuItem, categories, categoryFootnotes, categoryHeaderTexts, menuItems } from '@/data/menu';

export interface LocalizedCategory {
  id: string;
  name: string;
  label: string;
  description?: string;
  headerText?: string;
}

export interface LocalizedMenuItem extends SSOTMenuItem {
  originalName: string;
}

export async function getLocalizedMenuData(locale: string) {
  if (locale === 'de') {
    return {
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        label: c.label,
        description: categoryFootnotes[c.id] || undefined,
        headerText: categoryHeaderTexts[c.id] || undefined,
      })),
      menuItems: menuItems.map(item => ({
        ...item,
        originalName: item.name
      }))
    };
  }

  try {
    // Dynamically import the language-specific menu data
    const translationModule = await import(`../../../locales/${locale}/menu-data.json`);
    const data = translationModule.default || translationModule;

    const localizedCategories = categories.map(c => {
      const trans = data.categories?.[c.id];
      return {
        id: c.id,
        name: trans?.name || c.name,
        label: trans?.label || c.label,
        description: trans?.description || categoryFootnotes[c.id] || undefined,
        headerText: trans?.headerText || categoryHeaderTexts[c.id] || undefined,
      };
    });

    const localizedItems = menuItems.map(item => {
      // Find translation by nr (preferred) or id fallback
      const trans = data.items?.[item.nr];
      return {
        ...item,
        name: trans?.name || item.name,
        description: trans?.description || item.description,
        originalName: item.name
      };
    });

    return {
      categories: localizedCategories,
      menuItems: localizedItems
    };
  } catch {
    console.warn(`[i18n] Could not load menu-data.json for locale ${locale}, falling back to German.`);
    // Fallback to German
    return {
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        label: c.label,
        description: categoryFootnotes[c.id] || undefined,
        headerText: categoryHeaderTexts[c.id] || undefined,
      })),
      menuItems: menuItems.map(item => ({
        ...item,
        originalName: item.name
      }))
    };
  }
}
