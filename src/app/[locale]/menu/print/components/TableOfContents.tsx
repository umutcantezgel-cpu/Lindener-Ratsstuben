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
            {/* Menu Items */}
            <li className="toc-item">
              <span className="toc-title">Aperitif &amp; Suppen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">III</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Vorspeisen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Salate</span>
              <span className="toc-dots"></span>
              <span className="toc-page">V</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pasta &amp; Überbackenes</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VI – VII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Schnitzel</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VIII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Fleisch &amp; Fisch</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IX – X</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pizza &amp; Familienpizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI – XII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Dessert &amp; Warme Getränke</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XIII</span>
            </li>

            <div style={{ height: '24px' }} /> {/* Spacing */}

            {/* Drinks */}
            <li className="toc-item">
              <span className="toc-title">Erfrischungsgetränke &amp; Säfte</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XIV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Biere &amp; Rotweine</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Weißweine, Spirituosen &amp; Liköre</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XVI</span>
            </li>
          </ul>
        </div>
      </div>
    </PrintPage>
  );
}
