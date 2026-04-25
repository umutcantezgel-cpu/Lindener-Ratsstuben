import { Metadata } from 'next';
import React from 'react';
import './seasonal-print.css';
import SeasonalPrintClient from './SeasonalPrintClient';

export const metadata: Metadata = {
  title: 'Saisonkarte – Hausgemachte Burger | Lindener Ratsstuben',
  description: 'Saisonale Burger-Karte der Lindener Ratsstuben. Saftig. Frisch. Genussvoll.',
  robots: {
    index: false,
    follow: false,
  },
};

/* ── Burger-Daten (saisonal, inline) ── */
const burgers = [
  {
    nr: 1,
    name: 'Classic Burger',
    description: 'Saftiges Rindfleisch mit knackigem Salat, eingelegten Gurken, frischen Tomatenscheiben und roten Zwiebeln, verfeinert mit unserer hauseigenen Sauce.',
  },
  {
    nr: 2,
    name: 'Cheeseburger',
    description: 'Saftiges Rindfleisch mit geschmolzenem Käse, knackigem Salat, eingelegten Gurken, Tomaten und roten Zwiebeln, abgerundet mit unserer hausgemachten Sauce.',
  },
  {
    nr: 3,
    name: 'Chili Cheeseburger',
    description: 'Kräftiges Rindfleisch mit geschmolzenem Mozzarella, pikanten Jalapeños, knackigem Salat, Gurken, Tomaten und roten Zwiebeln, verfeinert mit unserer würzigen Haussauce.',
  },
  {
    nr: 4,
    name: 'Deluxe Burger',
    description: 'Saftiges Rindfleisch mit luftgetrocknetem Schinken, frischem Salat, eingelegten Gurken, Tomaten und roten Zwiebeln, veredelt mit unserer exklusiven Haussauce.',
  },
];

/* ── Ornate Divider SVG ── */
function OrnateDivider() {
  return (
    <div className="seasonal-divider">
      <span>◆</span>
    </div>
  );
}

/* ── Corner Ornament SVG ── */
function CornerOrnament({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', width: '25mm', height: '25mm', opacity: 0.6 }}
      className={className}
    >
      <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
      <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
      <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold)" opacity="0.3" />
      <circle cx="15" cy="15" r="2" fill="var(--gold)" />
      <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
    </svg>
  );
}

export default function SeasonalMenuPage() {
  return (
    <div className="seasonal-root">
      <SeasonalPrintClient />

      <div className="seasonal-page">
        {/* Ornamental Frame */}
        <div className="seasonal-frame"></div>

        {/* Corner Ornaments */}
        <CornerOrnament className="corner-tl" />
        <CornerOrnament className="corner-tr" />
        <CornerOrnament className="corner-bl" />
        <CornerOrnament className="corner-br" />

        <div className="seasonal-content">
          {/* ── Header ── */}
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

          {/* ── Intro ── */}
          <p className="seasonal-intro">
            Unsere Burger werden mit 100&nbsp;% hochwertigem Rindfleisch, frischen Zutaten
            und unserer hausgemachten Sauce zubereitet – serviert mit knusprigen Pommes Frites.
          </p>

          {/* ── Burger Items ── */}
          <div className="burger-grid">
            {burgers.map((burger) => (
              <div key={burger.nr} className="burger-item">
                <div className="burger-nr">{burger.nr}</div>
                <div className="burger-details">
                  <div className="burger-name-row">
                    <span className="burger-name">{burger.name}</span>
                    <span className="burger-dot-leader"></span>
                    {/* Preis-Slot – wird vom Kunden nachgeliefert */}
                  </div>
                  <p className="burger-desc">{burger.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer ── */}
          <div className="seasonal-footer">
            <p className="seasonal-footnote">
              Alle Burger werden frisch zubereitet und mit knusprigen Pommes Frites serviert.
            </p>

            <div className="seasonal-closing">GUTEN APPETIT</div>

            {/* Marketing Partner Logos */}
            <div className="seasonal-logos-wrapper">
              <div className="seasonal-logos-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/marketing-logos.svg"
                  alt="Marketing Partner Logos"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
