import type { Metadata } from 'next';
import { Suspense } from 'react';
import '@/styles/index.css';
import { Header } from '@/components/layout/Header';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer), { ssr: true });
import { SkipNav } from '@/components/layout/SkipNav';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { BackToTop } from '@/components/ui/BackToTop';
import { JsonLd } from '@/components/seo/JsonLd';
import { companyData } from '@/data/company';
import { createGlobalSchemaGraph } from '@/lib/seo/schema-generators';
import { Inter, Lora } from 'next/font/google';
import { AppProvider } from '@/lib/context/AppContext';
import { UIProvider } from '@/lib/context/UIContext';
import { DeviceProvider } from '@/lib/context/DeviceContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ToastContainer from '@/components/ui/ToastContainer';
import { ClientKeyboardShortcuts } from '@/components/ui/ClientKeyboardShortcuts';
import { RouteChangeIndicator } from '@/components/effects/RouteChangeIndicator';
import { OfflineBanner } from '@/components/effects/OfflineBanner';
import { headers } from 'next/headers';
import { WebVitals } from '@/components/monitoring/WebVitals';
import { getDirection } from '@/lib/i18n/rtl';
import { I18nProvider } from '@/lib/i18n/I18nProvider';
import { loadTranslations } from '@/lib/i18n/translations';
import { UserJourneyProvider } from '@/context/UserJourneyContext';
import { CookieProvider } from '@/lib/context/CookieContext';
const FloatingReservationCTA = dynamic(() => import('@/components/interactive/FloatingReservationCTA').then(mod => mod.FloatingReservationCTA), { ssr: false });
const ExitIntentOverlay = dynamic(() => import('@/components/interactive/ExitIntentOverlay').then(mod => mod.ExitIntentOverlay), { ssr: false });
const AiKnowledgeBase = dynamic(() => import('@/components/seo/AiKnowledgeBase').then(mod => mod.AiKnowledgeBase), { ssr: true });
const CookieConsentBanner = dynamic(() => import('@/components/legal/CookieConsentBanner').then(mod => mod.CookieConsentBanner), { ssr: false });

const interFont = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600'],
  adjustFontFallback: true,
});

const loraFont = Lora({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '600', '700'],
  adjustFontFallback: true,
});

import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'home');
  const defaultTitle = `Restaurant ${companyData.companyName} | ${t('hero.headline_1')}`;
  const description = t('hero.description');

  return {
    metadataBase: new URL('https://lindener-ratsstuben.de'),
    title: {
      template: `%s | ${companyData.companyName}`,
      default: defaultTitle,
    },
    description,
    keywords: ['Italienisch', 'Mediterran', 'Restaurant', 'Linden', 'Lindener Ratsstuben', 'Pizza', 'Pasta', 'Vegetarisch', 'Biergarten'],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      url: '/',
      siteName: companyData.companyName,
      title: defaultTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description,
    }
  };
}

import { getSiteSettings } from '@/lib/sanity/fetch';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = getDirection(locale);
  const headersList = await headers();
  const initialDeviceType = (headersList.get('x-device-type') as 'mobile' | 'tablet' | 'desktop') || 'desktop';
  
  // Preload all critical namespaces for Client Components synchronously
  const namespaces = ['common', 'navigation', 'pages', 'home', 'forms', 'menu', 'meta'];
  const dictionaries = await Promise.all(
    namespaces.map(ns => loadTranslations(locale as LocaleType, ns))
  );
  const clientDictionary = dictionaries.reduce((acc, current) => ({ ...acc, ...current }), {});

  const jsonLd = createGlobalSchemaGraph();

  let siteSettings;
  try {
    siteSettings = await getSiteSettings();
  } catch (error) {
    console.error('Failed to fetch site settings in layout:', error);
  }

  const mainMenuPdfUrl = siteSettings?.mainMenuPdfUrl;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${interFont.variable} ${loraFont.variable}`}>
      <head>
        <JsonLd data={jsonLd} />
        <link rel="llms" href="/llms.txt" />
      </head>
      <body suppressHydrationWarning className="font-body text-text-primary bg-bg-primary overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
        <WebVitals />
        <DeviceProvider initialDeviceType={initialDeviceType}>
          <UserJourneyProvider>
            <CookieProvider>
              <AppProvider>
                <UIProvider>
                  <I18nProvider dictionary={clientDictionary} locale={locale as LocaleType}>
                    <SkipNav />
                    <ErrorBoundary>
                      <div className="antialiased min-h-screen flex flex-col" role="document">
                      <div className="bg-paper-texture" aria-hidden="true" />
                      <OfflineBanner />
                      <ClientKeyboardShortcuts />
                      <RouteChangeIndicator />
                      <ScrollProgress />
                      <Header mainMenuPdfUrl={mainMenuPdfUrl} />
                      <main id="main-content" className="flex-grow">
                        <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
                          {children}
                        </Suspense>
                      </main>
                      <Footer mainMenuPdfUrl={mainMenuPdfUrl} />
                      <FloatingReservationCTA />
                      <ExitIntentOverlay />
                      <BackToTop />
                      <ToastContainer />
                      <CookieConsentBanner />
                      <AiKnowledgeBase />
                    </div>
                  </ErrorBoundary>
                  </I18nProvider>
                </UIProvider>
              </AppProvider>
            </CookieProvider>
          </UserJourneyProvider>
        </DeviceProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
