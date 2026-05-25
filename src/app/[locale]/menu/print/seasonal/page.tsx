import { Metadata } from 'next';
import React from 'react';
import PrintLayoutClient from '../PrintLayoutClient';
import '../print.css';
import { PrintPageA5 } from '../components/PrintPageA5';
import { sanityFetch } from '@/lib/sanity/client';
import { groq } from 'next-sanity';

export const metadata: Metadata = {
  title: 'Saisonkarte Druckversion | Lindener Ratsstuben',
  description: 'Druckbare Saisonkarte der Lindener Ratsstuben.',
  robots: { index: false, follow: false },
};

const seasonalMenuQuery = groq`
  *[_type == "seasonalMenu"][0]{
    isActive,
    title_de,
    description_de,
    categories[]{
      categoryTitle_de,
      items[]{
        name_de,
        description_de,
        price,
        allergens[]->{
          code
        },
        additives
      }
    }
  }
`;

export default async function PrintSeasonalMenuPage() {
  let seasonalMenu = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    seasonalMenu = await sanityFetch<any>({ query: seasonalMenuQuery, tags: ['content'] });
  } catch (error) {
    console.error("[Sanity] Seasonal Menu fetch failed.", error);
  }

  return (
    <div className="print-root">
      <PrintLayoutClient />
      
      <style dangerouslySetInnerHTML={{__html: `
        .seasonal-page {
          width: 148mm;
          height: 210mm;
          background-color: var(--paper);
          margin: 0 auto 3rem auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
          padding: 10mm;
        }
        .seasonal-frame {
          position: absolute;
          top: 8mm; left: 8mm; right: 8mm; bottom: 8mm;
          border: 1px solid var(--border);
          z-index: 1;
        }
        .seasonal-corner {
          position: absolute;
          width: 25mm;
          height: 25mm;
          z-index: 2;
        }
        .corner-tl { top: 6mm; left: 6mm; }
        .corner-tr { top: 6mm; right: 6mm; transform: scaleX(-1); }
        .corner-bl { bottom: 6mm; left: 6mm; transform: scaleY(-1); }
        .corner-br { bottom: 6mm; right: 6mm; transform: scale(-1, -1); }
        
        .seasonal-content {
          position: relative;
          z-index: 10;
          height: 100%;
          padding: 6mm;
        }
        @media print {
          .print-action-bar { display: none !important; }
          .seasonal-page {
            box-shadow: none !important;
            margin: 0 auto !important;
            page-break-after: always;
          }
        }
      `}} />

      <PrintPageA5>
        {!seasonalMenu || !seasonalMenu.isActive ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <h1 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--brand-red)' }}>Aktuell keine Saisonkarte</h1>
          </div>
        ) : (
          <>
            <div className="welcome-block" style={{ margin: '0 auto 15px', padding: '15px', maxWidth: '90%' }}>
              <div className="welcome-ornament">✦ ✦ ✦</div>
              <h1 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--brand-red)', textAlign: 'center', fontSize: '20px', margin: '5px 0' }}>
                {seasonalMenu.title_de}
              </h1>
              {seasonalMenu.description_de && (
                <p className="welcome-text" style={{ fontStyle: 'italic', textAlign: 'center', fontSize: '13px' }}>
                  {seasonalMenu.description_de}
                </p>
              )}
              <div className="welcome-ornament">✦ ✦ ✦</div>
            </div>

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {seasonalMenu.categories?.map((cat: any, i: number) => (
              <div key={i} style={{ marginBottom: '15px' }}>
                <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '16px', borderBottom: '1px solid var(--gold)', paddingBottom: '2px', margin: '0 0 8px 0', color: 'var(--gold-deep)', textAlign: 'center' }}>
                  {cat.categoryTitle_de}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {cat.items?.map((item: any, j: number) => (
                    <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, paddingRight: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                          <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-montserrat)', fontSize: '12px', color: '#111' }}>{item.name_de}</span>
                          {item.allergens?.length > 0 && (
                            <sup style={{ marginLeft: '4px', fontSize: '8px', color: 'var(--gold-deep)' }}>
                              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                              {item.allergens.map((a:any) => a.code).join(', ')}
                            </sup>
                          )}
                        </div>
                        {item.description_de && (
                          <div style={{ fontSize: '10px', color: '#444', fontStyle: 'italic', marginTop: '1px', lineHeight: 1.3 }}>
                            {item.description_de}
                          </div>
                        )}
                      </div>
                      <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontFamily: 'var(--font-cormorant)', fontSize: '14px', color: '#111' }}>
                        {item.price?.toFixed(2).replace('.', ',')} €
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </PrintPageA5>
    </div>
  );
}
