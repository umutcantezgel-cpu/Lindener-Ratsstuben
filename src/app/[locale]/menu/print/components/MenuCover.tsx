import React from 'react';

const CornerOrnament = ({ className }: { className: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cv-corner ${className}`}>
    <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
    <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
    <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold-faint)" />
    <circle cx="15" cy="15" r="2" fill="var(--gold)" />
    <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
  </svg>
);

const OrnateDivider = () => (
  <svg width="120" height="15" viewBox="0 0 120 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="cv-divider">
    <path d="M0,7.5 L40,7.5" stroke="var(--gold)" strokeWidth="1" />
    <path d="M80,7.5 L120,7.5" stroke="var(--gold)" strokeWidth="1" />
    <rect x="45" y="5" width="5" height="5" transform="rotate(45 47.5 7.5)" fill="var(--gold)" />
    <rect x="55" y="3" width="9" height="9" transform="rotate(45 59.5 7.5)" fill="var(--gold-deep)" />
    <rect x="70" y="5" width="5" height="5" transform="rotate(45 72.5 7.5)" fill="var(--gold)" />
  </svg>
);

export default function MenuCover() {
  return (
    <div className="page-cover">
      <div className="cv-bg1"></div>
      <div className="cv-bg2"></div>
      <div className="cv-bg3"></div>
      <CornerOrnament className="cv-tl" />
      <CornerOrnament className="cv-tr" />
      <CornerOrnament className="cv-bl" />
      <CornerOrnament className="cv-br" />
      
      <div className="cv-content">
        <div className="cv-tag"><span>◆</span>RESTAURANTE PIZZERIA<span>◆</span></div>
        <div className="cv-trad">— Internationelle Küche —</div>
        <h1 className="cv-title">LINDENER<span style={{ display: 'inline-block', width: '0.6em' }}></span>RATSSTUBEN</h1>
        <OrnateDivider />
        <div className="cv-sub">Kulinarische Meisterwerke<br/>mit Leidenschaft kreiert</div>
      </div>
      
      <div className="cv-est">
        Konrad-Adenauer-Straße 26, 35440 Linden<br />
        06403 - 64556<br />
        www.lindener-ratsstuben.de
      </div>
    </div>
  );
}
