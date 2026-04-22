import React from 'react';
import PrintPage from './PrintPage';
import DishCategory from './DishCategory';

export default function TableOfContents() {
  return (
    <PrintPage pageNum="II">
      <div style={{ maxWidth: '85%', margin: '0 auto' }}>
        <DishCategory dropcap="I" title="Inhaltsverzeichnis" marginBottom="40px" />
        
        <div style={{ padding: '0 20px' }}>
          <ul className="toc-list" style={{ marginTop: '20px' }}>
            {/* Introductory Pages */}
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Unsere Philosophie</span>
              <span className="toc-dots"></span>
              <span className="toc-page">I</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Menu Items */}
            <li className="toc-item">
              <span className="toc-title">Suppen &amp; Vorspeisen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">III</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Salate &amp; Pasta</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Überbackenes, Hausgemachte Nudeln &amp; Schnitzel</span>
              <span className="toc-dots"></span>
              <span className="toc-page">V</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Fleisch &amp; Fisch</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Familienpizza, Kinder &amp; Desserts</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VIII</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Editorial Features */}

          </ul>
        </div>
      </div>
    </PrintPage>
  );
}
