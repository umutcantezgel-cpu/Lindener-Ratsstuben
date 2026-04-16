import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { Suspense } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { createMenuPageSchema } from '@/lib/seo/schema-generators';
import { sanityFetch } from '@/lib/sanity/client';
import { menuCategoriesQuery, dishesQuery } from '@/lib/sanity/queries';

// ═══ SANITY TYPE INTERFACES ═══
interface SanityAllergen {
  _id: string;
  code: string;
  name_de?: string;
  name_en?: string;
  name_ar?: string;
  name_fr?: string;
}

interface SanityCategory {
  _id: string;
  title_de?: string;
  title_en?: string;
  title_ar?: string;
  title_fr?: string;
  slug?: string;
  icon?: string;
  order?: number;
}

interface SanityDish {
  _id: string;
  nr?: string;
  title_de?: string;
  title_en?: string;
  title_ar?: string;
  title_fr?: string;
  description_de?: string;
  description_en?: string;
  description_ar?: string;
  description_fr?: string;
  price: number;
  isBestseller?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  spiceLevel?: number;
  additives?: string[];
  category?: SanityCategory;
  allergens?: SanityAllergen[];
  imageUrl?: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('menu.title', 'Speisekarte');
  const description = t('menu.description', 'Entdecken Sie unsere vielfältige Speisekarte mit authentischen italienischen und mediterranen Gerichten in den Lindener Ratsstuben.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: {
      canonical: '/menu',
    },
    openGraph: {
      title: fullTitle,
      description,
      url: "/menu",
    }
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
    console.error("[Sanity] Menu fetch failed. Rendering with empty data.", error);
  }

  // Localized string extraction helper
  const getLocalizedString = (obj: unknown, fieldPrefix: string) => {
    if (!obj || typeof obj !== 'object') return "";
    const record = obj as Record<string, unknown>;
    const val = record[`${fieldPrefix}_${locale}`] || record[`${fieldPrefix}_de`] || record[`${fieldPrefix}_en`];
    return typeof val === 'string' ? val : "";
  };

  // Transform categories for client component
  const mappedCategories = fetchedCategories.map((cat) => ({
    id: cat._id,
    name: getLocalizedString(cat, 'title'),
    label: getLocalizedString(cat, 'title'),
    description: getLocalizedString(cat, 'description'),
    slug: cat.slug || cat._id,
    icon: cat.icon || undefined,
  }));

  const finalCategories = mappedCategories.length > 0 ? mappedCategories : [
    { id: 'fallback', name: 'Speisekarte', label: 'Speisekarte (CMS nicht verbunden)', slug: 'speisekarte' }
  ];

  // Transform dishes for client component with all new fields
  const mappedMenuItems = fetchedDishes.map((dish, index: number) => {
    const allergens = (dish.allergens || []).map((ref: SanityAllergen) => ref.code);

    const tags: string[] = [];
    if (dish.isBestseller) tags.push('bestseller');
    if (dish.isVegetarian) tags.push('vegetarian');
    if (dish.isVegan) tags.push('vegan');
    if ((dish.spiceLevel || 0) > 0) tags.push('spicy');

    return {
      id: dish._id,
      nr: dish.nr || String(index + 1),
      name: getLocalizedString(dish, 'title'),
      description: getLocalizedString(dish, 'description'),
      price: dish.price,
      category: dish.category?._id || 'fallback',
      categorySlug: dish.category?.slug || '',
      allergens: allergens,
      zusatzstoffe: dish.additives || [],
      tags: tags,
      spiceLevel: dish.spiceLevel || 0,
      isBestseller: dish.isBestseller || false,
      isVegetarian: dish.isVegetarian || false,
      isVegan: dish.isVegan || false,
      imageUrl: dish.imageUrl,
    };
  });

  return (
    <>
      <JsonLd data={createMenuPageSchema()} />
      <Suspense fallback={<div className="pt-32 pb-20 min-h-screen bg-bg-secondary flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
        <PageClient categories={finalCategories} menuItems={mappedMenuItems} />
      </Suspense>
    </>
  );
}
