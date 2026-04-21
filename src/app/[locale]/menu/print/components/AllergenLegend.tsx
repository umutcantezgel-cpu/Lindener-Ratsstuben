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
    <div className={`allergen-legend box ${className}`} style={{ padding: '24px', ...style }}>
      <h4 className="box-t" style={{ fontSize: '16px', marginBottom: '16px', textAlign: 'center' }}>Allergene & Zusatzstoffe</h4>
      
      <div className="box-c" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '12px',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '20px'
      }}>
        {identifiersToShow.map(id => {
          const allergen = LMIV_ALLERGENS[id];
          if (!allergen) return null;
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                backgroundColor: 'var(--brand-red, #d32f2f)',
                color: '#fff',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '11px',
                fontWeight: 'bold',
                borderRadius: '4px',
                flexShrink: 0
              }}>
                {id}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--ink, #333)', lineHeight: '1.2' }}>
                {allergen.name}
              </span>
            </div>
          );
        })}
      </div>
      
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '12px', textAlign: 'center' }}>
        <p className="fn" style={{ margin: '0 0 6px 0', fontSize: '9px', fontStyle: 'italic', color: 'var(--ink, #333)' }}>
          {legal_disclaimers.allergens}
        </p>
        <p className="fn" style={{ margin: '0', fontSize: '9px', fontStyle: 'italic', color: 'var(--ink, #333)' }}>
          {legal_disclaimers.cross_contamination}
        </p>
      </div>
    </div>
  );
}
