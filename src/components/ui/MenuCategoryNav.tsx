'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { MenuCategory } from '@/types';
import { useTranslation } from '@/lib/i18n/use-translation';

interface MenuCategoryNavProps {
  /** Array of menu categories from the data layer */
  categories: MenuCategory[];
  /** Currently selected category ID (or null for "all") */
  activeCategory: string | null;
  /** Callback when a category is selected */
  onCategoryChange: (categoryId: string | null) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Horizontal category filter navigation for the menu page.
 * Client Component — manages active filter state.
 * Uses project theme tokens for active/inactive states.
 */
export function MenuCategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
  className,
}: MenuCategoryNavProps) {
  const { t } = useTranslation('common');
  return (
    <nav
      aria-label={t('aria.menu_categories') as string}
      className={cn(
        'flex flex-wrap gap-2 sm:gap-3',
        className
      )}
    >
      {/* "Alle" button */}
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
          activeCategory === null
            ? 'bg-primary text-surface shadow-sm'
            : 'bg-bg-secondary text-text-secondary hover:bg-surface border border-transparent hover:border-border'
        )}
        aria-pressed={activeCategory === null}
      >
        {t('menu.all_categories') as string || 'Alle'}
      </button>

      {categories.map((cat) => {
        const catId = cat.id as unknown as string;
        const isActive = activeCategory === catId;

        return (
          <button
            key={catId}
            onClick={() => onCategoryChange(catId)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200',
              isActive
                ? 'bg-primary text-surface shadow-sm'
                : 'bg-bg-secondary text-text-secondary hover:bg-surface border border-transparent hover:border-border'
            )}
            aria-pressed={isActive}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
}
