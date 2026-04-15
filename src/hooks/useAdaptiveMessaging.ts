"use client";

import { useUserJourney, PrimaryInterest } from '@/context/UserJourneyContext';

interface CTAContent {
  headline: string;
  subheadline: string;
  buttonText: string;
}

const MATRIX: Record<PrimaryInterest, CTAContent> = {
  kultur: {
    headline: 'Ein eleganter Abschluss für Ihren Kulturtag.',
    subheadline: 'Lassen Sie die gesammelten Eindrücke Revue passieren – bei feiner Kulinarik und einem ausgesuchten Glas Wein in unseren exklusiven Räumlichkeiten.',
    buttonText: 'Tisch für heute Abend reservieren'
  },
  natur: {
    headline: 'Die perfekte Belohnung nach der Aktivität.',
    subheadline: 'Kommen Sie nach Ihrem Ausflug in der Natur zur Ruhe. Wir erwarten Sie mit herzhafter, aber raffinierter Regionalküche.',
    buttonText: 'Einen entspannten Tisch sichern'
  },
  kulinarik: {
    headline: 'Bereit für den nächsten Höhepunkt?',
    subheadline: 'Sie schätzen besondere Genuss-Momente. Entdecken Sie unsere saisonal wechselnden Menüs, meisterhaft interpretiert.',
    buttonText: 'Kulinarisches Erlebnis reservieren'
  },
  business: {
    headline: 'Diskretion und exzellenter Service.',
    subheadline: 'Der ideale Rahmen für ungestörte Geschäftsessen oder den verdienten Feierabend in Premium-Atmosphäre.',
    buttonText: 'Business-Tisch anfragen'
  },
  romantik: {
    headline: 'Ein perfekter Abend zu zweit.',
    subheadline: 'Lassen Sie den Alltag hinter sich. Romantisches Ambiente, exzellente Weine und kulinarische Meisterwerke für unvergessliche Momente.',
    buttonText: 'Tisch für Zwei reservieren'
  },
  familie: {
    headline: 'Entspannter Genuss für die ganze Familie.',
    subheadline: 'Ein Ort, an dem sich alle wohlfühlen. Hochwertige Zutaten, liebevoll zubereitet – für gemeinsame Erinnerungen.',
    buttonText: 'Familientisch sichern'
  },
  general: {
    headline: 'Ihr Platz in den Lindener Ratsstuben.',
    subheadline: 'Erleben Sie regionale Verbundenheit und höchste kulinarische Ansprüche. Wir freuen uns darauf, Sie als unseren Gast begrüßen zu dürfen.',
    buttonText: 'Jetzt Tisch reservieren'
  }
};

const HERO_MATRIX: Record<PrimaryInterest, { headline: string; subheadline: string; cta1: string; imageUrl: string }> = {
  kultur: {
    headline: 'Kultur genießen',
    subheadline: 'Kombinieren Sie Ihre kulturellen Erlebnisse mit einer Reise durch unsere meisterhafte mediterrane Küche.',
    cta1: 'Abend ausklingen lassen',
    imageUrl: '/images/ambient-wine.jpg' // Assuming a placeholder image exists or will exist
  },
  natur: {
    headline: 'Echte Erholung',
    subheadline: 'Der perfekte Ort, um nach einem aktiven Tag in der Natur neue Kraft zu tanken und sich verwöhnen zu lassen.',
    cta1: 'Einen Tisch sichern',
    imageUrl: '/images/hearty-meal.jpg'
  },
  kulinarik: {
    headline: 'Pure Raffinesse',
    subheadline: 'Entdecken Sie handwerklich perfekte Kompositionen für höchste kulinarische Ansprüche.',
    cta1: 'Ihre Genussreise starten',
    imageUrl: '/images/gourmet-plating.jpg'
  },
  business: {
    headline: 'Premium Atmosphäre',
    subheadline: 'Diskreter Service und kompromisslose Qualität für Ihre Geschäftsessen und exklusiven Abende.',
    cta1: 'Business-Tisch anfragen',
    imageUrl: '/images/business-dining.jpg'
  },
  romantik: {
    headline: 'Zweisamkeit zelebrieren',
    subheadline: 'Genießen Sie intime Atmosphäre und meisterhafte Menüs, die Ihren Abend unvergesslich machen.',
    cta1: 'Tisch für Zwei reservieren',
    imageUrl: '/images/placeholder.svg'
  },
  familie: {
    headline: 'Gemeinsam genießen',
    subheadline: 'Der ideale Rahmen für ein entspanntes und hochwertiges Familienessen.',
    cta1: 'Zum Familientisch',
    imageUrl: '/images/placeholder.svg'
  },
  general: {
    headline: 'Kulinarische Exzellenz',
    subheadline: 'Willkommen in den Lindener Ratsstuben. Genießen Sie italienische und mediterrane Spezialitäten, frisch zubereitet mit Leidenschaft.',
    cta1: 'Tisch reservieren',
    imageUrl: '/images/placeholder.svg'
  }
};

const NAV_MATRIX: Record<PrimaryInterest, string> = {
  kultur: 'Abend ausklingen lassen',
  natur: 'Entspannt genießen',
  kulinarik: 'Erlebnis reservieren',
  business: 'Tisch anfragen',
  romantik: 'Tisch für Zwei',
  familie: 'Familientisch',
  general: 'Tisch reservieren'
};

export function useAdaptiveMessaging() {
  const { state } = useUserJourney();
  const { primaryInterest, regionalFocus } = state;

  // Retrieve the base arguments
  const baseContent = MATRIX[primaryInterest] || MATRIX['general'];
  const heroContent = HERO_MATRIX[primaryInterest] || HERO_MATRIX['general'];
  const navText = NAV_MATRIX[primaryInterest] || NAV_MATRIX['general'];

  // Optionally inject the regional focus into the subheadline for maximum psychological relevance
  let personalizedSubheadline = baseContent.subheadline;
  if (regionalFocus && primaryInterest === 'general') {
    personalizedSubheadline = `Nach Ihrem Ausflug in ${regionalFocus}: ${baseContent.subheadline}`;
  } else if (regionalFocus) {
      personalizedSubheadline = `Wenn Sie ${regionalFocus} erkunden: ${baseContent.subheadline}`;
  }

  return {
    cta: {
      headline: baseContent.headline,
      subheadline: personalizedSubheadline,
      buttonText: baseContent.buttonText
    },
    hero: heroContent,
    navCta: navText,
    variant: primaryInterest,
    heroVariant: primaryInterest
  };
}

