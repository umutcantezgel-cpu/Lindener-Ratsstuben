import React from 'react';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/types';

interface MenuItemCardProps {
  /** The menu item data from the typed data layer */
  item: MenuItem;
  /** Additional CSS classes for the card wrapper */
  className?: string;
}

/**
 * Displays a single menu item with name, description, price,
 * allergen badges, dietary tags, and spice level indicator.
 * Consumes the strict `MenuItem` type from Phase 2.
 */
export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, className }) => {
  const tagLabels: Record<string, string> = {
    vegetarian: 'Vegetarisch',
    vegan: 'Vegan',
    spicy: 'Scharf',
    bestseller: 'Bestseller',
    'chef-recommendation': 'Empfehlung',
    new: 'Neu',
  };

  const tagColors: Record<string, string> = {
    vegetarian: 'bg-green-100 text-green-800',
    vegan: 'bg-emerald-100 text-emerald-800',
    spicy: 'bg-red-100 text-red-800',
    bestseller: 'bg-yellow-100 text-yellow-800',
    'chef-recommendation': 'bg-primary/10 text-primary',
    new: 'bg-blue-100 text-blue-800',
  };

  return (
    <div
      className={cn(
        'group flex justify-between items-start gap-4 py-4 border-b border-border last:border-b-0 transition-colors hover:bg-bg-secondary/50 px-2 -mx-2 rounded-lg',
        className
      )}
    >
      {/* Left: Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-text-secondary opacity-70 tabular-nums">{item.nr}</span>
          <h3 className="font-bold text-text-primary">{item.name}</h3>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full',
                tagColors[tag] || 'bg-bg-secondary text-text-secondary'
              )}
            >
              {tagLabels[tag] || tag}
            </span>
          ))}
        </div>

        {item.description && (
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Allergens & Zusatzstoffe */}
        {(item.allergens.length > 0 || item.zusatzstoffe.length > 0) && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {item.allergens.map((a) => (
              <span key={`a-${a}`} className="text-[10px] text-text-secondary/70 font-medium">
                {a}
              </span>
            ))}
            {item.zusatzstoffe.map((z) => (
              <span key={`z-${z}`} className="text-[10px] text-text-secondary/70 font-medium">
                {z}
              </span>
            ))}
          </div>
        )}

        {/* Spice Level */}
        {item.spiceLevel > 0 && (
          <div className="flex gap-0.5 mt-1" aria-label={`Schärfegrad: ${item.spiceLevel} von 3`}>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  'text-sm',
                  i < item.spiceLevel ? 'text-red-500' : 'text-border'
                )}
              >
                🌶️
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right: Price */}
      <div className="flex-shrink-0 text-right">
        <span className="text-lg font-bold text-primary tabular-nums">
          {item.price.toFixed(2).replace('.', ',')} &euro;
        </span>
      </div>
    </div>
  );
};
