import React from 'react';

export default function PrintPage({ children, pageNum }: { children: React.ReactNode; pageNum: string }) {
  return (
    <div className="page">
      <div className="pg-frame"></div>
      <div className="page-content">
        {children}
      </div>
      {pageNum && <div className="pg-num">— {pageNum} —</div>}
    </div>
  );
}
