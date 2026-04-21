"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import DishItem from './DishItem';
import { menuItems } from '@/data/menu';
import { formatCurrency } from '@/lib/i18n/formatters/number';

interface PrintItemProps {
  nr: string;
  marginBottom?: string;
  descStyle?: React.CSSProperties;
  overrideName?: string;
  overrideDesc?: string | React.ReactNode;
  overridePrice?: string;
}

export default function PrintItem({ nr, marginBottom, descStyle, overrideName, overrideDesc, overridePrice }: PrintItemProps) {
  const pathname = usePathname();
  const locale = pathname ? (pathname.split('/')[1] || 'de') : 'de';
  const item = menuItems.find(i => i.nr === nr);
  
  if (!item) {
    return (
      <DishItem 
        id={nr} 
        name={overrideName || `Item ${nr} NOT FOUND`} 
        price={overridePrice || "—"} 
        desc={overrideDesc || "Not in SSOT data"} 
        marginBottom={marginBottom} 
        descStyle={descStyle} 
      />
    );
  }

  const priceStr = overridePrice ? overridePrice : (item.price === null ? "Preis auf Anfrage" : formatCurrency(item.price, locale));

  return (
    <DishItem
      id={item.nr}
      name={overrideName || item.name}
      price={priceStr}
      desc={overrideDesc !== undefined ? overrideDesc : item.description}
      marginBottom={marginBottom}
      descStyle={descStyle}
      allergens={item.allergens}
    />
  );
}
