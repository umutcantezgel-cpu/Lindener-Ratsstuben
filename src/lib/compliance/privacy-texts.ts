/**
 * Multilingual privacy and cookie consent texts.
 * These are the legally-required disclosures for each framework and locale.
 */

import type { ConsentLegalFramework } from './cookie-banner';

/** Framework-level privacy disclosure texts */
export const PRIVACY_TEXTS: Record<ConsentLegalFramework, Record<string, string>> = {
  DSGVO: {
    de: 'Wir nutzen Cookies zur Speicherung von Einstellungen und zur Analyse. Nach DSGVO Art. 13 müssen Sie zustimmen, bevor Cookies gespeichert werden.',
    en: 'We use cookies to store settings and analyze usage. Under GDPR Article 13, you must consent before cookies are stored.',
    fr: "Nous utilisons des cookies pour mémoriser les paramètres et analyser l'utilisation. Selon l'article 13 du RGPD, vous devez consentir avant que les cookies ne soient stockés.",
    es: 'Utilizamos cookies para almacenar configuraciones y analizar el uso. Según el artículo 13 del RGPD, debe dar su consentimiento antes de que se almacenen las cookies.',
  },
  CCPA: {
    en: 'California residents have the right to know, delete, and opt-out of sales of personal information. See our Privacy Policy for details.',
  },
  LGPD: {
    pt: 'Utilizamos cookies e processamos dados pessoais. De acordo com a LGPD, você tem direito de acessar, corrigir ou deletar seus dados.',
  },
  PIPL: {
    zh: '我们使用 Cookie 存储设置并分析使用情况。根据《个人信息保护法》，在存储 Cookie 之前必须获得您的同意。',
  },
  POPIA: {
    en: 'We process personal information in accordance with POPIA. You have the right to access, correct, or delete your data.',
  },
};

/** Cookie banner UI text per locale */
export const COOKIE_BANNER_TEXT: Record<string, Record<string, string>> = {
  de: {
    title: 'Cookie-Einstellungen',
    essential: 'Notwendig für Website-Funktionalität',
    analytics: 'Helfen uns, deine Nutzung zu verstehen',
    marketing: 'Ermöglichen personalisierte Werbung',
    acceptAll: 'Alle akzeptieren',
    rejectAll: 'Alle ablehnen',
    savePreferences: 'Einstellungen speichern',
  },
  en: {
    title: 'Cookie Settings',
    essential: 'Required for website functionality',
    analytics: 'Help us understand how you use our site',
    marketing: 'Enable personalized advertising',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    savePreferences: 'Save Preferences',
  },
  fr: {
    title: 'Paramètres des cookies',
    essential: 'Nécessaires au fonctionnement du site',
    analytics: "Nous aident à comprendre l'utilisation du site",
    marketing: 'Permettent la publicité personnalisée',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    savePreferences: 'Enregistrer les préférences',
  },
  es: {
    title: 'Configuración de cookies',
    essential: 'Necesarias para el funcionamiento del sitio',
    analytics: 'Nos ayudan a entender cómo usas nuestro sitio',
    marketing: 'Permiten publicidad personalizada',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    savePreferences: 'Guardar preferencias',
  },
};

/**
 * Returns the cookie banner text for a given locale.
 * Falls back to German ('de') as the primary locale for this project.
 */
export function getCookieBannerText(locale: string): Record<string, string> {
  const baseLang = locale.split('-')[0].toLowerCase();
  return COOKIE_BANNER_TEXT[baseLang] || COOKIE_BANNER_TEXT['de'];
}
