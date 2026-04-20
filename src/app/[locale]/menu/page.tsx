import { getAlternates } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { Suspense } from 'react';
import { MenuSkeleton } from '@/components/ui/MenuSkeleton';
import { JsonLd } from '@/components/seo/JsonLd';
import { createMenuPageSchema } from '@/lib/seo/schema-generators';
import { sanityFetch } from '@/lib/sanity/client';
import { menuCategoriesQuery, dishesQuery } from '@/lib/sanity/queries';


// ═══ SANITY TYPE INTERFACES ═══
interface SanityAllergen { _id: string; code: string; }
interface SanityCategory { _id: string; title_de?: string; title_en?: string; title_ar?: string; title_fr?: string; slug?: string; icon?: string; order?: number; }
interface SanityDish { _id: string; nr?: string; title_de?: string; title_en?: string; title_ar?: string; title_fr?: string; description_de?: string; description_en?: string; description_ar?: string; description_fr?: string; price: number; isBestseller?: boolean; isVegetarian?: boolean; isVegan?: boolean; spiceLevel?: number; additives?: string[]; category?: SanityCategory; allergens?: SanityAllergen[]; imageUrl?: string; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('menu.title', 'Speisekarte');
  const description = t('menu.description', 'Entdecken Sie unsere vielfältige Speisekarte mit authentischen italienischen und mediterranen Gerichten in den Lindener Ratsstuben.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'menu'),
    openGraph: { title: fullTitle, description, url: `/${locale}/menu` }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Fetch data from Sanity CMS with graceful fallback
  let fetchedCategories: SanityCategory[] = [];
  let fetchedDishes: SanityDish[] = [];
  
  try {
    const [categoriesResult, dishesResult] = await Promise.all([
      sanityFetch<SanityCategory[]>({ query: menuCategoriesQuery, tags: ['content'] }),
      sanityFetch<SanityDish[]>({ query: dishesQuery, tags: ['content'] })
    ]);
    fetchedCategories = categoriesResult || [];
    fetchedDishes = dishesResult || [];
  } catch (error) {
    console.error("[Sanity] Menu fetch failed. Falling back to SSOT data.", error);
  }

  const getLocalizedString = (obj: unknown, fieldPrefix: string) => {
    if (!obj || typeof obj !== 'object') return "";
    const record = obj as Record<string, unknown>;
    const val = record[`${fieldPrefix}_${locale}`] || record[`${fieldPrefix}_de`] || record[`${fieldPrefix}_en`];
    return typeof val === 'string' ? val : "";
  };

  // ═══ SSOT FALLBACK: If Sanity returns no data, use the local SSOT ═══
  const useSSOTFallback = fetchedDishes.length === 0;

  let finalCategories: { id: string; name: string; label: string; description?: string; headerText?: string }[];
  let finalMenuItems: { id: string; nr: string; name: string; description: string; price: number | null; category: string; allergens: string[]; }[];

  if (useSSOTFallback) {
    const { getLocalizedMenuData } = await import('@/lib/i18n/menu-data');
    const localizedData = await getLocalizedMenuData(locale);
    
    finalCategories = localizedData.categories;
    finalMenuItems = localizedData.menuItems.map((item, idx) => ({
      id: `ssot-${item.nr || idx}`,
      nr: item.nr,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      allergens: item.allergens || [],
    }));
  } else {
    // Use Sanity data (with SSOT as secondary)
    finalCategories = fetchedCategories.map((cat) => ({
      id: cat._id,
      name: getLocalizedString(cat, 'title'),
      label: getLocalizedString(cat, 'title'),
      description: getLocalizedString(cat, 'description'),
    }));

    finalMenuItems = fetchedDishes.map((dish, index: number) => ({
      id: dish._id,
      nr: dish.nr || String(index + 1),
      name: getLocalizedString(dish, 'title'),
      description: getLocalizedString(dish, 'description'),
      price: dish.price,
      category: dish.category?._id || 'fallback',
      allergens: dish.allergens?.map(a => a.code) || [],
    }));
  }

  return (
    <>
      <JsonLd data={createMenuPageSchema()} />
      <Suspense fallback={<MenuSkeleton />}>
        <PageClient categories={finalCategories} menuItems={finalMenuItems} locale={locale} />
      </Suspense>
    </>
  );
}
