import { sanityFetch } from './client';
import { siteSettingsQuery } from './queries';

export interface SiteSettings {
  title?: string;
  tagline?: string;
  contactEmail?: string;
  contactPhone?: string;
  displayPhone?: string;
  address?: {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
  };
  openingHours?: {
    monday?: string;
    tuesdayToSunday?: string;
    lunchStart?: string;
    lunchEnd?: string;
    dinnerStart?: string;
    dinnerEnd?: string;
  };
  heroTitle_de?: string;
  heroTitle_en?: string;
  heroTitle_ar?: string;
  heroTitle_fr?: string;
  heroSubtitle_de?: string;
  heroSubtitle_en?: string;
  heroSubtitle_ar?: string;
  heroSubtitle_fr?: string;
  welcomeText_de?: string;
  welcomeText_en?: string;
  welcomeText_ar?: string;
  welcomeText_fr?: string;
  mainMenuPdfUrl?: string;
  dailySpecialsPdfUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await sanityFetch<SiteSettings>({
      query: siteSettingsQuery,
      tags: ['siteSettings'],
    });
    return settings;
  } catch (error) {
    console.error('Failed to fetch site settings from Sanity', error);
    return null;
  }
}
