"use client";
import { useTranslation } from '@/lib/i18n/use-translation';

export const SkipNav: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:start-4 focus:bg-primary focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {t('accessibility.skip_to_content') as string}
    </a>
  );
}
