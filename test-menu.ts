import { getLocalizedMenuData } from './src/lib/i18n/menu-data.ts';

getLocalizedMenuData('de').then(data => {
  console.log("Categories:", data.categories.map(c => c.id));
});
