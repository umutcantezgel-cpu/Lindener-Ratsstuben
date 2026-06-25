import { getAlternates } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { JsonLd } from '@/components/seo/JsonLd';
import { createHomeFaqSchema } from '@/lib/seo/schema-generators';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'meta');
  const title = `${t('home.title', 'Restaurant & Eventlocation Linden')} | ${companyData.companyName}`;
  const description = t('home.description', 'Authentisch deutsch-italienische Küche, Eventlocation und hauseigene Kegelbahn.');
  
  return {
    title: t('home.title', 'Restaurant & Eventlocation Linden'),
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
  return (
    <>
      <JsonLd data={createHomeFaqSchema()} />
      <PageClient locale={locale} />
    </>
  );
}
