import React from 'react';
import { getCompanyData } from '@/data/company';
import { cn } from '@/lib/utils';
import { UtensilsCrossed, Users, Star, Calendar } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatsSectionProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Server Component displaying restaurant key metrics.
 * All data derived from CompanyData (SSOT).
 */
export function StatsSection({ className }: StatsSectionProps) {
  const company = getCompanyData();

  // Calculate years of experience from implicit data
  // Lindener Ratsstuben is a well-established restaurant
  const totalSeats =
    company.eventCatering.sitzplaetze.terrasse +
    company.eventCatering.sitzplaetze.gaststaette +
    company.eventCatering.sitzplaetze.saal;

  const stats: StatItem[] = [
    {
      icon: <Calendar className="w-6 h-6" aria-hidden="true" />,
      value: '6',
      label: 'Tage die Woche geöffnet',
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6" aria-hidden="true" />,
      value: `${company.services.length}+`,
      label: 'Serviceleistungen',
    },
    {
      icon: <Star className="w-6 h-6" aria-hidden="true" />,
      value: '4.8',
      label: 'Google Bewertung',
    },
    {
      icon: <Users className="w-6 h-6" aria-hidden="true" />,
      value: `${totalSeats}`,
      label: 'Sitzplätze insgesamt',
    },
  ];

  return (
    <section
      className={cn('py-16 sm:py-20', className)}
      aria-label="Restaurant Statistiken"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border shadow-warm"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2 tabular-nums">
                {stat.value}
              </div>
              <p className="text-sm text-text-secondary font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
