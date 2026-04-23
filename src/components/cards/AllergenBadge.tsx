'use client';

import React from 'react';
import { allergenLegend } from '@/data/menu';
import { useTranslation } from '@/lib/i18n/use-translation';

interface AllergenBadgeProps {
  code: string;
  size?: 'sm' | 'md';
  showTooltip?: boolean;
}

const ALLERGEN_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'A': { bg: 'bg-amber-900/30', text: 'text-amber-300', border: 'border-amber-500/40' },
  'B': { bg: 'bg-cyan-900/30', text: 'text-cyan-300', border: 'border-cyan-500/40' },
  'C': { bg: 'bg-yellow-900/30', text: 'text-yellow-300', border: 'border-yellow-500/40' },
  'D': { bg: 'bg-blue-900/30', text: 'text-blue-300', border: 'border-blue-500/40' },
  'E': { bg: 'bg-orange-900/30', text: 'text-orange-300', border: 'border-orange-500/40' },
  'F': { bg: 'bg-lime-900/30', text: 'text-lime-300', border: 'border-lime-500/40' },
  'G': { bg: 'bg-sky-900/30', text: 'text-sky-300', border: 'border-sky-500/40' },
  'H': { bg: 'bg-rose-900/30', text: 'text-rose-300', border: 'border-rose-500/40' },
  'L': { bg: 'bg-emerald-900/30', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  'M': { bg: 'bg-yellow-900/30', text: 'text-yellow-200', border: 'border-yellow-400/40' },
  'N': { bg: 'bg-stone-800/40', text: 'text-stone-300', border: 'border-stone-500/40' },
  'O': { bg: 'bg-purple-900/30', text: 'text-purple-300', border: 'border-purple-500/40' },
  'P': { bg: 'bg-teal-900/30', text: 'text-teal-300', border: 'border-teal-500/40' },
  'R': { bg: 'bg-indigo-900/30', text: 'text-indigo-300', border: 'border-indigo-500/40' },
};

const DEFAULT_COLOR = { bg: 'bg-neutral-800/40', text: 'text-neutral-300', border: 'border-neutral-500/40' };

export function AllergenBadge({ code, size = 'sm', showTooltip = true }: AllergenBadgeProps) {
  const label = allergenLegend[code] || code;
  const colors = ALLERGEN_COLORS[code] || DEFAULT_COLOR;
  
  const sizeClasses = size === 'sm' 
    ? 'w-6 h-6 text-[10px]' 
    : 'w-8 h-8 text-xs';

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-mono font-bold border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses} cursor-default transition-transform hover:scale-110 relative group`}
      aria-label={`Enthält ${label}`}
      title={showTooltip ? label : undefined}
      role="img"
    >
      {code}
    </span>
  );
}

interface AllergenBadgeListProps {
  codes: string[];
  size?: 'sm' | 'md';
  className?: string;
}

export function AllergenBadgeList({ codes, size = 'sm', className = '' }: AllergenBadgeListProps) {
  const { t } = useTranslation('common');
  if (!codes || codes.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1 ${className}`} aria-label={t('aria.allergens') as string}>
      {codes.map(code => (
        <AllergenBadge key={code} code={code} size={size} />
      ))}
    </div>
  );
}
