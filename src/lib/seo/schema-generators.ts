import { companyData } from '@/data/company';

/**
 * Centralized JSON-LD Schema Builders.
 * All functions return schema.org compliant objects
 * ready for injection via <JsonLd data={...} />.
 *
 * SEQ-58: Extended with @graph pattern, page-specific schemas,
 * and entity-aligned builders for AI-Discovery compliance.
 */

const BASE_URL = 'https://lindener-ratsstuben.de';

// ═══ SHARED @id CONSTANTS (consistent cross-references) ═══

const IDS = {
  organization: `${BASE_URL}/#organization`,
  website: `${BASE_URL}/#website`,
  restaurant: `${BASE_URL}/#restaurant`,
  localBusiness: `${BASE_URL}/#localBusiness`,
} as const;

// ═══ RESTAURANT SCHEMA ═══

export function createRestaurantSchema() {
  return {
    '@type': 'Restaurant',
    '@id': IDS.restaurant,
    name: companyData.companyName,
    description: `${companyData.tagline} — ${companyData.zusatz}`,
    image: `${BASE_URL}/images/placeholder.svg`,
    url: BASE_URL,
    telephone: companyData.phone,
    email: companyData.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.address.street,
      addressLocality: companyData.address.city,
      postalCode: companyData.address.zip,
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.5313,
      longitude: 8.6566,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:30',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '17:30',
        closes: '22:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:30',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '17:30',
        closes: '22:30',
      },
    ],
    menu: `${BASE_URL}/menu`,
    servesCuisine: ['German', 'Italian', 'Mediterranean'],
    acceptsReservations: 'True',
    paymentAccepted: companyData.paymentMethods.join(', '),
    priceRange: '€€',
    sameAs: [companyData.facebook],
    parentOrganization: { '@id': IDS.organization },
    knowsLanguage: ['de', 'en', 'ar', 'fr'],
    areaServed: [
      {
        '@type': 'City',
        name: companyData.address.city,
      },
      {
        '@type': 'State',
        name: 'Hessen',
      }
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        name: companyData.tagesangebot.name,
        description: companyData.tagesangebot.beschreibung,
        availabilityStarts: '11:30',
        availabilityEnds: '14:30',
      }
    ]
  };
}

// ═══ ORGANIZATION SCHEMA ═══

export function createOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': IDS.organization,
    name: companyData.companyName,
    url: BASE_URL,
    logo: `${BASE_URL}/images/placeholder.svg`,
    founder: {
      '@type': 'Person',
      name: companyData.ownerName,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyData.phone,
      contactType: 'customer service',
      email: companyData.email,
      availableLanguage: ['German', 'English'],
    },
    sameAs: [companyData.facebook],
  };
}

// ═══ WEBSITE SCHEMA ═══

export function createWebsiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    name: companyData.companyName,
    url: BASE_URL,
    publisher: { '@id': IDS.restaurant },
  };
}

// ═══ GLOBAL @graph (injected in layout.tsx) ═══

import { generateMenuSchema } from './entity-map-builder';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

export async function createGlobalSchemaGraph(locale: LocaleType = 'de') {
  const t = await getTranslations(locale, 'meta');
  
  const restaurantSchema = createRestaurantSchema();
  if (t('home.description')) {
    restaurantSchema.description = t('home.description');
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      createOrganizationSchema(),
      restaurantSchema,
      createWebsiteSchema(),
      generateMenuSchema(),
    ],
  };
}

// ═══ BREADCRUMB SCHEMA ═══

export function createBreadcrumbSchema(
  breadcrumbs: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ═══ FAQ SCHEMA ═══

export function createFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ═══ PAGE-SPECIFIC SCHEMAS (SEQ-58) ═══

/** AboutPage — injected on /about */
export function createAboutPageSchema(translations?: (key: string, fallback?: string) => string) {
  const namePrefix = translations ? translations('about.title', 'Über Uns') : 'Über Uns';
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${namePrefix} — ${companyData.companyName}`,
    url: `${BASE_URL}/about`,
    mainEntity: { '@id': IDS.restaurant },
  };
}

/** ContactPage — injected on /contact */
export function createContactPageSchema(translations?: (key: string, fallback?: string) => string) {
  const namePrefix = translations ? translations('contact.title', 'Kontakt') : 'Kontakt';
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `${namePrefix} — ${companyData.companyName}`,
    url: `${BASE_URL}/contact`,
    mainEntity: { '@id': IDS.restaurant },
  };
}

/** KegelbahnPage — injected on /kegelbahn */
export function createKegelbahnPageSchema(translations?: (key: string) => string) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Kegelbahn — ${companyData.companyName}`,
    url: `${BASE_URL}/kegelbahn`,
    mainEntity: { '@id': IDS.restaurant },
  };

  if (!translations) {
    return baseSchema;
  }

  const faqData = [
    { question: translations('kegelbahn.faq.q1'), answer: translations('kegelbahn.faq.a1') },
    { question: translations('kegelbahn.faq.q2'), answer: translations('kegelbahn.faq.a2') },
    { question: translations('kegelbahn.faq.q3'), answer: translations('kegelbahn.faq.a3') }
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      baseSchema,
      {
        '@type': 'Product',
        name: translations('kegelbahn.hero.title'),
        description: translations('kegelbahn.hero.subtitle'),
        offers: {
            '@type': 'Offer',
            priceSpecification: {
                '@type': 'PriceSpecification',
                price: '15.00',
                priceCurrency: 'EUR'
            }
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    ]
  };
}

/** Menu schema — injected on /menu */
export function createMenuPageSchema() {
  return generateMenuSchema();
}

/** ReservationPage with ReserveAction — injected on /reservation */
export function createReservationPageSchema(translations?: (key: string, fallback?: string) => string) {
  const namePrefix = translations ? translations('reservation.title', 'Reservierung') : 'Reservierung';
  const actionName = translations ? translations('reservation.actionName', 'Tischreservierung') : 'Tischreservierung';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${namePrefix} — ${companyData.companyName}`,
    url: `${BASE_URL}/reservation`,
    mainEntity: { '@id': IDS.restaurant },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/reservation`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'FoodEstablishmentReservation',
        name: actionName,
      },
    },
  };
}

// ═══ LEGACY EXPORT (backwards-compat) ═══

export function createLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyData.companyName,
    url: BASE_URL,
    telephone: companyData.phone,
    email: companyData.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.address.street,
      addressLocality: companyData.address.city,
      postalCode: companyData.address.zip,
      addressCountry: 'DE',
    },
  };
}
