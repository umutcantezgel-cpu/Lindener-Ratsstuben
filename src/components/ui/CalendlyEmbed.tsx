"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

interface CalendlyEmbedProps {
    url: string;
    height?: number;
    primaryColor?: string;
    textColor?: string;
    hideEventDetails?: boolean;
}

export function CalendlyEmbed({
    url,
    height = 600,
    primaryColor,
    textColor,
    hideEventDetails = false,
}: CalendlyEmbedProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const params = new URLSearchParams();
    if (hideEventDetails) params.set('hide_event_type_details', '1');
    if (primaryColor) params.set('primary_color', primaryColor.replace('#', ''));
    if (textColor) params.set('text_color', textColor.replace('#', ''));

    const fullUrl = `${url}?${params.toString()}`;

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!loaded) setError(true);
        }, 10000);
        return () => clearTimeout(timeout);
    }, [loaded]);

    if (error) {
        return (
            <div className="border border-border rounded-xl p-8 text-center bg-bg-secondary">
                <p className="text-text-primary font-semibold mb-2">Terminbuchung momentan nicht verfügbar</p>
                <p className="text-text-secondary text-sm">
                    Bitte kontaktieren Sie uns direkt unter{' '}
                    <a href="tel:05118001234" className="text-primary hover:underline">0511 800 1234</a>{' '}
                    oder per{' '}
                    <a href="mailto:info@lindener-ratsstuben.de" className="text-primary hover:underline">E-Mail</a>.
                </p>
            </div>
        );
    }

    return (
        <>
            <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
            {!loaded && (
                <div
                    className="animate-pulse bg-bg-secondary rounded-xl"
                    style={{ height: `${height}px` }}
                    aria-label="Kalender wird geladen..."
                />
            )}
            <div
                className="calendly-inline-widget rounded-xl overflow-hidden"
                data-url={fullUrl}
                style={{ minWidth: '320px', height: `${height}px`, display: loaded ? 'block' : 'none' }}
            />
        </>
    );
}
