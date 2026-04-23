import React from 'react';
import lunchData from '@/data/lunchMenu.json';

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
          <div className="lunch-vorspeise">{lunchData.vorspeise}</div>
        </div>

        <div className="lunch-divider-ornate">✦</div>

        <div className="lunch-section">
          <h2 className="lunch-section-title">Hauptgerichte</h2>

          {lunchData.mainCourses.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="lunch-item">
                <div className="lunch-item-header">
                  <span className="lunch-item-nr">{item.id})</span>
                  <span className="lunch-item-price">{item.price}</span>
                </div>
                {item.isHtml ? (
                  <div className="lunch-item-desc" dangerouslySetInnerHTML={{ __html: item.description }} />
                ) : (
                  <div className="lunch-item-desc">{item.description}</div>
                )}
              </div>
              {index < lunchData.mainCourses.length - 1 && (
                <div className="lunch-item-sep">✻ ✻ ✻</div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="lunch-footer-note">
          {lunchData.footerNote}
        </div>
      </div>
    </div>
  );
}
