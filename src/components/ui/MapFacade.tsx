'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapFacadeProps {
    address: string;
    mapQuery: string;
    className?: string;
}

export const MapFacade: React.FC<MapFacadeProps> = ({ address, mapQuery, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
            ref={mapRef} 
            className={`relative w-full h-full bg-neutral-200 overflow-hidden cursor-pointer group ${className}`}
            onClick={handleLoadMap}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label="Google Maps Karte laden"
        >
            {(!isLoaded || !shouldLoad) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-onyx-light/80 text-white z-10 transition-opacity duration-300">
                    <div className="p-6 bg-onyx-deep/90 backdrop-blur-sm rounded-xl border border-white/10 text-center shadow-lg group-hover:border-accent/50 transition-colors">
                        <MapPin className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Karte laden</h3>
                        <p className="text-sm text-stone-300 mb-4 max-w-xs">{address}</p>
                        <button className="px-6 py-2 bg-accent text-onyx-deep font-bold rounded-lg hover:bg-white transition-colors">
                            Karte anzeigen
                        </button>
                    </div>
                </div>
            ) : null}

            {shouldLoad && (
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: isLoaded ? 'none' : 'grayscale(100%) blur(5px)' }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Standortkarte"
                    className="absolute inset-0 transition-all duration-700 ease-liquid z-0"
                    onLoad={() => setIsLoaded(true)}
                ></iframe>
            )}
        </div>
    );
};
