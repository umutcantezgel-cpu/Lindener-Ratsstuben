import { Metadata } from 'next';
import React from 'react';
import { sanityFetch } from '@/lib/sanity/client';
import { groq } from 'next-sanity';
import SaisonalClient from './SaisonalClient';
import './saisonal.css';
import { PrintPageA5 } from '../../menu/print/components/PrintPageA5';
import { PrintOnlyPortal } from './PrintOnlyPortal';
import { JsonLd } from '@/components/seo/JsonLd';
import { createMenuPageSchema } from '@/lib/seo/schema-generators';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Saisonkarte Admin Druck | Lindener Ratsstuben',
    description: 'Interne Druckansicht der Saisonkarte.',
    robots: { index: false, follow: false },
  };
}

const seasonalMenuQuery = groq`
  *[_type == "seasonalMenu"][0]{
    isActive,
    title_de,
    title_en,
    description_de,
    description_en,
    categories[]{
      categoryTitle_de,
      categoryTitle_en,
      items[]{
        name_de,
        name_en,
        description_de,
        description_en,
        price,
        allergens[]->{
          code
        },
        additives
      }
    }
  }
`;

// ─── PREMIUM FALLBACK DATA (Demo Mode if Sanity connection is absent or empty) ───
const demoSeasonalMenu = {
  isActive: true,
  title_de: "Hausgemachte Specials",
  title_en: "Homemade Specials",
  description_de: "Frische Zutaten, leidenschaftliche Zubereitung und einzigartiger Geschmack.",
  description_en: "Fresh ingredients, passionate preparation, and unique taste.",
  categories: [
    {
      categoryTitle_de: "Hausgemachte Burger",
      categoryTitle_en: "Homemade Burgers",
      items: [
        {
          name_de: "Classic Burger",
          name_en: "Classic Burger",
          description_de: "Saftiges Rindfleisch mit knackigem Salat, eingelegten Gurken, frischen Tomaten, roten Zwiebeln und unserer hauseigenen Sauce im fluffigen Bun. Serviert mit knusprigen Pommes.",
          description_en: "Juicy beef patty with fresh lettuce, pickles, tomatoes, red onions, and our signature burger sauce in a fluffy bun. Served with crispy fries.",
          price: 13.90,
          allergens: [{ code: "B" }, { code: "D" }, { code: "E1" }, { code: "G" }, { code: "I" }],
          additives: []
        },
        {
          name_de: "Cheeseburger",
          name_en: "Cheeseburger",
          description_de: "Unser saftiger Rinder-Klassiker, belegt mit cremig-zart geschmolzenem Käse, knackigem Salat, sauren Gurken, frischen Tomaten und unserer hausgemachten Burgersauce.",
          description_en: "Our classic juicy beef patty, topped with creamy melted cheese, fresh lettuce, pickles, ripe tomatoes, and our homemade burger sauce.",
          price: 14.90,
          allergens: [{ code: "B" }, { code: "D" }, { code: "E1" }, { code: "G" }, { code: "I" }],
          additives: []
        },
        {
          name_de: "Chili Cheeseburger",
          name_en: "Chili Cheeseburger",
          description_de: "Für alle, die es feurig lieben: Saftiges Rindfleisch mit Mozzarella, scharfen Jalapeños, Salat, Tomaten und einer feurig-würzigen Spezialsauce.",
          description_en: "For those who like it hot: Juicy beef with mozzarella cheese, spicy jalapeños, lettuce, tomatoes, and a fiery special sauce.",
          price: 15.90,
          allergens: [{ code: "B" }, { code: "D" }, { code: "E1" }, { code: "G" }, { code: "I" }],
          additives: []
        },
        {
          name_de: "Deluxe Burger",
          name_en: "Deluxe Burger",
          description_de: "Die absolute Premium-Variante: Rindfleisch kombiniert mit feinstem luftgetrockneten Schinken, frischem Rucola, Tomaten, Gurken und unserer exklusiven Trüffel-Haussauce.",
          description_en: "The ultimate premium experience: Beef patty combined with cured ham, fresh wild arugula, tomatoes, pickles, and our exclusive house truffle sauce.",
          price: 16.90,
          allergens: [{ code: "A" }, { code: "B" }, { code: "D" }, { code: "E1" }, { code: "G" }, { code: "I" }, { code: "P" }],
          additives: ["1", "2", "3", "5"]
        }
      ]
    },
    {
      categoryTitle_de: "Hausgemachte Limonaden",
      categoryTitle_en: "Homemade Lemonades",
      items: [
        {
          name_de: "Citrus Mint Limonade",
          name_en: "Citrus Mint Lemonade",
          description_de: "Erfrischende, hausgepresste Zitrusfrüchte treffen auf aromatische Minzblätter und feine Süße – eiskalt serviert, spritzig und belebend.",
          description_en: "Refreshing hand-pressed citrus juices combined with aromatic mint leaves and light sweet cane sugar – served ice cold.",
          price: 6.90,
          allergens: [],
          additives: []
        },
        {
          name_de: "Grenadine Limonade",
          name_en: "Grenadine Lemonade",
          description_de: "Fruchtig-süße Verführung mit feiner Granatapfel-Note, Limettensaft und frischem Soda – ein funkelnder Klassiker.",
          description_en: "Fruity sweet pomegranate flavor mixed with fresh lime juice and sparkling soda water – a dazzling visual classic.",
          price: 6.90,
          allergens: [],
          additives: ["1"]
        },
        {
          name_de: "Erdbeer-Limonade",
          name_en: "Strawberry Lemonade",
          description_de: "Fruchtiges Püree aus sonnengereiften Erdbeeren, abgerundet mit Limette, Minze und Soda – wunderbar fruchtig und erfrischend.",
          description_en: "Smooth puree made from sweet sun-ripened strawberries, balanced with zesty lime, mint leaves, and club soda.",
          price: 6.90,
          allergens: [],
          additives: []
        },
        {
          name_de: "Pfirsich-Limonade",
          name_en: "Peach Lemonade",
          description_de: "Zarter, natürlicher Pfirsichgeschmack vereint mit feinperligem Mineralwasser – fruchtig, leicht und erfrischend aromatisch.",
          description_en: "Delicate and natural peach essence combined with sparkling mineral water – fruity, light, and wonderfully aromatic.",
          price: 6.90,
          allergens: [],
          additives: []
        }
      ]
    }
  ]
};

