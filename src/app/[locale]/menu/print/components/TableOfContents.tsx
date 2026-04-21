import React from 'react';
import PrintPage from './PrintPage';
import DishCategory from './DishCategory';

export default function TableOfContents() {
  return (
    <PrintPage pageNum="III">
      <div style={{ maxWidth: '85%', margin: '0 auto' }}>
        <DishCategory dropcap="I" title="Inhaltsverzeichnis" marginBottom="40px" />
        
        <div style={{ padding: '0 20px' }}>
          <ul className="toc-list" style={{ marginTop: '20px' }}>
            {/* Introductory Pages */}
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Willkommen – Ein Brief aus unserer Küche</span>
              <span className="toc-dots"></span>
              <span className="toc-page">I</span>
            </li>
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Unsere Philosophie</span>
              <span className="toc-dots"></span>
              <span className="toc-page">II</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Menu Items */}
            <li className="toc-item">
              <span className="toc-title">Suppen & Vorspeisen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Salate</span>
              <span className="toc-dots"></span>
              <span className="toc-page">V</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Traditionell</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Überbackenes & Hausgemacht</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Schnitzel</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VIII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Fleisch & Fisch</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IX</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">X</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Familienpizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Für Kinder & Desserts</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Editorial Features */}

          </ul>
        </div>
      </div>
    </PrintPage>
  );
}
