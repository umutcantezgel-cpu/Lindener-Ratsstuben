import React from 'react';
import PrintPage from './PrintPage';
import DishCategory from './DishCategory';

export default function TableOfContents() {
  return (
    <PrintPage pageNum="III">
      <div style={{ maxWidth: '85%', margin: '0 auto' }}>
        <DishCategory dropcap="I" title="Indice" subtitle="Inhaltsverzeichnis" marginBottom="40px" />
        
        <div style={{ padding: '0 20px' }}>
          <ul className="toc-list" style={{ marginTop: '20px' }}>
            {/* Introductory Pages */}
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Benvenuti – Ein Brief aus unserer Küche</span>
              <span className="toc-dots"></span>
              <span className="toc-page">I</span>
            </li>
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>La Filosofia – Unsere Philosophie</span>
              <span className="toc-dots"></span>
              <span className="toc-page">II</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Menu Items */}
            <li className="toc-item">
              <span className="toc-title">Aperitivi – Presto</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Zuppe & Antipasti – Suppen & Vorspeisen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Insalate – Salate</span>
              <span className="toc-dots"></span>
              <span className="toc-page">V</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pasta – Traditionell</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Al Forno & Fatto in Casa – Überbackenes & Hausgemacht</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Scaloppine & Burger</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VIII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Carne & Pesce – Fleisch & Fisch</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IX</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pizza – Forno a Legna</span>
              <span className="toc-dots"></span>
              <span className="toc-page">X</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Famiglia – Familienpizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Bambini & Dolci – Für Kinder & Desserts</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI</span>
            </li>
            
            <div style={{ height: '30px' }} /> {/* Spacing */}
            
            {/* Editorial Features */}
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Speciale – Burger Della Casa</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title" style={{ color: 'var(--gold-deep)' }}>Speciale – Limonate Della Casa</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XIII</span>
            </li>
          </ul>
        </div>
      </div>
    </PrintPage>
  );
}
