import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { JsonLd } from '@/components/seo/JsonLd';
import { createReservationPageSchema } from '@/lib/seo/schema-generators';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('reservation.title', 'Reservierung');
  const description = t('reservation.description', 'Reservieren Sie Ihren Tisch in den Lindener Ratsstuben bequem online. Wir freuen uns auf Ihren Besuch!');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: {
      canonical: '/reservation',
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}/reservation`,
    }
  };
}

export default function Page() {
  return (
    <>
      <JsonLd data={createReservationPageSchema()} />
      <PageClient />
    </>
  );
}
