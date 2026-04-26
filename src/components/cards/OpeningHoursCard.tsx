import React from 'react';
import { getCompanyData } from '@/data/company';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n/use-translation';
import { TranslationKey } from '@/lib/i18n/types';

interface OpeningHoursCardProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Displays the restaurant's opening hours sourced from the
 * centralized CompanyData singleton via `getCompanyData()`.
 * Server Component — no client-side state needed.
 */
export const OpeningHoursCard: React.FC<OpeningHoursCardProps> = ({ className }) => {
  const company = getCompanyData();
  const { t, locale } = useTranslation('common');
  const { regulaer, sonntag, ruhetag } = company.openingHours;

  const formatTime = (timeRange: { start: string, end: string }) => {
    const parseTime = (tStr: string) => {
        const [h, m] = tStr.split(':');
        const d = new Date();
        d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
        return d;
    };
    
    const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
    const startFmt = timeFmt.format(parseTime(timeRange.start));
    const endFmt = timeFmt.format(parseTime(timeRange.end));
    
    return t('opening_hours.time_range', { start: startFmt, end: endFmt }) as string;
  };

  return (
    <div
      className={cn(
        'bg-bg-secondary rounded-2xl p-6 sm:p-8 border border-border shadow-warm',
        className
      )}
    >
      <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span aria-hidden="true">🕐</span>
        {t('footer.opening_hours')}
      </h3>

      <div className="space-y-3">
        {/* Regular hours */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">{t(regulaer.tageKey as TranslationKey)}</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">
              {formatTime(regulaer.mittags)}
            </div>
            <div className="text-sm font-semibold text-text-primary">
              {formatTime(regulaer.abends)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" role="separator" />

        {/* Sunday hours */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">{t(sonntag.tageKey as TranslationKey)}</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">
              {formatTime(sonntag.mittags)}
            </div>
            <div className="text-sm font-semibold text-text-primary">
              {formatTime(sonntag.abends)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" role="separator" />

        {/* Ruhetag */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">{t(ruhetag.tagKey as TranslationKey)}</span>
          <div className="text-right">
            <span className="text-sm font-semibold text-red-600">{t('footer.closed')}</span>
            <p className="text-xs text-text-secondary">{t(ruhetag.ausnahmeKey as TranslationKey)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
