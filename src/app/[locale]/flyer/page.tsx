'use client';

import React from 'react';
import './flyer.css';
import QRCode from 'react-qr-code';
import { MapPin, Phone, Globe, Clock } from 'lucide-react';
import FlyerLayoutClient from './FlyerLayoutClient';
import { foodItems } from '@/data/menu-ssot-food';
import { drinkItems } from '@/data/menu-ssot-drinks';
import { strictCategories } from '@/data/menu';

/* ═══════════════════════════════════════════════════════════════
   Ornamental SVG Components
   ═══════════════════════════════════════════════════════════════ */

const CornerOrnament = ({ className }: { className: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cover-corner ${className}`}>
    <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
    <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
    <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="rgba(212,175,55,0.3)" />
    <circle cx="15" cy="15" r="2" fill="var(--gold)" />
    <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
  </svg>
);

const GoldDivider = ({ width = '100%' }: { width?: string }) => (
  <div className="gold-rule" style={{ width }} />
);

/* ═══════════════════════════════════════════════════════════════
   FlyerCategory — Kompakte Kategorie-Darstellung
   ═══════════════════════════════════════════════════════════════ */

function FlyerCategory({ id, isDrink = false, shortTitle, excludeIds = [], itemIds }: { id: string, isDrink?: boolean, shortTitle?: string, excludeIds?: string[], itemIds?: string[] }) {
  const categoryDef = strictCategories.find(c => c.id === id);
  if (!categoryDef) return null;

  let items = isDrink 
    ? drinkItems.filter(i => i.category === id && !excludeIds.includes(i.nr))
    : foodItems.filter(i => i.category === id && !excludeIds.includes(i.nr));

  if (itemIds && itemIds.length > 0) {
    items = items.filter(i => itemIds.includes(i.nr));
  }

  if (items.length === 0) return null;

  const displayTitle = shortTitle || categoryDef.label || categoryDef.name;

  const isVegetarian = (name: string) => /vegetari|vegetale|margherita|pane|basilikum pesto|burrata|bruschetta/i.test(name);
  const isSpicy = (name: string) => /diavolo|pepe verde|scharf/i.test(name);

  return (
    <div className="flyer-category">
      <h3 className="category-title">{displayTitle}</h3>
      <div className="category-items">
        {items.map((item, idx) => {
          const superParts: string[] = [];
          if (item.zusatzstoffe && item.zusatzstoffe.length > 0) superParts.push(...item.zusatzstoffe);
          if (item.allergens && item.allergens.length > 0) superParts.push(...item.allergens);
          const superText = superParts.length > 0 ? superParts.join(',') : null;
          return (
          <div key={idx} className="dish-item">
            <div className="dish-nr">{item.nr ? `${item.nr}.` : ''}</div>
            <div className="dish-main">
              <div className="dish-name-row">
                <span className="dish-name">
                  {item.name}
                  {superText && <sup style={{ fontSize: '0.72em', color: '#d32f2f', fontWeight: 600, marginLeft: '1px' }}>{superText}</sup>}
                  <span className="dish-badges">
                    {isVegetarian(item.name) && <span className="badge-veg">🌱</span>}
                    {isSpicy(item.name) && <span className="badge-spicy">🌶️</span>}
                  </span>
                </span>
                <span className="dot-leader"></span>
                <span className="dish-price">
                  {item.price != null ? `${item.price.toFixed(2).replace('.', ',')} €` : 'A.A.'}
                </span>
              </div>
              {item.description && (
                <div 
                  className="dish-desc"
                  style={item.nr === '20' ? { WebkitLineClamp: 'unset' } : undefined}
                >
                  {item.description.split('\n').map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN FLYER LAYOUT
   ═══════════════════════════════════════════════════════════════ */

export default function Flyer8Page() {
  return (
    <div className="flyer-root">
      <FlyerLayoutClient />
      
      {/* =========================================
          SHEET 1: AUSSENSEITE (Wickelfalz)
          Grid: 94mm | 97mm | 100mm | 100mm
          Panels: S6 (Familie/Kinder/Dessert) | S7 (Event) | S8 (Back) | S1 (Front)
          ========================================= */}
      <div className="flyer-sheet">
        
        {/* ─── S6: FAMILIENPIZZA + KINDER + DESSERT (94mm, eingefaltet) ── */}
        <div className="flyer-panel panel-narrow menu-column" style={{ justifyContent: 'flex-start', gap: '1mm' }}>
          <FlyerCategory id="familienpizza" shortTitle="Familienpizza · 40×60cm" />
          <div style={{ fontSize: '5.5pt', lineHeight: 1.3, marginTop: '0.5mm', marginBottom: '1mm', whiteSpace: 'pre-wrap', textAlign: 'center' }}>
            Extrabeläge: <strong>Jeder Extrabelag – 4,00 €</strong> | <strong>Mozzarella – 12,00 €</strong> | <strong>Thunfisch – 12,00 €</strong><br/>
            <strong>Lachsfilet – 16,00 €</strong> | <strong>Garnelen – 16,00 €</strong> | <strong>Burrata – 16,00 €</strong>
          </div>

          <GoldDivider />
          <FlyerCategory id="kindergerichte" />
          
          <div style={{ marginTop: '1mm', marginBottom: '1mm' }}>
            <GoldDivider />
          </div>

          <FlyerCategory id="dessert" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/editorial/tiramisu.webp" 
            alt="Hausgemachtes Tiramisu" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              marginTop: 'auto', 
              marginBottom: '0', 
              borderRadius: '4px',
              border: '1.5px solid var(--gold)',
              boxShadow: 'var(--shadow-medium)',
              display: 'block'
            }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* ─── S7: EVENT & CATERING (97mm) ──────────────────────── */}
        <div className="flyer-panel panel-medium menu-column" style={{ justifyContent: 'center', gap: '2mm' }}>
          <div className="event-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="event-title" style={{ fontSize: '18pt', marginBottom: '4mm' }}>Event- &amp; Cateringservice</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/editorial/wein.webp" 
              alt="Feierlichkeiten" 
              className="panel-image-rect hero"
              style={{ maxHeight: '45mm', borderRadius: '4px', marginBottom: '4mm', width: '100%', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <p className="event-text" style={{ fontSize: '8.5pt', lineHeight: 1.5, marginBottom: '6mm' }}>
              Gerne können Sie unsere Räumlichkeiten oder unsere sonnige Terrasse für Ihre <strong>Kommunion, Hochzeit, Geburtstag, Trauerfeier</strong> oder Ihr <strong>Firmenjubiläum</strong> buchen. Sprechen Sie uns an und wir kreieren ein unvergessliches Menü für Sie.
            </p>
            <div className="event-stats" style={{ marginBottom: '8mm' }}>
              <div className="event-stat">
                <div className="event-stat-number">140</div>
                <div className="event-stat-label">Sitzplätze</div>
                <div className="event-stat-name">Terrasse</div>
              </div>
              <div className="event-stat">
                <div className="event-stat-number">70</div>
                <div className="event-stat-label">Sitzplätze</div>
                <div className="event-stat-name">Gaststätte</div>
              </div>
              <div className="event-stat">
                <div className="event-stat-number">120</div>
                <div className="event-stat-label">Sitzplätze</div>
                <div className="event-stat-name">Saal</div>
              </div>
            </div>

            <div className="event-social" style={{ marginTop: 'auto' }}>
              Folgen Sie uns auf Social Media:<br/>
              <span className="fb-badge" style={{ marginTop: '2mm', display: 'inline-flex', padding: '1mm 3mm', fontSize: '8pt' }}>
                <span className="fb-icon">f</span> 
                www.facebook.com/Lindenerratstube
              </span>
              <span className="fb-badge" style={{ marginTop: '2mm', display: 'inline-flex', padding: '1mm 3mm', fontSize: '8pt' }}>
                <span className="fb-icon" style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                  <svg viewBox="0 0 24 24" fill="white" width="10" height="10" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </span>
                &thinsp;@lindener.ratsstuben
              </span>
            </div>
          </div>
        </div>

        {/* ─── S8: BACK COVER (100mm) ───────────────────────── */}
        <div className="flyer-panel panel-backcover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="Logo" className="backcover-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <h2 className="backcover-title">Wir freuen uns auf Sie!</h2>
          <div className="backcover-divider" />
          
          <div className="qr-box">
            <QRCode value="https://lindener-ratsstuben.de/de/menu" size={50} level="M" />
            <span>Gesamte Speisekarte</span>
          </div>

          <div className="contact-info">
            <p><MapPin /> Konrad-Adenauer-Str. 26, 35440 Linden</p>
            <p><Phone /> 06403 / 64 55 6</p>
            <p><Globe /> lindener-ratsstuben.de</p>
            <br/>
            <p><Clock /> <b>Öffnungszeiten:</b></p>
            <p style={{ marginTop: '1.5mm'}}>Di - Sa: 12:00 - 14:30 &amp; 17:30 - 22:00 Uhr</p>
            <p>So: 12:00 - 14:30 &amp; 17:30 - 21:00 Uhr</p>
            <p style={{ marginTop: '1.5mm', color: 'var(--gold)' }}>Montag Ruhetag</p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/editorial/bruschetta.webp" 
            alt="Bruschetta" 
            className="panel-image-circle" 
            style={{ marginTop: '5mm', opacity: 0.9 }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          {/* Allergen-Hinweis (LMIV-Pflicht) */}
          <div className="legal-disclaimer" style={{ fontSize: '5.5pt', lineHeight: '1.25', textAlign: 'left', padding: '0 3mm', marginTop: '4mm', color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ display: 'flex', gap: '2mm', marginBottom: '1.5mm' }}>
              <div style={{ flex: 1 }}>
                <strong style={{ color: 'var(--gold)', fontSize: '5.5pt' }}>Zusatzstoffe:</strong> 1 mit Farbstoff, 2 mit Konservierungsstoffen, 3 mit Nitropökelsalz, 4 mit Antioxidationsmittel, 5 mit Geschmacksverstärker, 6 geschwefelt, 7 geschwärzt, 8 mit Phosphat, 9 mit Milcheiweiß, 10 koffeinhaltig, 11 mit Süßungsmittel
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ color: 'var(--gold)', fontSize: '5.5pt' }}>Allergene:</strong> A Schwefeldioxid und Sulfite, B Milch/Laktose, C Nüsse (1 Mandel, 2 Erdnuss, 3 Walnuss, 4 Haselnuss), D Sesam, E glutenhaltiges Getreide (1 Weizen, 2 Hafer, 3 Roggen, 4 Gerste, 5 Dinkel), F Sellerie, G Senf, H Krebstiere, I Eier, K Fische, M Weichtiere, O Lupinen, P Sojabohnen
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '5.5pt', fontStyle: 'italic' }}>
              Aufgrund der Küchenabläufe kann der 100%ige Ausschluss bestimmter Allergene nicht gewährleistet werden.<br/>
              Alle Preise in (€) Euro. Irrtümer, Preisänderungen und Druckfehler vorbehalten.
            </div>
          </div>
        </div>

        {/* ─── S1: FRONT COVER (100mm) ──────────────────────── */}
        <div className="flyer-panel panel-cover">
          <CornerOrnament className="tl" />
          <CornerOrnament className="tr" />
          <CornerOrnament className="bl" />
          <CornerOrnament className="br" />
          
          <div className="cover-content">
            {/* Top Branding Block */}
            <div style={{ textAlign: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="Lindener Ratsstuben" className="cover-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              
              {/* ◆ RISTORANTE PIZZERIA ◆ */}
              <div className="cover-badge-line">
                <span className="cover-diamond">◆</span>
                <span>RISTORANTE PIZZERIA</span>
                <span className="cover-diamond">◆</span>
              </div>

              {/* Kegelzentrum */}
              <div className="cover-badge-sub">Kegelzentrum</div>

              {/* — Internationale Küche — */}
              <div className="cover-cuisine-line">— Internationale Küche —</div>

              {/* LINDENER RATSSTUBEN */}
              <h2 className="cover-title-main">
                LINDENER<span style={{ display: 'inline-block', width: '0.4em' }}></span>RATSSTUBEN
              </h2>

              <div className="cover-divider" />

              {/* Kulinarische Meisterwerke */}
              <p className="cover-motto">
                Kulinarische Meisterwerke<br/>
                <span style={{ letterSpacing: '3px' }}>mit Leidenschaft kreiert</span>
              </p>

              {/* Daily Menu Highlight */}
              <div style={{
                marginTop: '4mm',
                padding: '2.5mm',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                background: 'transparent',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '6.5pt', color: 'var(--text-color)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5mm' }}>Dienstag - Freitag täglich wechselndes</p>
                <div style={{ fontSize: '11pt', fontWeight: 700, color: 'var(--gold-deep)', letterSpacing: '1.5px', fontFamily: 'var(--font-serif)' }}>2 GÄNGE MITTAGS MENÜ</div>
                <p style={{ fontSize: '5.5pt', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: '0.5mm' }}>- außer an Feiertagen -</p>
              </div>
            </div>

            {/* Stimmungsbild */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/editorial/antipasti.webp" 
              alt="Antipasti" 
              className="panel-image-circle large" 
              style={{ border: '2px solid rgba(212,175,55,0.6)', margin: '5mm auto' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            {/* Bottom Contact Block */}
            <div className="cover-contact-block">
              <div className="cover-takeaway" style={{ marginBottom: '2mm' }}>Alle Speisen auch zum Mitnehmen</div>
              
              <div className="cover-address-block">
                <p>Konrad-Adenauer-Straße 26, 35440 Linden</p>
                <h2 className="cover-phone">06403 - 64556</h2>
                <p>www.lindener-ratsstuben.de</p>
                <p className="cover-ig-line">
                  <span className="cover-ig-icon">
                    <svg viewBox="0 0 24 24" fill="white" width="9" height="9"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </span>
                  @lindener.ratsstuben
                </p>
                <p className="cover-ig-line">
                  <span className="cover-fb-icon">
                    <svg viewBox="0 0 24 24" fill="white" width="9" height="9"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </span>
                  Lindener Ratsstuben
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================
          SHEET 2: INNENSEITE (Wickelfalz)
          Grid: 100mm | 100mm | 97mm | 94mm
          Panels: S2 (Suppen) | S3 (Pasta) | S4 (Schnitzel/Fleisch/Fisch) | S5 (Pizza)
          ========================================= */}
      <div className="flyer-sheet sheet-inner">
        
        {/* ─── S2: SUPPEN + VORSPEISEN + SALATE (100mm) ──────── */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '1.5mm' }}>
          <FlyerCategory id="suppen" />
          <div style={{ fontSize: '5.5pt', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5mm', marginBottom: '1.5mm', color: 'var(--text-muted)' }}>
            Zu unseren Suppen &amp; Vorspeisen servieren wir kostenlos hausgemachtes Brot – auf Wunsch Pizzabrot mit Tomatensauce &amp; Knoblauch für 6,50 €.
          </div>
          <GoldDivider />
          <FlyerCategory id="vorspeisen" />
          <div style={{ marginTop: '1mm', marginBottom: '1mm' }}>
            <GoldDivider />
          </div>
          <FlyerCategory id="salate" />
          <div style={{ fontSize: '5.5pt', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5mm', marginBottom: '1mm', color: 'var(--text-muted)' }}>
            Zu unseren Salaten servieren wir kostenlos hausgemachtes Brot.
          </div>
          <div className="info-highlight-box" style={{ marginTop: 'auto', marginBottom: '2mm' }}>
            <p style={{ fontSize: '6.5pt', fontWeight: 500, textAlign: 'center' }}>
              🍽️ Alle unsere Gerichte werden täglich frisch mit erlesenen Zutaten zubereitet. Fragen Sie nach unseren saisonalen Empfehlungen!
            </p>
          </div>
        </div>

        {/* ─── S3: PASTA + OFEN + HAUSGEMACHTE (100mm) ────────── */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '1mm' }}>
          <FlyerCategory id="pasta" />
          <div style={{ fontSize: '5.5pt', fontStyle: 'italic', textAlign: 'center', marginTop: '1mm', marginBottom: '1.5mm', color: 'var(--text-muted)' }}>
            Vegane Pasta wird auf Anfrage ebenfalls angeboten – bitte wenden Sie sich an den Service.
          </div>
          <GoldDivider />
          <FlyerCategory id="pasta-al-forno" shortTitle="Aus dem Ofen" />
          <div style={{ marginTop: '1mm', marginBottom: '1mm' }}>
            <GoldDivider />
          </div>
          <FlyerCategory id="hausgemachte-pasta" shortTitle="Hausgemachte Pasta" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/editorial/pasta.webp" 
            alt="Frische Pasta" 
            className="panel-image-rect hero"
            style={{ maxHeight: '40mm', marginTop: 'auto', borderRadius: '4px', width: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <p className="image-caption">Frische Pasta – Fatto in Casa</p>
        </div>

        {/* ─── S4: SCHNITZEL + FLEISCH + FISCH (97mm) ────────── */}
        <div className="flyer-panel panel-medium menu-column" style={{ justifyContent: 'flex-start', gap: '1mm' }}>
          <FlyerCategory id="schnitzel" shortTitle="Schnitzelvariationen" />
          
          <div className="info-highlight-box" style={{ marginTop: '0.5mm' }}>
            <p style={{ fontSize: '6pt', fontWeight: 600 }}>
              ✨ Bei unseren Schnitzeln handelt es sich um frischen Schweinerücken. Alle Schnitzel werden frisch paniert und in feinstem Butterschmalz goldbraun ausgebacken.
            </p>
          </div>
          
          <div style={{ marginTop: '1mm', marginBottom: '1mm' }}>
            <GoldDivider />
          </div>
          
          <FlyerCategory id="fleisch-fisch" shortTitle="Fleischgerichte" itemIds={['70','71','72','73','74','75']} />
          
          <div style={{ marginTop: '1mm', marginBottom: '1mm' }}>
            <GoldDivider />
          </div>
          
          <FlyerCategory id="fleisch-fisch" shortTitle="Fischgerichte" itemIds={['80','81','82']} />
        </div>

        {/* ─── S5: PIZZA (94mm, eingefaltet) ──────────────────── */}
        <div className="flyer-panel panel-narrow menu-column" style={{ justifyContent: 'flex-start', gap: '0.5mm' }}>
          {/* Pizza-Info Box */}
          <div className="info-highlight-box" style={{ marginBottom: '1mm' }}>
            <p style={{ fontWeight: 600, fontSize: '7.5pt', textAlign: 'center', fontStyle: 'italic', color: 'var(--brand-red, #d32f2f)' }}>
              🍕 Alle Pizzen werden mit Tomatensoße, Special-Würzen &amp; Käse zubereitet.
            </p>
          </div>
          <FlyerCategory id="pizza" shortTitle="Pizza · Steinofen · 28cm" />
          <div style={{ fontSize: '5.5pt', lineHeight: 1.3, marginTop: '1mm', marginBottom: '2mm', whiteSpace: 'pre-wrap', textAlign: 'center' }}>
            Extrabeläge: <strong>Jeder Extrabelag – 1,00 €</strong> | <strong>Mozzarella – 4,00 €</strong> | <strong>Thunfisch – 4,00 €</strong><br/>
            <strong>Lachsfilet – 6,00 €</strong> | <strong>Garnelen – 6,00 €</strong> | <strong>Burrata – 6,00 €</strong>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/editorial/bruschetta.webp" 
            alt="Fleisch & Fisch" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              marginTop: 'auto', 
              marginBottom: '0', 
              borderRadius: '4px',
              border: '1.5px solid var(--gold)',
              boxShadow: 'var(--shadow-medium)',
              display: 'block'
            }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

      </div>

    </div>
  );
}

