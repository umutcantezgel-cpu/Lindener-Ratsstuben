import React from 'react';
import { LMIV_ALLERGENS, AllergenIdentifier } from '@/data/allergens';
import { legal_disclaimers } from '@/data/menu';

interface AllergenLegendProps {
  usedAllergens?: AllergenIdentifier[]; // If not provided, shows all
  className?: string;
  style?: React.CSSProperties;
}

export default function AllergenLegend({ usedAllergens, className = '', style }: AllergenLegendProps) {
  // If usedAllergens is passed, only show those. Otherwise show all.
  const identifiersToShow: AllergenIdentifier[] = usedAllergens 
    ? [...new Set(usedAllergens)].sort() 
    : (Object.keys(LMIV_ALLERGENS) as AllergenIdentifier[]);

  return (
    <div className={`allergen-legend box ${className}`} style={style}>
      <h4 className="box-t">Allergene & Zusatzstoffe</h4>
      <div className="box-c" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px' }}>
        {identifiersToShow.map(id => {
          const allergen = LMIV_ALLERGENS[id];
          if (!allergen) return null;
          return (
            <span key={id} style={{ whiteSpace: 'nowrap' }}>
              <strong style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--brand-red)' }}>{id}</strong>
              <span style={{ margin: '0 4px', color: 'var(--ink)' }}>—</span>
              <span>{allergen.name}</span>
            </span>
          );
        })}
      </div>
      <p className="fn" style={{ marginTop: '10px', fontSize: '9px' }}>
        {legal_disclaimers.allergens}
      </p>
      <p className="fn" style={{ marginTop: '4px', fontSize: '9px' }}>
        {legal_disclaimers.cross_contamination}
      </p>
    </div>
  );
}
