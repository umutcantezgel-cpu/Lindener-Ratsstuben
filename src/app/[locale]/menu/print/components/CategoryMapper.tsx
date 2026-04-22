"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import DishItem from './DishItem';
import { menuItems, SSOTMenuItem } from '@/data/menu';
import { formatCurrency } from '@/lib/i18n/formatters/number';

export function CategoryMapper({ 
  categoryId, 
  filterFn,
  marginBottom,
  descStyle
}: { 
  categoryId: string, 
  filterFn?: (item: SSOTMenuItem) => boolean,
  marginBottom?: string,
  descStyle?: React.CSSProperties
}) {
  const pathname = usePathname();
  const locale = pathname ? (pathname.split('/')[1] || 'de') : 'de';
  let items = menuItems.filter(i => i.category === categoryId);
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
          marginBottom={marginBottom}
          descStyle={item.nr === '25' ? { color: 'var(--gold-deep, #b8860b)', fontSize: '1.05em', fontWeight: 500 } : descStyle}
          allergens={item.allergens}
        />
      ))}
    </>
  );
}
