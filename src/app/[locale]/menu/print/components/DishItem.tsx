import React from 'react';

import { AllergenIdentifier } from '@/data/allergens';

interface DishItemProps {
  id: string;
  name: string;
  price: string;
  desc: string | React.ReactNode;
  marginBottom?: string;
  descStyle?: React.CSSProperties;
  allergens?: AllergenIdentifier[];
}

export default function DishItem({ id, name, price, desc, marginBottom, descStyle, allergens }: DishItemProps) {
  const preventOrphans = (text: string | React.ReactNode) => {
    if (typeof text === 'string') {
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace !== -1) {
        return text.substring(0, lastSpace) + '\u00A0' + text.substring(lastSpace + 1);
      }
    }
    return text;
  };

  return (
    <div className="it" style={{ marginBottom }}>
      <div className="it-hdr">
        <span className="it-id">{id}</span>
        <span className="it-n">{name}</span>
        <span className="it-dots"></span>
        <span className="it-p">{price}</span>
      </div>
      <div className="it-d" style={descStyle}>
        {preventOrphans(desc)}
        {allergens && allergens.length > 0 && (
          <span className="it-alc"> ({allergens.join(', ')})</span>
        )}
      </div>
    </div>
  );
}
