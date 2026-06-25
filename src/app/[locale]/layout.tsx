import type { Metadata } from 'next';
import { Suspense } from 'react';
import '@/styles/index.css';
import { Header } from '@/components/layout/Header';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer), { ssr: true });
import { SkipNav } from '@/components/layout/SkipNav';
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress').then(mod => mod.ScrollProgress), { ssr: false });
const BackToTop = dynamic(() => import('@/components/ui/BackToTop').then(mod => mod.BackToTop), { ssr: false });
import { PageSkeleton } from '@/components/ui/PageSkeleton';
import { JsonLd } from '@/components/seo/JsonLd';
import { companyData } from '@/data/company';
import { createGlobalSchemaGraph } from '@/lib/seo/schema-generators';
import { IdleRender } from '@/components/utils/IdleRender';
import { Inter, Lora } from 'next/font/google';
import { AppProvider } from '@/lib/context/AppContext';
import { UIProvider } from '@/lib/context/UIContext';
import { DeviceProvider } from '@/lib/context/DeviceContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
const ToastContainer = dynamic(() => import('@/components/ui/ToastContainer'), { ssr: false });
const ClientKeyboardShortcuts = dynamic(() => import('@/components/ui/ClientKeyboardShortcuts').then(mod => mod.ClientKeyboardShortcuts), { ssr: false });
import { GlobalMotionProvider } from '@/lib/context/MotionProvider';
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
import { ALLOWED_LOCALES, LocaleType } from '@/lib/locales';
import { getAlternates } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return ALLOWED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'meta');
  const defaultTitle = `${t('home.title')} | ${companyData.companyName}`;
  const description = t('home.description');

  return {
    metadataBase: new URL('https://www.lindener-ratsstuben.de'),
    title: {
      template: `%s | ${companyData.companyName}`,
      default: defaultTitle,
    },
    description,
    keywords: ['Italienisch', 'Mediterran', 'Restaurant', 'Linden', 'Lindener Ratsstuben', 'Pizza', 'Pasta', 'Vegetarisch', 'Biergarten'],
    publisher: companyData.companyName,
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
    alternates: getAlternates(locale, ''),
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


const ConsentGatedAnalytics = dynamic(() => import('@/components/analytics/ConsentGatedAnalytics').then(mod => mod.ConsentGatedAnalytics), { ssr: false });

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

  const jsonLd = await createGlobalSchemaGraph(locale as LocaleType);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${interFont.variable} ${loraFont.variable}`}>
      <head>
        <JsonLd data={jsonLd} />
        <link rel="preload" as="image" href="/images/hero_trattoria.webp" type="image/webp" fetchPriority="high" />
        <link rel="llms" href="/llms.txt" />
        <link rel="llms-full" href="/llms-full.txt" />
      </head>
      <body suppressHydrationWarning className="font-body text-text-primary bg-bg-primary overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
        <DeviceProvider initialDeviceType={initialDeviceType}>
          <UserJourneyProvider>
            <CookieProvider>
              <AppProvider>
                <UIProvider>
                  <I18nProvider dictionary={clientDictionary} locale={locale as LocaleType}>
                    <GlobalMotionProvider>
                      <SkipNav />
                      <ErrorBoundary>
                      <div className="antialiased min-h-screen flex flex-col" role="document">
                      <div className="bg-paper-texture" aria-hidden="true" />
                      <ScrollProgress />
                      <Header />
                      <main id="main-content" role="main" className="flex-grow">
                        <Suspense fallback={<PageSkeleton />}>
                          {children}
                        </Suspense>
                      </main>
                      <Footer />
                      <IdleRender delay={1500}>
                        <WebVitals />
                        <OfflineBanner />
                        <ClientKeyboardShortcuts />
                        <Suspense fallback={null}>
                          <RouteChangeIndicator />
                        </Suspense>
                        <FloatingReservationCTA />
                        <ExitIntentOverlay />
                        <BackToTop />
                        <ToastContainer />
                        <CookieConsentBanner />
                        <ConsentGatedAnalytics />
                        <AiKnowledgeBase locale={locale} />
                      </IdleRender>
                    </div>
                  </ErrorBoundary>
                  </GlobalMotionProvider>
                  </I18nProvider>
                </UIProvider>
              </AppProvider>
            </CookieProvider>
          </UserJourneyProvider>
        </DeviceProvider>
        {/* Analytics removed from here — now consent-gated via ConsentGatedAnalytics inside CookieProvider */}
      </body>
    </html>
  );
}
