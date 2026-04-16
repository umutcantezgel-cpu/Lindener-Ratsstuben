import React from 'react';

interface DishCategoryProps {
  title: string;
  subtitle: string;
  dropcap: string;
  marginTop?: string;
  marginBottom?: string;
}

export default function DishCategory({ title, subtitle, dropcap, marginTop, marginBottom }: DishCategoryProps) {
  return (
    <div className="cat-hdr" style={{ marginTop, marginBottom }}>
      <span className="cat-dropcap">{dropcap}</span>
      <h2 className="cat-title">{title}</h2>
      <span className="cat-it">{subtitle}</span>
      <div className="cat-sep">
        <svg width="100" height="10" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,5 L40,5" stroke="var(--border)" strokeWidth="1" />
          <path d="M60,5 L100,5" stroke="var(--border)" strokeWidth="1" />
          <path d="M50,2 L53,5 L50,8 L47,5 Z" fill="var(--gold-deep)" />
        </svg>
      </div>
    </div>
  );
}
