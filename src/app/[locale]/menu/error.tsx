'use client';

import React, { useEffect } from 'react';
import { RefreshCw, UtensilsCrossed } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/use-translation';

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation('common');

  useEffect(() => {
    console.error('Menu error:', error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h2 className="text-3xl font-display font-bold text-text-main mb-6">
        {t('error.menu_title') as string}
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
        {t('error.menu_description') as string}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <RefreshCw className="w-5 h-5" />
          {t('error.try_again') as string}
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <UtensilsCrossed className="w-5 h-5" />
          {t('error.go_home') as string}
        </Link>
      </div>
    </Container>
  );
}
