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
        {items.map((item, idx) => (
          <div key={idx} className="dish-item">
            <div className="dish-nr">{item.nr ? `${item.nr}.` : ''}</div>
            <div className="dish-main">
              <div className="dish-name-row">
                <span className="dish-name">
                  {item.name}
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
        ))}
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
            <p style={{ marginTop: '1.5mm'}}>Di - Sa: 11:30 - 14:30 &amp; 17:30 - 22:00 Uhr</p>
            <p>So: 11:30 - 14:30 &amp; 17:30 - 21:00 Uhr</p>
            <p style={{ marginTop: '1.5mm', color: '#D4AF37' }}>Montag Ruhetag</p>
          </div>

          {/* Marketing Partner Logos */}
          <div style={{ marginTop: '3mm', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 0 50px 25px white',
              padding: '4mm 6mm',
              display: 'inline-block',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/marketing-logos.svg"
                alt="Marketing Partner Logos"
                style={{ width: '100%', maxWidth: '65mm', height: 'auto' }}
              />
            </div>
          </div>

          {/* Allergen-Hinweis (LMIV-Pflicht) */}
          <div className="legal-disclaimer">
            Alle Preise in Euro (€). Irrtümer, Preisänderungen<br/>
            und Druckfehler vorbehalten.
          </div>
        </div>

        {/* PANEL 2: PIZZA & FAMILIENPIZZA (22 Items) */}
        <div className="flyer-panel menu-column">
          <FlyerCategory id="pizza" shortTitle="Pizza · Steinofen · 28cm" />
          <FlyerCategory id="familienpizza" shortTitle="Familienpizza · 40×60cm" />
          
          <div className="flyer-category" style={{ marginTop: 'auto', marginBottom: '8mm', textAlign: 'center' }}>
            <h3 className="category-title" style={{ borderBottom: 'none', marginBottom: '1mm' }}>Event & Catering</h3>
            <p style={{ fontSize: '7.5pt', color: '#5B2126', fontStyle: 'italic', marginTop: '2mm', lineHeight: '1.3' }}>
              Feiern Sie bei uns! Ob Geburtstag, Firmenfeier oder Jubiläum – sprechen Sie uns an.
            </p>
          </div>
        </div>

        {/* PANEL 3: SUPPEN + ALLE PASTA GERICHTE (16 Items) */}
        <div className="flyer-panel menu-column">
          <FlyerCategory id="suppen" />
          <FlyerCategory id="pasta" />
          <FlyerCategory id="pasta-al-forno" shortTitle="Pasta al Forno" />
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
        
        {/* PANEL 5: VORSPEISEN + SALATE + DESSERT */}
        <div className="flyer-panel menu-column">
          <FlyerCategory id="vorspeisen" />
          <FlyerCategory id="salate" />
          <FlyerCategory id="dessert" />
        </div>

        {/* PANEL 6: SCHNITZEL + FLEISCH/FISCH + KINDERGERICHTE */}
        <div className="flyer-panel menu-column">
          <FlyerCategory id="schnitzel" shortTitle="Schnitzelvariation" />
          <FlyerCategory id="fleisch-fisch" shortTitle="Fleisch & Fisch" />
          <FlyerCategory id="kindergerichte" />
        </div>



      </div>

    </div>
  );
}
