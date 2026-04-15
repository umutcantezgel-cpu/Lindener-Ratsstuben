import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('menu.title', 'Speisekarte');
  const description = t('menu.description', 'Entdecken Sie unsere vielfältige Speisekarte mit authentischen italienischen und mediterranen Gerichten in den Lindener Ratsstuben.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: {
      canonical: '/menu',
    },
    openGraph: {
      title: fullTitle,
      description,
      url: "/menu",
    }
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 min-h-screen bg-bg-secondary flex justify-center"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
      <PageClient />
    </Suspense>
  );
}
