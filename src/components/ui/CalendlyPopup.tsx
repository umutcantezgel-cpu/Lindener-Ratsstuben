"use client";

import React from 'react';
import { Calendar } from 'lucide-react';

interface CalendlyPopupProps {
    url: string;
    text?: string;
    className?: string;
}

export function CalendlyPopup({
    url,
    text = 'Termin buchen',
    className = '',
}: CalendlyPopupProps) {
    const handleClick = () => {
        const win = window as unknown as Record<string, unknown>;
        if (typeof window !== 'undefined' && win.Calendly) {
            (win as unknown as { Calendly: { showPopupWidget: (url: string) => void } }).Calendly.showPopupWidget(url);
        } else {
            // Fallback: open in new tab
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-surface font-semibold rounded-xl hover:bg-primary-hover transition-colors ${className}`}
        >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            {text}
        </button>
    );
}
