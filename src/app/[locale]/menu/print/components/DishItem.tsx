import React from 'react';
import { AllergenIdentifier } from '@/data/allergens';
import { ZusatzstoffIdentifier } from '@/data/zusatzstoffe';

interface DishItemProps {
  id: string;
  name: string;
  price: string;
  desc: string | React.ReactNode;
  allergens?: AllergenIdentifier[];
  zusatzstoffe?: ZusatzstoffIdentifier[];
  marginBottom?: string;
  descStyle?: React.CSSProperties;
}

export default function DishItem({ id, name, price, desc, allergens, zusatzstoffe, marginBottom, descStyle }: DishItemProps) {
  const preventOrphans = (text: string | React.ReactNode) => {
    if (typeof text === 'string') {
      const lastSpace = text.lastIndexOf(' ');
      if (lastSpace !== -1) {
        return text.substring(0, lastSpace) + '\u00A0' + text.substring(lastSpace + 1);
      }
    }
    return text;
  };

  // Build superscript string: zusatzstoffe numbers first, then allergen letters
  const superParts: string[] = [];
  if (zusatzstoffe && zusatzstoffe.length > 0) {
    superParts.push(...zusatzstoffe);
  }
  if (allergens && allergens.length > 0) {
    superParts.push(...allergens);
  }
  const superscriptText = superParts.length > 0 ? superParts.join(',') : null;

  return (
    <div className="it" style={{ marginBottom }}>
      <div className="it-hdr">
        <span className="it-id">{id}</span>
        <span className="it-n">
          {name}
          {superscriptText && (
            <sup style={{
              fontSize: '0.55em',
              color: 'var(--brand-red, #d32f2f)',
              fontWeight: 600,
              marginLeft: '2px',
              letterSpacing: '0.5px',
            }}>{superscriptText}</sup>
          )}
        </span>
        <span className="it-dots"></span>
        <span className="it-p">{price}</span>
      </div>
      <div className="it-d" style={descStyle}>
        {typeof desc === 'string' && desc.includes('Wahlweise') ? (
          <>
            {preventOrphans(desc.substring(0, desc.indexOf('Wahlweise')))}
            <span style={{ display: 'block', marginTop: '2px', fontSize: '1.05em', fontWeight: 600, fontStyle: 'italic' }}>
              {desc.substring(desc.indexOf('Wahlweise'))}
            </span>
          </>
        ) : (
          preventOrphans(desc)
        )}
      </div>
    </div>
  );
}
