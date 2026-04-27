import React from 'react';
import lunchData from '@/data/lunchMenu.json';

function AllergenSup({ codes }: { codes?: string }) {
  if (!codes || codes.trim() === '') return null;
  return (
    <sup style={{
      fontSize: '0.55em',
      color: '#d32f2f',
      fontWeight: 600,
      marginLeft: '2px',
      letterSpacing: '0.5px',
    }}>{codes}</sup>
  );
}

export default function LunchMenu() {
  return (
    <div className="page-cover lunch-menu-page">
      <div className="cv-bg1"></div>
      <div className="cv-bg2"></div>
      <div className="cv-bg3"></div>

      <div className="lunch-content">
        <div className="lunch-header">
          <div className="lunch-restaurant-name">{lunchData.restaurantName}</div>
          <div className="lunch-restaurant-sub">{lunchData.restaurantSub}</div>
        </div>

        <div className="lunch-title-block">
          <div className="lunch-gang-label">{lunchData.menuLabel}</div>
          <div className="lunch-date">{lunchData.dateRange}</div>
        </div>

        <div className="lunch-section">
          <h2 className="lunch-section-title">Vorspeisen</h2>
          <div className="lunch-vorspeise">
            {lunchData.vorspeise}
            <AllergenSup codes={[lunchData.vorspeiseZusatzstoffe, lunchData.vorspeiseAllergens].filter(Boolean).join(',')} />
          </div>
        </div>

        <div className="lunch-divider-ornate">✦</div>

        <div className="lunch-section">
          <h2 className="lunch-section-title">Hauptgerichte</h2>

          {lunchData.mainCourses.map((item, index) => {
            const superParts = [item.zusatzstoffe, item.allergens].filter(Boolean).join(',');
            return (
            <React.Fragment key={item.id}>
              <div className="lunch-item">
                <div className="lunch-item-header">
                  <span className="lunch-item-nr">{item.id})</span>
                  <span className="lunch-item-price">{item.price}</span>
                </div>
                {item.isHtml ? (
                  <div className="lunch-item-desc">
                    <span dangerouslySetInnerHTML={{ __html: item.description }} />
                    <AllergenSup codes={superParts} />
                  </div>
                ) : (
                  <div className="lunch-item-desc">
                    {item.description}
                    <AllergenSup codes={superParts} />
                  </div>
                )}
              </div>
              {index < lunchData.mainCourses.length - 1 && (
                <div className="lunch-item-sep">✻ ✻ ✻</div>
              )}
            </React.Fragment>
            );
          })}
        </div>

        <div className="lunch-footer-note">
          {lunchData.footerNote}
        </div>
        {lunchData.allergenDisclaimer && (
          <div style={{ fontSize: '7pt', fontStyle: 'italic', textAlign: 'center', marginTop: '4px', color: '#666', lineHeight: 1.2 }}>
            {lunchData.allergenDisclaimer}
          </div>
        )}
      </div>
    </div>
  );
}
