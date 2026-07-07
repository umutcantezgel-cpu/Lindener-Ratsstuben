'use client';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useCookieConsent } from '@/lib/context/CookieContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icons in Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapFacadeProps {
    address: string;
    mapQuery?: string;
    className?: string;
}

export const MapFacade: React.FC<MapFacadeProps> = ({ address, className = '' }) => {
    const { preferences } = useCookieConsent();
    const [isLoaded, setIsLoaded] = useState(false);

    // Coordinates for Lindener Ratsstuben
    const position: [number, number] = [50.5313, 8.6566];

    useEffect(() => {
        // Automatically load if marketing cookies (or general preferences) allow it, 
        // though OpenStreetMap doesn't strictly require marketing consent, 
        // we keep the logic to respect user choice.
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
            className={`relative w-full h-full bg-neutral-200 overflow-hidden rounded-xl ${className}`}
            style={{ zIndex: 0 }}
        >
            {!isLoaded ? (
                <div 
                    className="absolute inset-0 flex flex-col items-center justify-center bg-bg-secondary/80 text-text-primary z-10 transition-opacity duration-300 cursor-pointer group"
                    onClick={handleLoadMap}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label="Interaktive Karte laden"
                >
                    <div className="p-6 bg-bg-primary/90 backdrop-blur-sm rounded-xl border border-border text-center shadow-lg group-hover:border-accent/50 transition-colors">
                        <MapPin className="w-10 h-10 text-accent mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Interaktive Karte laden</h3>
                        <p className="text-sm text-stone-300 mb-4 max-w-xs">{address}</p>
                        <p className="text-xs text-stone-400 mb-4 max-w-xs leading-relaxed">
                            Klicken Sie hier, um die interaktive Karte von OpenStreetMap zu laden.
                        </p>
                        <button className="px-6 py-2 bg-accent text-text-primary font-bold rounded-lg hover:bg-white transition-colors pointer-events-none">
                            Karte anzeigen
                        </button>
                    </div>
                </div>
            ) : (
                <div className="absolute inset-0 z-0 fade-in">
                    <MapContainer 
                        center={position} 
                        zoom={16} 
                        scrollWheelZoom={false} 
                        style={{ width: '100%', height: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                <strong>Lindener Ratsstuben</strong><br />
                                {address}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            )}
        </div>
    );
};
