import React, { ReactNode } from 'react';

interface PrintPageA5PortraitProps {
  children: ReactNode;
}

export function PrintPageA5Portrait({ children }: PrintPageA5PortraitProps) {
  return (
    <div className="seasonal-page-a5-portrait">
      {/* Ornamental Frame */}
      <div className="seasonal-frame"></div>

      {/* Corner Ornaments */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seasonal-corner corner-tl"
      >
        <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
        <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
        <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold)" opacity="0.3" />
        <circle cx="15" cy="15" r="2" fill="var(--gold)" />
        <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seasonal-corner corner-tr"
      >
        <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
        <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
        <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold)" opacity="0.3" />
        <circle cx="15" cy="15" r="2" fill="var(--gold)" />
        <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seasonal-corner corner-bl"
      >
        <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
        <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
        <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold)" opacity="0.3" />
        <circle cx="15" cy="15" r="2" fill="var(--gold)" />
        <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seasonal-corner corner-br"
      >
        <path d="M0,0 L100,0 L100,2 L2,2 L2,100 L0,100 Z" fill="var(--gold)" />
        <path d="M10,10 L80,10 L80,12 L12,12 L12,80 L10,80 Z" fill="var(--gold-deep)" />
        <path d="M20,20 L60,20 L60,21 L21,21 L21,60 L20,60 Z" fill="var(--gold)" opacity="0.3" />
        <circle cx="15" cy="15" r="2" fill="var(--gold)" />
        <circle cx="6" cy="6" r="3" fill="var(--gold-deep)" />
      </svg>

      <div className="seasonal-content">
        {children}
      </div>
    </div>
  );
}
