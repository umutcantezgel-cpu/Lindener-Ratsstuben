import React from 'react';
import { getCompanyData } from '@/data/company';
import { cn } from '@/lib/utils';

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
  const { regulaer, ruhetag } = company.openingHours;

  return (
    <div
      className={cn(
        'bg-bg-secondary rounded-2xl p-6 sm:p-8 border border-border shadow-warm',
        className
      )}
    >
      <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <span aria-hidden="true">🕐</span>
        Öffnungszeiten
      </h3>

      <div className="space-y-3">
        {/* Regular hours */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">{regulaer.tage}</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary">
              {regulaer.mittags}
            </div>
            <div className="text-sm font-semibold text-text-primary">
              {regulaer.abends}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" role="separator" />

        {/* Ruhetag */}
        <div className="flex justify-between items-center">
          <span className="text-text-secondary font-medium">{ruhetag.tag}</span>
          <div className="text-right">
            <span className="text-sm font-semibold text-red-600">Geschlossen</span>
            <p className="text-xs text-text-secondary">{ruhetag.ausnahme}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
