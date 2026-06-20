import { getAlternates } from '@/lib/seo/metadata';
export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { Suspense } from 'react';
import { MenuSkeleton } from '@/components/ui/MenuSkeleton';
import { JsonLd } from '@/components/seo/JsonLd';
import { createMenuPageSchema, createMenuFaqSchema } from '@/lib/seo/schema-generators';
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

  // ═══ SSOT & SANITY MERGE ═══
  const { getLocalizedMenuData } = await import('@/lib/i18n/menu-data');
  const localizedData = await getLocalizedMenuData(locale);
  const useSSOTFallback = fetchedDishes.length === 0;

  let finalCategories: { id: string; name: string; label: string; description?: string; headerText?: string }[];
  let finalMenuItems: { id: string; nr: string; name: string; description: string; price: number | null; category: string; allergens: string[]; }[];

  if (useSSOTFallback) {
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
    // Use Sanity data (with SSOT as translation fallback for 21 languages)
    // IMPORTANT: Only include Sanity categories that also exist in the SSOT data.
    // This filters out seasonal/CMS-exclusive categories (e.g. "Hausgemachte Burger", 
    // "Hausgemachte Limonaden") that should not be publicly accessible.
    const ssotCatIds = new Set(localizedData.categories.map(c => c.id));
    const filteredSanityCategories = fetchedCategories.filter(cat => {
      const matchId = cat.slug || cat._id;
      return ssotCatIds.has(matchId);
    });
    const filteredSanityCatIds = new Set(filteredSanityCategories.map(c => c._id));

    finalCategories = filteredSanityCategories.map((cat) => {
      const matchId = cat.slug || cat._id;
      const ssotCat = localizedData.categories.find(c => c.id === matchId);
      
      let name = ((cat as unknown) as Record<string, string>)[`title_${locale}`];
      if (!name) name = ssotCat?.name as string;
      if (!name) name = getLocalizedString(cat, 'title');

      let description = ((cat as unknown) as Record<string, string>)[`description_${locale}`];
      if (!description) description = ssotCat?.description as string;
      if (!description) description = getLocalizedString(cat, 'description');

      return {
        id: matchId,
        name: name,
        label: name,
        description: description,
      };
    });

    // Only include dishes whose category exists in the SSOT (filters out seasonal dishes)
    const filteredSanityDishes = fetchedDishes.filter(dish => {
      const catId = dish.category?._id;
      return catId && filteredSanityCatIds.has(catId);
    });

    finalMenuItems = filteredSanityDishes.map((dish, index: number) => {
      const nr = dish.nr || String(index + 1);
      const ssotItem = localizedData.menuItems.find(i => i.nr === nr);
      
      let name = ((dish as unknown) as Record<string, string>)[`title_${locale}`];
      if (!name) name = ssotItem?.name as string;
      if (!name) name = getLocalizedString(dish, 'title');

      // SSOT is the primary source of truth for descriptions (actively maintained).
      // Sanity descriptions are used only for non-German locales or when SSOT has no entry.
      let description: string | undefined;
      if (locale === 'de' && ssotItem?.description) {
        description = ssotItem.description;
      } else {
        description = ((dish as unknown) as Record<string, string>)[`description_${locale}`];
        if (!description) description = ssotItem?.description as string;
        if (!description) description = getLocalizedString(dish, 'description');
      }

      return {
        id: dish._id,
        nr: nr,
        name: name,
        description: description || '',
        price: dish.price,
        category: dish.category?.slug || dish.category?._id || 'fallback',
        allergens: dish.allergens?.map(a => a.code) || [],
      };
    });

    // Merge missing SSOT categories (e.g., drinks)
    const sanityCatMatchIds = new Set(fetchedCategories.map(c => c.slug || c._id));
    const missingSsotCats = localizedData.categories.filter(cat => !sanityCatMatchIds.has(cat.id));
    missingSsotCats.forEach(cat => {
      finalCategories.push({
        id: cat.id,
        name: cat.name,
        label: cat.label,
        description: cat.description,
      });
    });

    // Merge missing SSOT items (e.g., drinks)
    const sanityNrs = new Set(fetchedDishes.map(d => d.nr).filter(Boolean));
    const missingSsotItems = localizedData.menuItems.filter(item => item.nr && !sanityNrs.has(item.nr));
    missingSsotItems.forEach((item, idx) => {
      finalMenuItems.push({
        id: `ssot-fallback-${item.nr || idx}`,
        nr: item.nr,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        allergens: item.allergens || [],
      });
    });
  }

  // ═══ MITTAGSKARTE (Tägliches Lunch-Menü) ═══
  let mittagskarte = null;
  try {
    const { list } = await import('@vercel/blob');
    const listResult = await list({
      prefix: 'mittagskarte/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }).catch(() => ({ blobs: [] }));
    
    const blobInfo = listResult.blobs.find(b => b.pathname === 'mittagskarte/current.json');
    if (blobInfo) {
      // Vercel Blob public URLs can be fetched directly
      const response = await fetch(blobInfo.url, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
        cache: 'no-store'
      });
      if (response.ok) {
        mittagskarte = await response.json();
      }
    }
  } catch (error) {
    console.warn('[Menu] Mittagskarte konnte nicht geladen werden:', error);
  }

  return (
    <>
      <JsonLd data={createMenuPageSchema()} />
      <JsonLd data={createMenuFaqSchema()} />
      <Suspense fallback={<MenuSkeleton />}>
        <PageClient categories={finalCategories} menuItems={finalMenuItems} locale={locale} mittagskarte={mittagskarte} />
      </Suspense>
    </>
  );
}
