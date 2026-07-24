import { getAlternates } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

import { JsonLd } from '@/components/seo/JsonLd';
import { createHomeFaqSchema } from '@/lib/seo/schema-generators';
import { SeoContentBlock } from '@/components/seo/SeoContentBlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'meta');
  const title = t('home.title', 'Restaurant & Eventlocation Linden | Lindener Ratsstuben');
  const description = t('home.description', 'Authentisch deutsch-italienische Küche, Eventlocation und hauseigene Kegelbahn.');
  
  return {
    title: t('home.title', 'Restaurant & Eventlocation Linden | Lindener Ratsstuben'),
    description,
    alternates: getAlternates(locale, ''),
    openGraph: {
      title,
      description,
      url: `/${locale}`,
    }
  };
}


export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  return (
    <>
      <h1 className="sr-only">{tMeta('home.title', 'Restaurant Lindener Ratsstuben').split(' |')[0]}</h1>
      <JsonLd data={createHomeFaqSchema()} />
      <PageClient locale={locale} />
      <SeoContentBlock locale={locale} pageKey="home" />
    </>
  );
}
