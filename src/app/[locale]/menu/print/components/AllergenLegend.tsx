import React from 'react';
import { LMIV_ALLERGENS, AllergenIdentifier, AllergenBase, NUSS_SUBKLASSEN, GETREIDE_SUBKLASSEN, NussSubklasse, GetreideSubklasse } from '@/data/allergens';
import { ZUSATZSTOFFE, ZusatzstoffIdentifier } from '@/data/zusatzstoffe';
import { legal_disclaimers } from '@/data/menu';

/** Resolve any AllergenIdentifier to its base code + optional subclass label */
function resolveAllergen(id: AllergenIdentifier): { base: AllergenBase; label: string } | null {
  // Direct base match
  if (id in LMIV_ALLERGENS) {
    const base = id as AllergenBase;
    return { base, label: `${id} ${LMIV_ALLERGENS[base].name}` };
  }
  // Nuss subclass C1–C4
  if (id in NUSS_SUBKLASSEN) {
    return { base: 'C', label: `${id} ${LMIV_ALLERGENS['C'].name} (${NUSS_SUBKLASSEN[id as NussSubklasse]})` };
  }
  // Getreide subclass E1–E5
  if (id in GETREIDE_SUBKLASSEN) {
    return { base: 'E', label: `${id} ${LMIV_ALLERGENS['E'].name} (${GETREIDE_SUBKLASSEN[id as GetreideSubklasse]})` };
  }
  return null;
}

interface AllergenLegendProps {
  usedAllergens?: AllergenIdentifier[];
  usedZusatzstoffe?: ZusatzstoffIdentifier[];
  className?: string;
  style?: React.CSSProperties;
}

export default function AllergenLegend({ usedAllergens, usedZusatzstoffe, className = '', style }: AllergenLegendProps) {
  // If usedAllergens is passed, only show those. Otherwise show all base codes.
  const identifiersToShow: AllergenIdentifier[] = usedAllergens 
    ? [...new Set(usedAllergens)].sort() 
    : (Object.keys(LMIV_ALLERGENS) as AllergenIdentifier[]);

  const zusatzstoffeToShow: ZusatzstoffIdentifier[] = usedZusatzstoffe
    ? [...new Set(usedZusatzstoffe)].sort()
    : (Object.keys(ZUSATZSTOFFE) as ZusatzstoffIdentifier[]);

  return (
    <div className={`allergen-legend box ${className}`} style={{ padding: '24px', ...style }}>
      {/* ── Zusatzstoffe ── */}
      <h4 className="box-t" style={{ fontSize: '14px', marginBottom: '10px' }}>Zusatzstoffe</h4>
      <div className="box-c" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '6px',
        marginBottom: '16px'
      }}>
        {zusatzstoffeToShow.map(id => {
          const z = ZUSATZSTOFFE[id];
          if (!z) return null;
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px',
                backgroundColor: 'var(--brand-red, #d32f2f)', color: '#fff',
                fontFamily: 'var(--font-cinzel)', fontSize: '10px', fontWeight: 'bold',
                borderRadius: '4px', padding: '0 4px'
              }}>{id}</span>
              <span style={{ fontSize: '10px', color: 'var(--ink, #333)', lineHeight: '1.2' }}>{z.name}</span>
            </div>
          );
        })}
      </div>

      {/* ── Allergene ── */}
      <h4 className="box-t" style={{ fontSize: '14px', marginBottom: '10px' }}>Liste der Allergene</h4>
      <div className="box-c" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '6px',
        marginBottom: '16px'
      }}>
        {identifiersToShow.map(id => {
          const resolved = resolveAllergen(id);
          if (!resolved) return null;
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px',
                backgroundColor: 'var(--brand-red, #d32f2f)', color: '#fff',
                fontFamily: 'var(--font-cinzel)', fontSize: '10px', fontWeight: 'bold',
                borderRadius: '4px', padding: '0 4px'
              }}>{id}</span>
              <span style={{ fontSize: '10px', color: 'var(--ink, #333)', lineHeight: '1.2' }}>{resolved.label.replace(`${id} `, '')}</span>
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
