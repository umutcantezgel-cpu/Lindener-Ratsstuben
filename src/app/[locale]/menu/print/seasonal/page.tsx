import { Metadata } from 'next';
import React from 'react';
import './seasonal-print.css';
import SeasonalPrintClient from './SeasonalPrintClient';
import { PrintPageA5 } from '../components/PrintPageA5';
import { CategoryMapper } from '../components/CategoryMapper';

export const metadata: Metadata = {
  title: 'Saisonkarte – Hausgemachte Burger & Limonaden | Lindener Ratsstuben',
  description: 'Saisonale Burger- & Limonaden-Karte der Lindener Ratsstuben. Saftig. Frisch. Genussvoll.',
  robots: {
    index: false,
    follow: false,
  },
};

/* ── Ornate Divider SVG ── */
function OrnateDivider() {
  return (
    <div className="seasonal-divider">
      <span>◆</span>
    </div>
  );
}

export default function SeasonalMenuPage() {
  return (
    <div className="seasonal-root">
      <SeasonalPrintClient />

      {/* ── LANDSCAPE PAGE: BURGERS & LIMONADEN ── */}
      <PrintPageA5>
        <div className="landscape-layout">
          {/* LEFT COLUMN: BURGERS */}
          <div className="landscape-column border-right">
            <div className="seasonal-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Lindener Ratsstuben"
                className="seasonal-logo"
              />
              <span className="seasonal-badge">◆ Saisonkarte ◆</span>
              <h1 className="seasonal-title">Hausgemachte Burger</h1>
              <p className="seasonal-subtitle">Saftig. Frisch. Genussvoll.</p>
            </div>

            <OrnateDivider />

            <p className="seasonal-intro">
              Unsere Burger werden mit 100&nbsp;% hochwertigem Rindfleisch, frischen Zutaten
              und unserer hausgemachten Sauce zubereitet – serviert mit knusprigen Pommes Frites.
            </p>

            <div className="seasonal-items-container">
              <CategoryMapper categoryId="saisonal-burger" />
            </div>

            <div className="seasonal-footer" style={{ marginTop: 'auto' }}>
              <div className="seasonal-closing">GUTEN APPETIT</div>
            </div>
          </div>

          {/* RIGHT COLUMN: LIMONADEN */}
          <div className="landscape-column">
            <div className="seasonal-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Lindener Ratsstuben"
                className="seasonal-logo"
              />
              <span className="seasonal-badge">◆ Erfrischung ◆</span>
              <h1 className="seasonal-title">Hausgemachte Limonaden</h1>
              <p className="seasonal-subtitle">Frisch. Fein. Erfrischend.</p>
            </div>

            <OrnateDivider />

            <p className="seasonal-intro">
              Genießen Sie unsere liebevoll zubereiteten Limonaden – aus besten Zutaten,
              mit ausgewogenen Aromen und perfekt abgestimmt für ein besonderes Geschmackserlebnis.
            </p>

            <div className="seasonal-items-container">
              <CategoryMapper categoryId="saisonal-limonaden" />
            </div>

            <div className="seasonal-footer" style={{ marginTop: 'auto' }}>
              <p className="seasonal-footnote" style={{ marginBottom: '1.5mm' }}>
                Alle Limonaden werden frisch zubereitet. Alle Preise in Euro (€). Irrtümer vorbehalten.
              </p>
              <p className="seasonal-footnote" style={{ fontSize: '5pt', lineHeight: '1.2', marginBottom: '1.5mm', textAlign: 'left' }}>
                <strong>Zusatzstoffe:</strong> 1 mit Farbstoff · <strong>Allergene:</strong> B Milch/Laktose, C Nüsse (1 Mandel), D Sesam, E glutenh. Getreide (1 Weizen), F Sellerie, G Senf, I Eier<br/>
                Aufgrund der Küchenabläufe kann der 100%ige Ausschluss bestimmter Allergene nicht gewährleistet werden.
              </p>
              <div className="seasonal-closing">ERFRISCHUNG PUR</div>
            </div>
          </div>
        </div>
      </PrintPageA5>
    </div>
  );
}
