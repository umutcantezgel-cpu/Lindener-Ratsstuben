import { groq } from 'next-sanity'

// ═══ SITE SETTINGS (Singleton) ═══
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    contactEmail,
    contactPhone,
    displayPhone,
    address,
    openingHours,
    heroTitle_de,
    heroTitle_en,
    heroTitle_ar,
    heroTitle_fr,
    heroSubtitle_de,
    heroSubtitle_en,
    heroSubtitle_ar,
    heroSubtitle_fr,
    welcomeText_de,
    welcomeText_en,
    welcomeText_ar,
    welcomeText_fr,
    "mainMenuPdfUrl": mainMenuPdf.asset->url,
    facebookUrl,
    instagramUrl
  }
`

// ═══ MENU CATEGORIES ═══
export const menuCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title_de,
    title_en,
    title_ar,
    title_fr,
    description_de,
    description_en,
    description_ar,
    description_fr,
    "slug": slug.current,
    icon,
    "coverImageUrl": coverImage.asset->url,
    order
  }
`

// ═══ DISHES (full payload with expanded references) ═══
export const dishesQuery = groq`
  *[_type == "dish"] | order(category->order asc, order asc) {
    _id,
    nr,
    title_de,
    title_en,
    title_ar,
    title_fr,
    description_de,
    description_en,
    description_ar,
    description_fr,
    price,
    priceVariants[]{
      name_de,
      name_en,
      name_ar,
      name_fr,
      price
    },
    isAvailable,
    isBestseller,
    isVegetarian,
    isVegan,
    spiceLevel,
    additives,
    specialDiet,
    badges,
    "category": category->{
      _id,
      title_de,
      title_en,
      title_ar,
      title_fr,
      "slug": slug.current
    },
    allergens[]->{
      _id,
      code,
      name_de,
      name_en,
      name_ar,
      name_fr
    },
    "imageUrl": image.asset->url
  }
`

// ═══ HOMEPAGE HIGHLIGHTS (Bestseller-Gerichte für die Startseite) ═══
export const highlightDishesQuery = groq`
  *[_type == "dish" && isBestseller == true] | order(order asc) [0...6] {
    _id,
    nr,
    title_de,
    title_en,
    title_ar,
    title_fr,
    description_de,
    description_en,
    description_ar,
    description_fr,
    price,
    spiceLevel,
    "category": category->{
      title_de,
      title_en,
      title_ar,
      title_fr
    },
    "imageUrl": image.asset->url
  }
`
