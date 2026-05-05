/**
 * Entity Map System
 * Single Source of Truth for all schema.org/JSON-LD implementations.
 */

export interface OrganizationEntity {
  name: string;
  legalName: string;
  foundingDate: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contact: {
    telephone: string;
    email: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  social: string[];
  logo: string;
  description: string;
  url: string;
}

export interface PersonEntity {
  id: string;
  name: string;
  jobTitle: string;
  description?: string;
}

export interface ServiceEntity {
  id: string;
  name: string;
  description: string;
  category: string;
  priceRange?: string;
  availability?: string; // e.g. "InStock"
}

export interface ContentEntity {
  id: string;
  title: string;
  authorId?: string;
  datePublished: string;
  dateModified?: string;
  category: string;
}

export interface LocationEntity {
  id: string;
  name: string;
  address: OrganizationEntity['address'];
}

export interface FAQEntity {
  question: string;
  answer: string;
  relatedServiceId?: string;
}

export interface ProjectEntityMap {
  organization: OrganizationEntity;
  persons: PersonEntity[];
  services: ServiceEntity[];
  content: ContentEntity[];
  locations: LocationEntity[];
  faq: FAQEntity[];
}

import { companyData } from '@/data/company';

/**
 * The actual instantiated ProjectEntityMap serving as SSOT for JSON-LD generators.
 */
export const activeEntityMap: ProjectEntityMap = {
  organization: {
    name: companyData.companyName,
    legalName: `Restaurant ${companyData.companyName}`,
    foundingDate: "1989", // Using approximate founding date
    address: {
      streetAddress: companyData.address.street,
      addressLocality: companyData.address.city,
      postalCode: companyData.address.zip,
      addressCountry: companyData.address.country
    },
    contact: {
      telephone: companyData.phone,
      email: companyData.email
    },
    geo: {
      latitude: 50.5313,
      longitude: 8.6566
    },
    social: [
      companyData.facebook,
      companyData.instagram
    ],
    logo: "https://lindener-ratsstuben.de/logo.png",
    description: companyData.tagline,
    url: "https://lindener-ratsstuben.de"
  },
  persons: [
    {
      id: "Hasan Toker",
      name: companyData.ownerName,
      jobTitle: "Inhaber",
      description: `Inhaber des Restaurants ${companyData.companyName}`
    }
  ],
  services: companyData.services.map((service, idx) => ({
    id: `service-${idx}`,
    name: service,
    description: `Service: ${service} im Restaurant ${companyData.companyName}`,
    category: "Restaurant Service"
  })),
  content: [],
  locations: [
    {
      id: "main-location",
      name: companyData.companyName,
      address: {
        streetAddress: companyData.address.street,
        addressLocality: companyData.address.city,
        postalCode: companyData.address.zip,
        addressCountry: companyData.address.country
      }
    }
  ],
  faq: []
};
