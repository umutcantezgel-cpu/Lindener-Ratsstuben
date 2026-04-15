import React from 'react';

/**
 * Enterprise Cheatcode CC-20: Slot-basierte Component-Architektur
 * Ermöglicht flexible Injection von Sektions-Teilen, ohne Props zu überladen.
 */
export interface SectionProps {
  /** Optionaler Header-Bereich (Title, Subtitle, Intro-Text) */
  header?: React.ReactNode;
  
  /** Hauptinhalt der Sektion */
  children: React.ReactNode;
  
  /** Optionale Call-to-Action oder Fußzeile */
  footer?: React.ReactNode;
  
  /** Optionaler Bereich für Bilder, Videos oder Illustrationen */
  media?: React.ReactNode;
  
  /** Optionale CSS-Klassen für den äußeren Container */
  className?: string;
}
