'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface MittagskarteDisplayProps {
  fileUrl: string;
  uploadDate: string;
}

/**
 * Collapsible display component for the daily lunch menu.
 * Shown above the regular menu categories when a Mittagskarte is available.
 */
export function MittagskarteDisplay({ fileUrl, uploadDate }: MittagskarteDisplayProps) {
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
        <div className="mittagskarte-content">
          <div className="pdf-actions">
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="pdf-download-btn"
            >
              PDF öffnen / herunterladen <ExternalLink size={16} />
            </a>
          </div>
          
          <iframe 
            src={`${fileUrl}#view=FitH`} 
            className="pdf-iframe"
            title="Mittagskarte PDF"
          />
        </div>
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
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pdf-actions {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
        }

        .pdf-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background-color: #8b6914;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .pdf-download-btn:hover {
          background-color: #7a5c12;
        }

        .pdf-iframe {
          width: 100%;
          height: 800px;
          border: 1px solid #d4b96a;
          border-radius: 8px;
          background-color: white;
        }

        @media (max-width: 640px) {
          .mittagskarte-header {
            padding: 16px 18px;
          }

          .mittagskarte-title {
            font-size: 17px;
          }

          .mittagskarte-content {
            padding: 16px;
          }

          .mittagskarte-icon {
            font-size: 24px;
          }

          .pdf-iframe {
            height: 600px; /* Kleinere Höhe auf mobilen Geräten */
          }
          
          .pdf-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
