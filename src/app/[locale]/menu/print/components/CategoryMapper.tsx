"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import DishItem from './DishItem';
import { menuItems, SSOTMenuItem } from '@/data/menu';
import { formatCurrency } from '@/lib/i18n/formatters/number';

export function CategoryMapper({ 
  categoryId, 
  filterFn,
  itemIds,
  marginBottom,
  descStyle
}: { 
  categoryId: string, 
  filterFn?: (item: SSOTMenuItem) => boolean,
  itemIds?: string[],
  marginBottom?: string,
  descStyle?: React.CSSProperties
}) {
  const pathname = usePathname();
  const locale = pathname ? (pathname.split('/')[1] || 'de') : 'de';
  let items = menuItems.filter(i => i.category === categoryId);
  if (itemIds) {
    items = items.filter(i => itemIds.includes(i.nr));
  }
  if (filterFn) {
    items = items.filter(filterFn);
  }

  return (
    <>
      {items.map((item, idx) => (
        <DishItem
          key={idx}
          id={item.nr}
          name={item.name}
          price={item.price === null ? "Preis auf Anfrage" : formatCurrency(item.price, locale)}
          desc={item.description}
          allergens={item.allergens}
          zusatzstoffe={item.zusatzstoffe}
          marginBottom={marginBottom}
          descStyle={descStyle}
        />
      ))}
    </>
  );
}
