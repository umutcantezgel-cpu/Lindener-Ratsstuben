'use client';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useCookieConsent } from '@/lib/context/CookieContext';

interface MapFacadeProps {
    address: string;
    mapQuery: string;
    className?: string;
}

export const MapFacade: React.FC<MapFacadeProps> = ({ address, mapQuery, className = '' }) => {
    const { preferences } = useCookieConsent();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (preferences?.marketing) {
            setIsLoaded(true);
        }
    }, [preferences?.marketing]);

    const handleLoadMap = () => {
        setIsLoaded(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleLoadMap();
        }
    };

    return (
        <div 
            className={`relative w-full h-full bg-neutral-200 overflow-hidden cursor-pointer group ${className}`}
            onClick={!isLoaded ? handleLoadMap : undefined}
            onKeyDown={!isLoaded ? handleKeyDown : undefined}
            role={!isLoaded ? "button" : undefined}
            tabIndex={!isLoaded ? 0 : undefined}
            aria-label={!isLoaded ? "Google Maps Karte laden" : undefined}
        >
            {!isLoaded ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary/80 text-text-primary z-10 transition-opacity duration-300">
                    <div className="p-6 bg-bg-primary/90 backdrop-blur-sm rounded-xl border border-border text-center shadow-lg group-hover:border-accent/50 transition-colors">
                        <MapPin className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Karte laden</h3>
                        <p className="text-sm text-stone-300 mb-4 max-w-xs">{address}</p>
                        <p className="text-xs text-stone-400 mb-4 max-w-xs leading-relaxed">
                            Mit dem Laden der Karte akzeptieren Sie die Datenschutzerklärung von Google.
                        </p>
                        <button className="px-6 py-2 bg-accent text-text-primary font-bold rounded-lg hover:bg-white transition-colors pointer-events-none">
                            Karte anzeigen
                        </button>
                    </div>
                </div>
            ) : (
                <iframe
                    src={`https://maps.google.com/maps?width=100%25&height=600&hl=de&q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Standortkarte"
                    className="absolute inset-0 z-0"
                ></iframe>
            )}
        </div>
    );
};
