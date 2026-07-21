"use client";

import React from 'react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { Home, UtensilsCrossed, Phone } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

export default function NotFound() {
  const { t } = useTranslation('pages');
  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-beige flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-8xl font-display font-bold text-primary mb-4" aria-hidden="true">404</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-main mb-6">
            {t('notfound.title') as string}
          </h1>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">
            {t('notfound.description') as string}
          </p>
          <nav aria-label={t('notfound.helpful_links') as string} className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocaleLink
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-surface rounded-xl font-medium hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              {t('notfound.to_home') as string}
            </LocaleLink>
            <LocaleLink
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
              {t('notfound.to_menu') as string}
            </LocaleLink>
            <LocaleLink
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t('notfound.to_contact') as string}
            </LocaleLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
