import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('contact.title', 'Kontakt');
  const description = t('contact.description', 'Kontaktieren Sie uns. Wir freuen uns auf Ihre Nachricht, Reservierungen oder Feedback.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: "/contact",
    }
  };
}

export default function Page() {
  return <PageClient />;
}