function OrnateDivider() {
  return (
    <div className="seasonal-divider">
      <span>◆</span>
    </div>
  );
}

export default async function SaisonalMenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isDe = locale === 'de';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let seasonalMenu: any = null;
  let isDemoMode = false;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await sanityFetch<any>({ query: seasonalMenuQuery, tags: ['content'] });
    if (result && result.categories && result.categories.length > 0) {
      seasonalMenu = result;
    } else {
      console.log("[Sanity] Seasonal Menu empty or not configured. Using premium demo fallback.");
      seasonalMenu = demoSeasonalMenu;
      isDemoMode = true;
    }
  } catch (error) {
    console.error("[Sanity] Seasonal Menu fetch failed. Falling back to demo mode.", error);
    seasonalMenu = demoSeasonalMenu;
    isDemoMode = true;
  }

  const isInactiveInCMS = !seasonalMenu.isActive;

  // Extract the title, description, and categories based on locale preference
  const pageTitle = isDe ? seasonalMenu.title_de : (seasonalMenu.title_en || seasonalMenu.title_de);
  const pageDescription = isDe ? seasonalMenu.description_de : (seasonalMenu.description_en || seasonalMenu.description_de);

  // Split into left and right columns (categories)
  const leftCategory = seasonalMenu.categories?.[0] || null;
  const rightCategory = seasonalMenu.categories?.[1] || null;

  // Content for the left category
  const leftColumnContent = leftCategory && (
    <div className="landscape-column border-right">
      <div className="seasonal-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt="Lindener Ratsstuben"
          className="seasonal-logo"
        />
        <span className="seasonal-badge">
          ◆ {isDe ? 'Saisonkarte' : 'Seasonal Specials'} ◆
        </span>
        <h2 className="seasonal-title">
          {isDe ? leftCategory.categoryTitle_de : (leftCategory.categoryTitle_en || leftCategory.categoryTitle_de)}
        </h2>
        <p className="seasonal-subtitle">
          {pageTitle || (isDe ? 'Saftig. Frisch. Genussvoll.' : 'Juicy. Fresh. Delightful.')}
        </p>
      </div>

      <OrnateDivider />

      {pageDescription && (
        <p className="seasonal-intro">
          {pageDescription}
        </p>
      )}

      <div className="seasonal-items-container">
        {leftCategory.items?.map((item: { name_de: string; name_en?: string; description_de?: string; description_en?: string; price: number; allergens?: { code: string }[]; additives?: string[] }, idx: number) => {
          const allergensString = item.allergens && item.allergens.length > 0 
            ? item.allergens.map((a) => a.code).join(',')
            : '';
          const additivesString = item.additives && item.additives.length > 0 
            ? item.additives.join(',') 
            : '';
          
          const superscript = [allergensString, additivesString].filter(Boolean).join('/');

          return (
            <div key={idx} className="seasonal-item">
              <div className="seasonal-item-header">
                <span className="seasonal-item-name">
                  {isDe ? item.name_de : (item.name_en || item.name_de)}
                  {superscript && (
                    <sup style={{ fontSize: '6px', marginLeft: '2px', color: 'var(--gold-deep, #a98f65)' }}>
                      {superscript}
                    </sup>
                  )}
                </span>
                <div className="seasonal-item-dots"></div>
                <span className="seasonal-item-price">
                  {item.price?.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              {item.description_de && (
                <p className="seasonal-item-desc">
                  {isDe ? item.description_de : (item.description_en || item.description_de)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="seasonal-footer">
        <p className="seasonal-footnote">
          {isDe ? 'Alle Gerichte werden frisch zubereitet.' : 'All dishes are freshly prepared.'}
        </p>
        <div className="seasonal-closing">
          {isDe ? 'GUTEN APPETIT' : 'BON APPÉTIT'}
        </div>
      </div>
    </div>
  );

  // Content for the right category
  const rightColumnContent = rightCategory && (
    <div className="landscape-column">
      <div className="seasonal-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.svg"
          alt="Lindener Ratsstuben"
          className="seasonal-logo"
        />
        <span className="seasonal-badge">
          ◆ {isDe ? 'Erfrischung' : 'Refreshment'} ◆
        </span>
        <h2 className="seasonal-title">
          {isDe ? rightCategory.categoryTitle_de : (rightCategory.categoryTitle_en || rightCategory.categoryTitle_de)}
        </h2>
        <p className="seasonal-subtitle">
          {isDe ? 'Frisch. Fein. Erfrischend.' : 'Fresh. Pure. Refreshing.'}
        </p>
      </div>

      <OrnateDivider />

      <p className="seasonal-intro">
        {isDe 
          ? 'Genießen Sie unsere erlesene Auswahl – perfekt abgestimmt für ein besonderes Genusserlebnis.'
          : 'Enjoy our hand-crafted selection – perfectly balanced for a remarkable experience.'
        }
      </p>

      <div className="seasonal-items-container">
        {rightCategory.items?.map((item: { name_de: string; name_en?: string; description_de?: string; description_en?: string; price: number; allergens?: { code: string }[]; additives?: string[] }, idx: number) => {
          const allergensString = item.allergens && item.allergens.length > 0 
            ? item.allergens.map((a) => a.code).join(',')
            : '';
          const additivesString = item.additives && item.additives.length > 0 
            ? item.additives.join(',') 
            : '';
          
          const superscript = [allergensString, additivesString].filter(Boolean).join('/');

          return (
            <div key={idx} className="seasonal-item">
              <div className="seasonal-item-header">
                <span className="seasonal-item-name">
                  {isDe ? item.name_de : (item.name_en || item.name_de)}
                  {superscript && (
                    <sup style={{ fontSize: '6px', marginLeft: '2px', color: 'var(--gold-deep, #a98f65)' }}>
                      {superscript}
                    </sup>
                  )}
                </span>
                <div className="seasonal-item-dots"></div>
                <span className="seasonal-item-price">
                  {item.price?.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              {item.description_de && (
                <p className="seasonal-item-desc">
                  {isDe ? item.description_de : (item.description_en || item.description_de)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="seasonal-footer">
        <p className="seasonal-footnote" style={{ fontSize: '5.2pt', lineHeight: 1.2 }}>
          {isDe ? (
            <>
              <strong>Allergene/Zusatzstoffe:</strong> A Pistazien · B Milch · D Sesam · E1 Weizen · F Sellerie · G Senf · I Ei · P Schwefeldioxid · 1 Farbstoff · 2 Konserviert · 3 Antioxidationsm. · 5 Geschwefelt
            </>
          ) : (
            <>
              <strong>Allergens/Additives:</strong> A Pistachios · B Milk · D Sesame · E1 Wheat · F Celery · G Mustard · I Egg · P Sulfur Dioxide · 1 Coloring · 2 Preserved · 3 Antioxidants · 5 Sulfured
            </>
          )}
        </p>
        <div className="seasonal-closing">
          {isDe ? 'ERFRISCHUNG PUR' : 'PURE REFRESHMENT'}
        </div>
      </div>
    </div>
  );

  // Print-specific content (A4 Landscape containing two A5 pages side-by-side)
  const printOnlyContent = (
    <PrintPageA5>
      <div className="landscape-layout">
        {leftColumnContent}
        {rightColumnContent}
      </div>
    </PrintPageA5>
  );

  const pageContent = (
    <PrintPageA5>
      <div className="landscape-layout">
        {leftColumnContent}
        {rightColumnContent}
      </div>
    </PrintPageA5>
  );

  return (
    <div className="seasonal-root">
      <JsonLd data={createMenuPageSchema()} />
      {/* ─── Elegant Preview Badge for Admins & Testing ─── */}
      {isDemoMode && (
        <div className="preview-alert-bar">
          ✨ Demomodus: Keine aktive Sanity-CMS Verbindung. Es werden Beispieldaten angezeigt.
        </div>
      )}
      {!isDemoMode && isInactiveInCMS && (
        <div className="preview-alert-bar" style={{ background: '#d48a28' }}>
          ⚠️ Entwurfs-Ansicht: Diese Karte ist im CMS aktuell als &quot;Inaktiv&quot; markiert.
        </div>
      )}

      {/* ─── Custom Top Action Bar for PDF & Printing ─── */}
      <SaisonalClient />

      {/* ─── Normal Screen View (Hidden during print) ─── */}
      <div className="screen-only-view">
        {pageContent}
      </div>

      {/* ─── Portal View (Teleports to body during print, hidden on screen) ─── */}
      <PrintOnlyPortal>
        {printOnlyContent}
      </PrintOnlyPortal>
    </div>
  );
}
