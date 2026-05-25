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
              <span className="toc-title">Suppen &amp; Vorspeisen</span>
              <span className="toc-dots"></span>
              <span className="toc-page">III</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Salate</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IV</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pasta &amp; Überbackenes</span>
              <span className="toc-dots"></span>
              <span className="toc-page">V – VI</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Schnitzel</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Fleisch &amp; Fisch</span>
              <span className="toc-dots"></span>
              <span className="toc-page">VIII</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Pizza &amp; Familienpizza</span>
              <span className="toc-dots"></span>
              <span className="toc-page">IX – X</span>
            </li>
            <li className="toc-item">
              <span className="toc-title">Kindergerichte &amp; Dessert</span>
              <span className="toc-dots"></span>
              <span className="toc-page">XI</span>
            </li>
          </ul>
        </div>
      </div>
    </PrintPage>
  );
}
