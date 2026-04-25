'use client';
import React, { useState, useEffect } from 'react';

interface IdleRenderProps {
    children: React.ReactNode;
    delay?: number;
    waitForIdle?: boolean;
}

/**
 * Defers rendering of non-critical components to reduce Total Blocking Time (TBT).
 * By default, it waits for the main thread to become idle via requestIdleCallback.
 * Fallback to setTimeout for unsupported browsers.
 */
export const IdleRender: React.FC<IdleRenderProps> = ({ 
    children, 
    delay = 0, 
    waitForIdle = true 
}) => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let idleCallbackId: number;

        const executeRender = () => {
            if (delay > 0) {
                timeoutId = setTimeout(() => setShouldRender(true), delay);
            } else {
                setShouldRender(true);
            }
        };

        if (waitForIdle && typeof window !== 'undefined') {
            if ('requestIdleCallback' in window) {
                const win = window as unknown as { requestIdleCallback: (cb: () => void) => number };
                idleCallbackId = win.requestIdleCallback(() => {
                    executeRender();
                });
            } else {
                // Fallback for Safari
                timeoutId = setTimeout(executeRender, Math.max(1, delay));
            }
        } else {
            executeRender();
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (idleCallbackId && typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
                const win = window as unknown as { cancelIdleCallback: (id: number) => void };
                win.cancelIdleCallback(idleCallbackId);
            }
        };
    }, [delay, waitForIdle]);

    if (!shouldRender) {
        return null;
    }

    return <>{children}</>;
};
