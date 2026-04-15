import { companyData } from '@/data/company';

/**
 * Centralized JSON-LD Schema Builders.
 * All functions return schema.org compliant objects
 * ready for injection via <JsonLd data={...} />.
 */

const BASE_URL = 'https://lindener-ratsstuben.de';

// ═══ RESTAURANT SCHEMA (already in layout.tsx — this is for reuse) ═══

export function createRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: companyData.companyName,
    image: `${BASE_URL}/images/placeholder.svg`,
    '@id': BASE_URL,
    url: BASE_URL,
    telephone: companyData.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyData.address.street,
      addressLocality: companyData.address.city,
      postalCode: companyData.address.zip,
      addressCountry: companyData.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:30',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '11:30',
        closes: '21:00',
      },
    ],
    menu: companyData.menuLink,
    servesCuisine: ['Italian', 'Mediterranean', 'Vegetarian'],
    acceptsReservations: 'True',
    paymentAccepted: companyData.paymentMethods.join(', '),
  };
}

// ═══ LOCAL BUSINESS SCHEMA ═══

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

// ═══ WEBSITE SCHEMA ═══

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyData.companyName,
    url: BASE_URL,
  };
}
