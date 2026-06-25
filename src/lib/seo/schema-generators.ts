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
        opens: '12:00',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '17:30',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '12:00',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '17:30',
        closes: '21:00',
      },
    ],
    menu: `${BASE_URL}/menu`,
    servesCuisine: ['German', 'Italian', 'Mediterranean'],
    acceptsReservations: 'True',
    paymentAccepted: companyData.paymentMethods.join(', '),
    priceRange: '€€',
    sameAs: [companyData.facebook, companyData.instagram],
    parentOrganization: { '@id': IDS.organization },
    knowsLanguage: ['de', 'en', 'ar', 'fr'],
    additionalType: [
      'https://schema.org/BowlingAlley',
      'https://schema.org/EventVenue',
    ],
    hasMap: companyData.mapLink,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '87',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ein Gast' },
        datePublished: '2025-09-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Hervorragende Küche und sehr freundliches Personal. Die Pasta war hausgemacht und fantastisch. Absolut empfehlenswert!',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Ein Stammgast' },
        datePublished: '2025-11-22',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Das beste italienische Restaurant in der Region Gießen. Toller Biergarten im Sommer und die Kegelbahn ist ein echtes Highlight für Gruppenabende.',
      },
    ],
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Barrierefrei', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kostenloses WLAN', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Parkplätze', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Beheizte Terrasse', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Biergarten', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Kegelzentrum', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Veranstaltungssaal', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Catering-Service', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Haustiere erlaubt', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Essen zum Mitnehmen', value: true },
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/de/reservation`,
          actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
        },
        result: {
          '@type': 'FoodEstablishmentReservation',
          name: 'Tischreservierung Lindener Ratsstuben',
        },
      },
      {
        '@type': 'OrderAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/de/menu`,
          actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
        },
        deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp',
      },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: companyData.address.city,
      },
      {
        '@type': 'City',
        name: 'Gießen',
      },
      {
        '@type': 'City',
        name: 'Wetzlar',
      },
      {
        '@type': 'State',
        name: 'Hessen',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 50.5313,
          longitude: 8.6566,
        },
        geoRadius: 50000,
      }
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        name: companyData.tagesangebot.name,
        description: companyData.tagesangebot.beschreibung,
        availabilityStarts: '12:00',
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
    sameAs: [companyData.facebook, companyData.instagram],
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

// ═══ PAGE-SPECIFIC FAQ SCHEMAS (Phase 3: AI-Dominanz) ═══

/** Home Page FAQ — addresses top-level restaurant discovery queries */
export function createHomeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was sind die Lindener Ratsstuben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Lindener Ratsstuben sind ein Traditionsrestaurant in Linden bei Gießen (Hessen), das sich auf authentische deutsch-italienische und mediterrane Küche spezialisiert hat. Das Restaurant bietet zudem ein hauseigenes Kegelzentrum und einen Veranstaltungssaal für bis zu 120 Personen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wann hat das Restaurant Lindener Ratsstuben geöffnet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Lindener Ratsstuben sind Dienstag bis Sonntag geöffnet. Mittagstisch: 12:00–14:30 Uhr, Abendessen: 17:30–22:00 Uhr (Sonntags bis 21:00 Uhr). Montag ist Ruhetag, außer an gesetzlichen Feiertagen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wo befinden sich die Lindener Ratsstuben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${companyData.address.street}, ${companyData.address.zip} ${companyData.address.city}, Deutschland. Zentral gelegen in Linden bei Gießen mit kostenfreien Parkplätzen.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Gibt es Parkplätze beim Restaurant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, das Restaurant verfügt über ausreichend kostenfreie Parkplätze direkt vor dem Haus.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist das Restaurant barrierefrei?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die Lindener Ratsstuben sind vollständig barrierefrei zugänglich. Weitere Services: kostenloses WLAN, beheizte Terrasse, Essen zum Mitnehmen und Haustiere sind willkommen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Welches ist das beste Restaurant in Linden bei Gießen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Lindener Ratsstuben gelten mit einer Bewertung von 4,6/5 Sternen als das beliebteste Restaurant in Linden. Das Traditionsrestaurant bietet deutsch-italienische Küche, eine Kegelbahn und einen Veranstaltungssaal — einzigartig in der Region.',
        },
      },
    ],
  };
}

/** Menu Page FAQ — answers dietary and pricing queries */
export function createMenuFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hat das Restaurant vegetarische Gerichte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die Lindener Ratsstuben bieten zahlreiche vegetarische Gerichte: Pizza Margherita (9,50 €), Pizza Vegetale (14,00 €), Bruschetta (7,90 €), La Burrata (13,90 €), Tagliatelle al Ragù di Verdure (14,90 €), Gnocchi mit Pesto Genovese und Burrata (15,90 €) sowie diverse Salate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet eine Pizza in den Lindener Ratsstuben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pizzen aus dem Steinofen kosten zwischen 9,50 € (Margherita) und 17,00 € (Salmone e Gamberoni). Familienpizzen (40×60 cm) sind ab 25,00 € erhältlich.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gibt es einen Mittagstisch oder ein Tagesmenü?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, von Dienstag bis Freitag gibt es ein täglich wechselndes 2-Gänge-Menü zu einem günstigen Preis. Der Mittagstisch wird von 12:00 bis 14:30 Uhr serviert.',
        },
      },
      {
        '@type': 'Question',
        name: 'Gibt es eine Kinderkarte?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, die Kinderkarte umfasst Chicken Nuggets mit Pommes (8,90 €), Rigatoni in Butter (6,50 €), Spaghetti Bolognese (8,90 €) und kleines Schnitzel Wiener Art mit Pommes (9,90 €).',
        },
      },
      {
        '@type': 'Question',
        name: 'Kann man Essen mitnehmen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, alle Gerichte der Speisekarte können auch zum Mitnehmen bestellt werden. Rufen Sie einfach an unter 06403 - 64556.',
        },
      },
    ],
  };
}

/** Contact Page FAQ */
export function createContactFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie erreiche ich die Lindener Ratsstuben?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Die Lindener Ratsstuben befinden sich in der ${companyData.address.street}, ${companyData.address.zip} ${companyData.address.city}. Sie erreichen uns telefonisch unter ${companyData.displayPhone} oder per E-Mail an ${companyData.email}. Kostenfreie Parkplätze sind direkt vor dem Restaurant vorhanden.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Welche Zahlungsmethoden werden akzeptiert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Wir akzeptieren ${companyData.paymentMethods.join(' und ')}.`,
        },
      },
    ],
  };
}

/** Reservation Page FAQ */
export function createReservationFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kann man im Restaurant reservieren?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Ja, Reservierungen sind telefonisch unter ${companyData.displayPhone} oder per E-Mail an ${companyData.email} möglich. Für größere Gruppen und Veranstaltungen empfehlen wir eine frühzeitige Reservierung.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Kann man Räume für Veranstaltungen buchen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Ja, die Lindener Ratsstuben bieten Räumlichkeiten für Veranstaltungen: Gaststätte (${companyData.eventCatering.sitzplaetze.gaststaette} Plätze), Veranstaltungssaal (${companyData.eventCatering.sitzplaetze.saal} Plätze) und beheizte Terrasse (${companyData.eventCatering.sitzplaetze.terrasse} Plätze). Geeignet für Hochzeiten, Firmenfeiern, Geburtstage und Kommunionen.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Bieten die Lindener Ratsstuben Catering an?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, wir bieten professionellen Catering-Service für Ihre Veranstaltung an. Sprechen Sie uns an für ein individuelles Angebot.',
        },
      },
    ],
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
