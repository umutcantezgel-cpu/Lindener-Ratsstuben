'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface MittagskarteDisplayProps {
  html: string;
  uploadDate: string;
}

/**
 * Collapsible display component for the daily lunch menu.
 * Shown above the regular menu categories when a Mittagskarte is available.
 */
export function MittagskarteDisplay({ html, uploadDate }: MittagskarteDisplayProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mittagskarte-container">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mittagskarte-header"
        aria-expanded={isOpen}
      >
        <div className="mittagskarte-header-left">
          <span className="mittagskarte-icon">🍽️</span>
          <div>
            <h2 className="mittagskarte-title">Mittagskarte</h2>
            <span className="mittagskarte-date">{uploadDate}</span>
          </div>
        </div>
        <ChevronDown 
          className={clsx('mittagskarte-chevron', isOpen && 'mittagskarte-chevron-open')} 
          size={24} 
        />
      </button>

      {/* Content */}
      <div className={clsx('mittagskarte-body', isOpen && 'mittagskarte-body-open')}>
        <div 
          className="mittagskarte-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* Inline Styles */}
      <style jsx>{`
        .mittagskarte-container {
          background: linear-gradient(135deg, #fdfbf7 0%, #f9f4eb 100%);
          border: 2px solid #d4b96a;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(139, 105, 20, 0.1);
        }

        .mittagskarte-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 20px 24px;
          background: linear-gradient(135deg, #8b6914 0%, #a67c1a 100%);
          border: none;
          cursor: pointer;
          color: white;
          transition: background 0.2s;
        }

        .mittagskarte-header:hover {
          background: linear-gradient(135deg, #7a5c12 0%, #956f17 100%);
        }

        .mittagskarte-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mittagskarte-icon {
          font-size: 28px;
        }

        .mittagskarte-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.5px;
          text-align: left;
        }

        .mittagskarte-date {
          font-size: 13px;
          opacity: 0.85;
          font-weight: 400;
        }

        .mittagskarte-chevron {
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .mittagskarte-chevron-open {
          transform: rotate(180deg);
        }

        .mittagskarte-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }

        .mittagskarte-body-open {
          max-height: 2000px;
        }

        .mittagskarte-content {
          padding: 24px 28px;
          font-size: 15px;
          line-height: 1.8;
          color: #2c1810;
        }

        /* ─── Word Document Content Styling ─── */
        .mittagskarte-content :global(h2) {
          font-size: 20px;
          font-weight: 700;
          color: #8b6914;
          margin: 24px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e8dcc6;
        }

        .mittagskarte-content :global(h2:first-child) {
          margin-top: 0;
        }

        .mittagskarte-content :global(h3) {
          font-size: 17px;
          font-weight: 600;
          color: #5a3e1b;
          margin: 16px 0 8px;
        }

        .mittagskarte-content :global(p) {
          margin: 6px 0;
          color: #3d2b1a;
        }

        .mittagskarte-content :global(strong) {
          color: #2c1810;
          font-weight: 700;
        }

        .mittagskarte-content :global(ul),
        .mittagskarte-content :global(ol) {
          padding-left: 20px;
          margin: 8px 0;
        }

        .mittagskarte-content :global(li) {
          margin: 4px 0;
        }

        .mittagskarte-content :global(table) {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0;
        }

        .mittagskarte-content :global(td),
        .mittagskarte-content :global(th) {
          padding: 8px 12px;
          border-bottom: 1px solid #e8dcc6;
          text-align: left;
        }

        @media (max-width: 640px) {
          .mittagskarte-header {
            padding: 16px 18px;
          }

          .mittagskarte-title {
            font-size: 17px;
          }

          .mittagskarte-content {
            padding: 18px 16px;
            font-size: 14px;
          }

          .mittagskarte-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
