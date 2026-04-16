import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'home');
  const title = `${t('hero.headline_1', 'Startseite')} | ${companyData.companyName}`;
  const description = t('hero.description', 'Willkommen in den Lindener Ratsstuben. Genießen Sie italienische und mediterrane Spezialitäten, frisch zubereitet mit Leidenschaft.');
  
  return {
    title: t('hero.headline_1', 'Startseite'),
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
    }
  };
}

import { getSiteSettings } from '@/lib/sanity/fetch';

export default async function Page() {
  const siteSettings = await getSiteSettings().catch(() => null);
  return <PageClient mainMenuPdfUrl={siteSettings?.mainMenuPdfUrl} />;
}
