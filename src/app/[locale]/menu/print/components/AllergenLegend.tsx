import React from 'react';
import { legal_disclaimers } from '@/data/menu';

/**
 * AllergenLegend — Full-page print legend (Page XII)
 * Fills the entire DIN A4 page with well-readable Zusatzstoffe + Allergene.
 * Text content matches the restaurant's official declaration verbatim.
 */
export default function AllergenLegend() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      padding: '0',
      fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
      color: '#2a1a0e',
    }}>

      {/* ═══════ ZUSATZSTOFFE ═══════ */}
      <div>
        <h2 style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '5px',
          fontSize: '18pt',
          fontWeight: 700,
          marginBottom: '14px',
          marginTop: '0',
          borderBottom: '2.5px solid #D4AF37',
          paddingBottom: '8px',
          color: '#5B2126',
        }}>Zusatzstoffe</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px 28px',
          marginBottom: '28px',
          fontSize: '12.5pt',
          lineHeight: '1.5',
          padding: '0 6px',
        }}>
          <ZusatzstoffRow code="1" label="mit Farbstoff" />
          <ZusatzstoffRow code="2" label="mit Konservierungsstoffe" />
          <ZusatzstoffRow code="3" label="mit Nitropökelsalz" />
          <ZusatzstoffRow code="4" label="mit Antioxidationsmittel" />
          <ZusatzstoffRow code="5" label="mit Geschmacksverstärker" />
          <ZusatzstoffRow code="6" label="geschwefelt" />
          <ZusatzstoffRow code="7" label="geschwärzt" />
          <ZusatzstoffRow code="8" label="mit Phosphat" />
          <ZusatzstoffRow code="9" label="mit Milcheiweiß" />
          <ZusatzstoffRow code="10" label="koffeinhaltig" />
          <ZusatzstoffRow code="11" label="mit Süßungsmittel" />
        </div>
      </div>

      {/* ═══════ ALLERGENE ═══════ */}
      <div>
        <h2 style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '5px',
          fontSize: '18pt',
          fontWeight: 700,
          marginBottom: '14px',
          marginTop: '0',
          borderBottom: '2.5px solid #D4AF37',
          paddingBottom: '8px',
          color: '#5B2126',
        }}>Liste der Allergene</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px 28px',
          marginBottom: '12px',
          fontSize: '12.5pt',
          lineHeight: '1.5',
          padding: '0 6px',
        }}>
          <AllergenRow code="A" label="Schwefeldioxid und Sulfite" />
          <AllergenRow code="B" label="Milch / Laktose" />
          <AllergenRow code="C" label="Nüsse" sub="1 Mandel · 2 Erdnuss · 3 Walnuss · 4 Haselnuss" />
          <AllergenRow code="D" label="Sesam" />
          <AllergenRow code="E" label="Glutenhaltiges Getreide" sub="1 Weizen · 2 Hafer · 3 Roggen · 4 Gerste · 5 Dinkel" />
          <AllergenRow code="F" label="Sellerie" />
          <AllergenRow code="G" label="Senf" />
          <AllergenRow code="H" label="Krebstiere" />
          <AllergenRow code="I" label="Eier" />
          <AllergenRow code="K" label="Fische" />
          <AllergenRow code="M" label="Weichtiere" />
          <AllergenRow code="O" label="Lupinen" />
          <AllergenRow code="P" label="Sojabohnen" />
        </div>
      </div>

      {/* ═══════ LEGAL DISCLAIMERS ═══════ */}
      <div style={{
        borderTop: '1.5px solid rgba(139,90,43,0.3)',
        paddingTop: '16px',
        marginTop: 'auto',
      }}>
        <p style={{
          textAlign: 'center',
          fontSize: '10.5pt',
          fontStyle: 'italic',
          color: '#5B2126',
          lineHeight: '1.65',
          margin: '0 0 14px 0',
          padding: '0 10px',
        }}>
          — {legal_disclaimers.allergens} —
        </p>
        <p style={{
          textAlign: 'center',
          fontSize: '10.5pt',
          fontStyle: 'italic',
          color: '#5B2126',
          lineHeight: '1.65',
          margin: '0 0 14px 0',
          padding: '0 10px',
        }}>
          — {legal_disclaimers.cross_contamination}
        </p>
        <p style={{
          textAlign: 'center',
          fontSize: '9pt',
          color: '#999',
          margin: '0',
          letterSpacing: '0.5px',
        }}>
          Alle Preise in (€) Euro. Irrtümer, Preisänderungen und Druckfehler vorbehalten.
        </p>
      </div>
    </div>
  );
}


/* ─── Helper Components ─── */

function ZusatzstoffRow({ code, label }: { code: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30px',
        height: '30px',
        backgroundColor: '#5B2126',
        color: '#fff',
        fontFamily: "'Cinzel', serif",
        fontSize: '11pt',
        fontWeight: 700,
        borderRadius: '5px',
        padding: '0 6px',
      }}>{code}</span>
      <span style={{ fontSize: '12.5pt' }}>{label}</span>
    </div>
  );
}

function AllergenRow({ code, label, sub }: { code: string; label: string; sub?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30px',
        height: '30px',
        backgroundColor: '#d32f2f',
        color: '#fff',
        fontFamily: "'Cinzel', serif",
        fontSize: '12pt',
        fontWeight: 700,
        borderRadius: '5px',
        padding: '0 6px',
        flexShrink: 0,
        marginTop: '1px',
      }}>{code}</span>
      <span>
        <span style={{ fontWeight: 700, fontSize: '12.5pt' }}>{label}</span>
        {sub && (
          <span style={{
            display: 'block',
            fontSize: '10pt',
            color: '#7a5c2e',
            fontStyle: 'italic',
            lineHeight: '1.35',
            marginTop: '2px',
          }}>({sub})</span>
        )}
      </span>
    </div>
  );
}
