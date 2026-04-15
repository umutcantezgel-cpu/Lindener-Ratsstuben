"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type ConnectionType = '4g' | '3g' | '2g' | 'slow-2g' | 'offline';

interface DeviceContextProps {
    deviceType: DeviceType;
    isTouch: boolean;
    hasFinePointer: boolean;
    connection: ConnectionType;
    saveData: boolean;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: React.ReactNode; initialDeviceType?: DeviceType }> = ({ children, initialDeviceType = 'desktop' }) => {
    const [deviceType, setDeviceType] = useState<DeviceType>(initialDeviceType);
    const [isTouch, setIsTouch] = useState<boolean>(false);
    const [hasFinePointer, setHasFinePointer] = useState<boolean>(true);
    const [connection, setConnection] = useState<ConnectionType>('4g');
    const [saveData, setSaveData] = useState<boolean>(false);

    useEffect(() => {
        // Evaluate Device Size
        const updateDeviceType = () => {
            if (window.innerWidth < 768) {
                setDeviceType('mobile');
            } else if (window.innerWidth < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        // Pointer Queries
        const touchQuery = window.matchMedia('(pointer: coarse)');
        const updatePointer = () => {
            setIsTouch(touchQuery.matches);
            setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
        };

        // Network Info
        const updateNetwork = () => {
            if (!navigator.onLine) {
                setConnection('offline');
                return;
            }
            // @ts-expect-error - navigator.connection is non-standard but widely supported
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (conn) {
                setConnection(conn.effectiveType || '4g');
                setSaveData(conn.saveData || false);
            } else {
                setConnection('4g');
            }
        };

        // Initial setup
        updateDeviceType();
        updatePointer();
        updateNetwork();

        // Listeners
        window.addEventListener('resize', updateDeviceType, { passive: true });
        window.addEventListener('online', updateNetwork);
        window.addEventListener('offline', updateNetwork);
        
        if (touchQuery.addEventListener) {
            touchQuery.addEventListener('change', updatePointer);
        } else {
            touchQuery.addListener(updatePointer); // fallback
        }
        
        // @ts-expect-error - navigator.connection is non-standard
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn && conn.addEventListener) {
            conn.addEventListener('change', updateNetwork);
        }

        return () => {
            window.removeEventListener('resize', updateDeviceType);
            window.removeEventListener('online', updateNetwork);
            window.removeEventListener('offline', updateNetwork);
            if (touchQuery.removeEventListener) {
                touchQuery.removeEventListener('change', updatePointer);
            }
            if (conn && conn.removeEventListener) {
                conn.removeEventListener('change', updateNetwork);
            }
        };
    }, []);

    return (
        <DeviceContext.Provider value={{ deviceType, isTouch, hasFinePointer, connection, saveData }}>
            {children}
        </DeviceContext.Provider>
    );
};

export const useDevice = () => {
    const context = useContext(DeviceContext);
    if (!context) {
        throw new Error('useDevice must be used within a DeviceProvider');
    }
    return context;
};
