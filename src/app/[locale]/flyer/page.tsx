'use client';

import React from 'react';
import './flyer.css';
import QRCode from 'react-qr-code';
import { MapPin, Phone, Globe, Clock } from 'lucide-react';
import FlyerLayoutClient from './FlyerLayoutClient';
import { foodItems } from '@/data/menu-ssot-food';
import { drinkItems } from '@/data/menu-ssot-drinks';
import { strictCategories } from '@/data/menu';

// Helper component to render a dense category for the flyer
function FlyerCategory({ id, isDrink = false, shortTitle }: { id: string, isDrink?: boolean, shortTitle?: string }) {
  const categoryDef = strictCategories.find(c => c.id === id);
  if (!categoryDef) return null;

  const items = isDrink 
    ? drinkItems.filter(i => i.category === id)
    : foodItems.filter(i => i.category === id);

  if (items.length === 0) return null;

  // Verwende kurzen Titel wenn angegeben, sonst label, sonst name
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
                  {superText && <sup style={{ fontSize: '0.6em', color: '#d32f2f', fontWeight: 600, marginLeft: '1px' }}>{superText}</sup>}
                  <span className="dish-badges">
                    {isVegetarian(item.name) && <span className="badge-veg">🌱</span>}
                    {isSpicy(item.name) && <span className="badge-spicy">🌶️</span>}
                  </span>
                </span>
                <span className="dot-leader"></span>
                <span className="dish-price">
                  {item.price != null ? `€${item.price.toFixed(2).replace('.', ',')}` : 'A.A.'}
                </span>
              </div>
              {item.description && <div className="dish-desc">{item.description}</div>}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Flyer8Page() {
  return (
    <div className="flyer-root">
      <FlyerLayoutClient />
      
      {/* =========================================
          SHEET 1: AUSSENSEITE (Außen, wenn gefaltet)
          Panels: 1 (Rückseite), 2 (Innen links), 3 (Innen mitte), 4 (Titelseite)
          ========================================= */}
      <div className="flyer-sheet">
        
        {/* PANEL 1: BACK COVER (Ganz links auf dem Bogen) */}
        <div className="flyer-panel panel-backcover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="Logo" className="backcover-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <h2 className="backcover-title">Wir freuen uns auf Sie!</h2>
          
          <div className="qr-box">
            <QRCode value="https://lindener-ratsstuben.de/de/menu" size={45} level="M" />
            <span>Gesamte Speisekarte</span>
          </div>

          <div className="contact-info">
            <p><MapPin /> Konrad-Adenauer-Str. 26, 35440 Linden</p>
            <p><Phone /> 06403 / 64 55 6</p>
            <p><Globe /> lindener-ratsstuben.de</p>
            <br/>
            <p><Clock /> <b>Öffnungszeiten:</b></p>
            <p style={{ marginTop: '1.5mm'}}>Di - Sa: 12:00 - 14:30 &amp; 17:30 - 22:30 Uhr</p>
            <p>So: 12:00 - 14:30 &amp; 17:30 - 21:00 Uhr</p>
            <p style={{ marginTop: '1.5mm', color: '#D4AF37' }}>Montag Ruhetag</p>
          </div>

          {/* Allergen-Hinweis (LMIV-Pflicht) */}
          <div className="legal-disclaimer" style={{ fontSize: '5pt', lineHeight: '1.2', textAlign: 'left', padding: '0 4mm', marginTop: 'auto', marginBottom: '2mm', color: '#555' }}>
            <div style={{ display: 'flex', gap: '2mm', marginBottom: '1.5mm' }}>
              <div style={{ flex: 1 }}>
                <strong>Zusatzstoffe:</strong> 1 mit Farbstoff, 2 mit Konservierungsstoffe, 3 mit Nitropökelsalz, 4 mit Antioxidationsmittel, 5 mit Geschmacksverstärker, 6 geschwefelt, 7 geschwärzt, 8 mit Phosphat, 9 mit Milcheiweiß, 10 koffeinhaltig, 11 mit Süßungsmittel
              </div>
              <div style={{ flex: 1 }}>
                <strong>Allergene:</strong> A Schwefeldioxid und Sulfite, B Milch/Laktose, C Nüsse (1 Mandel, 2 Erdnuss, 3 Walnuss, 4 Haselnuss), D Sesam, E glutenhaltiges Getreide (1 Weizen, 2 Hafer, 3 Roggen, 4 Gerste, 5 Dinkel), F Sellerie, G Senf, H Krebstiere, I Eier, K Fische, M Weichtiere, O Lupinen, P Sojabohnen
              </div>
            </div>
            <div style={{ textAlign: 'center', fontSize: '5.5pt', fontStyle: 'italic' }}>
              Aufgrund der Küchenabläufe kann der 100%ige Ausschluss bestimmter Allergene nicht gewährleistet werden.<br/>
              Alle Preise in (€) Euro. Irrtümer, Preisänderungen und Druckfehler vorbehalten.
            </div>
          </div>
        </div>

        {/* PANEL 2: PIZZA & FAMILIENPIZZA (22 Items) */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '3mm' }}>
          <FlyerCategory id="pizza" shortTitle="Pizza · Steinofen · 28cm" />
          <FlyerCategory id="familienpizza" shortTitle="Familienpizza · 40×60cm" />
        </div>

        {/* PANEL 3: SUPPEN + ALLE PASTA GERICHTE (16 Items) */}
        <div className="flyer-panel menu-column">
          <FlyerCategory id="suppen" />
          <FlyerCategory id="pasta" />
          <FlyerCategory id="pasta-al-forno" shortTitle="Aus dem Ofen - Überbackenes" />
          <FlyerCategory id="hausgemachte-pasta" shortTitle="Hausgemachte Pasta" />
        </div>

        {/* PANEL 4: FRONT COVER (Ganz rechts auf dem Bogen) */}
        <div className="flyer-panel panel-cover">
          <div className="cover-content">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="Lindener Ratsstuben" className="cover-logo" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              <h1 className="cover-tagline" style={{ marginBottom: '1.5mm', fontSize: '20px' }}>Restaurant &<br/>Kegelzentrum</h1>
              <p className="cover-sub" style={{ fontSize: '9px', fontStyle: 'italic', marginBottom: '2.5mm', letterSpacing: '1px' }}>Klassische deutsch-italienische Küche</p>
              <p className="cover-sub">Täglich frisch in Linden</p>
            </div>
            <div style={{ marginBottom: '10mm' }}>
              <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Alle Speisen auch zum Mitnehmen</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', margin: '2mm 0 0 0', fontSize: '18px' }}>06403 / 64 55 6</h2>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================
          SHEET 2: INNENSEITE (Innen, wenn komplett aufgeklappt)
          Panels: 5, 6, 7, 8
          ========================================= */}
      <div className="flyer-sheet">
        
        {/* PANEL 5: VORSPEISEN + SALATE */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '4mm' }}>
          <FlyerCategory id="vorspeisen" />
          <FlyerCategory id="salate" />
        </div>

        {/* PANEL 6: SCHNITZEL */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '4mm' }}>
          <FlyerCategory id="schnitzel" shortTitle="Schnitzelvariation" />
          
          <div style={{ marginTop: 'auto', marginBottom: '8mm', textAlign: 'center', padding: '0 4mm' }}>
            <h3 className="category-title" style={{ borderBottom: 'none', marginBottom: '1mm' }}>Empfehlung des Hauses</h3>
            <p style={{ fontSize: '7.5pt', color: '#5B2126', fontStyle: 'italic', marginTop: '2mm', lineHeight: '1.3' }}>
              Zu unseren Fleischgerichten servieren wir stets frisches Marktgemüse und feine Gourmet-Kartoffeln.
            </p>
          </div>
        </div>

        {/* PANEL 7: FLEISCH & FISCH */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '4mm' }}>
          <FlyerCategory id="fleisch-fisch" shortTitle="Fleisch & Fisch" />
        </div>

        {/* PANEL 8: KINDERGERICHTE + DESSERT */}
        <div className="flyer-panel menu-column" style={{ justifyContent: 'flex-start', gap: '4mm' }}>
          <FlyerCategory id="kindergerichte" />
          <FlyerCategory id="dessert" />
          
          <div style={{ marginTop: 'auto', marginBottom: '4mm', textAlign: 'center', padding: '0 4mm' }}>
            <h3 className="category-title" style={{ borderBottom: 'none', marginBottom: '1mm', fontSize: '11px', letterSpacing: '0.5px' }}>EVENT- UND CATERINGSERVICE</h3>
            <p style={{ fontSize: '7pt', color: '#5B2126', fontStyle: 'italic', marginTop: '1mm', lineHeight: '1.2' }}>
              Gerne können Sie unsere Räumlichkeiten oder Terrasse für Ihre Kommunion, Hochzeit, Geburtstag oder Firmenjubiläum buchen.<br/>
              Sprechen Sie uns an.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3mm', padding: '0 2mm' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}>140</div>
                <div style={{ fontSize: '6pt', textTransform: 'uppercase', marginTop: '-1px' }}>Sitzplätze</div>
                <div style={{ fontSize: '7pt', fontWeight: 'bold' }}>Terrasse</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}>70</div>
                <div style={{ fontSize: '6pt', textTransform: 'uppercase', marginTop: '-1px' }}>Sitzplätze</div>
                <div style={{ fontSize: '7pt', fontWeight: 'bold' }}>Gaststätte</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}>120</div>
                <div style={{ fontSize: '6pt', textTransform: 'uppercase', marginTop: '-1px' }}>Sitzplätze</div>
                <div style={{ fontSize: '7pt', fontWeight: 'bold' }}>Saal</div>
              </div>
            </div>

            <div style={{ marginTop: '4mm', fontSize: '6.5pt', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2mm' }}>
              Neuigkeiten von den Lindener Ratsstuben unter:<br/>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', marginTop: '1mm', fontWeight: 'bold' }}>
                <span style={{ backgroundColor: '#1877F2', color: 'white', padding: '0 3px', borderRadius: '2px', fontSize: '7pt' }}>f</span> 
                www.facebook.com/Lindenerratstube
              </span>
            </div>
          </div>
        </div>



      </div>

    </div>
  );
}
