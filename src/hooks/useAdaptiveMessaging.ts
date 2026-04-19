"use client";

import { useUserJourney, PrimaryInterest } from '@/context/UserJourneyContext';
import { useTranslation } from '@/lib/i18n/use-translation';

const HERO_IMAGES: Record<PrimaryInterest, { imageUrl: string; blurDataURL?: string }> = {
  kultur: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  natur: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  kulinarik: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  business: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  romantik: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  familie: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  },
  general: {
    imageUrl: '/images/hero_trattoria.png',
    blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAP0lEQVR4nAE0AMv/AP/mpv/npsSLY6p1UADkn2nwqHJbPi58VzwAhFYz2JZjwYZfHwAAAGQ5G6ZwRf/Vo49OLsQ8GD1mxavnAAAAAElFTkSuQmCC'
  }
};

export function useAdaptiveMessaging() {
  const { state } = useUserJourney();
  const { primaryInterest, regionalFocus } = state;
  const { t } = useTranslation('common');

  const safeInterest = primaryInterest || 'general';

  // Retrieve localized base arguments
  const baseHeadline = t(`adaptive.${safeInterest}.cta.headline`);
  const baseSubheadline = t(`adaptive.${safeInterest}.cta.subheadline`);
  const buttonText = t(`adaptive.${safeInterest}.cta.buttonText`);
  
  const heroHeadline = t(`adaptive.${safeInterest}.hero.headline`);
  const heroSubheadline = t(`adaptive.${safeInterest}.hero.subheadline`);
  const heroCta1 = t(`adaptive.${safeInterest}.hero.cta1`);
  
  const navText = t(`adaptive.${safeInterest}.navText`);

  // Optionally inject the regional focus into the subheadline for maximum psychological relevance
  let personalizedSubheadline = baseSubheadline;
  if (regionalFocus && safeInterest === 'general') {
    personalizedSubheadline = t('adaptive.regionalFocus.general', { regionalFocus, baseSubheadline });
  } else if (regionalFocus) {
    personalizedSubheadline = t('adaptive.regionalFocus.specific', { regionalFocus, baseSubheadline });
  }

  return {
    cta: {
      headline: baseHeadline,
      subheadline: personalizedSubheadline,
      buttonText: buttonText
    },
    hero: {
      headline: heroHeadline,
      subheadline: heroSubheadline,
      cta1: heroCta1,
      ...HERO_IMAGES[safeInterest]
    },
    navCta: navText,
    variant: safeInterest,
    heroVariant: safeInterest
  };
}

